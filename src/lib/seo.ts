/** Canonical origin for every absolute URL the site emits. */
export const SITE_URL = "https://allthingsgta6.com";

export const SITE_NAME = "AllThingsGTA6";

/** Default sharing image, also used as the structured-data image of record. */
export const SITE_IMAGE = `${SITE_URL}/og-cover.svg`;

/** Absolute URL for a site-relative path. Accepts "/news/foo" or "news/foo". */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * The head fragment every article-like page shares: title, description, Open
 * Graph, and a self-referencing canonical.
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
  };
}
