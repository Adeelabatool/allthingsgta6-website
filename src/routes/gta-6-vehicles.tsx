import { createFileRoute } from "@tanstack/react-router";
import { LongFormArticle } from "@/components/LongFormArticle";
import { pageByPath } from "@/data/pages";
import { articleHead, breadcrumbJsonLd } from "@/lib/seo";
import { PillarHub } from "@/components/PillarHub";
import { wiki } from "@/data/wiki";

export const Route = createFileRoute("/gta-6-vehicles")({
  // The upgraded article for this URL is scheduled. Until its publishAt passes
  // pageByPath returns undefined and the existing live hub keeps serving, so the
  // page is never dark and never 404s partway through the schedule.
  head: () => {
    const upgraded = pageByPath("/gta-6-vehicles");
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
      scripts: breadcrumbJsonLd([{ name: "GTA 6 Vehicles", path: "/gta-6-vehicles" }]),
      meta: [
        { title: "GTA 6 Vehicles — Cars, Bikes, SUVs & More" },
        {
          name: "description",
          content:
            "Every GTA 6 vehicle class: sports cars, SUVs, motorcycles, police vehicles — wiki coverage and comparator tool.",
        },
        { property: "og:title", content: "GTA 6 Vehicles — AllThingsGTA6" },
        { property: "og:url", content: "https://allthingsgta6.com/gta-6-vehicles" },
      ],
      links: [{ rel: "canonical", href: "https://allthingsgta6.com/gta-6-vehicles" }],
    };
  },
  component: HubRoute,
});

function HubRoute() {
  const upgraded = pageByPath("/gta-6-vehicles");
  if (upgraded) return <LongFormArticle page={upgraded} />;
  return (
    <PillarHub
      eyebrow="Guide · Vehicles"
      title="GTA 6 Vehicles"
      lede="Sports, super, SUV, off-road, motorcycle, and police — the vehicle classes that fill Vice City's streets."
      sections={[
        {
          title: "Vehicle Wiki",
          items: wiki
            .filter((w) => w.type === "vehicles")
            .map((w) => ({
              href: `/wiki/vehicles/${w.slug}`,
              label: w.name,
              desc: w.overview,
            })),
        },
        {
          title: "Tools",
          items: [
            {
              href: "/tools/vehicle-comparator",
              label: "Vehicle Comparator",
              desc: "Side-by-side spec tables.",
            },
          ],
        },
      ]}
    />
  );
}
