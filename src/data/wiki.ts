import type { EvidenceRow } from "@/lib/evidence";
import { publicEntry, publicOnly, type PendingRevision, type Publishable } from "@/lib/publishing";
import type { PageSection } from "@/data/pages";

export type WikiType = "characters" | "map" | "vehicles" | "weapons" | "gangs" | "companies";

export interface WikiEntry extends Publishable {
  slug: string;
  type: WikiType;
  name: string;
  overview: string;
  /** Legacy fields. Superseded by `intro` + `sections` on long-form entries. */
  background?: string;
  roleInGta6?: string;
  details?: { label: string; value: string }[];
  related?: { type: WikiType | "pillar"; href: string; label: string }[];
  trivia?: string[];
  updates?: string;
  seoTitle?: string;
  metaDescription?: string;
  /** Per-entry evidence status table. */
  evidence?: EvidenceRow[];
  /**
   * Sources and verification, first-party first. `url` is present only where the
   * canonical source was actually verified; `needsReview` marks the rest for an
   * editor rather than shipping a guessed link.
   */
  sources?: { label: string; url?: string; needsReview?: boolean }[];
  /** Set only to consolidate this URL onto another page. */
  canonicalOverride?: string;
  /** Direct-answer paragraphs, shown above the structured fields. */
  intro?: string[];
  /**
   * Long-form body. When present it replaces the overview/background/role
   * fields in the rendered page; those stay as the fallback for short entries.
   */
  sections?: PageSection[];
  /** A staged edit to an entry that is already live. */
  pendingRevision?: PendingRevision<WikiEntry>;
}

export const wikiTypes: { slug: WikiType; label: string }[] = [
  { slug: "characters", label: "Characters" },
  { slug: "map", label: "Map & Locations" },
  { slug: "vehicles", label: "Vehicles" },
  { slug: "weapons", label: "Weapons" },
  { slug: "gangs", label: "Gangs" },
  { slug: "companies", label: "Companies" },
];

