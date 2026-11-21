import { Fragment } from "react";
import { isLinkTargetLive } from "@/lib/related";

/**
 * Contextual links inside body copy.
 *
 * Content is stored as plain strings, so links use a minimal markdown-style
 * syntax: `[anchor text](/internal-path)`. Only site-relative paths are
 * recognised; anything else stays literal text so a typo can never produce an
 * off-site link.
 *
 * Each target is checked with the same live-state rule as the "related" lists:
 * a link to a draft, a not-yet-published page or an unknown route renders as
 * plain anchor text, never as a dead link.
 */

const INLINE_LINK = /\[([^\]\n]+)\]\((\/[^)\s]*)\)/g;

export type InlineSegment =
  | { kind: "text"; text: string }
  | { kind: "link"; text: string; href: string };

/** Splits a string into text and internal-link segments. */
export function parseInlineLinks(text: string): InlineSegment[] {
  const out: InlineSegment[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE_LINK)) {
    const start = m.index ?? 0;
    if (start > last) out.push({ kind: "text", text: text.slice(last, start) });
    out.push({ kind: "link", text: m[1], href: m[2] });
    last = start + m[0].length;
  }
  if (last < text.length) out.push({ kind: "text", text: text.slice(last) });
  return out;
}

/** The same string with link markup removed, keeping the anchor text. */
export function stripInlineLinks(text: string): string {
  return text.replace(INLINE_LINK, "$1");
}

export function InlineText({ text, now }: { text: string; now?: Date }) {
  return (
    <>
      {parseInlineLinks(text).map((seg, i) =>
        seg.kind === "link" && isLinkTargetLive(seg.href, now) ? (
          <a
            key={i}
            href={seg.href}
            className="text-accent underline underline-offset-2 hover:text-foreground"
          >
            {seg.text}
          </a>
        ) : (
          <Fragment key={i}>{seg.text}</Fragment>
        ),
      )}
    </>
  );
}
