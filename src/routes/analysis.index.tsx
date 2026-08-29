import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { publicAnalyses } from "@/data/analysis";

export const Route = createFileRoute("/analysis/")({
  head: () => ({
    meta: [
      { title: "GTA 6 Analysis — Deep Editorial Breakdowns" },
      {
        name: "description",
        content:
          "In-depth GTA 6 analysis: trailer breakdowns, engine deep-dives, release theories, and predictions backed by evidence.",
      },
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
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Research-grade breakdowns of every signal worth tracking.
        </p>
      </header>
      <section className="container-page pb-10">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <p className="text-foreground/90 leading-relaxed">
              Grand Theft Auto VI is one of the most closely watched games in development, but
              understanding what Rockstar Games is building requires more than following headlines.
              This section takes a closer look at the details behind GTA 6, including trailers,
              gameplay footage, characters, the map, technology, world design, story elements, and
              other developments that can reveal more about the game.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              Our GTA 6 analysis focuses on evidence first. Official announcements, Rockstar
              trailers, gameplay footage, interviews, and other reliable information are examined to
              understand what they can actually tell us about the game. Rather than treating every
              rumor or leak as fact, we separate confirmed information from speculation and explain
              when a conclusion is based on interpretation.
            </p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">What We Analyze</h2>
            <div className="mt-3 space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                Our coverage goes beyond reporting that something happened. We look at why a
                particular detail matters and what it could indicate about GTA 6. That can include
                examining changes between trailers, environmental details,{" "}
                <Link to="/gta-6-characters" className="text-accent hover:underline">
                  character behavior
                </Link>
                ,{" "}
                <Link to="/gta-6-vehicles" className="text-accent hover:underline">
                  vehicle systems
                </Link>
                , NPC activity,{" "}
                <Link to="/gta-6-map" className="text-accent hover:underline">
                  map design
                </Link>
                , visual technology, and other elements that may provide clues about Rockstar's
                approach to the game.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Some analysis pieces focus on a specific trailer or gameplay detail, while others
                examine broader questions surrounding GTA 6. When information is incomplete, we
                consider multiple possibilities instead of presenting an unconfirmed theory as
                established fact.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Confirmed Information vs. Speculation
            </h2>
            <div className="mt-3 space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                GTA 6 discussions often move quickly, especially when new footage, reports, or leaks
                appear online. For that reason, we make a clear distinction between information
                confirmed by Rockstar and conclusions drawn from available evidence.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Confirmed details are presented as facts when supported by an official source.
                Rumors, leaks, predictions, and theories are identified accordingly. This approach
                helps readers understand not only what is known about GTA 6, but also how confident
                they should be about information that has not been officially confirmed.
              </p>
            </div>
          </div>
          <p className="text-foreground/90 leading-relaxed">
            Explore the latest GTA 6 analysis below for detailed breakdowns of the game's world,
            characters, gameplay, technology, and the clues that may reveal where Rockstar is taking
            the series next.
          </p>
        </div>
      </section>
      <div className="container-page grid gap-4 md:grid-cols-2 pb-16">
        {publicAnalyses().map((a) => (
          <Link
            key={a.slug}
            to="/analysis/$slug"
            params={{ slug: a.slug }}
            className="surface surface-hover p-6"
          >
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
