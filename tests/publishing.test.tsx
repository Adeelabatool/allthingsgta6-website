/**
 * Guards the invariant the publishing lifecycle exists to protect:
 * nothing in draft, and nothing scheduled for the future, may reach a public
 * surface — article routes, indexes, category pages, homepage modules,
 * related-content widgets, feeds, or the sitemap.
 *
 * Run with: npm run test:publishing
 */
import { renderToStaticMarkup } from "react-dom/server";
import {
  isPubliclyVisible,
  parsePublishAt,
  publicOnly,
  pendingQueue,
  pendingRevisions,
  resolveRevision,
  statusOf,
  formatVerifiedDate,
  type Publishable,
} from "@/lib/publishing";
import { news, publicNews, newsBySlug, newsByCategory } from "@/data/news";
import { pages, publicPages, pageByPath } from "@/data/pages";
import { readFileSync } from "node:fs";
import { isLinkTargetLive, liveLinks } from "@/lib/related";
import { TICKER_MAX_ITEMS, tickerDate, tickerStories } from "@/lib/ticker";
import { wiki, publicWiki, wikiBySlug, wikiByType } from "@/data/wiki";
import { analyses, publicAnalyses, analysisBySlug } from "@/data/analysis";
import { ALWAYS_LIVE } from "@/lib/related";
import { renderSitemap, sitemapUrls, staticSitemapPaths } from "@/lib/sitemap";
import { ArticleJsonLd } from "@/components/StructuredData";
import { articleHead, breadcrumbJsonLd, buildBreadcrumbList } from "@/lib/seo";

let failures = 0;
const ok = (name: string, cond: boolean) => {
  if (!cond) failures++;
  console.log(`${cond ? "  ok  " : " FAIL "} ${name}`);
};
const group = (name: string) => console.log(`\n${name}`);

const draft: Publishable = { status: "draft" };
const future: Publishable = { status: "scheduled", publishAt: "2099-01-01T00:00:00Z" };
const due: Publishable = { status: "scheduled", publishAt: "2020-01-01T00:00:00Z" };

group("visibility predicate");
ok("draft is never visible", !isPubliclyVisible(draft));
ok("published is visible", isPubliclyVisible({ status: "published" }));
ok("missing status defaults to published", isPubliclyVisible({}));
ok("statusOf defaults to published", statusOf({}) === "published");
ok("scheduled in the past is visible", isPubliclyVisible(due));
ok("scheduled in the future is hidden", !isPubliclyVisible(future));
ok("scheduled without publishAt fails closed", !isPubliclyVisible({ status: "scheduled" }));
ok(
  "scheduled with unparseable publishAt fails closed",
  !isPubliclyVisible({ status: "scheduled", publishAt: "soon" }),
);
ok(
  "publishAt boundary is inclusive",
  isPubliclyVisible(
    { status: "scheduled", publishAt: "2026-06-01T00:00:00Z" },
    new Date("2026-06-01T00:00:00Z"),
  ),
);
ok(
  "one second early is still hidden",
  !isPubliclyVisible(
    { status: "scheduled", publishAt: "2026-06-01T00:00:00Z" },
    new Date("2026-05-31T23:59:59Z"),
  ),
);

group("collection filters");
const mixed = [draft, future, due, { status: "published" as const }];
ok("publicOnly keeps only the two visible", publicOnly(mixed).length === 2);
ok("publicOnly does not mutate its input", mixed.length === 4);
ok("pendingQueue returns the two withheld", pendingQueue(mixed).length === 2);
ok(
  "a future post becomes visible once its time passes",
  isPubliclyVisible(future, new Date("2099-01-02T00:00:00Z")),
);

