import { createFileRoute } from "@tanstack/react-router";
import { PillarHub } from "@/components/PillarHub";
import { Countdown } from "@/components/Countdown";
import { SiteShell } from "@/components/SiteShell";
import { SystemReqsTable } from "@/components/SystemReqsTable";

export const Route = createFileRoute("/gta-6-release-date")({
  head: () => ({
    meta: [
      { title: "GTA 6 Release Date — November 19, 2026 (PS5 & Xbox)" },
      { name: "description", content: "GTA 6 launches November 19, 2026 on PS5 and Xbox Series X|S. Pre-orders live now. PC TBA. Live countdown, release analysis, and pre-order intel." },
      { property: "og:title", content: "GTA 6 Release Date — November 19, 2026" },
      { property: "og:url", content: "https://allthingsgta6.com/gta-6-release-date" },
    ],
    links: [{ rel: "canonical", href: "https://allthingsgta6.com/gta-6-release-date" }],
  }),
  component: ReleaseDateHub,
});

function ReleaseDateHub() {
  return (
    <SiteShell>
      <header className="container-page pt-12 pb-8 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
        <div>
          <span className="chip chip-hot">Guide · Release</span>
          <h1 className="heading-display text-4xl md:text-7xl mt-4">GTA 6 Release Date</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Grand Theft Auto VI launches <strong className="text-primary">November 19, 2026</strong> on PlayStation 5 and Xbox Series X|S. Pre-orders are live now. PC release TBA, expected 6–18 months later based on Rockstar's RDR2 precedent.
          </p>
        </div>
        <Countdown variant="large" />
      </header>
      <div className="container-page pb-16 grid gap-4 md:grid-cols-3">
        {[
          { label: "PlayStation 5", value: "Nov 19, 2026", sub: "Confirmed · Pre-orders live", color: "text-primary" },
          { label: "Xbox Series X|S", value: "Nov 19, 2026", sub: "Confirmed · Pre-orders live", color: "text-primary" },
          { label: "PC", value: "TBA", sub: "Speculative: Q4 2027 – Q1 2028", color: "text-accent" },
        ].map((c) => (
          <div key={c.label} className="surface p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
            <div className="mt-2 text-3xl font-extrabold">{c.value}</div>
            <div className={`mt-1 text-sm font-semibold ${c.color}`}>{c.sub}</div>
          </div>
        ))}
      </div>
      <div className="container-page pb-12">
        <h2 className="text-2xl font-extrabold mb-3">System Requirements</h2>
        <SystemReqsTable />
      </div>
      <div className="container-page pb-16">
        <h2 className="text-2xl font-extrabold mb-3">Related Coverage</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { href: "/analysis/release-timeline-theory", label: "Release Timeline Theory" },
            { href: "/news/rockstar-confirms-gta-6-release-window", label: "Rockstar Confirms Release Window" },
            { href: "/news/release-delay-rumor-explained", label: "Delay Rumor Explained" },
            { href: "/news/pc-release-discussion", label: "Why PC Comes Later" },
            { href: "/news/pre-order-rumors", label: "Pre-Order Rumors" },
            { href: "/news/trailer-2-expectations", label: "Trailer 2 Expectations" },
          ].map((l) => (
            <a key={l.href} href={l.href} className="surface surface-hover p-4 block">
              <div className="font-semibold">{l.label}</div>
              <div className="mt-2 text-accent text-sm">Read →</div>
            </a>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
