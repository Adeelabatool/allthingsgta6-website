import { createFileRoute } from "@tanstack/react-router";
import { PillarHub } from "@/components/PillarHub";
import { wiki } from "@/data/wiki";
import { breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/gta-6-weapons")({
  head: () => ({
    meta: [
      { title: "GTA 6 Weapons — Guns, Melee & Customization" },
      { name: "description", content: "GTA 6 weapons coverage: firearms, melee, expected modding system, and combat mechanics analysis." },
      { property: "og:title", content: "GTA 6 Weapons — AllThingsGTA6" },
      { property: "og:url", content: "https://allthingsgta6.com/gta-6-weapons" },
    ],
    scripts: breadcrumbJsonLd([{ name: "GTA 6 Weapons", path: "/gta-6-weapons" }]),
    links: [{ rel: "canonical", href: "https://allthingsgta6.com/gta-6-weapons" }],
  }),
  component: () => (
    <PillarHub
      eyebrow="Guide · Weapons"
      title="GTA 6 Weapons"
      lede="From sidearms to heavy weapons, with expected RDR2-style holstering, modding, and stealth takedowns."
      sections={[
        {
          title: "Weapon Wiki",
          items: wiki.filter((w) => w.type === "weapons").map((w) => ({
            href: `/wiki/weapons/${w.slug}`, label: w.name, desc: w.overview,
          })),
        },
        {
          title: "Related Analysis",
          items: [
            { href: "/analysis/physics-system-predictions", label: "Physics System Predictions", desc: "Euphoria 2.0 and combat feel." },
            { href: "/analysis/ai-behavior-improvements", label: "AI Behavior Improvements", desc: "Smarter enemies and police." },
          ],
        },
      ]}
    />
  ),
});