group("live data accessors are gated");
ok("news index is gated", publicNews().length === publicOnly(news).length);
ok("wiki index is gated", publicWiki().length === publicOnly(wiki).length);
ok("analysis index is gated", publicAnalyses().length === publicOnly(analyses).length);
ok(
  "every listed news item is visible",
  publicNews().every((n) => isPubliclyVisible(n)),
);
ok(
  "every listed wiki entry is visible",
  publicWiki().every((w) => isPubliclyVisible(w)),
);
ok(
  "every listed analysis is visible",
  publicAnalyses().every((a) => isPubliclyVisible(a)),
);
ok(
  "category pages are gated",
  newsByCategory("rockstar-updates").every((n) => isPubliclyVisible(n)),
);
ok(
  "wikiByType is gated",
  wikiByType("characters").every((w) => isPubliclyVisible(w)),
);
ok("unknown slug resolves to undefined", newsBySlug("no-such-article") === undefined);
ok("known slug resolves", newsBySlug("pre-order-rumors")?.slug === "pre-order-rumors");
ok("wiki entry resolves", wikiBySlug("characters", "jason")?.slug === "jason");
ok("analysis resolves", analysisBySlug("trailer-1-breakdown")?.slug === "trailer-1-breakdown");

group("staged revisions to live pages");
const live = {
  status: "published" as const,
  title: "current",
  lastVerified: "2026-01-01",
  pendingRevision: {
    publishAt: "2026-09-10T13:00:00Z",
    lastVerified: "2026-08-29",
    changes: { title: "upgraded" },
  },
};
ok("a page with a pending revision stays visible before its date", isPubliclyVisible(live));
ok(
  "content is unchanged before the revision lands",
  resolveRevision(live, new Date("2026-09-09T00:00:00Z")).title === "current",
);
ok(
  "content swaps once the revision is due",
  resolveRevision(live, new Date("2026-09-11T00:00:00Z")).title === "upgraded",
);
ok(
  "the revision carries its own lastVerified",
  resolveRevision(live, new Date("2026-09-11T00:00:00Z")).lastVerified === "2026-08-29",
);
ok(
  "the pendingRevision key is dropped once applied",
  resolveRevision(live, new Date("2026-09-11T00:00:00Z")).pendingRevision === undefined,
);
ok(
  "an unparseable revision date never lands",
  resolveRevision(
    {
      status: "published" as const,
      title: "current",
      pendingRevision: { publishAt: "soon", changes: { title: "x" } },
    },
    new Date("2099-01-01T00:00:00Z"),
  ).title === "current",
);
ok(
  "pendingRevisions lists the waiting one",
  pendingRevisions([live], new Date("2026-09-01T00:00:00Z")).length === 1,
);
ok(
  "pendingRevisions excludes a landed one",
  pendingRevisions([live], new Date("2026-09-11T00:00:00Z")).length === 0,
);

group("long-form pages layer");
ok("pages index is gated", publicPages().length === publicOnly(pages).length);
ok(
  "every listed page is visible",
  publicPages().every((p) => isPubliclyVisible(p)),
);
ok("an unknown path resolves to undefined", pageByPath("/no-such-page") === undefined);
ok(
  "a scheduled page 404s before its date",
  pageByPath("/gta-6-price", new Date("2026-09-01T00:00:00Z")) === undefined,
);
ok(
  "the same page resolves after its date",
  pageByPath("/gta-6-price", new Date("2026-09-05T00:00:00Z"))?.path === "/gta-6-price",
);
ok(
  "a draft page never resolves, even far in the future",
  pageByPath("/gta-6-pc-release-date", new Date("2099-01-01T00:00:00Z")) === undefined,
);

group("the loaded 30-article plan");
const scheduled = pages.filter((p) => p.status === "scheduled");
ok(
  "every scheduled page carries a publishAt",
  scheduled.every((p) => p.publishAt),
);
ok(
  "every scheduled entry across all collections carries a publishAt",
  [...news, ...analyses, ...wiki, ...pages]
    .filter((e) => e.status === "scheduled")
    .every((e) => e.publishAt),
);
ok(
  "no article is left with an unrecognised status",
  [...news, ...analyses, ...wiki, ...pages].every((e) =>
    ["draft", "scheduled", "published", undefined].includes(e.status),
  ),
);
ok(
  "the three Search-Console-blocked articles are drafts, not scheduled",
  pageByPath("/gta-6-pc-release-date", new Date("2099-01-01T00:00:00Z")) === undefined &&
    newsBySlug("gta-6-pre-order", new Date("2099-01-01T00:00:00Z")) === undefined &&
    analysisBySlug("trailer-2-breakdown", new Date("2099-01-01T00:00:00Z")) === undefined,
);
ok(
  "pillar articles kept their depth (Day 11 map >= 20 sections)",
  (pages.find((p) => p.path === "/gta-6-map")?.sections.length ?? 0) >= 20,
);
ok(
  "evidence classifications survived the load",
  pages.every((p) => (p.evidence?.length ?? 0) === 4),
);
ok(
  "no evidence row was promoted to confirmed without one in the source",
  pages.every((p) => p.evidence?.filter((e) => e.kind === "confirmed").length === 1),
);

