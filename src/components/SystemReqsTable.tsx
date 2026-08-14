// GTA 6 system requirements.
//
// Honesty policy for this component: Rockstar has NOT published PC system
// requirements for GTA 6 as of this writing, and no minimum/recommended GPU or
// CPU tier has been announced. We therefore do not invent PC spec numbers.
// What we show instead:
//   1. The confirmed launch platforms and their real, published hardware specs.
//   2. Official launch-day PC requirements for Rockstar's two most recent PC
//      ports (GTA V, RDR2) as historical reference points, clearly labelled as
//      precedent — not a prediction of GTA 6's requirements.

// Real, published console hardware specs. These are facts about the hardware,
// not estimates about the game.
const CONSOLE_ROWS: string[][] = [
  ["Launch date", "November 19, 2026", "November 19, 2026"],
  ["GPU", "RDNA 2, ~10.28 TFLOPS", "Series X: RDNA 2, ~12 TFLOPS · Series S: ~4 TFLOPS"],
  ["CPU", "AMD Zen 2, 8-core", "AMD Zen 2, 8-core"],
  ["Memory", "16 GB GDDR6", "16 GB GDDR6 (Series X) · 10 GB (Series S)"],
  ["Storage", "825 GB SSD", "1 TB SSD (Series X) · 512 GB (Series S)"],
];

// Official launch-day PC minimum specs for prior Rockstar releases, with the
// gap between console and PC launch. Reference only.
const PC_PRECEDENT: { game: string; consoleLaunch: string; pcLaunch: string; gap: string; min: string }[] = [
  {
    game: "Grand Theft Auto V",
    consoleLaunch: "Sep 2013",
    pcLaunch: "Apr 2015",
    gap: "~18 months",
    min: "Core 2 Quad Q6600 / Phenom 9850 · 4 GB RAM · GeForce 9800 GT 1 GB / Radeon HD 4870 1 GB · 72 GB",
  },
  {
    game: "Red Dead Redemption 2",
    consoleLaunch: "Oct 2018",
    pcLaunch: "Nov 2019",
    gap: "~13 months",
    min: "Core i5-2500K / FX-6300 · 8 GB RAM · GeForce GTX 770 2 GB / Radeon R9 280 3 GB · 150 GB",
  },
];

export function SystemReqsTable({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-6">
      <div className="surface overflow-x-auto">
        <div className="px-5 py-3 border-b border-border bg-secondary/40 text-xs uppercase tracking-widest text-muted-foreground">
          Confirmed launch platforms · Rockstar-announced
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3">Spec</th>
              <th className="px-5 py-3">PlayStation 5</th>
              <th className="px-5 py-3">Xbox Series X|S</th>
            </tr>
          </thead>
          <tbody>
            {CONSOLE_ROWS.map((r) => (
              <tr key={r[0]} className="border-t border-border/60 hover:bg-secondary/30">
                <td className="px-5 py-3 font-semibold">{r[0]}</td>
                <td className="px-5 py-3 text-muted-foreground">{r[1]}</td>
                <td className="px-5 py-3 text-muted-foreground">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-border/60 text-xs text-muted-foreground">
          Console figures are published hardware specifications. GTA 6 is confirmed for PS5 and Xbox Series X|S only at launch.
        </div>
      </div>

      {!compact && (
        <div className="surface overflow-x-auto">
          <div className="px-5 py-3 border-b border-border bg-secondary/40 text-xs uppercase tracking-widest text-muted-foreground">
            PC — not yet announced
          </div>
          <div className="px-5 py-4 text-sm text-muted-foreground">
            Rockstar has <strong className="text-foreground">not</strong> confirmed a PC version or published PC system
            requirements. We won't invent GPU/CPU numbers. For context, here are the actual launch-day minimum
            requirements and console-to-PC gaps for Rockstar's last two releases:
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3">Game</th>
                <th className="px-5 py-3">Console → PC gap</th>
                <th className="px-5 py-3">Official PC minimum (at launch)</th>
              </tr>
            </thead>
            <tbody>
              {PC_PRECEDENT.map((p) => (
                <tr key={p.game} className="border-t border-border/60 hover:bg-secondary/30 align-top">
                  <td className="px-5 py-3 font-semibold">{p.game}</td>
                  <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">
                    {p.consoleLaunch} → {p.pcLaunch}
                    <div className="text-xs text-foreground/60">{p.gap}</div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{p.min}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-border/60 text-xs text-muted-foreground">
            Historical precedent only — not a prediction of GTA 6's PC requirements. This table will be replaced with
            official figures if and when Rockstar publishes them.
          </div>
        </div>
      )}
    </div>
  );
}
