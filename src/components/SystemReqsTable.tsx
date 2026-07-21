const ROWS: string[][] = [
  ["OS", "Windows 11 (64-bit)", "Windows 11 (64-bit)", "PS5 System Software", "Xbox OS"],
  ["CPU", "Intel i5-6600K / Ryzen 5 3600", "i5-6600K / Ryzen 5 3600", "AMD Zen 2 8-core @ 3.5 GHz", "AMD Zen 2 8-core @ 3.8 GHz"],
  ["GPU", "GTX 1660 / RX 6500 XT", "RTX 4070 Mobile (recommended)", "RDNA 2 10.28 TFLOPS", "RDNA 2 12 TFLOPS"],
  ["RAM", "16 GB", "16–32 GB", "16 GB GDDR6", "16 GB GDDR6"],
  ["Storage", "150 GB SSD", "150 GB NVMe SSD", "825 GB NVMe SSD", "1 TB NVMe SSD"],
  ["DirectX", "Version 12", "Version 12", "N/A", "N/A"],
  ["Output", "Unlocked FPS", "Unlocked FPS", "Up to 4K / 120 fps", "Up to 4K / 120 fps"],
  ["Launch", "TBA PC", "TBA PC", "Nov 19, 2026", "Nov 19, 2026"],
];

export function SystemReqsTable({ compact = false }: { compact?: boolean }) {
  return (
    <div className="surface overflow-x-auto">
      <div className="px-5 py-3 border-b border-border bg-secondary/40 text-xs uppercase tracking-widest text-muted-foreground">
        Estimated / Speculative — based on leaks and modern AAA benchmarks
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <th className="px-5 py-3">Spec</th>
            <th className="px-5 py-3">PC</th>
            {!compact && <th className="px-5 py-3">Laptop</th>}
            <th className="px-5 py-3">PlayStation 5</th>
            <th className="px-5 py-3">Xbox Series X|S</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r[0]} className="border-t border-border/60 hover:bg-secondary/30">
              <td className="px-5 py-3 font-semibold">{r[0]}</td>
              <td className="px-5 py-3 text-muted-foreground">{r[1]}</td>
              {!compact && <td className="px-5 py-3 text-muted-foreground">{r[2]}</td>}
              <td className="px-5 py-3 text-muted-foreground">{r[3]}</td>
              <td className="px-5 py-3 text-muted-foreground">{r[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
