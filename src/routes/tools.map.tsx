import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { useState } from "react";
import { SECTION_CRUMBS, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/tools/map")({
  head: () => ({
    meta: [
      { title: "GTA 6 Interactive Map (Preview) — Vice City" },
      { name: "description", content: "Interactive GTA 6 map preview — explore Vice City districts, rural Leonida, and key landmarks." },
      { property: "og:url", content: "https://allthingsgta6.com/tools/map" },
    ],
    scripts: breadcrumbJsonLd([
      SECTION_CRUMBS.tools,
      { name: "Interactive Map", path: "/tools/map" },
    ]),
    links: [{ rel: "canonical", href: "https://allthingsgta6.com/tools/map" }],
  }),
  component: MapTool,
});

const POINTS = [
  { id: "ocean-beach", x: 30, y: 70, label: "Ocean Beach", info: "Vice City's iconic art-deco beachfront strip." },
  { id: "downtown", x: 40, y: 50, label: "Downtown", info: "High-rise financial core." },
  { id: "little-haiti", x: 55, y: 45, label: "Little Haiti", info: "Cultural neighborhood district." },
  { id: "port", x: 25, y: 40, label: "Port Industrial", info: "Cargo, smuggling, criminal opportunity." },
  { id: "everglades", x: 70, y: 65, label: "Everglades", info: "Swamp biome — wildlife & smuggling." },
  { id: "keys", x: 50, y: 90, label: "Leonida Keys", info: "Island chain south of Vice City." },
  { id: "panhandle", x: 80, y: 25, label: "Rural Panhandle", info: "Farmland and small towns." },
];

function MapTool() {
  const [active, setActive] = useState(POINTS[0]);
  return (
    <SiteShell>
      <div className="container-page py-12">
        <h1 className="heading-display text-4xl md:text-6xl">Interactive Map (Preview)</h1>
        <p className="mt-2 text-muted-foreground">Click landmarks to inspect. Geometry is speculative pending official release.</p>

        <div className="mt-8 grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="surface p-3">
            <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden bg-gradient-to-br from-[oklch(0.2_0.05_270)] via-[oklch(0.25_0.08_330)] to-[oklch(0.3_0.1_200)]">
              {/* faux landmass */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-40">
                <path d="M10 30 Q 30 20 50 25 T 90 35 L 95 70 Q 70 80 50 75 T 10 80 Z" fill="oklch(0.35 0.1 270)" />
              </svg>
              {POINTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActive(p)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span className={`block w-3 h-3 rounded-full border-2 border-background ${active.id === p.id ? "bg-primary scale-150" : "bg-accent"} transition-all`} />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] uppercase tracking-widest text-foreground/80 opacity-0 group-hover:opacity-100 bg-background/80 px-1.5 py-0.5 rounded">
                    {p.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <aside className="surface p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Selected</div>
            <h2 className="mt-1 text-2xl font-extrabold">{active.label}</h2>
            <p className="mt-3 text-muted-foreground">{active.info}</p>
            <div className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">All landmarks</div>
            <ul className="mt-2 space-y-1">
              {POINTS.map((p) => (
                <li key={p.id}>
                  <button onClick={() => setActive(p)} className={`text-left w-full px-2 py-1 rounded ${active.id === p.id ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}
