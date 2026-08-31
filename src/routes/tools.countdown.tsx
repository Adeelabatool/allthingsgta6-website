import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { SECTION_CRUMBS, breadcrumbJsonLd } from "@/lib/seo";

const RELEASE_DATE_ISO = "2026-11-19T00:00:00Z";

export const Route = createFileRoute("/tools/countdown")({
  head: () => ({
    meta: [
      { title: "GTA 6 Release Countdown — Live Timer to November 19, 2026" },
      { name: "description", content: "Live countdown to the Grand Theft Auto VI release date. Days, hours, minutes and seconds to November 19, 2026." },
      { property: "og:title", content: "GTA 6 Release Countdown" },
      { property: "og:description", content: "Live countdown timer to GTA 6." },
      { property: "og:url", content: "https://allthingsgta6.com/tools/countdown" },
    ],
    scripts: breadcrumbJsonLd([
      SECTION_CRUMBS.tools,
      { name: "Countdown", path: "/tools/countdown" },
    ]),
    links: [{ rel: "canonical", href: "https://allthingsgta6.com/tools/countdown" }],
  }),
  component: CountdownPage,
});

function CountdownPage() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const target = new Date(RELEASE_DATE_ISO).getTime();
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const cells = [["Days", d], ["Hours", h], ["Minutes", m], ["Seconds", s]] as const;

  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-4 md:px-6 py-20 text-center">
        <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-accent">Countdown</div>
        <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold tracking-tight">
          GTA 6 launches on <span className="text-primary">November 19, 2026</span>
        </h1>
        <p className="mt-4 text-muted-foreground">Global release confirmed by Rockstar Games for November 19, 2026.</p>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {cells.map(([label, v]) => (
            <div key={label as string} className="rounded-xl border border-border/60 bg-card p-8 shadow-lg">
              <div className="font-mono text-5xl md:text-7xl font-bold text-primary tabular-nums">
                {String(v).padStart(2, "0")}
              </div>
              <div className="mt-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