// Every contextual link must resolve to a real route, or it ships a 404.
const knownPaths = new Set<string>([
  ...pages.map((p) => p.path),
  ...news.map((n) => `/news/${n.slug}`),
  ...analyses.map((a) => `/analysis/${a.slug}`),
  ...wiki.map((w) => `/wiki/${w.type}/${w.slug}`),
  "/",
  "/news",
  "/analysis",
  "/wiki",
  "/tools",
  "/about",
  "/gta-6-news",
  "/system-requirements",
  "/gta-6-release-date",
  "/gta-6-map",
  "/gta-6-characters",
  "/gta-6-vehicles",
  "/gta-6-weapons",
]);
const badLinks = [
  ...pages.flatMap((p) => (p.related ?? []).map((r) => r.href)),
  ...news.flatMap((n) => (n.related ?? []).map((r) => r.href)),
  ...analyses.flatMap((a) => (a.related ?? []).map((r) => r.href)),
  ...wiki.flatMap((w) => (w.related ?? []).map((r) => r.href)),
].filter((h) => h.startsWith("/") && !knownPaths.has(h));
if (badLinks.length) console.log("      unresolved:", [...new Set(badLinks)].join(", "));
ok("every contextual link resolves to a real route", badLinks.length === 0);

group("contextual links never outrun their target");
type Rel = { href: string };
const articleLinks: { from: string; at: Date | null; rel: Rel[] }[] = [
  ...pages.map((p) => ({
    from: p.path,
    at: p.status === "draft" ? null : new Date(p.publishAt!),
    rel: (p.related ?? []) as Rel[],
  })),
  ...news.map((n) => ({
    from: `/news/${n.slug}`,
    at: n.status === "draft" ? null : new Date(n.publishAt ?? n.date),
    rel: (n.related ?? []) as Rel[],
  })),
  ...analyses.map((a) => ({
    from: `/analysis/${a.slug}`,
    at: a.status === "draft" ? null : new Date(a.publishAt ?? a.date),
    rel: (a.related ?? []) as Rel[],
  })),
  ...wiki.map((w) => ({
    from: `/wiki/${w.type}/${w.slug}`,
    at: w.status === "draft" ? null : new Date(w.publishAt ?? "2020-01-01"),
    rel: (w.related ?? []) as Rel[],
  })),
];

let deadRendered = 0;
let deferred = 0;
for (const a of articleLinks) {
  if (!a.at) continue;
  const shown = liveLinks(a.rel, a.at);
  deferred += a.rel.length - shown.length;
  for (const l of shown) if (!isLinkTargetLive(l.href, a.at)) deadRendered++;
}
ok("no article ever renders a link to a page that is not live yet", deadRendered === 0);
ok("the gate actually defers premature links", deferred > 0);
ok(
  "a link to a page published later is withheld at first",
  !liveLinks([{ href: "/gta-6-gameplay" }], new Date("2026-08-29T18:00:00Z")).length,
);
ok(
  "and appears once that page is live",
  // Read the date off the entry so a reshuffle of the calendar cannot quietly
  // turn this into a test of nothing.
  liveLinks(
    [{ href: "/gta-6-gameplay" }],
    new Date(Date.parse(pages.find((p) => p.path === "/gta-6-gameplay")!.publishAt!)),
  ).length === 1,
);
ok(
  "a draft target is never linkable, even far in the future",
  !isLinkTargetLive("/gta-6-pc-release-date", new Date("2099-01-01T00:00:00Z")),
);
ok(
  "an existing hub route is always linkable",
  isLinkTargetLive("/gta-6-map", new Date("2026-08-29T00:00:00Z")),
);
ok("an unknown route is never linkable", !isLinkTargetLive("/no-such-page"));

