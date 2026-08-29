import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleJsonLd } from "@/components/StructuredData";
import { EvidenceStatusTable } from "@/components/Evidence";
import { LastVerified } from "@/components/LastVerified";
import { newsBySlug, publicNews } from "@/data/news";
import { articleHead } from "@/lib/seo";
import { publishedTimestamp } from "@/lib/publishing";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    // newsBySlug is gated: a draft or a scheduled post whose time has not come
    // resolves to undefined and 404s rather than leaking early.
    const item = newsBySlug(params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) =>
    loaderData
      ? articleHead({
          path: `/news/${loaderData.slug}`,
          title: loaderData.seoTitle ?? `${loaderData.title} — AllThingsGTA6`,
          description: loaderData.metaDescription ?? loaderData.summary,
          canonicalOverride: loaderData.canonicalOverride,
        })
      : { meta: [], links: [] },
  component: NewsArticle,
  notFoundComponent: () => (
    <SiteShell><div className="container-page py-24 text-center"><h1 className="text-3xl font-extrabold">Article not found</h1></div></SiteShell>
  ),
});

function NewsArticle() {
  const n = Route.useLoaderData();
  const related = publicNews()
    .filter((x) => x.category === n.category && x.slug !== n.slug)
    .slice(0, 3);
  const categoryLabel = n.category.replace(/-/g, " ");

  return (
    <SiteShell>
      <ArticleJsonLd
        type={n.schemaType ?? "NewsArticle"}
        headline={n.title}
        description={n.metaDescription ?? n.summary}
        path={`/news/${n.slug}`}
        datePublished={publishedTimestamp(n)}
        dateModified={n.lastVerified}
        sources={n.sources ?? [n.source]}
      />
      <article className="container-page py-10 max-w-3xl">
        <Breadcrumbs
          trail={[
            { label: "News", href: "/news" },
            { label: categoryLabel, href: `/news/category/${n.category}` },
            { label: n.title },
          ]}
        />
        <div className="mt-4 flex items-center gap-2 flex-wrap text-xs">
          <Link to="/news/category/$category" params={{ category: n.category }} className="chip chip-hot">{categoryLabel}</Link>
          <span className="text-muted-foreground">{n.date}</span>
        </div>
        <h1 className="heading-display text-3xl md:text-5xl mt-3">{n.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{n.summary}</p>
        {n.lastVerified && <LastVerified date={n.lastVerified} />}

        {n.sections?.length ? (
          n.sections.map((s) => (
            <Section key={s.heading} title={s.heading}>{s.body}</Section>
          ))
        ) : (
          <>
            <Section title="What happened">{n.whatHappened}</Section>
            <Section title="Analysis">{n.analysis}</Section>
            <Section title="What it means for GTA 6">{n.meansForGta6}</Section>
          </>
        )}

        <Section title="Sources and verification">
          <ul className="space-y-1.5">
            {(n.sources ?? [n.source]).map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer" className="text-accent underline">
                  {s.label} →
                </a>
              </li>
            ))}
          </ul>
        </Section>

        {n.evidence?.length ? (
          <div className="mt-8">
            <EvidenceStatusTable rows={n.evidence} />
          </div>
        ) : null}

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
            <h2 className="text-xl font-bold mb-3">More in {categoryLabel}</h2>
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
