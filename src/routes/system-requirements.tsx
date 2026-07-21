import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { SystemReqsTable } from "@/components/SystemReqsTable";

export const Route = createFileRoute("/system-requirements")({
  head: () => ({
    meta: [
      { title: "GTA 6 System Requirements — PC, Laptop, PS5 & Xbox Specs" },
      { name: "description", content: "Estimated GTA 6 system requirements for PC, laptop, PlayStation 5, and Xbox Series X|S — based on leaks and modern AAA benchmarks." },
      { property: "og:title", content: "GTA 6 System Requirements" },
      { property: "og:description", content: "Speculative GTA 6 specs across PC, laptop and consoles." },
      { property: "og:url", content: "https://allthingsgta6.com/system-requirements" },
    ],
    links: [{ rel: "canonical", href: "https://allthingsgta6.com/system-requirements" }],
  }),
  component: SystemReqsPage,
});

function SystemReqsPage() {
  return (
    <SiteShell>
      <header className="container-page pt-12 pb-6">
        <span className="chip chip-neon">SEO Hub · Specs</span>
        <h1 className="heading-display text-4xl md:text-6xl mt-4">GTA 6 System Requirements</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
          Speculative minimum and recommended GTA 6 specs for PC and laptop, plus confirmed PlayStation 5 and Xbox Series X|S hardware baselines. Updated as Rockstar releases official PC details.
        </p>
      </header>
      <div className="container-page pb-10">
        <SystemReqsTable />
      </div>
      <div className="container-page pb-16">
        <h2 className="text-2xl font-extrabold mb-3">Related</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { href: "/gta-6-release-date", label: "Release Date Hub" },
            { href: "/analysis/pc-port-speculation", label: "PC Port Speculation" },
            { href: "/news/pc-release-discussion", label: "Why PC Comes Later" },
          ].map((l) => (
            <Link key={l.href} to={l.href} className="surface surface-hover p-4 block">
              <div className="font-semibold">{l.label}</div>
              <div className="mt-2 text-accent text-sm">Read →</div>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
