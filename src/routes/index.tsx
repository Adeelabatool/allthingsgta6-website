import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteShell } from "@/components/SiteShell";
import { publicNews } from "@/data/news";
import { publicWiki } from "@/data/wiki";
import { publicAnalyses } from "@/data/analysis";
import { SystemReqsTable } from "@/components/SystemReqsTable";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AllThingsGTA6 — GTA 6 Live Dashboard" },
      {
        name: "description",
        content:
          "Live GTA 6 dashboard: breaking news, countdown to November 19 2026, featured analysis, wiki highlights, and interactive tools.",
      },
      { property: "og:title", content: "AllThingsGTA6 — GTA 6 Live Dashboard" },
      {
        property: "og:description",
        content: "GTA 6 news, wiki, analysis and tools — all in one live intelligence dashboard.",
      },
      { property: "og:url", content: "https://allthingsgta6.com/" },
    ],
    links: [{ rel: "canonical", href: "https://allthingsgta6.com/" }],
  }),
  component: Index,
});

function Index() {
  // Every homepage module reads from the gated accessors, so a draft or a
  // not-yet-due scheduled post can never appear in the ticker, the latest
  // grid, the featured rail or the wiki highlights.
  const visibleNews = publicNews();
  const visibleWiki = publicWiki();
  const breaking = visibleNews.slice(0, 5);
  const latest = visibleNews.slice(0, 9);
  const featured = publicAnalyses().slice(0, 3);
  const wikiHighlights = ["jason", "lucia", "vice-city", "sports-cars-overview", "guns-overview"]
    .map((slug) => visibleWiki.find((w) => w.slug === slug))
    .filter(Boolean) as typeof visibleWiki;

  return (
    <SiteShell>
      {/* Breaking strip */}
      <div className="border-b border-border/60 bg-secondary/40">
        <div className="container-page flex items-center gap-4 py-2 text-sm overflow-x-auto">
          <span className="chip chip-hot shrink-0">🔥 Breaking</span>
          <div className="flex gap-6 whitespace-nowrap">
            {breaking.map((n) => (
              <Link
                key={n.slug}
                to="/news/$slug"
                params={{ slug: n.slug }}
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="text-foreground/40 mr-2">{n.date}</span>
                {n.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden py-14 px-6 pb-12">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.13 0.03 270) 0%, oklch(0.22 0.08 310 / 0.8) 60%, oklch(0.35 0.12 340 / 0.5) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 3px)",
          }}
        />
        <div className="relative max-w-[1100px] mx-auto px-6 grid gap-10 lg:grid-cols-[1.3fr_1fr] items-end">
          <div>
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-5 border"
              style={{
                borderColor: "oklch(0.72 0.25 330 / 0.4)",
                background: "oklch(0.72 0.25 330 / 0.1)",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-primary)",
              }}
            >
              📡 Intelligence Platform
            </div>
            <h1
              className="text-5xl md:text-[52px] font-bold leading-[1.05] mb-4"
              style={{ letterSpacing: "-0.03em" }}
            >
              Everything <span className="text-primary">GTA 6</span>.
              <br />
              <span className="text-accent">All in one place.</span>
            </h1>
            <p className="text-base leading-relaxed mb-7 max-w-[480px] text-muted-foreground">
              News, wiki, analysis and tools — built for fans who want more than headlines.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Link
                to="/news"
                className="inline-flex items-center gap-1.5 rounded-md px-5 py-2.5 text-[13px] font-semibold text-white border-0 transition-transform hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.25 330) 0%, oklch(0.6 0.2 300) 50%, oklch(0.78 0.18 200) 100%)",
                }}
              >
                Latest News →
              </Link>
              <Link
                to="/tools"
                className="inline-flex items-center gap-1.5 rounded-md px-5 py-2.5 text-[13px] font-semibold transition-colors hover:bg-accent/15"
                style={{
                  border: "1px solid oklch(0.78 0.18 200 / 0.4)",
                  background: "oklch(0.78 0.18 200 / 0.08)",
                  color: "var(--color-accent)",
                }}
              >
                Explore Tools
              </Link>
            </div>
          </div>
          <HeroCountdown />
        </div>
      </section>

      {/* Featured Analysis */}
      <Section title="Featured Analysis" subtitle="Editorial deep-dives" href="/analysis">
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <Link
              key={a.slug}
              to="/analysis/$slug"
              params={{ slug: a.slug }}
              className="surface surface-hover p-5 block"
            >
              <div className="chip chip-neon mb-3">Analysis</div>
              <h3 className="font-bold text-xl leading-tight">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{a.hook}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Latest News Grid */}
      <Section title="Latest News" subtitle="Real-time signals" href="/news">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((n) => (
            <Link
              key={n.slug}
              to="/news/$slug"
              params={{ slug: n.slug }}
              className="surface surface-hover p-5 block"
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="chip">{n.category.replace("-", " ")}</span>
                <span>{n.date}</span>
              </div>
              <h3 className="mt-3 font-bold text-lg leading-tight">{n.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{n.summary}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Wiki Highlights */}
      <Section title="Wiki Highlights" subtitle="Structured knowledge base" href="/wiki">
        <div className="grid gap-3 md:grid-cols-5">
          {wikiHighlights.map((w) => (
            <Link
              key={w.slug}
              to="/wiki/$type/$slug"
              params={{ type: w.type, slug: w.slug }}
              className="surface surface-hover p-4 block"
            >
              <div className="text-xs uppercase tracking-widest text-accent">{w.type}</div>
              <div className="mt-1 font-bold">{w.name}</div>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-3">{w.overview}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Tools Preview */}
      <Section title="Interactive Tools" subtitle="Engage with the data" href="/tools">
        <div className="grid gap-4 md:grid-cols-3">
          <ToolCard
            href="/tools/countdown"
            title="Release Countdown"
            desc="Time remaining until GTA 6 launches."
            icon="🟢"
          />
          <ToolCard
            href="/tools/hype-calculator"
            title="Hype Calculator"
            desc="Quantify your anticipation."
            icon="📈"
          />
          <ToolCard
            href="/tools/vehicle-comparator"
            title="Vehicle Comparator"
            desc="Side-by-side spec tables."
            icon="🏎️"
          />
        </div>
      </Section>

      {/* System Requirements */}
      <Section
        title="System Requirements"
        subtitle="Confirmed console platforms · PC not yet announced by Rockstar"
      >
        <SystemReqsTable />
      </Section>
    </SiteShell>
  );
}

function Section({
  title,
  subtitle,
  href,
  children,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="container-page py-10">
      <div className="flex items-end justify-between mb-5 flex-wrap gap-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {href && (
          <Link to={href} className="text-sm text-accent hover:underline">
            View all →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function ToolCard({
  href,
  title,
  desc,
  icon,
}: {
  href: string;
  title: string;
  desc: string;
  icon: string;
}) {
  return (
    <Link to={href} className="surface surface-hover p-6 block">
      <div className="text-3xl">{icon}</div>
      <div className="mt-3 font-bold text-lg">{title}</div>
      <p className="text-sm text-muted-foreground mt-1">{desc}</p>
      <div className="mt-4 text-accent text-sm">Open tool →</div>
    </Link>
  );
}

const HERO_TARGET = new Date("2026-11-19T00:00:00Z").getTime();

function HeroCountdown() {
  const [t, setT] = useState(() => {
    const now = Date.now();
    const delta = HERO_TARGET - now;
    const ms = Math.max(0, delta);
    const days = Math.floor(ms / 86_400_000);
    const hours = Math.floor((ms % 86_400_000) / 3_600_000);
    const minutes = Math.floor((ms % 3_600_000) / 60_000);
    const seconds = Math.floor((ms % 60_000) / 1000);
    return { days, hours, minutes, seconds };
  });

  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      const delta = HERO_TARGET - now;
      const ms = Math.max(0, delta);
      const days = Math.floor(ms / 86_400_000);
      const hours = Math.floor((ms % 86_400_000) / 3_600_000);
      const minutes = Math.floor((ms % 3_600_000) / 60_000);
      const seconds = Math.floor((ms % 60_000) / 1000);
      setT({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];

  return (
    <div className="border border-border/60 bg-card/85 backdrop-blur-xl rounded-[14px] p-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-1">
        Confirmed Release
      </div>
      <div className="text-lg font-bold mb-4">November 19, 2026</div>
      <div className="grid grid-cols-4 gap-1.5">
        {cells.map((c) => (
          <div
            key={c.label}
            className="border border-border/60 bg-background/70 rounded-lg py-3 px-2 text-center"
          >
            <div className="font-mono text-[28px] font-bold text-primary tabular-nums">
              {String(c.value).padStart(2, "0")}
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground mt-1">
              {c.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
