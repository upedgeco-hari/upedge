import type { Media } from "@/lib/types";

/**
 * Global site content. Anything in [BRACKETS] is an unknown you still need to fill in.
 */
export const site = {
  name: "UPEDGE",
  legalName: "[LEGAL COMPANY NAME]",
  tagline: "A pinnacle of premium construction",
  description:
    "UPEDGE designs and builds residential, commercial and renovation projects, managed from first sketch to final handover.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "upedge.co@gmail.com",
  phone: "+91 90474 44614",
  whatsapp: "+91 90474 44614",
  address: "Meenakshiamman Nagar 4th Street Mainroad, Suryanagar, Madurai, Tamil Nadu 625007",
  /** Structured parts, used for the LocalBusiness schema. */
  street: "Meenakshiamman Nagar 4th Street Mainroad, Suryanagar",
  city: "Madurai",
  region: "Tamil Nadu",
  postalCode: "625007",
  country: "IN",
  hours: "Monday to Saturday, 10:30am to 8:30pm. Sunday closed.",
  /** Same hours in machine-readable form (24h), used for Google. */
  openingHours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:30", closes: "20:30" },
  /** Google Maps embed (no API key needed). Replace with a share-to-embed URL if you want a pinned listing. */
  mapEmbedUrl: "https://www.google.com/maps?q=Meenakshiamman+Nagar+4th+Street+Mainroad,+Suryanagar,+Madurai,+Tamil+Nadu+625007&output=embed",
  /** Leave href empty to hide a network. */
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/upedge_co/", handle: "@upedge_co" },
    { label: "LinkedIn", href: "", handle: "" },
    { label: "Facebook", href: "", handle: "" },
    { label: "YouTube", href: "", handle: "" },
  ],
};

/** Strip everything except digits. */
export const digits = (v: string) => v.replace(/\D/g, "");
/** True once a contact value has been replaced with a real number. */
export const hasNumber = (v: string) => digits(v).length >= 7;

export const nav = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

/** One label per intent, used everywhere on the site. */
export const cta = {
  quote: "Get a Free Quote",
  projects: "View Projects",
} as const;

/** Credibility strip. value: null renders a [00] placeholder. Add real numbers to animate them (use plain: true for a year). */
export const stats: { value: number | null; suffix?: string; label: string; plain?: boolean }[] = [
  { value: 8, suffix: "+", label: "Years of experience" },
  { value: 57, suffix: "+", label: "Projects delivered" },
  { value: 19, suffix: "+", label: "Ongoing Projects" },
  // plain: true shows the number as written (for years), with no counting animation or separators.
  { value: 2020, suffix: "", label: "Established", plain: true },
];

/** Site-level images. Set placeholder: false once the real file is on Cloudinary. */
export const media = {
  hero: {
    publicId: "upedge/site/hero",
    alt: "A UPEDGE residential project at golden hour",
    placeholder: true,
    label: "Hero image, landscape 2400 x 1400. Upload as upedge/site/hero",
  },
  about: {
    publicId: "upedge/site/about-main",
    alt: "The UPEDGE team reviewing plans on site",
    placeholder: true,
    label: "About image, portrait 4:5. Upload as upedge/site/about-main",
  },
  aboutSecondary: {
    publicId: "upedge/site/about-detail",
    alt: "Close-up of finished masonry and joinery",
    placeholder: true,
    label: "Detail image, square. Upload as upedge/site/about-detail",
  },
} satisfies Record<string, Media>;

/** Places where UPEDGE has completed projects. Madurai is the home office. */
export const serviceAreas = {
  tamilNadu: ["Madurai", "Dindigul", "Ramanathapuram", "Chennai", "Theni", "Sivaganga", "Tiruchirappalli", "Erode", "Coimbatore", "Thanjavur", "Tenkasi", "Thoothukudi", "Virudhunagar"],
  elsewhere: ["Bangalore", "Kerala"],
};

