import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { SECTION_CRUMBS, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "GTA 6 Tools — Countdown, Hype Calculator, Comparator" },
      {
        name: "description",
        content:
          "Interactive GTA 6 tools: countdown to release, hype calculator, vehicle comparator, and interactive map.",
      },
      { property: "og:title", content: "GTA 6 Tools — AllThingsGTA6" },
      { property: "og:url", content: "https://allthingsgta6.com/tools" },
    ],
    scripts: breadcrumbJsonLd([SECTION_CRUMBS.tools]),
    links: [{ rel: "canonical", href: "https://allthingsgta6.com/tools" }],
  }),
  component: ToolsIndex,
});

const tools = [
  {
    href: "/tools/countdown",
    icon: "⏳",
    title: "Countdown Timer",
    desc: "Live countdown to November 19, 2026.",
  },
  {
    href: "/tools/hype-calculator",
    icon: "📈",
    title: "Hype Calculator",
    desc: "Score your personal GTA 6 hype level.",
  },
  {
    href: "/tools/vehicle-comparator",
    icon: "🏎️",
    title: "Vehicle Comparator",
    desc: "Compare vehicle specs side-by-side.",
  },
  {
    href: "/tools/map",
    icon: "🗺️",
    title: "Map Tool",
    desc: "Interactive Vice City map (preview).",
  },
] as const;

function ToolsIndex() {
  return (
    <SiteShell>
      <header className="container-page pt-10 pb-6">
        <span className="chip chip-neon">Engagement Layer</span>
        <h1 className="heading-display text-4xl md:text-6xl mt-3">Interactive Tools</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Play with the data. Compare, calculate, and count down.
        </p>
      </header>
      <div className="container-page grid gap-4 md:grid-cols-2 pb-16">
        {tools.map((t) => (
          <Link key={t.href} to={t.href} className="surface surface-hover p-6">
            <div className="text-4xl">{t.icon}</div>
            <h2 className="mt-3 font-bold text-xl">{t.title}</h2>
            <p className="mt-1 text-muted-foreground">{t.desc}</p>
            <div className="mt-4 text-accent">Open →</div>
          </Link>
        ))}
      </div>
    </SiteShell>
  );
}
