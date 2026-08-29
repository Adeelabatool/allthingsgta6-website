import { formatVerifiedDate } from "@/lib/publishing";

/**
 * Visible freshness signal, machine-readable via <time dateTime>.
 *
 * Shown on time-sensitive and evergreen pages alike so a reader can tell at a
 * glance how recently the claims were checked against first-party sources.
 */
export function LastVerified({ date, note }: { date: string; note?: string }) {
  return (
    <p className="mt-3 text-xs text-muted-foreground">
      <span className="uppercase tracking-widest font-semibold">Last verified</span>{" "}
      <time dateTime={date}>{formatVerifiedDate(date)}</time>
      {note ? <span className="block mt-1 not-italic">{note}</span> : null}
    </p>
  );
}
