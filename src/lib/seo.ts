// Central SEO/structured-data helpers.
//
// Breadcrumb JSON-LD is generated here and nowhere else, so every page emits the
// same shape: a BreadcrumbList whose ListItems always carry a non-empty "name"
// and an absolute "item" URL — including the final (current page) crumb, which
// is the one Google flags as `Missing field "item"` when it is omitted.

export const SITE_URL = "https://allthingsgta6.com";

/**
 * Turns a site-relative path into an absolute canonical URL on SITE_URL.
 * Pure string math so SSR and client hydration always produce identical output.
 */
export function absoluteUrl(path: string): string {
  const raw = typeof path === "string" ? path.trim() : "";
  if (!raw) return `${SITE_URL}/`;
  if (/^https?:\/\//i.test(raw)) return raw;
  const withLeadingSlash = raw.startsWith("/") ? raw : `/${raw}`;
  const normalized = withLeadingSlash.replace(/\/+$/, "");
  return `${SITE_URL}${normalized === "" ? "/" : normalized}`;
}

export type Crumb = {
  /** Visible label. Empty labels are dropped rather than emitted. */
  name: string;
  /** Site-relative path (or absolute URL) for this crumb. Never omitted. */
  path: string;
};

type BreadcrumbListItem = {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
};

type BreadcrumbListSchema = {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: BreadcrumbListItem[];
};

/** Every trail starts at the home page. */
const HOME_CRUMB: Crumb = { name: "Home", path: "/" };

/** Shared crumbs for the site's top-level sections, so labels stay consistent. */
export const SECTION_CRUMBS = {
  news: { name: "News", path: "/news" },
  analysis: { name: "Analysis", path: "/analysis" },
  wiki: { name: "Wiki", path: "/wiki" },
  tools: { name: "Tools", path: "/tools" },
} satisfies Record<string, Crumb>;

/**
 * Builds a valid BreadcrumbList, or null if nothing valid is left.
 * Invariants enforced here (not at call sites):
 *  - name is trimmed and never empty
 *  - item is always an absolute URL on SITE_URL, never undefined/null/empty
 *  - positions start at 1 and increase sequentially with no gaps
 *  - the same URL is not repeated inside one trail
 */
export function buildBreadcrumbList(crumbs: Crumb[]): BreadcrumbListSchema | null {
  const itemListElement: BreadcrumbListItem[] = [];
  const seen = new Set<string>();

  for (const crumb of crumbs) {
    const name = typeof crumb?.name === "string" ? crumb.name.trim() : "";
    const path = typeof crumb?.path === "string" ? crumb.path.trim() : "";
    if (!name || !path) {
      if (import.meta.env.DEV) {
        console.warn("[seo] dropped breadcrumb crumb with empty name or path:", crumb);
      }
      continue;
    }
    const item = absoluteUrl(path);
    if (seen.has(item)) continue;
    seen.add(item);
    itemListElement.push({
      "@type": "ListItem",
      position: itemListElement.length + 1,
      name,
      item,
    });
  }

  if (itemListElement.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

/**
 * Head `scripts` entries carrying a page's breadcrumb trail as JSON-LD.
 *
 * Pass the crumbs *below* Home (Home is prepended automatically); the last
 * crumb is the current page and receives its own canonical absolute URL just
 * like every other crumb — Google reports `Missing field "item"` when the
 * current-page ListItem is emitted without one.
 *
 * Returns an array so a page with no valid trail emits nothing at all rather
 * than a malformed BreadcrumbList. The JSON is serialised identically on the
 * server and on the client, so hydration cannot produce differing markup.
 */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  const schema = buildBreadcrumbList([HOME_CRUMB, ...crumbs]);
  if (!schema) return [];
  return [
    {
      type: "application/ld+json",
      // Escape "<" so a title can never break out of the <script> element.
      children: JSON.stringify(schema).replace(/</g, "\\u003c"),
    },
  ];
}

/**
 * Breadcrumb crumb for a news article's category. Falls back to the News
 * section crumb (which buildBreadcrumbList then dedupes away) for an unknown
 * category, so a ListItem is never emitted with an empty name or a dead URL.
 */
export function newsCategoryCrumb(category: string): Crumb {
  const meta = NEWS_CATEGORY_LABELS[category];
  return meta ? { name: meta, path: `/news/category/${category}` } : SECTION_CRUMBS.news;
}

const NEWS_CATEGORY_LABELS: Record<string, string> = {
  "rockstar-updates": "Rockstar Updates",
  leaks: "Leaks",
  "trailer-news": "Trailer News",
  "release-updates": "Release Updates",
  "community-reactions": "Community Reactions",
};

export const SITE_NAME = "AllThingsGTA6";

/** Default sharing image, also used as the structured-data image of record. */
export const SITE_IMAGE = `${SITE_URL}/og-cover.svg`;

/**
 * The head fragment every article-like page shares: title, description, Open
 * Graph, a self-referencing canonical, and the page's breadcrumb JSON-LD.
 *
 * Breadcrumbs are built by breadcrumbJsonLd() above, so every ListItem — the
 * current page included — carries an absolute `item` URL. Pass the crumbs
 * *below* Home; Home is prepended for you.
 *
 * Rule: a published article always canonicalises to itself. Consolidation onto
 * another URL is a deliberate, page-by-page decision, so `canonicalOverride`
 * has to be passed explicitly — it is never inferred.
 */
export function articleHead(opts: {
  path: string;
  title: string;
  description: string;
  canonicalOverride?: string;
  crumbs?: Crumb[];
}) {
  const canonical = opts.canonicalOverride ?? absoluteUrl(opts.path);
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: canonical },
      { property: "og:image", content: SITE_IMAGE },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: breadcrumbJsonLd(opts.crumbs ?? []),
  };
}
