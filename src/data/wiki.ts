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
    lastVerified: "2026-09-15",
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
          "So Cal is a supporting character unless Rockstar says otherwise.",
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
          "See [all GTA 6 characters](/gta-6-characters) and [Jason Duval](/wiki/characters/jason).",
        ],
      },
      {
        heading: "Primary source",
        body: ["Rockstar Games - Cal Hampton official character profile."],
      },
      {
        heading: "Who Cal Hampton is",
        body: [
          "Rockstar describes Cal as Jason’s friend and a fellow associate of Brian Heder. He prefers staying home, monitoring Coast Guard communications and feeding a conspiracy-minded worldview with beer and private browser tabs.",
          "That suggests he may be a source of information in the story, though Rockstar has not explained his mission role.",
        ],
      },
      {
        heading: "Fact versus interpretation",
        body: [
          "Confirmed: friendship with Jason, association with Brian, Coast Guard monitoring and a paranoid personality. Interpretation: Cal may provide information, surveillance or mission leads.",
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
          "Rockstar has not published Cal's full backstory or his role in the story's missions.",
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
    lastVerified: "2026-09-16",
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
        body: ["Rockstar Games official GTA VI character and location material."],
      },
      {
        heading: "Boobie Ike’s business network",
        body: [
          "Rockstar calls Boobie a Vice City legend who turned street success into a legitimate empire spanning real estate, a strip club and a recording studio. That makes him more than a colorful side character: he sits at the intersection of property, nightlife, music and crime.",
          "His partnership with Dre’Quan Priest around Only Raw Records is the strongest confirmed relationship on the business side of the cast.",
        ],
      },
      {
        heading: "Boobie's connections",
        body: [
          "Boobie is linked to Vice City's nightlife and business world, to Dre’Quan Priest and Real Dimez, and to Only Raw Records.",
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
          "Rockstar has not revealed Boobie's role in the story's missions.",
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
    lastVerified: "2026-09-17",
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
          "Rockstar has not confirmed Raul as Jason's mentor, the final antagonist or a permanent heist leader.",
        ],
      },
      {
        heading: "Could Raul introduce heist missions?",
        body: [
          "His bank-robber identity makes that a reasonable possibility, but it remains an inference.",
          "Put simply, Raul gives the story a clear reason for bank-robbery missions or crews, but the exact mission structure is not known.",
        ],
      },
      {
        heading: "Bottom line",
        body: [
          "Raul represents the professional, higher-risk end of GTA 6's criminal ecosystem. Where Cal is an eccentric friend and Boobie is rooted in nightlife, Raul is defined by scores, crews and escalating danger.",
          "See [all GTA 6 characters](/gta-6-characters) and our [GTA 6 gameplay hub](/gta-6-gameplay).",
        ],
      },
      {
        heading: "Primary source",
        body: ["Rockstar Games - Raul Bautista official profile."],
      },
      {
        heading: "Raul Bautista’s confirmed role",
        body: [
          "Rockstar describes Raul as a seasoned bank robber defined by confidence, charm and cunning. He looks for people willing to take high risks for high rewards, and Rockstar explicitly warns that his recklessness raises the stakes with every score.",
          "That establishes a professional-heist identity without needing to invent his exact number of missions or relationship to Jason and Lucia.",
        ],
      },
      {
        heading: "What we still don't know about Raul",
        body: [
          "Rockstar has not detailed Raul's crew, named heists, vehicles, weapons or safehouses, or whether he is a recurring planner or a temporary partner.",
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
      publishAt: "2026-09-11T13:00:00Z",
      lastVerified: "2026-11-20",
      note: "Day 15 of the 30-day plan: upgraded entity page. Nov 2026: merged duplicate sections, added quick facts.",
      changes: {
        seoTitle: "Jason Duval in GTA 6: Backstory, Role and Quick Facts",
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
                ["Age", "Not publicly confirmed"],
                ["Height", "Not publicly confirmed"],
                ["Voice actor", "Not publicly confirmed by Rockstar"],
              ],
            },
          },
          {
            heading: "Jason's backstory",
            body: [
              "Rockstar says Jason grew up around grifters and crooks. After a troubled adolescence, he joined the Army in an attempt to move away from that life.",
              "It did not stick.",
              "He later ended up in the Keys doing work for local drug runners, placing him back inside the kind of criminal environment he tried to leave. At the start of the story he is connected to Brian Heder and lives at one of Brian’s properties in exchange for helping with local shakedowns.",
              "That history gives Jason a different starting point from GTA V's protagonists. He is not presented as an established kingpin or retired millionaire criminal. He appears to be someone still trying to decide what kind of life he actually wants.",
            ],
          },
          {
            heading: "Jason and Lucia",
            body: [
              "Rockstar frames meeting Lucia as potentially the best or worst thing to happen to Jason.",
              "The official story premise says an easy score goes wrong and leaves the pair caught in a criminal conspiracy across Leonida. They are forced to rely on each other.",
              "The Extended Look reinforces that partnership: the two are repeatedly shown acting as partners in robberies, travel and domestic scenes, so the relationship is both emotional and part of the gameplay.",
            ],
          },
          {
            heading: "Is Jason based on Bonnie and Clyde?",
            body: [
              "The internet frequently uses “Bonnie and Clyde” as shorthand for Jason and Lucia because they are a romantic criminal pair.",
              "That is a useful cultural comparison, but Rockstar's official character pages describe their own backgrounds rather than labelling them as a copy of the historical couple.",
            ],
          },
          {
            heading: "Who voices Jason?",
            body: [
              "Rockstar's official character profile does not name Jason's voice actor. Fan casting and voice-matching threads are not confirmation, so this page will add the performer only once Rockstar, the actor or the game's credits can be checked.",
            ],
          },
          {
            heading: "Jason in the Extended Look",
            body: [
              "The August showcase gives Jason more personality than the early trailers. He is shown in quiet scenes as well as violent ones, helping establish the contrast between his desire for an easier life and the increasingly dangerous choices around him.",
              "It also shows Jason driving, shooting, taking part in robberies and moving through domestic and free-roam spaces. Rockstar has not published a breakdown of abilities exclusive to Jason.",
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
              "Rockstar has not published Jason's age, height, voice actor or a list of abilities exclusive to him.",
            ],
          },
          {
            heading: "Bottom line",
            body: [
              "Jason's defining tension is simple: he wants stability but has the skills, connections and circumstances that keep pushing him toward crime.",
              "Read [Lucia Caminos's profile](/wiki/characters/lucia) and the [full GTA 6 character guide](/gta-6-characters).",
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
            url: "https://www.rockstargames.com/VI/downloads/screenshots",
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
    name: "Jason Duval",
    overview:
      "Jason is one of two playable protagonists in Grand Theft Auto VI. Rockstar frames him as someone who has 'been involved in criminal life' and drawn to trouble; he forms the calmer half of the Jason–Lucia duo.",
    background:
      "A widely repeated fan theory holds that Jason has a military background, but Rockstar has not confirmed this — it is inference from the trailer, not an official detail. What Rockstar's own description supports is that Jason knows Vice City's criminal underworld and partners with Lucia.",
    roleInGta6:
      "Co-protagonist alongside Lucia. The pair is positioned as a modern Bonnie-and-Clyde, with Jason providing tactical execution to Lucia's instinct.",
    details: [
      { label: "Status", value: "Playable protagonist" },
      { label: "Partner", value: "Lucia Caminos" },
      { label: "Region", value: "Leonida Keys" },
    ],
    related: [
      { type: "characters", href: "/wiki/characters/lucia", label: "Lucia Caminos" },
      { type: "pillar", href: "/gta-6-characters", label: "GTA 6 Characters Hub" },
      { type: "map", href: "/wiki/map/vice-city", label: "Vice City" },
      { type: "pillar", href: "/gta-6-map", label: "GTA 6 map: the Leonida Keys and other regions" },
    ],
    trivia: [
      "First confirmed playable male protagonist since Trevor, Michael, and Franklin in GTA V.",
      "Voice actor not publicly confirmed by Rockstar.",
    ],
  },
  {
    slug: "lucia",
    pendingRevision: {
      publishAt: "2026-09-12T13:00:00Z",
      lastVerified: "2026-11-20",
      note: "Day 16 of the 30-day plan: upgraded entity page. Nov 2026: merged duplicate sections, added quick facts.",
      changes: {
        seoTitle: "Lucia Caminos in GTA 6: Backstory, Family and Role Explained",
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
                ["Age", "Not publicly confirmed"],
                ["Height", "Not publicly confirmed"],
                ["Heritage", "Not publicly confirmed by Rockstar"],
                ["Voice actor", "Not publicly confirmed by Rockstar"],
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
              "She is not the first woman players could control in the series, though: earlier 2D-era GTA releases allowed female player characters. If Rockstar describes her place in franchise history in specific words, this page will quote them.",
            ],
          },
          {
            heading: "Lucia's fighting ability and gameplay",
            body: [
              "Rockstar's biography says her father taught her to fight from a very young age. Official footage backs up the idea that she is physically capable, but exact combat stats or character-specific skill systems have not been published.",
              "Official footage shows Lucia taking an active part in robberies, gunfights, driving and the partnership with Jason. Rockstar has not documented unique skills, stat bonuses or mechanics exclusive to her.",
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
              "Rockstar has not published Lucia's age, height, heritage, voice actor or a list of abilities exclusive to her.",
            ],
          },
          {
            heading: "Bottom line",
            body: [
              "Lucia's story is about control: after prison and years of family struggle, she is trying to stop reacting to circumstances and start shaping them.",
              "Read [Jason Duval's profile](/wiki/characters/jason) and the [full GTA 6 character guide](/gta-6-characters).",
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
            url: "https://www.rockstargames.com/VI/downloads/screenshots",
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
    name: "Lucia Caminos",
    overview:
      "Lucia is the first confirmed female protagonist in a mainline Grand Theft Auto title. She opens the reveal trailer leaving incarceration.",
    background:
      "Of Latina heritage, Lucia's backstory references hardship, incarceration, and a partnership with Jason after release. Leaked dialogue places her at the center of the story's moral choices.",
    roleInGta6:
      "Co-protagonist. The trailer frames her as the driving force of the duo's escalating crimes.",
    details: [
      { label: "Status", value: "Playable protagonist" },
      { label: "Partner", value: "Jason Duval" },
      { label: "Region", value: "Leonida / Vice City" },
    ],
    related: [
      { type: "characters", href: "/wiki/characters/jason", label: "Jason Duval" },
      { type: "pillar", href: "/gta-6-characters", label: "GTA 6 Characters Hub" },
    ],
    trivia: [
      "First confirmed playable woman at the center of a modern mainline 3D-era GTA story; earlier 2D-era games let players choose female characters.",
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
      { label: "Top speed", value: "Not announced" },
      { label: "Drivetrain options", value: "Not announced" },
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
      { label: "Seating", value: "Not announced" },
      { label: "Terrain handling", value: "Not announced" },
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
      "Motorcycles appear in official GTA VI footage. The specific sub-classes offered, and any changes to lean physics, have not been announced - the expanded-category framing below is expectation drawn from earlier games.",
    background:
      "Bikes in GTA V were favored for traffic navigation. GTA VI's denser urban traffic increases their tactical value.",
    roleInGta6:
      "Traversal, escape, and biker-gang storylines. Likely featured in dedicated MC content post-launch.",
    details: [
      { label: "Class", value: "Motorcycle" },
      { label: "Sub-types offered", value: "Not announced" },
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
      publishAt: "2026-09-09T13:00:00Z",
      lastVerified: "2026-09-09",
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
              "Rockstar has not yet published a final activity directory, so our [GTA 6 activities guide](/gta-6-activities) separates clearly playable activities from things merely visible in footage.",
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
              "See the [GTA 6 map](/gta-6-map) and [all confirmed locations](/gta-6-locations).",
            ],
          },
          {
            heading: "Vice City’s role in GTA VI",
            body: [
              "Rockstar’s tagline “Vice City, USA” makes the city the cultural centre of the game, but GTA VI clearly extends beyond it into the wider state of Leonida. Vice City is therefore a city within Leonida, not a synonym for the whole map.",
              "Official imagery shows beaches, high-rise districts, nightlife, highways, ports, shopping, dense pedestrian spaces and social-media satire. The city is both a location and a narrative machine for fame, crime, money and spectacle.",
            ],
          },
          {
            heading: "What is new compared with the 2002 Vice City",
            body: [
              "The modern version is not a simple remake of the 2002 game world. Rockstar is depicting a contemporary metropolis with smartphone-era culture, viral video behavior, modern vehicles and a wider state around it. The useful comparison is thematic continuity plus a new scale and era, not street-for-street equivalence.",
            ],
          },
          {
            heading: "Named places in Vice City",
            body: [
              "Rockstar has named some Vice City businesses and places, such as Boobie Ike’s businesses, Only Raw Records and the Ultimate Edition service locations. More will be added here as Rockstar names them.",
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
              "Rockstar has not published a full list of Vice City districts or a final activity directory.",
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
            url: "https://www.rockstargames.com/VI/downloads/screenshots",
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
      { label: "Biomes (seen in official footage)", value: "Swamp, farmland, beach, island" },
      { label: "Share of the map", value: "No official figure published" },
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
      "District names such as Ocean Beach and Little Haiti are drawn from Vice City's earlier incarnation and community mapping. Rockstar has not published a GTA VI district list, so treat any such list as unconfirmed.",
    background:
      "District design borrows from Miami's neighborhood identities, scaled and remixed for gameplay variety.",
    roleInGta6: "Districts gate mission types, gang territory, and property ownership systems.",
    details: [{ label: "Number of districts", value: "Not announced" }],
    related: [
      { type: "map", href: "/wiki/map/vice-city", label: "Vice City" },
      { type: "pillar", href: "/gta-6-map", label: "GTA 6 Map Hub" },
    ],
    trivia: [
      "Rockstar has published no interior-density figures; comparisons with GTA V's Los Santos are community observation, not a measured claim.",
    ],
  },
  {
    slug: "key-landmarks",
    type: "map",
    name: "Key Landmarks",
    overview:
      "Landmark names in circulation - a Malibu Club analog, an Ocean Drive strip, a rebuilt Vercetti Estate - come from Vice City (2002) and community mapping rather than a published GTA VI landmark list. Treat all of them as unconfirmed.",
    background:
      "Landmark callbacks would reward returning players from Vice City (2002) while serving as navigation anchors. That is the expectation the 2002 game sets, not something Rockstar has committed to for GTA VI.",
    roleInGta6: "Mission hubs, fast-travel anchors, and online meetup points.",
    details: [{ label: "Named landmarks", value: "No official list or count published" }],
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
      { label: "Categories", value: "Not announced" },
      { label: "Weapon modding", value: "Not announced" },
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
    details: [{ label: "Types", value: "Not announced" }],
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
    details: [{ label: "Number of factions", value: "Not announced" }],
    related: [{ type: "gangs", href: "/wiki/gangs/police-system", label: "Police System" }],
    trivia: ["Cartel storylines tie into the swamp/Keys smuggling regions."],
  },
  {
    slug: "police-system",
    pendingRevision: {
      publishAt: "2026-09-23T13:00:00Z",
      lastVerified: "2026-09-23",
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
              "We list this as observed in Rockstar's footage. It has not been verified in the released game here yet.",
            ],
          },
          {
            heading: "Is police AI smarter?",
            body: [
              "The footage appears more coordinated and grounded than GTA V's decade-old system, but “smarter” is difficult to measure from a showcase.",
              "Claims that police permanently remember clothing, track license plates across the map or use a specific evidence database are unconfirmed. Rockstar has not documented them, and they have not been tested here.",
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
              "These have not been tested here yet.",
            ],
          },
          {
            heading: "Bottom line",
            body: [
              "GTA 6 definitely keeps wanted-level police gameplay and appears to make chases a major part of its presentation. The rest has not been verified in the released game yet.",
            ],
          },
          {
            heading: "Wanted level: what is visible",
            body: [
              "The Extended Look includes a substantial police pursuit, and TechRadar’s live analysis notes a six-star wanted display. PC Gamer’s breakdown also reports descriptive information tied to the protagonists, clothing, vehicle and whether they are together.",
              "These are specific, checkable observations rather than a general claim that GTA VI “has smarter police.” What follows records the behaviour actually shown, in plain terms.",
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
              "The apparent return of six stars is notable because GTA V used five. It does not by itself confirm military deployment, specific helicopter counts or exact response thresholds. Those details are not confirmed.",
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
            url: "https://www.techradar.com/news/live/grand-theft-auto-6-extended-look-on-netflix-live",
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
      { label: "Wanted levels", value: "Not announced" },
      { label: "Law-enforcement agencies", value: "Not announced" },
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
