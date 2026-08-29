import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { publicWiki, wikiTypes } from "@/data/wiki";

export const Route = createFileRoute("/wiki/")({
  head: () => ({
    meta: [
      { title: "GTA 6 Wiki — Characters, Map, Vehicles, Weapons" },
      {
        name: "description",
        content:
          "The structured GTA 6 wiki: characters, map locations, vehicles, weapons, gangs and companies — encyclopedia-style, sourced and updated.",
      },
      { property: "og:title", content: "GTA 6 Wiki — AllThingsGTA6" },
      { property: "og:url", content: "https://allthingsgta6.com/wiki" },
    ],
    links: [{ rel: "canonical", href: "https://allthingsgta6.com/wiki" }],
  }),
  component: WikiIndex,
});

function WikiIndex() {
  return (
    <SiteShell>
      <header className="container-page pt-10 pb-6">
        <span className="chip chip-neon">Knowledge Base</span>
        <h1 className="heading-display text-4xl md:text-6xl mt-3">GTA 6 Wiki</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Encyclopedia-style entries on every confirmed and speculated element of Grand Theft Auto
          VI.
        </p>
      </header>
      <div className="container-page pb-16 space-y-10">
        {wikiTypes.map((t) => {
          const entries = publicWiki().filter((w) => w.type === t.slug);
          if (entries.length === 0) return null;
          return (
            <section key={t.slug}>
              <div className="flex items-baseline justify-between mb-3">
                <h2 className="text-2xl font-extrabold">{t.label}</h2>
                <span className="text-xs text-muted-foreground">{entries.length} entries</span>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {entries.map((w) => (
                  <Link
                    key={w.slug}
                    to="/wiki/$type/$slug"
                    params={{ type: w.type, slug: w.slug }}
                    className="surface surface-hover p-4"
                  >
                    <div className="text-xs uppercase tracking-widest text-accent">{w.type}</div>
                    <div className="mt-1 font-bold text-lg">{w.name}</div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-3">{w.overview}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </SiteShell>
  );
}
