import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { useState } from "react";
import { SECTION_CRUMBS, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/tools/vehicle-comparator")({
  head: () => ({
    meta: [
      { title: "GTA 6 Vehicle Comparator — Side-by-Side Specs" },
      { name: "description", content: "Compare GTA 6 vehicle specs side-by-side: speed, handling, acceleration, type." },
      { property: "og:url", content: "https://allthingsgta6.com/tools/vehicle-comparator" },
    ],
    scripts: breadcrumbJsonLd([
      SECTION_CRUMBS.tools,
      { name: "Vehicle Comparator", path: "/tools/vehicle-comparator" },
    ]),
    links: [{ rel: "canonical", href: "https://allthingsgta6.com/tools/vehicle-comparator" }],
  }),
  component: VehicleComparator,
});

interface Vehicle {
  name: string;
  type: string;
  speed: number;
  handling: number;
  acceleration: number;
}

const VEHICLES: Vehicle[] = [
  { name: "Vice Hypersport (est.)",     type: "Super",      speed: 96, handling: 88, acceleration: 94 },
  { name: "Leonida GT (est.)",          type: "Sports",     speed: 88, handling: 90, acceleration: 86 },
  { name: "Coastal SUV (est.)",         type: "SUV",        speed: 70, handling: 65, acceleration: 60 },
  { name: "Glades Pickup (est.)",       type: "Off-road",   speed: 65, handling: 70, acceleration: 58 },
  { name: "Strip Cruiser (est.)",       type: "Motorcycle", speed: 92, handling: 80, acceleration: 95 },
  { name: "Patrol Interceptor (est.)",  type: "Police",     speed: 84, handling: 78, acceleration: 80 },
];

function VehicleComparator() {
  const [a, setA] = useState(VEHICLES[0].name);
  const [b, setB] = useState(VEHICLES[1].name);
  const va = VEHICLES.find((v) => v.name === a)!;
  const vb = VEHICLES.find((v) => v.name === b)!;

  return (
    <SiteShell>
      <div className="container-page py-12 max-w-4xl">
        <h1 className="heading-display text-4xl md:text-6xl">Vehicle Comparator</h1>
        <p className="mt-2 text-muted-foreground">Side-by-side speculative spec comparison.</p>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <Picker label="Vehicle A" value={a} onChange={setA} />
          <Picker label="Vehicle B" value={b} onChange={setB} />
        </div>

        <div className="mt-6 surface overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-xs uppercase tracking-widest text-muted-foreground">
              <tr><th className="px-4 py-3 text-left">Spec</th><th className="px-4 py-3 text-left">{va.name}</th><th className="px-4 py-3 text-left">{vb.name}</th></tr>
            </thead>
            <tbody>
              <Row label="Type" a={va.type} b={vb.type} />
              <BarRow label="Speed" a={va.speed} b={vb.speed} />
              <BarRow label="Handling" a={va.handling} b={vb.handling} />
              <BarRow label="Acceleration" a={va.acceleration} b={vb.acceleration} />
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3">All stats are speculative pre-release estimates.</p>
      </div>
    </SiteShell>
  );
}

function Picker({ label, value, onChange }: { label: string; value: string; onChange: (s: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full bg-secondary border border-border rounded-md px-3 py-2">
        {VEHICLES.map((v) => <option key={v.name} value={v.name}>{v.name}</option>)}
      </select>
    </label>
  );
}

function Row({ label, a, b }: { label: string; a: string; b: string }) {
  return (
    <tr className="border-t border-border/60">
      <td className="px-4 py-3 font-semibold">{label}</td>
      <td className="px-4 py-3">{a}</td>
      <td className="px-4 py-3">{b}</td>
    </tr>
  );
}

function BarRow({ label, a, b }: { label: string; a: number; b: number }) {
  return (
    <tr className="border-t border-border/60">
      <td className="px-4 py-3 font-semibold">{label}</td>
      <td className="px-4 py-3"><Bar value={a} /></td>
      <td className="px-4 py-3"><Bar value={b} /></td>
    </tr>
  );
}

function Bar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
        <div className="h-full bg-primary" style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs tabular-nums text-muted-foreground w-8">{value}</span>
    </div>
  );
}
