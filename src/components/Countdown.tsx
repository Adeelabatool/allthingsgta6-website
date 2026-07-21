import { useEffect, useState } from "react";

const TARGET = new Date("2026-11-19T00:00:00Z").getTime();

function diff() {
  const now = Date.now();
  const delta = TARGET - now;
  const released = delta <= 0;
  const ms = Math.abs(delta);
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds, released };
}

export function Countdown({ variant = "default" }: { variant?: "default" | "large" }) {
  const [t, setT] = useState(diff);
  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { label: t.released ? "Days Since" : "Days", value: t.days },
    { label: t.released ? "Hours" : "Hours", value: t.hours },
    { label: t.released ? "Minutes" : "Minutes", value: t.minutes },
    { label: t.released ? "Seconds" : "Seconds", value: t.seconds },
  ];

  const sizing = variant === "large"
    ? "text-5xl md:text-7xl"
    : "text-3xl md:text-4xl";

  if (t.released) {
    return (
      <div className="surface p-5 md:p-6 border-2 border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.12)]">
        {/* LIVE NOW banner */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-green-400 font-bold">
            Live Now
          </span>
        </div>

        <div className="text-center mb-5">
          <div className="text-2xl md:text-4xl font-display font-extrabold text-green-400 tracking-tight">
            GTA 6 IS OUT
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            Released Nov 19, 2026 · Time since launch
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {cells.map((c) => (
            <div
              key={c.label}
              className="text-center rounded-md bg-green-500/10 py-3 md:py-4 border border-green-500/20"
            >
              <div
                className={`font-display font-extrabold tabular-nums ${sizing} text-green-400`}
              >
                {String(c.value).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[10px] md:text-xs uppercase tracking-widest text-green-400/70">
                {c.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400 border border-green-500/20">
            🎮 Ready to play on PS5 & Xbox Series X|S
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="surface p-5 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="live-dot" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Live Countdown
          </span>
        </div>
        <span className="text-xs text-muted-foreground">Target: Nov 19, 2026</span>
      </div>
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {cells.map((c) => (
          <div key={c.label} className="text-center rounded-md bg-secondary/60 py-3 md:py-4 border border-border">
            <div className={`font-display font-extrabold tabular-nums ${sizing} text-foreground`}>
              {String(c.value).padStart(2, "0")}
            </div>
            <div className="mt-1 text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">
              {c.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
