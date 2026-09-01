/**
 * Evidence classification vocabulary.
 *
 * The four states are fixed and their meanings do not move:
 *
 *   confirmed   — stated directly by Rockstar Games, Take-Two, Rockstar Support,
 *                 or an official platform/store source.
 *   observed    — clearly visible in official footage or screenshots, but not
 *                 formally named or explained.
 *   reported    — a credible outlet adds context Rockstar has not documented.
 *   speculation — interpretation, prediction, leak, or an open question.
 *
 * Nothing here promotes a claim between states. Upgrading anything to
 * "confirmed" requires a first-party source, not a code change.
 */

export type EvidenceKind = "confirmed" | "observed" | "reported" | "speculation";

export interface EvidenceRow {
  kind: EvidenceKind;
  /** How this specific article applies the classification. */
  usage: string;
}

export const EVIDENCE_LABELS: Record<EvidenceKind, string> = {
  confirmed: "Confirmed",
  observed: "Observed",
  reported: "Reported",
  speculation: "Speculation / Unknown",
};

export const EVIDENCE_DEFINITIONS: Record<EvidenceKind, string> = {
  confirmed:
    "Stated directly by Rockstar Games, Take-Two, Rockstar Support, or an official platform or store source.",
  observed:
    "Clearly visible in official footage or screenshots, but not formally named or fully explained.",
  reported: "A credible outlet adds context that is not yet documented by Rockstar.",
  speculation:
    "Interpretation, prediction, leak, community reconstruction, or a question Rockstar has not answered.",
};

export const EVIDENCE_ORDER: EvidenceKind[] = ["confirmed", "observed", "reported", "speculation"];
