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

/**
 * A staged edit to an entry that is ALREADY live.
 *
 * Setting status:"scheduled" on a published page would unpublish it until its
 * date — the wrong behaviour for an update-in-place. A pending revision instead
 * leaves the live page exactly as it is and swaps in `changes` once publishAt
 * passes, so the URL is never dark and never serves stale copy past its date.
 *
 * Revisions stay editable right up to their moment; editing one changes what
 * goes live, with no republish step.
 */
export interface PendingRevision<T> {
  /** ISO 8601 with offset. When this passes, `changes` take effect. */
  publishAt: string;
  /** Freshness stamp that replaces the entry's own once the revision lands. */
  lastVerified?: string;
  /** Editorial note on what changed and why. Never rendered to readers. */
  note?: string;
  changes: Partial<T>;
}

export interface Publishable {
  /** Defaults to "published" when omitted, so pre-existing entries keep rendering. */
  status?: PublishStatus;
  /**
   * ISO 8601 with an explicit offset, e.g. "2026-09-04T14:00:00Z". Required when
   * status is "scheduled". Anything else — no offset, or a date that does not
   * exist — keeps the entry hidden. See parsePublishAt.
   */
  publishAt?: string;
  /** ISO date (YYYY-MM-DD) of the last first-party source check. */
  lastVerified?: string;
}

/**
 * ISO 8601 with an explicit UTC offset. A schedule without one is ambiguous —
 * it would mean a different instant depending on where the runtime thinks it
 * is — so it is rejected rather than guessed at.
 */
const ISO_WITH_OFFSET =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

/**
 * Epoch milliseconds for a schedule, or NaN if it is not one we will act on.
 *
 * Date.parse alone is not enough. It accepts "2026-09-31T13:00:00Z" and rolls
 * it forward to October 1 — so a typo in a date would not fail, it would
 * publish on the wrong day, which is the failure mode hardest to notice. It
 * also accepts strings with no offset and reads them in the runtime's local
 * zone. Both are rejected here so every caller fails closed on the same rule.
 */
export function parsePublishAt(value: string | undefined): number {
  if (!value) return NaN;

  const match = ISO_WITH_OFFSET.exec(value);
  if (!match) return NaN;

  const [, year, month, day, hour, minute, second = "00"] = match;
  const monthIndex = Number(month);
  if (monthIndex < 1 || monthIndex > 12) return NaN;

  // Day 0 of the next month is the last day of this one.
  const daysInMonth = new Date(Date.UTC(Number(year), monthIndex, 0)).getUTCDate();
  if (Number(day) < 1 || Number(day) > daysInMonth) return NaN;
  if (Number(hour) > 23 || Number(minute) > 59 || Number(second) > 59) return NaN;

  return Date.parse(value);
}

/** Shape shared by anything carrying a staged revision. */
type Revisable = { pendingRevision?: PendingRevision<unknown> };

/**
 * Applies a staged revision once it is due, otherwise returns the entry
 * untouched. Callers get one object and never have to know a revision existed.
 */
export function resolveRevision<T extends Revisable>(item: T, now: Date = new Date()): T {
  const rev = item.pendingRevision;
  if (!rev) return item;

  // A revision we cannot read stays unapplied: the live page keeps serving.
  const at = parsePublishAt(rev.publishAt);
  if (Number.isNaN(at) || at > now.getTime()) return item;

  const { pendingRevision: _dropped, ...base } = item;
  return {
    ...(base as T),
    ...(rev.changes as Partial<T>),
    ...(rev.lastVerified ? { lastVerified: rev.lastVerified } : {}),
  };
}

/** Revisions still waiting to land, soonest first. Editorial tooling only. */
export function pendingRevisions<T extends Revisable>(items: T[], now: Date = new Date()): T[] {
  return items
    .filter((i) => {
      const at = i.pendingRevision && parsePublishAt(i.pendingRevision.publishAt);
      return typeof at === "number" && !Number.isNaN(at) && at > now.getTime();
    })
    .sort(
      (a, b) => Date.parse(a.pendingRevision!.publishAt) - Date.parse(b.pendingRevision!.publishAt),
    );
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
      const at = parsePublishAt(item.publishAt);
      return !Number.isNaN(at) && at <= now.getTime();
    }
    default:
      return false;
  }
}

/**
 * The public subset of a collection, with any due revisions already applied.
 * Use this everywhere a list is rendered.
 */
export function publicOnly<T extends Publishable & Revisable>(
  items: T[],
  now: Date = new Date(),
): T[] {
  return items
    .filter((item) => isPubliclyVisible(item, now))
    .map((item) => resolveRevision(item, now));
}

/**
 * Look up a single entry, returning undefined when it is not publicly visible.
 * Route loaders use this so a scheduled URL 404s until its moment arrives.
 */
export function publicEntry<T extends Publishable & Revisable>(
  item: T | undefined,
  now: Date = new Date(),
): T | undefined {
  return item && isPubliclyVisible(item, now) ? resolveRevision(item, now) : undefined;
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
