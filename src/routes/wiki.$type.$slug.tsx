import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleJsonLd } from "@/components/StructuredData";
import { EvidenceStatusTable } from "@/components/Evidence";
import { LastVerified } from "@/components/LastVerified";
import { wikiBySlug, publicWiki, wikiTypes } from "@/data/wiki";
import { articleHead } from "@/lib/seo";

export const Route = createFileRoute("/wiki/$type/$slug")({
  loader: ({ params }) => {
    const entry = wikiBySlug(params.type, params.slug);
    if (!entry) throw notFound();
    return entry;
  },
  head: ({ loaderData }) =>
    loaderData
      ? articleHead({
          path: `/wiki/${loaderData.type}/${loaderData.slug}`,
          title: loaderData.seoTitle ?? `${loaderData.name} — GTA 6 Wiki`,
          description: loaderData.metaDescription ?? loaderData.overview.slice(0, 155),
          canonicalOverride: loaderData.canonicalOverride,
        })
      : { meta: [], links: [] },
  component: WikiEntryPage,
  notFoundComponent: () => (
    <SiteShell><div className="container-page py-24 text-center"><h1 className="text-3xl font-extrabold">Wiki entry not found</h1></div></SiteShell>
  ),
});

function WikiEntryPage() {
  const w = Route.useLoaderData();
  const sameType = publicWiki().filter((x) => x.type === w.type && x.slug !== w.slug).slice(0, 4);
  const typeLabel = wikiTypes.find((t) => t.slug === w.type)?.label ?? w.type;

  return (
    <SiteShell>
      {/* Entity pages are evergreen reference, so Article rather than NewsArticle. */}
      <ArticleJsonLd
        type="Article"
        headline={w.name}
        description={w.metaDescription ?? w.overview.slice(0, 155)}
        path={`/wiki/${w.type}/${w.slug}`}
        datePublished={w.publishAt ?? w.lastVerified ?? ""}
        dateModified={w.lastVerified}
        sources={w.sources}
      />
      <article className="container-page py-10 grid gap-8 lg:grid-cols-[1fr_280px] max-w-6xl">
        <div>
          <Breadcrumbs
            trail={[
              { label: "Wiki", href: "/wiki" },
              { label: typeLabel },
              { label: w.name },
            ]}
          />
          <div className="mt-4 chip chip-neon">{w.type}</div>
          <h1 className="heading-display text-4xl md:text-6xl mt-3">{w.name}</h1>
          {w.lastVerified && <LastVerified date={w.lastVerified} />}

          <Section title="Overview">{w.overview}</Section>
          <Section title="Background">{w.background}</Section>
          <Section title="Role in GTA 6">{w.roleInGta6}</Section>

          <Section title="Details">
            <dl className="grid sm:grid-cols-2 gap-3">
              {w.details.map((d: typeof w.details[number]) => (
                <div key={d.label} className="surface p-3">
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">{d.label}</dt>
                  <dd className="mt-1 font-semibold">{d.value}</dd>
                </div>
              ))}
            </dl>
          </Section>

          {w.trivia.length > 0 && (
            <Section title="Trivia / Notes">
              <ul className="list-disc pl-5 space-y-1.5">
                {w.trivia.map((t: string, i: number) => <li key={i}>{t}</li>)}
              </ul>
            </Section>
          )}

          {w.updates && <Section title="Updates">{w.updates}</Section>}

          {w.sources?.length ? (
            <Section title="Sources and verification">
              <ul className="space-y-1.5">
                {w.sources.map((s: { label: string; url: string }) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noreferrer" className="text-accent underline">
                      {s.label} →
                    </a>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {w.evidence?.length ? (
            <div className="mt-8">
              <EvidenceStatusTable rows={w.evidence} />
            </div>
          ) : null}
        </div>

        <aside className="space-y-6">
          {w.related.length > 0 && (
            <div className="surface p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Related Entries</div>
              <ul className="space-y-2">
                {w.related.map((r: typeof w.related[number]) => (
                  <li key={r.href}>
                    <a href={r.href} className="text-accent hover:underline">{r.label} →</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {sameType.length > 0 && (
            <div className="surface p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">More {w.type}</div>
              <ul className="space-y-2">
                {sameType.map((x) => (
                  <li key={x.slug}>
                    <Link to="/wiki/$type/$slug" params={{ type: x.type, slug: x.slug }} className="text-foreground/90 hover:text-accent">
                      {x.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
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
