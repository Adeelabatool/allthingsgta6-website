// Generates public/sitemap.xml from the route tree + data files.
// Runs automatically before every build via the "prebuild" npm script.
// CHANGE THIS if your domain is different:
const SITE_URL = "https://allthingsgta6.com";

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const today = new Date().toISOString().slice(0, 10);

function slugs(file) {
  const src = readFileSync(file, "utf8");
  return [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}
function wikiPairs(file) {
  const src = readFileSync(file, "utf8");
  return [...src.matchAll(/slug:\s*"([^"]+)",\s*\n\s*type:\s*"([^"]+)"/g)].map(
    (m) => ({ slug: m[1], type: m[2] }),
  );
}

const newsSrc = readFileSync("src/data/news.ts", "utf8");
const newsCategories = [...newsSrc.matchAll(/\{ slug: "([^"]+)", label:/g)].map((m) => m[1]);
const newsArticles = slugs("src/data/news.ts").filter((s) => !newsCategories.includes(s));
const analysisArticles = slugs("src/data/analysis.ts");
const wikiEntries = wikiPairs("src/data/wiki.ts");

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
];

const urls = [
  ...staticPages.map(([p, freq, pri]) => ({ loc: p, freq, pri })),
  ...newsCategories.map((c) => ({ loc: `/news/category/${c}`, freq: "daily", pri: "0.6" })),
  ...newsArticles.map((s) => ({ loc: `/news/${s}`, freq: "monthly", pri: "0.7" })),
  ...analysisArticles.map((s) => ({ loc: `/analysis/${s}`, freq: "monthly", pri: "0.7" })),
  ...wikiEntries.map((w) => ({ loc: `/wiki/${w.type}/${w.slug}`, freq: "monthly", pri: "0.6" })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.pri}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

mkdirSync("public", { recursive: true });
writeFileSync("public/sitemap.xml", xml);
console.log(`sitemap.xml written: ${urls.length} URLs for ${SITE_URL}`);
