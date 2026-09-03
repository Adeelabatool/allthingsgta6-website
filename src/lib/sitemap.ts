/**
 * XML sitemap, built from the same accessors the routes use.
 *
 * This used to be a build-time script that re-implemented the visibility rule
 * with regexes over the data files. Two problems followed from that, and both
 * are why this module exists:
 *
 *   1. The copy drifted. The script silently dropped every scheduled long-form
 *      page, so those URLs went live without ever entering the sitemap.
 *   2. A build-time sitemap cannot gain a URL that becomes public between
 *      deploys. Routes activate on the clock; the sitemap only activated on a
 *      deployment, so the two disagreed for as long as nobody shipped.
 *
 * Generating at request time from `publicNews()` / `publicAnalyses()` /
 * `publicWiki()` / `publicPages()` fixes both: there is one visibility rule
 * (src/lib/publishing.ts), and the sitemap moves when the routes move.
 */
import { publicAnalyses } from "@/data/analysis";
import { newsCategories, publicNews } from "@/data/news";
import { publicPages } from "@/data/pages";
import { publicWiki } from "@/data/wiki";

export const SITE_URL = "https://allthingsgta6.com";

/**
 * Routes that are not lifecycle-managed content: hubs, tools, indexes. The six
 * hub paths that also exist in pages.ts are listed here because their route
 * serves a live page today and only swaps its body when the scheduled upgrade
 * lands — they are never dark, so they are never withheld.
 */
const STATIC_PAGES: [path: string, changefreq: string, priority: string][] = [
  ["/", "daily", "1.0"],
  ["/gta-6-release-date", "weekly", "0.9"],
  ["/gta-6-news", "daily", "0.9"],
  ["/gta-6-characters", "weekly", "0.8"],
  ["/gta-6-map", "weekly", "0.8"],
  ["/gta-6-vehicles", "weekly", "0.8"],
  ["/gta-6-weapons", "weekly", "0.8"],
  ["/system-requirements", "weekly", "0.8"],
  ["/news", "daily", "0.8"],
  ["/analysis", "weekly", "0.7"],
  ["/wiki", "weekly", "0.7"],
  ["/tools", "monthly", "0.6"],
  ["/tools/countdown", "monthly", "0.6"],
  ["/tools/hype-calculator", "monthly", "0.5"],
  ["/tools/map", "monthly", "0.5"],
  ["/tools/vehicle-comparator", "monthly", "0.5"],
  ["/about", "monthly", "0.5"],
];

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq: string;
  priority: string;
}

/** Every URL a crawler may see right now, in stable order. */
export function sitemapUrls(now: Date = new Date()): SitemapUrl[] {
  const staticPaths = new Set(STATIC_PAGES.map(([p]) => p));

  return [
    ...STATIC_PAGES.map(([loc, changefreq, priority]) => ({ loc, changefreq, priority })),
    ...newsCategories.map((c) => ({
      loc: `/news/category/${c.slug}`,
      changefreq: "daily",
      priority: "0.6",
    })),
    // The long-form guide and entity pages. Previously computed and then
    // dropped on the floor, which is the defect this line repairs.
    ...publicPages(now)
      .filter((p) => !staticPaths.has(p.path))
      .map((p) => ({
        loc: p.path,
        lastmod: p.lastVerified,
        changefreq: "weekly",
        priority: "0.8",
      })),
    ...publicNews(now).map((n) => ({
      loc: `/news/${n.slug}`,
      lastmod: n.lastVerified,
      changefreq: "monthly",
      priority: "0.7",
    })),
    ...publicAnalyses(now).map((a) => ({
      loc: `/analysis/${a.slug}`,
      lastmod: a.lastVerified,
      changefreq: "monthly",
      priority: "0.7",
    })),
    ...publicWiki(now).map((w) => ({
      loc: `/wiki/${w.type}/${w.slug}`,
      lastmod: w.lastVerified,
      changefreq: "monthly",
      priority: "0.6",
    })),
  ];
}

/** The paths STATIC_PAGES lists unconditionally. Asserted on by the tests. */
export const staticSitemapPaths = STATIC_PAGES.map(([p]) => p);

export function renderSitemap(now: Date = new Date()): string {
  const today = now.toISOString().slice(0, 10);
  const body = sitemapUrls(now)
    .map(
      (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${u.lastmod ?? today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}
