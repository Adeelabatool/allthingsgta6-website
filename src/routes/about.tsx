import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Editorial Standards — AllThingsGTA6" },
      {
        name: "description",
        content:
          "Who runs AllThingsGTA6, how we source and label information, and how we separate confirmed Rockstar facts from leaks and speculation.",
      },
      { property: "og:title", content: "About & Editorial Standards — AllThingsGTA6" },
      {
        property: "og:description",
        content: "How AllThingsGTA6 sources, labels, and verifies GTA 6 information.",
      },
      { property: "og:url", content: "https://allthingsgta6.com/about" },
    ],
    scripts: breadcrumbJsonLd([{ name: "About", path: "/about" }]),
    links: [{ rel: "canonical", href: "https://allthingsgta6.com/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <header className="container-page pt-12 pb-6">
        <span className="chip chip-neon">About</span>
        <h1 className="heading-display text-4xl md:text-6xl mt-4">
          About &amp; Editorial Standards
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
          AllThingsGTA6 is an independent, fan-run resource covering Grand Theft Auto VI. We are not
          Rockstar Games, not Take-Two Interactive, and we have no inside access. Everything here is
          assembled from public sources — so the useful question isn't "what do we claim," it's "how
          do we label it." This page explains that.
        </p>
      </header>

      <div className="container-page pb-16 max-w-3xl space-y-10">
        <section>
          <h2 className="text-2xl font-extrabold mb-3">How we label information</h2>
          <p className="text-muted-foreground mb-4">
            Every claim on this site falls into one of three buckets, and we try to make which
            bucket obvious wherever it appears:
          </p>
          <ul className="space-y-3">
            <li className="surface p-4">
              <span className="chip chip-neon mb-2 inline-block">Confirmed</span>
              <p className="text-sm text-muted-foreground">
                Stated by Rockstar Games or Take-Two Interactive directly — an official trailer, a
                Newswire post, an earnings call, or first-party marketing. Example: the November 19,
                2026 release date, the PS5 / Xbox Series X|S platforms, the Leonida / Vice City
                setting, and Jason &amp; Lucia as the dual protagonists.
              </p>
            </li>
            <li className="surface p-4">
              <span className="chip mb-2 inline-block">Reported / leaked</span>
              <p className="text-sm text-muted-foreground">
                Attributed to a third party — a news outlet, a retailer listing, or the September
                2022 development breach that Rockstar confirmed was genuine. Reported material can
                be accurate, but it is not the same as an official confirmation, and we say so.
              </p>
            </li>
            <li className="surface p-4">
              <span className="chip mb-2 inline-block">Speculation / analysis</span>
              <p className="text-sm text-muted-foreground">
                Our own reasoning, community theories, and predictions. Interesting, but not fact.
                Anything about PC system requirements, total map size, or unannounced mechanics
                lives here until Rockstar says otherwise.
              </p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold mb-3">What we won't do</h2>
          <ul className="space-y-2 text-muted-foreground list-disc pl-5">
            <li>
              We won't invent precise-sounding numbers to look authoritative — no fabricated PC spec
              tables, no made-up "X% of leaks were accurate" statistics that nobody actually
              measured.
            </li>
            <li>
              We won't present fan inference as a Rockstar confirmation. If a detail is a popular
              theory rather than an official statement, we mark it as a theory.
            </li>
            <li>
              We won't dress up speculation as news. Rumor and analysis pieces are labeled as such.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold mb-3">Corrections</h2>
          <p className="text-muted-foreground">
            GTA 6 coverage moves fast and early information gets revised. If something here is wrong
            or out of date, we want to fix it. Corrections are made in place, and confirmed facts
            replace speculation as soon as Rockstar publishes them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold mb-3">Affiliation</h2>
          <p className="text-muted-foreground">
            AllThingsGTA6 is an unofficial fan project. It is not affiliated with, endorsed by, or
            sponsored by Rockstar Games, Take-Two Interactive, or any of their subsidiaries. All
            trademarks belong to their respective owners.
          </p>
        </section>

        <div className="pt-2">
          <Link to="/" className="chip chip-hot">
            ← Back to dashboard
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
