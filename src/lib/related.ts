import { analyses } from "@/data/analysis";
import { news } from "@/data/news";
import { pages } from "@/data/pages";
import { wiki } from "@/data/wiki";
import { isPubliclyVisible } from "@/lib/publishing";

/**
 * Contextual links are authored against the finished site, but the site is
 * published over a month. A link written on day 3 to a page that arrives on
 * day 9 would ship a 404 for six days.
 *
 * These helpers resolve a link target's live state at render time, so an
 * authored link simply appears once its target is published. Nothing has to be
 * re-ordered by hand, and a target that slips or stays a draft never leaks a
 * dead link.
 */

/**
 * Routes that exist and serve content today. The six hub routes keep their
 * current page until a scheduled upgrade swaps in, so linking to them is always
 * safe; the rest are permanent site furniture.
 */
export const ALWAYS_LIVE = new Set([
  "/",
  "/about",
  "/analysis",
  "/gta-6-characters",
  "/gta-6-map",
  "/gta-6-news",
  "/gta-6-release-date",
  "/gta-6-vehicles",
  "/gta-6-weapons",
  "/news",
  "/system-requirements",
  "/tools",
  "/tools/countdown",
  "/tools/hype-calculator",
  "/tools/map",
  "/tools/vehicle-comparator",
  "/wiki",
]);

export function isLinkTargetLive(href: string, now: Date = new Date()): boolean {
  if (!href.startsWith("/")) return true; // external links are not ours to gate
  if (ALWAYS_LIVE.has(href)) return true;

  const page = pages.find((p) => p.path === href);
  if (page) return isPubliclyVisible(page, now);

  // Must precede the /news/ slug branch: "/news/category/leaks" also starts
  // with "/news/", and slicing it as a slug matches no article, so category
  // links were being dropped as dead.
  if (href.startsWith("/news/category/")) return true;

  const newsSlug = href.startsWith("/news/") ? href.slice("/news/".length) : null;
  if (newsSlug) {
    const item = news.find((n) => n.slug === newsSlug);
    return item ? isPubliclyVisible(item, now) : false;
  }

  const analysisSlug = href.startsWith("/analysis/") ? href.slice("/analysis/".length) : null;
  if (analysisSlug) {
    const item = analyses.find((a) => a.slug === analysisSlug);
    return item ? isPubliclyVisible(item, now) : false;
  }

  if (href.startsWith("/wiki/")) {
    const [, , type, slug] = href.split("/");
    const entry = wiki.find((w) => w.type === type && w.slug === slug);
    return entry ? isPubliclyVisible(entry, now) : false;
  }

  return false;
}

/** Drops contextual links whose target is not published yet. */
export function liveLinks<T extends { href: string }>(items: T[] | undefined, now?: Date): T[] {
  return (items ?? []).filter((item) => isLinkTargetLive(item.href, now));
}