export const differentiators = [
  {
    icon: "shield",
    title: "One team, one point of accountability",
    text: "Design, approvals and construction sit under one roof, so you never chase three different contractors.",
  },
  {
    icon: "receipt",
    title: "Itemised, written costing",
    text: "You get a line-by-line estimate before work starts, and any change is agreed in writing first.",
  },
  {
    icon: "compass",
    title: "Design-led planning",
    text: "Layouts are resolved on paper and in 3D before a single trench is dug, which prevents costly rework.",
  },
  {
    icon: "check",
    title: "Quality checks at every stage",
    text: "Structure, services and finishes are inspected against the drawings before the next stage begins.",
  },
  {
    icon: "calendar",
    title: "A schedule you can follow",
    text: "A milestone plan from day one, with regular site updates so progress is never a guess.",
  },
  {
    icon: "key",
    title: "A complete handover",
    text: "Snagging, documentation and warranties are closed out properly before we hand over the keys.",
  },
] as const;

export const processSteps = [
  { title: "Consultation", text: "We visit the plot or property, listen to your brief, and agree scope, budget range and timeline." },
  { title: "Design & Planning", text: "Architectural drawings, material selections and a detailed estimate, refined with you until it is right." },
  { title: "Approvals", text: "We prepare and track the permissions your project needs, so the build starts on solid ground." },
  { title: "Construction", text: "A dedicated site team works to a milestone schedule, with regular photo and progress updates." },
  { title: "Quality Check", text: "Each stage is inspected against the drawings and specifications before the next one begins." },
  { title: "Handover", text: "A final walkthrough, snag closure, documentation and warranties. Then the keys are yours." },
] as const;

export const values = [
  { title: "Craft over shortcuts", text: "We specify and supervise to a standard, even where nobody will see the result." },
  { title: "Straight talk", text: "Clear costs, clear schedules and plain answers, including when the answer is no." },
  { title: "Safety first", text: "A safe site protects our people, your property and your neighbours." },
  { title: "Built for the long run", text: "Decisions are made for how a building performs in ten years, not just on handover day." },
] as const;

export const team: { name: string; role: string; photo: Media }[] = [1, 2, 3, 4].map((n) => ({
  name: "[NAME]",
  role: "[ROLE]",
  photo: {
    publicId: `upedge/team/0${n}`,
    alt: "[NAME], [ROLE]",
    placeholder: true,
    label: `Team portrait, 4:5. Upload as upedge/team/0${n}`,
  },
}));

export const certifications = [
  { title: "[CERTIFICATION OR REGISTRATION]", body: "[Issuing body and registration number]" },
  { title: "[CERTIFICATION OR REGISTRATION]", body: "[Issuing body and registration number]" },
  { title: "[CERTIFICATION OR REGISTRATION]", body: "[Issuing body and registration number]" },
];

export const companyTimeline = [
  { year: "[YEAR]", title: "[Founding milestone]", text: "[One sentence about how UPEDGE started.]" },
  { year: "[YEAR]", title: "[Growth milestone]", text: "[One sentence, such as the first commercial project or a team expansion.]" },
  { year: "[YEAR]", title: "[Capability milestone]", text: "[One sentence, such as launching in-house design or project management.]" },
  { year: "[YEAR]", title: "[Recent milestone]", text: "[One sentence about the most recent chapter.]" },
];

/*
Years of experience - 8
Projects delivered - 57
Established - 2020

.
how many distrct - dinducal , ramnad, chennai , madurai , theni , sivagaingai , thirichi , erode , coimbatore, kumbaonam , Tenkasi ,Thoothukudi , Virudhunagar
which district
bangalore , kerala 
.
site photos by 

1.Staff images 
2.Project Images 



Residential Construction
Commercial Construction
Renovation & Remodelling
Interiors & Fit-outs
Architectural Planning
Project Management

*/