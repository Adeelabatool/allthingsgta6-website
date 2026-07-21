import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { analyses } from "@/data/analysis";

export const Route = createFileRoute("/analysis/")({
  head: () => ({
    meta: [
      { title: "GTA 6 Analysis — Deep Editorial Breakdowns" },
      { name: "description", content: "In-depth GTA 6 analysis: trailer breakdowns, engine deep-dives, release theories, and predictions backed by evidence." },
      { property: "og:title", content: "GTA 6 Analysis — AllThingsGTA6" },
      { property: "og:url", content: "https://allthingsgta6.com/analysis" },
    ],
    links: [{ rel: "canonical", href: "https://allthingsgta6.com/analysis" }],
  }),
  component: AnalysisIndex,
});

function AnalysisIndex() {
  return (
    <SiteShell>
      <header className="container-page pt-10 pb-6">
        <span className="chip">Editorial</span>
        <h1 className="heading-display text-4xl md:text-6xl mt-3">GTA 6 Analysis</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">Research-grade breakdowns of every signal worth tracking.</p>
      </header>
      <div className="container-page grid gap-4 md:grid-cols-2 pb-16">
        {analyses.map((a) => (
          <Link key={a.slug} to="/analysis/$slug" params={{ slug: a.slug }} className="surface surface-hover p-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="chip chip-neon">Analysis</span>
              <span>{a.date}</span>
            </div>
            <h2 className="mt-3 font-bold text-xl leading-tight">{a.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{a.hook}</p>
          </Link>
        ))}
      </div>
    </SiteShell>
  );
}
