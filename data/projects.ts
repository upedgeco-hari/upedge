import type { Media, Project, ProjectCategory, ProjectImage } from "@/lib/types";

/**
 * HOW TO ADD A PROJECT
 * 1. Upload photos to Cloudinary in  upedge/projects/{slug}/  named in order:
 *    01-before, 02-foundation, 03-structure, 04-finishing, 05-final, 06-... (any number, minimum 5)
 * 2. Copy one entry below, change the slug, text and the shots list.
 * 3. Set status: "live". (Or enable auto-discovery, see README, and skip the shots list.)
 *
 * While status is "placeholder", labelled placeholders render instead of Cloudinary images.
 */

/** [file name, stage label shown on site, caption] */
type Shot = readonly [file: string, stage: string, caption: string];

const base = (slug: string) => `upedge/projects/${slug}`;

function frames(slug: string, title: string, status: Project["status"], shots: readonly Shot[]): ProjectImage[] {
  return shots.map(([file, stage, caption]) => ({
    publicId: `${base(slug)}/${file}`, // <- swap a single ID here when a photo changes
    stage,
    caption,
    alt: `${title}: ${stage.toLowerCase()} stage. ${caption}`,
    placeholder: status === "placeholder",
    label: `${base(slug)}/${file}`,
  }));
}

const defaultShots = (site: string, final: string): Shot[] => [
  ["01-before", "Before", `The ${site} before work began.`],
  ["02-foundation", "Foundation", "Excavation complete and foundations cast to the structural drawings."],
  ["03-structure", "Structure", "The frame rises, with slabs and masonry progressing floor by floor."],
  ["04-finishing", "Finishing", "Services, plaster, flooring and joinery installed, with quality checks at each trade."],
  ["05-final", "Final", final],
];

type Seed = Omit<Project, "images" | "cover" | "status"> & {
  shots: readonly Shot[];
  status?: Project["status"];
  pair?: boolean;
};

function project(seed: Seed): Project {
  const { shots, status = "placeholder", pair, ...rest } = seed;
  const images = frames(seed.slug, seed.title, status, shots);
  const last = images[images.length - 1];
  const cover: Media = { ...last, alt: `${seed.title}, ${seed.location}` };
  return {
    ...rest,
    status,
    images,
    cover,
    beforeAfter: pair ? { before: images[0], after: last } : undefined,
  };
}

const cat = (c: ProjectCategory) => c;

