import { SITE_IMAGE, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

/**
 * Renders a JSON-LD block. Kept as a plain inline script so it serialises
 * during SSR without depending on head-tag ordering.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped below; "<" is the only character that
      // could terminate the script element early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const publisher = {
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
};

export type ArticleSchemaType = "Article" | "NewsArticle";

/**
 * Article / NewsArticle structured data.
 *
 * NewsArticle is for genuine time-sensitive reporting. Everything evergreen —
 * guides, analysis, entity pages — uses Article.
 *
 * Note there is deliberately no FAQPage output anywhere in this module. Visible
 * FAQ content is fine when it answers a real question; FAQ schema purely for
 * search visibility is not something we emit.
 */
export function ArticleJsonLd(props: {
  type: ArticleSchemaType;
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  /**
   * Sources the article cites. Many are cited by publisher and title without a
   * URL; only those carrying one become schema citations.
   */
  sources?: { label: string; url?: string; needsReview?: boolean }[];
}) {
  const url = absoluteUrl(props.path);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": props.type,
    headline: props.headline,
    description: props.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: props.datePublished,
    dateModified: props.dateModified ?? props.datePublished,
    image: [SITE_IMAGE],
    author: publisher,
    publisher,
    isAccessibleForFree: true,
  };

  const linked = props.sources?.filter((s) => s.url);
  if (linked?.length) {
    data.citation = linked.map((s) => ({
      "@type": "CreativeWork",
      name: s.label,
      url: s.url,
    }));
  }

  return <JsonLd data={data} />;
}

export interface Crumb {
  label: string;
  /** Site-relative path. Omitted on the final crumb (the current page). */
  href?: string;
}

export function BreadcrumbJsonLd({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.label,
          ...(c.href ? { item: absoluteUrl(c.href) } : {}),
        })),
      }}
    />
  );
}
