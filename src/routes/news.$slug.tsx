import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { newsBySlug, news } from "@/data/news";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const item = newsBySlug(params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — AllThingsGTA6` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.summary },
          { property: "og:type", content: "article" },
          { property: "og:url", content: `https://allthingsgta6.com/news/${loaderData.slug}` },
        ]
      : [],
    links: loaderData ? [{ rel: "canonical", href: `https://allthingsgta6.com/news/${loaderData.slug}` }] : [],
  }),
  component: NewsArticle,
  notFoundComponent: () => (
    <SiteShell><div className="container-page py-24 text-center"><h1 className="text-3xl font-extrabold">Article not found</h1></div></SiteShell>
  ),
});

function NewsArticle() {
  const n = Route.useLoaderData();
  const related = news.filter((x) => x.category === n.category && x.slug !== n.slug).slice(0, 3);

  return (
    <SiteShell>
      <article className="container-page py-10 max-w-3xl">
        <Link to="/news" className="text-sm text-accent hover:underline">← All News</Link>
        <div className="mt-4 flex items-center gap-2 flex-wrap text-xs">
          <Link to="/news/category/$category" params={{ category: n.category }} className="chip chip-hot">{n.category.replace("-", " ")}</Link>
          <span className="text-muted-foreground">{n.date}</span>
        </div>
        <h1 className="heading-display text-3xl md:text-5xl mt-3">{n.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{n.summary}</p>

        <Section title="What happened">{n.whatHappened}</Section>
        <Section title="Source">
          <a href={n.source.url} target="_blank" rel="noreferrer" className="text-accent underline">
            {n.source.label} →
          </a>
        </Section>
        <Section title="Analysis">{n.analysis}</Section>
        <Section title="What it means for GTA 6">{n.meansForGta6}</Section>

        {n.related && n.related.length > 0 && (
          <div className="mt-10 surface p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Related Intel</div>
            <ul className="space-y-2">
              {n.related.map((r: NonNullable<typeof n.related>[number]) => (
                <li key={r.href}>
                  <a href={r.href} className="text-accent hover:underline">{r.label} →</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-3">More in {n.category.replace("-", " ")}</h3>
            <div className="grid gap-3 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to="/news/$slug" params={{ slug: r.slug }} className="surface surface-hover p-4">
                  <div className="text-xs text-muted-foreground">{r.date}</div>
                  <div className="font-semibold mt-1 line-clamp-3">{r.title}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </SiteShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-xs uppercase tracking-widest text-accent font-bold">{title}</h2>
      <div className="mt-2 text-foreground/90 leading-relaxed">{children}</div>
    </section>
  );
}
