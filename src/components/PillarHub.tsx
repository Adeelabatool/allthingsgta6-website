import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import type { ReactNode } from "react";

export function PillarHub({
  eyebrow, title, lede, sections,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  sections: { title: string; items: { href: string; label: string; desc?: string }[] }[];
}) {
  return (
    <SiteShell>
      <header className="container-page pt-12 pb-8">
        <span className="chip chip-hot">{eyebrow}</span>
        <h1 className="heading-display text-4xl md:text-7xl mt-4 max-w-4xl">{title}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">{lede}</p>
      </header>
      <div className="container-page pb-16 space-y-10">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-2xl font-extrabold mb-3">{s.title}</h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {s.items.map((i) => (
                <a key={i.href} href={i.href} className="surface surface-hover p-5 block">
                  <div className="font-bold">{i.label}</div>
                  {i.desc && <p className="text-sm text-muted-foreground mt-1">{i.desc}</p>}
                  <div className="mt-3 text-accent text-sm">Read →</div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </SiteShell>
  );
}
