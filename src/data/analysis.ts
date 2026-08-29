import type { EvidenceRow } from "@/lib/evidence";
import type { PageSection } from "@/data/pages";
import { publicEntry, publicOnly, type PendingRevision, type Publishable } from "@/lib/publishing";

export interface AnalysisArticle extends Publishable {
  slug: string;
  title: string;
  hook: string;
  /** Legacy fields. Superseded by `intro` + `sections` on long-form entries. */
  context?: string;
  breakdown?: { heading: string; body: string }[];
  evidence?: { label: string; url: string }[];
  /** Direct-answer paragraphs above the first heading. */
  intro?: string[];
  /** Long-form body. When present it replaces `context` and `breakdown`. */
  sections?: PageSection[];
  /** Optional: not every analysis argues competing readings. */
  interpretations?: { stance: string; body: string }[];
  /** Optional: omitted when the piece closes with a plain conclusion section. */
  finalInsight?: string;
  date: string;
  related?: { type: "wiki" | "news" | "pillar"; href: string; label: string }[];
  seoTitle?: string;
  metaDescription?: string;
  /** Per-article evidence status table. */
  evidenceStatus?: EvidenceRow[];
  /** Set only to consolidate this URL onto another page. */
  canonicalOverride?: string;
  /**
   * Sources and verification, first-party first. `url` is present only where the
   * canonical source was actually verified; `needsReview` marks the rest for an
   * editor rather than shipping a guessed link.
   */
  sources?: { label: string; url?: string; needsReview?: boolean }[];
  /** A staged edit to an entry that is already live. */
  pendingRevision?: PendingRevision<AnalysisArticle>;
}