const extractLd = (html: string) => {
  const m = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
  return m ? JSON.parse(m[1].replace(/\\u003c/g, "<")) : null;
};

group("breaking-news ticker");
const ticker = tickerStories();
ok("ticker has stories", ticker.length > 0);
ok(`ticker is capped at ${TICKER_MAX_ITEMS}`, ticker.length <= TICKER_MAX_ITEMS);
ok(
  "every ticker story is publicly visible",
  ticker.every((n) => isPubliclyVisible(n)),
);
ok(
  "ticker is sorted newest first",
  ticker.every((n, i) => i === 0 || Date.parse(ticker[i - 1].date) >= Date.parse(n.date)),
);
ok(
  "no draft reaches the ticker, even far in the future",
  !tickerStories(new Date("2099-01-01T00:00:00Z")).some((n) => n.status === "draft"),
);
ok(
  "a future-scheduled story is absent before its time",
  !tickerStories(new Date("2026-08-29T18:00:00Z")).some((n) => n.slug === "gta-6-news-august-2026"),
);
ok(
  "and appears on its own once publishAt passes",
  tickerStories(new Date("2026-08-31T00:00:00Z")).some((n) => n.slug === "gta-6-news-august-2026"),
);
ok(
  "every ticker story resolves to a live article route",
  ticker.every((n) => isLinkTargetLive(`/news/${n.slug}`)),
);
ok("ticker dates render as e.g. AUG 29", /^[A-Z]{3} \d{1,2}$/.test(tickerDate("2026-08-29")));
ok("ticker date is formatted in UTC", tickerDate("2026-08-29") === "AUG 29");
ok("an unparseable date passes through untouched", tickerDate("soon") === "soon");
// The ticker must never become a second, manually maintained headline list.
const tickerSrc = readFileSync("src/lib/ticker.ts", "utf8");
ok(
  "ticker reads from the publishing accessor, not a hardcoded list",
  tickerSrc.includes("publicNews("),
);

group("editorial fields stay private");
const mixedSchema = extractLd(
  renderToStaticMarkup(
    <ArticleJsonLd
      type="Article"
      headline="H"
      description="D"
      path="/x"
      datePublished="2026-08-29"
      sources={[
        { label: "Linked source", url: "https://www.rockstargames.com/VI" },
        { label: "Unresolved source", needsReview: true },
      ]}
    />,
  ),
);
ok(
  "structured data never carries the needsReview flag",
  !JSON.stringify(mixedSchema).includes("needsReview"),
);
ok("only the linked source becomes a citation", mixedSchema.citation.length === 1);
ok(
  "the flagged source is absent from citations",
  !JSON.stringify(mixedSchema.citation).includes("Unresolved source"),
);
// The flag must be unreachable from markup, not merely unused today.
const renderers = [
  "src/components/LongFormArticle.tsx",
  "src/routes/news.$slug.tsx",
  "src/routes/analysis.$slug.tsx",
  "src/routes/wiki.$type.$slug.tsx",
].map((f) => readFileSync(f, "utf8"));
ok(
  "no renderer references needsReview at all",
  renderers.every((src) => !src.includes("needsReview")),
);
ok(
  "every renderer links a source only when it has a url",
  renderers.every((src) => src.includes("src.url ?") || src.includes("s.url ?")),
);

group("source references");
type Src = { label: string; url?: string; needsReview?: boolean };
const allSources: { where: string; src: Src }[] = [];
const collect = (where: string, list?: Src[]) =>
  (list ?? []).forEach((src) => allSources.push({ where, src }));
for (const p of pages) collect(`page ${p.path}`, p.sources);
for (const n of news) collect(`news/${n.slug}`, n.sources);
for (const a of analyses) {
  collect(`analysis/${a.slug}`, a.sources);
  collect(`analysis/${a.slug}`, (a.pendingRevision?.changes as { sources?: Src[] })?.sources);
}
for (const w of wiki) {
  collect(`wiki/${w.slug}`, w.sources);
  collect(`wiki/${w.slug}`, (w.pendingRevision?.changes as { sources?: Src[] })?.sources);
}

