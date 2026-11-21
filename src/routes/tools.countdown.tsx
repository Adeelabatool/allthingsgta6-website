import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { Countdown } from "@/components/Countdown";
import { SECTION_CRUMBS, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/tools/countdown")({
  head: () =>
    pageHead({
      path: "/tools/countdown",
      title: "GTA 6 Countdown: The Game Is Out (Released November 19, 2026)",
      description:
        "GTA 6 launched on November 19, 2026 for PS5 and Xbox Series X|S. See how long it has been out and where to start.",
      crumbs: [SECTION_CRUMBS.tools, { name: "Countdown", path: "/tools/countdown" }],
    }),
  component: CountdownPage,
});

function CountdownPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-4 md:px-6 py-20 text-center">
        <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-accent">
          Countdown
        </div>
        <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold tracking-tight">
          GTA 6 launched on <span className="text-primary">November 19, 2026</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          Grand Theft Auto VI is out on PlayStation 5 and Xbox Series X|S. The timer shows how long
          it has been out.
        </p>

        <div className="mt-12 text-left">
          <Countdown variant="large" />
        </div>

        <p className="mt-8">
          <Link to="/gta-6-release-date" className="text-accent hover:underline">
            Release date, platforms and editions →
          </Link>
        </p>
      </div>
    </SiteShell>
  );
}