export const analyses: AnalysisArticle[] = [
  {
    slug: "gta-6-standard-vs-ultimate",
    title: "GTA 6 Standard vs Ultimate Edition: Which One Should You Buy?",
    hook: "For most players, the choice comes down to a simple question: do you want only the full GTA 6 game, or do you also want Rockstar's premium collection of single-player vehicles, weapons, styles and customization content?",
    status: "scheduled",
    publishAt: "2026-09-03T13:00:00Z",
    date: "2026-09-03",
    lastVerified: "2026-08-29",
    seoTitle: "GTA 6 Standard vs Ultimate Edition: Which One Should You Buy?",
    metaDescription:
      "Compare GTA 6 Standard vs Ultimate Edition, including the $79.99 vs $99.99 price, bonuses, exclusive content and who each version is best for.",
    intro: ["The Standard Edition costs $79.99 in the US. The Ultimate Edition costs $99.99."],
    sections: [
      {
        heading: "Standard vs Ultimate",
        body: ["Subject to Rockstar's pre-order/early-purchase terms."],
        table: {
          head: ["Feature", "Standard", "Ultimate"],
          rows: [
            ["Full GTA 6 game", "Yes", "Yes"],
            ["US price", "$79.99", "$99.99"],
            ["Vintage Vice City Pack", "Yes", "Yes"],
            ["Free GTA+ month on qualifying digital pre-order", "Yes", "Yes"],
            ["Ultimate Edition Upgrade", "No", "Yes"],
            ["Premium vehicles/weapons/styles", "No", "Yes"],
            ["Additional customization locations", "No", "Yes"],
          ],
        },
      },
      {
        heading: "Choose Standard if you want the core game",
        body: [
          "Nothing in Rockstar's announcement suggests the Standard Edition is a shortened campaign. It is the base GTA 6 experience for PS5 or Xbox Series X|S.",
          "For buyers who do not care about exclusive cosmetics, vehicle variants or bonus businesses, the extra $20 has no automatic gameplay value.",
        ],
      },
      {
        heading: "Choose Ultimate if you like collecting and customization",
        body: [
          "Ultimate includes named benefits such as a '95 Grotti Cheetah, revolvers, personalized weapon variants, extra vehicle builds, apparel/style options and multiple customization-related locations.",
          "For players who spend a lot of time collecting cars and customizing characters, those benefits are more relevant than they are for someone focused mainly on story missions.",
        ],
      },
      {
        heading: "Do both get pre-order bonuses?",
        body: [
          "Under Rockstar's current offer, qualifying pre-orders and purchases before November 20 receive the Vintage Vice City Pack. Digital pre-orders also include a free month of GTA+.",
          "Those incentives are not a reason by themselves to buy Ultimate, because they are not exclusive to the more expensive edition.",
        ],
      },
      {
        heading: "Is there early access?",
        body: [
          "No official early-access period is listed.",
          "Digital pre-orders can pre-load on November 12, but GTA 6 launches November 19.",
        ],
      },
      {
        heading: "Can you upgrade later?",
        body: [
          "Rockstar and PlayStation list an Ultimate Edition Upgrade option. Check the storefront on your platform for final availability and pricing.",
          "If you are unsure, this makes Standard the safer starting point.",
        ],
      },
      {
        heading: "Our recommendation",
        body: [
          "Best for most players: Standard Edition.",
          "Best for collectors/customizers: Ultimate Edition.",
          "The $20 gap is modest, but paying more only makes sense if you actually care about the included content.",
          "See the full Ultimate Edition list and our pre-order guide before buying.",
        ],
      },
      {
        heading: "Decision matrix",
        body: [
          "Standard is the clean choice for players who only want the core single-player game and preorder bonuses. Ultimate is aimed at players who value named vehicles, weapon variants, apparel, customization locations and other premium items from the start.",
          "Because Rockstar offers a separate Ultimate Upgrade, buyers do not need to treat the decision as irreversible. That fact should be prominent in any “which should you buy?” answer.",
        ],
      },
      {
        heading: "Do the bonuses change the story?",
        body: [
          "Rockstar describes the Ultimate items as threaded across Jason and Lucia’s story, but it has not announced a separate Ultimate-only campaign or alternate ending. Avoid language implying that Standard buyers receive an incomplete narrative.",
          "The safest interpretation is that Ultimate adds premium items and activities/services around the same base game. If Rockstar later documents exclusive missions, the comparison table should be updated with the exact scope.",
        ],
      },
      {
        heading: "Value beyond raw item count",
        body: [
          "Counting bonuses alone can be misleading. A player who cares about cars and customization may value the Cheetah, safehouse vehicles and mod shops heavily, while a story-only player may not. A neutral comparison should therefore match benefits to player types instead of declaring a universal winner.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
          "For “GTA 6 Standard vs Ultimate,” this matters because pre-release GTA coverage changes quickly. A status-based page can stay useful after each reveal without rewriting older observations as if they had always been official.",
        ],
      },
      {
        heading: "What is still not confirmed",
        body: [
          "Pre-release coverage should leave room for unknowns. Rockstar has not published every mechanic, every character, every location, every item or every platform detail. When the evidence stops, the article should say “not announced” or “not yet confirmed” rather than convert a reasonable assumption into a fact.",
          "This restraint is not a lack of depth. It is part of the page’s information gain because it tells readers exactly where reliable knowledge ends.",
        ],
      },
    ],
    evidenceStatus: [
      {
        kind: "confirmed",
        usage: "Primary-source facts are stated directly and dated.",
      },
      {
        kind: "observed",
        usage:
          "Details visible in official footage are described as observations, not automatically named features.",
      },
      {
        kind: "reported",
        usage: "Third-party context is attributed and kept separate from Rockstar confirmation.",
      },
      {
        kind: "speculation",
        usage: "Open questions are identified instead of converted into facts.",
      },
    ],
    sources: [
      {
        label: "Rockstar Games - GTA VI Editions",
        needsReview: true,
      },
      {
        label: "Rockstar Support - GTA VI Platforms, Editions, and Versions",
        url: "https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions",
      },
      {
        label: "Take-Two - Rockstar Games Announces Pre-Orders for Grand Theft Auto VI",
        url: "https://www.take2games.com/ir/news/rockstar-games-announces-pre-orders-grand-theft-auto-vi",
      },
    ],
    related: [
      {
        type: "pillar",
        href: "/gta-6-ultimate-edition",
        label: "GTA 6 Ultimate Edition",
      },
      {
        type: "pillar",
        href: "/gta-6-price",
        label: "GTA 6 Price",
      },
      {
        type: "pillar",
        href: "/gta-6-release-date",
        label: "GTA 6 Release Date",
      },
    ],
  },
  {
    slug: "trailer-2-breakdown",
    title: "GTA 6 Trailer 2 Breakdown: Jason, Lucia and Leonida Explained",
    hook: "Trailer 2 changed GTA 6 from a mysterious cultural event into a more understandable story.",
    status: "draft",
    date: "2026-09-25",
    lastVerified: "2026-08-29",
    seoTitle: "GTA 6 Trailer 2 Breakdown: Jason, Lucia and Leonida Explained",
    metaDescription:
      "GTA 6 Trailer 2 gave us Jason, Lucia and a much broader Leonida. Here are the story, character, location and gameplay details that matter.",
    intro: [
      "Released May 6, 2025, it gave Jason Duval a real identity, expanded Lucia's role and showed how their relationship sits inside a wider Leonida criminal network.",
    ],
    sections: [
      {
        heading: "Jason becomes a real protagonist",
        body: [
          "Trailer 1 belonged largely to Lucia and the world.",
          "Trailer 2 gives Jason equal narrative weight. Later Rockstar character pages explain his background around criminals, his Army service and his work for drug runners in the Keys.",
          "That context makes the footage easier to read: Jason is not being introduced to crime for the first time.",
        ],
      },
      {
        heading: "The relationship drives the plot",
        body: [
          "Rockstar's official premise says an easy score goes wrong and puts Jason and Lucia inside a criminal conspiracy stretching across Leonida.",
          "Trailer 2 reinforces the pair as partners rather than two separate GTA V-style storylines that occasionally overlap.",
        ],
      },
      {
        heading: "Leonida expands",
        body: [
          "The release around Trailer 2 was as important as the video itself.",
          "Rockstar published detailed location material for Vice City, the Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga National Park.",
          "That gave map analysis a first-party foundation.",
        ],
      },
      {
        heading: "The supporting cast arrives",
        body: [
          "Characters such as Cal Hampton, Boobie Ike, Dre'Quan Priest, Real Dimez, Raul Bautista and Brian Heder received official profiles.",
          "Their backgrounds show GTA 6 moving between drugs, music, nightlife, robberies and local business networks.",
        ],
      },
      {
        heading: "Vehicles and weapons",
        body: [
          "Trailer 2 added dozens of new visual references for vehicle and weapon databases.",
          "The safest methodology is to record the evidence source first and model identification second.",
        ],
      },
      {
        heading: "What Trailer 2 still left unclear",
        body: [
          "We still did not have a true long-form gameplay demonstration, detailed police-system explanation or full activity list.",
          "Those gaps are why the August 2026 Extended Look became so important.",
        ],
      },
      {
        heading: "Trailer 2's lasting role",
        body: [
          "Trailer 2 is the bridge between world introduction and gameplay demonstration. It explains who GTA 6 is about and where those people fit inside Leonida.",
          "Continue to GTA 6 Extended Look for the next stage.",
        ],
      },
      {
        heading: "Trailer 2 as the bridge to the character reveal",
        body: [
          "Trailer 2 gave Jason and Lucia far more narrative context and was followed by Rockstar’s extensive People & Places material. A modern breakdown should therefore cross-reference the trailer with the official profiles rather than speculating about every face in isolation.",
          "This improves both accuracy and internal linking.",
        ],
      },
      {
        heading: "What Trailer 2 added",
        body: [
          "The second trailer expanded the relationship, criminal activity, neighborhoods and supporting cast visible around the protagonists. PC Gamer’s detail breakdown also highlighted small visual clues and possible systems, but those interpretations should remain separate from official character/location facts.",
          "Use “seen,” “later named,” and “still uncertain” labels for major moments.",
        ],
      },
      {
        heading: "How the Extended Look changes Trailer 2 interpretation",
        body: [
          "The August 2026 presentation confirms that many of Trailer 2’s cinematic-looking situations sit inside a broader game with extensive in-game footage. Where the Extended Look shows related mechanics directly, update the Trailer 2 article with a “now confirmed by later footage” note.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
          "For “GTA 6 Trailer 2,” this matters because pre-release GTA coverage changes quickly. A status-based page can stay useful after each reveal without rewriting older observations as if they had always been official.",
        ],
      },
      {
        heading: "What is still not confirmed",
        body: [
          "Pre-release coverage should leave room for unknowns. Rockstar has not published every mechanic, every character, every location, every item or every platform detail. When the evidence stops, the article should say “not announced” or “not yet confirmed” rather than convert a reasonable assumption into a fact.",
          "This restraint is not a lack of depth. It is part of the page’s information gain because it tells readers exactly where reliable knowledge ends.",
        ],
      },
    ],
    evidenceStatus: [
      {
        kind: "confirmed",
        usage: "Primary-source facts are stated directly and dated.",
      },
      {
        kind: "observed",
        usage:
          "Details visible in official footage are described as observations, not automatically named features.",
      },
      {
        kind: "reported",
        usage: "Third-party context is attributed and kept separate from Rockstar confirmation.",
      },
      {
        kind: "speculation",
        usage: "Open questions are identified instead of converted into facts.",
      },
    ],
    sources: [
      {
        label: "Rockstar Games - GTA VI Videos",
        needsReview: true,
      },
      {
        label: "PC Gamer - GTA 6 Trailer 2 Details",
        needsReview: true,
      },
      {
        label: "GTA 6 Database / Tracker - Trailers and Previews",
        url: "https://tracker.gg/gta6/previews/",
      },
      {
        label: "Rockstar Games - Only in Leonida: People & Places",
        url: "https://www.rockstargames.com/VI/only-in-leonida",
      },
    ],
    related: [
      {
        type: "pillar",
        href: "/gta-6-characters",
        label: "GTA 6 Characters",
      },
      {
        type: "pillar",
        href: "/gta-6-map",
        label: "GTA 6 Map",
      },
      {
        type: "pillar",
        href: "/gta-6-gameplay",
        label: "GTA 6 Gameplay",
      },
      {
        type: "pillar",
        href: "/gta-6-trailers",
        label: "GTA 6 Trailers",
      },
    ],
  },
  {
    slug: "gta-6-map-vs-gta-5",
    title: "GTA 6 Map vs GTA 5: How Leonida Compares With Los Santos and Blaine County",
    hook: "GTA 6's map is not simply “GTA V but bigger.”",
    status: "scheduled",
    publishAt: "2026-09-26T13:00:00Z",
    date: "2026-09-26",
    lastVerified: "2026-08-29",
    seoTitle: "GTA 6 Map vs GTA 5: How Leonida Compares With Los Santos and Blaine County",
    metaDescription:
      "Compare GTA 6’s Leonida map with GTA 5’s Los Santos and Blaine County using official regions, world design and clearly labeled size evidence.",
    intro: [
      "The more meaningful difference is structure. GTA V centers on Los Santos and Blaine County inside a single island version of Southern San Andreas. GTA 6 is explicitly framed around the state of Leonida, with multiple named regions built around very different types of travel and activity.",
    ],
    sections: [
      {
        heading: "GTA 6 vs GTA 5 world structure",
        table: {
          head: ["GTA V", "GTA 6"],
          rows: [
            ["Los Santos", "Vice City"],
            ["Blaine County", "Multiple Leonida regions"],
            [
              "Desert/mountain countryside",
              "Wetlands, Keys, national park, coastal and industrial regions",
            ],
            ["2013 simulation target", "2026 current-generation target"],
            ["Three protagonists", "Two protagonists: Jason and Lucia"],
          ],
        },
      },
      {
        heading: "Urban density",
        body: [
          "Los Santos was extraordinary in 2013, but much of its city environment was built for PS3/Xbox 360-era constraints.",
          "GTA 6's official footage shows denser crowds, richer interiors, more complex lighting and a much more socially active Vice City.",
          "That generational difference may matter more to day-to-day play than raw square mileage.",
        ],
      },
      {
        heading: "Region variety",
        body: [
          "Rockstar has officially named six major GTA 6 areas: Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga National Park.",
          "The variety suggests more deliberate regional identities than a simple urban-versus-desert split.",
        ],
      },
      {
        heading: "Is GTA 6's map twice as big?",
        body: [
          "Do not state “2x GTA V” as an official Rockstar fact.",
          "Community mapping projects and leak-based reconstructions have produced estimates, and recent reporting has described a very large world. But Rockstar has not published a final square-mile comparison with GTA V.",
          "Our map hub labels numerical estimates separately from official geography.",
        ],
      },
      {
        heading: "Water matters more",
        body: [
          "GTA V had a huge coastline, but much of the surrounding ocean functioned as a boundary.",
          "Leonida's Keys, wetlands, marinas, airboats and diving footage suggest water routes may be woven more deeply into normal travel and activities.",
        ],
      },
      {
        heading: "GTA 6 has a different density goal",
        body: [
          "The Extended Look's strongest contrast with GTA V is not distance. It is how many things appear to happen within that distance.",
          "More visible interiors, richer pedestrian behavior, activity spaces and environmental interactions can make a map feel larger because players have more reasons to stop.",
        ],
      },
      {
        heading: "Bottom line",
        body: [
          "GTA 6 is clearly a generational expansion over GTA V, but “bigger” should not be reduced to an unofficial square-mile multiplier.",
          "The best comparison is scale + density + regional variety + simulation.",
          "See the GTA 6 map hub for continuously updated geography.",
        ],
      },
      {
        heading: "The comparison problem",
        body: [
          "GTA VI map-size claims are currently a mixture of official marketing language, preview reporting, leaked-map discussion and community reconstruction. GTA V has a known released world that can be measured, while GTA VI does not yet have an official final map image or square-mile figure.",
          "A credible comparison starts by stating that asymmetry instead of placing two precise numbers side by side.",
        ],
      },
      {
        heading: "What can be compared safely",
        body: [
          "We can compare world composition: GTA V centers Los Santos and Blaine County, while GTA VI officially spans Vice City plus at least five additional named Leonida regions. We can compare environmental variety and the number of headline regions. We can also discuss reported size claims as reported, not confirmed.",
          "This is more defensible than promising “2x” or “3x” without a shared measurement method.",
        ],
      },
      {
        heading: "How to handle reported size multipliers",
        body: [
          "If an outlet reports that invited creators or Rockstar representatives described the world as a certain multiple of another Rockstar game, cite the outlet and label it “reported.” Do not move the number into the confirmed table until Rockstar publishes it directly.",
          "Community map dimensions belong in a separate section with methodology and date because reconstructions change as new evidence appears.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
          "For “GTA 6 map vs GTA 5,” this matters because pre-release GTA coverage changes quickly. A status-based page can stay useful after each reveal without rewriting older observations as if they had always been official.",
        ],
      },
      {
        heading: "What is still not confirmed",
        body: [
          "Pre-release coverage should leave room for unknowns. Rockstar has not published every mechanic, every character, every location, every item or every platform detail. When the evidence stops, the article should say “not announced” or “not yet confirmed” rather than convert a reasonable assumption into a fact.",
          "This restraint is not a lack of depth. It is part of the page’s information gain because it tells readers exactly where reliable knowledge ends.",
        ],
      },
    ],
    evidenceStatus: [
      {
        kind: "confirmed",
        usage: "Primary-source facts are stated directly and dated.",
      },
      {
        kind: "observed",
        usage:
          "Details visible in official footage are described as observations, not automatically named features.",
      },
      {
        kind: "reported",
        usage: "Third-party context is attributed and kept separate from Rockstar confirmation.",
      },
      {
        kind: "speculation",
        usage: "Open questions are identified instead of converted into facts.",
      },
    ],
    sources: [
      {
        label: "Rockstar Games - Only in Leonida: People & Places",
        url: "https://www.rockstargames.com/VI/only-in-leonida",
      },
      {
        label: "PC Gamer - GTA 6 Map",
        url: "https://www.pcgamer.com/games/grand-theft-auto/gta6-map/",
      },
      {
        label: "GTABase - GTA 6 Map",
        url: "https://www.gtabase.com/gta-6/map/",
      },
      {
        label: "PC Gamer - GTA 6: What We Know",
        url: "https://www.pcgamer.com/grand-theft-auto/gta-6-guide/",
      },
    ],
    related: [
      {
        type: "pillar",
        href: "/gta-6-map",
        label: "GTA 6 Map",
      },
      {
        type: "pillar",
        href: "/gta-6-locations",
        label: "GTA 6 Locations",
      },
      {
        type: "pillar",
        href: "/gta-6-leonida",
        label: "Leonida",
      },
    ],
  },
  {
    slug: "trailer-1-breakdown",
    pendingRevision: {
      publishAt: "2026-09-24T13:00:00Z",
      lastVerified: "2026-08-29",
      note: "Day 27 of the 30-day plan: upgraded Trailer 1 breakdown.",
      changes: {
        title: "GTA 6 Trailer 1 Breakdown: Every Major Detail That Still Matters",
        seoTitle: "GTA 6 Trailer 1 Breakdown: Every Major Detail That Still Matters",
        metaDescription:
          "Revisit GTA 6 Trailer 1 with what we know now. See the Vice City, Lucia, Leonida, social-media and wildlife details later confirmed by Rockstar.",
        hook: "GTA 6 Trailer 1 arrived in December 2023 and did something more valuable than reveal a release window: it established the identity of Rockstar's new world.",
        intro: [
          "With Trailer 2, official character pages and the 2026 Extended Look now available, we can revisit the first trailer and separate what turned out to matter from what fans over-interpreted.",
        ],
        sections: [
          {
            heading: "Lucia's prison opening",
            body: [
              "The trailer opens with Lucia in a correctional setting.",
              "Rockstar later confirmed the location as the Leonida Penitentiary and explained that fighting for her family landed her there.",
              "What looked like a simple cinematic hook was actually the starting point of her biography.",
            ],
          },
          {
            heading: "Modern Vice City",
            body: [
              "Neon signs and beaches return, but Trailer 1 avoids pure nostalgia.",
              "Phones, livestream-style vertical clips, public stunts and viral behavior make the satire unmistakably contemporary.",
              "That remains one of the game's central themes in later footage.",
            ],
          },
          {
            heading: "Leonida is bigger than Vice City",
            body: [
              "Trailer 1 included highways, wetlands and wildlife beyond the urban core. Rockstar later formally named regions across Leonida, confirming that the game is state-scale in concept.",
            ],
          },
          {
            heading: "Social media is part of the satire",
            body: [
              "One of the trailer's signature editing devices is a stream of posts and clips resembling short-form social platforms.",
              "The point is cultural rather than merely technological: Rockstar is using the way people perform online as part of its version of modern Florida.",
            ],
          },
          {
            heading: "Wildlife",
            body: [
              "Alligators, birds and other animals appear prominently.",
              "Later Leonida location material makes the wetlands and wildlife feel like an intentional part of the environment rather than a visual joke.",
            ],
          },
          {
            heading: "Cars, boats and city density",
            body: [
              "The trailer is packed with traffic, supercars, motorcycles, boats and aircraft.",
              "Years later, it remains a useful source for the GTA 6 vehicle database, but specific model identifications should still carry evidence labels.",
            ],
          },
          {
            heading: "What Trailer 1 did not prove",
            body: [
              "It did not prove:",
              "exact map size;",
              "a PC release;",
              "complete social-media mechanics;",
              "every building being enterable;",
              "a fixed weapon inventory system;",
              "a specific GTA Online structure.",
              "Those claims often grew around the trailer rather than from it.",
            ],
          },
          {
            heading: "Why Trailer 1 still matters",
            body: [
              "Later reveals add detail, but Trailer 1 remains the clearest statement of GTA 6's tone: a hyper-visible, performative, chaotic Leonida where people are constantly watching and recording one another.",
            ],
          },
          {
            heading: "Re-reading Trailer 1 with 2026 knowledge",
            body: [
              "Trailer 1 arrived in December 2023, when many identities and locations were still unnamed. By 2026, Rockstar has published character profiles, six major regions, a large screenshot library and a long gameplay presentation. That means a fresh Trailer 1 article can separate what the trailer truly established from what viewers guessed at the time.",
              "This retrospective approach is more useful than another 2023-era easter-egg list.",
            ],
          },
          {
            heading: "What Trailer 1 definitely established",
            body: [
              "It established Leonida/Vice City as the setting, Lucia as a central protagonist, a modern social-media-heavy culture and a crime-partnership framing. It also showed beaches, nightlife, vehicles, wildlife and dense public spaces.",
              "Later sources should be cited when naming characters or locations that were visually present but not named in Trailer 1 itself.",
            ],
          },
          {
            heading: "What later material corrected or clarified",
            body: [
              "Jason’s biography, Lucia’s fuller backstory, the six headline regions and named supporting cast all came later. The article should mark these as “later confirmed” instead of rewriting history and implying Trailer 1 said more than it did.",
            ],
          },
          {
            heading: "How to read the evidence labels",
            body: [
              "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
              "For “GTA 6 Trailer 1,” this matters because pre-release GTA coverage changes quickly. A status-based page can stay useful after each reveal without rewriting older observations as if they had always been official.",
            ],
          },
          {
            heading: "What is still not confirmed",
            body: [
              "Pre-release coverage should leave room for unknowns. Rockstar has not published every mechanic, every character, every location, every item or every platform detail. When the evidence stops, the article should say “not announced” or “not yet confirmed” rather than convert a reasonable assumption into a fact.",
              "This restraint is not a lack of depth. It is part of the page’s information gain because it tells readers exactly where reliable knowledge ends.",
            ],
          },
        ],
        evidenceStatus: [
          {
            kind: "confirmed",
            usage: "Primary-source facts are stated directly and dated.",
          },
          {
            kind: "observed",
            usage:
              "Details visible in official footage are described as observations, not automatically named features.",
          },
          {
            kind: "reported",
            usage:
              "Third-party context is attributed and kept separate from Rockstar confirmation.",
          },
          {
            kind: "speculation",
            usage: "Open questions are identified instead of converted into facts.",
          },
        ],
        sources: [
          {
            label: "Rockstar Games - GTA VI Trailer 1",
            url: "https://www.rockstargames.com/videos/rkoCtr1r",
          },
          {
            label: "GTA 6 Database / Tracker - Trailers and Previews",
            url: "https://tracker.gg/gta6/previews/",
          },
          {
            label: "PC Gamer - GTA 6: What We Know",
            url: "https://www.pcgamer.com/grand-theft-auto/gta-6-guide/",
          },
        ],
      },
    },
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
    pendingRevision: {
      publishAt: "2026-09-26T13:00:00Z",
      lastVerified: "2026-08-29",
      note: "Repositioned away from map scope when the dedicated map comparison publishes on Day 29.",
      changes: {
        title: "GTA 6 vs GTA 5: Simulation, Systems and the Generational Gap",
        seoTitle: "GTA 6 vs GTA 5: Simulation, Systems and the Generational Gap",
        hook: "Setting the map aside, how does a game shipping 13 years after its predecessor justify the wait?",
      },
    },
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
      {
        stance: "Iterative",
        body: "Core driving/shooting loop will feel familiar; the 'leap' is mostly fidelity.",
      },
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
      {
        heading: "Urban accuracy",
        body: "Vice City's Ocean Drive analog is near 1:1 in spatial layout, satirized in signage and culture.",
      },
      {
        heading: "Ecological accuracy",
        body: "Swamp biomes include accurate vegetation and wildlife species.",
      },
      {
        heading: "Cultural satire",
        body: "Influencer culture, Spring Break, and political memes are heavily referenced.",
      },
    ],
    evidence: [{ label: "Florida tourism imagery", url: "https://www.visitflorida.com" }],
    interpretations: [
      {
        stance: "Documentary lens",
        body: "Rockstar uses real geography to critique American culture.",
      },
      { stance: "Theme park lens", body: "Realism serves immersion, not commentary." },
    ],
    finalInsight:
      "Leonida is Florida-as-mirror: real enough to recognize, exaggerated enough to satirize.",
    date: "2026-05-05",
  },
  {
    slug: "rockstar-storytelling-style",
    title: "Rockstar's Storytelling Style: From CJ to Lucia",
    hook: "How has Rockstar's narrative voice evolved across two decades of protagonists?",
    context:
      "From GTA III's silent Claude to GTA V's tri-protagonist structure to GTA VI's Bonnie-and-Clyde duo, Rockstar's storytelling has progressively centered character relationships.",
    breakdown: [
      {
        heading: "Era 1: Archetypes (III, VC, SA)",
        body: "Protagonists embodied genre tropes — silent gangster, 80s climber, 90s LA dreamer.",
      },
      {
        heading: "Era 2: Anti-heroes (IV, V)",
        body: "Niko, Michael, Trevor, Franklin each carried internal contradiction. Story focused on disillusionment.",
      },
      {
        heading: "Era 3: Relational (RDR2, GTA VI)",
        body: "Arthur Morgan's bonds with Dutch's gang anchored RDR2. Jason-Lucia is the logical next step.",
      },
    ],
    evidence: [
      { label: "Rockstar interview history", url: "https://www.rockstargames.com/newswire" },
    ],
    interpretations: [
      { stance: "Maturation", body: "Rockstar is moving toward prestige-TV narrative density." },
      {
        stance: "Brand evolution",
        body: "Audience demand drives the shift, not creative ambition.",
      },
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
      {
        heading: "Character physics",
        body: "Expect deformable surfaces, contact-aware ragdoll, and weather-responsive clothing.",
      },
      {
        heading: "Vehicle physics",
        body: "Tire deformation, suspension travel, and damage modeling likely upgraded from GTA V's simplified model.",
      },
      {
        heading: "Destruction",
        body: "Limited destructibility expected — fences, props, glass, but not full building destruction.",
      },
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
      {
        heading: "Pedestrian routines",
        body: "Trailer shows NPCs with full-day routines, group dynamics, and contextual reactions.",
      },
      {
        heading: "Police AI",
        body: "Expected to use witnesses, identification, and persistent records rather than line-of-sight wanted-level toggles.",
      },
      {
        heading: "Combat AI",
        body: "Likely uses cover, flanking, and squad coordination similar to RDR2's gang shootouts.",
      },
    ],
    evidence: [{ label: "Trailer NPC analysis", url: "https://www.youtube.com" }],
    interpretations: [
      { stance: "Systemic", body: "Behavior trees rebuilt from scratch enable emergent stories." },
      {
        stance: "Selective",
        body: "Improvements are concentrated in mission contexts; ambient NPCs stay basic.",
      },
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
      {
        heading: "Fiscal alignment",
        body: "November 19 lands in Take-Two's FY27 holiday quarter, capturing launch revenue in the biggest retail window of the year.",
      },
      {
        heading: "Hardware refresh",
        body: "PS5 Pro is established; XSX refresh rumored. Hardware base is at its peak.",
      },
      {
        heading: "Competitive window",
        body: "One week before Black Friday — Rockstar owns the holiday season, and rivals have moved out of its way.",
      },
    ],
    evidence: [{ label: "Take-Two fiscal calendar", url: "https://www.take2games.com/ir" }],
    interpretations: [
      { stance: "Locked in", body: "Rockstar holds the date." },
      {
        stance: "Buffer for slip",
        body: "A short slip into early 2027 would still land in FY27, but Take-Two insists the date holds.",
      },
    ],
    finalInsight:
      "The November 19 date is firm — Take-Two has publicly ruled out further delays; any slip would be measured in weeks, not quarters.",
    date: "2026-04-20",
    related: [
      {
        type: "news",
        href: "/news/rockstar-confirms-gta-6-release-window",
        label: "Release Confirmed",
      },
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
      {
        heading: "Launch scope",
        body: "Expect heists, properties, and businesses from day one — not the years-long rollout GTA Online needed.",
      },
      {
        heading: "Monetization",
        body: "Shark Card analog will return, likely paired with a battle-pass-style season system.",
      },
      {
        heading: "Cross-platform",
        body: "Cross-progression expected; cross-play likely with caveats.",
      },
    ],
    evidence: [{ label: "GTA Online lifecycle", url: "https://www.rockstargames.com/newswire" }],
    interpretations: [
      {
        stance: "Conservative",
        body: "Rockstar will protect launch revenue with familiar monetization.",
      },
      {
        stance: "Aggressive",
        body: "Live-service learnings from the industry will shape a more flexible model.",
      },
    ],
    finalInsight:
      "Online launches at scope, monetizes familiarly, and pivots to seasons within 6 months.",
    date: "2026-04-15",
  },
  {
    slug: "engine-analysis",
    title: "Engine Analysis: What's New in RAGE 9",
    hook: "Rockstar's RAGE engine powers every modern title. What changed for GTA VI?",
    context:
      "RAGE has evolved across GTA IV, RDR, GTA V, and RDR2. GTA VI represents the largest single-version jump since GTA V.",
    breakdown: [
      {
        heading: "Renderer",
        body: "Likely fully deferred with hardware-accelerated RT for reflections on PS5/XSX.",
      },
      {
        heading: "Streaming",
        body: "NVMe-first streaming architecture replaces GTA V's HDD-compatible approach.",
      },
      {
        heading: "Tooling",
        body: "Internal tooling rebuilt to support density and content scale; explains development time.",
      },
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
      {
        heading: "Scarcity",
        body: "Two trailers and a handful of screenshots will likely be the full pre-launch output.",
      },
      {
        heading: "Earned media",
        body: "Every Rockstar Newswire post triggers global coverage at zero ad cost.",
      },
      {
        heading: "Community amplification",
        body: "Frame-by-frame trailer analysis turns fans into a free marketing army.",
      },
    ],
    evidence: [{ label: "Rockstar Newswire", url: "https://www.rockstargames.com/newswire" }],
    interpretations: [
      { stance: "Genius", body: "Restraint compounds anticipation." },
      { stance: "Risky", body: "Modern audiences expect more touchpoints; silence can backfire." },
    ],
    finalInsight:
      "Rockstar's anti-marketing strategy works because the product reliably delivers. It's not transferable.",
    date: "2026-04-05",
  },
];

/** Gated accessors — drafts and future-scheduled analysis never render. */
export const publicAnalyses = (now?: Date) => publicOnly(analyses, now);

export const analysisBySlug = (slug: string, now?: Date) =>
  publicEntry(
    analyses.find((a) => a.slug === slug),
    now,
  );

/** Unfiltered. Editorial tooling only. */
export const allAnalyses = analyses;