export const wiki: WikiEntry[] = [
  {
    slug: "cal-hampton",
    type: "characters",
    name: "Cal Hampton",
    overview:
      "Cal Hampton is one of GTA 6's officially revealed supporting characters and a friend of protagonist Jason Duval.",
    status: "scheduled",
    publishAt: "2026-09-15T13:00:00Z",
    lastVerified: "2026-08-29",
    seoTitle: "Cal Hampton in GTA 6: Jason’s Paranoid Friend Explained",
    metaDescription:
      "Cal Hampton is Jason’s conspiracy-minded friend in GTA 6. Here’s what Rockstar has confirmed about his personality, Brian connection and role.",
    intro: [
      "Rockstar's description makes Cal immediately recognizable: he prefers staying home, drinking beer, snooping on Coast Guard communications and wondering whether the strangest things on the internet might actually be true.",
    ],
    sections: [
      {
        heading: "What Rockstar confirms about Cal",
        body: [
          "Cal is both Jason's friend and an associate of Brian Heder.",
          "That places him inside the Leonida Keys side of Jason's life rather than the glamorous Vice City nightlife network associated with characters such as Boobie Ike and Dre'Quan Priest.",
        ],
      },
      {
        heading: "Cal's personality",
        body: [
          "Rockstar leans heavily into casual paranoia. His official lines worry about patterns in the sky and the people in charge, while his biography describes him as comfortable at “the low tide of America.”",
          "The character looks designed to satirize online conspiracy culture without needing to turn every theory into a major plot reveal.",
        ],
      },
      {
        heading: "How does Cal know Jason?",
        body: [
          "Rockstar identifies the friendship directly but has not published a full history of when or how they met.",
          "Because both are connected to Brian, the safest interpretation is that they overlap within Jason's Keys-based criminal/social network.",
        ],
      },
      {
        heading: "Is Cal playable?",
        body: [
          "Rockstar has only confirmed Jason and Lucia as the main playable protagonists.",
          "Cal should therefore be treated as a supporting character unless Rockstar says otherwise.",
        ],
      },
      {
        heading: "What could his role be?",
        body: [
          "Cal's Coast Guard monitoring and interest in information make him an obvious source of tips, chatter or situational knowledge for Jason.",
          "That is analysis based on his official profile-not confirmation of a specific mission mechanic.",
        ],
      },
      {
        heading: "Bottom line",
        body: [
          "Cal looks like one of GTA 6's classic Rockstar supporting characters: funny on the surface, socially specific, and potentially useful to the protagonists in ways that make sense inside the satire.",
          "See all GTA 6 characters and Jason Duval.",
        ],
      },
      {
        heading: "Primary source",
        body: ["Rockstar Games - Cal Hampton official character profile.", "---"],
      },
      {
        heading: "Who Cal Hampton is",
        body: [
          "Rockstar describes Cal as Jason’s friend and a fellow associate of Brian Heder. He prefers staying home, monitoring Coast Guard communications and feeding a conspiracy-minded worldview with beer and private browser tabs.",
          "This makes Cal a useful information-node character even before Rockstar explains his mission role.",
        ],
      },
      {
        heading: "Fact versus interpretation",
        body: [
          "Confirmed: friendship with Jason, association with Brian, Coast Guard monitoring and a paranoid personality. Interpretation: Cal may provide information, surveillance or mission leads. Keep that second category clearly labeled until gameplay confirms it.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
          "For “Cal Hampton GTA 6,” this matters because pre-release GTA coverage changes quickly. A status-based page can stay useful after each reveal without rewriting older observations as if they had always been official.",
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
        label: "PC Gamer - GTA 6 Characters",
        url: "https://www.pcgamer.com/games/action/grand-theft-auto/gta6-characters/",
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
        href: "/wiki/characters/jason",
        label: "Jason Duval",
      },
    ],
  },
  {
    slug: "boobie-ike",
    type: "characters",
    name: "Boobie Ike",
    overview:
      "Boobie Ike is one of the supporting characters Rockstar has officially introduced for GTA 6 and appears closely tied to Vice City's nightlife and business scene.",
    status: "scheduled",
    publishAt: "2026-09-16T13:00:00Z",
    lastVerified: "2026-08-29",
    seoTitle: "Boobie Ike in GTA 6: Vice City Businessman and Nightlife Figure",
    metaDescription:
      "Who is Boobie Ike in GTA 6? Here’s what Rockstar has confirmed about his Vice City businesses, nightlife influence and connection to Dre’Quan Priest.",
    intro: [
      "Unlike Jason's Keys-based associates, Boobie represents the more public, flashy side of Leonida's economy.",
    ],
    sections: [
      {
        heading: "Boobie's place in Vice City",
        body: [
          "Rockstar's character network links Boobie with a strip-club environment and with Dre'Quan Priest, whose music career has used Boobie's venue as part of its early ecosystem.",
          "That immediately places Boobie at the intersection of entertainment, business and street relationships.",
        ],
      },
      {
        heading: "Connection to Dre'Quan Priest",
        body: [
          "Dre'Quan's official biography says his ambitions may soon outgrow booking acts into Boobie's club now that he has signed Real Dimez.",
          "That relationship is useful because it shows how GTA 6's supporting cast overlaps. These are not isolated character cards; Rockstar is building a network in which businesses, artists and criminals know one another.",
        ],
      },
      {
        heading: "Is Boobie a villain?",
        body: [
          "Rockstar has not labeled him an antagonist.",
          "Until the game reveals how Jason and Lucia interact with him, “businessman,” “nightlife figure” or “supporting character” is more accurate than assuming he is a boss or enemy.",
        ],
      },
      {
        heading: "Why he matters",
        body: [
          "GTA has always used clubs, music and nightlife to make its cities feel culturally specific.",
          "Boobie's role suggests Vice City's entertainment scene may be integrated into the story rather than existing only as optional scenery.",
        ],
      },
      {
        heading: "Bottom line",
        body: [
          "Boobie Ike is a useful example of GTA 6's wider character design: he occupies a recognizable piece of Vice City life and connects directly to other named characters.",
          "Explore Dre'Quan Priest and the GTA 6 music scene or return to all GTA 6 characters.",
        ],
      },
      {
        heading: "Primary source",
        body: ["Rockstar Games official GTA VI character and location material.", "---"],
      },
      {
        heading: "Boobie Ike’s business network",
        body: [
          "Rockstar calls Boobie a Vice City legend who turned street success into a legitimate empire spanning real estate, a strip club and a recording studio. That makes him more than a colorful side character: he sits at the intersection of property, nightlife, music and crime.",
          "His partnership with Dre’Quan Priest around Only Raw Records is the strongest confirmed relationship on the business side of the cast.",
        ],
      },
      {
        heading: "Why Boobie matters to the world model",
        body: [
          "Characters tied to businesses can help the site connect narrative entities with location entities. A Boobie page should therefore link to the Vice City hub, Dre’Quan, Real Dimez, Only Raw Records and any confirmed club or property pages as Rockstar names them.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
          "For “Boobie Ike GTA 6,” this matters because pre-release GTA coverage changes quickly. A status-based page can stay useful after each reveal without rewriting older observations as if they had always been official.",
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
        label: "PC Gamer - GTA 6 Characters",
        url: "https://www.pcgamer.com/games/action/grand-theft-auto/gta6-characters/",
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
        href: "/wiki/map/vice-city",
        label: "Vice City",
      },
    ],
  },
  {
    slug: "raul-bautista",
    type: "characters",
    name: "Raul Bautista",
    overview:
      "Raul Bautista is one of GTA 6's most clearly defined criminal supporting characters.",
    status: "scheduled",
    publishAt: "2026-09-17T13:00:00Z",
    lastVerified: "2026-08-29",
    seoTitle: "Raul Bautista in GTA 6: The Experienced Bank Robber Raising the Stakes",
    metaDescription:
      "Raul Bautista is GTA 6’s seasoned bank robber. Learn what Rockstar confirms about his personality, crew-building style and appetite for risky scores.",
    intro: [
      "Rockstar describes him as a seasoned bank robber with confidence, charm and cunning-someone constantly looking for talented people willing to take the risks that produce bigger rewards.",
    ],
    sections: [
      {
        heading: "Raul's confirmed profile",
        body: [
          "Raul is experienced rather than impulsively new to crime.",
          "That makes him a useful contrast with Jason and Lucia, whose story premise begins when an “easy score” goes wrong and pushes them into a much larger conspiracy.",
        ],
      },
      {
        heading: "Why Rockstar emphasizes risk",
        body: [
          "The most revealing part of Raul's profile is not that he robs banks. It is that his recklessness keeps increasing the stakes.",
          "Rockstar says his crew may eventually have to double down or walk away.",
          "That language suggests tension around how far professional criminals are willing to follow him.",
        ],
      },
      {
        heading: "Is Raul connected to Jason and Lucia?",
        body: [
          "Official promotional material places all of these characters inside the same GTA 6 world, but Rockstar has not published a complete relationship chart.",
          "Do not claim Raul is Jason's mentor, final antagonist or permanent heist leader unless the game or Rockstar confirms it.",
        ],
      },
      {
        heading: "Could Raul introduce heist missions?",
        body: [
          "His bank-robber identity makes that a reasonable possibility, but it remains an inference.",
          "The safer pre-release wording is: Raul provides clear narrative justification for bank-robbery missions or crews, but the exact mission structure is not yet known.",
        ],
      },
      {
        heading: "Bottom line",
        body: [
          "Raul represents the professional, higher-risk end of GTA 6's criminal ecosystem. Where Cal is an eccentric friend and Boobie is rooted in nightlife, Raul is defined by scores, crews and escalating danger.",
          "See all GTA 6 characters and our GTA 6 gameplay hub.",
        ],
      },
      {
        heading: "Primary source",
        body: ["Rockstar Games - Raul Bautista official profile.", "---"],
      },
      {
        heading: "Raul Bautista’s confirmed role",
        body: [
          "Rockstar describes Raul as a seasoned bank robber defined by confidence, charm and cunning. He looks for people willing to take high risks for high rewards, and Rockstar explicitly warns that his recklessness raises the stakes with every score.",
          "That establishes a professional-heist identity without needing to invent his exact number of missions or relationship to Jason and Lucia.",
        ],
      },
      {
        heading: "What to track as new footage arrives",
        body: [
          "Watch for crew membership, named heists, vehicles, weapons, safehouses and whether Raul is a recurring planner or a temporary partner. Those are useful future entity fields and should only be filled from direct evidence.",
        ],
      },
      {
        heading: "How to read the evidence labels",
        body: [
          "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
          "For “Raul Bautista GTA 6,” this matters because pre-release GTA coverage changes quickly. A status-based page can stay useful after each reveal without rewriting older observations as if they had always been official.",
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
        label: "PC Gamer - GTA 6 Characters",
        url: "https://www.pcgamer.com/games/action/grand-theft-auto/gta6-characters/",
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
        href: "/wiki/characters/lucia",
        label: "Lucia Caminos",
      },
    ],
  },
  // Characters
  {
    slug: "jason",
    pendingRevision: {
      publishAt: "2026-09-12T13:00:00Z",
      lastVerified: "2026-08-29",
      note: "Day 15 of the 30-day plan: upgraded entity page.",
      changes: {
        seoTitle: "Jason Duval in GTA 6: Backstory, Role and Everything Rockstar Has Confirmed",
        metaDescription:
          "Jason Duval is one of GTA 6’s two protagonists. Here’s his confirmed Army background, Leonida Keys connection and relationship with Lucia.",
        overview:
          "Jason Duval is one of the two playable protagonists in GTA 6, alongside Lucia Caminos.",
        intro: [
          "Rockstar describes him as someone who wants an easy life but repeatedly finds himself pulled deeper into trouble. His background connects him directly to the Leonida Keys and the criminal networks surrounding GTA 6's main story.",
        ],
        sections: [
          {
            heading: "Jason Duval: confirmed profile",
            table: {
              head: ["Detail", "Confirmed information"],
              rows: [
                ["Full name", "Jason Duval"],
                ["Role", "Playable protagonist"],
                ["Partner", "Lucia Caminos"],
                ["Background", "Troubled teens; later served in the Army"],
                ["Current connection", "Works around local drug runners in the Keys"],
                ["Setting link", "Leonida Keys"],
              ],
            },
          },
          {
            heading: "Jason's backstory",
            body: [
              "Rockstar says Jason grew up around grifters and crooks. After a troubled adolescence, he joined the Army in an attempt to move away from that life.",
              "It did not stick.",
              "He later ended up in the Keys doing work for local drug runners, placing him back inside the kind of criminal environment he tried to leave.",
              "That history gives Jason a different starting point from GTA V's protagonists. He is not presented as an established kingpin or retired millionaire criminal. He appears to be someone still trying to decide what kind of life he actually wants.",
            ],
          },
          {
            heading: "Jason and Lucia",
            body: [
              "Rockstar frames meeting Lucia as potentially the best or worst thing to happen to Jason.",
              "The official story premise says an easy score goes wrong and leaves the pair caught in a criminal conspiracy across Leonida. They are forced to rely on each other.",
              "The Extended Look reinforces that partnership with domestic scenes, driving, gunfights and jobs in which their relationship appears inseparable from the gameplay.",
            ],
          },
          {
            heading: "Is Jason based on Bonnie and Clyde?",
            body: [
              "The internet frequently uses “Bonnie and Clyde” as shorthand for Jason and Lucia because they are a romantic criminal pair.",
              "That is a useful cultural comparison, but Rockstar's current official character pages are more specific about their own backgrounds than about labeling them as direct copies of the historical couple.",
            ],
          },
          {
            heading: "Who voices Jason?",
            body: [
              "Do not treat fan casting or voice-actor identification threads as confirmed unless Rockstar, the actor or official credits verify the role.",
              "This page will add the performer once there is a reliable source.",
            ],
          },
          {
            heading: "Jason in the Extended Look",
            body: [
              "The August showcase gives Jason more personality than the early trailers. He is shown in quiet scenes as well as violent ones, helping establish the contrast between his desire for an easier life and the increasingly dangerous choices around him.",
            ],
          },
          {
            heading: "Bottom line",
            body: [
              "Jason's defining tension is simple: he wants stability but has the skills, connections and circumstances that keep pushing him toward crime.",
              "Read our Lucia Caminos profile and complete GTA 6 character guide.",
            ],
          },
          {
            heading: "Primary source",
            body: [
              "Rockstar Games - Jason Duval official “Only in Leonida” profile and GTA VI Extended Look.",
              "---",
            ],
          },
          {
            heading: "Jason Duval: confirmed biography",
            body: [
              "Rockstar says Jason grew up around grifters and crooks, spent time in the Army after troubled teenage years, and later worked for local drug runners in the Keys. At the start of the story he is connected to Brian Heder and lives at one of Brian’s properties in exchange for helping with local shakedowns.",
              "Those details establish Jason as someone already embedded in Leonida’s lower-level criminal economy before the central conspiracy escalates.",
            ],
          },
          {
            heading: "Jason and Lucia",
            body: [
              "Rockstar frames meeting Lucia as potentially the best or worst thing to happen to Jason. The two are repeatedly shown acting as partners in robberies, travel and domestic scenes. The relationship is therefore both emotional and mechanical: the game’s central story depends on their reliance on each other.",
              "Avoid reducing the pair to a “Bonnie and Clyde” label unless clearly presented as a comparison rather than Rockstar’s formal description.",
            ],
          },
          {
            heading: "Observed gameplay role",
            body: [
              "The Extended Look shows Jason driving, shooting, participating in robberies and moving through domestic/free-roam spaces. It supports the conclusion that he is a central playable protagonist, but it does not yet define every exclusive ability or progression tree.",
              "Keep ability claims in an “observed” or “reported” table until Rockstar publishes a formal gameplay overview.",
            ],
          },
          {
            heading: "How to read the evidence labels",
            body: [
              "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
              "For “Jason Duval GTA 6,” this matters because pre-release GTA coverage changes quickly. A status-based page can stay useful after each reveal without rewriting older observations as if they had always been official.",
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
            label: "Rockstar Games - Only in Leonida: People & Places",
            url: "https://www.rockstargames.com/VI/only-in-leonida",
          },
          {
            label: "Rockstar Games - GTA VI Screenshots",
            needsReview: true,
          },
          {
            label: "PC Gamer - GTA 6 Characters",
            url: "https://www.pcgamer.com/games/action/grand-theft-auto/gta6-characters/",
          },
          {
            label: "Rockstar Games - Grand Theft Auto VI: An Extended Look",
            url: "https://www.rockstargames.com/VI/an-extended-look",
          },
        ],
      },
    },
    type: "characters",
    name: "Jason",
    overview:
      "Jason is one of two playable protagonists in Grand Theft Auto VI. Rockstar frames him as someone who has 'been involved in criminal life' and drawn to trouble; he forms the calmer half of the Jason–Lucia duo.",
    background:
      "A widely repeated fan theory holds that Jason has a military background, but Rockstar has not confirmed this — it is inference from the trailer, not an official detail. What Rockstar's own description supports is that Jason knows Vice City's criminal underworld and partners with Lucia.",
    roleInGta6:
      "Co-protagonist alongside Lucia. The pair is positioned as a modern Bonnie-and-Clyde, with Jason providing tactical execution to Lucia's instinct.",
    details: [
      { label: "Status", value: "Playable protagonist" },
      { label: "Partner", value: "Lucia" },
      { label: "Region", value: "Leonida / Vice City" },
      { label: "Archetype", value: "Calm operator" },
    ],
    related: [
      { type: "characters", href: "/wiki/characters/lucia", label: "Lucia" },
      { type: "pillar", href: "/gta-6-characters", label: "GTA 6 Characters Hub" },
      { type: "map", href: "/wiki/map/vice-city", label: "Vice City" },
    ],
    trivia: [
      "First confirmed playable male protagonist since Trevor, Michael, and Franklin in GTA V.",
      "Voice actor remains unannounced as of 2026.",
    ],
  },
  {
    slug: "lucia",
    pendingRevision: {
      publishAt: "2026-09-13T13:00:00Z",
      lastVerified: "2026-08-29",
      note: "Day 16 of the 30-day plan: upgraded entity page.",
      changes: {
        seoTitle: "Lucia Caminos in GTA 6: Backstory, Prison History and Role Explained",
        metaDescription:
          "Lucia Caminos is one of GTA 6’s two playable protagonists. Here’s what Rockstar confirms about her family, prison history, Jason and ambitions.",
        overview:
          "Lucia Caminos is one of GTA 6's two playable protagonists and the character who introduced the game's story to millions of viewers in its first reveal.",
        intro: [
          "Rockstar's later character material has given her a much clearer history: Lucia grew up learning to fight, ended up in the Leonida Penitentiary while fighting for her family, and emerges determined to make smarter moves.",
        ],
        sections: [
          {
            heading: "Lucia Caminos: confirmed profile",
            table: {
              head: ["Detail", "Confirmed information"],
              rows: [
                ["Full name", "Lucia Caminos"],
                ["Role", "Playable protagonist"],
                ["Partner", "Jason Duval"],
                ["Prison", "Leonida Penitentiary"],
                [
                  "Family link",
                  "Her father taught her to fight; her mother dreamed of a better life",
                ],
                [
                  "Earlier family connection",
                  "Rockstar references the family's days in Liberty City",
                ],
              ],
            },
          },
          {
            heading: "Lucia's prison history",
            body: [
              "Rockstar says fighting for her family landed Lucia in the Leonida Penitentiary and that luck helped her get out.",
              "Trailer 1's opening prison scene therefore was not just a dramatic introduction. It establishes the point from which Lucia's new plan begins.",
            ],
          },
          {
            heading: "What does Lucia want?",
            body: [
              "More than anything, Rockstar says Lucia wants the “good life” her mother dreamed about.",
              "The difference is that Lucia is unwilling to leave that future to fantasy. She intends to take action.",
              "That ambition makes her more than Jason's criminal partner. She has her own family history, motivation and willingness to drive the pair's decisions.",
            ],
          },
          {
            heading: "Lucia and Jason",
            body: [
              "Rockstar says a life with Jason could be Lucia's way out.",
              "The game's central story begins when an easy score goes wrong, trapping them inside a conspiracy that stretches across Leonida.",
              "The Extended Look shows the two characters as partners in both ordinary and dangerous moments, suggesting the relationship itself will carry much of the narrative.",
            ],
          },
          {
            heading: "Is Lucia the first female GTA protagonist?",
            body: [
              "She is the first confirmed playable woman at the center of a modern mainline 3D-era GTA story.",
              "Be careful with absolute “first ever in GTA history” phrasing because earlier 2D-era GTA releases allowed female player characters.",
            ],
          },
          {
            heading: "Lucia's fighting ability",
            body: [
              "Rockstar's biography says her father taught her to fight from a very young age. Official footage backs up the idea that she is physically capable, but exact combat stats or character-specific skill systems have not been published.",
            ],
          },
          {
            heading: "Bottom line",
            body: [
              "Lucia's story is about control: after prison and years of family struggle, she is trying to stop reacting to circumstances and start shaping them.",
              "Read Jason Duval and all GTA 6 characters.",
            ],
          },
          {
            heading: "Primary source",
            body: [
              "Rockstar Games - Lucia Caminos official profile, GTA VI trailers and Extended Look.",
              "---",
            ],
          },
          {
            heading: "Lucia Caminos: confirmed biography",
            body: [
              "Rockstar says Lucia’s father taught her to fight from a very young age. Fighting for her family led to Leonida Penitentiary, and luck helped her get out. Her stated motivation is to pursue the better life her mother dreamed of, with Jason potentially becoming part of her escape from the odds stacked against her.",
              "This makes family, incarceration and ambition the strongest confirmed pillars of her biography.",
            ],
          },
          {
            heading: "How to describe Lucia accurately in franchise history",
            body: [
              "Lucia is a central playable woman in a modern mainline 3D-era Grand Theft Auto story. Avoid the blanket phrase “first female GTA protagonist ever,” because early GTA titles allowed female character choices. Precise wording protects the page from an easy factual criticism and is more useful for knowledge engines.",
              "If Rockstar later describes her historical status in a specific way, quote that wording instead.",
            ],
          },
          {
            heading: "Lucia’s gameplay portrayal",
            body: [
              "Official footage presents Lucia as an active participant in robberies, gunfights, driving and the partnership with Jason. Her prison history is directly established; claims about unique skills, stat bonuses or exclusive mechanics remain unconfirmed unless Rockstar documents them.",
            ],
          },
          {
            heading: "How to read the evidence labels",
            body: [
              "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
              "For “Lucia Caminos GTA 6,” this matters because pre-release GTA coverage changes quickly. A status-based page can stay useful after each reveal without rewriting older observations as if they had always been official.",
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
            label: "Rockstar Games - Only in Leonida: People & Places",
            url: "https://www.rockstargames.com/VI/only-in-leonida",
          },
          {
            label: "Rockstar Games - GTA VI Screenshots",
            needsReview: true,
          },
          {
            label: "PC Gamer - GTA 6 Characters",
            url: "https://www.pcgamer.com/games/action/grand-theft-auto/gta6-characters/",
          },
          {
            label: "Rockstar Games - Grand Theft Auto VI: An Extended Look",
            url: "https://www.rockstargames.com/VI/an-extended-look",
          },
        ],
      },
    },
    type: "characters",
    name: "Lucia",
    overview:
      "Lucia is the first confirmed female protagonist in a mainline Grand Theft Auto title. She opens the reveal trailer leaving incarceration.",
    background:
      "Of Latina heritage, Lucia's backstory references hardship, incarceration, and a partnership with Jason after release. Leaked dialogue places her at the center of the story's moral choices.",
    roleInGta6:
      "Co-protagonist. The trailer frames her as the driving force of the duo's escalating crimes.",
    details: [
      { label: "Status", value: "Playable protagonist" },
      { label: "Partner", value: "Jason" },
      { label: "Region", value: "Leonida / Vice City" },
      { label: "Archetype", value: "Driven instigator" },
    ],
    related: [
      { type: "characters", href: "/wiki/characters/jason", label: "Jason" },
      { type: "pillar", href: "/gta-6-characters", label: "GTA 6 Characters Hub" },
    ],
    trivia: [
      "First female lead protagonist in mainline GTA history.",
      "Her opening scene mirrors classic crime-film prison-release tropes.",
    ],
  },
  // Vehicles
  {
    slug: "sports-cars-overview",
    type: "vehicles",
    name: "Sports Cars Overview",
    overview:
      "Vice City's sports car class is expected to include manufacturers analogous to Ferrari, Lamborghini, and Porsche, with updated handling physics.",
    background:
      "GTA V's sports class peaked with the Pariah and Itali RSX. GTA VI is expected to expand the class with hybrid hypercars and electric supercars reflecting 2026 automotive reality.",
    roleInGta6:
      "High-performance street class for top-speed runs, mission getaways, and street racing activities.",
    details: [
      { label: "Class", value: "Sports / Super" },
      { label: "Top Speed (est.)", value: "200+ mph" },
      { label: "Drivetrain", value: "RWD / AWD / EV" },
    ],
    related: [
      { type: "vehicles", href: "/wiki/vehicles/suvs-overview", label: "SUVs Overview" },
      { type: "vehicles", href: "/wiki/vehicles/bikes-overview", label: "Bikes Overview" },
      { type: "pillar", href: "/gta-6-vehicles", label: "GTA 6 Vehicles Hub" },
    ],
    trivia: ["Trailer footage shows what appears to be a Lamborghini Revuelto analog."],
  },
  {
    slug: "suvs-overview",
    type: "vehicles",
    name: "SUVs Overview",
    overview:
      "SUVs in GTA VI span luxury (Cavalcade analogs), off-road (Mesa successors), and law enforcement variants.",
    background:
      "The SUV class historically bridges utility and mission roles. Vice City's varied terrain (urban, swamp, rural) increases SUV viability.",
    roleInGta6:
      "Utility class — passenger capacity, off-road capability, and durability for crew-based missions.",
    details: [
      { label: "Class", value: "SUV" },
      { label: "Typical Seats", value: "4-6" },
      { label: "Terrain", value: "All-surface" },
    ],
    related: [
      { type: "vehicles", href: "/wiki/vehicles/sports-cars-overview", label: "Sports Cars" },
      { type: "pillar", href: "/gta-6-vehicles", label: "GTA 6 Vehicles Hub" },
    ],
    trivia: ["Expect dedicated police SUV variants for Vice City PD and FIB analogs."],
  },
  {
    slug: "bikes-overview",
    type: "vehicles",
    name: "Bikes Overview",
    overview:
      "Motorcycles return with expanded sport, cruiser, and dirt categories, plus dedicated lean physics improvements.",
    background:
      "Bikes in GTA V were favored for traffic navigation. GTA VI's denser urban traffic increases their tactical value.",
    roleInGta6:
      "Traversal, escape, and biker-gang storylines. Likely featured in dedicated MC content post-launch.",
    details: [
      { label: "Class", value: "Motorcycle" },
      { label: "Sub-types", value: "Sport, Cruiser, Dirt, Scooter" },
    ],
    related: [
      { type: "gangs", href: "/wiki/gangs/main-gangs-overview", label: "Gangs Overview" },
      { type: "pillar", href: "/gta-6-vehicles", label: "GTA 6 Vehicles Hub" },
    ],
    trivia: [
      "Trailer shows scooter-based delivery NPCs, suggesting working-class traffic simulation.",
    ],
  },
  // Map
  {
    slug: "vice-city",
    pendingRevision: {
      publishAt: "2026-09-10T13:00:00Z",
      lastVerified: "2026-08-29",
      note: "Day 13 of the 30-day plan: upgraded entity page.",
      changes: {
        seoTitle: "GTA 6 Vice City: What Rockstar’s Modern Miami Looks Like",
        metaDescription:
          "Vice City returns in GTA 6 as a modern Miami-inspired metropolis inside Leonida. Here’s what Rockstar has officially shown so far.",
        overview:
          "Vice City is back, but GTA 6's version is much larger in concept than the city players remember from 2002.",
        intro: [
          "Rockstar now places Vice City inside the wider state of Leonida, allowing the series to move between neon nightlife, beaches, high-rise business districts, suburbs, ports and a much larger road network.",
        ],
        sections: [
          {
            heading: "Is Vice City based on Miami?",
            body: [
              "Yes. Vice City has always been Rockstar's fictional interpretation of Miami, and GTA 6 makes the connection unmistakable.",
              "Official footage includes pastel hotels, broad beaches, luxury towers, causeways, nightlife, exotic cars, marinas and neighborhoods that echo modern Miami culture.",
              "The important distinction is that GTA 6 is satire, not a geographic simulator. Rockstar combines and exaggerates real-world influences.",
            ],
          },
          {
            heading: "What has changed since GTA: Vice City?",
            body: [
              "The biggest change is time.",
              "The 2002 game was heavily shaped by 1980s Miami. GTA 6 is explicitly contemporary. Phones, livestream-style clips, viral behavior, influencer culture and modern nightlife all form part of the city's identity.",
              "That gives Rockstar a new social target while retaining the neon visual language associated with Vice City.",
            ],
          },
          {
            heading: "Vice City is not the whole GTA 6 map",
            body: [
              "This is one of the easiest misconceptions to correct.",
              "GTA 6 takes place across Leonida. Rockstar has also named the Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga National Park.",
              "Vice City is the center of gravity, not the border of the game.",
            ],
          },
          {
            heading: "What can players do in Vice City?",
            body: [
              "The Extended Look shows driving, robberies, police pursuits, nightlife, apartment scenes, sports, shopping/customization environments and criminal activity across the city.",
              "Rockstar has not yet published a final activity directory, so our GTA 6 activities guide separates clearly playable activities from things merely visible in footage.",
            ],
          },
          {
            heading: "Does Vice City have enterable interiors?",
            body: [
              "Official footage shows a wide range of interior spaces.",
              "That supports the conclusion that interiors matter to GTA 6's world design. It does not confirm the common rumor that “every building” or a fixed percentage of buildings can be entered.",
            ],
          },
          {
            heading: "Real Miami vs Vice City",
            body: [
              "Part of the fun is recognizing inspirations. South Beach, downtown/Brickell-style towers, Wynwood-like art districts and Miami's boating culture all appear to influence Rockstar's design.",
              "We recommend framing comparison pages around visual evidence rather than claiming exact one-to-one matches.",
            ],
          },
          {
            heading: "Bottom line",
            body: [
              "GTA 6's Vice City keeps the sun, neon and excess of the classic setting but relocates it into the social-media era and a far larger state-scale world.",
              "See GTA 6 map and all confirmed locations.",
            ],
          },
          {
            heading: "Vice City’s role in GTA VI",
            body: [
              "Rockstar’s tagline “Vice City, USA” makes the city the cultural center of the game, but GTA VI clearly extends beyond it into the wider state of Leonida. That means this page should explain Vice City as an urban entity, not as a synonym for the entire map.",
              "Official imagery shows beaches, high-rise districts, nightlife, highways, ports, shopping, dense pedestrian spaces and social-media satire. The city is both a location and a narrative machine for fame, crime, money and spectacle.",
            ],
          },
          {
            heading: "What is new compared with the 2002 Vice City",
            body: [
              "The modern version is not a simple remake of the 2002 game world. Rockstar is depicting a contemporary metropolis with smartphone-era culture, viral video behavior, modern vehicles and a wider state around it. The useful comparison is thematic continuity plus a new scale and era, not street-for-street equivalence.",
              "Keep nostalgia references in a separate section so they do not crowd out current GTA VI facts.",
            ],
          },
          {
            heading: "City entities worth tracking",
            body: [
              "As Rockstar names districts, clubs, stores, ports and institutions, give each a canonical entry and link back to this hub. Boobie Ike’s businesses, Only Raw Records and the Ultimate Edition service locations are early examples of entities that can strengthen a Vice City knowledge graph.",
            ],
          },
          {
            heading: "How to read the evidence labels",
            body: [
              "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
              "For “GTA 6 Vice City,” this matters because pre-release GTA coverage changes quickly. A status-based page can stay useful after each reveal without rewriting older observations as if they had always been official.",
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
            label: "Rockstar Games - Only in Leonida: People & Places",
            url: "https://www.rockstargames.com/VI/only-in-leonida",
          },
          {
            label: "Rockstar Games - GTA VI Screenshots",
            needsReview: true,
          },
          {
            label: "PC Gamer - GTA 6 Map",
            url: "https://www.pcgamer.com/games/grand-theft-auto/gta6-map/",
          },
        ],
      },
    },
    type: "map",
    name: "Vice City",
    overview:
      "Vice City returns as the central urban setting of GTA VI, reimagined as a modern Miami analog within the state of Leonida.",
    background:
      "Vice City debuted in 2002 as a 1980s-themed standalone. GTA VI brings the city into contemporary 2026, with neon corridors, art-deco neighborhoods, and beachfront sprawl.",
    roleInGta6:
      "Primary city hub. Most missions, story beats, and online content are expected to center here.",
    details: [
      { label: "State", value: "Leonida" },
      { label: "Inspired by", value: "Miami, FL" },
      { label: "Era", value: "Contemporary 2026" },
    ],
    related: [
      { type: "map", href: "/wiki/map/rural-areas", label: "Rural Areas" },
      { type: "map", href: "/wiki/map/urban-districts", label: "Urban Districts" },
      { type: "pillar", href: "/gta-6-map", label: "GTA 6 Map Hub" },
    ],
    trivia: ["Trailer shows a Spring Breakers-inspired beach sequence."],
  },
  {
    slug: "rural-areas",
    type: "map",
    name: "Rural Areas",
    overview:
      "Beyond Vice City, the state of Leonida includes Everglades-style swamps, panhandle farmland, and Keys-like island chains.",
    background:
      "Rockstar's rural design philosophy (RDR2, Blaine County) emphasizes ecological density and emergent encounters.",
    roleInGta6:
      "Provides contrast to urban Vice City. Expect wildlife, smuggling missions, and side activities here.",
    details: [
      { label: "Biomes", value: "Swamp, farmland, beach, island" },
      { label: "Estimated Size", value: "~60% of total map" },
    ],
    related: [
      { type: "map", href: "/wiki/map/vice-city", label: "Vice City" },
      { type: "pillar", href: "/gta-6-map", label: "GTA 6 Map Hub" },
    ],
    trivia: ["Alligator NPCs visible in trailer suggest dynamic wildlife systems."],
  },
  {
    slug: "urban-districts",
    type: "map",
    name: "Urban Districts",
    overview:
      "Vice City's districts include Ocean Beach, Little Haiti, downtown high-rises, and the port industrial zone.",
    background:
      "District design borrows from Miami's neighborhood identities, scaled and remixed for gameplay variety.",
    roleInGta6: "Districts gate mission types, gang territory, and property ownership systems.",
    details: [
      { label: "Districts (est.)", value: "8-12 named neighborhoods" },
      { label: "Vertical Density", value: "High — significant high-rise interiors" },
    ],
    related: [
      { type: "map", href: "/wiki/map/vice-city", label: "Vice City" },
      { type: "pillar", href: "/gta-6-map", label: "GTA 6 Map Hub" },
    ],
    trivia: ["Interior density appears significantly higher than GTA V's Los Santos."],
  },
  {
    slug: "key-landmarks",
    type: "map",
    name: "Key Landmarks",
    overview:
      "Recognizable Vice City landmarks include the Malibu Club analog, Ocean Drive strip, and the rebuilt Vercetti Estate area.",
    background:
      "Landmark callbacks reward returning players from Vice City (2002) while serving as navigation anchors.",
    roleInGta6: "Mission hubs, fast-travel anchors, and online meetup points.",
    details: [{ label: "Landmark Count (est.)", value: "20-30 named locations" }],
    related: [{ type: "pillar", href: "/gta-6-map", label: "GTA 6 Map Hub" }],
    trivia: ["Easter eggs referencing Tommy Vercetti are speculated but unconfirmed."],
  },
  // Weapons
  {
    slug: "guns-overview",
    type: "weapons",
    name: "Guns Overview",
    overview:
      "GTA VI's firearms span pistols, SMGs, shotguns, rifles, snipers, and heavy weapons, with expected weapon customization.",
    background:
      "GTA V introduced the weapon wheel and per-weapon mods. GTA VI is expected to expand modding with optics, grips, and ammo types.",
    roleInGta6: "Combat backbone — used in missions, free roam, and online activities.",
    details: [
      { label: "Categories", value: "Pistol, SMG, Shotgun, Rifle, Sniper, Heavy, Throwable" },
      { label: "Modding", value: "Expanded — optics, ammo, grips" },
    ],
    related: [
      { type: "weapons", href: "/wiki/weapons/melee-weapons", label: "Melee Weapons" },
      { type: "pillar", href: "/gta-6-weapons", label: "GTA 6 Weapons Hub" },
    ],
    trivia: ["RDR2-style item-wheel and weapon-carry limits are speculated to return."],
  },
  {
    slug: "melee-weapons",
    type: "weapons",
    name: "Melee Weapons",
    overview:
      "Melee options include fists, knives, blunt objects, and improvised weapons. RDR2-style holstering is expected.",
    background:
      "Melee combat in GTA V was simplistic. RDR2 added grappling and finisher mechanics likely to carry forward.",
    roleInGta6: "Stealth, low-noise takedowns, and bar-fight encounters.",
    details: [{ label: "Types", value: "Fists, Knife, Bat, Improvised" }],
    related: [
      { type: "weapons", href: "/wiki/weapons/guns-overview", label: "Guns Overview" },
      { type: "pillar", href: "/gta-6-weapons", label: "GTA 6 Weapons Hub" },
    ],
    trivia: ["Stealth takedowns are visible in leaked footage."],
  },
  // Gangs
  {
    slug: "main-gangs-overview",
    type: "gangs",
    name: "Main Gangs Overview",
    overview:
      "Vice City's gang ecosystem includes street crews, cartels, biker MCs, and corporate-criminal hybrids.",
    background:
      "Gangs historically gate territory, missions, and reputation systems. GTA VI is expected to use dynamic gang-territory shifts.",
    roleInGta6: "Enemies, allies, and territory-control opponents.",
    details: [{ label: "Faction Count (est.)", value: "6-10 named groups" }],
    related: [{ type: "gangs", href: "/wiki/gangs/police-system", label: "Police System" }],
    trivia: ["Cartel storylines tie into the swamp/Keys smuggling regions."],
  },
  {
    slug: "police-system",
    pendingRevision: {
      publishAt: "2026-09-22T13:00:00Z",
      lastVerified: "2026-08-29",
      note: "Day 25 of the 30-day plan: upgraded entity page.",
      changes: {
        seoTitle: "GTA 6 Police and Wanted System: What the Extended Look Reveals",
        metaDescription:
          "What do we know about GTA 6 police and wanted levels? The Extended Look shows chases and escalation, but many viral AI claims remain unconfirmed.",
        overview:
          "Police pursuits are a defining part of Grand Theft Auto, and the GTA 6 Extended Look finally gives us longer official sequences to examine.",
        intro: [
          "The footage confirms active police chases, armed response and wanted-level gameplay, but it does not validate every leak-era claim about witness memory, CCTV or hyper-advanced police AI.",
        ],
        sections: [
          {
            heading: "What is clearly shown",
            body: [
              "marked police vehicles;",
              "vehicle pursuits;",
              "armed officers;",
              "escalation during criminal activity;",
              "wanted-level interface elements;",
              "close integration between missions and police response.",
            ],
          },
          {
            heading: "Does GTA 6 have six wanted stars?",
            body: [
              "A six-star level has been reported from the Extended Look presentation and captured interface analysis.",
              "Because pre-release UI can change, we list this as officially observed in current footage, not as a promise that every final build will use exactly the same progression.",
            ],
          },
          {
            heading: "Is police AI smarter?",
            body: [
              "The footage appears more coordinated and grounded than GTA V's decade-old system, but “smarter” is difficult to measure from a showcase.",
              "Claims that police permanently remember clothing, track license plates across the map or use a specific evidence database should remain unconfirmed unless Rockstar or final-game testing proves them.",
            ],
          },
          {
            heading: "Chases may benefit from Leonida's geography",
            body: [
              "Vice City's dense streets, highways, bridges, islands and wetland roads create more varied pursuit spaces than a single urban grid.",
              "That could make escaping feel different depending on where a crime occurs.",
            ],
          },
          {
            heading: "What we still need to test",
            body: [
              "At launch, the useful questions will be:",
              "how quickly stars escalate;",
              "whether changing vehicles helps;",
              "how police search areas work;",
              "whether witnesses matter;",
              "how helicopters and roadblocks scale;",
              "whether rural law enforcement differs from Vice City police.",
              "Those deserve real testing, not pre-release guesswork.",
            ],
          },
          {
            heading: "Bottom line",
            body: [
              "GTA 6 definitely keeps wanted-level police gameplay and appears to make chases a major part of its presentation. The rest should be treated as an open research question until the game is playable.",
            ],
          },
          {
            heading: "Wanted level: what is visible",
            body: [
              "The Extended Look includes a substantial police pursuit, and TechRadar’s live analysis notes a six-star wanted display. PC Gamer’s breakdown also reports descriptive information tied to the protagonists, clothing, vehicle and whether they are together.",
              "These are stronger observations than generic claims that GTA VI “has smarter police.” A dedicated page should record the exact behavior shown and avoid anthropomorphic marketing language.",
            ],
          },
          {
            heading: "Descriptions, vehicles and recognition",
            body: [
              "If police receive a description of the player or vehicle, escaping may involve changing more than location. That is an important design implication, but the full persistence rules are still unknown. We do not yet know exactly how long descriptions last, what clothing changes reset, or how witnesses feed information.",
              "Phrase those as open questions rather than assumed mechanics.",
            ],
          },
          {
            heading: "Six stars does not tell us the full escalation ladder",
            body: [
              "The apparent return of six stars is notable because GTA V used five. It does not by itself confirm military deployment, specific helicopter counts or exact response thresholds. Those details should wait for direct evidence.",
            ],
          },
          {
            heading: "How to read the evidence labels",
            body: [
              "Confirmed means Rockstar Games, Take-Two or an official platform/store source states the fact directly. Observed means the detail is plainly visible in official footage or screenshots but has not been formally named or explained. Reported means a reputable outlet adds context that is not yet in Rockstar’s public documentation. Speculation means an interpretation or prediction and should never be mixed into the confirmed table.",
              "For “GTA 6 wanted system,” this matters because pre-release GTA coverage changes quickly. A status-based page can stay useful after each reveal without rewriting older observations as if they had always been official.",
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
            label: "Rockstar Games - Grand Theft Auto VI: An Extended Look",
            url: "https://www.rockstargames.com/VI/an-extended-look",
          },
          {
            label: "PC Gamer - GTA 6 Gameplay Reveal Breakdown",
            url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-gameplay-reveal-details-breakdown/",
          },
          {
            label: "TechRadar - GTA 6 Extended Look Live Breakdown",
            url: "https://www.techradar.com/news/live/gta-6-extended-look",
          },
        ],
      },
    },
    type: "gangs",
    name: "Police System",
    overview:
      "The Vice City Police Department and state troopers enforce wanted levels with overhauled AI and dynamic response.",
    background:
      "GTA V's wanted system was line-of-sight based. GTA VI is expected to introduce identification, witnesses, and persistent records.",
    roleInGta6: "Adversarial system. Manages crime escalation, chases, and player accountability.",
    details: [
      { label: "Wanted Levels", value: "Likely 1-6 with overhaul" },
      { label: "Forces", value: "VCPD, State Police, FIB analog, IAA analog" },
    ],
    related: [{ type: "gangs", href: "/wiki/gangs/main-gangs-overview", label: "Main Gangs" }],
    trivia: ["Leaks suggest body-cam and witness mechanics."],
  },
];

/** Gated accessors — drafts and future-scheduled entries never render. */
export const publicWiki = (now?: Date) => publicOnly(wiki, now);

export const wikiBySlug = (type: string, slug: string, now?: Date) =>
  publicEntry(
    wiki.find((w) => w.type === type && w.slug === slug),
    now,
  );

export const wikiByType = (type: string, now?: Date) =>
  publicWiki(now).filter((w) => w.type === type);

/** Unfiltered. Editorial tooling only. */
export const allWiki = wiki;