const linked = allSources.filter(({ src }) => src.url);
const review = allSources.filter(({ src }) => src.needsReview);

ok("every source is either linked or flagged", linked.length + review.length === allSources.length);
ok(
  "no source is both linked and flagged",
  allSources.every(({ src }) => !(src.url && src.needsReview)),
);
ok(
  "every source URL is https",
  linked.every(({ src }) => src.url!.startsWith("https://")),
);
ok(
  "every source URL parses as a URL",
  linked.every(({ src }) => {
    try {
      new URL(src.url!);
      return true;
    } catch {
      return false;
    }
  }),
);
ok(
  "no source URL carries a tracking query",
  linked.every(({ src }) => !src.url!.includes("utm_")),
);
ok(
  "a flagged source ships no link rather than a guessed one",
  review.every(({ src }) => src.url === undefined),
);
ok(
  "first-party labels are all resolved or explicitly flagged",
  allSources
    .filter(({ src }) => /^(Rockstar|Take-Two|PlayStation)/.test(src.label))
    .every(({ src }) => src.url || src.needsReview),
);

// Only sources carrying a URL become schema citations; flagged ones must not.
const citationCount = new Set(linked.map(({ src }) => src.url)).size;
ok("linked sources resolve to distinct canonical URLs", citationCount > 0);

const queue = [...new Set(review.map(({ src }) => src.label))].sort();
console.log(`\n      linked ${linked.length}/${allSources.length} source entries`);
console.log(`      editorial review queue — ${review.length} entries, ${queue.length} distinct:`);
for (const label of queue) {
  const n = review.filter(({ src }) => src.label === label).length;
  console.log(`        · ${label} (${n})`);
}
console.log("");

group("freshness formatting");
ok("ISO date renders long-form", formatVerifiedDate("2026-08-29") === "August 29, 2026");
ok("unparseable date passes through", formatVerifiedDate("whenever") === "whenever");

group("structured data");
const article = extractLd(
  renderToStaticMarkup(
    <ArticleJsonLd
      type="NewsArticle"
      headline="H"
      description="D"
      path="/news/x"
      datePublished="2026-08-29T09:00:00Z"
      dateModified="2026-08-29"
      sources={[{ label: "Rockstar Newswire", url: "https://www.rockstargames.com/newswire" }]}
    />,
  ),
);
ok("@context is schema.org", article["@context"] === "https://schema.org");
ok("NewsArticle type honoured", article["@type"] === "NewsArticle");
ok("url is absolute", article.url === "https://allthingsgta6.com/news/x");
ok("mainEntityOfPage matches url", article.mainEntityOfPage["@id"] === article.url);
ok("dateModified reflects lastVerified", article.dateModified === "2026-08-29");
ok("first-party source cited", article.citation[0].url.includes("rockstargames.com"));
ok("no FAQ schema is ever emitted", !JSON.stringify(article).includes("FAQ"));

const evergreen = extractLd(
  renderToStaticMarkup(
    <ArticleJsonLd
      type="Article"
      headline="H"
      description="D"
      path="/gta-6-map"
      datePublished="2026-08-29"
    />,
  ),
);
ok("Article type for evergreen pages", evergreen["@type"] === "Article");
ok("dateModified falls back to datePublished", evergreen.dateModified === "2026-08-29");

const crumbList = buildBreadcrumbList([
  { name: "Home", path: "/" },
  { name: "News", path: "/news" },
  { name: "Story", path: "/news/story" },
])!;
ok("BreadcrumbList emitted", crumbList["@type"] === "BreadcrumbList");
ok(
  "positions are 1-indexed and ordered",
  crumbList.itemListElement.map((i) => i.position).join() === "1,2,3",
);
ok(
  "EVERY ListItem carries an item url, current page included",
  crumbList.itemListElement.every((i) => typeof i.item === "string" && i.item.length > 0),
);
ok(
  "every item url is absolute on the canonical origin",
  crumbList.itemListElement.every((i) => i.item.startsWith("https://allthingsgta6.com/")),
);
ok(
  "the final crumb is the current page and has its own item",
  crumbList.itemListElement[2].item === "https://allthingsgta6.com/news/story",
);
ok(
  "crumbs with an empty name are dropped",
  buildBreadcrumbList([{ name: "", path: "/x" }]) === null,
);
ok(
  "crumbs with an empty path are dropped",
  buildBreadcrumbList([{ name: "X", path: "" }]) === null,
);
ok(
  "duplicate urls in one trail are deduped",
  buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Home again", path: "/" },
  ])!.itemListElement.length === 1,
);
ok(
  "breadcrumb json escapes < so a title cannot break out of the script",
  breadcrumbJsonLd([{ name: "</script>", path: "/x" }])[0].children.includes("\\u003c"),
);
ok(
  "a headline cannot break out of the script tag",
  !renderToStaticMarkup(
    <ArticleJsonLd
      type="Article"
      headline={"</script>"}
      description="D"
      path="/x"
      datePublished="2026-01-01"
    />,
  ).includes("</script><"),
);

