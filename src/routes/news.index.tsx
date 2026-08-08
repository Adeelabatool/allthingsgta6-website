import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { news, newsCategories } from "@/data/news";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "GTA 6 News — AllThingsGTA6" },
      { name: "description", content: "All the latest Grand Theft Auto VI news: Rockstar updates, leaks, trailer news, release updates, community reactions." },
      { property: "og:title", content: "GTA 6 News — AllThingsGTA6" },
      { property: "og:description", content: "Latest GTA 6 news, leaks and updates." },
      { property: "og:url", content: "https://allthingsgta6.com/news" },
    ],
    links: [{ rel: "canonical", href: "https://allthingsgta6.com/news" }],
  }),
  component: NewsIndex,
});

function NewsIndex() {
  return (
    <SiteShell>
      <header className="container-page pt-10 pb-6">
        <span className="chip chip-hot">News Wire</span>
        <h1 className="heading-display text-4xl md:text-6xl mt-3">GTA 6 News</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">Real-time signals from Rockstar, insiders, and the community — verified and contextualized.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {newsCategories.map((c) => (
            <Link key={c.slug} to="/news/category/$category" params={{ category: c.slug }} className="chip hover:text-foreground">
              {c.label}
            </Link>
          ))}
        </div>
      </header>
      <section className="container-page pb-10">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <p className="text-foreground/90 leading-relaxed">
              The latest GTA 6 news covers everything happening around Grand Theft Auto VI, from
              official Rockstar Games announcements and trailer releases to gameplay details,
              development updates, release information, and credible reports from the wider gaming
              community. This page brings those developments together so readers can quickly
              understand what has changed and why it matters.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              Our coverage focuses on information that can be verified or placed into proper
              context. Official announcements from Rockstar are treated differently from reports,
              leaks, rumors, and community theories. When a story has not been confirmed, we make
              that distinction clear rather than presenting speculation as established fact.
            </p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">What We Cover</h2>
            <div className="mt-3 space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                The news desk follows the major areas of development and release information. This
                includes Rockstar updates, release date news, trailer announcements, gameplay
                reveals, character information, vehicles, map developments, technical features, and
                other details surrounding the game.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                We also track significant leaks and rumors, but these stories require additional
                context. A leaked claim can attract attention without necessarily being accurate, so
                our coverage looks at the source, available evidence, and whether later information
                supports or contradicts the original report.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Trailer and gameplay news receives particular attention because Rockstar often
                reveals important details through short visual moments rather than lengthy
                explanations. Locations, characters, vehicles, NPC behavior, environmental details,
                and gameplay systems can all provide useful information about the direction of the
                game.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Confirmed News vs. Rumors
            </h2>
            <div className="mt-3 space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                Not every story carries the same level of certainty. Official information comes
                directly from Rockstar or other authoritative sources, while reports and insider
                claims may require further verification. Community theories can also be interesting,
                but they should not be confused with confirmed game information.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                For that reason, we aim to give readers the context behind each major update. When
                something is confirmed, we identify it as such. When a report remains unverified, we
                explain what is known and what is still uncertain.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Explore More GTA 6 Information
            </h2>
            <div className="mt-3 space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                News is only one part of understanding Grand Theft Auto VI. For deeper information,
                explore our{" "}
                <Link to="/gta-6-map" className="text-accent hover:underline">
                  GTA 6 map
                </Link>
                ,{" "}
                <Link to="/gta-6-characters" className="text-accent hover:underline">
                  GTA 6 characters
                </Link>
                ,{" "}
                <Link to="/gta-6-vehicles" className="text-accent hover:underline">
                  GTA 6 vehicles
                </Link>
                , and{" "}
                <Link to="/analysis" className="text-accent hover:underline">
                  GTA 6 analysis
                </Link>{" "}
                sections. These hubs organize information into dedicated topics so you can move from
                breaking news to detailed background and analysis.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Check back for new announcements, release updates, trailer information, gameplay
                developments, and other important developments as Rockstar continues its rollout
                toward launch.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="container-page grid gap-4 md:grid-cols-2 lg:grid-cols-3 pb-16">
        {news.map((n) => (
          <Link key={n.slug} to="/news/$slug" params={{ slug: n.slug }} className="surface surface-hover p-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="chip">{n.category.replace("-", " ")}</span>
              <span>{n.date}</span>
            </div>
            <h2 className="mt-3 font-bold text-lg leading-tight">{n.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{n.summary}</p>
          </Link>
        ))}
      </div>
    </SiteShell>
  );
}
