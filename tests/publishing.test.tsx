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
  statusOf,
  formatVerifiedDate,
  type Publishable,
} from "@/lib/publishing";
import { news, publicNews, newsBySlug, newsByCategory } from "@/data/news";
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
