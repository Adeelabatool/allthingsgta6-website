import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { analysisBySlug, analyses } from "@/data/analysis";
import { SECTION_CRUMBS, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/analysis/$slug")({
  loader: ({ params }) => {
    const item = analysisBySlug(params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — GTA 6 Analysis` },
          { name: "description", content: loaderData.hook },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.hook },
          { property: "og:type", content: "article" },
          { property: "og:url", content: `https://allthingsgta6.com/analysis/${loaderData.slug}` },
        ]
      : [],
    scripts: loaderData
      ? breadcrumbJsonLd([
          SECTION_CRUMBS.analysis,
          { name: loaderData.title, path: `/analysis/${loaderData.slug}` },
        ])
      : [],
    links: loaderData ? [{ rel: "canonical", href: `https://allthingsgta6.com/analysis/${loaderData.slug}` }] : [],
  }),
  component: AnalysisPage,
  notFoundComponent: () => (
    <SiteShell><div className="container-page py-24 text-center"><h1 className="text-3xl font-extrabold">Analysis not found</h1></div></SiteShell>
  ),
});

function AnalysisPage() {
  const a = Route.useLoaderData();
  const more = analyses.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <SiteShell>
      <article className="container-page py-10 max-w-3xl">
        <Link to="/analysis" className="text-sm text-accent hover:underline">← All Analysis</Link>
        <div className="mt-3 chip chip-neon">Analysis · {a.date}</div>
        <h1 className="heading-display text-3xl md:text-5xl mt-3">{a.title}</h1>
        <p className="mt-4 text-xl text-foreground/90 italic border-l-2 border-primary pl-4">{a.hook}</p>

        <Section title="Context">{a.context}</Section>

        <Section title="Deep Breakdown">
          <div className="space-y-5">
            {a.breakdown.map((b: typeof a.breakdown[number]) => (
              <div key={b.heading} className="surface p-4">
                <h3 className="font-bold text-accent">{b.heading}</h3>
                <p className="mt-1 text-foreground/90">{b.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Evidence / References">
          <ul className="space-y-1.5">
            {a.evidence.map((e: typeof a.evidence[number]) => (
              <li key={e.url}>
                <a href={e.url} target="_blank" rel="noreferrer" className="text-accent underline">{e.label} →</a>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Different Interpretations">
          <div className="grid gap-3 sm:grid-cols-2">
            {a.interpretations.map((i: typeof a.interpretations[number]) => (
              <div key={i.stance} className="surface p-4">
                <div className="chip mb-2">{i.stance}</div>
                <p className="text-sm text-foreground/90">{i.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Final Insight">
          <p className="text-lg font-semibold text-foreground">{a.finalInsight}</p>
        </Section>

        {a.related && a.related.length > 0 && (
          <div className="mt-10 surface p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Related</div>
            <ul className="space-y-2">
              {a.related.map((r: NonNullable<typeof a.related>[number]) => (
                <li key={r.href}><a href={r.href} className="text-accent hover:underline">{r.label} →</a></li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10">
          <h3 className="text-xl font-bold mb-3">More analysis</h3>
          <div className="grid gap-3 md:grid-cols-3">
            {more.map((r) => (
              <Link key={r.slug} to="/analysis/$slug" params={{ slug: r.slug }} className="surface surface-hover p-4">
                <div className="text-xs text-muted-foreground">{r.date}</div>
                <div className="font-semibold mt-1 line-clamp-3">{r.title}</div>
              </Link>
            ))}
          </div>
        </div>
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
