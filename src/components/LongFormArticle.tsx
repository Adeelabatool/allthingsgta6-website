import { SiteShell } from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleJsonLd } from "@/components/StructuredData";
import { EvidenceStatusTable } from "@/components/Evidence";
import { LastVerified } from "@/components/LastVerified";
import type { PageSection, SitePage } from "@/data/pages";
import { publishedTimestamp } from "@/lib/publishing";

/**
 * Renders a long-form hub, guide or entity page: direct answer, sections with
 * optional data tables, evidence status, sources, and the freshness stamp —
 * plus its Article/Breadcrumb structured data.
 */
export function LongFormArticle({ page }: { page: SitePage }) {
  return (
    <SiteShell>
      <ArticleJsonLd
        type={page.schemaType ?? "Article"}
        headline={page.title}
        description={page.metaDescription}
        path={page.path}
        datePublished={publishedTimestamp({ ...page, date: page.lastVerified ?? "" })}
        dateModified={page.lastVerified}
        sources={page.sources}
      />
      <article className="container-page py-10 max-w-3xl">
        <Breadcrumbs trail={page.breadcrumb ?? [{ label: page.title }]} />
        <h1 className="heading-display text-3xl md:text-5xl mt-4">{page.title}</h1>

        {page.intro.map((p, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "mt-4 text-lg text-foreground/90 leading-relaxed"
                : "mt-3 text-foreground/90 leading-relaxed"
            }
          >
            {p}
          </p>
        ))}

        {page.lastVerified && <LastVerified date={page.lastVerified} />}

        {page.sections.map((s) => (
          <Section key={s.heading} section={s} />
        ))}

        {page.sources?.length ? (
          <section className="mt-10">
            <h2 className="text-xs uppercase tracking-widest text-accent font-bold">
              Sources and verification
            </h2>
            <ul className="mt-2 space-y-1.5 text-foreground/90">
              {page.sources.map((s) => (
                <li key={s.label}>
                  {s.url ? (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent underline"
                    >
                      {s.label} →
                    </a>
                  ) : (
                    s.label
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {page.evidence?.length ? (
          <div className="mt-8">
            <EvidenceStatusTable rows={page.evidence} />
          </div>
        ) : null}

        {page.related?.length ? (
          <div className="mt-10 surface p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Continue reading
            </div>
            <ul className="space-y-2.5">
              {page.related.map((r) => (
                <li key={r.href}>
                  <a href={r.href} className="text-accent hover:underline font-semibold">
                    {r.label} →
                  </a>
                  {r.desc ? (
                    <span className="block text-sm text-muted-foreground">{r.desc}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>
    </SiteShell>
  );
}

function Section({ section }: { section: PageSection }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">{section.heading}</h2>
      {section.body?.map((p, i) => (
        <p key={i} className="mt-3 text-foreground/90 leading-relaxed">
          {p}
        </p>
      ))}
      {section.table ? (
        <div className="mt-4 overflow-x-auto surface">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {section.table.head.map((h) => (
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
              {section.table.rows.map((row, i) => (
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
      ) : null}
    </section>
  );
}
