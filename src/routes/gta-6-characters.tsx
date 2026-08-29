import { createFileRoute } from "@tanstack/react-router";
import { LongFormArticle } from "@/components/LongFormArticle";
import { pageByPath } from "@/data/pages";
import { articleHead } from "@/lib/seo";
import { PillarHub } from "@/components/PillarHub";
import { wiki } from "@/data/wiki";

export const Route = createFileRoute("/gta-6-characters")({
  // The upgraded article for this URL is scheduled. Until its publishAt passes
  // pageByPath returns undefined and the existing live hub keeps serving, so the
  // page is never dark and never 404s partway through the schedule.
  head: () => {
    const upgraded = pageByPath("/gta-6-characters");
    if (upgraded) {
      return articleHead({
        path: upgraded.path,
        title: upgraded.seoTitle,
        description: upgraded.metaDescription,
        canonicalOverride: upgraded.canonicalOverride,
      });
    }
    return {
      meta: [
        { title: "GTA 6 Characters — Jason, Lucia & The Cast" },
        {
          name: "description",
          content:
            "Every confirmed GTA 6 character: Jason, Lucia, the gangs of Vice City, and supporting cast — full wiki coverage.",
        },
        { property: "og:title", content: "GTA 6 Characters — AllThingsGTA6" },
        { property: "og:url", content: "https://allthingsgta6.com/gta-6-characters" },
      ],
      links: [{ rel: "canonical", href: "https://allthingsgta6.com/gta-6-characters" }],
    };
  },
  component: HubRoute,
});

function HubRoute() {
  const upgraded = pageByPath("/gta-6-characters");
  if (upgraded) return <LongFormArticle page={upgraded} />;
  return (
    <PillarHub
      eyebrow="Guide · Characters"
      title="The People of GTA 6"
      lede="Jason and Lucia — Rockstar's first dual-protagonist Bonnie-and-Clyde duo — plus the gangs, cops, and crews that shape Vice City."
      sections={[
        {
          title: "Protagonists",
          items: wiki
            .filter((w) => w.type === "characters")
            .map((w) => ({
              href: `/wiki/characters/${w.slug}`,
              label: w.name,
              desc: w.overview,
            })),
        },
        {
          title: "Factions",
          items: wiki
            .filter((w) => w.type === "gangs")
            .map((w) => ({
              href: `/wiki/gangs/${w.slug}`,
              label: w.name,
              desc: w.overview,
            })),
        },
        {
          title: "Related Analysis",
          items: [
            {
              href: "/analysis/rockstar-storytelling-style",
              label: "Rockstar's Storytelling Style",
              desc: "From CJ to Lucia.",
            },
          ],
        },
      ]}
    />
  );
}
