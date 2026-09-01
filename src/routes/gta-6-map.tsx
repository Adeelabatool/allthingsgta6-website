import { createFileRoute } from "@tanstack/react-router";
import { LongFormArticle } from "@/components/LongFormArticle";
import { pageByPath } from "@/data/pages";
import { articleHead, breadcrumbJsonLd } from "@/lib/seo";
import { PillarHub } from "@/components/PillarHub";
import { wiki } from "@/data/wiki";

export const Route = createFileRoute("/gta-6-map")({
  // The upgraded article for this URL is scheduled. Until its publishAt passes
  // pageByPath returns undefined and the existing live hub keeps serving, so the
  // page is never dark and never 404s partway through the schedule.
  head: () => {
    const upgraded = pageByPath("/gta-6-map");
    if (upgraded) {
      return articleHead({
        path: upgraded.path,
        title: upgraded.seoTitle,
        description: upgraded.metaDescription,
        canonicalOverride: upgraded.canonicalOverride,
        crumbs: [{ name: upgraded.title, path: upgraded.path }],
      });
    }
    return {
      scripts: breadcrumbJsonLd([{ name: "GTA 6 Map", path: "/gta-6-map" }]),
      meta: [
        { title: "GTA 6 Map — Vice City, Leonida & Beyond" },
        {
          name: "description",
          content:
            "Explore the GTA 6 map: Vice City districts, rural Leonida, the Keys, the Everglades, and every confirmed landmark.",
        },
        { property: "og:title", content: "GTA 6 Map — AllThingsGTA6" },
        { property: "og:url", content: "https://allthingsgta6.com/gta-6-map" },
      ],
      links: [{ rel: "canonical", href: "https://allthingsgta6.com/gta-6-map" }],
    };
  },
  component: HubRoute,
});

function HubRoute() {
  const upgraded = pageByPath("/gta-6-map");
  if (upgraded) return <LongFormArticle page={upgraded} />;
  return (
    <PillarHub
      eyebrow="Guide · Map"
      title="The GTA 6 Map"
      lede="The state of Leonida — Vice City, rural panhandle, the Everglades, and the Keys. Roughly 2x the size of GTA V's San Andreas."
      sections={[
        {
          title: "Map Wiki Entries",
          items: wiki
            .filter((w) => w.type === "map")
            .map((w) => ({
              href: `/wiki/map/${w.slug}`,
              label: w.name,
              desc: w.overview,
            })),
        },
        {
          title: "Analysis",
          items: [
            {
              href: "/analysis/map-realism-analysis",
              label: "Map Realism Analysis",
              desc: "How close is Leonida to real Florida?",
            },
            {
              href: "/analysis/trailer-1-breakdown",
              label: "Trailer 1 Breakdown",
              desc: "Density, lighting, scale.",
            },
          ],
        },
        {
          title: "News",
          items: [{ href: "/news/map-speculation-update", label: "Map Speculation Update" }],
        },
        {
          title: "Tools",
          items: [
            {
              href: "/tools/map",
              label: "Interactive Map Tool",
              desc: "Click landmarks to explore.",
            },
          ],
        },
      ]}
    />
  );
}
