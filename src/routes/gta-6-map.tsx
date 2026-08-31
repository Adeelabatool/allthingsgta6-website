import { createFileRoute } from "@tanstack/react-router";
import { PillarHub } from "@/components/PillarHub";
import { wiki } from "@/data/wiki";
import { breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/gta-6-map")({
  head: () => ({
    meta: [
      { title: "GTA 6 Map — Vice City, Leonida & Beyond" },
      { name: "description", content: "Explore the GTA 6 map: Vice City districts, rural Leonida, the Keys, the Everglades, and every confirmed landmark." },
      { property: "og:title", content: "GTA 6 Map — AllThingsGTA6" },
      { property: "og:url", content: "https://allthingsgta6.com/gta-6-map" },
    ],
    scripts: breadcrumbJsonLd([{ name: "GTA 6 Map", path: "/gta-6-map" }]),
    links: [{ rel: "canonical", href: "https://allthingsgta6.com/gta-6-map" }],
  }),
  component: () => (
    <PillarHub
      eyebrow="Guide · Map"
      title="The GTA 6 Map"
      lede="The state of Leonida — Vice City, rural panhandle, the Everglades, and the Keys. Roughly 2x the size of GTA V's San Andreas."
      sections={[
        {
          title: "Map Wiki Entries",
          items: wiki.filter((w) => w.type === "map").map((w) => ({
            href: `/wiki/map/${w.slug}`, label: w.name, desc: w.overview,
          })),
        },
        {
          title: "Analysis",
          items: [
            { href: "/analysis/map-realism-analysis", label: "Map Realism Analysis", desc: "How close is Leonida to real Florida?" },
            { href: "/analysis/trailer-1-breakdown", label: "Trailer 1 Breakdown", desc: "Density, lighting, scale." },
          ],
        },
        {
          title: "News",
          items: [
            { href: "/news/map-speculation-update", label: "Map Speculation Update" },
          ],
        },
        {
          title: "Tools",
          items: [
            { href: "/tools/map", label: "Interactive Map Tool", desc: "Click landmarks to explore." },
          ],
        },
      ]}
    />
  ),
});
