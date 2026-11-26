import type { Media } from "@/lib/types";

/**
 * Global site content. Anything in [BRACKETS] is an unknown you still need to fill in.
 */
export const site = {
  name: "UPEDGE",
  tagline: "A pinnacle of premium construction",
  /** The name used on Instagram, so a search for it finds the site too. */
  alternateName: "UPEDGE Construction",
  founder: "Hariharan",
  foundingYear: "2020",
  description:
    "UPEDGE is a construction company in Madurai that designs and builds homes, commercial spaces and interiors, with projects across Tamil Nadu.",
  /** NEXT_PUBLIC_SITE_URL wins; on Vercel the production domain is used when it is not set. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
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

/** Site-level images. A `src` is a file in public/; placeholders still need a photo. */
export const media = {
  hero: {
    publicId: "upedge/site/hero",
    alt: "A UPEDGE residential project at golden hour",
    placeholder: true,
    label: "Hero image, landscape 2400 x 1400. Upload as upedge/site/hero",
  },
  about: {
    publicId: "upedge/site/about-main",
    src: "/images/projects/green-veil-house/day-front.jpg",
    width: 1611,
    height: 2000,
    position: "50% 66%",
    alt: "3D design of a UPEDGE house with grey plaster, a steel balcony and a terracotta tile wall",
  },
  aboutSecondary: {
    publicId: "upedge/site/about-detail",
    src: "/images/site/terracotta-screen-detail.jpg",
    width: 768,
    height: 768,
    alt: "Close-up of a terracotta block screen on a UPEDGE house design",
  },
} satisfies Record<string, Media>;

/** Ceremonies posted on @upedge_co. Photos are in public/images/families/. An empty list hides the section. */
export const familyMoments: { image: string; event: "Bhoomi pooja" | "Housewarming"; place?: string }[] = [
  { image: "pooja-kamuthi", event: "Bhoomi pooja", place: "Kamuthi, Ramanathapuram" },
  { image: "housewarming-welcome", event: "Housewarming" },
  { image: "pooja-tvs-nagar", event: "Bhoomi pooja", place: "TVS Nagar, Madurai" },
  { image: "housewarming-family", event: "Housewarming" },
  { image: "pooja-kadachanendal", event: "Bhoomi pooja", place: "Kadachanendal, Madurai" },
  { image: "housewarming-doorway", event: "Housewarming" },
  { image: "pooja-alathur", event: "Bhoomi pooja", place: "Alathur" },
  { image: "housewarming-verandah", event: "Housewarming" },
];

/**
 * Captions as posted on @upedge_co, each with a still from its reel and a link to it.
 * To play a reel on the site, save your video as public/videos/{image}.mp4 and rebuild.
 */
export const instagramPosts = [
  { image: "work-in-progress", caption: "Raising structures, building legacies. Work in progress.", href: "https://www.instagram.com/reel/Df7LHeQIxkC/" },
  { image: "every-brick", caption: "Every brick has a purpose. Every detail is designed. Every corner is crafted.", href: "https://www.instagram.com/reel/DavIRYZNPdN/" },
  { image: "perfect-finish", caption: "Behind every beautiful space is a perfect finish.", href: "https://www.instagram.com/reel/DbF81_DAIKW/" },
  { image: "todays-dust", caption: "Today's dust, tomorrow's dream.", href: "https://www.instagram.com/reel/DcnrI5fABqv/" },
];

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

/** Milestones from the company's own records and Instagram posts. Photos are in public/images/timeline/. */
export const companyTimeline: { year: string; title: string; text: string; photo?: { src: string; alt: string } }[] = [
  { year: "2020", title: "UPEDGE is established", text: "The company begins work from Madurai." },
  {
    year: "Jan 2025",
    title: "Two new beginnings",
    text: "Bhoomi poojas mark the start of new homes at TVS Nagar, Madurai and Kamuthi, Ramanathapuram.",
    photo: { src: "/images/timeline/tvs-nagar.jpg", alt: "Bhoomi pooja at TVS Nagar, Madurai" },
  },
  {
    year: "Jul 2025",
    title: "Ground broken at Kadachanendal",
    text: "Work begins on a residential building at Kadachanendal, Madurai.",
    photo: { src: "/images/timeline/kadachanendal.jpg", alt: "Bhoomi pooja at Kadachanendal, Madurai" },
  },
  {
    year: "Jul 2025",
    title: "Recognised in Coimbatore",
    text: "Founder Hariharan receives an award at a ceremony in Coimbatore.",
    photo: { src: "/images/timeline/award.jpg", alt: "Hariharan holding an award at the ceremony in Coimbatore" },
  },
  {
    year: "Jan 2026",
    title: "A new project at Alathur",
    text: "A bhoomi pooja marks the start of the next build.",
    photo: { src: "/images/timeline/alathur.jpg", alt: "Bhoomi pooja at Alathur" },
  },
];

/** Stills from site work posted on @upedge_co, in public/images/sites/. */
export const siteWork = [
  { image: "marking", label: "Site marking" },
  { image: "reinforcement", label: "Slab reinforcement" },
  { image: "steel", label: "Steel fabrication" },
  { image: "plastering", label: "Plastering" },
  { image: "carpentry", label: "Carpentry" },
  { image: "door-fitting", label: "Door fitting" },
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