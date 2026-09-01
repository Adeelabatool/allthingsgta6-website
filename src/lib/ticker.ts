import { publicNews, type NewsItem } from "@/data/news";
import { publishedTimestamp } from "@/lib/publishing";

/** Most stories the ticker will carry at once. */
export const TICKER_MAX_ITEMS = 12;

/**
 * Stories for the breaking-news ticker, newest first.
 *
 * Selection goes through publicNews(), so the publishing lifecycle is the only
 * thing deciding what appears: drafts, future-scheduled posts and unpublished
 * staged revisions are already excluded, and a scheduled story joins the ticker
 * by itself once its publishAt passes. Nothing here needs editing when new news
 * is published.
 */
export function tickerStories(now?: Date): NewsItem[] {
  return publicNews(now)
    .slice()
    .sort((a, b) => Date.parse(publishedTimestamp(b)) - Date.parse(publishedTimestamp(a)))
    .slice(0, TICKER_MAX_ITEMS);
}

/** "AUG 29". Formatted in UTC so the date never shifts a day for the reader. */
export function tickerDate(iso: string): string {
  const parsed = Date.parse(iso.length === 10 ? `${iso}T00:00:00Z` : iso);
  if (Number.isNaN(parsed)) return iso;
  return new Date(parsed)
    .toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })
    .toUpperCase();
}
