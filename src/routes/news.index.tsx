import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { news, newsCategories } from "@/data/news";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "GTA 6 News — AllThingsGTA6" },
      { name: "description", content: "All the latest Grand Theft Auto VI news: Rockstar updates, leaks, trailer news, release updates, community reactions." },
      { property: "og:title", content: "GTA 6 News — AllThingsGTA6" },
      { property: "og:description", content: "Latest GTA 6 news, leaks and updates." },
      { property: "og:url", content: "https://allthingsgta6.com/news" },
    ],
    links: [{ rel: "canonical", href: "https://allthingsgta6.com/news" }],
  }),
  component: NewsIndex,
});

function NewsIndex() {
  return (
    <SiteShell>
      <header className="container-page pt-10 pb-6">
        <span className="chip chip-hot">News Wire</span>
        <h1 className="heading-display text-4xl md:text-6xl mt-3">GTA 6 News</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">Real-time signals from Rockstar, insiders, and the community — verified and contextualized.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {newsCategories.map((c) => (
            <Link key={c.slug} to="/news/category/$category" params={{ category: c.slug }} className="chip hover:text-foreground">
              {c.label}
            </Link>
          ))}
        </div>
      </header>
      <div className="container-page grid gap-4 md:grid-cols-2 lg:grid-cols-3 pb-16">
        {news.map((n) => (
          <Link key={n.slug} to="/news/$slug" params={{ slug: n.slug }} className="surface surface-hover p-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="chip">{n.category.replace("-", " ")}</span>
              <span>{n.date}</span>
            </div>
            <h2 className="mt-3 font-bold text-lg leading-tight">{n.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{n.summary}</p>
          </Link>
        ))}
      </div>
    </SiteShell>
  );
}