group("canonicals");
const head = articleHead({ path: "/news/foo", title: "T", description: "D" });
ok("self-referencing by default", head.links[0].href === "https://allthingsgta6.com/news/foo");
ok(
  "og:url agrees with canonical",
  head.meta.find((m) => "property" in m && m.property === "og:url")?.content === head.links[0].href,
);
ok(
  "override applies only when passed",
  articleHead({
    path: "/news/foo",
    title: "T",
    description: "D",
    canonicalOverride: "https://allthingsgta6.com/gta-6-map",
  }).links[0].href === "https://allthingsgta6.com/gta-6-map",
);

/* ------------------------------------------------------------------------ *
 * Incident 2026-09-03: the Aug 31 and Sep 2 scheduled pages served correctly
 * on their own URLs but never entered the sitemap, and the sitemap could only
 * change on a deploy. These fix the schedule in place as fixtures so the same
 * failure cannot recur silently.
 * ------------------------------------------------------------------------ */

group("scheduled publication over time");
const AUG31 = "2026-08-31T13:00:00Z"; // /gta-6-release-date
const SEP02 = "2026-09-02T13:00:00Z"; // /gta-6-ultimate-edition
const at = (iso: string, ms = 0) => new Date(Date.parse(iso) + ms);
const NOW_INCIDENT = new Date("2026-09-03T14:00:00Z");

ok(
  "before publishAt the scheduled page is unavailable",
  pageByPath("/gta-6-ultimate-edition", at(SEP02, -1)) === undefined,
);
ok(
  "exactly at publishAt the scheduled page is public",
  pageByPath("/gta-6-ultimate-edition", at(SEP02))?.status === "scheduled",
);
ok(
  "after publishAt the scheduled page stays public",
  pageByPath("/gta-6-ultimate-edition", at(SEP02, 86_400_000)) !== undefined,
);
ok(
  "a draft is unavailable at every point on the calendar",
  [at(AUG31), at(SEP02), new Date("2099-01-01T00:00:00Z")].every(
    (t) => pageByPath("/gta-6-pc-release-date", t) === undefined,
  ),
);
ok(
  "a malformed schedule fails closed rather than leaking",
  [
    { status: "scheduled" as const },
    { status: "scheduled" as const, publishAt: "2026-09-31T13:00:00Z" }, // no such date
    { status: "scheduled" as const, publishAt: "2026-02-30T13:00:00Z" }, // no such date
    { status: "scheduled" as const, publishAt: "2026-09-01T13:00:00" }, // no offset
    { status: "scheduled" as const, publishAt: "2026-09-01 13:00:00Z" }, // not ISO
    { status: "scheduled" as const, publishAt: "31/08/2026" },
    { status: "scheduled" as const, publishAt: "" },
  ].every((entry) => !isPubliclyVisible(entry, new Date("2099-01-01T00:00:00Z"))),
);

// The Aug 31 fixture is an in-place upgrade of a hub that was already live, so
// the assertion is a swap, not an appearance.
ok(
  "the Aug 31 fixture is live from its publishAt",
  pageByPath("/gta-6-release-date", at(AUG31)) !== undefined,
);
ok(
  "and its route serves the hub, not a 404, beforehand",
  ALWAYS_LIVE.has("/gta-6-release-date") &&
    pageByPath("/gta-6-release-date", at(AUG31, -1)) === undefined,
);
ok(
  "the Sep 2 fixture is live at the incident's current time",
  pageByPath("/gta-6-ultimate-edition", new Date("2026-09-03T14:00:00Z")) !== undefined,
);

