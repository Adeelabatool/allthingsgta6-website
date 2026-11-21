import type { EvidenceRow } from "@/lib/evidence";
import { publicEntry, publicOnly, type PendingRevision, type Publishable } from "@/lib/publishing";

/**
 * Long-form hub, guide and entity pages that live at their own route path.
 *
 * These were previously hardcoded route components with no lifecycle, which
 * meant they could not be drafted, scheduled, or staged for a future update.
 * Holding them as data gives them the same publishing controls as news, wiki
 * and analysis entries.
 */

/**
 * An image with the alt text it must always carry.
 *
 * `url` may be absolute, for official press imagery served from the
 * publisher's own CDN, or a site-relative path once a file has been taken
 * into /public. Swapping one for the other is a data change only.
 */
export interface ArticleImage {
  url: string;
  /** Describes what is actually shown. Never decorative filler. */
  alt: string;
  /** Shown under the image, e.g. to credit the publisher. */
  credit?: string;
}

export interface PageSection {
  heading: string;
  /** Body paragraphs, in order. */
  body?: string[];
  /** Optional data table. `head` is the header row. */
  table?: { head: string[]; rows: string[][] };
  /** Illustrates this section specifically. */
  image?: ArticleImage;
}

export interface SitePage extends Publishable {
  /** Route path, e.g. "/gta-6-map". This is the canonical URL. */
  path: string;
  /** H1 as shown on the page. */
  title: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  /** Direct-answer paragraphs above the first heading. */
  intro: string[];
  sections: PageSection[];
  evidence?: EvidenceRow[];
  /**
   * Sources and verification. Many plan sources are cited by publisher and
   * title with no URL on record; those stay text-only rather than inventing one.
   */
  sources?: { label: string; url?: string; needsReview?: boolean }[];
  /** Contextual links placed where a reader's intent genuinely changes. */
  related?: { href: string; label: string; desc?: string }[];
  /** Breadcrumb trail below Home. Defaults to the page title alone. */
  breadcrumb?: { label: string; href?: string }[];
  /** Evergreen guides and entity pages are Article; only real reporting is NewsArticle. */
  schemaType?: "Article" | "NewsArticle";
  /** Set only to consolidate this URL onto another page. */
  canonicalOverride?: string;
  /** A staged edit to a page that is already live. */
  pendingRevision?: PendingRevision<SitePage>;
}

