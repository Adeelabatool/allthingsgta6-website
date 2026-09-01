import {
  EVIDENCE_DEFINITIONS,
  EVIDENCE_LABELS,
  EVIDENCE_ORDER,
  type EvidenceKind,
  type EvidenceRow,
} from "@/lib/evidence";

const CLASSES: Record<EvidenceKind, string> = {
  confirmed: "evidence evidence-confirmed",
  observed: "evidence evidence-observed",
  reported: "evidence evidence-reported",
  speculation: "evidence evidence-speculation",
};

export function EvidenceLabel({
  kind,
  children,
}: {
  kind: EvidenceKind;
  children?: React.ReactNode;
}) {
  return <span className={CLASSES[kind]}>{children ?? EVIDENCE_LABELS[kind]}</span>;
}

/** The per-article "Evidence status" table. */
export function EvidenceStatusTable({ rows }: { rows: EvidenceRow[] }) {
  return (
    <div className="surface p-5">
      <h2 className="text-xs uppercase tracking-widest text-accent font-bold">Evidence status</h2>
      <dl className="mt-3 space-y-3">
        {rows.map((r) => (
          <div
            key={r.kind}
            className="grid gap-1.5 sm:grid-cols-[auto_1fr] sm:gap-3 sm:items-baseline"
          >
            <dt>
              <EvidenceLabel kind={r.kind} />
            </dt>
            <dd className="text-sm text-foreground/90">{r.usage}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Standing explainer of what the four labels mean. */
export function EvidenceLegend() {
  return (
    <div className="surface p-5">
      <h2 className="text-xs uppercase tracking-widest text-accent font-bold">
        How to read the evidence labels
      </h2>
      <dl className="mt-3 space-y-3">
        {EVIDENCE_ORDER.map((k) => (
          <div key={k} className="grid gap-1.5 sm:grid-cols-[auto_1fr] sm:gap-3 sm:items-baseline">
            <dt>
              <EvidenceLabel kind={k} />
            </dt>
            <dd className="text-sm text-muted-foreground">{EVIDENCE_DEFINITIONS[k]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