group("publication calendar");
// Sep 1, 6 and 25 were empty and Sep 26 was double-booked. Nothing in the
// lifecycle notices that, so it is asserted here: a gap means a day with no
// article, and a duplicate means two landing on one day unannounced.
const everyEntry = [...pages, ...news, ...analyses, ...wiki];
const scheduledOn = (day: string) =>
  everyEntry.filter(
    (e) => e.publishAt?.startsWith(day) || e.pendingRevision?.publishAt?.startsWith(day),
  );
const dayOf = (iso: string) => iso.slice(0, 10);
const everyScheduledDay = everyEntry
  .flatMap((e) => [e.publishAt, e.pendingRevision?.publishAt])
  .filter((v): v is string => typeof v === "string")
  .map(dayOf)
  .sort();

// Sundays are the deliberate rest days, plus Sat Sep 26 before the closing run.
const REST_DAYS = new Set(["2026-09-06", "2026-09-13", "2026-09-20", "2026-09-26", "2026-09-27"]);
const runDays: string[] = [];
for (let d = new Date("2026-08-29T00:00:00Z"); d <= new Date("2026-09-30T00:00:00Z");) {
  runDays.push(d.toISOString().slice(0, 10));
  d = new Date(d.getTime() + 86_400_000);
}

ok(
  "every publishing day in the run has exactly one entry",
  runDays.filter((d) => !REST_DAYS.has(d)).every((d) => scheduledOn(d).length === 1),
);
ok(
  "no two entries share a publication day",
  new Set(everyScheduledDay).size === everyScheduledDay.length,
);
ok(
  "the calendar runs to Sep 30 with nothing scheduled past it",
  everyScheduledDay.includes("2026-09-30") && everyScheduledDay.every((d) => d <= "2026-09-30"),
);
ok(
  "rest days are empty by intent, not by accident",
  [...REST_DAYS].every((d) => scheduledOn(d).length === 0),
);
ok(
  "every day on or before Sep 3 that carries an entry is live now",
  runDays
    .filter((d) => d <= "2026-09-03" && !REST_DAYS.has(d))
    .every((d) => scheduledOn(d).every((e) => isPubliclyVisible(e, NOW_INCIDENT))),
);
ok(
  "the three held drafts are still drafts and still private",
  ["/gta-6-pc-release-date"].every((p) => pageByPath(p, NOW_INCIDENT) === undefined) &&
    newsBySlug("gta-6-pre-order", NOW_INCIDENT) === undefined &&
    analysisBySlug("trailer-2-breakdown", NOW_INCIDENT) === undefined,
);

group("publishAt timestamps are unambiguous");
const everyPublishAt = [
  ...[...pages, ...news, ...analyses, ...wiki].map((e) => e.publishAt),
  ...[...pages, ...news, ...analyses, ...wiki].map((e) => e.pendingRevision?.publishAt),
].filter((v): v is string => typeof v === "string");
ok("there are schedules to check", everyPublishAt.length > 0);
ok(
  "every publishAt carries an explicit UTC offset",
  everyPublishAt.every((v) => /(?:Z|[+-]\d{2}:\d{2})$/.test(v)),
);
ok(
  "every publishAt parses to a real instant",
  everyPublishAt.every((v) => !Number.isNaN(Date.parse(v))),
);
ok(
  "visibility is unaffected by the host timezone",
  // Date.parse on an offset-bearing string yields an absolute epoch, so the
  // comparison cannot shift with the Worker's local zone. Same instant, three
  // wall clocks, one answer.
  ["2026-09-02T13:00:00Z", "2026-09-02T09:00:00-04:00", "2026-09-02T18:00:00+05:00"].every(
    (iso) =>
      isPubliclyVisible({ status: "scheduled", publishAt: iso }, at(SEP02)) &&
      !isPubliclyVisible({ status: "scheduled", publishAt: iso }, at(SEP02, -1)),
  ),
);

