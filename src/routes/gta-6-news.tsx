import { createFileRoute } from "@tanstack/react-router";
import { PillarHub } from "@/components/PillarHub";
import { news } from "@/data/news";
import { analyses } from "@/data/analysis";

export const Route = createFileRoute("/gta-6-news")({
  head: () => ({
    meta: [
      { title: "GTA 6 News Hub — All Updates, Leaks & Trailers" },
      { name: "description", content: "The complete GTA 6 news hub: Rockstar updates, leaks, trailer news, release updates, and analysis — all in one place." },
      { property: "og:title", content: "GTA 6 News Hub — AllThingsGTA6" },
      { property: "og:url", content: "https://allthingsgta6.com/gta-6-news" },
    ],
    links: [{ rel: "canonical", href: "https://allthingsgta6.com/gta-6-news" }],
  }),
  component: () => (
    <PillarHub
      eyebrow="SEO Hub"
      title="Everything GTA 6 News"
      lede="Every confirmed update, every leak, every trailer reaction — structured and cross-linked to our wiki and analysis layers."
      sections={[
        {
          title: "Latest News",
          items: news.slice(0, 6).map((n) => ({ href: `/news/${n.slug}`, label: n.title, desc: n.summary })),
        },
        {
          title: "Editorial Analysis",
          items: analyses.slice(0, 3).map((a) => ({ href: `/analysis/${a.slug}`, label: a.title, desc: a.hook })),
        },
        {
          title: "Browse by Category",
          items: [
            { href: "/news/category/rockstar-updates", label: "Rockstar Updates", desc: "Official Rockstar Newswire coverage." },
            { href: "/news/category/leaks", label: "Leaks", desc: "Verified and unverified leak analysis." },
            { href: "/news/category/trailer-news", label: "Trailer News", desc: "Frame-by-frame trailer breakdowns." },
            { href: "/news/category/release-updates", label: "Release Updates", desc: "Date confirmations, delays, windows." },
            { href: "/news/category/community-reactions", label: "Community Reactions", desc: "Reddit, X, YouTube response reports." },
          ],
        },
      ]}
    />
  ),
});
