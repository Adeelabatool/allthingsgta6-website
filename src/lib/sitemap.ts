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
  /**
   * Real last-modified date, or absent when we do not have one.
   *
   * Never a stand-in for "now". The renderer used to fall back to today's date
   * for any URL without a lastVerified stamp, so a piece last touched in March
   * told crawlers it had changed every single day. An omitted <lastmod> is a
   * missing signal; a fabricated one is a wrong signal, and Google discounts
   * lastmod site-wide once it stops matching the page.
   */
  lastmod?: string;
  changefreq: string;
  priority: string;
}

/**
 * The date an entry can honestly claim: when its claims were last checked,
 * else the day the version currently on the URL was published. Date-only (the
 * sitemap's W3C date form) so a timestamped publishAt reduces cleanly.
 */
function lastmodOf(entry: { lastVerified?: string; publishAt?: string; date?: string }) {
  const candidate = entry.lastVerified ?? entry.publishAt ?? entry.date;
  return candidate ? candidate.slice(0, 10) : undefined;
}

/** Every URL a crawler may see right now, in stable order. */
export function sitemapUrls(now: Date = new Date()): SitemapUrl[] {
  const staticPaths = new Set(STATIC_PAGES.map(([p]) => p));

  // Seven of the static paths are also lifecycle-managed entries in pages.ts,
  // and those carry a real freshness date the hub list does not know about.
  // Use it rather than leaving those URLs undated.
  const datedByPath = new Map(publicPages(now).map((p) => [p.path, lastmodOf(p)]));

  return [
    ...STATIC_PAGES.map(([loc, changefreq, priority]) => ({
      loc,
      lastmod: datedByPath.get(loc),
      changefreq,
      priority,
    })),
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
        lastmod: lastmodOf(p),
        changefreq: "weekly",
        priority: "0.8",
      })),
    ...publicNews(now).map((n) => ({
      loc: `/news/${n.slug}`,
      lastmod: lastmodOf(n),
      changefreq: "monthly",
      priority: "0.7",
    })),
    ...publicAnalyses(now).map((a) => ({
      loc: `/analysis/${a.slug}`,
      lastmod: lastmodOf(a),
      changefreq: "monthly",
      priority: "0.7",
    })),
    ...publicWiki(now).map((w) => ({
      loc: `/wiki/${w.type}/${w.slug}`,
      lastmod: lastmodOf(w),
      changefreq: "monthly",
      priority: "0.6",
    })),
  ];
}

/** The paths STATIC_PAGES lists unconditionally. Asserted on by the tests. */
export const staticSitemapPaths = STATIC_PAGES.map(([p]) => p);

export function renderSitemap(now: Date = new Date()): string {
  const body = sitemapUrls(now)
    .map(
      (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}
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
