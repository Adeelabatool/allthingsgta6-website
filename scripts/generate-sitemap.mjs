// Generates public/sitemap.xml from the route tree + data files.
// Runs automatically before every build via the "prebuild" npm script.
//
// Drafts and scheduled entries whose publishAt has not passed are excluded.
// This mirrors src/lib/publishing.ts — if the visibility rule changes there,
// change it here too, or the sitemap will start advertising unpublished URLs.
//
// CHANGE THIS if your domain is different:
const SITE_URL = "https://allthingsgta6.com";

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const today = new Date().toISOString().slice(0, 10);
const now = Date.now();

/**
 * Splits a data file into one window of source per entry, keyed by slug, so
 * per-entry fields can be read without a full TypeScript parse. Each entry in
 * these files contains exactly one `slug:` key, which is what makes this safe.
 */
function parseEntries(file) {
  const src = readFileSync(file, "utf8");
  const matches = [...src.matchAll(/slug:\s*"([^"]+)"/g)];
  return matches.map((m, i) => {
    const start = m.index;
    const end = i + 1 < matches.length ? matches[i + 1].index : src.length;
    const window = src.slice(start, end);
    const field = (name) => window.match(new RegExp(`${name}:\\s*"([^"]+)"`))?.[1];
    return {
      slug: m[1],
      type: field("type"),
      status: field("status") ?? "published",
      publishAt: field("publishAt"),
      lastVerified: field("lastVerified"),
    };
  });
}

/** Mirrors isPubliclyVisible() in src/lib/publishing.ts. Fails closed. */
function isPublic(entry) {
  if (entry.status === "draft") return false;
  if (entry.status === "published") return true;
  if (entry.status === "scheduled") {
    if (!entry.publishAt) return false;
    const at = Date.parse(entry.publishAt);
    return !Number.isNaN(at) && at <= now;
  }
  return false;
}

const newsSrc = readFileSync("src/data/news.ts", "utf8");
const newsCategories = [...newsSrc.matchAll(/\{ slug: "([^"]+)", label:/g)].map((m) => m[1]);

const allNews = parseEntries("src/data/news.ts").filter((e) => !newsCategories.includes(e.slug));
const allAnalysis = parseEntries("src/data/analysis.ts");
// wikiTypes entries carry no `type:` field, which is what separates them from real entries.
const allWiki = parseEntries("src/data/wiki.ts").filter((e) => e.type);

const newsArticles = allNews.filter(isPublic);
const analysisArticles = allAnalysis.filter(isPublic);
const wikiEntries = allWiki.filter(isPublic);

const withheld =
  allNews.length -
  newsArticles.length +
  (allAnalysis.length - analysisArticles.length) +
  (allWiki.length - wikiEntries.length);

const staticPages = [
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

const urls = [
  ...staticPages.map(([p, freq, pri]) => ({ loc: p, freq, pri })),
  ...newsCategories.map((c) => ({ loc: `/news/category/${c}`, freq: "daily", pri: "0.6" })),
  ...newsArticles.map((e) => ({
    loc: `/news/${e.slug}`,
    freq: "monthly",
    pri: "0.7",
    mod: e.lastVerified,
  })),
  ...analysisArticles.map((e) => ({
    loc: `/analysis/${e.slug}`,
    freq: "monthly",
    pri: "0.7",
    mod: e.lastVerified,
  })),
  ...wikiEntries.map((e) => ({
    loc: `/wiki/${e.type}/${e.slug}`,
    freq: "monthly",
    pri: "0.6",
    mod: e.lastVerified,
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${u.mod ?? today}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.pri}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

mkdirSync("public", { recursive: true });
writeFileSync("public/sitemap.xml", xml);
console.log(
  `sitemap.xml written: ${urls.length} URLs for ${SITE_URL}` +
    (withheld > 0 ? ` (${withheld} draft/scheduled URL${withheld === 1 ? "" : "s"} withheld)` : ""),
);
