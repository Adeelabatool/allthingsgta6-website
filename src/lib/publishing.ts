/**
 * Draft / scheduled / published lifecycle for every content type on the site.
 *
 * The rule this module exists to enforce: nothing that is a draft, and nothing
 * whose publishAt is still in the future, may ever reach a public surface —
 * article routes, index pages, category pages, homepage modules, related-content
 * widgets, feeds, or the XML sitemap.
 *
 * Every filter fails closed. An entry with a status we cannot interpret, or a
 * publishAt we cannot parse, stays hidden rather than leaking.
 */

export type PublishStatus = "draft" | "scheduled" | "published";

export interface Publishable {
  /** Defaults to "published" when omitted, so pre-existing entries keep rendering. */
  status?: PublishStatus;
  /** ISO 8601 with offset, e.g. "2026-09-04T14:00:00Z". Required when status is "scheduled". */
  publishAt?: string;
  /** ISO date (YYYY-MM-DD) of the last first-party source check. */
  lastVerified?: string;
}

/** Entries with no explicit status are treated as already published. */
export function statusOf(item: Publishable): PublishStatus {
  return item.status ?? "published";
}

/**
 * True only when the entry may be shown to the public right now.
 *
 * draft      → never.
 * published  → always.
 * scheduled  → only once publishAt has passed. A scheduled entry with a missing
 *              or unparseable publishAt stays hidden; that is the safe failure.
 */
export function isPubliclyVisible(item: Publishable, now: Date = new Date()): boolean {
  switch (statusOf(item)) {
    case "draft":
      return false;
    case "published":
      return true;
    case "scheduled": {
      if (!item.publishAt) return false;
      const at = Date.parse(item.publishAt);
      return !Number.isNaN(at) && at <= now.getTime();
    }
    default:
      return false;
  }
}

/** The public subset of a collection. Use this everywhere a list is rendered. */
export function publicOnly<T extends Publishable>(items: T[], now: Date = new Date()): T[] {
  return items.filter((item) => isPubliclyVisible(item, now));
}

/**
 * Look up a single entry, returning undefined when it is not publicly visible.
 * Route loaders use this so a scheduled URL 404s until its moment arrives.
 */
export function publicEntry<T extends Publishable>(
  item: T | undefined,
  now: Date = new Date(),
): T | undefined {
  return item && isPubliclyVisible(item, now) ? item : undefined;
}

/** Entries still awaiting publication, soonest first. Editorial tooling only. */
export function pendingQueue<T extends Publishable>(items: T[], now: Date = new Date()): T[] {
  return items
    .filter((item) => !isPubliclyVisible(item, now))
    .sort((a, b) => Date.parse(a.publishAt ?? "") - Date.parse(b.publishAt ?? ""));
}

/** "August 29, 2026" — used for the visible freshness line. */
export function formatVerifiedDate(iso: string): string {
  const parsed = Date.parse(iso.length === 10 ? `${iso}T00:00:00Z` : iso);
  if (Number.isNaN(parsed)) return iso;
  return new Date(parsed).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** The datePublished a search engine should see: publishAt when set, else the display date. */
export function publishedTimestamp(item: Publishable & { date: string }): string {
  return item.publishAt ?? item.date;
}
