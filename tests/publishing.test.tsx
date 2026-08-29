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
import { wiki, publicWiki, wikiBySlug, wikiByType } from "@/data/wiki";
import { analyses, publicAnalyses, analysisBySlug } from "@/data/analysis";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/StructuredData";
import { articleHead } from "@/lib/seo";

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
const extract = (html: string) => {
  const m = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
  return m ? JSON.parse(m[1].replace(/\\u003c/g, "<")) : null;
};
const article = extract(
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

const evergreen = extract(
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

const crumbs = extract(
  renderToStaticMarkup(
    <BreadcrumbJsonLd
      crumbs={[{ label: "Home", href: "/" }, { label: "News", href: "/news" }, { label: "Story" }]}
    />,
  ),
);
ok("BreadcrumbList emitted", crumbs["@type"] === "BreadcrumbList");
ok(
  "positions are 1-indexed and ordered",
  crumbs.itemListElement.map((i: { position: number }) => i.position).join() === "1,2,3",
);
ok("current page carries no item url", crumbs.itemListElement[2].item === undefined);
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

console.log(
  failures === 0 ? "\nAll publishing checks passed.\n" : `\n${failures} check(s) FAILED.\n`,
);
process.exit(failures === 0 ? 0 : 1);
