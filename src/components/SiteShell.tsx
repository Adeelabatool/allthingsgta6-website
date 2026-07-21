import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const primaryNav = [
  { to: "/", label: "Home" },
  { to: "/news", label: "News" },
  { to: "/wiki", label: "Wiki" },
  { to: "/analysis", label: "Analysis" },
  { to: "/tools", label: "Tools" },
];

const pillarNav = [
  { to: "/gta-6-news", label: "News Hub" },
  { to: "/gta-6-release-date", label: "Release Date" },
  { to: "/gta-6-map", label: "Map" },
  { to: "/gta-6-characters", label: "Characters" },
  { to: "/gta-6-vehicles", label: "Vehicles" },
  { to: "/gta-6-weapons", label: "Weapons" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="container-page flex items-center justify-between py-3 gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="live-dot" />
            <span className="font-display font-extrabold tracking-tight text-lg">
              ALL<span className="text-primary">THINGS</span>GTA6
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {primaryNav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                activeProps={{ className: "px-3 py-1.5 rounded-md bg-secondary text-foreground" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/tools/countdown"
            className="hidden sm:inline-flex chip chip-hot"
          >
            ⏳ Countdown
          </Link>
        </div>
        <div className="border-t border-border/40 bg-background/60">
          <div className="container-page flex items-center gap-2 overflow-x-auto py-2 text-xs">
            <span className="text-muted-foreground font-semibold tracking-wider uppercase mr-2">Hubs</span>
            {pillarNav.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className="whitespace-nowrap chip hover:text-foreground transition-colors"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/60 mt-16">
        <div className="container-page py-10 grid gap-8 md:grid-cols-4 text-sm">
          <div>
            <div className="font-display font-extrabold text-lg">
              ALL<span className="text-primary">THINGS</span>GTA6
            </div>
            <p className="mt-2 text-muted-foreground">
              A gaming intelligence newsroom, encyclopedia, and data platform for Grand Theft Auto VI.
            </p>
          </div>
          <FooterCol title="Sections" links={primaryNav} />
          <FooterCol title="SEO Hubs" links={pillarNav} />
          <div>
            <div className="font-semibold mb-2">Disclaimer</div>
            <p className="text-muted-foreground">
              Unofficial fan-run intelligence site. Specs, dates, and leaks are speculative unless cited.
            </p>
          </div>
        </div>
        <div className="border-t border-border/40 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} AllThingsGTA6. Not affiliated with Rockstar Games or Take-Two Interactive.
        </div>
      </footer>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <div className="font-semibold mb-2">{title}</div>
      <ul className="space-y-1.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-muted-foreground hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
