import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleJsonLd } from "@/components/StructuredData";
import { EvidenceStatusTable } from "@/components/Evidence";
import { LastVerified } from "@/components/LastVerified";
import { newsBySlug, publicNews, type NewsItem } from "@/data/news";
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
    <SiteShell>
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl font-extrabold">Article not found</h1>
      </div>
    </SiteShell>
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
        sources={n.sources ?? (n.source ? [n.source] : undefined)}
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
          <Link
            to="/news/category/$category"
            params={{ category: n.category }}
            className="chip chip-hot"
          >
            {categoryLabel}
          </Link>
          <span className="text-muted-foreground">{n.date}</span>
        </div>
        <h1 className="heading-display text-3xl md:text-5xl mt-3">{n.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{n.summary}</p>
        {n.lastVerified && <LastVerified date={n.lastVerified} />}

        {n.intro?.map((p, i) => (
          <p key={i} className="mt-3 text-foreground/90 leading-relaxed">
            {p}
          </p>
        ))}

        {n.sections?.length ? (
          n.sections.map((sec) => (
            <section key={sec.heading} className="mt-8">
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">{sec.heading}</h2>
              {sec.body?.map((para, i) => (
                <p key={i} className="mt-3 text-foreground/90 leading-relaxed">
                  {para}
                </p>
              ))}
              {sec.table ? <BodyTable table={sec.table} /> : null}
            </section>
          ))
        ) : (
          <>
            {n.whatHappened && <Section title="What happened">{n.whatHappened}</Section>}
            {n.analysis && <Section title="Analysis">{n.analysis}</Section>}
            {n.meansForGta6 && <Section title="What it means for GTA 6">{n.meansForGta6}</Section>}
          </>
        )}

        {(n.sources ?? (n.source ? [n.source] : []))?.length ? (
          <Section title="Sources and verification">
            <ul className="space-y-1.5">
              {(n.sources ?? (n.source ? [n.source] : [])).map((src) => (
                <li key={src.label}>
                  {src.url ? (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent underline"
                    >
                      {src.label} →
                    </a>
                  ) : (
                    src.label
                  )}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {n.evidence?.length ? (
          <div className="mt-8">
            <EvidenceStatusTable rows={n.evidence} />
          </div>
        ) : null}

        {n.related && n.related.length > 0 && (
          <div className="mt-10 surface p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Related Intel
            </div>
            <ul className="space-y-2">
              {n.related.map((r: NonNullable<typeof n.related>[number]) => (
                <li key={r.href}>
                  <a href={r.href} className="text-accent hover:underline">
                    {r.label} →
                  </a>
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
                <Link
                  key={r.slug}
                  to="/news/$slug"
                  params={{ slug: r.slug }}
                  className="surface surface-hover p-4"
                >
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

function BodyTable({
  table,
}: {
  table: NonNullable<NonNullable<NewsItem["sections"]>[number]["table"]>;
}) {
  return (
    <div className="mt-4 overflow-x-auto surface">
      <table className="w-full text-sm">
        <thead>
          <tr>
            {table.head.map((h) => (
              <th
                key={h}
                className="text-left px-4 py-2.5 text-xs uppercase tracking-widest text-muted-foreground border-b border-border"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-2.5 border-b border-border/50 ${j === 0 ? "font-semibold text-foreground" : "text-foreground/90"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
