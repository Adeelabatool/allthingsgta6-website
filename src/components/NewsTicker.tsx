import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { type NewsItem } from "@/data/news";
import { tickerDate, tickerStories } from "@/lib/ticker";

/** How fast the track moves, in CSS pixels per second. */
const SPEED_PX_PER_SECOND = 55;
/** Guard rails so a very short or very long track still reads sensibly. */
const MIN_DURATION_S = 24;
const MAX_DURATION_S = 140;

/**
 * The breaking-news ticker.
 *
 * Stories come from publicNews(), so the publishing lifecycle decides what
 * appears: drafts, future-scheduled posts and unpublished revisions are already
 * filtered out, and a scheduled story joins the ticker on its own once its
 * publishAt passes. There is no separate headline list to maintain.
 */
export function NewsTicker() {
  const items = tickerStories();

  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLUListElement>(null);
  const [duration, setDuration] = useState<number | null>(null);

  // Duration is derived from the rendered width so the speed stays constant
  // whatever the headlines are. Until this runs (SSR, or before hydration) the
  // stylesheet's default duration applies.
  useEffect(() => {
    const sequence = sequenceRef.current;
    if (!sequence) return;

    const measure = () => {
      const width = sequence.getBoundingClientRect().width;
      if (!width) return;
      const seconds = width / SPEED_PX_PER_SECOND;
      setDuration(Math.min(MAX_DURATION_S, Math.max(MIN_DURATION_S, seconds)));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(sequence);
    return () => observer.disconnect();
  }, [items.length]);

  if (items.length === 0) {
    return (
      <TickerBar>
        <Link
          to="/gta-6-news"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Latest GTA 6 News →
        </Link>
      </TickerBar>
    );
  }

  return (
    <TickerBar>
      <div className="news-ticker" role="region" aria-label="Latest GTA 6 news">
        <div
          ref={trackRef}
          className="news-ticker-track"
          style={
            duration ? ({ "--ticker-duration": `${duration}s` } as React.CSSProperties) : undefined
          }
        >
          <TickerSequence items={items} ref={sequenceRef} />
          {/* Second copy exists only so the loop can wrap without a gap. It is
              hidden from assistive tech and skipped by the tab order. */}
          <TickerSequence items={items} duplicate />
        </div>
      </div>
    </TickerBar>
  );
}

function TickerBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-border/60 bg-secondary/40">
      <div className="container-page flex items-center gap-3 py-2">
        <span className="chip chip-hot shrink-0 news-ticker-badge">🔥 Breaking</span>
        {children}
      </div>
    </div>
  );
}

function TickerSequence({
  items,
  duplicate,
  ref,
}: {
  items: NewsItem[];
  duplicate?: boolean;
  ref?: React.Ref<HTMLUListElement>;
}) {
  return (
    <ul ref={ref} className="news-ticker-seq" aria-hidden={duplicate || undefined}>
      {items.map((item) => (
        <li key={item.slug} className="news-ticker-item">
          <Link
            to="/news/$slug"
            params={{ slug: item.slug }}
            tabIndex={duplicate ? -1 : undefined}
            className="news-ticker-link"
          >
            <time dateTime={item.date} className="news-ticker-date">
              {tickerDate(item.date)}
            </time>
            <span className="news-ticker-headline">{item.title}</span>
          </Link>
          <span aria-hidden="true" className="news-ticker-sep">
            •
          </span>
        </li>
      ))}
    </ul>
  );
}
