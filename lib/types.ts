/** A single image: a local file in public/, a Cloudinary asset, or a labelled placeholder. */
export type Media = {
  /** Cloudinary public ID, e.g. "upedge/projects/courtyard-residence/01-before" */
  publicId: string;
  alt: string;
  /** Path of a file in public/, e.g. "/images/site/front-planting.jpg". Used instead of Cloudinary. */
  src?: string;
  /** Pixel size of the local file. Drives portrait layouts and social share cards. */
  width?: number;
  height?: number;
  /** CSS object-position for cropped frames, e.g. "50% 60%". Defaults to the centre. */
  position?: string;
  /** When true a labelled placeholder is rendered instead of calling Cloudinary. */
  placeholder?: boolean;
  /** Text shown inside the placeholder (what image belongs here). */
  label?: string;
};

export type ProjectCategory = "Residential" | "Commercial" | "Interiors";

export type ProjectImage = Media & {
  /** Stage shown in the story viewer: Before, Foundation, Structure, Finishing, Final ... */
  stage: string;
  caption?: string;
};

export type Comparison = {
  before: Media;
  after: Media;
  /** Short names shown on the slider, e.g. ["Day", "Night"]. */
  labels: [string, string];
  eyebrow: string;
  title: string;
  lead: string;
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** "design" = shown as 3D visualisations. "built" = photographed construction. */
  kind: "design" | "built";
  /** Leave unset until known: unknown facts are not shown. */
  location?: string;
  /** Built-up area in sq. ft. */
  area?: number;
  duration?: string;
  year?: number;
  clientType?: string;
  summary: string;
  story: string[];
  /** "placeholder" = unfinished entry with labelled placeholder images. Flip to "live" once real images exist. */
  status: "placeholder" | "live";
  cover: Media;
  /** Ordered views or construction stages. */
  images: ProjectImage[];
  /** Optional pair for the comparison slider, from the same camera angle. */
  comparison?: Comparison;
  /** Service slugs used on this project. */
  services?: string[];
};

export type ServiceIcon = "house" | "buildings" | "armchair" | "compass" | "kanban" | "plant";

export type Service = {
  slug: string;
  title: string;
  /** Page title shown in search results: what someone would type, with the city. */
  searchTitle: string;
  short: string;
  intro: string;
  icon: ServiceIcon;
  included: string[];
  process: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  /** Project category used for "related projects". */
  relatedCategory: ProjectCategory;
  image: Media;
  /** Photos that slide in order wherever the service is pictured. The first is also `image`. */
  gallery?: Media[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  project?: string;
  /** Where the words were posted, so anyone can check them. */
  href?: string;
};

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readingMinutes: number;
  category: string;
  cover: Media;
  body: PostBlock[];
};
