import { createFileRoute } from "@tanstack/react-router";
import { PillarHub } from "@/components/PillarHub";
import { wiki } from "@/data/wiki";

export const Route = createFileRoute("/gta-6-vehicles")({
  head: () => ({
    meta: [
      { title: "GTA 6 Vehicles — Cars, Bikes, SUVs & More" },
      { name: "description", content: "Every GTA 6 vehicle class: sports cars, SUVs, motorcycles, police vehicles — wiki coverage and comparator tool." },
      { property: "og:title", content: "GTA 6 Vehicles — AllThingsGTA6" },
      { property: "og:url", content: "https://allthingsgta6.com/gta-6-vehicles" },
    ],
    links: [{ rel: "canonical", href: "https://allthingsgta6.com/gta-6-vehicles" }],
  }),
  component: () => (
    <PillarHub
      eyebrow="Guide · Vehicles"
      title="GTA 6 Vehicles"
      lede="Sports, super, SUV, off-road, motorcycle, and police — the vehicle classes that fill Vice City's streets."
      sections={[
        {
          title: "Vehicle Wiki",
          items: wiki.filter((w) => w.type === "vehicles").map((w) => ({
            href: `/wiki/vehicles/${w.slug}`, label: w.name, desc: w.overview,
          })),
        },
        {
          title: "Tools",
          items: [
            { href: "/tools/vehicle-comparator", label: "Vehicle Comparator", desc: "Side-by-side spec tables." },
          ],
        },
      ]}
    />
  ),
});
