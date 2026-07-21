export interface AnalysisArticle {
  slug: string;
  title: string;
  hook: string;
  context: string;
  breakdown: { heading: string; body: string }[];
  evidence: { label: string; url: string }[];
  interpretations: { stance: string; body: string }[];
  finalInsight: string;
  date: string;
  related?: { type: "wiki" | "news" | "pillar"; href: string; label: string }[];
}

export const analyses: AnalysisArticle[] = [
  {
    slug: "trailer-1-breakdown",
    title: "GTA 6 Trailer 1 Breakdown: Engine, Density, and Intent",
    hook: "What does Rockstar's first trailer actually tell us about the game beneath the marketing?",
    context:
      "The reveal trailer for Grand Theft Auto VI dropped on December 4, 2023, and shattered viewership records. Two years later, with frame-perfect analysis available, we can separate visual marketing from technical signals.",
    breakdown: [
      {
        heading: "Lighting and material model",
        body: "Subsurface scattering on skin, GI bounce in beach scenes, and per-pixel reflection on wet asphalt indicate a substantial RAGE engine upgrade. The shading model resembles RDR2's but with significantly higher precision.",
      },
      {
        heading: "Crowd and traffic density",
        body: "Beach scenes show ~80+ unique NPC instances on screen with non-repeating animation cycles. This suggests an LOD/animation system rebuilt from scratch.",
      },
      {
        heading: "Vertical density",
        body: "High-rise interiors visible through windows imply enterable buildings far beyond GTA V's count, likely streamed dynamically rather than baked.",
      },
    ],
    evidence: [
      { label: "Rockstar Trailer 1", url: "https://www.youtube.com/watch?v=QdBZY2fkU-0" },
      { label: "Digital Foundry Analysis", url: "https://www.digitalfoundry.net" },
    ],
    interpretations: [
      {
        stance: "Optimistic",
        body: "The trailer represents in-engine gameplay rendering, indicating final-quality visuals on PS5/XSX.",
      },
      {
        stance: "Skeptical",
        body: "Reveal trailers often use bullshot cinematic lighting unavailable in gameplay. Expect some downgrade.",
      },
    ],
    finalInsight:
      "Even discounted for cinematic license, the trailer signals a generational leap. The density and lighting alone justify the 7-year dev cycle.",
    date: "2026-05-10",
    related: [
      { type: "wiki", href: "/wiki/map/vice-city", label: "Vice City" },
      { type: "news", href: "/news/gta-6-trailer-breakdown-news", label: "Trailer Breakdown News" },
    ],
  },
  {
    slug: "gta-6-vs-gta-5-comparison",
    title: "GTA 6 vs GTA 5: The Generational Gap",
    hook: "How does a game shipping 13 years after its predecessor justify the wait?",
    context:
      "GTA V (2013) defined the seventh-console-generation open world. GTA VI ships into a 2026 market dominated by live-service games and rising production costs.",
    breakdown: [
      {
        heading: "Scope",
        body: "Map estimated ~2x Los Santos plus rural Leonida. Interior count significantly higher. NPC density approximately 3-4x.",
      },
      {
        heading: "Simulation depth",
        body: "Dynamic wildlife, weather, and crowd AI move GTA VI closer to RDR2's simulationist philosophy than GTA V's scripted-mission model.",
      },
      {
        heading: "Economy and online",
        body: "Online is expected to launch with a heist-driven economy from day one rather than the slow rollout GTA Online required.",
      },
    ],
    evidence: [
      { label: "Trailer comparison", url: "https://www.youtube.com" },
      { label: "Take-Two earnings transcripts", url: "https://www.take2games.com/ir" },
    ],
    interpretations: [
      { stance: "Generational leap", body: "Density, fidelity, and simulation justify the wait." },
      { stance: "Iterative", body: "Core driving/shooting loop will feel familiar; the 'leap' is mostly fidelity." },
    ],
    finalInsight:
      "GTA VI is best understood as RDR2's design philosophy applied to a modern open-world crime sandbox.",
    date: "2026-05-08",
  },
  {
    slug: "map-realism-analysis",
    title: "Map Realism Analysis: How Close Is Leonida to Florida?",
    hook: "Rockstar's worlds are caricatures of real places. How much real Florida is in Leonida?",
    context:
      "Leonida draws from Florida geography — Miami, Keys, Everglades, panhandle. The mix is selective, not literal.",
    breakdown: [
      { heading: "Urban accuracy", body: "Vice City's Ocean Drive analog is near 1:1 in spatial layout, satirized in signage and culture." },
      { heading: "Ecological accuracy", body: "Swamp biomes include accurate vegetation and wildlife species." },
      { heading: "Cultural satire", body: "Influencer culture, Spring Break, and political memes are heavily referenced." },
    ],
    evidence: [{ label: "Florida tourism imagery", url: "https://www.visitflorida.com" }],
    interpretations: [
      { stance: "Documentary lens", body: "Rockstar uses real geography to critique American culture." },
      { stance: "Theme park lens", body: "Realism serves immersion, not commentary." },
    ],
    finalInsight: "Leonida is Florida-as-mirror: real enough to recognize, exaggerated enough to satirize.",
    date: "2026-05-05",
  },
  {
    slug: "rockstar-storytelling-style",
    title: "Rockstar's Storytelling Style: From CJ to Lucia",
    hook: "How has Rockstar's narrative voice evolved across two decades of protagonists?",
    context:
      "From GTA III's silent Claude to GTA V's tri-protagonist structure to GTA VI's Bonnie-and-Clyde duo, Rockstar's storytelling has progressively centered character relationships.",
    breakdown: [
      { heading: "Era 1: Archetypes (III, VC, SA)", body: "Protagonists embodied genre tropes — silent gangster, 80s climber, 90s LA dreamer." },
      { heading: "Era 2: Anti-heroes (IV, V)", body: "Niko, Michael, Trevor, Franklin each carried internal contradiction. Story focused on disillusionment." },
      { heading: "Era 3: Relational (RDR2, GTA VI)", body: "Arthur Morgan's bonds with Dutch's gang anchored RDR2. Jason-Lucia is the logical next step." },
    ],
    evidence: [{ label: "Rockstar interview history", url: "https://www.rockstargames.com/newswire" }],
    interpretations: [
      { stance: "Maturation", body: "Rockstar is moving toward prestige-TV narrative density." },
      { stance: "Brand evolution", body: "Audience demand drives the shift, not creative ambition." },
    ],
    finalInsight: "GTA VI's story will be Rockstar's most character-driven mainline GTA to date.",
    date: "2026-05-02",
  },
  {
    slug: "physics-system-predictions",
    title: "Physics System Predictions: What Euphoria 2.0 Could Bring",
    hook: "RDR2's physics still impress in 2026. What will GTA VI build on top?",
    context:
      "Rockstar's RAGE engine pairs with NaturalMotion's Euphoria for procedural character physics. GTA VI's physics layer is expected to be a substantial upgrade.",
    breakdown: [
      { heading: "Character physics", body: "Expect deformable surfaces, contact-aware ragdoll, and weather-responsive clothing." },
      { heading: "Vehicle physics", body: "Tire deformation, suspension travel, and damage modeling likely upgraded from GTA V's simplified model." },
      { heading: "Destruction", body: "Limited destructibility expected — fences, props, glass, but not full building destruction." },
    ],
    evidence: [{ label: "NaturalMotion Euphoria", url: "https://www.naturalmotion.com" }],
    interpretations: [
      { stance: "Simulation-forward", body: "Rockstar will lean further into systemic physics." },
      { stance: "Gameplay-first", body: "Physics serves spectacle; arcade feel will dominate." },
    ],
    finalInsight: "Euphoria 2.0 will be the most-noticed-least-talked-about feature at launch.",
    date: "2026-04-28",
  },
  {
    slug: "ai-behavior-improvements",
    title: "AI Behavior Improvements: Beyond Pedestrians Bumping Into Walls",
    hook: "GTA V's NPCs were notoriously dumb. What does GTA VI fix?",
    context:
      "NPC AI is the single biggest immersion-breaker in open-world games. GTA VI's trailer suggests substantial behavior upgrades.",
    breakdown: [
      { heading: "Pedestrian routines", body: "Trailer shows NPCs with full-day routines, group dynamics, and contextual reactions." },
      { heading: "Police AI", body: "Expected to use witnesses, identification, and persistent records rather than line-of-sight wanted-level toggles." },
      { heading: "Combat AI", body: "Likely uses cover, flanking, and squad coordination similar to RDR2's gang shootouts." },
    ],
    evidence: [{ label: "Trailer NPC analysis", url: "https://www.youtube.com" }],
    interpretations: [
      { stance: "Systemic", body: "Behavior trees rebuilt from scratch enable emergent stories." },
      { stance: "Selective", body: "Improvements are concentrated in mission contexts; ambient NPCs stay basic." },
    ],
    finalInsight: "AI will be GTA VI's most-improved system relative to GTA V.",
    date: "2026-04-25",
  },
  {
    slug: "release-timeline-theory",
    title: "Release Timeline Theory: Why November 19, 2026 Is the Date",
    hook: "Rockstar's date selection is never accidental. What does November 19 signal?",
    context:
      "Rockstar confirmed November 19, 2026 — a Thursday exactly one week before Black Friday, deep in Take-Two's FY27 holiday quarter. The date is loaded with strategic meaning.",
    breakdown: [
      { heading: "Fiscal alignment", body: "November 19 lands in Take-Two's FY27 holiday quarter, capturing launch revenue in the biggest retail window of the year." },
      { heading: "Hardware refresh", body: "PS5 Pro is established; XSX refresh rumored. Hardware base is at its peak." },
      { heading: "Competitive window", body: "One week before Black Friday — Rockstar owns the holiday season, and rivals have moved out of its way." },
    ],
    evidence: [{ label: "Take-Two fiscal calendar", url: "https://www.take2games.com/ir" }],
    interpretations: [
      { stance: "Locked in", body: "Rockstar holds the date." },
      { stance: "Buffer for slip", body: "A short slip into early 2027 would still land in FY27, but Take-Two insists the date holds." },
    ],
    finalInsight: "The November 19 date is firm — Take-Two has publicly ruled out further delays; any slip would be measured in weeks, not quarters.",
    date: "2026-04-20",
    related: [
      { type: "news", href: "/news/rockstar-confirms-gta-6-release-window", label: "Release Confirmed" },
      { type: "pillar", href: "/gta-6-release-date", label: "Release Date Hub" },
    ],
  },
  {
    slug: "multiplayer-expectations",
    title: "Multiplayer Expectations: GTA Online's Successor",
    hook: "GTA Online generated $8B+ over 12 years. How does Rockstar follow that?",
    context:
      "GTA Online launched in 2013 as a small online mode and grew into a billion-dollar live service. Its successor faces different market expectations.",
    breakdown: [
      { heading: "Launch scope", body: "Expect heists, properties, and businesses from day one — not the years-long rollout GTA Online needed." },
      { heading: "Monetization", body: "Shark Card analog will return, likely paired with a battle-pass-style season system." },
      { heading: "Cross-platform", body: "Cross-progression expected; cross-play likely with caveats." },
    ],
    evidence: [{ label: "GTA Online lifecycle", url: "https://www.rockstargames.com/newswire" }],
    interpretations: [
      { stance: "Conservative", body: "Rockstar will protect launch revenue with familiar monetization." },
      { stance: "Aggressive", body: "Live-service learnings from the industry will shape a more flexible model." },
    ],
    finalInsight: "Online launches at scope, monetizes familiarly, and pivots to seasons within 6 months.",
    date: "2026-04-15",
  },
  {
    slug: "engine-analysis",
    title: "Engine Analysis: What's New in RAGE 9",
    hook: "Rockstar's RAGE engine powers every modern title. What changed for GTA VI?",
    context:
      "RAGE has evolved across GTA IV, RDR, GTA V, and RDR2. GTA VI represents the largest single-version jump since GTA V.",
    breakdown: [
      { heading: "Renderer", body: "Likely fully deferred with hardware-accelerated RT for reflections on PS5/XSX." },
      { heading: "Streaming", body: "NVMe-first streaming architecture replaces GTA V's HDD-compatible approach." },
      { heading: "Tooling", body: "Internal tooling rebuilt to support density and content scale; explains development time." },
    ],
    evidence: [{ label: "Rockstar tech presentations", url: "https://www.rockstargames.com" }],
    interpretations: [
      { stance: "Generational", body: "RAGE 9 enables a decade of forward content." },
      { stance: "Iterative", body: "Major upgrades, but core architecture unchanged." },
    ],
    finalInsight: "RAGE 9 is the foundation for Rockstar's next decade of releases.",
    date: "2026-04-10",
  },
  {
    slug: "marketing-strategy-breakdown",
    title: "Marketing Strategy Breakdown: The Anti-Marketing Playbook",
    hook: "Rockstar barely markets. How does that work?",
    context:
      "Most AAA games rely on aggressive marketing. Rockstar uses scarcity, controlled reveals, and earned media to dominate cultural conversation.",
    breakdown: [
      { heading: "Scarcity", body: "Two trailers and a handful of screenshots will likely be the full pre-launch output." },
      { heading: "Earned media", body: "Every Rockstar Newswire post triggers global coverage at zero ad cost." },
      { heading: "Community amplification", body: "Frame-by-frame trailer analysis turns fans into a free marketing army." },
    ],
    evidence: [{ label: "Rockstar Newswire", url: "https://www.rockstargames.com/newswire" }],
    interpretations: [
      { stance: "Genius", body: "Restraint compounds anticipation." },
      { stance: "Risky", body: "Modern audiences expect more touchpoints; silence can backfire." },
    ],
    finalInsight: "Rockstar's anti-marketing strategy works because the product reliably delivers. It's not transferable.",
    date: "2026-04-05",
  },
];

export const analysisBySlug = (slug: string) => analyses.find((a) => a.slug === slug);