export const pages: SitePage[] = [
  {
    path: "/gta-6-activities",
    status: "scheduled",
    publishAt: "2026-09-22T13:00:00Z",
    title: "GTA 6 Activities and Minigames: What You Can Actually Do in Leonida",
    seoTitle: "GTA 6 Activities and Minigames: What You Can Actually Do in Leonida",
    metaDescription:
      "GTA 6 shows basketball, gym activity, kayaking, racing, parachuting and more. We separate clearly playable activities from background details.",
    primaryKeyword: "GTA 6 activities",
    intro: [
      "The Extended Look makes one thing clear: GTA 6 is interested in what happens between major story missions.",
      "Rockstar shows sports, exercise, water recreation, racing and ordinary apartment interactions across Leonida. The key is not to label every visible object as a playable minigame.",
    ],
    sections: [
      {
        heading: "Activities shown with strong gameplay evidence",
        body: [
          "Kayaking: Water recreation appears as a controlled activity, fitting Leonida's emphasis on coastlines, rivers and wetlands.",
          "Racing: Street-racing imagery and interface-like presentation support racing as a playable activity rather than background scenery.",
          "Exercise and gym activity: Workout scenes appear in the Extended Look, and reporting around Rockstar's preview has connected exercise with character physique.",
          "Rockstar has not published how exercise affects character stats, so any exact formula is a guess.",
          "Parachuting: Parachuting appears in official material, continuing a familiar GTA activity in a much larger world.",
        ],
      },
      {
        heading: "Basketball",
        body: [
          "Basketball receives enough visual emphasis to deserve tracking, but we distinguish a visible court/sequence from a fully documented NBA-style minigame.",
          "Rockstar has not yet published rules, controls or progression for basketball.",
        ],
      },
      {
        heading: "Apartment interactions",
        body: [
          "One of the quieter details in the showcase is how characters behave at home. Food and household interactions suggest Rockstar wants interiors to feel lived in.",
          "That can add role-playing texture without turning GTA 6 into a survival game.",
        ],
      },
      {
        heading: "Water and diving",
        body: [
          "Scuba imagery supports underwater exploration, while boats and airboats already feature heavily across official media.",
          "Leonida's geography makes water activities more structurally relevant than they were in many earlier GTA maps.",
        ],
      },
      {
        heading: "What not to call confirmed yet",
        body: [
          "Be careful with lists that include hunting, fishing, surfing, bowling, golf or dozens of other activities solely because an object or location appears in the background.",
          "This page uses three labels:",
          "Playable shown",
          "Visible / likely interactive",
          "Not confirmed",
        ],
      },
      {
        heading: "Why activities matter",
        body: [
          "Activities are not just filler. They help Rockstar sell the idea that Jason and Lucia live in Leonida rather than teleport between missions.",
          "That world-building value may be one of the biggest differences between GTA 6 and GTA V's older simulation layer.",
        ],
      },
      {
        heading: "Classify activities by evidence strength",
        body: [
          "The Extended Look and current reporting show a mixture of clearly playable activities, short gameplay montages and cinematic background behavior. Not every activity on the list is a confirmed minigame: some are shown in gameplay, some appear only in the world, and some come from preview reports.",
        ],
      },
      {
        heading: "Water and outdoor activities",
        body: [
          "Scuba diving, boats and kayaking/canoeing are among the strongest water-related observations around the Extended Look. They fit Leonida’s Keys, wetlands and coastline, making water travel more structurally important than a one-off side activity.",
        ],
      },
      {
        heading: "Sports, nightlife and downtime",
        body: [
          "Basketball is visible in recent footage, while nightlife, bars and clubs, domestic scenes and social spaces are repeatedly shown. We separate an activity you can actually play from a location that merely contains people doing something in the background — footage alone rarely settles which is which.",
          "GTA 6 is now out. Locations, rewards and unlock requirements will be added here once they are verified in the game.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
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
        label: "PC Gamer - GTA 6 Gameplay Reveal Breakdown",
        url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-gameplay-reveal-details-breakdown/",
      },
      {
        label: "The Verge - GTA VI Extended Look",
        needsReview: true,
      },
    ],
    related: [
      {
        href: "/gta-6-gameplay",
        label: "GTA 6 Gameplay",
      },
      {
        href: "/gta-6-map",
        label: "GTA 6 Map",
      },
      {
        href: "/gta-6-locations",
        label: "GTA 6 Locations",
      },
    ],
    lastVerified: "2026-09-22",
    breadcrumb: [
      {
        label: "GTA 6 Activities and Minigames: What You Can Actually Do in Leonida",
      },
    ],
  },
  {
    path: "/gta-6-characters",
    status: "scheduled",
    publishAt: "2026-09-14T13:00:00Z",
    title: "GTA 6 Characters: Every Confirmed Character",
    seoTitle: "GTA 6 Characters: Full Cast and Is There a Third Protagonist?",
    metaDescription:
      "Jason Duval and Lucia Caminos lead GTA 6. Meet Cal Hampton, Boobie Ike, Dre’Quan Priest, Real Dimez, Raul Bautista and Brian Heder. Is there a third protagonist?",
    primaryKeyword: "GTA 6 characters",
    intro: [
      "GTA 6 centers on Jason Duval and Lucia Caminos, and Rockstar has introduced a broader cast connected to crime, music, nightlife and life across Leonida.",
      "This page includes characters Rockstar has officially revealed through its site, trailers, clips and screenshots. Rumored names from leaks are not mixed into the confirmed list.",
    ],
    sections: [
      {
        heading: "Main protagonists",
        body: [
          "Jason Duval: Jason grew up around criminals, served in the Army and later found himself working around drug runners in the Leonida Keys. He wants an easier life, but his relationship and criminal partnership with Lucia pull him toward something bigger.",
          "Lucia Caminos: Lucia learned to fight from her father and spent time in the Leonida Penitentiary after fighting for her family. She wants the better life her mother once dreamed about and is prepared to take risks to get it.",
          "Read the full profiles of [Jason Duval](/wiki/characters/jason) and [Lucia Caminos](/wiki/characters/lucia).",
        ],
      },
      {
        heading: "Is there a third protagonist in GTA 6?",
        body: [
          "Rockstar's GTA VI website and character profiles present Jason and Lucia as the story's two leads, and none of them names a third playable protagonist.",
          "Fans most often suggest [Raul Bautista](/wiki/characters/raul-bautista). Rockstar's own profile describes him as an experienced bank robber who recruits people for bigger, riskier jobs. It doesn't describe him as a playable character.",
        ],
      },
      {
        heading: "Supporting characters",
        body: [
          "Cal Hampton: Cal is Jason's friend and another associate of Brian. Rockstar describes him as happiest at home, drinking beer and listening to Coast Guard communications while diving into online conspiracy thinking.",
          "Boobie Ike: Boobie is tied to Vice City's nightlife and business world. His profile links him with clubs, local influence and Dre'Quan Priest's music ambitions.",
          "Dre'Quan Priest: Dre'Quan has long wanted a career in music and now works toward building his Only Raw Records ambitions around Vice City's scene.",
          "Real Dimez: Real Dimez are a music duo connected with Dre'Quan and the city's entertainment culture.",
          "Raul Bautista: Raul is an experienced bank robber who looks for people willing to accept bigger risks for bigger rewards. Rockstar describes him as confident, charming and increasingly reckless.",
          "Brian Heder: Brian is connected with Jason and the Keys, helping anchor the story's early criminal network outside central Vice City.",
        ],
      },
      {
        heading: "Why this cast matters",
        body: [
          "The supporting characters are not all part of one gang. They occupy different corners of Leonida: drugs, robberies, nightlife, music and local business.",
          "That breadth suggests Jason and Lucia's story will cross multiple social circles rather than follow a single criminal organization from start to finish.",
        ],
      },
      {
        heading: "Who voices the GTA 6 characters?",
        body: [
          "Rockstar's official GTA VI character profiles do not list voice actors. Fans are very good at matching voices, but repeated speculation is still speculation, so performer names are left off this page until an official source or the game's credits can be checked.",
        ],
      },
      {
        heading: "Are there more characters?",
        body: [
          "This page covers the characters Rockstar introduced in its official GTA VI material. Rockstar has not published a full cast list, so these eight profiles are not the entire cast. Further characters will be added here once they can be verified from official sources.",
        ],
      },
      {
        heading: "The confirmed cast",
        body: [
          "Rockstar’s official character set includes Jason Duval, Lucia Caminos, Cal Hampton, Boobie Ike, Dre’Quan Priest, Real Dimez, Raul Bautista and Brian Heder. Rockstar's media library has dedicated clips and screenshots for these characters.",
        ],
      },
      {
        heading: "Relationship graph",
        body: [
          "Jason and Lucia form the central protagonist pair. Jason is connected to Brian Heder through work and housing, and Cal Hampton is described as Jason’s friend and a fellow Brian associate. Boobie Ike partners with Dre’Quan Priest around Only Raw Records; Dre’Quan has signed Real Dimez. Raul Bautista operates as a seasoned bank robber looking for talent and higher-risk scores.",
          "Together, these links show the separate criminal and business networks the story moves between.",
        ],
      },
      {
        heading: "Character network table: story function",
        body: [
          "Jason and Lucia: core narrative and playable partnership. Brian: Keys drug-running network and Jason’s early employer/landlord connection. Cal: friend/associate and conspiracy-minded information node. Boobie: established Vice City entrepreneur. Dre’Quan: music-business hustler. Real Dimez: social-media-savvy rap duo. Raul: professional robbery specialist.",
        ],
      },
      {
        heading: "What is not yet confirmed about the cast",
        body: [
          "Rockstar has not published the full cast list, a voice-actor roster, every gang/faction or the full mission relationships among these characters. The eight named profiles are not the entire game cast.",
        ],
      },
      {
        heading: "Supporting character mini-dossiers",
        body: [
          "Brian Heder is a veteran Keys drug runner who lets Jason live at one of his properties in exchange for local work. Cal Hampton is Jason’s friend and fellow Brian associate who monitors Coast Guard communications and leans into conspiracy culture. Boobie Ike is a Vice City entrepreneur whose empire spans real estate, a strip club and a recording studio.",
          "Dre’Quan Priest is a hustler focused on breaking into music and has signed Real Dimez to Only Raw Records. Real Dimez - Bae-Luxe and Roxy - are a rap duo with a strong social-media identity and an earlier hit with DWNPLY. Raul Bautista is a seasoned bank robber who seeks talent for high-risk scores. These official roles create distinct subclusters instead of a flat cast list.",
        ],
      },
      {
        heading: "Organizations and affiliations",
        body: [
          "Only Raw Records is the clearest named organization connecting multiple supporting characters: Boobie is invested in the partnership, Dre’Quan is building the label, and Real Dimez are signed artists. Brian’s Keys operation forms another network around Jason and Cal. Raul’s robbery crew is a third criminal node whose exact membership is not yet fully disclosed.",
        ],
      },
      {
        heading: "Spoilers on this page",
        body: [
          "This page sticks to Rockstar's promotional material, so it is spoiler-light. If story details from the released game are added later, they will go in a clearly labelled spoiler section below the cast summary.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
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
        label: "Rockstar Games - Only in Leonida: People & Places",
        url: "https://www.rockstargames.com/VI/only-in-leonida",
      },
      {
        label: "Rockstar Games - GTA VI Screenshots",
        url: "https://www.rockstargames.com/VI/downloads/screenshots",
      },
      {
        label: "Rockstar Games - GTA VI Videos",
        url: "https://www.rockstargames.com/VI/media/videos",
      },
      {
        label: "PC Gamer - GTA 6 Characters",
        url: "https://www.pcgamer.com/games/action/grand-theft-auto/gta6-characters/",
      },
    ],
    related: [
      {
        href: "/wiki/characters/jason",
        label: "Jason Duval",
      },
      {
        href: "/wiki/characters/lucia",
        label: "Lucia Caminos",
      },
      {
        href: "/wiki/characters/cal-hampton",
        label: "Cal Hampton",
      },
      {
        href: "/wiki/characters/boobie-ike",
        label: "Boobie Ike",
      },
      {
        href: "/wiki/characters/raul-bautista",
        label: "Raul Bautista",
      },
    ],
    lastVerified: "2026-11-20",
    breadcrumb: [
      {
        label: "GTA 6 Characters: Every Confirmed Character",
      },
    ],
  },
  {
    path: "/gta-6-gameplay",
    status: "scheduled",
    publishAt: "2026-09-21T13:00:00Z",
    title: "GTA 6 Gameplay: Everything Rockstar Has Officially Shown",
    seoTitle: "GTA 6 Gameplay: Everything Rockstar Has Officially Shown",
    metaDescription:
      "A fact-checked guide to GTA 6 gameplay shown by Rockstar, including driving, combat, character switching, police chases, activities and exploration.",
    primaryKeyword: "GTA 6 gameplay",
    intro: [
      "For years, “GTA 6 gameplay” searches returned a mixture of leaks, recreations and speculation. That changed with Rockstar's August 27 [Extended Look](/gta-6-trailers).",
      "We can now discuss GTA 6 using nearly 27 minutes of official in-game footage captured from the PS5 version.",
    ],
    sections: [
      {
        heading: "Core gameplay shown so far",
        body: [
          "Driving: Cars remain central to the GTA loop, but Leonida adds a wider mix of environments: dense Vice City streets, highways, island roads and rural/wetland routes.",
          "Character switching: Jason and Lucia can both be controlled, and the Extended Look visibly moves between them.",
          "Rockstar has not yet explained every rule governing when switching is available.",
          "Gunplay: The footage shows cover-based and open combat, close-range encounters and multiple firearms.",
          "Animations and weapon handling appear more deliberate than GTA V, although exact mechanical stats are not public.",
          "Police chases: Wanted-level encounters remain a major part of the game. The new footage includes police vehicles, pursuits and armed escalation.",
          "Rockstar has not published a full explanation of how detection and escalation work.",
          "Robberies and criminal jobs: The story premise itself begins with an easy score going wrong. The Extended Look also contains robbery-style situations and criminal planning.",
          "Robberies are clearly central to the story, but Rockstar has not documented a complete “dynamic robbery system.”",
          "Activities: Rockstar shows basketball, exercise, racing, water activities and other downtime.",
          "See [GTA 6 activities and minigames](/gta-6-activities) for a status-by-status list.",
          "Exploration and interiors: The showcase moves through apartments, nightlife spaces, stores and other interiors.",
          "This supports a denser interactive world but does not validate the “70% of buildings are enterable” style of viral claim.",
        ],
      },
      {
        heading: "World simulation",
        body: [
          "Perhaps the strongest impression from the footage is how much is happening around the player: pedestrians, traffic, social behavior, lighting, weather and environmental detail all work together.",
          "Rockstar appears to be using simulation density as a major generational step over GTA V.",
        ],
      },
      {
        heading: "What remains unknown",
        body: [
          "Rockstar has not fully documented the mission list, economy, property ownership, skill trees, inventory limits, wanted-level mechanics, mission replay, difficulty options, fast travel, performance modes, [online integration](/gta-6-online), [PC support](/system-requirements), progression or the exact map boundary.",
        ],
      },
      {
        heading: "Bottom line",
        body: [
          "The real GTA 6 gameplay picture is finally clearer: this is still an open-world crime game built around driving, shooting and exploration, but Rockstar is making the surrounding world significantly richer and more reactive.",
        ],
      },
      {
        heading: "The gameplay feature matrix",
        body: [
          "The August Extended Look finally gives GTA VI enough official in-game footage to describe gameplay as a set of systems rather than a run of trailer moments. Those systems are protagonists, movement, driving, combat, crime planning, wanted response, world interaction, activities, customization, economy and exploration.",
        ],
      },
      {
        heading: "Two-protagonist play",
        body: [
          "Jason and Lucia are the core playable pair. Official footage shows them together and apart, participating in robberies and daily life. Contemporary breakdowns identify switching behavior, but Rockstar has not yet published a complete ruleset for free-roam switching or mission restrictions.",
          "In short: two playable protagonists are confirmed, but the full switching system has not been formally documented.",
        ],
      },
      {
        heading: "Crime planning and robbery flow",
        body: [
          "The Extended Look spends meaningful time on robberies, escape driving and police pursuit. That suggests the crime loop involves more than arriving at a marker and shooting. PC Gamer highlights descriptions, tactical choices and crime-related UI observations.",
          "Not every robbery shown should be read as a GTA Online-style “heist system” with setup boards unless Rockstar shows that structure.",
        ],
      },
      {
        heading: "Combat and inventory",
        body: [
          "Official footage shows third-person shooting, in-car combat and a weapon wheel. PC Gamer reports more targeted aiming and a separate item-management feel. These observations can be tracked as individual mechanics with screenshots and timestamps.",
          "Individual weapons are covered on our [GTA 6 weapons page](/gta-6-weapons).",
        ],
      },
      {
        heading: "Police and wanted response",
        body: [
          "The footage and contemporary analysis point to a more descriptive police response: authorities may receive information about character appearance, vehicle and whether Jason and Lucia are together. A six-star wanted display is also observed in coverage of the Extended Look.",
          "Our [police and wanted-level guide](/wiki/gangs/police-system) covers this in more detail.",
        ],
      },
      {
        heading: "Driving, vehicles and damage",
        body: [
          "The showcase contains extended driving and a major pursuit. Media coverage notes crashes, tire shooting and environmental damage. Treat these as observed examples, not a complete vehicle-physics specification.",
          "Vehicle classes and customization rules are not covered here yet. Our [GTA 6 vehicles page](/gta-6-vehicles) tracks what Rockstar has shown.",
        ],
      },
      {
        heading: "Activities and lifestyle systems",
        body: [
          "Basketball, scuba diving, boating/kayaking, nightlife and domestic scenes appear across the Extended Look and current coverage. These moments support a broader “life between crimes” interpretation, but not every activity shown is confirmed as playable.",
        ],
      },
      {
        heading: "World simulation and NPC behavior",
        body: [
          "One reason the reveal feels different from older GTA footage is density: crowds, traffic, wildlife and social behavior are repeatedly foregrounded. WIRED and other outlets discuss more dynamic NPC behavior, while official footage provides the visual evidence.",
          "This page doesn’t use AI-system names unless Rockstar documents them, and describes only what the footage shows.",
        ],
      },
      {
        heading: "Gameplay features at a glance",
        body: [
          "Two playable protagonists - Confirmed; long-form PS5 in-game footage - Confirmed; character switching - Observed/reported; six-star wanted display - Observed; descriptive police information - Reported from footage analysis; basketball and scuba - Observed; PC features - Unknown; online systems - Unknown.",
        ],
      },
      {
        heading: "Mission design: what the reveal suggests and what it does not prove",
        body: [
          "The footage presents scripted robberies, shootouts and escapes, sometimes with cinematic transitions. That supports a familiar Rockstar mission structure with a strong narrative layer. It does not yet prove how open-ended mission solutions are, how often objectives can be approached in different orders, or whether every set piece shown is player-controlled throughout.",
        ],
      },
      {
        heading: "Lifestyle, customization and economy signals",
        body: [
          "Apartment scenes, clothing, vehicles, businesses and premium edition locations suggest a meaningful layer of lifestyle customization and spending. Rockstar has not yet published a complete economy or property system, so purchasable apartments, dynamic rent and business ownership are not confirmed unless shown or stated.",
        ],
      },
      {
        heading: "Accessibility and settings: still largely unknown",
        body: [
          "Rockstar has not yet published a full accessibility or options list for GTA VI. Settings from GTA V or Red Dead Redemption 2 should not be assumed to carry over.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
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
        label: "PC Gamer - GTA 6 Gameplay Reveal Breakdown",
        url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-gameplay-reveal-details-breakdown/",
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
        href: "/gta-6-vehicles",
        label: "GTA 6 Vehicles",
      },
      {
        href: "/gta-6-weapons",
        label: "GTA 6 Weapons",
      },
      {
        href: "/gta-6-activities",
        label: "GTA 6 Activities",
      },
      {
        href: "/wiki/gangs/police-system",
        label: "Police and Wanted System",
      },
    ],
    lastVerified: "2026-09-21",
    breadcrumb: [
      {
        label: "GTA 6 Gameplay: Everything Rockstar Has Officially Shown",
      },
    ],
  },
  {
    path: "/gta-6-leonida",
    status: "scheduled",
    publishAt: "2026-09-10T13:00:00Z",
    title: "GTA 6 Leonida Explained: Every Confirmed Region in Rockstar’s Florida-Inspired State",
    seoTitle: "GTA 6 Leonida: Where GTA 6 Takes Place and Every Region",
    metaDescription:
      "Leonida is GTA 6’s fictional Florida-inspired state. Learn what Rockstar has confirmed about Vice City, the Keys, Grassrivers and other regions.",
    primaryKeyword: "GTA 6 Leonida",
    intro: [
      "Leonida is the fictional US state where Grand Theft Auto VI takes place. [Vice City](/wiki/map/vice-city) sits inside it, but Rockstar's official world material makes clear that the game stretches across a much broader mix of urban, coastal, wetland, industrial and wilderness environments.",
      "This page explains where GTA 6 takes place. For the map's size, see our [GTA 6 map guide](/gta-6-map). For named cities and landmarks, see our [GTA 6 locations guide](/gta-6-locations).",
    ],
    sections: [
      {
        heading: "What is Leonida based on?",
        body: [
          "Leonida is Rockstar's satire-heavy interpretation of Florida.",
          "The name itself echoes “Florida,” while the environments draw from Miami, the Florida Keys, Everglades-style wetlands, beach towns, industrial communities and outdoor regions.",
          "It is not meant to preserve real Florida geography exactly.",
        ],
      },
      {
        heading: "Confirmed Leonida regions",
        body: [
          "Rockstar has named:",
          "Vice City",
          "Leonida Keys",
          "Grassrivers",
          "Port Gellhorn",
          "Ambrosia",
          "Mount Kalaga National Park",
        ],
      },
      {
        heading: "Why Leonida matters to GTA 6's design",
        body: [
          "GTA V's map was also geographically varied, but much of the player conversation centered on Los Santos.",
          "By branding GTA 6 around an entire fictional state, Rockstar has more room to make travel itself meaningful: dense city streets can give way to causeways, marshes, coastal towns and national-park terrain.",
          "That also creates natural contexts for very different vehicles and activities.",
        ],
      },
      {
        heading: "Leonida and the story",
        body: [
          "Jason's official biography ties him to the Keys and local drug runners. Lucia's history includes the Leonida Penitentiary.",
          "Other characters operate around Vice City's music, nightlife and robbery scenes.",
          "That makes the state more than a backdrop. Character biographies are already geographically connected to it.",
        ],
      },
      {
        heading: "Is Leonida bigger than GTA V's San Andreas?",
        body: [
          "Rockstar has used superlative language about the scale and immersion of GTA 6, and recent reporting has described an extremely large map.",
          "Rockstar has not published an official measurement, so exact square-mile comparisons are estimates or third-party reports.",
          "Our [GTA 6 map vs GTA 5 article](/analysis/gta-6-map-vs-gta-5) separates official claims from community measurements.",
        ],
      },
      {
        heading: "Bottom line",
        body: [
          "Think of Leonida as Rockstar's modern GTA-scale Florida: Vice City provides the recognizable urban icon, while the rest of the state gives the story and open world room to breathe.",
        ],
      },
      {
        heading: "Leonida is more than “Florida in GTA”",
        body: [
          "Leonida is Rockstar’s fictional state containing Vice City and the surrounding regions. The official region lineup spans tropical islands, wetlands, rundown coastal towns, industrial territory and national-park wilderness. That variety gives the state its own internal geography and economy.",
        ],
      },
      {
        heading: "A region matrix by environment and economy",
        body: [
          "Vice City: dense urban economy, nightlife and tourism. Leonida Keys: islands, boats and smuggling networks. Grassrivers: wetlands and wildlife. Port Gellhorn: rougher coastal economy. Ambrosia: industrial production. Mount Kalaga: wilderness and outdoor recreation. Reading the regions by environment and economy tells you something useful about each one without inventing mission content Rockstar has not shown.",
          "New official places will be added under these categories.",
        ],
      },
      {
        heading: "Story geography",
        body: [
          "Jason’s early connection to the Keys and Brian Heder gives the southern/coastal areas clear narrative importance. Lucia’s prison history anchors Leonida Penitentiary as another meaningful institution. Vice City then becomes the place where larger criminal, music and nightlife networks converge.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
        ],
      },
      {
        heading: "What is still not confirmed",
        body: [
          "Rockstar has not published an official measurement of Leonida or a full list of its towns.",
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
        label: "Rockstar Games - Only in Leonida: People & Places",
        url: "https://www.rockstargames.com/VI/only-in-leonida",
      },
      {
        label: "Rockstar Games - GTA VI Screenshots",
        url: "https://www.rockstargames.com/VI/downloads/screenshots",
      },
      {
        label: "GamesRadar - GTA 6 Locations",
        url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-locations/",
      },
    ],
    related: [
      {
        href: "/gta-6-map",
        label: "GTA 6 Map",
      },
      {
        href: "/gta-6-locations",
        label: "GTA 6 Locations",
      },
      {
        href: "/wiki/map/vice-city",
        label: "Vice City",
      },
    ],
    lastVerified: "2026-09-10",
    breadcrumb: [
      {
        label:
          "GTA 6 Leonida Explained: Every Confirmed Region in Rockstar’s Florida-Inspired State",
      },
    ],
  },
  {
    path: "/gta-6-locations",
    status: "scheduled",
    publishAt: "2026-09-08T13:00:00Z",
    title: "GTA 6 Locations: Every Confirmed City, Region and Landmark",
    seoTitle: "GTA 6 Locations: Every Confirmed City, Region and Landmark",
    metaDescription:
      "A fact-checked guide to every confirmed GTA 6 location in Leonida, from Vice City and the Keys to Grassrivers, Port Gellhorn and Mount Kalaga.",
    primaryKeyword: "GTA 6 locations",
    intro: [
      "Rockstar has confirmed that GTA 6 extends well beyond Vice City. The game takes place across Leonida, a fictional state inspired by Florida, and official promotional material has named six major areas so far.",
      "This page lists the named places in those areas. For how big the map is, see our [GTA 6 map guide](/gta-6-map).",
    ],
    sections: [
      {
        heading: "Confirmed major locations",
        body: [
          "Vice City",
          "Leonida Keys",
          "Grassrivers",
          "Port Gellhorn",
          "Ambrosia",
          "Mount Kalaga National Park",
          "These are official Rockstar names, not community labels.",
        ],
      },
      {
        heading: "Vice City",
        body: [
          "Vice City is the state's largest known urban center and GTA 6's modern take on Miami. Expect beachfront districts, luxury towers, nightlife, highways, dense commercial areas and neighborhoods far beyond the old 2002 game's footprint.",
        ],
      },
      {
        heading: "Leonida Keys",
        body: [
          "The Keys are central to Jason's backstory. Rockstar says he ended up there working for local drug runners after leaving the Army.",
          "The island geography also connects naturally to boats, fishing-style environments, diving and long causeways.",
        ],
      },
      {
        heading: "Grassrivers",
        body: [
          "Grassrivers is Leonida's wetland region, filled with marshes, wildlife and airboat imagery.",
          "It is one of the clearest examples of Rockstar taking a recognizable Florida environment and exaggerating it into a GTA setting.",
        ],
      },
      {
        heading: "Port Gellhorn",
        body: [
          "Port Gellhorn looks more weathered and working-class than Vice City. Its imagery suggests roadside businesses, waterfront structures and an older coastal economy.",
          "That tonal contrast is important: Rockstar is not presenting Leonida as one continuous luxury city.",
        ],
      },
      {
        heading: "Ambrosia",
        body: [
          "Ambrosia adds an industrial and small-town dimension to the map. Official materials point to factories and local commerce rather than tourism.",
        ],
      },
      {
        heading: "Mount Kalaga National Park",
        body: [
          "Mount Kalaga is a wilderness region with forests, outdoor recreation and higher terrain.",
          "Its inclusion makes Leonida geographically more varied than a literal copy of southern Florida.",
        ],
      },
      {
        heading: "What about real-world Miami landmarks?",
        body: [
          "Rockstar frequently parodies real places rather than copying their names. Trailer and screenshot analysis has identified clear visual inspirations from South Beach, Brickell, Wynwood, the Everglades and the Florida Keys.",
          "We label those as real-world inspirations unless Rockstar gives the in-game landmark an official name.",
        ],
      },
      {
        heading: "Are there more cities?",
        body: [
          "Very likely, but “likely” is not confirmation.",
          "Until Rockstar names additional settlements, they belong under observations or community mapping-not the official list.",
        ],
      },
      {
        heading: "Explore the world",
        body: [
          "Start here, then explore the individual guides:",
          "[GTA 6 Map](/gta-6-map)",
          "[Vice City](/wiki/map/vice-city)",
          "[Leonida](/gta-6-leonida)",
          "Leonida Keys",
          "Grassrivers",
        ],
      },
      {
        heading: "The six confirmed headline regions",
        body: [
          "The six headline regions are Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga National Park. All six come from Rockstar’s GTA VI site or official media.",
        ],
      },
      {
        heading: "Named places and businesses",
        body: [
          "Rockstar’s screenshots and edition benefits already name some institutions and businesses. Names that come only from leaks are kept out of this list.",
        ],
      },
      {
        heading: "Real-world comparisons need labels",
        body: [
          "Vice City is Rockstar’s fictional city in Leonida and is widely understood as Miami-inspired, but not every visual match is an official one-to-one counterpart. Unless Rockstar names the real-world source, this page uses words such as “resembles” or “appears inspired by.”",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
        ],
      },
      {
        heading: "What is still not confirmed",
        body: [
          "Rockstar has not placed every named business within a region, and a full list of towns and landmarks has not been verified here yet.",
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
        label: "Rockstar Games - Only in Leonida: People & Places",
        url: "https://www.rockstargames.com/VI/only-in-leonida",
      },
      {
        label: "Rockstar Games - GTA VI Screenshots",
        url: "https://www.rockstargames.com/VI/downloads/screenshots",
      },
      {
        label: "GamesRadar - GTA 6 Locations",
        url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-locations/",
      },
      {
        label: "PC Gamer - GTA 6 Map",
        url: "https://www.pcgamer.com/games/grand-theft-auto/gta6-map/",
      },
    ],
    related: [
      {
        href: "/gta-6-map",
        label: "GTA 6 Map",
      },
      {
        href: "/wiki/map/vice-city",
        label: "Vice City",
      },
      {
        href: "/gta-6-leonida",
        label: "Leonida",
      },
    ],
    lastVerified: "2026-09-08",
    breadcrumb: [
      {
        label: "GTA 6 Locations: Every Confirmed City, Region and Landmark",
      },
    ],
  },
  {
    path: "/gta-6-map",
    status: "scheduled",
    publishAt: "2026-09-07T13:00:00Z",
    title: "GTA 6 Map: Size, Regions and Cities of Leonida",
    seoTitle: "GTA 6 Map: Size, Regions and Cities of Leonida Explained",
    metaDescription:
      "How big is the GTA 6 map? Rockstar hasn't published an official square-mile figure. What's been reported about its size, plus every confirmed region and city.",
    primaryKeyword: "GTA 6 map",
    intro: [
      "GTA 6 is set in the fictional state of [Leonida](/gta-6-leonida), with Vice City as its central urban setting. Rockstar has named six headline regions: Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga National Park.",
      "How big is it? Rockstar has not published an official square-mile or square-kilometre measurement. Press reports from a visit to Rockstar North describe Leonida as roughly twice the size of GTA V's map. That is third-party reporting, not an official Rockstar measurement.",
      "This page covers the map's size and regions. For a list of named cities and landmarks, see our [GTA 6 locations guide](/gta-6-locations).",
    ],
    sections: [
      {
        heading: "Confirmed GTA 6 regions",
        table: {
          head: ["Location", "What Rockstar has shown"],
          rows: [
            ["Vice City", "Main urban center; modern Miami-inspired city"],
            ["Leonida Keys", "Tropical island chain and coastal roads"],
            ["Grassrivers", "Wetlands inspired by South Florida ecosystems"],
            ["Port Gellhorn", "Coastal community/region"],
            ["Ambrosia", "Industrial/smaller-town Leonida setting"],
            ["Mount Kalaga National Park", "Northern wilderness and outdoor region"],
          ],
        },
      },
      {
        heading: "Vice City",
        body: [
          "Vice City is GTA 6's headline location, returning decades after its earlier versions in the franchise.",
          "This is not simply a remaster of the 2002 map. Rockstar is building a modern metropolitan region shaped by beaches, towers, nightlife, highways, ports, social-media culture and suburban sprawl.",
          "Our [Vice City guide](/wiki/map/vice-city) covers the city in more detail.",
        ],
      },
      {
        heading: "Leonida Keys",
        body: [
          "Official character material places Jason in the Keys, where he works around local drug runners. Screenshots show bridges, marinas, tropical water and low-rise communities.",
          "The region gives GTA 6 a natural reason to make boats, diving and coastal travel more important.",
        ],
      },
      {
        heading: "Grassrivers",
        body: [
          "Grassrivers is Rockstar's wetland region and an obvious satire/interpretation of the Florida Everglades.",
          "Alligators, airboats, marshes and wildlife imagery give it a completely different travel rhythm from downtown Vice City.",
        ],
      },
      {
        heading: "Port Gellhorn",
        body: [
          "Port Gellhorn appears to represent a rougher coastal city or town outside Vice City's glamour. Rockstar's location art suggests older commercial strips, waterfront infrastructure and a less polished side of Leonida.",
        ],
      },
      {
        heading: "Ambrosia",
        body: [
          "Ambrosia expands the state beyond tourism and beaches. Official art points toward industry and a small-town or working-class environment, which could help missions feel geographically distinct.",
        ],
      },
      {
        heading: "Mount Kalaga National Park",
        body: [
          "Mount Kalaga adds wilderness, elevation and outdoor exploration to a state otherwise associated with flat South Florida imagery.",
          "Rockstar's official location list is important here: GTA 6's Leonida is an exaggerated fictional state, not a one-to-one recreation of real Florida geography.",
        ],
      },
      {
        heading: "How big is the GTA 6 map?",
        body: [
          "Short answer: Rockstar has not published an official measurement of the GTA 6 map. The most widely repeated comparison, that Leonida is roughly twice the size of GTA V's map, comes from press reporting, not from a Rockstar size figure.",
          "Rockstar calls GTA VI the biggest and most immersive evolution of the series. The table below separates what Rockstar has stated from what has been reported and what fans have estimated.",
        ],
        table: {
          head: ["Claim", "Status", "Where it comes from"],
          rows: [
            [
              "Official square-mile or square-kilometre size",
              "Not published",
              "Rockstar has not released a map measurement",
            ],
            [
              "Leonida is roughly twice the size of GTA V's map",
              "Reported (third party)",
              "TweakTown, October 2026, citing Edge magazine's visit to Rockstar North",
            ],
            [
              "Total landmass nearly as large as the playable maps of GTA IV, GTA V and Red Dead Redemption 2 combined",
              "Reported (third party)",
              "TweakTown, October 2026, paraphrasing the same Edge report",
            ],
            [
              "Exact area figures from fan maps",
              "Community estimate",
              "Reconstructions from footage; figures vary and none is official",
            ],
          ],
        },
      },
      {
        heading: "Comparing the GTA 6 map with GTA V",
        body: [
          "GTA V's Los Santos and Blaine County map is a useful reference point, but a simple multiplier such as “twice as large” depends on what is being measured: total land area, drivable area, water or built-up space. Until Rockstar publishes a measurement, treat any multiplier as reported rather than official.",
          "The firmer comparison is the world's composition: GTA VI spans several named regions across a whole state, rather than one city and its surrounding county.",
        ],
      },
      {
        heading: "Cities and towns in GTA 6",
        body: [
          "Of Rockstar's six headline regions, only Vice City is presented as a major city. The other five are different kinds of places: coastal and industrial communities, an island chain, wetlands and a national park.",
        ],
        table: {
          head: ["Place", "What kind of place it is", "Status"],
          rows: [
            ["Vice City", "Main city; modern, Miami-inspired metropolis", "Confirmed"],
            [
              "Port Gellhorn",
              "Rougher coastal community outside Vice City's glamour",
              "Region confirmed; character observed from official art",
            ],
            [
              "Ambrosia",
              "Industrial, smaller-town, working-class setting",
              "Region confirmed; character observed from official art",
            ],
            [
              "Leonida Keys",
              "Island chain with bridges, marinas and low-rise communities",
              "Region confirmed; details observed in screenshots",
            ],
            ["Grassrivers", "Wetlands, not a town", "Confirmed"],
            ["Mount Kalaga National Park", "Wilderness, not a town", "Confirmed"],
          ],
        },
      },
      {
        heading: "Is Vice City the whole GTA 6 map?",
        body: [
          "No. Vice City is the headline location, but it is one of six named regions. The rest of Leonida adds the Keys, the Grassrivers wetlands, Port Gellhorn, Ambrosia and Mount Kalaga National Park around it.",
        ],
      },
      {
        heading: "Is the GTA 6 map based on Florida?",
        body: [
          "Loosely. Leonida is Rockstar's fictional, Florida-inspired state: Vice City is a modern, Miami-inspired city, and Grassrivers reads as Rockstar's take on the Everglades.",
          "It is not a one-to-one recreation of real Florida geography. Mount Kalaga's wilderness and elevation, for example, have no direct South Florida equivalent.",
        ],
      },
      {
        heading: "Region-by-region gameplay contrast",
        body: [
          "Vice City is the dense urban and cultural anchor. Leonida Keys provide tropical islands, bridges, marinas and a smuggling context linked to Jason and Brian Heder. Grassrivers provide wetlands and wildlife. Port Gellhorn presents a rougher coastal environment. Ambrosia adds an industrial interior economy. Mount Kalaga National Park introduces wilderness, hunting/fishing imagery and northern escape terrain.",
          "This diversity matters more than an unverified square-mile number. It tells users what kinds of play spaces Rockstar is building and why the world may feel larger in practice even before exact dimensions are known.",
        ],
      },
      {
        heading: "Official sublocations and named entities",
        body: [
          "The official media and edition material already exposes smaller place and business names such as Leonida Penitentiary, Rideout Customs Mod Shop, Sara’s Unisex Salon, Stock 305 Clothing Store, Electric Fang Tattoo Parlor, One-Eyed Willie’s Mod Shop and the PTT Youngin$ location. Rockstar has not yet placed every one of these within a specific region.",
          "Our [GTA 6 locations guide](/gta-6-locations) lists these named places in one index.",
        ],
      },
      {
        heading: "Rockstar's official screenshots",
        body: [
          "Rockstar’s official media library includes dozens of GTA VI screenshots, with dedicated image sets for major characters and regions, plus location postcards and artwork. Rockstar added a launch gallery on November 5, 2026. Those first-party images are the most reliable way to see what each region looks like, ahead of community map reconstructions.",
        ],
      },
      {
        heading: "Character geography adds another map layer",
        body: [
          "Jason is tied to the Leonida Keys and Brian Heder’s smuggling network. Lucia is tied to Leonida Penitentiary and the broader Vice City story. Boobie Ike, Dre’Quan Priest and Real Dimez are strongly connected to Vice City’s nightlife and music economy. Those relationships help readers understand where narrative networks may cluster even before a final map is released.",
          "A character can be associated with a region without Rockstar having published the precise address of a business or safehouse, so these links describe where each story network sits, not exact map positions.",
        ],
      },
      {
        heading: "Is the leaked GTA 6 map official?",
        body: [
          "No. A leak can come from genuine development material without being the final map, and development builds change. Place names from leaked or reconstructed maps are not added to the confirmed region table on this page.",
          "Official named regions and Rockstar's own footage are the reliable layer. Community maps are useful for discussion, but treat them as reconstructions.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
        ],
      },
      {
        heading: "What is still not confirmed",
        body: [
          "Rockstar has not published an official measurement of the map or the region placement of every named business. Where the evidence stops, this page says “not published” or “not confirmed” rather than turning an estimate into a fact.",
        ],
      },
      {
        heading: "Bottom line",
        body: [
          "The GTA 6 map is a state-scale world centred on Vice City. The confirmed regions cover dense city streets, islands, wetlands, industrial areas, coastal communities and national-park wilderness. Reports put it at roughly twice the size of GTA V's map, but Rockstar has not published an official measurement.",
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
        label: "Rockstar Games - Only in Leonida: People & Places",
        url: "https://www.rockstargames.com/VI/only-in-leonida",
      },
      {
        label: "Rockstar Games - GTA VI Screenshots",
        url: "https://www.rockstargames.com/VI/downloads/screenshots",
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
        label: "GamesRadar - GTA 6 Locations",
        url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-locations/",
      },
      {
        label:
          "TweakTown - GTA 6's map is roughly twice GTA 5's (reporting Edge magazine, October 2026)",
        url: "https://www.tweaktown.com/news/114382/gta-6s-map-is-roughly-twice-gta-5s-and-almost-as-big-as-gta-4-gta-5-and-rdr2-combined/index.html",
      },
    ],
    related: [
      {
        href: "/gta-6-locations",
        label: "GTA 6 Locations",
      },
      {
        href: "/wiki/map/vice-city",
        label: "Vice City",
      },
      {
        href: "/gta-6-leonida",
        label: "Leonida",
      },
      {
        href: "/analysis/gta-6-map-vs-gta-5",
        label: "GTA 6 map vs GTA 5: how Leonida compares",
      },
    ],
    lastVerified: "2026-11-20",
    breadcrumb: [
      {
        label: "GTA 6 Map: Size, Regions and Cities of Leonida",
      },
    ],
  },
  {
    path: "/gta-6-online",
    status: "scheduled",
    publishAt: "2026-09-30T13:00:00Z",
    title: "GTA 6 Online: What Rockstar Has Actually Confirmed - and What It Hasn’t",
    seoTitle: "GTA 6 Online: What Rockstar Has Actually Confirmed - and What It Hasn’t",
    metaDescription:
      "Will GTA 6 have an online mode? Here’s what Rockstar and Take-Two have actually confirmed, what GTA+ means, and what remains speculation.",
    primaryKeyword: "GTA 6 Online",
    intro: [
      "GTA 6 is out now, but Rockstar has described Grand Theft Auto VI as a single-player experience, and its GTA VI website does not mention a GTA VI online mode.",
      "That does not mean Rockstar is abandoning GTA Online. It means there is a difference between what seems likely and what has been formally announced for GTA 6.",
    ],
    sections: [
      {
        heading: "What is confirmed",
        body: [
          "Take-Two's June 2026 announcement describes GTA 6 as a single-player experience for [PS5 and Xbox Series X|S](/gta-6-platforms). The game [launched on November 19, 2026](/gta-6-release-date).",
          "GTA+ continues to exist as Rockstar's subscription tied to the “ever-evolving world of GTA Online” and other benefits. Digital GTA 6 pre-orders currently include a free month of GTA+.",
        ],
      },
      {
        heading: "What is not yet fully confirmed",
        body: [
          "Rockstar has not published a detailed announcement covering:",
          "the name of a GTA 6-era online product;",
          "its launch date;",
          "whether it launches day one with the single-player game;",
          "character transfer from current GTA Online;",
          "map access rules;",
          "pricing or standalone availability;",
          "player counts;",
          "cross-platform play.",
          "Any page giving definite answers to those questions needs evidence stronger than “Rockstar would obviously do it.”",
        ],
      },
      {
        heading: "Will GTA 6 eventually have online multiplayer?",
        body: [
          "It would be surprising if Rockstar did not build on GTA Online's enormous success, and Take-Two continues to discuss GTA Online as an evolving business.",
          "But a likely business decision is not the same as an announcement.",
          "The useful answer today is: an online future is highly plausible, but the GTA 6-specific structure and timing are not yet officially detailed.",
        ],
      },
      {
        heading: "Does GTA+ prove GTA 6 Online launches immediately?",
        body: [
          "No.",
          "The free GTA+ month attached to digital GTA 6 pre-orders can be used with current GTA Online and the GTA+ Games Library. It is not proof of a GTA 6 multiplayer mode at launch.",
        ],
      },
      {
        heading: "Open questions about GTA 6 Online",
        body: [
          "Players are still waiting for answers to five practical questions:",
          "Is GTA 6 multiplayer available at launch?",
          "Does the new online world use the full Leonida map?",
          "Do GTA Online purchases or characters transfer?",
          "Will cross-play be supported?",
          "What role will GTA+ have?",
          "Until Rockstar answers them, this page lists them as not announced.",
        ],
      },
      {
        heading: "Bottom line",
        body: [
          "GTA 6's single-player release is fully dated and priced. Its next-generation online plan is not yet explained in comparable detail.",
          "That is not a weakness in this guide-it is the most accurate answer available before Rockstar publishes more.",
        ],
      },
      {
        heading: "What Rockstar has actually confirmed",
        body: [
          "Rockstar’s June 2026 pre-order announcement describes GTA VI as a single-player experience, and the game launched on November 19, 2026. As of November 21, 2026, Rockstar’s GTA VI website does not mention a GTA VI online mode, launch date, feature list or branding.",
          "That is the starting point here, rather than an assumption that “GTA 6 Online” is a day-one product.",
        ],
      },
      {
        heading: "GTA+ does not equal a GTA VI Online announcement",
        body: [
          "Digital GTA VI preorders include a free month of GTA+, and Take-Two describes GTA+ as a way to get more from the evolving world of GTA Online and access classic Rockstar titles. This is a current subscription benefit, not by itself proof of a specific GTA VI multiplayer launch schedule.",
          "GTA+, current GTA Online and any future GTA VI-era multiplayer are separate things.",
        ],
      },
      {
        heading: "What remains unknown",
        body: [
          "Unknowns include launch timing, whether the online product uses a new name, cross-platform rules, player counts, progression carryover, monetization structure and whether it ships alongside or after the single-player release. All of these remain unknown until Rockstar publishes details.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
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
        label: "Take-Two - Rockstar Games Announces Pre-Orders for Grand Theft Auto VI",
        url: "https://www.take2games.com/ir/news/rockstar-games-announces-pre-orders-grand-theft-auto-vi",
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
        href: "/gta-6-gameplay",
        label: "GTA 6 Gameplay",
      },
      {
        href: "/gta-6-release-date",
        label: "GTA 6 Release Date",
      },
    ],
    lastVerified: "2026-11-21",
    breadcrumb: [
      {
        label: "GTA 6 Online: What Rockstar Has Actually Confirmed - and What It Hasn’t",
      },
    ],
  },
  {
    path: "/gta-6-pc-release-date",
    status: "draft",
    title: "GTA 6 PC Release Date: What Rockstar Has Confirmed So Far",
    seoTitle: "GTA 6 PC Release Date: What Rockstar Has Confirmed So Far",
    metaDescription:
      "Rockstar has not announced a GTA 6 PC release date. Here’s what is confirmed, Rockstar’s past PC timelines and what we should not assume.",
    primaryKeyword: "GTA 6 PC release date",
    intro: [
      "Short answer: Rockstar has not announced a GTA 6 PC release date.",
      "The confirmed November 19, 2026 launch covers PlayStation 5 and Xbox Series X|S. Any page giving you an exact GTA 6 PC day or month right now is making a prediction unless it can point to a new Rockstar announcement.",
    ],
    sections: [
      {
        heading: "Current GTA 6 PC status",
        table: {
          head: ["Question", "Answer"],
          rows: [
            ["Is GTA 6 confirmed for PC?", "No"],
            ["Is there an official PC date?", "No"],
            ["Is PC included at console launch?", "No"],
            ["Are official PC requirements available?", "No"],
            [
              "Could a later PC version happen?",
              "Yes, based on Rockstar history, but timing is unconfirmed",
            ],
          ],
        },
      },
      {
        heading: "What Rockstar's history tells us",
        body: [
          "GTA V launched on PS3/Xbox 360 in September 2013 and reached PC in April 2015, roughly 18 months later.",
          "Red Dead Redemption 2 launched on consoles in October 2018 and on PC in November 2019, roughly 13 months later.",
          "Those examples explain why many forecasts place GTA 6 PC well after the console launch. They do not prove GTA 6 will repeat either gap.",
        ],
      },
      {
        heading: "Why Rockstar may launch PC later",
        body: [
          "A later PC release gives Rockstar additional optimization time across a huge range of hardware configurations and may allow the company to focus launch testing on a smaller number of console targets.",
          "There are also obvious commercial advantages to staggered releases.",
          "Those are reasonable explanations, but Rockstar has not published a formal “why GTA 6 is console-first” technical statement.",
        ],
      },
      {
        heading: "Could GTA 6 PC arrive in 2027?",
        body: [
          "It is possible. So is 2028.",
          "The responsible way to write this before an announcement is to describe historical ranges and evidence-not turn them into a “likely date” that gets repeated as fact.",
          "If Rockstar follows the 13-18 month gaps seen with RDR2 and GTA V, late 2027 into 2028 would fit precedent. That is historical-context analysis, not a confirmed window.",
        ],
      },
      {
        heading: "Beware fake PC pre-orders and requirements",
        body: [
          "Rockstar's official GTA 6 pre-orders currently cover PS5 and Xbox Series X|S.",
          "Until Rockstar announces PC, avoid:",
          "“official” GTA 6 PC keys;",
          "fake Steam pages;",
          "precise GPU/CPU requirement charts;",
          "claimed PC preload dates;",
          "unofficial benchmark videos presented as real.",
          "See GTA 6 PC requirements for the difference between confirmed facts and estimates.",
        ],
      },
      {
        heading: "Bottom line",
        body: [
          "There is no GTA 6 PC release date today.",
          "Bookmark this page rather than a rumor: when Rockstar announces a PC edition, this page will be updated with the official date, storefronts and system requirements.",
        ],
      },
      {
        heading: "The answer today",
        body: [
          "Rockstar has not announced a GTA VI PC release date. Its official platform pages list PS5 and Xbox Series X|S for November 19, 2026. Any specific PC date circulating today is therefore a prediction, leak or placeholder unless Rockstar changes that status.",
        ],
      },
      {
        heading: "Historical Rockstar PC timing",
        body: [
          "GTA V launched on PS3 and Xbox 360 in September 2013 and reached PC in April 2015, roughly 19 months later. Red Dead Redemption 2 launched on consoles in October 2018 and reached PC in November 2019, roughly 13 months later. These examples show that Rockstar has previously staggered major PC launches.",
          "They do not create a reliable GTA VI release window. Platform strategy, development scope and commercial timing can change across generations.",
        ],
      },
      {
        heading: "What counts as real evidence for a PC version",
        body: [
          "A Rockstar Newswire post, official platform listing, Take-Two release schedule or Rockstar Support update would be strong evidence. Retail database entries, speculative hardware requirement pages and “insider” dates should remain outside the confirmed box.",
          "When PC is eventually announced, this page will switch from managing predictions to covering requirements, storefronts, features and how the PC launch compares with the console one.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
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
        label: "Rockstar Support - GTA VI Platforms, Editions, and Versions",
        url: "https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions",
      },
      {
        label: "PC Gamer - GTA 6 PC Release Date",
        url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-pc-release-date/",
      },
      {
        label: "PC Gamer - GTA 6: What We Know",
        url: "https://www.pcgamer.com/grand-theft-auto/gta-6-guide/",
      },
    ],
    related: [
      {
        href: "/gta-6-platforms",
        label: "GTA 6 Platforms",
      },
      {
        href: "/system-requirements",
        label: "GTA 6 PC System Requirements",
      },
    ],
    lastVerified: "2026-08-29",
    breadcrumb: [
      {
        label: "GTA 6 PC Release Date: What Rockstar Has Confirmed So Far",
      },
    ],
  },
  {
    path: "/gta-6-platforms",
    status: "scheduled",
    publishAt: "2026-09-04T13:00:00Z",
    title: "What Platforms Is GTA 6 On? PS5, Xbox Series X|S and PC Status",
    seoTitle: "What Platforms Is GTA 6 On? PS5, Xbox Series X|S and PC Status",
    metaDescription:
      "GTA 6 launched on PS5 and Xbox Series X|S on November 19, 2026. Rockstar has not announced a PC version, and there is no PS4 or Xbox One version.",
    primaryKeyword: "GTA 6 platforms",
    intro: [
      "GTA 6 is out now. It launched on PlayStation 5 and Xbox Series X|S on November 19, 2026.",
      "Rockstar has not announced a PC version, and PS4 and Xbox One are not supported.",
      "This page covers which consoles run GTA 6. For PC news and specs, see our [GTA 6 PC requirements page](/system-requirements).",
    ],
    sections: [
      {
        heading: "GTA 6 platform status",
        table: {
          head: ["Platform", "Status"],
          rows: [
            ["PlayStation 5", "Confirmed"],
            ["PS5 Pro", "Supported / PS5 Pro Enhanced listing"],
            ["Xbox Series X", "Confirmed"],
            ["Xbox Series S", "Confirmed"],
            ["PC", "Not announced"],
            ["PlayStation 4", "Not announced"],
            ["Xbox One", "Not announced"],
            ["Nintendo platforms", "Not announced"],
          ],
        },
      },
      {
        heading: "GTA 6 on PS5",
        body: [
          "PlayStation's official listing includes GTA 6 for PS5 and marks it as PS5 Pro Enhanced. It also lists DualSense vibration and trigger-effect support.",
          "The August 27 Extended Look was captured from the PS5 version, giving players a real example of the game's presentation on console hardware.",
        ],
      },
      {
        heading: "GTA 6 on Xbox Series X and Series S",
        body: [
          "Rockstar consistently names Xbox Series X|S, which means Series S is part of the confirmed launch plan rather than an afterthought.",
          "Rockstar has not published a detailed comparison of Series X and Series S performance modes.",
        ],
      },
      {
        heading: "Is GTA 6 coming to PC?",
        body: [
          "Possibly later, but “possibly” is not the same as confirmed.",
          "Rockstar has not announced the PC edition or PC system requirements. Historical release patterns make a later port plausible, but that history is not a release date.",
          "Our [GTA 6 PC requirements page](/system-requirements) tracks the PC status.",
        ],
      },
      {
        heading: "Why isn't GTA 6 on PS4 or Xbox One?",
        body: [
          "Rockstar has not provided a detailed technical explanation, but those consoles are simply absent from the announced platform list.",
          "GTA 6's world density, modern rendering, CPU-heavy simulation and storage expectations make current-generation hardware the natural target. That is analysis, however-not an official statement that one specific technical feature “made” last-gen versions impossible.",
        ],
      },
      {
        heading: "Bottom line",
        body: [
          "Buying now? Your choices are PS5/PS5 Pro or Xbox Series X|S.",
          "Waiting for PC? Wait for Rockstar, not a retailer placeholder or rumor account.",
        ],
      },
      {
        heading: "Platform status at a glance",
        body: [
          "PS5: available since November 19, 2026. PS5 Pro: the PlayStation Store labels GTA VI as PS5 Pro Enhanced. Xbox Series X|S: available since November 19, 2026. PC: not announced. PS4 and Xbox One: not announced and not supported.",
        ],
      },
      {
        heading: "What PS5-specific information is official",
        body: [
          "PlayStation’s product page lists DualSense vibration and trigger-effect support, Remote Play, offline play for one player and PS5 Pro Enhanced status. These details come directly from PlayStation's store listing.",
          "This page doesn’t assume equivalent Xbox controller features unless Microsoft or Rockstar documents them.",
        ],
      },
      {
        heading: "Is GTA 6 on PS4 or Xbox One?",
        body: [
          "No. Rockstar has not announced PS4 or Xbox One versions, and its GTA VI website lists only PlayStation 5 and Xbox Series X|S. Rockstar has not said those older consoles “cannot run” the game; they are simply not supported.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
        ],
      },
      {
        heading: "What is still not confirmed",
        body: [
          "Rockstar has not announced a PC version, a PC release date or PC system requirements, and it has not published a Series X vs Series S performance comparison.",
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
        label: "Rockstar Games - Grand Theft Auto VI",
        url: "https://www.rockstargames.com/VI",
      },
      {
        label: "Rockstar Support - GTA VI Platforms, Editions, and Versions",
        url: "https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions",
      },
      {
        label: "PlayStation Store - Grand Theft Auto VI",
        url: "https://store.playstation.com/en-us/product/EP1004-PPSA01547_00-GTAVISTANDARD001",
      },
    ],
    related: [
      {
        href: "/news/gta-6-limited-edition-dualsense-controller",
        label: "GTA 6 Limited Edition DualSense Controllers",
      },
      {
        href: "/system-requirements",
        label: "GTA 6 PC System Requirements",
      },
      {
        href: "/gta-6-release-date",
        label: "GTA 6 Release Date",
      },
    ],
    lastVerified: "2026-11-21",
    breadcrumb: [
      {
        label: "What Platforms Is GTA 6 On? PS5, Xbox Series X|S and PC Status",
      },
    ],
  },
  {
    path: "/gta-6-price",
    status: "scheduled",
    publishAt: "2026-09-01T13:00:00Z",
    title: "GTA 6 Price Confirmed: Standard and Ultimate Edition Cost Explained",
    seoTitle: "GTA 6 Price Confirmed: Standard and Ultimate Edition Cost Explained",
    metaDescription:
      "GTA 6 costs $79.99 for the Standard Edition and $99.99 for Ultimate in the US. See confirmed pricing, regional differences and what you get.",
    primaryKeyword: "GTA 6 price",
    intro: [
      "GTA 6 has an official price. The Standard Edition costs $79.99 in the United States, while the Ultimate Edition costs $99.99.",
      "Those prices were announced by Take-Two and are reflected on Rockstar and PlayStation storefronts.",
      "This page covers what each edition costs. For the full list of Ultimate Edition contents, see our [GTA 6 Ultimate Edition guide](/gta-6-ultimate-edition). If you're deciding which one to buy, read [Standard vs Ultimate: which edition to buy](/analysis/gta-6-standard-vs-ultimate).",
    ],
    sections: [
      {
        heading: "Confirmed US pricing",
        body: [
          "This ends years of speculation that GTA 6 might launch at $100, $120 or another unusually high base price.",
        ],
        table: {
          head: ["Edition", "Price"],
          rows: [
            ["GTA 6 Standard Edition", "$79.99"],
            ["GTA 6 Ultimate Edition", "$99.99"],
            ["Difference", "$20"],
          ],
        },
      },
      {
        heading: "Why is the Standard Edition $79.99?",
        body: [
          "GTA 6 is entering the market above the $69.99 price that became common for many premium console releases earlier in the generation.",
          "Take-Two has not framed the $79.99 tag as a universal new industry standard; it is simply the announced US price for GTA 6.",
          "The more useful question for buyers is whether that price includes the full core game. Rockstar's material presents the Standard Edition as the complete GTA 6 single-player experience.",
        ],
      },
      {
        heading: "What do you get for $99.99?",
        body: [
          "Ultimate includes the base game plus premium vehicles, weapons, styles and other content associated with Jason and Lucia's story.",
          "The difference is content, not earlier release timing. Rockstar has not announced an Ultimate-only early-access window.",
          "See [GTA 6 Ultimate Edition](/gta-6-ultimate-edition) for the itemized list.",
        ],
      },
      {
        heading: "Will GTA 6 cost the same everywhere?",
        body: [
          "No. Regional pricing, taxes and platform storefront policies can change the final amount.",
          "Use the price shown by the official PlayStation, Xbox or Rockstar storefront in your country. A converted US price is not necessarily what players elsewhere will pay.",
        ],
      },
      {
        heading: "What about physical copies?",
        body: [
          "Rockstar's current physical product is described as a code-in-box version. The box does not contain a game disc.",
          "That is especially important for buyers who associate “physical edition” with disc ownership or resale.",
        ],
      },
      {
        heading: "Are pre-orders more expensive?",
        body: [
          "The Standard and Ultimate pre-order listings use the normal announced edition prices. Pre-ordering adds eligible bonuses; it does not create a separate base-game price tier.",
        ],
      },
      {
        heading: "Is GTA 6 worth $79.99?",
        body: [
          "That depends on what you want from it. The package is one of Rockstar's largest single-player releases, with a new Leonida setting, dual protagonists, and a much broader open-world presentation than GTA V.",
          "Value is ultimately personal, and hype is not a review score.",
        ],
      },
      {
        heading: "Bottom line",
        body: [
          "The official US starting price is $79.99, not $100. Ultimate is $99.99.",
          "If you only want the game, Standard is the lower-cost choice. If you want the additional content bundle, compare [Standard vs Ultimate](/analysis/gta-6-standard-vs-ultimate).",
        ],
      },
      {
        heading: "Official US price",
        body: [
          "Take-Two’s June 24 announcement sets GTA VI at $79.99 for the Standard Edition and $99.99 for the Ultimate Edition in the United States. Rockstar Store and PlayStation Store listings corroborate the $79.99 Standard price, while PlayStation surfaces the $99.99 Ultimate price.",
          "This is stronger evidence than retailer rumor or analyst expectations because it comes from the publisher and platform storefronts.",
        ],
      },
      {
        heading: "Prices outside the US",
        body: [
          "A US MSRP converted with a currency calculator is not another country’s official price. Regional storefronts may use different list prices, taxes and local policies, so regional figures appear here only once a platform or the Rockstar Store publishes them.",
          "That same rule applies to sales. A temporary retailer discount is not a new MSRP.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
        ],
      },
      {
        heading: "What is still not confirmed",
        body: [
          "This page lists the US prices Rockstar announced. Official prices for other countries appear here only once a storefront publishes them.",
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
        label: "Take-Two - Rockstar Games Announces Pre-Orders for Grand Theft Auto VI",
        url: "https://www.take2games.com/ir/news/rockstar-games-announces-pre-orders-grand-theft-auto-vi",
      },
      {
        label: "Rockstar Store - Grand Theft Auto VI",
        url: "https://store.rockstargames.com/game/buy-gta-vi",
      },
      {
        label: "PlayStation Store - Grand Theft Auto VI",
        url: "https://store.playstation.com/en-us/product/EP1004-PPSA01547_00-GTAVISTANDARD001",
      },
    ],
    related: [
      {
        href: "/news/gta-6-limited-edition-dualsense-controller",
        label: "GTA 6 Limited Edition DualSense Controllers",
      },
      {
        href: "/gta-6-ultimate-edition",
        label: "GTA 6 Ultimate Edition",
      },
      {
        href: "/analysis/gta-6-standard-vs-ultimate",
        label: "Standard vs Ultimate",
      },
      {
        href: "/gta-6-release-date",
        label: "GTA 6 Release Date",
      },
    ],
    lastVerified: "2026-11-21",
    breadcrumb: [
      {
        label: "GTA 6 Price Confirmed: Standard and Ultimate Edition Cost Explained",
      },
    ],
  },
  {
    path: "/gta-6-release-date",
    status: "scheduled",
    publishAt: "2026-08-31T13:00:00Z",
    title: "GTA 6 Release Date: Out Now Since November 19, 2026",
    seoTitle: "GTA 6 Release Date: Out Now on PS5 and Xbox Series X|S",
    metaDescription:
      "GTA 6 launched November 19, 2026 on PS5 and Xbox Series X|S. Rockstar hasn't announced a PC version. Platforms, editions, price and how the date changed.",
    primaryKeyword: "GTA 6 release date",
    intro: [
      "GTA 6 is out now. Grand Theft Auto VI launched on Thursday, November 19, 2026 for PlayStation 5 and Xbox Series X|S. Rockstar has not announced a PC version or a PC release date.",
      "November 19 was the date Rockstar confirmed after moving GTA 6 later in its development schedule. It appeared consistently across Rockstar's GTA VI website, Rockstar Store, PlayStation Store and Take-Two investor communications, and Rockstar announced the game's availability on launch day.",
      "This page covers when GTA 6 came out and how the date changed. For PC status, see our [GTA 6 PC requirements page](/system-requirements). For what it costs, see our [GTA 6 price guide](/gta-6-price).",
    ],
    sections: [
      {
        heading: "GTA 6 release details",
        table: {
          head: ["Question", "Confirmed answer"],
          rows: [
            ["GTA 6 release date", "November 19, 2026 (out now)"],
            ["PS5", "Yes"],
            ["PS5 Pro Enhanced", "Listed by PlayStation"],
            ["Xbox Series X|S", "Yes"],
            ["PC", "Not announced"],
            ["PS4", "Not announced; not a launch platform"],
            ["Xbox One", "Not announced; not a launch platform"],
            ["Digital pre-load", "Opened before launch for eligible digital pre-orders"],
          ],
        },
      },
      {
        heading: "Why the date changed",
        body: [
          "Rockstar said the additional development time was needed to finish the game with the level of polish players expect. That explanation came directly from Rockstar when it announced the November 19 date.",
          "Rockstar kept to that date, and the game launched on November 19, 2026.",
        ],
      },
      {
        heading: "What platforms is GTA 6 on?",
        body: [
          "GTA 6 is available on [PlayStation 5 and Xbox Series X|S](/gta-6-platforms).",
          "The PlayStation Store also lists the game as PS5 Pro Enhanced and notes support for DualSense vibration and trigger effects. Xbox Series S is included under Rockstar's Xbox Series X|S announcement.",
          "There is no official PS4 or Xbox One version.",
        ],
      },
      {
        heading: "Is GTA 6 on PC?",
        body: [
          "No. Rockstar has not announced GTA 6 for PC, and its official GTA VI website lists only PlayStation 5 and Xbox Series X|S.",
          "Previous Rockstar releases are useful historical context but not a release schedule. GTA V arrived on PC well after its original console launch, while Red Dead Redemption 2 also reached PC after the console version. Those gaps show that a later PC release would not be unusual, but they do not prove a particular GTA 6 date.",
          "Our [GTA 6 PC requirements page](/system-requirements) tracks the PC status.",
        ],
      },
      {
        heading: "Could GTA 6 be preloaded?",
        body: [
          "Yes. Rockstar let eligible digital pre-orders pre-load the game ahead of the November 19 launch.",
        ],
      },
      {
        heading: "How much does GTA 6 cost?",
        body: [
          "[US pricing](/gta-6-price) is:",
          "Standard Edition: $79.99",
          "Ultimate Edition: $99.99",
          "Rockstar's pre-order offer included the Vintage Vice City Pack for pre-orders and qualifying purchases made before November 20, 2026, and a free month of GTA+ with digital pre-orders.",
          "Our editions guides compare [Standard and Ultimate](/analysis/gta-6-standard-vs-ultimate) and list everything in the [Ultimate Edition](/gta-6-ultimate-edition).",
        ],
      },
      {
        heading: "Physical copies: code in a box",
        body: [
          "Rockstar Support says the physical retail version is a code-in-box product, not a disc. Boxed copies contain a download code, so buyers should plan for the same large digital installation as digital buyers.",
        ],
      },
      {
        heading: "How the release date changed",
        body: [
          "GTA VI was previously associated with earlier launch windows before Rockstar announced November 19, 2026. Older articles and social posts quoting those dates are out of date: the game launched on November 19, 2026.",
          "Release-time details can vary by storefront and region, so this page does not quote a universal unlock hour.",
        ],
      },
      {
        heading: "GTA 6 release FAQ",
        body: [
          "Is GTA 6 out? Yes, it launched on November 19, 2026 for PS5 and Xbox Series X|S. Is there a disc? Rockstar says the physical version is code-in-box and does not include a disc. Is GTA 6 on PC? No PC version has been announced.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
        ],
      },
      {
        heading: "What is still not confirmed",
        body: [
          "Rockstar has not announced a PC version, a PC release date or official PC system requirements.",
        ],
      },
      {
        heading: "Bottom line",
        body: [
          "GTA 6 is out now on PS5 and Xbox Series X|S, having launched on November 19, 2026. If you are waiting for PC, there is no official announcement yet.",
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
        label: "Rockstar Games - Grand Theft Auto VI",
        url: "https://www.rockstargames.com/VI",
      },
      {
        label: "Rockstar Games Newswire - Pre-Order Grand Theft Auto VI on June 25",
        url: "https://www.rockstargames.com/newswire/article/5171972o3ak5oa/pre-order-grand-theft-auto-vi-on-june-25",
      },
      {
        label: "Take-Two - Rockstar Games Announces Pre-Orders for Grand Theft Auto VI",
        url: "https://www.take2games.com/ir/news/rockstar-games-announces-pre-orders-grand-theft-auto-vi",
      },
      {
        label: "Rockstar Support - GTA VI Platforms, Editions, and Versions",
        url: "https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions",
      },
      {
        label: "Rockstar Games Newswire - Grand Theft Auto VI Now Available (November 19, 2026)",
        url: "https://www.rockstargames.com/newswire/article/39akk424a9oo53/grand-theft-auto-vi-now-available",
      },
      {
        label: "PlayStation Blog - Grand Theft Auto VI launches tomorrow, November 19",
        url: "https://blog.playstation.com/2026/11/18/grand-theft-auto-vi-launches-tomorrow-november-19/",
      },
    ],
    related: [
      {
        href: "/gta-6-platforms",
        label: "GTA 6 Platforms",
      },
      {
        href: "/gta-6-price",
        label: "GTA 6 Price",
      },
      {
        href: "/gta-6-ultimate-edition",
        label: "GTA 6 Ultimate Edition",
      },
      {
        href: "/analysis/gta-6-standard-vs-ultimate",
        label: "Standard vs Ultimate",
      },
      {
        href: "/system-requirements",
        label: "GTA 6 PC requirements and PC status",
      },
      {
        href: "/news/gta-6-limited-edition-dualsense-controller",
        label: "GTA 6 Limited Edition DualSense controllers",
      },
    ],
    lastVerified: "2026-11-20",
    breadcrumb: [
      {
        label: "GTA 6 Release Date: Out Now Since November 19, 2026",
      },
    ],
  },
  {
    path: "/gta-6-trailers",
    status: "scheduled",
    publishAt: "2026-09-24T13:00:00Z",
    title: "GTA 6 Trailers Guide: Trailer 1, Trailer 2 and the Extended Look",
    seoTitle: "GTA 6 Trailers Guide: Trailer 1, Trailer 2 and the Extended Look",
    metaDescription:
      "Watch and understand every major official GTA 6 video: Trailer 1, Trailer 2 and Rockstar’s 2026 Extended Look, with key reveals from each.",
    primaryKeyword: "GTA 6 trailers",
    intro: [
      "Rockstar’s official GTA VI video page lists five main videos: Trailer 1, Trailer 2, Grand Theft Auto VI: An Extended Look, the Grand Theft Auto VI Launch Trailer and Grand Theft Auto VI: Out Now.",
      "Each serves a different purpose. Trailer 1 introduced Leonida's culture. Trailer 2 expanded Jason and Lucia's story. The Extended Look finally gave players a much longer view of the game in motion.",
      "This is our main guide to GTA 6's official videos. For a detailed look at the first trailer, read our [Trailer 1 breakdown](/analysis/trailer-1-breakdown).",
    ],
    sections: [
      {
        heading: "GTA 6 video timeline",
        table: {
          head: ["Video", "Date", "Main purpose"],
          rows: [
            ["Trailer 1", "December 2023", "World, tone, Lucia, modern Vice City"],
            ["Trailer 2", "May 6, 2025", "Jason, Lucia, story and broader Leonida"],
            ["Extended Look", "August 27, 2026", "Longer gameplay/world presentation"],
          ],
        },
      },
      {
        heading: "Trailer 1",
        body: [
          "Trailer 1's biggest achievement was establishing the setting.",
          "It showed beaches, traffic, nightlife, wildlife, social-media-style clips and Lucia's introduction from incarceration. It made clear that Rockstar's modern Vice City would satirize contemporary Florida rather than revisit the 1980s.",
          "Read our [Trailer 1 breakdown](/analysis/trailer-1-breakdown).",
        ],
      },
      {
        heading: "Trailer 2",
        body: [
          "Trailer 2 gave Jason far more prominence and expanded the central relationship.",
          "Rockstar also used its surrounding media release to publish character profiles, location pages and a large screenshot set, turning Trailer 2 into a broader information drop rather than one isolated video.",
          "Read Trailer 2 breakdown.",
        ],
      },
      {
        heading: "The Extended Look",
        body: [
          "At almost 27 minutes, the Extended Look is the most information-dense official GTA 6 video so far.",
          "It moves beyond teaser editing and shows longer stretches of missions, driving, combat, activities and character interaction. The footage was captured from the PS5 version.",
          "See our full [Extended Look breakdown](/news/gta-6-extended-look-breakdown).",
        ],
      },
      {
        heading: "The launch trailer and later videos",
        body: [
          "Rockstar’s official video page also lists a Grand Theft Auto VI Launch Trailer and a video titled Grand Theft Auto VI: Out Now. Their release dates and details will be added here once they are verified. Any further official Rockstar videos will be added here too.",
          "We do not use unofficial “Trailer 3 date” countdowns unless Rockstar announces one.",
        ],
      },
      {
        heading: "Rockstar’s official GTA VI videos",
        body: [
          "Rockstar’s media library centers on its main GTA VI videos: Trailer 1, Trailer 2, the August 27, 2026 Extended Look, the Launch Trailer and Grand Theft Auto VI: Out Now. The company also provides nine short character/media clips.",
          "Each video changed what could be stated confidently about the game.",
        ],
      },
      {
        heading: "Trailer 1: setting and protagonists",
        body: [
          "Trailer 1 established the modern Leonida/Vice City setting and Lucia’s central role, while showing the social-media-saturated tone of the world. Later official material clarified Jason’s identity and greatly expanded the cast and region list.",
        ],
      },
      {
        heading: "Trailer 2: relationship, cast and world detail",
        body: [
          "Trailer 2 focused more heavily on Jason and Lucia’s relationship and seeded many details later supported by Rockstar’s character/location pages. It is the bridge between the initial reveal and the fully structured People & Places information drop.",
          "Link individual trailer moments to dedicated character and location pages instead of repeating full bios.",
        ],
      },
      {
        heading: "Extended Look: systems over spectacle",
        body: [
          "The Extended Look is the first long-form official in-game presentation and materially expands gameplay evidence: combat, wanted response, activities, driving and character partnership.",
          "When new official videos arrive, add a “what this changed” column to the timeline so users immediately understand why the video matters.",
        ],
      },
      {
        heading: "How this differs from a shot-by-shot index",
        body: [
          "Tracker.gg’s GTA 6 Database indexes the Extended Look shot by shot, all 183 of them, and it is the better tool if that is what you need. This page does something different: it takes each major reveal, records its evidence status, and connects it to the hub that covers it in depth.",
          "The trailers are treated as sources; the map, characters, vehicles, weapons and gameplay are the things those sources tell us about.",
        ],
      },
      {
        heading: "Video-by-video evidence",
        body: [
          "Trailer 1 was released in December 2023 and runs about 1 minute 31 seconds on Rockstar’s current media pages. Trailer 2 arrived May 6, 2025 at roughly 2 minutes 47 seconds. The Extended Look arrived August 27, 2026 and runs roughly 26 minutes 48 seconds.",
        ],
      },
      {
        heading: "What changed after each reveal",
        body: [
          "Trailer 1 established Leonida, Vice City and Lucia. Trailer 2 and the material around it introduced much more of the cast and the places they live and work. The Extended Look added long-form in-game footage of gameplay, police, weapons, activities and vehicles.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
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
        label: "Rockstar Games - GTA VI Videos",
        url: "https://www.rockstargames.com/VI/media/videos",
      },
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
    related: [
      {
        href: "/analysis/trailer-1-breakdown",
        label: "Trailer 1 Breakdown",
      },
      {
        href: "/news/gta-6-extended-look-breakdown",
        label: "Extended Look Breakdown",
      },
      {
        href: "/gta-6-gameplay",
        label: "GTA 6 Gameplay",
      },
    ],
    lastVerified: "2026-09-24",
    breadcrumb: [
      {
        label: "GTA 6 Trailers Guide: Trailer 1, Trailer 2 and the Extended Look",
      },
    ],
  },
  {
    path: "/gta-6-ultimate-edition",
    status: "scheduled",
    publishAt: "2026-09-02T13:00:00Z",
    title: "GTA 6 Ultimate Edition: Everything Included for $99.99",
    seoTitle: "GTA 6 Ultimate Edition: Everything Included for $99.99",
    metaDescription:
      "The GTA 6 Ultimate Edition costs $99.99 in the US. Here’s what Rockstar includes and how it differs from the $79.99 Standard Edition.",
    primaryKeyword: "GTA 6 Ultimate Edition",
    intro: [
      "The Grand Theft Auto VI Ultimate Edition costs $99.99 in the United States, $20 more than the $79.99 Standard Edition. It includes the full game plus an Ultimate Edition Upgrade containing exclusive vehicles, weapons, styles and locations tied to Jason and Lucia's single-player story.",
      "Unlike years of speculative “collector's edition” lists, Rockstar has now published the actual package.",
      "This page covers what the Ultimate Edition includes. For both prices and regional pricing, see our [GTA 6 price guide](/gta-6-price).",
    ],
    sections: [
      {
        heading: "GTA 6 Ultimate Edition at a glance",
        table: {
          head: ["Detail", "Ultimate Edition"],
          rows: [
            ["US price", "$99.99"],
            ["Full GTA 6 game", "Yes"],
            ["Vintage Vice City Pack", "Included with pre-orders and purchases made before November 20, 2026"],
            ["Free GTA+ month", "Included with qualifying digital pre-orders"],
            ["Ultimate Edition Upgrade", "Yes"],
            ["Released", "November 19, 2026"],
          ],
        },
      },
      {
        heading: "Confirmed Ultimate Edition content",
        body: [
          "Rockstar's edition page lists benefits including the '95 Grotti Cheetah, Hawk & Little Morgan Revolvers, personalized weapon variants, Vice City styles, Jason's safehouse vehicles, the Ganado Retro Build and multiple customization/business locations.",
          "Other named benefits include Rideout Customs Mod Shop, Sara's Unisex Salon, the Shitzu Squalo, Stock 305 Clothing Store, a '67 Vapid Dominator Buggy, Electric Fang Tattoo Parlor, One-Eyed Willie's Mod Shop, Goodtime Gear and additional collection content.",
          "The important point is that these are now official edition benefits, not leaked names.",
        ],
      },
      {
        heading: "Does Ultimate include early access?",
        body: [
          "Rockstar has not advertised early gameplay access as an Ultimate Edition benefit.",
          "Digital pre-orders could pre-load before launch, but that is not early access. GTA 6 launched on November 19, 2026.",
          "Do not confuse pre-loading with early access.",
        ],
      },
      {
        heading: "Is Ultimate worth the extra $20?",
        body: [
          "That depends on what you value.",
          "Buy Standard if your main goal is the core GTA 6 experience. Rockstar's announcement describes GTA 6 as a single-player experience, and the Standard Edition is the complete base game.",
          "Ultimate makes more sense for players who care about vehicle collecting, weapon variants, cosmetic customization and access to the additional locations or activities bundled into the upgrade.",
          "The price difference is small relative to the full game, but that does not automatically make the extra content valuable to every player.",
        ],
      },
      {
        heading: "Can you upgrade later?",
        body: [
          "Rockstar Store material indicates an Ultimate Edition upgrade path, and PlayStation listings show an Ultimate Edition Upgrade add-on. Availability can vary by storefront, so check your platform before assuming the same purchase flow everywhere.",
          "That makes Standard a less risky choice for players who are undecided, because you can upgrade later if you want the extra items.",
        ],
      },
      {
        heading: "What about the Vintage Vice City Pack?",
        body: [
          "The Vintage Vice City Pack is a pre-order/early-purchase incentive rather than the defining Ultimate-only bundle. Qualifying Standard buyers can also receive it.",
          "So the Vintage Vice City Pack is a pre-order and early-purchase bonus, not an Ultimate Edition exclusive.",
        ],
      },
      {
        heading: "Bottom line",
        body: [
          "GTA 6 Ultimate is not a different game. It is the base game plus a package of premium in-game content for $99.99 in the US.",
          "For a direct side-by-side, see [GTA 6 Standard vs Ultimate](/analysis/gta-6-standard-vs-ultimate).",
        ],
      },
      {
        heading: "What the extra $20 buys",
        body: [
          "The Ultimate Edition is officially priced at $99.99 in the United States, $20 above the $79.99 Standard Edition. Rockstar presents it as an upgrade threaded across Jason and Lucia’s story rather than a separate campaign.",
          "The most useful way to evaluate the edition is by benefit category: vehicles, weapons, customization, businesses/services and collections. That structure is easier to scan than Rockstar’s promotional carousel and reduces the chance of omitting an item.",
        ],
      },
      {
        heading: "Official Ultimate Edition inventory",
        body: [
          "Named benefits include the 1995 Grotti Cheetah; Hawk and Little Morgan Revolvers; personalized weapon variants; Vice City Style; Jason’s Safehouse Vehicles; Ganado Retro Build; Rideout Customs Mod Shop; Sara’s Unisex Salon; Shitzu Squalo; Stock 305 Clothing Store; the 1967 Vapid Dominator Buggy; Electric Fang Tattoo Parlor; One-Eyed Willie’s Mod Shop; Goodtime Gear; PTT Youngin$ Illegal Goods Store/Compound labeling across Rockstar surfaces; and a Classic Car Collection.",
        ],
      },
      {
        heading: "Upgrade path matters",
        body: [
          "Rockstar Support says Standard Edition owners can buy the Ultimate Edition Upgrade separately later. Physical code-in-box buyers can upgrade after redeeming their game code. That means the decision is not necessarily permanent at checkout.",
          "For undecided players, that lowers the risk of choosing Standard. There is no deadline pressure worth manufacturing here: what matters is which content is exclusive and which can be added later.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
        ],
      },
      {
        heading: "What is still not confirmed",
        body: [
          "Rockstar has not announced any Ultimate-only missions or story content.",
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
        label: "Rockstar Games - GTA VI Ultimate Edition",
        url: "https://www.rockstargames.com/VI/ultimate-edition",
      },
      {
        label: "Rockstar Support - GTA VI Platforms, Editions, and Versions",
        url: "https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions",
      },
      {
        label: "Take-Two - Rockstar Games Announces Pre-Orders for Grand Theft Auto VI",
        url: "https://www.take2games.com/ir/news/rockstar-games-announces-pre-orders-grand-theft-auto-vi",
      },
      {
        label: "Rockstar Store - Grand Theft Auto VI",
        url: "https://store.rockstargames.com/game/buy-gta-vi",
      },
    ],
    related: [
      {
        href: "/gta-6-price",
        label: "GTA 6 Price",
      },
      {
        href: "/analysis/gta-6-standard-vs-ultimate",
        label: "Standard vs Ultimate",
      },
      {
        href: "/gta-6-release-date",
        label: "GTA 6 Release Date",
      },
    ],
    lastVerified: "2026-09-02",
    breadcrumb: [
      {
        label: "GTA 6 Ultimate Edition: Everything Included for $99.99",
      },
    ],
  },
  {
    path: "/gta-6-vehicles",
    status: "scheduled",
    publishAt: "2026-09-18T13:00:00Z",
    title: "GTA 6 Vehicles: Confirmed Cars, Bikes, Boats and Aircraft",
    seoTitle: "GTA 6 Vehicles: Confirmed Cars, Bikes, Boats and Aircraft",
    metaDescription:
      "Browse confirmed GTA 6 vehicles seen in Rockstar trailers, screenshots and official edition content, including cars, bikes, boats and aircraft.",
    primaryKeyword: "GTA 6 vehicles",
    intro: [
      "Vehicles are everywhere in GTA 6's official media: supercars crawl through Vice City traffic, bikes cut through streets, boats cross Leonida's coastline and aircraft fill the sky.",
      "GTA 6 is out, but this list still covers only vehicles from Rockstar's official material. Our rule is simple: a vehicle belongs here when it appears in official Rockstar material or is named in official edition content.",
    ],
    sections: [
      {
        heading: "Vehicle categories already visible",
        body: [
          "Cars and supercars",
          "Sedans and SUVs",
          "Pickup trucks and off-road vehicles",
          "Motorcycles",
          "Boats and personal watercraft",
          "Airboats",
          "Helicopters",
          "Commercial aircraft and smaller planes",
          "Emergency vehicles",
        ],
      },
      {
        heading: "Named vehicles from official edition content",
        body: [
          "Rockstar's Ultimate Edition benefits provide some of the safest confirmed names because they are written directly on the edition page.",
          "Examples include the '95 Grotti Cheetah, '67 Vapid Dominator Buggy, Shitzu Squalo, Ganado Retro Build and vehicle-related content tied to Jason's safehouse and customization shops.",
        ],
      },
      {
        heading: "Returning GTA brands",
        body: [
          "Official footage also shows the fictional vehicle-brand ecosystem GTA players already know.",
          "Identifying a vehicle model from a two-second trailer shot can be difficult, so visual identifications carry confidence labels here. Not every fan match is certain.",
        ],
      },
      {
        heading: "Boats matter in Leonida",
        body: [
          "Leonida's geography makes water transport unusually important. Vice City, the Keys and the wetland regions all create natural routes for boats and airboats.",
          "That is a meaningful design difference from simply adding more cars to a larger city.",
        ],
      },
      {
        heading: "Can we say there are “230 confirmed vehicles”?",
        body: [
          "Community databases have identified more than 200 vehicle appearances, but the word confirmed needs care.",
          "A fan can confidently identify a returning vehicle model from bodywork, yet Rockstar may not have published its in-game name. We therefore separate:",
          "Officially named - Rockstar prints the vehicle name.",
          "Officially shown - the vehicle is visible in Rockstar footage.",
          "Community identification - the specific model name is inferred from visual evidence.",
          "That system is more transparent and more useful than one giant number.",
        ],
      },
      {
        heading: "Will GTA 6 have vehicle customization?",
        body: [
          "Rockstar's Ultimate Edition material names mod shops and custom builds, making vehicle customization a safe part of the discussion.",
          "The full depth of standard-game customization is still not documented.",
        ],
      },
      {
        heading: "Explore next",
        body: [
          "Deeper vehicle breakdowns are planned for:",
          "GTA 6 supercars",
          "motorcycles",
          "boats",
          "aircraft",
          "emergency vehicles",
          "off-road vehicles",
          "returning GTA models",
        ],
      },
      {
        heading: "Evidence, not just count",
        body: [
          "GTABase currently says it has identified more than 230 vehicles, while PC Gamer openly notes that many vehicle names are visual identifications rather than official confirmations. We have deliberately not chased the largest total. What follows is organised by how each name was established.",
          "Each vehicle record carries a name, category, official-name status, first source, latest source, image or frame, real-world resemblance where useful, and a confidence level. A car visible in a trailer is “shown”; it is only “officially named” when Rockstar names it in a screenshot, edition benefit or other first-party text.",
        ],
        table: {
          head: ["Provenance", "What it means"],
          rows: [
            ["Officially named", "Rockstar prints the vehicle name in first-party text."],
            ["Officially shown", "The vehicle is visible in Rockstar footage but not named."],
            ["Visually identified", "The model is matched from official imagery by eye."],
            [
              "Community identification",
              "The specific name is inferred by the community, not Rockstar.",
            ],
            ["Unknown", "Seen but not identifiable with confidence."],
          ],
        },
      },
      {
        heading: "Officially named vehicle anchors",
        body: [
          "Rockstar’s Ultimate Edition and preorder materials provide several strong named anchors, including the 1995 Grotti Cheetah, 1955 Vapid Stanier Sedan, 1967 Vapid Dominator Buggy, Vapid Ganado/Ganado Retro Build, Dinka Enduro Motorcycle, Crest Kayak, Shitzu Squalo and Jason’s Safehouse Vehicles as a benefit category. These are the officially named set, kept separate from the larger visually identified catalogue.",
          "That separation means the reliable list stays readable even though the full catalogue contains hundreds of less certain visual matches.",
        ],
        table: {
          head: ["Vehicle", "Named in"],
          rows: [
            ["1995 Grotti Cheetah", "Rockstar Ultimate Edition"],
            ["1955 Vapid Stanier Sedan", "Rockstar Ultimate Edition"],
            ["1967 Vapid Dominator Buggy", "Rockstar Ultimate Edition"],
            ["Vapid Ganado / Ganado Retro Build", "Rockstar Ultimate Edition"],
            ["Dinka Enduro Motorcycle", "Rockstar Ultimate Edition"],
            ["Crest Kayak", "Rockstar Ultimate Edition"],
            ["Shitzu Squalo", "Rockstar Ultimate Edition"],
            ["Jason’s Safehouse Vehicles (benefit category)", "Rockstar Ultimate Edition"],
          ],
        },
      },
      {
        heading: "Completeness by category",
        body: [
          "A single vehicle total hides how well each category is actually covered. The catalogue is split into cars, motorcycles, bicycles where confirmed, boats and watercraft, aircraft, and service or emergency vehicles — each showing how many entries are officially named and how many are visually identified.",
          "The result is a picture of what is genuinely known per category, rather than one headline number.",
        ],
      },
      {
        heading: "Real-world counterparts are not official names",
        body: [
          "GTA vehicles intentionally resemble real cars, but a likely Ferrari, Ford or Chevrolet inspiration is not the in-game name. This page lists the in-game name first and uses words like “resembles” or “commonly compared with” for real-world matches.",
          "The distinction matters because a loose visual comparison is easily repeated until it hardens into a false factual identity.",
        ],
      },
      {
        heading: "Vehicle functionality observations",
        body: [
          "The Extended Look adds context beyond identification. It shows highway driving, police pursuits, in-car shooting, boats and other movement systems. Dedicated records can note observed use - pursuit, robbery escape, leisure, marine travel - without claiming every vehicle supports every mechanic.",
          "If Rockstar later documents customization, damage, fuel or ownership systems, those become fields on each vehicle record rather than remarks buried in prose.",
        ],
      },
      {
        heading: "Why provenance beats catalogue size",
        body: [
          "Older databases have scale on their side. What this one offers instead is transparency: a stated method, exact source links, confidence filters, last-seen dates and a correction history. For a factual question, a smaller table you can check beats a larger catalogue that mixes official names with community identification.",
          "Individual vehicles get their own page only when there is enough verified material to justify one.",
        ],
      },
      {
        heading: "What each vehicle record contains",
        body: [
          "Every vehicle entry uses the same record: in-game name, manufacturer, category, official-name status, first official appearance, latest appearance, edition or bonus status, associated character, real-world resemblance, and an evidence link. Price, spawn locations, performance stats and customization will be added once the game is out.",
          "Keeping the shape consistent is what makes views like “officially named GTA VI cars,” “boats shown in Leonida” or “Ultimate Edition vehicles” possible without writing the same article three times.",
        ],
      },
      {
        heading: "Preorder and Ultimate vehicles as a reliable seed set",
        body: [
          "The preorder and Ultimate Edition material is valuable because Rockstar names specific vehicles rather than leaving identification to visual matching. The 1955 Vapid Stanier Sedan, 1995 Grotti Cheetah and 1967 Vapid Dominator Buggy are examples of vehicles that can carry a Confirmed-by-name badge. The Ganado Retro Build and Jason’s Safehouse Vehicles also create links between vehicle and edition pages.",
          "When a vehicle is a benefit rather than a universally available base-game item, say so. “Appears in GTA VI” and “included with this edition” are different claims.",
        ],
      },
      {
        heading: "Watercraft and Leonida geography",
        body: [
          "Leonida’s Keys, coastline and wetlands make boats and smaller watercraft unusually important. Rockstar’s edition material names the Shitzu Squalo and Crest Kayak, while official footage shows broader marine travel. Watercraft therefore get the same depth here as cars rather than a footnote.",
          "Link watercraft records to Leonida Keys, Grassrivers and activities such as diving or kayaking when the evidence supports the connection.",
        ],
      },
      {
        heading: "Corrections and confidence",
        body: [
          "Visual car identification is inherently error-prone. Corrections are welcome and are recorded rather than absorbed silently: if an apparent model is later officially named differently, the record is updated and the correction dated.",
          "Showing how a claim was verified, and how it was later revised, is the only real basis on which a fan database earns trust.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
        ],
      },
      {
        heading: "What is still not confirmed",
        body: [
          "The full in-game vehicle list, stats and prices have not been verified here yet.",
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
        label: "Rockstar Games - GTA VI Ultimate Edition",
        url: "https://www.rockstargames.com/VI/ultimate-edition",
      },
      {
        label: "Rockstar Games - GTA VI Screenshots",
        url: "https://www.rockstargames.com/VI/downloads/screenshots",
      },
      {
        label: "PC Gamer - GTA 6 Cars",
        url: "https://www.pcgamer.com/gta-6-cars-list/",
      },
      {
        label: "GTABase - GTA 6 Vehicles Database",
        url: "https://www.gtabase.com/gta-6/vehicles/",
      },
      {
        label: "Rockstar Games - Grand Theft Auto VI: An Extended Look",
        url: "https://www.rockstargames.com/VI/an-extended-look",
      },
    ],
    related: [
      {
        href: "/gta-6-gameplay",
        label: "GTA 6 Gameplay",
      },
      {
        href: "/gta-6-map",
        label: "GTA 6 Map",
      },
    ],
    lastVerified: "2026-09-18",
    breadcrumb: [
      {
        label: "GTA 6 Vehicles: Confirmed Cars, Bikes, Boats and Aircraft",
      },
    ],
  },
  {
    path: "/gta-6-weapons",
    status: "scheduled",
    publishAt: "2026-09-19T13:00:00Z",
    title: "GTA 6 Weapons: Confirmed Guns, Melee Weapons and Equipment",
    seoTitle: "GTA 6 Weapons: Confirmed Guns, Melee Weapons and Equipment",
    metaDescription:
      "See GTA 6 weapons shown in official footage and Rockstar edition content, from pistols and revolvers to rifles, shotguns and equipment.",
    primaryKeyword: "GTA 6 weapons",
    intro: [
      "GTA 6's official trailers, screenshots, edition benefits and Extended Look show a broad weapon mix spanning handguns, shotguns, rifles, automatic weapons, melee tools and heavy weapons.",
      "As with vehicles, we separate what Rockstar names from what the community identifies visually.",
    ],
    sections: [
      {
        heading: "Weapon types officially shown",
        body: [
          "Official media supports the presence of:",
          "pistols and revolvers;",
          "shotguns;",
          "assault-style rifles;",
          "submachine guns;",
          "sniper/long-range weapons;",
          "heavy weapons;",
          "melee weapons;",
          "throwable/explosive equipment.",
        ],
      },
      {
        heading: "Officially named edition weapons",
        body: [
          "Rockstar's Ultimate Edition page names the Hawk & Little Morgan Revolvers and personalized weapon variants.",
          "Those names are particularly reliable because they come directly from Rockstar rather than being matched from a trailer frame.",
        ],
      },
      {
        heading: "How many GTA 6 weapons are confirmed?",
        body: [
          "Different databases produce different totals depending on whether they include leaks, visually identified real-world equivalents or unnamed items.",
          "For example, specialist GTA databases list dozens of weapons, while some mainstream guides restrict themselves to guns identifiable in official trailers and screenshots.",
          "That is why our database uses evidence labels instead of promoting one misleading “official total.”",
        ],
      },
      {
        heading: "Does GTA 6 use a limited weapon inventory?",
        body: [
          "Pre-release leaks created years of discussion about a more restrictive weapon-carry system inspired by Red Dead Redemption 2.",
          "The Extended Look gives us better evidence of weapon handling, but Rockstar has not yet published a complete inventory-system specification. We will not present leak-era UI assumptions as final design.",
        ],
      },
      {
        heading: "Weapon customization",
        body: [
          "The Ultimate Edition's personalized weapon variants confirm that weapon appearance/customization is part of at least some premium content.",
          "The scope available to all Standard Edition players is still to be fully documented.",
        ],
      },
      {
        heading: "What the Extended Look changes",
        body: [
          "The new footage provides longer combat sequences than the early trailers. Guns appear weightier in presentation, and encounters move between cover, close quarters and vehicle-based action.",
          "That is enough to discuss feel and presentation-not enough to publish fake damage, recoil or ammunition stats.",
        ],
      },
      {
        heading: "What each weapon record stores",
        body: [
          "Every weapon entry records:",
          "Evidence source: trailer, screenshot, Extended Look or Rockstar edition page.",
          "Last verified date.",
          "That is what makes this a reference you can check rather than a list you have to trust.",
        ],
      },
      {
        heading: "The evidence taxonomy",
        body: [
          "PC Gamer currently identifies 19 guns from trailers and screenshots, and GamesRadar has expanded its list after the Extended Look. Those are useful visual catalogues, but we do not adopt any of those totals as a headline figure, because each item still has to be verified under one consistent method.",
          "Four buckets do that work: Officially Named, Visually Identified, Observed but Unnamed, and Unconfirmed or Reported. They also explain why two sites can publish different weapon totals without either being dishonest.",
        ],
        table: {
          head: ["Provenance", "What it means"],
          rows: [
            ["Officially named", "Rockstar names the weapon in first-party text."],
            ["Visually identified", "The weapon is matched from official imagery by eye."],
            ["Observed but unnamed", "Clearly present in official footage with no published name."],
            ["Unconfirmed or reported", "Third-party claim Rockstar has not documented."],
          ],
        },
      },
      {
        heading: "Officially named weapons and variants",
        body: [
          "Rockstar’s Ultimate Edition material explicitly names the Hawk and Little Morgan Revolvers and personalized weapon variants. The preorder package also includes an exclusive weapon pattern. These are first-party weapon facts, and they anchor the confirmed table below.",
          "Other guns visible in official trailers are catalogued as visual identification until Rockstar supplies an in-game label or official caption.",
        ],
        table: {
          head: ["Weapon", "Named in"],
          rows: [
            ["Hawk & Little Morgan Revolvers", "Rockstar Ultimate Edition"],
            ["Personalized weapon variants (category)", "Rockstar Ultimate Edition"],
            ["Exclusive preorder weapon pattern (category)", "Rockstar preorder material"],
          ],
        },
      },
      {
        heading: "What the Extended Look adds to weapon-system coverage",
        body: [
          "The new footage shows a weapon wheel, gunfights, in-car shooting and more tactical-looking aiming. PC Gamer notes reticle and body-part targeting observations; TechRadar highlights the weapon wheel and chase combat. These are evidence about the weapon system, not merely the weapon list.",
          "So this page has two halves: the catalogue of what exists, and what the footage shows about how weapons behave.",
        ],
      },
      {
        heading: "Melee weapons, explosives and equipment",
        body: [
          "Uncertain objects are not counted as firearms. Melee weapons, explosives and utility equipment are listed separately, marked by whether they are carried, used, named or only background props.",
          "This avoids the common error of calling every knife, bat or tool in a cinematic shot a confirmed usable weapon.",
        ],
      },
      {
        heading: "Customization claims need restraint",
        body: [
          "Rockstar officially confirms personalized weapon variants as an Ultimate Edition benefit, but that is not the same as a full public description of GTA VI’s general weapon customization system. If attachments, finishes or gunsmith systems appear in footage, label them as observed until Rockstar explains the rules.",
          "Combat behaviour is covered on the gameplay hub and premium weapon benefits on the edition pages, so neither is repeated here.",
        ],
      },
      {
        heading: "Weapon stats and prices",
        body: [
          "GTA 6 is out. In-game weapon names, shop prices, ammo, capacity, unlock conditions and stats will be added here once they are verified in the game.",
        ],
      },
      {
        heading: "How we identify weapons",
        body: [
          "For each weapon we note its name (official or inferred), category, the video or screenshot it appears in, who uses it, whether it is fired or only visible, any customization shown, and our confidence.",
          "That way, a background prop is never treated the same as a weapon that is clearly used.",
        ],
      },
      {
        heading: "Why the “19 guns” figure needs context",
        body: [
          "PC Gamer’s 19-gun count is a careful visual-identification project, not an official Rockstar statement that GTA VI contains exactly 19 guns. It is a reported identification total, and a well-documented one. Our own count can differ because our inclusion rules differ — which is why those rules are stated above rather than left implicit.",
          "The honest headline is therefore “weapons shown or named so far,” with counts given per category and per evidence status rather than as a single total.",
        ],
      },
      {
        heading: "Combat evidence from official footage",
        body: [
          "The Extended Look gives the weapons page valuable system context: aiming reticles, tactical-looking target selection, a weapon wheel and in-car shooting are visible or highlighted in contemporary breakdowns. These observations can be linked to exact video moments instead of being described as generic “improved combat.”",
          "Features reported only by press previews, rather than shown in the public video, are labelled as reported.",
        ],
      },
      {
        heading: "Premium weapons versus base-game arsenal",
        body: [
          "Hawk and Little Morgan Revolvers are tied to the Ultimate Edition benefit set. They are not a Standard Edition starting item. Likewise, personalized weapon variants and the preorder weapon pattern are edition/bonus facts, not proof of the entire customization system.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
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
        label: "Rockstar Games - GTA VI Ultimate Edition",
        url: "https://www.rockstargames.com/VI/ultimate-edition",
      },
      {
        label: "Rockstar Games - GTA VI Screenshots",
        url: "https://www.rockstargames.com/VI/downloads/screenshots",
      },
      {
        label: "PC Gamer - GTA 6 Weapons List",
        url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-weapons-list/",
      },
      {
        label: "GamesRadar - GTA 6 Weapons",
        url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-weapons/",
      },
      {
        label: "Rockstar Games - Grand Theft Auto VI: An Extended Look",
        url: "https://www.rockstargames.com/VI/an-extended-look",
      },
    ],
    related: [
      {
        href: "/gta-6-gameplay",
        label: "GTA 6 Gameplay",
      },
      {
        href: "/wiki/gangs/police-system",
        label: "Police and Wanted System",
      },
    ],
    lastVerified: "2026-09-19",
    breadcrumb: [
      {
        label: "GTA 6 Weapons: Confirmed Guns, Melee Weapons and Equipment",
      },
    ],
  },
  {
    path: "/system-requirements",
    status: "scheduled",
    publishAt: "2026-09-05T13:00:00Z",
    title: "GTA 6 PC System Requirements: Not Announced Yet",
    seoTitle: "GTA 6 PC Requirements: Is GTA 6 on PC? (Status After Launch)",
    metaDescription:
      "GTA 6 is out on PS5 and Xbox Series X|S, but Rockstar hasn't announced a PC version or official PC specs. What's confirmed, and which spec lists to ignore.",
    primaryKeyword: "GTA 6 PC requirements",
    intro: [
      "There are no official GTA 6 PC system requirements because Rockstar has not announced a PC version of GTA 6. The game [launched on November 19, 2026](/gta-6-release-date) for [PlayStation 5 and Xbox Series X|S](/gta-6-platforms) only.",
      "That means every current page claiming an “official minimum RTX 3060,” “recommended RTX 4070,” exact RAM requirement or fixed PC storage number is either estimating or fabricating information unless Rockstar has made a newer announcement.",
      "This is our main page for GTA 6 on PC. It tracks the PC status and will list official specs only if Rockstar publishes them.",
    ],
    sections: [
      {
        heading: "Confirmed status",
        table: {
          head: ["Spec", "Official GTA 6 PC requirement"],
          rows: [
            ["CPU", "Not announced"],
            ["GPU", "Not announced"],
            ["RAM", "Not announced"],
            ["Storage", "Not announced"],
            ["Operating system", "Not announced"],
            ["DirectX/API", "Not announced"],
          ],
        },
      },
      {
        heading: "What we can learn from consoles",
        body: [
          "GTA 6 is available on PS5 and Xbox Series X|S. Those machines use AMD Zen 2-era CPUs, RDNA 2-family graphics and SSD storage architectures.",
          "That provides development context, but console specifications cannot be converted directly into PC minimum requirements. Consoles use fixed hardware, unified memory systems and platform-specific optimization.",
        ],
      },
      {
        heading: "Rockstar's recent PC games",
        body: [
          "Historical official minimum requirements are more useful than invented GTA 6 numbers.",
          "GTA V's original PC minimum was built around much older hardware and 4 GB of RAM. Red Dead Redemption 2's launch minimum moved substantially higher, including 8 GB of memory and far more storage.",
          "GTA 6 will obviously target a newer generation than either game, but “newer” is not a specification.",
        ],
      },
      {
        heading: "Why you'll see estimated spec lists elsewhere",
        body: [
          "Many sites publish estimated minimum and recommended specs to fill the gap. Those tables are often copied from one another until repeated numbers look official. They aren't: this page doesn't publish an estimated minimum or recommended table.",
        ],
      },
      {
        heading: "What PC players should prepare for",
        body: [
          "Without inventing numbers, three practical conclusions are reasonable:",
          "SSD storage will matter. GTA 6 is built around current-generation consoles that rely on fast solid-state storage.",
          "Modern CPU performance will matter. The Extended Look emphasizes dense crowds, traffic, interiors and simulation-heavy urban environments.",
          "Final storage size could be large. But Rockstar has not published the exact number, so do not buy a drive based on a viral screenshot.",
        ],
      },
      {
        heading: "When will official specs appear?",
        body: [
          "Usually after the PC version itself is announced. At that point Rockstar can publish store pages, supported operating systems and minimum/recommended hardware.",
          "Until then, no minimum or recommended specs on any site are official.",
        ],
      },
      {
        heading: "How to spot an unofficial spec list",
        body: [
          "Because Rockstar has not announced a PC version, it has also not published minimum or recommended PC specifications. Pages that list an exact CPU, GPU, RAM amount or storage requirement today are not quoting an official Rockstar spec sheet.",
          "Estimates age badly and are often copied between sites without a source, so a predicted graphics card or RAM figure can look confirmed when it isn't. For general preparation, modern SSD storage, current drivers and plenty of free space are sensible without guessing Rockstar's minimums.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
        ],
      },
      {
        heading: "What is still not confirmed",
        body: [
          "Rockstar has not announced a PC version of GTA 6, a PC release date, or any official PC system requirements.",
        ],
      },
      {
        heading: "Bottom line",
        body: [
          "There is no official GTA 6 PC requirements chart, because there is no announced PC version yet. When Rockstar publishes PC specifications, this page will replace the “Not announced” fields with them.",
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
        label: "Rockstar Support - GTA VI Platforms, Editions, and Versions",
        url: "https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions",
      },
      {
        label: "PC Gamer - GTA 6 PC Release Date",
        url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-pc-release-date/",
      },
    ],
    related: [
      {
        href: "/gta-6-platforms",
        label: "GTA 6 Platforms",
      },
      {
        href: "/gta-6-release-date",
        label: "GTA 6 Release Date",
      },
    ],
    lastVerified: "2026-11-20",
    breadcrumb: [
      {
        label: "GTA 6 PC System Requirements: Not Announced Yet",
      },
    ],
  },
];

/** Gated accessors — drafts and future-scheduled pages never render. */
export const publicPages = (now?: Date) => publicOnly(pages, now);

export const pageByPath = (path: string, now?: Date) =>
  publicEntry(
    pages.find((p) => p.path === path),
    now,
  );

/** Unfiltered. Editorial tooling only. */
export const allPages = pages;
