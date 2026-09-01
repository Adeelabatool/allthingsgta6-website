import { createFileRoute } from "@tanstack/react-router";
import { LongFormArticle } from "@/components/LongFormArticle";
import { pageByPath } from "@/data/pages";
import { articleHead, breadcrumbJsonLd } from "@/lib/seo";
import { PillarHub } from "@/components/PillarHub";
import { wiki } from "@/data/wiki";

export const Route = createFileRoute("/gta-6-weapons")({
  // The upgraded article for this URL is scheduled. Until its publishAt passes
  // pageByPath returns undefined and the existing live hub keeps serving, so the
  // page is never dark and never 404s partway through the schedule.
  head: () => {
    const upgraded = pageByPath("/gta-6-weapons");
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
      scripts: breadcrumbJsonLd([{ name: "GTA 6 Weapons", path: "/gta-6-weapons" }]),
      meta: [
        { title: "GTA 6 Weapons — Guns, Melee & Customization" },
        {
          name: "description",
          content:
            "GTA 6 weapons coverage: firearms, melee, expected modding system, and combat mechanics analysis.",
        },
        { property: "og:title", content: "GTA 6 Weapons — AllThingsGTA6" },
        { property: "og:url", content: "https://allthingsgta6.com/gta-6-weapons" },
      ],
      links: [{ rel: "canonical", href: "https://allthingsgta6.com/gta-6-weapons" }],
    };
  },
  component: HubRoute,
});

function HubRoute() {
  const upgraded = pageByPath("/gta-6-weapons");
  if (upgraded) return <LongFormArticle page={upgraded} />;
  return (
    <PillarHub
      eyebrow="Guide · Weapons"
      title="GTA 6 Weapons"
      lede="From sidearms to heavy weapons, with expected RDR2-style holstering, modding, and stealth takedowns."
      sections={[
        {
          title: "Weapon Wiki",
          items: wiki
            .filter((w) => w.type === "weapons")
            .map((w) => ({
              href: `/wiki/weapons/${w.slug}`,
              label: w.name,
              desc: w.overview,
            })),
        },
        {
          title: "Related Analysis",
          items: [
            {
              href: "/analysis/physics-system-predictions",
              label: "Physics System Predictions",
              desc: "Euphoria 2.0 and combat feel.",
            },
            {
              href: "/analysis/ai-behavior-improvements",
              label: "AI Behavior Improvements",
              desc: "Smarter enemies and police.",
            },
          ],
        },
      ]}
    />
  );
}
