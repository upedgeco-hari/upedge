/** A single image served from Cloudinary (or shown as a labelled placeholder). */
export type Media = {
  /** Cloudinary public ID, e.g. "upedge/projects/courtyard-residence/01-before" */
  publicId: string;
  alt: string;
  /** When true a labelled placeholder is rendered instead of calling Cloudinary. */
  placeholder?: boolean;
  /** Text shown inside the placeholder (what image belongs here). */
  label?: string;
};

export type ProjectCategory = "Residential" | "Commercial" | "Renovation" | "Interiors";

export type ProjectImage = Media & {
  /** Stage shown in the story viewer: Before, Foundation, Structure, Finishing, Final ... */
  stage: string;
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  /** Built-up area in sq. ft. null renders as an [AREA] placeholder. */
  area: number | null;
  duration: string;
  year: number | null;
  clientType: string;
  summary: string;
  story: string[];
  /** "placeholder" = sample content with labelled placeholder images. Flip to "live" once real photos exist. */
  status: "placeholder" | "live";
  cover: Media;
  /** Ordered construction story. Needs at least 5 images. */
  images: ProjectImage[];
  /** Optional before/after pair. */
  beforeAfter?: { before: Media; after: Media };
  /** Service slugs used on this project. */
  services?: string[];
};

export type ServiceIcon = "house" | "buildings" | "hammer" | "armchair" | "compass" | "kanban";

export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  icon: ServiceIcon;
  included: string[];
  process: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  /** Project category used for "related projects". */
  relatedCategory: ProjectCategory;
  image: Media;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  project?: string;
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
