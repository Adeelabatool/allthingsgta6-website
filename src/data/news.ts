export type NewsCategory =
  | "rockstar-updates"
  | "leaks"
  | "trailer-news"
  | "release-updates"
  | "community-reactions";

export interface NewsItem {
  slug: string;
  title: string;
  summary: string;
  category: NewsCategory;
  date: string;
  source: { label: string; url: string };
  whatHappened: string;
  analysis: string;
  meansForGta6: string;
  related?: { type: "wiki" | "analysis" | "pillar"; href: string; label: string }[];
}

export const newsCategories: { slug: NewsCategory; label: string }[] = [
  { slug: "rockstar-updates", label: "Rockstar Updates" },
  { slug: "leaks", label: "Leaks" },
  { slug: "trailer-news", label: "Trailer News" },
  { slug: "release-updates", label: "Release Updates" },
  { slug: "community-reactions", label: "Community Reactions" },
];

export const news: NewsItem[] = [
  {
    slug: "rockstar-confirms-gta-6-release-window",
    title: "Rockstar Confirms GTA 6 Release Date: November 19, 2026",
    summary:
      "Rockstar Games has reaffirmed the Grand Theft Auto VI launch date of November 19, 2026 on PS5 and Xbox Series X|S, with pre-orders live worldwide.",
    category: "rockstar-updates",
    date: "2026-05-01",
    source: { label: "Rockstar Newswire", url: "https://www.rockstargames.com/newswire" },
    whatHappened:
      "Take-Two Interactive's latest earnings update reiterated that GTA VI remains on track for its November 19, 2026 release on current-gen consoles, with pre-orders open since June 25, 2026. No PC date was provided.",
    analysis:
      "Reiterating the date this close to launch signals high internal confidence. Rockstar historically only confirms windows it can hit, and Take-Two's fiscal calendar depends on this release.",
    meansForGta6:
      "Expect a Trailer 2 within weeks, pre-orders to open shortly after, and a marketing push from late summer through launch. PC players should plan for a 6-18 month delay based on RDR2 precedent.",
    related: [
      { type: "pillar", href: "/gta-6-release-date", label: "GTA 6 Release Date Hub" },
      { type: "analysis", href: "/analysis/release-timeline-theory", label: "Release Timeline Theory" },
    ],
  },
  {
    slug: "gta-6-trailer-breakdown-news",
    title: "GTA 6 Trailer Breakdown: Every Detail You Missed",
    summary:
      "A frame-by-frame analysis of the GTA VI reveal trailer reveals new characters, vehicles, and locations across Vice City.",
    category: "trailer-news",
    date: "2026-04-22",
    source: { label: "Rockstar YouTube", url: "https://www.youtube.com/rockstargames" },
    whatHappened:
      "Rockstar's reveal trailer for Grand Theft Auto VI showcased Jason and Lucia, a modern Vice City, dynamic crowds, wildlife systems, and an updated lighting model.",
    analysis:
      "The trailer's NPC density and lighting fidelity suggest a generational leap in the RAGE engine. Crowd scenes hint at simulation-driven AI rather than scripted set pieces.",
    meansForGta6:
      "Expect deeper systemic gameplay: weather, wildlife, and crowd behavior will likely affect missions, economy, and player choice in ways GTA V never attempted.",
    related: [
      { type: "wiki", href: "/wiki/characters/jason", label: "Jason (Wiki)" },
      { type: "wiki", href: "/wiki/characters/lucia", label: "Lucia (Wiki)" },
      { type: "analysis", href: "/analysis/trailer-1-breakdown", label: "Trailer 1 Breakdown" },
    ],
  },
  {
    slug: "release-delay-rumor-explained",
    title: "GTA 6 Release Delay Rumor: What's Actually Happening",
    summary:
      "Rumors of a Q4 2026 slip surfaced this week. Here's what's substantiated and what's noise.",
    category: "release-updates",
    date: "2026-04-15",
    source: { label: "Bloomberg", url: "https://www.bloomberg.com" },
    whatHappened:
      "An industry analyst note cited 'supply chain risk' as a possible pressure on Rockstar's launch window. No official statement has been made.",
    analysis:
      "Analyst notes are not internal Rockstar communication. Take-Two's public position remains November 19, 2026, and CEO Strauss Zelnick has said no further delays are expected. A delay this late would trigger an SEC-level disclosure.",
    meansForGta6:
      "Treat the delay rumor as low-confidence until corroborated by Rockstar Newswire or a Take-Two earnings call.",
  },
  {
    slug: "community-reaction-report-trailer",
    title: "Community Reaction Report: First Trailer Hits 200M Views",
    summary:
      "The GTA VI reveal trailer crossed 200 million views, breaking YouTube's 24-hour record for a non-music video.",
    category: "community-reactions",
    date: "2026-04-10",
    source: { label: "YouTube Trending", url: "https://www.youtube.com/feed/trending" },
    whatHappened:
      "The reveal trailer reached 93M views in 24 hours and 200M within the first week. Reddit, X, and TikTok engagement set franchise records.",
    analysis:
      "These numbers signal demand that exceeds GTA V's 2013 launch curve. Pre-order conversion is likely to break industry records.",
    meansForGta6:
      "Server infrastructure for GTA Online's successor needs to scale far beyond Rockstar's prior peaks.",
  },
  {
    slug: "insider-leak-analysis",
    title: "Insider Leak Analysis: Verifying the 2022 Source Code Leak",
    summary:
      "Two years after the infamous source leak, we cross-check which leaked details have proven accurate.",
    category: "leaks",
    date: "2026-04-05",
    source: { label: "GTAForums Verification Thread", url: "https://gtaforums.com" },
    whatHappened:
      "Of ~90 leaked clips from the 2022 breach, roughly 70% of mechanics shown have appeared in subsequent trailers or Rockstar communications.",
    analysis:
      "The high accuracy rate validates the leak as legitimate work-in-progress footage rather than fabricated content.",
    meansForGta6:
      "Remaining unconfirmed leaks (dual-protagonist swap mechanics, robbery progression, AI dialogue) gain credibility as likely shipping features.",
  },
  {
    slug: "map-speculation-update",
    title: "GTA 6 Map Speculation: Leona County and Beyond",
    summary:
      "New trailer frames suggest a map roughly 2x the size of GTA V's San Andreas with multiple distinct biomes.",
    category: "leaks",
    date: "2026-03-28",
    source: { label: "DigitalFoundry", url: "https://www.digitalfoundry.net" },
    whatHappened:
      "Frame analysis of trailer aerial shots indicates a state ('Leone') containing Vice City, Keys-like islands, Everglades-style swamps, and rural panhandle.",
    analysis:
      "If accurate, this is Rockstar's largest open world ever. Streaming this on PS5/XSX hardware requires significant tech investment, supporting NVMe-only requirements.",
    meansForGta6:
      "Expect storage requirements ~150GB+ and a much richer ecosystem of activities per square mile than GTA V.",
    related: [{ type: "pillar", href: "/gta-6-map", label: "GTA 6 Map Hub" }],
  },
  {
    slug: "gameplay-rumor-breakdown",
    title: "Gameplay Rumor Breakdown: Dynamic Robbery System Returns",
    summary:
      "Reports indicate GTA VI will expand the heist system with dynamic, repeatable robberies across Vice City.",
    category: "leaks",
    date: "2026-03-20",
    source: { label: "Insider Gaming", url: "https://insider-gaming.com" },
    whatHappened:
      "Multiple sources describe a robbery loop where any store, bank, or armored truck can be robbed with scaling police response.",
    analysis:
      "This mirrors Red Dead Redemption 2's dynamic encounter system, scaled up. It implies emergent gameplay loops rather than fixed heist missions.",
    meansForGta6:
      "Player economy becomes systemic, not scripted — closer to a simulation than a campaign.",
  },
  {
    slug: "pc-release-discussion",
    title: "GTA 6 PC Release: Why Rockstar Stays Console-First",
    summary:
      "Rockstar's pattern of delayed PC releases continues. We examine the strategic reasoning.",
    category: "release-updates",
    date: "2026-03-12",
    source: { label: "Take-Two Earnings Call", url: "https://www.take2games.com/ir" },
    whatHappened:
      "Take-Two confirmed PC is not in the launch SKU lineup. RDR2 launched on PC 13 months after console release.",
    analysis:
      "Console-first protects hardware partnerships and reduces day-one piracy. Rockstar uses the gap to optimize for PC's variability.",
    meansForGta6:
      "PC players should expect a release window between mid-2027 and early 2028, likely with enhancements (higher framerate, RT improvements).",
  },
  {
    slug: "pre-order-rumors",
    title: "Pre-Order Rumors: Collector's Edition Details Leak",
    summary:
      "Retailer listings briefly appeared showing a Vice City Collector's Edition at $149.99.",
    category: "leaks",
    date: "2026-03-05",
    source: { label: "GameStop Listing Cache", url: "https://www.gamestop.com" },
    whatHappened:
      "GameStop and Best Buy listings appeared and were pulled within hours, showing Standard ($69.99), Deluxe ($99.99), and Collector's ($149.99) editions.",
    analysis:
      "Retailer slip-ups before official announcements are common and typically accurate. Pricing aligns with current AAA standards.",
    meansForGta6:
      "Expect formal pre-order announcement within 4-6 weeks based on retailer prep timelines.",
  },
  {
    slug: "trailer-2-expectations",
    title: "Trailer 2 Expectations: Gameplay Reveal Imminent",
    summary:
      "Pattern analysis of Rockstar's marketing cadence points to a gameplay-focused Trailer 2 in late spring.",
    category: "trailer-news",
    date: "2026-02-28",
    source: { label: "Rockstar Marketing History", url: "https://www.rockstargames.com" },
    whatHappened:
      "Rockstar's GTA V marketing arc included gameplay trailers ~6 months pre-launch. GTA VI follows a similar window.",
    analysis:
      "Expect Trailer 2 to focus on dual-protagonist switching, robbery mechanics, and Vice City's verticality.",
    meansForGta6:
      "Trailer 2 will set the gameplay narrative for the next 6 months of coverage and likely trigger pre-order opening.",
  },
];

export const newsBySlug = (slug: string) => news.find((n) => n.slug === slug);
export const newsByCategory = (category: string) => news.filter((n) => n.category === category);
