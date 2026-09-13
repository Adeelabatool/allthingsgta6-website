import type { EvidenceRow } from "@/lib/evidence";
import type { ArticleImage, PageSection } from "@/data/pages";
import { publicEntry, publicOnly, type PendingRevision, type Publishable } from "@/lib/publishing";

export type NewsCategory =
  "rockstar-updates" | "leaks" | "trailer-news" | "release-updates" | "community-reactions";

export interface NewsItem extends Publishable {
  slug: string;
  title: string;
  summary: string;
  category: NewsCategory;
  date: string;
  /** Legacy single-source field. Superseded by `sources` on long-form entries. */
  source?: { label: string; url: string };
  /** Legacy three-part body. Superseded by `sections` on long-form entries. */
  whatHappened?: string;
  analysis?: string;
  meansForGta6?: string;
  /** Direct-answer paragraphs above the first heading. */
  intro?: string[];
  related?: { type: "wiki" | "analysis" | "pillar"; href: string; label: string }[];
  /** Overrides the <title> tag when the SEO title differs from the H1. */
  seoTitle?: string;
  /** Overrides the meta description when it differs from the summary. */
  metaDescription?: string;
  /** Long-form body for articles that outgrow the three-part news structure. */
  sections?: PageSection[];
  /**
   * Lead image. Also becomes the og:image and the structured-data image, so a
   * story with real photography shares as itself rather than the site card.
   */
  heroImage?: ArticleImage;
  /** Per-article evidence status table. */
  evidence?: EvidenceRow[];
  /**
   * Sources and verification, first-party first. `url` is present only where the
   * canonical source was actually verified; `needsReview` marks the rest for an
   * editor rather than shipping a guessed link.
   */
  sources?: { label: string; url?: string; needsReview?: boolean }[];
  /**
   * Set only to consolidate this URL onto another page. Absent means the
   * article canonicalises to itself, which is the default for everything.
   */
  canonicalOverride?: string;
  /**
   * Schema type. News reporting is NewsArticle; anything evergreen that happens
   * to live in the news namespace is Article.
   */
  schemaType?: "NewsArticle" | "Article";
  /** A staged edit to an entry that is already live. */
  pendingRevision?: PendingRevision<NewsItem>;
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
    slug: "gta-6-limited-edition-dualsense-controller",
    title:
      "GTA 6 Limited Edition DualSense Controllers: Price, Preorders, Release Date and Everything Confirmed",
    summary:
      "Sony has revealed two Grand Theft Auto VI Limited Edition DualSense controllers for PS5. Here is the confirmed pricing, preorder timing, regional availability and what Sony has said about haptics in GTA 6.",
    category: "release-updates",
    date: "2026-09-10",
    lastVerified: "2026-09-10",
    seoTitle: "GTA 6 DualSense Controllers: Price, Preorder Date and Release Details",
    metaDescription:
      "Sony's GTA 6 Limited Edition DualSense controllers cost $84.99 / EUR 84.99 / GBP 74.99. Preorders open September 10 and both launch November 19, 2026 alongside GTA 6.",
    schemaType: "NewsArticle",
    heroImage: {
      url: "https://blog.playstation.com/uploads/2026/09/d839f6d8bdb082ff7b1abe44ca635ee2648003fd.jpg",
      alt: "GTA VI Black Limited Edition DualSense wireless controller",
      credit: "Image: Sony Interactive Entertainment / PlayStation Blog",
    },
    intro: [
      "Sony has officially revealed two Grand Theft Auto VI Limited Edition DualSense wireless controllers for PS5, with both designs launching alongside GTA 6 on November 19, 2026. The GTA VI Black Limited Edition and GTA VI White Limited Edition cost $84.99 in the US, EUR 84.99 in Europe, GBP 74.99 in the UK and 12,480 yen in Japan, with preorders beginning September 10.",
      "This is not simply GTA VI artwork printed over a standard colorway. Sony says both controllers use a shimmering, colour-shifting finish inspired by Vice City's sunsets and neon nightlife, molded palm-tree details and official Grand Theft Auto VI branding.",
      "There is also a more important detail for players rather than collectors: Sony has confirmed that GTA 6 will use the DualSense controller's haptic feedback and adaptive triggers on PS5.",
    ],
    sections: [
      {
        heading: "GTA 6 DualSense controllers: key details",
        table: {
          head: ["Detail", "Confirmed information"],
          rows: [
            ["Controllers", "GTA VI Black Limited Edition and GTA VI White Limited Edition"],
            ["Platform", "PlayStation 5 DualSense wireless controller"],
            ["Preorders", "September 10, 2026"],
            ["US preorder time via PlayStation Direct", "7:00 a.m. PT / 10:00 a.m. ET"],
            ["Selected European PlayStation Direct markets", "10:00 a.m. local time"],
            ["Release", "Starting November 19, 2026"],
            ["US price", "$84.99"],
            ["European price", "EUR 84.99"],
            ["UK price", "GBP 74.99"],
            ["Japan price", "12,480 yen including tax"],
            [
              "White Edition availability",
              "PlayStation Direct and participating retailers globally",
            ],
            [
              "Black Edition availability",
              "PlayStation Direct exclusive where available; select retailers in other regions",
            ],
            ["GTA VI PS5 features", "Haptic feedback and adaptive triggers confirmed"],
            ["GTA VI release", "November 19, 2026"],
            ["GTA VI launch platforms", "PS5 and Xbox Series X and Series S"],
          ],
        },
      },
      {
        heading: "What Sony actually announced",
        body: [
          "Sony Interactive Entertainment revealed the two controllers during its September 3 State of Play presentation. Their full official names are the DualSense Wireless Controller - Grand Theft Auto VI Black Limited Edition and the DualSense Wireless Controller - Grand Theft Auto VI White Limited Edition.",
          "Both are built around the visual identity of Vice City, the returning GTA setting at the centre of Rockstar's fictional state of Leonida. Sony describes the designs as representing different sides of the city: the White Edition draws from Vice City's bright coastal atmosphere and daytime aesthetic, while the Black Edition takes its inspiration from the city's nightlife.",
          "That distinction is reflected in the two base colours, but they share several GTA VI-specific design elements. Both feature a shimmering finish that shifts visually with the light, palm-tree details molded into the controller itself, and official GTA VI branding. That makes these substantially more specific to the game's setting than a controller that simply places the GTA VI logo on an otherwise standard DualSense shell.",
          "More importantly, Sony's announcement contains the first-party confirmation players should pay attention to: GTA VI itself will take advantage of two of the DualSense's defining PS5 technologies.",
        ],
      },
      {
        heading: "GTA 6 White Limited Edition DualSense",
        body: [
          "The White Limited Edition is the brighter of the two designs and is intended to reflect Vice City during the day. Sony describes its inspiration in terms of the city's white sand, pastel-coloured skies and relaxed coastal atmosphere.",
          "The design combines a predominantly light appearance with GTA VI branding and the palm-tree imagery closely associated with Vice City. It also carries the shimmering, colour-changing treatment shared by both versions. Rather than simply printing the palm-tree graphics onto the controller, Sony says the palm details are molded directly into it, which gives the design a tactile element in addition to the visual one.",
          "The White Edition also has the broader officially confirmed retail distribution of the two. Sony says it will be available in limited quantities globally through PlayStation Direct and participating retailers.",
          "That does not mean every retailer in every country will stock it. Sony has not published one universal retailer list in its announcement, and availability can differ by region. Buyers should rely on PlayStation's regional storefront or confirmed participating retailers rather than assuming a particular store will carry it.",
        ],
        image: {
          url: "https://blog.playstation.com/uploads/2026/09/8a2e0b5c957338fb0f63660e15390af3d52fadd0.jpg",
          alt: "GTA VI White Limited Edition DualSense wireless controller",
          credit: "Image: Sony Interactive Entertainment / PlayStation Blog",
        },
      },
      {
        heading: "GTA 6 Black Limited Edition DualSense",
        body: [
          "The Black Limited Edition represents the other side of Vice City. Where the White Edition takes inspiration from the coast and daylight, Sony says the Black Edition is based around the energy of Vice City's nightlife.",
          "It shares the GTA VI branding, molded palm-tree treatment and shimmering finish with the White model but places those details against a much darker base.",
          "The important practical difference is distribution. In countries where PlayStation Direct operates, Sony says the Black Limited Edition will be exclusive to PlayStation Direct. In regions where Direct is not available, Sony says the controller will instead be offered through select retailers.",
          "That distinction matters if you are deciding between the two designs. The White Edition has participating-retailer availability in addition to Direct, while the Black Edition may require buying directly from PlayStation in supported Direct markets. Sony describes both as being available in limited quantities, but it has not disclosed the number of controllers being manufactured.",
        ],
      },
      {
        heading: "How much do the GTA 6 controllers cost?",
        body: [
          "Both versions have the same recommended retail price. In the United States, each costs $84.99. The confirmed prices in other major markets are EUR 84.99 in Europe, GBP 74.99 in the United Kingdom, and 12,480 yen including tax in Japan.",
          "These are Sony's official recommended prices. Regional taxes, retailer policies and availability can affect what an individual customer ultimately sees, so it would be misleading to convert the US price into dozens of currencies and present those conversions as official local pricing.",
          "There is also no announced price premium between the White and Black designs. At the official level, they cost the same.",
        ],
      },
      {
        heading: "When do GTA 6 controller preorders start?",
        body: [
          "Preorders begin September 10, 2026. The exact time depends on the market and purchasing channel.",
          "For PlayStation Direct in the United States, Sony lists 7:00 a.m. PT / 10:00 a.m. ET. In the United Kingdom, France, Germany, Austria, Spain, Italy, the Netherlands, Belgium and Luxembourg, PlayStation Direct preorders begin at 10:00 a.m. local time. Sony says customers in Portugal can preorder through PlayStation's hardware store.",
          "Because preorders open on September 10, buyers should check the official PlayStation storefront for their region for current ordering status rather than relying on older reports about what might become available.",
          "Sony has confirmed limited quantities, but it has not provided a production total or guaranteed how long stock will remain available. Claims that either controller will definitely sell out within minutes should therefore be treated as prediction, not confirmed information.",
        ],
      },
      {
        heading: "Where can you buy the GTA 6 DualSense controllers?",
        body: [
          "This is where the difference between the two editions matters most. Sony says the White controller will be sold globally in limited quantities through PlayStation Direct and participating retailers. The Black controller will be exclusive to PlayStation Direct where PlayStation Direct is available, and in other regions Sony says it will be available through select retailers.",
          "The wording is important. It does not mean the Black controller is a worldwide PlayStation Direct exclusive, because Direct does not operate everywhere. It also does not mean every electronics or gaming retailer will receive either controller.",
          "If you are buying one, use Sony's regional PlayStation channels or a retailer that has actually confirmed stock. For eligible preorders placed directly through PlayStation, Sony also advertises free launch-day delivery, subject to its applicable conditions.",
        ],
      },
      {
        heading: "When do the GTA 6 controllers release?",
        body: [
          "Both controllers begin launching on November 19, 2026, deliberately aligning them with Grand Theft Auto VI's release date. Sony adds a regional caveat: the exact controller launch date and availability may vary by country or region.",
          "That makes November 19 the announced launch date, but buyers outside the major Direct markets should not assume local availability will be identical without checking their regional listing.",
          "Rockstar currently lists GTA VI for November 19, 2026 on PlayStation 5 and Xbox Series X and Series S. The controllers themselves are PlayStation accessories. Their existence does not mean GTA VI is a PlayStation exclusive, and Xbox Series X and Series S remain officially confirmed launch platforms.",
        ],
      },
      {
        heading: "GTA 6 will use DualSense haptic feedback and adaptive triggers",
        body: [
          "The most interesting part of Sony's announcement may not be the controllers' appearance at all. Sony explicitly confirms that Grand Theft Auto VI will make use of DualSense haptic feedback and adaptive triggers on PS5.",
          "Haptic feedback allows developers to create more detailed physical feedback through the controller than traditional vibration alone, while the DualSense's adaptive triggers can dynamically change resistance. Sony says these features will respond to the action in GTA VI and are intended to make Jason and Lucia's story more tactile. That is the confirmed part.",
          "What Sony has not explained is equally important. There is currently no detailed first-party breakdown specifying exactly how the controller will respond to individual weapons, specific vehicles, different road surfaces, police pursuits, weather, swimming, environmental interactions or individual character actions.",
          "Those would all be plausible applications of DualSense technology, but plausible is not the same as confirmed. Until Rockstar or Sony demonstrates those implementations, claims such as “you will feel every road surface” or “each gun will have unique trigger resistance” go beyond what has actually been announced. What we can say confidently is simpler: haptic feedback and adaptive trigger support are officially confirmed for GTA VI on PS5.",
        ],
      },
      {
        heading: "Do you need a GTA 6 Limited Edition controller to play GTA 6?",
        body: [
          "No. These are collectible limited-edition versions of Sony's DualSense wireless controller. They are not required to play GTA VI on PS5.",
          "Nothing in Sony's announcement suggests either GTA VI controller unlocks exclusive missions, vehicles, weapons, characters or gameplay functionality. The confirmed differences concern their limited-edition GTA VI design and availability. A regular compatible DualSense remains sufficient for playing the PS5 version of the game.",
          "The case for buying one is instead about the GTA VI design, collecting official hardware, or wanting a new DualSense around launch.",
        ],
      },
      {
        heading: "Will the GTA 6 controllers work with other PS5 games?",
        body: [
          "These are DualSense wireless controllers rather than game-specific input devices. Their GTA VI branding does not turn them into controllers usable only with GTA VI, and their core hardware remains part of Sony's DualSense family.",
          "Individual DualSense features always depend on what a particular game supports. Buying the GTA VI edition does not add GTA-specific functionality to unrelated games.",
          "The distinction is worth making because “GTA VI Limited Edition” refers to the controller's design and branding, not a restriction tying the hardware exclusively to Rockstar's game.",
        ],
      },
      {
        heading: "Are the GTA 6 controllers really limited edition?",
        body: [
          "Yes, in the sense that Sony itself officially calls both products Limited Edition and says they will be available in limited quantities. But we do not know how limited.",
          "Sony has not disclosed total production numbers, allocation by country, allocation by retailer, whether additional waves will arrive, how long production will continue, or whether either colour has a smaller production run.",
          "That means there is a difference between saying that Sony confirms limited quantities and claiming that only a specific number of units will be made. The first is official. The second currently is not.",
          "It is reasonable to expect strong interest around GTA VI hardware, but there is not enough official information to predict exactly how difficult either controller will be to buy.",
        ],
      },
      {
        heading: "GTA 6 Black vs White DualSense: what is the difference?",
        table: {
          head: ["Feature", "White Limited Edition", "Black Limited Edition"],
          rows: [
            ["Theme", "Vice City daytime and coastal aesthetic", "Vice City nightlife"],
            ["GTA VI branding", "Yes", "Yes"],
            ["Molded palm details", "Yes", "Yes"],
            ["Shimmering colour-shifting finish", "Yes", "Yes"],
            ["US recommended price", "$84.99", "$84.99"],
            ["Launch", "November 19, 2026", "November 19, 2026"],
            ["PlayStation Direct", "Yes", "Yes"],
            ["Participating retailers", "Yes", "Select markets where applicable"],
            ["Direct exclusivity", "No", "Yes, where PlayStation Direct operates"],
          ],
        },
      },
      {
        heading: "GTA 6 controller vs a regular DualSense",
        body: [
          "The main confirmed reason to choose one of these editions over a regular DualSense is their GTA VI-specific design. They still belong to the DualSense family and retain the technologies Sony is highlighting for GTA VI, including haptic feedback and adaptive triggers.",
          "What Sony has not announced is a special hardware advantage that makes the GTA VI editions perform GTA VI functions unavailable on a standard compatible DualSense. That distinction prevents the limited-edition branding from being confused with an upgraded controller tier.",
          "If you already own a working DualSense and do not care about collectible hardware, there is currently no announced gameplay reason you must replace it. If you want an official GTA VI controller designed specifically around Vice City, these are the first two options Sony has revealed.",
        ],
      },
      {
        heading: "How the controllers fit into GTA 6's November launch",
        body: [
          "The timing is clearly coordinated with GTA VI itself. Both controllers begin launching November 19, the same day Rockstar currently plans to release Grand Theft Auto VI on PlayStation 5 and Xbox Series X and Series S.",
          "Rockstar's official GTA VI page also carries a “Plays Best On PlayStation 5” message and directs visitors to PlayStation information about GTA VI features. The new DualSense announcement adds a concrete piece to that PlayStation positioning by confirming haptic-feedback and adaptive-trigger integration.",
          "But it does not change the game's platform status. GTA VI is still coming to Xbox Series X and Series S as well as PS5. And as of this article's latest verification, Rockstar has not announced a PC version or PC release date. The DualSense announcement should not be interpreted as evidence one way or the other about a future PC release.",
        ],
      },
      {
        heading: "Should you buy or preorder one?",
        body: [
          "That depends on what you want from it. If you collect GTA merchandise, limited-edition PlayStation hardware or controllers tied to major game releases, these have obvious appeal. They are official Sony products built specifically around GTA VI rather than generic aftermarket shells, and they launch on the same day as the game.",
          "If you are interested only in gameplay, the argument is weaker. Sony has not announced exclusive GTA VI gameplay features tied specifically to owning the Black or White Limited Edition, and a normal DualSense can still provide the supported PS5 controller functionality.",
          "Price also matters. At $84.99 in the US, these are accessories in addition to the cost of GTA VI itself.",
          "The safest purchasing approach is straightforward: buy one because you want the design or the collectible controller, not because you think GTA VI requires it. And if you are interested, use official PlayStation channels and confirmed participating retailers rather than paying an inflated resale price based on assumptions about scarcity.",
        ],
      },
      {
        heading: "What we still do not know",
        body: [
          "Sony's announcement answers the major questions about design, price and launch timing, but several details remain open.",
          "We still do not have an official production quantity for either controller, and we do not know whether the Black and White editions are being manufactured in equal numbers. Sony has not provided one global retailer list, and regional availability may differ.",
          "There is no detailed first-party demonstration yet showing precisely how GTA VI maps specific gameplay actions to adaptive-trigger resistance or haptic feedback. There is also no indication that purchasing either controller grants GTA VI digital content.",
          "And the announcement does not change the status of GTA VI on PC. Rockstar's confirmed November 19 launch remains PS5 and Xbox Series X and Series S. These gaps matter because they are exactly where speculation can easily be mistaken for news. We will update this article when Sony or Rockstar provides concrete answers.",
        ],
      },
      {
        heading: "Latest GTA 6 controller update",
        body: [
          "Last verified: September 10, 2026. Preorders officially begin September 10. Sony's announced recommended pricing remains $84.99 / EUR 84.99 / GBP 74.99 / 12,480 yen, and the two GTA VI Limited Edition DualSense controllers are scheduled to begin launching on November 19, 2026.",
          "The White Limited Edition is officially listed for PlayStation Direct and participating retailers globally in limited quantities. The Black Limited Edition is a PlayStation Direct exclusive in markets where Direct is available, with select retailers handling availability in other regions. No official production totals have been announced.",
          "Grand Theft Auto VI itself remains scheduled for November 19, 2026 on PS5 and Xbox Series X and Series S.",
        ],
      },
      {
        heading: "The bottom line",
        body: [
          "Sony's GTA 6 controller announcement gives fans two official ways to bring Vice City's visual style to PS5 hardware before Jason and Lucia's story begins. The White Limited Edition represents Vice City's brighter coastal side, while the Black Limited Edition takes its cues from the city's nightlife. Both feature GTA VI branding, molded palm-tree details and a shimmering finish, and both carry the same $84.99 US recommended price.",
          "Preorders begin September 10, with launch starting November 19 alongside GTA VI. For players, the bigger confirmation is that GTA VI will support the DualSense's haptic feedback and adaptive triggers on PS5. Exactly how Rockstar uses those features across driving, combat and the wider world of Leonida remains to be detailed.",
        ],
      },
    ],
    evidence: [
      {
        kind: "confirmed",
        usage:
          "Product names, $84.99 / EUR 84.99 / GBP 74.99 / 12,480 yen pricing, the September 10 preorder date and regional times, the November 19 launch, the PlayStation Direct and participating-retailer split, the limited-quantities wording, and GTA VI haptic-feedback and adaptive-trigger support all come from Sony's own announcement.",
      },
      {
        kind: "reported",
        usage:
          "Secondary outlets covering the State of Play reveal corroborate the pricing and availability details but add no first-party information beyond Sony's post.",
      },
      {
        kind: "speculation",
        usage:
          "Production totals, per-region allocation, how quickly stock will sell, and how GTA VI maps specific weapons, vehicles or surfaces to adaptive-trigger resistance are all unannounced. This article does not predict them.",
      },
    ],
    sources: [
      {
        label:
          "PlayStation Blog - First look at the Grand Theft Auto VI Limited-Edition DualSense Wireless Controllers",
        url: "https://blog.playstation.com/2026/09/03/first-look-at-the-grand-theft-auto-vi-limited-edition-dualsense-wireless-controllers/",
      },
      {
        label:
          "PlayStation Blog - State of Play & State of Play Japan: all announcements, trailers",
        url: "https://blog.playstation.com/2026/09/03/state-of-play-state-of-play-japan-all-announcements-trailers/",
      },
      {
        label: "Rockstar Games - Grand Theft Auto VI",
        url: "https://www.rockstargames.com/VI",
      },
      {
        label: "Rockstar Games Newswire - Pre-Order Grand Theft Auto VI on June 25",
        url: "https://www.rockstargames.com/newswire/article/5171972o3ak5oa/pre-order-grand-theft-auto-vi-on-june-25",
      },
    ],
    related: [
      {
        type: "pillar",
        href: "/gta-6-release-date",
        label: "GTA 6 Release Date",
      },
      {
        type: "pillar",
        href: "/gta-6-platforms",
        label: "GTA 6 Platforms",
      },
      {
        type: "pillar",
        href: "/gta-6-price",
        label: "GTA 6 Price",
      },
      {
        type: "pillar",
        href: "/gta-6-ultimate-edition",
        label: "GTA 6 Ultimate Edition",
      },
      {
        type: "analysis",
        href: "/analysis/gta-6-standard-vs-ultimate",
        label: "Standard vs Ultimate Edition",
      },
      {
        type: "pillar",
        href: "/system-requirements",
        label: "GTA 6 System Requirements",
      },
    ],
  },
  {
    slug: "gta-6-extended-look-breakdown",
    title: "GTA 6 Extended Look Breakdown: 20+ Things Rockstar Just Revealed",
    summary:
      "Rockstar’s GTA 6 Extended Look is here. We break down the gameplay, characters, activities, combat, world details and confirmed launch information.",
    category: "trailer-news",
    date: "2026-08-29",
    status: "scheduled",
    publishAt: "2026-08-29T17:00:00Z",
    lastVerified: "2026-08-29",
    seoTitle: "GTA 6 Extended Look Breakdown: 20+ Things Rockstar Just Revealed",
    metaDescription:
      "Rockstar’s GTA 6 Extended Look is here. We break down the gameplay, characters, activities, combat, world details and confirmed launch information.",
    schemaType: "NewsArticle",
    intro: [
      "Rockstar Games has finally given players a much longer look at Grand Theft Auto VI. The August 27 Extended Look runs for just under 27 minutes and uses footage captured from the PlayStation 5 version of the game. More importantly, it moves GTA 6 discussion beyond trailer-frame speculation and gives us direct evidence of how Jason, Lucia, Vice City and the wider state of Leonida will actually feel in motion.",
      "The biggest takeaway is not one isolated feature. It is the density of the world. Rockstar shows story scenes, driving, police chases, combat, quiet apartment moments, sports, water activities and multiple slices of everyday life without presenting the game as a checklist of disconnected systems.",
    ],
    sections: [
      {
        heading: "The most important confirmed details",
        table: {
          head: ["Detail", "What we know", ""],
          rows: [
            ["Release date", "November 19, 2026", ""],
            ["Launch platforms", "PlayStation 5 and Xbox Series X\\", "S"],
            ["Showcase runtime", "About 27 minutes", ""],
            ["Footage source", "Captured from the PS5 version", ""],
            ["Main protagonists", "Jason Duval and Lucia Caminos", ""],
            ["Setting", "Vice City and the wider state of Leonida", ""],
            ["Pre-load", "November 12 for digital pre-orders", ""],
          ],
        },
      },
      {
        heading: "1. Jason and Lucia remain the center of the story",
        body: [
          "The Extended Look spends substantial time on Jason and Lucia together rather than presenting them as two unrelated playable leads. Their relationship appears to shape both story scenes and criminal jobs. Rockstar's own character material describes Jason as a former Army serviceman who later worked for drug runners in the Leonida Keys, while Lucia is fresh out of the Leonida Penitentiary and determined to change her circumstances.",
          "That matters because GTA 6 appears to be built around a partnership rather than simply alternating between protagonists.",
        ],
      },
      {
        heading: "2. Character switching is visibly part of the game",
        body: [
          "The presentation shows the player moving between Jason and Lucia. The mechanic recalls GTA V, but the context is different: these two characters frequently operate in the same story thread. That could make switching feel more tactical during jobs, although Rockstar has not yet published a full mechanical explanation.",
        ],
      },
      {
        heading: "3. Combat looks heavier and more deliberate",
        body: [
          "Shootouts shown in the footage feature cover, close-range encounters and weapon handling that looks more grounded than GTA V. We can say the footage shows an updated combat presentation; we should not yet claim every rumored inventory or weapon-carry limitation as confirmed.",
        ],
      },
      {
        heading: "4. Police pursuits are more prominent",
        body: [
          "Multiple police sequences appear in the showcase, including road chases and armed confrontations. The footage supports the idea that wanted-level encounters remain central to the GTA formula. A six-star display has also been reported from the showcase, but until Rockstar documents the full wanted system, details about escalation rules should remain labeled as observed rather than fully explained.",
        ],
      },
      {
        heading: "5. Vice City is only part of the world",
        body: [
          "Rockstar continues to frame GTA 6 as a game set across Leonida, not just Vice City. Official location material has already identified areas including the Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga National Park.",
          "The Extended Look reinforces that wider-state approach with highways, waterways, neighborhoods and rural-looking spaces.",
        ],
      },
      {
        heading: "6. Activities extend beyond missions",
        body: [
          "The footage includes sequences involving basketball, kayaking, exercise, racing and other leisure activities. Some are clearly presented as player-controlled moments, while others are visible as world interactions. We are keeping those categories separate until Rockstar publishes a complete activity list.",
        ],
      },
      {
        heading: "7. Water may matter more than it did in GTA V",
        body: [
          "Boats, coastal spaces and underwater activity appear repeatedly across GTA 6's official media. The Extended Look includes scuba-diving imagery, strengthening the case that Leonida's coastline and waterways are a meaningful part of exploration rather than scenery.",
        ],
      },
      {
        heading: "8. Interiors appear to be a major part of world density",
        body: [
          "Apartments, stores, nightlife spaces and criminal locations appear throughout the presentation. It would be premature to claim that “most buildings are enterable,” a popular rumor with no official confirmation, but Rockstar is clearly showing more interior variety than a simple city backdrop.",
        ],
      },
      {
        heading: "9. The world is designed around social behavior",
        body: [
          "From nightlife and street activity to phones, parties and public spaces, GTA 6 continues the social-media-heavy satire introduced in Trailer 1. The Extended Look makes that feel less like a trailer gimmick and more like part of Leonida's everyday atmosphere.",
        ],
      },
      {
        heading: "What Rockstar still has not fully explained",
        body: [
          "Several major questions remain open: the exact map boundaries, PC release timing, PC system requirements, the final GTA Online plan for GTA 6, detailed performance modes, full mission structure and the complete vehicle and weapon rosters.",
          "That distinction matters. The Extended Look gives us much more evidence, but it does not turn every pre-release rumor into fact.",
        ],
      },
      {
        heading: "Bottom line",
        body: [
          "The Extended Look is the most useful GTA 6 source released so far because it shows the game functioning as a world rather than as a montage of cinematic reveals. GTA 6 still looks unmistakably like Grand Theft Auto, but the new footage suggests Rockstar is pushing hardest on environmental density, character interaction and the number of believable things happening between major missions.",
          "For continuously updated information, see our GTA 6 release date, GTA 6 map, characters, vehicles and weapons hubs.",
        ],
      },
      {
        heading: "What the Extended Look actually is",
        body: [
          "Rockstar describes the August 27 presentation as an “Extended Look” and says it was captured entirely from in-game footage on PlayStation 5. That wording matters. It lets us treat the environments, interfaces and playable-looking sequences as first-party evidence, while still avoiding the assumption that every cinematic cut is direct player control. The presentation runs roughly 26 minutes and 48 seconds on Rockstar’s page, making it far more substantial than Trailer 1 or Trailer 2.",
          "A useful breakdown should therefore classify each observation. “Confirmed” means Rockstar names or states it. “Observed” means the footage clearly shows it. “Reported” means an outlet or invited preview provides additional context. “Speculation” means an interpretation that is plausible but not established. This hierarchy is more useful than a single list of “20 things confirmed,” because readers can see how strong the evidence really is.",
        ],
      },
      {
        heading: "Scene structure and why it matters",
        body: [
          "The strongest competing scene-by-scene database currently divides the showcase into 14 scenes and 183 individual shots. Rather than reproduce that catalog, the better editorial approach is to use scene structure to answer user questions: what does the opening raid tell us about combat, what does apartment life tell us about downtime, what do robbery sequences show about planning, and what does the police chase reveal about pursuit systems?",
          "The video repeatedly alternates between high-intensity crime and low-intensity everyday moments. That contrast is an important design signal. GTA VI is not being marketed only as a larger action sandbox. Rockstar is emphasizing domestic space, nightlife, leisure, travel and social behavior alongside robberies and gunfights. That broadens the search opportunities for dedicated pages on activities, properties, businesses, customization and world simulation.",
        ],
      },
      {
        heading: "Character switching and partnership gameplay",
        body: [
          "The Extended Look visibly reinforces Jason and Lucia as a two-protagonist system. Scenes show them operating together and separately, and contemporary breakdowns report switching behavior reminiscent of GTA V. The key editorial distinction is that the existence of two playable leads is established, while the exact rules for free-roam switching, mission restrictions and cooldowns are not fully documented by Rockstar.",
          "Put plainly: GTA VI has two central playable protagonists, Jason Duval and Lucia Caminos. The Extended Look shows both participating in robberies, driving and combat. It does not yet provide a complete official rulebook for when the player can switch between them.",
        ],
      },
      {
        heading: "Combat, weapons and tactical behavior",
        body: [
          "The presentation shows more than generic shooting. PC Gamer’s breakdown notes a visible reticle, body-part targeting in some sequences, contextual crime choices and a separate item-management feel that recalls Red Dead Redemption 2. TechRadar also highlights a visible weapon wheel and in-car combat during the major police pursuit. These are strong observations, but they should be described as mechanics shown in the footage rather than a final exhaustive combat system.",
          "This is where our weapons hub goes further than a list of gun names: each weapon carries its source, where it appeared, and a confidence label. The Extended Look is cited there as a new evidence source without turning a visual identification into an official name.",
        ],
      },
      {
        heading: "Police, descriptions and escape systems",
        body: [
          "One of the most useful gameplay observations is that police response appears to track more than a simple star count. PC Gamer reports that authorities can receive descriptions of the protagonists, their clothing, vehicle and whether they are together. The footage also shows a large pursuit with road chaos and in-car shooting. TechRadar observed a six-star wanted display during the presentation.",
          "This should not be inflated into a claim that every disguise, witness and recognition rule is fully known. The stronger page explains the layers we can see: wanted escalation, descriptive information, vehicle identification, pursuit pressure and the apparent return of six stars. A later Rockstar manual or gameplay page could confirm the exact rules.",
        ],
      },
      {
        heading: "Activities and the open world",
        body: [
          "The Extended Look shows or strongly suggests a broader activity layer than the first two trailers alone. Contemporary coverage identifies basketball, scuba diving, boating, kayaking and other leisure sequences, while the footage itself presents nightlife, driving, domestic scenes and outdoor exploration. The right editorial move is to tag each activity as “shown as playable,” “shown in a gameplay montage,” or “present in the world but interaction not yet confirmed.”",
          "That distinction prevents a common GTA coverage problem: a background object appears in a trailer and immediately becomes “confirmed gameplay.” AllThingsGTA6 can earn trust by being the site that says exactly what the evidence supports.",
        ],
      },
      {
        heading: "The most important unanswered questions after the reveal",
        body: [
          "The showcase answers many high-level questions but leaves major systems open: the complete economy, property ownership rules, the exact weapon inventory model, full wanted-system logic, the final map boundary, mission structure flexibility, online plans and PC timing. Those unknowns are not weaknesses in the article. They are update hooks.",
          "A strong evergreen version should end with a dated “still not confirmed” block. When Rockstar answers one of those questions, update the canonical hub and link the change from the monthly news page. That turns freshness into a site architecture feature rather than a scramble to publish another thin post.",
        ],
      },
    ],
    evidence: [
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
        label: "Rockstar Games - Grand Theft Auto VI: An Extended Look",
        url: "https://www.rockstargames.com/VI/an-extended-look",
      },
      {
        label: "Rockstar Games - Grand Theft Auto VI",
        url: "https://www.rockstargames.com/VI",
      },
      {
        label: "PC Gamer - GTA 6 Gameplay Reveal Breakdown",
        url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-gameplay-reveal-details-breakdown/",
      },
      {
        label: "GTA 6 Database / Tracker - Extended Look Scene-by-Scene Breakdown",
        url: "https://tracker.gg/gta6/trailers/netflix-extended-look/",
      },
      {
        label: "TechRadar - GTA 6 Extended Look Live Breakdown",
        url: "https://www.techradar.com/news/live/grand-theft-auto-6-extended-look-on-netflix-live",
      },
      {
        label: "WIRED - Takeaways From the GTA VI Extended Look",
        needsReview: true,
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
        href: "/gta-6-vehicles",
        label: "GTA 6 Vehicles",
      },
      {
        type: "pillar",
        href: "/gta-6-weapons",
        label: "GTA 6 Weapons",
      },
      {
        type: "pillar",
        href: "/wiki/gangs/police-system",
        label: "Police and Wanted System",
      },
    ],
  },
  {
    slug: "gta-6-news-august-2026",
    title: "GTA 6 News: Everything That Changed in August 2026",
    summary:
      "Catch up on every major GTA 6 development from August 2026, including the Extended Look, PS5 footage, pre-order updates and new gameplay details.",
    category: "rockstar-updates",
    date: "2026-08-30",
    status: "scheduled",
    publishAt: "2026-08-30T13:00:00Z",
    lastVerified: "2026-08-30",
    seoTitle: "GTA 6 News: Everything That Changed in August 2026",
    metaDescription:
      "Catch up on every major GTA 6 development from August 2026, including the Extended Look, PS5 footage, pre-order updates and new gameplay details.",
    schemaType: "NewsArticle",
    intro: [
      "Published: August 29, 2026",
      "Coverage window: August 1-29, 2026",
      "August became the most important GTA 6 month since pre-orders opened. Rockstar announced and then released Grand Theft Auto VI: An Extended Look, giving players almost 27 minutes of new footage and a much clearer view of how Jason and Lucia move through Vice City and Leonida.",
      "If you have not followed every update, these are the developments that materially changed what we know.",
    ],
    sections: [
      {
        heading: "August 6: Rockstar announces an Extended Look",
        body: [
          "Rockstar confirmed that a longer GTA 6 presentation would premiere on Netflix on August 27 before becoming available more widely. That was notable on its own: GTA reveals are normally distributed directly through Rockstar and YouTube, while this one was positioned as a limited streaming event.",
          "The announcement also reinforced the November 19, 2026 release date.",
        ],
      },
      {
        heading: "August 17: PS5 promotion puts GTA 6 back in the spotlight",
        body: [
          "Sony's PS5 marketing campaign included GTA 6 footage, reinforcing the close promotional relationship around the PlayStation version. The official PlayStation Store lists GTA 6 as PS5 Pro Enhanced and confirms DualSense vibration and trigger-effect support.",
          "That does not mean GTA 6 is a PlayStation exclusive. The game is also confirmed for Xbox Series X|S.",
        ],
      },
      {
        heading: "August 27: the Extended Look premieres",
        body: [
          "This was the month's defining event. The showcase ran for roughly 27 minutes and was captured from the PS5 version.",
          "It included:",
          "extended scenes with Jason and Lucia;",
          "driving and police pursuits;",
          "gunfights and close-range combat;",
          "character switching;",
          "nightlife and apartment scenes;",
          "water activities;",
          "racing and sports imagery;",
          "a broader look at Vice City and Leonida.",
          "Unlike Trailer 1, which was primarily a tone-setter, the Extended Look provides enough uninterrupted game footage to begin separating actual mechanics from years of rumor.",
        ],
      },
      {
        heading: "August 28-29: analysis shifts from “what is GTA 6?” to “how will it play?”",
        body: [
          "The gaming press immediately focused on world density, character movement, combat and console performance. PC Gamer, TechRadar, The Verge and other outlets published detailed breakdowns within hours.",
          "One especially important technical point is that the footage was captured on a base PS5. That gives players a real reference for the visual quality Rockstar is targeting on existing console hardware.",
          "Performance-mode discussion is still developing, so we are not treating every frame-rate claim circulating online as a permanent launch specification.",
        ],
      },
      {
        heading: "Release information did not change",
        body: [
          "Despite another wave of online discussion, Rockstar's official release date remains November 19, 2026 for PlayStation 5 and Xbox Series X|S.",
          "Pre-orders are already live. The Standard Edition is $79.99 in the US and the Ultimate Edition is $99.99. Digital pre-orders can begin pre-loading on November 12.",
          "A PC version still has not been announced.",
        ],
      },
      {
        heading: "The most important content updates for fans",
        body: [
          "If you only read five pages after the August reveal, make them these:",
          "GTA 6 Extended Look breakdown",
          "GTA 6 release date",
          "GTA 6 map",
          "GTA 6 characters",
          "GTA 6 gameplay",
          "Those pages will be updated as Rockstar publishes more official material.",
        ],
      },
      {
        heading: "What to watch next",
        body: [
          "The remaining pre-release questions are now narrower and more useful: final performance modes, exact map detail, a complete mission/gameplay explanation, GTA Online's relationship to GTA 6 and whether Rockstar will announce a PC version before or after the console launch.",
          "The site will treat those as open questions until Rockstar or Take-Two provides verifiable information.",
        ],
      },
      {
        heading: "The August 2026 timeline",
        body: [
          "August became the most important GTA VI information month since pre-orders opened. Rockstar promoted the Extended Look, released the long-form in-game presentation on August 27, and the gaming press rapidly published mechanic-by-mechanic analysis. The official release date remained November 19, 2026, and Take-Two continued to reaffirm the schedule in investor-facing communication.",
          "Events below are ordered by date rather than by how much attention they attracted. That makes it easy to tell an official Rockstar release from a Take-Two corporate statement, a media preview, a leak, or a community interpretation.",
        ],
      },
      {
        heading: "What changed on the site because of the Extended Look",
        body: [
          "The reveal materially affects at least six evergreen hubs: gameplay, police/wanted system, activities, weapons, vehicles and trailers. It also adds context to character and map pages because we now have longer in-game sequences showing Jason, Lucia and Leonida in motion.",
          "The monthly roundup should therefore link to updated evergreen pages rather than trying to duplicate every detail. News captures the event; evergreen hubs capture durable knowledge.",
        ],
      },
      {
        heading: "Leaks versus official information",
        body: [
          "August also produced widely circulated unofficial footage and map claims. Even when leaked material looks authentic, it can represent an unfinished build and can be altered or removed. We note that such reporting exists when it is genuinely newsworthy, do not host unauthorised media, and keep leaked claims out of the confirmed tables entirely.",
          "This separation is particularly important now that official footage is abundant. There is less reason to use uncertain leaks to answer questions that Rockstar has already addressed directly.",
        ],
      },
    ],
    evidence: [
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
        label: "Rockstar Games - Grand Theft Auto VI: An Extended Look",
        url: "https://www.rockstargames.com/VI/an-extended-look",
      },
      {
        label: "Rockstar Games Newswire - Pre-Order Grand Theft Auto VI on June 25",
        url: "https://www.rockstargames.com/newswire/article/5171972o3ak5oa/pre-order-grand-theft-auto-vi-on-june-25",
      },
      {
        label: "Rockstar Games - Grand Theft Auto VI",
        url: "https://www.rockstargames.com/VI",
      },
      {
        label: "PC Gamer - GTA 6: What We Know",
        url: "https://www.pcgamer.com/grand-theft-auto/gta-6-guide/",
      },
    ],
    related: [
      {
        type: "pillar",
        href: "/gta-6-release-date",
        label: "GTA 6 Release Date",
      },
      {
        type: "pillar",
        href: "/gta-6-trailers",
        label: "GTA 6 Trailers",
      },
      {
        type: "pillar",
        href: "/gta-6-gameplay",
        label: "GTA 6 Gameplay",
      },
    ],
  },
  {
    slug: "gta-6-pre-order",
    title: "GTA 6 Pre-Order Guide: Bonuses, Preload Date and Where to Buy",
    summary:
      "GTA 6 pre-orders are live. See the confirmed bonuses, November 12 preload date, Standard and Ultimate pricing, and what physical buyers actually receive.",
    category: "release-updates",
    date: "2026-09-01",
    status: "draft",
    lastVerified: "2026-08-29",
    seoTitle: "GTA 6 Pre-Order Guide: Bonuses, Preload Date and Where to Buy",
    metaDescription:
      "GTA 6 pre-orders are live. See the confirmed bonuses, November 12 preload date, Standard and Ultimate pricing, and what physical buyers actually receive.",
    schemaType: "Article",
    intro: [
      "GTA 6 pre-orders are live for PlayStation 5 and Xbox Series X|S. Rockstar opened global pre-orders on June 25, 2026 and confirmed both digital and code-in-box options ahead of the November 19 launch.",
      "The most important detail is easy to miss: Rockstar's current physical version is a box containing a download code, not a game disc.",
    ],
    sections: [
      {
        heading: "GTA 6 pre-order facts",
        table: {
          head: ["Item", "Details"],
          rows: [
            ["Pre-orders opened", "June 25, 2026"],
            ["Standard Edition", "$79.99 US"],
            ["Ultimate Edition", "$99.99 US"],
            ["Launch", "November 19, 2026"],
            ["Digital preload", "November 12, 2026"],
            ["Main pre-order bonus", "Vintage Vice City Pack"],
            ["Digital extra", "One free month of GTA+"],
            ["Physical format", "Code in box; no disc"],
          ],
        },
      },
      {
        heading: "What is the Vintage Vice City Pack?",
        body: [
          "Rockstar describes the Vintage Vice City Pack as a collection of items inspired by the era when Vice City's neon aesthetic was at its brightest.",
          "Current Rockstar Store details list bonus content including a '55 Vapid Stanier Sedan and Garage, outfits and hairstyles, and an exclusive weapon pattern.",
          "Because pre-order bundles can be region- or storefront-specific, check the exact listing shown at checkout rather than relying on screenshots from another market.",
        ],
      },
      {
        heading: "Digital pre-orders get early downloading, not early access",
        body: [
          "Rockstar says players who pre-order digitally can begin pre-loading on November 12.",
          "That does not mean the game unlocks a week early. GTA 6's confirmed release date remains November 19.",
          "Pre-loading simply allows the game files to be downloaded in advance so the console is ready when access unlocks.",
        ],
      },
      {
        heading: "Should you buy Standard or Ultimate?",
        body: [
          "The Standard Edition includes the full GTA 6 single-player experience. The Ultimate Edition costs $20 more in the US and adds a collection of vehicles, weapons, styles, customization locations and other bonuses tied to Jason and Lucia's story.",
          "If your priority is simply playing GTA 6 at launch, Standard is the straightforward option. If you value exclusive in-game items and customization content, compare the Ultimate benefits individually rather than buying based on the word “Ultimate.”",
          "Read our Standard vs Ultimate comparison for the full breakdown.",
        ],
      },
      {
        heading: "Where can GTA 6 be pre-ordered?",
        body: [
          "Rockstar lists pre-orders through the Rockstar Store, PlayStation Store and Xbox Store, with availability through selected retailers depending on country.",
          "Use official storefronts or established retailers. GTA 6's popularity makes fake “PC pre-order,” “early access” and key-selling pages particularly easy to mistake for legitimate listings.",
          "Remember: Rockstar has not announced a PC version, so an unofficial listing selling a GTA 6 PC key is not an official Rockstar PC pre-order.",
        ],
      },
      {
        heading: "Is there a collector's edition?",
        body: [
          "Rockstar currently promotes Standard and Ultimate editions. Treat any separate “Collector's Edition” listing as unconfirmed unless Rockstar adds it to its official edition page.",
        ],
      },
      {
        heading: "Bottom line",
        body: [
          "Pre-ordering is optional. The meaningful practical benefit for digital buyers is pre-loading, while the main content incentives are the Vintage Vice City Pack and, for digital orders, a free month of GTA+ under the current offer.",
          "Before buying, compare GTA 6 editions, confirm your platform and verify regional pricing.",
        ],
      },
      {
        heading: "Primary sources",
        body: [
          "Rockstar Games Newswire, June 24-25, 2026; Rockstar Support pre-order details; Rockstar Store; PlayStation Store; Take-Two Interactive investor announcement.",
          "---",
        ],
      },
      {
        heading: "Preorder eligibility in plain English",
        body: [
          "Rockstar says all GTA VI preorders and purchases made before November 20, 2026 receive the Vintage Vice City Pack. Digital preorders also include a free month of GTA+. The crucial distinction is that the GTA+ month is a digital preorder benefit, while the Vintage Vice City Pack has broader eligibility under Rockstar’s published wording.",
          "The guide should state the cutoff in a table and repeat it in the buying recommendation. That prevents users from assuming all bonuses disappear the moment launch begins.",
        ],
      },
      {
        heading: "What the Vintage Vice City Pack includes",
        body: [
          "Rockstar Support lists a 1955 Vapid Stanier Sedan and Garage, outfits and hairstyles, and an exclusive weapon pattern. These are official named preorder benefits, so they can be described without “reportedly” or “appears to.”",
          "Preorder items appear to be cosmetic or convenience-oriented rather than core story content, so none of them is necessary to experience GTA VI.",
        ],
      },
      {
        heading: "Physical code-in-box versus digital",
        body: [
          "The boxed release is not a disc release. Rockstar says the physical version contains a download code and will be available from November 12 to support preload. That is a purchasing detail competitors often bury, but it can affect collectors, users with bandwidth limits and anyone expecting offline disc installation.",
          "If Rockstar later announces a true disc edition, update this section rather than silently replacing it; the change itself would be newsworthy.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
          "For “GTA 6 preorder,” this matters because pre-release GTA coverage changes quickly. Labelling each claim by status means a later reveal can be added without quietly rewriting older observations as though they had always been official.",
        ],
      },
      {
        heading: "What is still not confirmed",
        body: [
          "Rockstar has not published every mechanic, every character, every location, every item or every platform detail. Where the evidence stops, we say so — “not announced” or “not yet confirmed” — rather than turning a reasonable assumption into a fact.",
          "That restraint is deliberate. Knowing exactly where reliable knowledge ends is more useful to you than a confident guess.",
        ],
      },
    ],
    evidence: [
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
        label: "Rockstar Games Newswire - Pre-Order Grand Theft Auto VI on June 25",
        url: "https://www.rockstargames.com/newswire/article/5171972o3ak5oa/pre-order-grand-theft-auto-vi-on-june-25",
      },
      {
        label: "Rockstar Support - GTA VI Platforms, Editions, and Versions",
        url: "https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions",
      },
      {
        label: "Rockstar Store - Grand Theft Auto VI",
        url: "https://store.rockstargames.com/game/buy-gta-vi",
      },
      {
        label: "Take-Two - Rockstar Games Announces Pre-Orders for Grand Theft Auto VI",
        url: "https://www.take2games.com/ir/news/rockstar-games-announces-pre-orders-grand-theft-auto-vi",
      },
    ],
    related: [
      {
        type: "pillar",
        href: "/gta-6-price",
        label: "GTA 6 Price",
      },
      {
        type: "pillar",
        href: "/gta-6-ultimate-edition",
        label: "GTA 6 Ultimate Edition",
      },
      {
        type: "pillar",
        href: "/gta-6-release-date",
        label: "GTA 6 Release Date",
      },
      {
        type: "pillar",
        href: "/gta-6-platforms",
        label: "GTA 6 Platforms",
      },
    ],
  },
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
      {
        type: "analysis",
        href: "/analysis/release-timeline-theory",
        label: "Release Timeline Theory",
      },
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
    title: "Revisiting the 2022 GTA 6 Leak: What Was Confirmed, What Wasn't",
    summary:
      "The September 2022 breach leaked dozens of development clips. Here we track which specific claims have since been confirmed by Rockstar — and which remain unverified.",
    category: "leaks",
    date: "2026-04-05",
    source: {
      label: "Rockstar Newswire (official statement, Sept 2022)",
      url: "https://www.rockstargames.com/newswire",
    },
    whatHappened:
      "In September 2022, dozens of early development clips were stolen and posted online. Rockstar publicly confirmed the breach was genuine in a Newswire statement. Some elements shown in that footage — the Vice City / Florida-inspired setting and the dual protagonists Jason and Lucia — were later confirmed by the December 2023 reveal trailer. Many other details shown in the clips have never been officially addressed.",
    analysis:
      "Rockstar confirmed the leak's authenticity, but 'authentic early build footage' is not the same as 'final feature list' — a lot of what was shown was placeholder or work-in-progress and may not ship. We deliberately avoid publishing a single accuracy percentage, because no complete, sourced tally of every leaked claim vs. its confirmation status exists; any such number circulating online is an estimate, not a measured figure.",
    meansForGta6:
      "Confirmed by later official material: the Leonida/Vice City setting and the Jason–Lucia dual protagonists. Still unverified: specific mechanics such as robbery progression, protagonist-swap details, and dynamic AI dialogue. Treat those as plausible-but-unconfirmed until Rockstar shows them.",
  },
  {
    slug: "map-speculation-update",
    title: "GTA 6 Map Speculation: The State of Leonida and Beyond",
    summary:
      "Trailer frames point to a map set across the fictional state of Leonida, with fan estimates putting it roughly 2x the size of GTA V's San Andreas.",
    category: "leaks",
    date: "2026-03-28",
    source: {
      label: "Rockstar Trailer 1 (Rockstar Newswire)",
      url: "https://www.rockstargames.com/newswire",
    },
    whatHappened:
      "Rockstar's reveal trailer confirms the game is set in the fictional state of Leonida, centered on Vice City. Aerial and establishing shots also show Keys-like islands, Everglades-style wetlands, and rural areas. Rockstar has not published an official map or a total size figure.",
    analysis:
      "The confirmed setting is Leonida and Vice City; everything about total map area remains fan estimate, not a Rockstar figure. If the community size estimates are close, this would be Rockstar's largest open world, which is consistent with the game shipping on SSD-based consoles only.",
    meansForGta6:
      "Treat any specific square-mileage or '2x San Andreas' claim as unverified fan measurement until Rockstar shows a map. Install size is also unannounced; prior Rockstar titles (RDR2 ~150GB) are the only reference point.",
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

/**
 * Public accessors. Every one of these is gated: drafts and not-yet-due
 * scheduled posts are invisible to readers, category pages, related widgets,
 * homepage modules and feeds alike.
 *
 * Use `allNews` only for editorial tooling that must see unpublished work.
 */
export const publicNews = (now?: Date) => publicOnly(news, now);

export const newsBySlug = (slug: string, now?: Date) =>
  publicEntry(
    news.find((n) => n.slug === slug),
    now,
  );

export const newsByCategory = (category: string, now?: Date) =>
  publicNews(now).filter((n) => n.category === category);

/** Unfiltered, including drafts and scheduled posts. Not for public surfaces. */
export const allNews = news;
