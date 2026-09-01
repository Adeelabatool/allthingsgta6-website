import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { useState } from "react";
import { SECTION_CRUMBS, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/tools/hype-calculator")({
  head: () => ({
    meta: [
      { title: "GTA 6 Hype Calculator — Score Your Anticipation" },
      {
        name: "description",
        content: "Quantify your GTA 6 hype level with our interactive calculator.",
      },
      { property: "og:url", content: "https://allthingsgta6.com/tools/hype-calculator" },
    ],
    scripts: breadcrumbJsonLd([
      SECTION_CRUMBS.tools,
      { name: "Hype Calculator", path: "/tools/hype-calculator" },
    ]),
    links: [{ rel: "canonical", href: "https://allthingsgta6.com/tools/hype-calculator" }],
  }),
  component: HypeCalculator,
});

function HypeCalculator() {
  const [trailers, setTrailers] = useState(5);
  const [hours, setHours] = useState(20);
  const [preorder, setPreorder] = useState(50);
  const [reddit, setReddit] = useState(3);
  const [played, setPlayed] = useState(4);

  const score = Math.min(
    100,
    Math.round(trailers * 4 + hours * 1.2 + preorder * 0.3 + reddit * 6 + played * 5),
  );

  const tier =
    score >= 90
      ? { label: "🔥 Rockstar would hire you", color: "chip-hot" }
      : score >= 70
        ? { label: "🚨 Maximum Hype", color: "chip-hot" }
        : score >= 50
          ? { label: "📈 Hyped Citizen", color: "chip-neon" }
          : score >= 30
            ? { label: "🕶 Casual Observer", color: "chip-neon" }
            : { label: "🛏 Sleeping On It", color: "chip" };

  return (
    <SiteShell>
      <div className="container-page py-12 max-w-3xl">
        <h1 className="heading-display text-4xl md:text-6xl">Hype Calculator</h1>
        <p className="mt-2 text-muted-foreground">Move the sliders. Get your score.</p>

        <div className="mt-8 surface p-6 space-y-5">
          <Slider
            label="Trailer rewatches"
            value={trailers}
            setValue={setTrailers}
            max={20}
            unit="times"
          />
          <Slider
            label="Hours you'd play at launch / week"
            value={hours}
            setValue={setHours}
            max={40}
            unit="hrs"
          />
          <Slider
            label="Max $ you'd spend on pre-order"
            value={preorder}
            setValue={setPreorder}
            max={250}
            unit="$"
          />
          <Slider
            label="GTA subreddit visits / day"
            value={reddit}
            setValue={setReddit}
            max={20}
            unit="visits"
          />
          <Slider
            label="Previous GTA games played"
            value={played}
            setValue={setPlayed}
            max={8}
            unit="games"
          />
        </div>

        <div className="mt-6 surface p-8 text-center">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Your Hype Score
          </div>
          <div className="heading-display text-7xl mt-2 tabular-nums">{score}</div>
          <div className="mt-3">
            <span className={`chip ${tier.color}`}>{tier.label}</span>
          </div>
          <div className="mt-5 w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${score}%` }} />
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

function Slider({
  label,
  value,
  setValue,
  max,
  unit,
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  max: number;
  unit: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <label className="font-semibold">{label}</label>
        <span className="text-accent tabular-nums">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full mt-2 accent-[var(--hot)]"
      />
    </div>
  );
}