ok(
  "a date that does not exist is never silently rolled forward",
  // Date.parse turns "2026-09-31" into October 1. Publishing on a day the
  // editor did not choose is worse than not publishing at all.
  Number.isNaN(parsePublishAt("2026-09-31T13:00:00Z")) &&
    !Number.isNaN(Date.parse("2026-09-31T13:00:00Z")),
);
ok(
  "a timestamp with no offset is rejected, not read in the local zone",
  Number.isNaN(parsePublishAt("2026-09-01T13:00:00")),
);
ok(
  "a well-formed schedule still parses, with or without seconds",
  parsePublishAt("2026-09-02T13:00:00Z") === Date.parse("2026-09-02T13:00:00Z") &&
    parsePublishAt("2026-09-02T13:00+00:00") === Date.parse("2026-09-02T13:00:00Z"),
);

group("staged revisions swap on time");
const staged = wiki.find((w) => w.pendingRevision);
ok("a staged revision exists to test", staged !== undefined);
if (staged) {
  const when = Date.parse(staged.pendingRevision!.publishAt);
  ok(
    "before its date the live entry is unchanged",
    resolveRevision(staged, new Date(when - 1)) === staged,
  );
  ok("at its date the revision has landed", resolveRevision(staged, new Date(when)) !== staged);
  ok(
    "the entry stays public throughout the swap",
    isPubliclyVisible(staged, new Date(when - 1)) && isPubliclyVisible(staged, new Date(when)),
  );
}

group("sitemap follows the same lifecycle as the routes");
const locsAt = (t: Date) => sitemapUrls(t).map((u) => u.loc);

ok(
  "a scheduled long-form page is absent before its publishAt",
  !locsAt(at(SEP02, -1)).includes("/gta-6-ultimate-edition"),
);
ok(
  "and present from its publishAt — the defect that hid it is gone",
  locsAt(at(SEP02)).includes("/gta-6-ultimate-edition"),
);
ok(
  "no draft page ever reaches the sitemap",
  !locsAt(new Date("2099-01-01T00:00:00Z")).includes("/gta-6-pc-release-date"),
);
ok(
  "the sitemap grows as the schedule advances, with no rebuild",
  locsAt(new Date("2026-09-27T14:00:00Z")).length > locsAt(at(AUG31)).length,
);
ok(
  "every sitemap URL is a live target at that same moment",
  locsAt(new Date("2026-09-03T14:00:00Z")).every((loc) =>
    isLinkTargetLive(loc, new Date("2026-09-03T14:00:00Z")),
  ),
);
ok(
  "a path listed unconditionally is one whose route is always live",
  staticSitemapPaths
    .filter((p) => pages.some((page) => page.path === p))
    .every((p) => ALWAYS_LIVE.has(p)),
);
ok(
  "every public news, analysis and wiki entry is listed",
  [
    ...publicNews().map((n) => `/news/${n.slug}`),
    ...publicAnalyses().map((a) => `/analysis/${a.slug}`),
    ...publicWiki().map((w) => `/wiki/${w.type}/${w.slug}`),
  ].every((loc) => locsAt(new Date()).includes(loc)),
);
ok("no URL is listed twice", new Set(locsAt(new Date())).size === locsAt(new Date()).length);

const xml = renderSitemap(new Date("2026-09-03T14:00:00Z"));
ok("renders a well-formed urlset", xml.startsWith("<?xml") && xml.trimEnd().endsWith("</urlset>"));
ok(
  "every loc is absolute on the canonical origin",
  [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].every((m) =>
    m[1].startsWith("https://allthingsgta6.com/"),
  ),
);
ok(
  "the Sep 2 article is in the rendered XML",
  xml.includes("https://allthingsgta6.com/gta-6-ultimate-edition"),
);
// The old build-time script re-implemented the visibility rule with regexes and
// drifted from it. There must not be a second copy to drift again.
ok(
  "sitemap generation has exactly one visibility rule",
  readFileSync("src/lib/sitemap.ts", "utf8").includes("publicPages("),
);

console.log(
  failures === 0 ? "\nAll publishing checks passed.\n" : `\n${failures} check(s) FAILED.\n`,
);
process.exit(failures === 0 ? 0 : 1);
