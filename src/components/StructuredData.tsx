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

/** Trims a date field and treats an empty or whitespace-only value as absent. */
function normaliseDate(value: string | undefined): string | undefined {
  const trimmed = typeof value === "string" ? value.trim() : "";
  return trimmed === "" ? undefined : trimmed;
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
  /** The article's own lead image, when it has one. */
  image?: string;
}) {
  const url = absoluteUrl(props.path);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": props.type,
    headline: props.headline,
    description: props.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [props.image ?? SITE_IMAGE],
    author: publisher,
    publisher,
    isAccessibleForFree: true,
  };

  // An entry with no publication date on record — several wiki entities predate
  // the lifecycle fields — used to emit datePublished:"" and dateModified:"",
  // which is an invalid date and worse than the field being absent. Omit both
  // rather than inventing a date, and never let dateModified claim a freshness
  // the page has not earned: it is the real lastVerified or nothing.
  const datePublished = normaliseDate(props.datePublished);
  const dateModified = normaliseDate(props.dateModified) ?? datePublished;
  if (datePublished) data.datePublished = datePublished;
  if (dateModified) data.dateModified = dateModified;

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