export const projects: Project[] = [
  project({
    slug: "courtyard-residence",
    title: "Courtyard Residence",
    category: cat("Residential"),
    location: "[CITY]",
    area: null,
    duration: "[DURATION]",
    year: null,
    clientType: "Private homeowner",
    summary: "A family home arranged around a central courtyard, with deep verandahs and generous natural light.",
    story: [
      "The brief was a home that stays cool, feels open to the garden and gives each generation its own space. We organised the plan around a central courtyard that pulls light and air through every floor.",
      "Deep verandahs and carefully sized openings reduce heat gain, while the structure was detailed for long-term durability. Services were coordinated on drawings before work began, which kept the build on schedule.",
    ],
    services: ["residential-construction", "architectural-planning"],
    pair: true,
    shots: defaultShots("plot", "The completed residence, with the courtyard and verandahs in use."),
  }),
  project({
    slug: "meridian-office-block",
    title: "Meridian Office Block",
    category: cat("Commercial"),
    location: "[CITY]",
    area: null,
    duration: "[DURATION]",
    year: null,
    clientType: "Developer",
    summary: "A six-storey office building with a glazed façade, column-free floor plates and phased handover.",
    story: [
      "The client needed flexible floor plates that tenants could divide as they wished. A structural grid with long clear spans delivered that flexibility without compromising the façade.",
      "Delivery was planned in phases so that lower floors could be fitted out while upper floors were still under construction.",
    ],
    services: ["commercial-construction", "project-management"],
    shots: [
      ["01-before", "Before", "The cleared site, surveyed and ready for excavation."],
      ["02-foundation", "Foundation", "Piling and raft foundation in progress."],
      ["03-structure", "Structure", "Core walls and floor plates rising on a fixed cycle."],
      ["04-finishing", "Finishing", "Façade glazing, MEP and interior fit-out underway."],
      ["05-final", "Final", "The completed building, ready for tenant occupation."],
      ["06-interior", "Interior", "A typical floor, finished and handed over."],
    ],
  }),
  project({
    slug: "terrace-house-renovation",
    title: "Terrace House Renovation",
    category: cat("Renovation"),
    location: "[CITY]",
    area: null,
    duration: "[DURATION]",
    year: null,
    clientType: "Private homeowner",
    summary: "A tired two-storey house, reconfigured with a new staircase, extended kitchen and rebuilt services.",
    story: [
      "We surveyed the structure first, then opened up the ground floor, rebuilt the staircase and extended the kitchen into the rear garden.",
      "Plumbing, wiring and waterproofing were replaced throughout, so the house now performs as well as it looks.",
    ],
    services: ["renovation-and-remodelling", "interiors-and-fit-outs"],
    pair: true,
    shots: defaultShots("house", "The renovated home, with a new layout and a brighter, warmer interior."),
  }),
  project({
    slug: "atelier-showroom",
    title: "Atelier Showroom",
    category: cat("Interiors"),
    location: "[CITY]",
    area: null,
    duration: "[DURATION]",
    year: null,
    clientType: "Retail brand",
    summary: "A retail showroom with custom joinery, concealed lighting and durable stone flooring.",
    story: [
      "The showroom had to present products simply and survive heavy daily footfall. We designed fixed joinery and lighting as one system, then fitted it to tight tolerances.",
      "Materials were chosen for how they age, so the space keeps its character as it is used.",
    ],
    services: ["interiors-and-fit-outs"],
    shots: [
      ["01-before", "Before", "The empty shell, with services stubbed out."],
      ["02-foundation", "Groundwork", "Floor levels corrected and services first-fixed."],
      ["03-structure", "Framework", "Partitions, ceilings and joinery frames installed."],
      ["04-finishing", "Finishing", "Stone flooring, lighting and joinery fitted."],
      ["05-final", "Final", "The showroom, styled and ready to open."],
    ],
  }),
  project({
    slug: "hillside-villa",
    title: "Hillside Villa",
    category: cat("Residential"),
    location: "[CITY]",
    area: null,
    duration: "[DURATION]",
    year: null,
    clientType: "Private homeowner",
    summary: "A split-level villa stepped into a sloping plot, with retaining walls and long views.",
    story: [
      "The slope shaped the design. We stepped the building into the hillside to limit excavation and give every principal room a view.",
      "Retaining structures and drainage were designed first, which let us build with confidence through the monsoon season.",
    ],
    services: ["residential-construction", "architectural-planning"],
    shots: defaultShots("sloping plot", "The finished villa, set into the hillside."),
  }),
  project({
    slug: "linden-clinic",
    title: "Linden Clinic",
    category: cat("Commercial"),
    location: "[CITY]",
    area: null,
    duration: "[DURATION]",
    year: null,
    clientType: "Healthcare operator",
    summary: "A compact medical clinic with accessible circulation, clean services zoning and quick turnaround.",
    story: [
      "Clinical spaces need precise services coordination and cleanable finishes. We resolved layouts and services on drawings, then built to a tight schedule.",
      "The result is a calm, accessible building that is easy to keep clean and easy to maintain.",
    ],
    services: ["commercial-construction", "interiors-and-fit-outs"],
    shots: defaultShots("building shell", "The completed clinic, ready to receive its first patients."),
  }),
];

export const categories: ProjectCategory[] = ["Residential", "Commercial", "Renovation", "Interiors"];

/** Featured on the home page, in this order. */
export const featuredSlugs = [
  "courtyard-residence",
  "meridian-office-block",
  "terrace-house-renovation",
  "atelier-showroom",
];

