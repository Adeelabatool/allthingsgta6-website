import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { newsByCategory, newsCategories } from "@/data/news";

export const Route = createFileRoute("/news/category/$category")({
  loader: ({ params }) => {
    const items = newsByCategory(params.category);
    const meta = newsCategories.find((c) => c.slug === params.category);
    if (!meta) throw notFound();
    return { items, meta };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.meta.label} — GTA 6 News` },
          { name: "description", content: `Latest GTA 6 ${loaderData.meta.label.toLowerCase()} news, analysis, and updates.` },
          { property: "og:title", content: `${loaderData.meta.label} — GTA 6 News` },
          { property: "og:url", content: `https://allthingsgta6.com/news/category/${loaderData.meta.slug}` },
        ]
      : [],
    links: loaderData ? [{ rel: "canonical", href: `https://allthingsgta6.com/news/category/${loaderData.meta.slug}` }] : [],
  }),
  component: NewsCategoryPage,
});

function NewsCategoryPage() {
  const { items, meta } = Route.useLoaderData();
  return (
    <SiteShell>
      <header className="container-page pt-10 pb-6">
        <Link to="/news" className="text-sm text-accent hover:underline">← All News</Link>
        <h1 className="heading-display text-4xl md:text-6xl mt-3">{meta.label}</h1>
        <p className="mt-2 text-muted-foreground">{items.length} article{items.length === 1 ? "" : "s"} in this category.</p>
      </header>
      <div className="container-page grid gap-4 md:grid-cols-2 lg:grid-cols-3 pb-16">
        {items.map((n: typeof items[number]) => (
          <Link key={n.slug} to="/news/$slug" params={{ slug: n.slug }} className="surface surface-hover p-5">
            <div className="text-xs text-muted-foreground">{n.date}</div>
            <h2 className="mt-2 font-bold text-lg leading-tight">{n.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{n.summary}</p>
          </Link>
        ))}
        {items.length === 0 && <div className="text-muted-foreground">No articles yet in this category.</div>}
      </div>
    </SiteShell>
  );
}
