import { createFileRoute, Link } from "@tanstack/react-router";
import { LongFormArticle } from "@/components/LongFormArticle";
import { pageByPath } from "@/data/pages";
import { articleHead } from "@/lib/seo";
import { SiteShell } from "@/components/SiteShell";
import { SystemReqsTable } from "@/components/SystemReqsTable";

export const Route = createFileRoute("/system-requirements")({
  // The upgraded article for this URL is scheduled. Until its publishAt passes
  // pageByPath returns undefined and the existing live hub keeps serving, so the
  // page is never dark and never 404s partway through the schedule.
  head: () => {
    const upgraded = pageByPath("/system-requirements");
    if (upgraded) {
      return articleHead({
        path: upgraded.path,
        title: upgraded.seoTitle,
        description: upgraded.metaDescription,
        canonicalOverride: upgraded.canonicalOverride,
      });
    }
    return {
      meta: [
        { title: "GTA 6 System Requirements — PS5, Xbox & PC (What's Confirmed)" },
        {
          name: "description",
          content:
            "GTA 6 confirmed console hardware for PS5 and Xbox Series X|S. Rockstar has not announced PC system requirements — we show Rockstar's past PC ports as reference instead of inventing specs.",
        },
        { property: "og:title", content: "GTA 6 System Requirements" },
        {
          property: "og:description",
          content: "Confirmed GTA 6 console platforms and honest PC context — no invented specs.",
        },
        { property: "og:url", content: "https://allthingsgta6.com/system-requirements" },
      ],
      links: [{ rel: "canonical", href: "https://allthingsgta6.com/system-requirements" }],
    };
  },
  component: HubRoute,
});

function HubRoute() {
  const upgraded = pageByPath("/system-requirements");
  if (upgraded) return <LongFormArticle page={upgraded} />;
  return <SystemReqsPage />;
}

function SystemReqsPage() {
  return (
    <SiteShell>
      <header className="container-page pt-12 pb-6">
        <span className="chip chip-neon">Guide · Specs</span>
        <h1 className="heading-display text-4xl md:text-6xl mt-4">GTA 6 System Requirements</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
          GTA 6 is confirmed for PlayStation 5 and Xbox Series X|S, whose hardware specs are
          published facts. Rockstar has not announced a PC version or PC system requirements, so
          rather than invent numbers we show the official launch requirements of Rockstar's last two
          PC ports as reference. This page updates the moment official PC specs exist.
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
            { href: "/analysis/engine-analysis", label: "Engine Analysis: RAGE 9" },
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
