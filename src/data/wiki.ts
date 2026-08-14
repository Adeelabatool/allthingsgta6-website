export type WikiType = "characters" | "map" | "vehicles" | "weapons" | "gangs" | "companies";

export interface WikiEntry {
  slug: string;
  type: WikiType;
  name: string;
  overview: string;
  background: string;
  roleInGta6: string;
  details: { label: string; value: string }[];
  related: { type: WikiType | "pillar"; href: string; label: string }[];
  trivia: string[];
  updates?: string;
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
  // Characters
  {
    slug: "jason",
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
    trivia: ["Trailer shows scooter-based delivery NPCs, suggesting working-class traffic simulation."],
  },
  // Map
  {
    slug: "vice-city",
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
    roleInGta6:
      "Districts gate mission types, gang territory, and property ownership systems.",
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
    roleInGta6:
      "Mission hubs, fast-travel anchors, and online meetup points.",
    details: [
      { label: "Landmark Count (est.)", value: "20-30 named locations" },
    ],
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
    roleInGta6:
      "Combat backbone — used in missions, free roam, and online activities.",
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
    roleInGta6:
      "Stealth, low-noise takedowns, and bar-fight encounters.",
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
    roleInGta6:
      "Enemies, allies, and territory-control opponents.",
    details: [{ label: "Faction Count (est.)", value: "6-10 named groups" }],
    related: [{ type: "gangs", href: "/wiki/gangs/police-system", label: "Police System" }],
    trivia: ["Cartel storylines tie into the swamp/Keys smuggling regions."],
  },
  {
    slug: "police-system",
    type: "gangs",
    name: "Police System",
    overview:
      "The Vice City Police Department and state troopers enforce wanted levels with overhauled AI and dynamic response.",
    background:
      "GTA V's wanted system was line-of-sight based. GTA VI is expected to introduce identification, witnesses, and persistent records.",
    roleInGta6:
      "Adversarial system. Manages crime escalation, chases, and player accountability.",
    details: [
      { label: "Wanted Levels", value: "Likely 1-6 with overhaul" },
      { label: "Forces", value: "VCPD, State Police, FIB analog, IAA analog" },
    ],
    related: [{ type: "gangs", href: "/wiki/gangs/main-gangs-overview", label: "Main Gangs" }],
    trivia: ["Leaks suggest body-cam and witness mechanics."],
  },
];

export const wikiBySlug = (type: string, slug: string) =>
  wiki.find((w) => w.type === type && w.slug === slug);
export const wikiByType = (type: string) => wiki.filter((w) => w.type === type);
