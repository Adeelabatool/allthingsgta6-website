import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleJsonLd } from "@/components/StructuredData";
import { EvidenceStatusTable } from "@/components/Evidence";
import { LastVerified } from "@/components/LastVerified";
import { analysisBySlug, publicAnalyses } from "@/data/analysis";
import { articleHead } from "@/lib/seo";
import { publishedTimestamp } from "@/lib/publishing";
import { liveLinks } from "@/lib/related";

export const Route = createFileRoute("/analysis/$slug")({
  loader: ({ params }) => {
    const item = analysisBySlug(params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) =>
    loaderData
      ? articleHead({
          path: `/analysis/${loaderData.slug}`,
          title: loaderData.seoTitle ?? `${loaderData.title} — GTA 6 Analysis`,
          description: loaderData.metaDescription ?? loaderData.hook,
          canonicalOverride: loaderData.canonicalOverride,
        })
      : { meta: [], links: [] },
  component: AnalysisPage,
  notFoundComponent: () => (
    <SiteShell>
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl font-extrabold">Analysis not found</h1>
      </div>
    </SiteShell>
  ),
});

function AnalysisPage() {
  const a = Route.useLoaderData();
  const more = publicAnalyses()
    .filter((x) => x.slug !== a.slug)
    .slice(0, 3);

  return (
    <SiteShell>
      {/* Analysis is evergreen editorial, so Article rather than NewsArticle. */}
      <ArticleJsonLd
        type="Article"
        headline={a.title}
        description={a.metaDescription ?? a.hook}
        path={`/analysis/${a.slug}`}
        datePublished={publishedTimestamp(a)}
        dateModified={a.lastVerified}
        sources={a.evidence}
      />
      <article className="container-page py-10 max-w-3xl">
        <Breadcrumbs trail={[{ label: "Analysis", href: "/analysis" }, { label: a.title }]} />
        <div className="mt-4 chip chip-neon">Analysis · {a.date}</div>
        <h1 className="heading-display text-3xl md:text-5xl mt-3">{a.title}</h1>
        <p className="mt-4 text-xl text-foreground/90 italic border-l-2 border-primary pl-4">
          {a.hook}
        </p>
        {a.lastVerified && <LastVerified date={a.lastVerified} />}

        {a.intro?.map((p, i) => (
          <p key={i} className="mt-3 text-foreground/90 leading-relaxed">
            {p}
          </p>
        ))}

        {a.context ? <Section title="Context">{a.context}</Section> : null}

        {a.sections?.length
          ? a.sections.map((sec) => (
              <section key={sec.heading} className="mt-8">
                <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">{sec.heading}</h2>
                {sec.body?.map((para, i) => (
                  <p key={i} className="mt-3 text-foreground/90 leading-relaxed">
                    {para}
                  </p>
                ))}
              </section>
            ))
          : a.breakdown?.length && (
              <Section title="Deep Breakdown">
                <div className="space-y-5">
                  {a.breakdown.map((b) => (
                    <div key={b.heading} className="surface p-4">
                      <h3 className="font-bold text-accent">{b.heading}</h3>
                      <p className="mt-1 text-foreground/90">{b.body}</p>
                    </div>
                  ))}
                </div>
              </Section>
            )}

        {a.evidence?.length ? (
          <Section title="Evidence / References">
            <ul className="space-y-1.5">
              {a.evidence.map((e) => (
                <li key={e.url}>
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent underline"
                  >
                    {e.label} →
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {a.interpretations?.length ? (
          <Section title="Different Interpretations">
            <div className="grid gap-3 sm:grid-cols-2">
              {a.interpretations.map((i) => (
                <div key={i.stance} className="surface p-4">
                  <div className="chip mb-2">{i.stance}</div>
                  <p className="text-sm text-foreground/90">{i.body}</p>
                </div>
              ))}
            </div>
          </Section>
        ) : null}

        {a.finalInsight ? (
          <Section title="Final Insight">
            <p className="text-lg font-semibold text-foreground">{a.finalInsight}</p>
          </Section>
        ) : null}

        {a.sources?.length ? (
          <Section title="Sources and verification">
            <ul className="space-y-1.5">
              {a.sources.map((src) => (
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

        {a.evidenceStatus?.length ? (
          <div className="mt-8">
            <EvidenceStatusTable rows={a.evidenceStatus} />
          </div>
        ) : null}

        {liveLinks(a.related).length > 0 && (
          <div className="mt-10 surface p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Related
            </div>
            <ul className="space-y-2">
              {liveLinks(a.related).map((r) => (
                <li key={r.href}>
                  <a href={r.href} className="text-accent hover:underline">
                    {r.label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {more.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-3">More analysis</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {more.map((r) => (
                <Link
                  key={r.slug}
                  to="/analysis/$slug"
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-xs uppercase tracking-widest text-accent font-bold">{title}</h2>
      <div className="mt-2 text-foreground/90 leading-relaxed">{children}</div>
    </section>
  );
}
