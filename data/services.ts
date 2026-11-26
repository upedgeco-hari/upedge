import type { Media, Service } from "@/lib/types";

/** A service image served from public/. */
const local = (slug: string, src: string, width: number, height: number, alt: string, position?: string): Media => ({
  publicId: `upedge/services/${slug}`,
  src,
  width,
  height,
  alt,
  position,
});

/** Project management photos, shown in this order. 4:5 stills from @upedge_co reels. */
const supervision: Media[] = (
  [
    ["pm-1", "UPEDGE founder Hariharan explaining a detail on site", "50% 22%"],
    ["pm-3", "A UPEDGE team member checking steel stair work with the workers", "50% 25%"],
    ["pm-4", "UPEDGE team members discussing work on site", "50% 22%"],
  ] as const
).map(([file, alt, position]) => local(`project-management/${file}`, `/images/site/${file}.jpg`, 1080, 1350, alt, position));

export const services: Service[] = [
  {
    slug: "residential-construction",
    title: "Residential Construction",
    searchTitle: "House Construction in Madurai",
    short: "Custom homes, villas and apartment buildings, built to your plans and your budget.",
    intro:
      "From a single-family home on your own plot to a multi-unit residential building, we take care of design coordination, approvals and construction under one accountable team.",
    icon: "house",
    included: [
      "Site assessment and feasibility review",
      "Architectural and structural design coordination",
      "Itemised estimate and milestone schedule",
      "Foundation, structure, masonry and waterproofing",
      "Electrical, plumbing and HVAC provisions",
      "Finishes, fixtures and external works",
      "Snagging, documentation and handover",
    ],
    process: [
      { title: "Brief and site visit", text: "We walk the plot with you, discuss how your household lives, and confirm what is possible within your budget." },
      { title: "Design and costing", text: "Plans, elevations and specifications are developed with an itemised estimate you can review line by line." },
      { title: "Build", text: "Construction runs to a milestone schedule with regular site updates and stage-wise inspections." },
      { title: "Handover", text: "A full walkthrough, snag closure and the paperwork you need for the years ahead." },
    ],
    faqs: [
      { q: "Can you build on a plot I already own?", a: "Yes. We begin with a site assessment covering soil, access, levels and local regulations, then advise on what can be built and how." },
      { q: "Do you handle the design as well as the build?", a: "Yes. We coordinate architects and structural engineers, or work with your own design team if you already have one." },
      { q: "How is the cost fixed?", a: "You receive a written, itemised estimate. Changes after sign-off are priced and agreed in writing before they are carried out." },
    ],
    relatedCategory: "Residential",
    image: local("residential-construction", "/images/projects/white-frame-house/evening.jpg", 1920, 1080, "3D design of a white two-storey UPEDGE family home at dusk"),
  },
  {
    slug: "commercial-construction",
    title: "Commercial Construction",
    searchTitle: "Commercial Construction in Madurai",
    short: "Offices, retail and mixed-use buildings delivered with tight schedule control.",
    intro:
      "Commercial projects live and die by programme and coordination. We plan the sequence of trades carefully so your building is ready when your business needs it.",
    icon: "buildings",
    included: [
      "Feasibility, budgeting and programme planning",
      "Structural frames and building envelopes",
      "Coordination of MEP and fire-safety systems",
      "Façade, flooring and finishing packages",
      "Statutory approvals support",
      "Phased delivery for occupied sites",
      "Commissioning and handover documentation",
    ],
    process: [
      { title: "Requirements", text: "We define space needs, budget, programme and compliance requirements with your team." },
      { title: "Planning", text: "A detailed programme and procurement plan, with long-lead items identified early." },
      { title: "Delivery", text: "Site management with weekly reporting, safety supervision and quality checks." },
      { title: "Commissioning", text: "Systems are tested, documented and handed over with the records you need." },
    ],
    faqs: [
      { q: "Can you build in phases while we continue to operate?", a: "Yes. We plan phasing, access, noise and safety around your operations." },
      { q: "Do you manage MEP and specialist trades?", a: "We coordinate all trades under one programme, so interfaces are resolved before they reach site." },
      { q: "Who handles statutory approvals?", a: "We prepare and track submissions with your consultants and keep you informed at each stage." },
    ],
    relatedCategory: "Commercial",
    image: local("commercial-construction", "/images/site/salon-interior.jpg", 1080, 845, "A salon interior in Madurai fitted out by UPEDGE", "50% 70%"),
  },
  {
    slug: "interiors-and-fit-outs",
    title: "Interiors & Fit-outs",
    searchTitle: "Interior Design & Fit-outs in Madurai",
    short: "Considered interiors for homes, offices and retail, from joinery to lighting.",
    intro:
      "Interiors are where a building is experienced every day. We design, detail and deliver fit-outs with the same discipline we bring to structure.",
    icon: "armchair",
    included: [
      "Space planning and interior design",
      "Custom joinery and built-in furniture",
      "False ceilings, partitions and flooring",
      "Lighting design and electrical works",
      "Material and finish selection",
      "Installation, styling and snag closure",
    ],
    process: [
      { title: "Concept", text: "Mood, materials and layout, shared as drawings and visuals before anything is ordered." },
      { title: "Detailing", text: "Joinery drawings, lighting plans and a clear bill of quantities." },
      { title: "Fit-out", text: "Trades are sequenced so finishes go in clean and on schedule." },
      { title: "Handover", text: "Final styling, snagging and care instructions for your new materials." },
    ],
    faqs: [
      { q: "Do you do interiors only, without the construction?", a: "Yes. We take on stand-alone interior and fit-out projects as well as full builds." },
      { q: "Can I choose my own furniture and fixtures?", a: "Of course. We can design around pieces you already love or source everything for you." },
      { q: "Do you handle commercial fit-outs?", a: "Yes, including offices, showrooms, clinics and hospitality spaces." },
    ],
    relatedCategory: "Interiors",
    image: local("interiors-and-fit-outs", "/images/site/modular-kitchen.jpg", 720, 563, "A sage green modular kitchen with timber framing and under-cabinet lighting", "50% 30%"),
  },
  {
    slug: "architectural-planning",
    title: "Architectural Planning",
    searchTitle: "Architectural Planning & House Design in Madurai",
    short: "Concept design, drawings and 3D visuals that turn a brief into a buildable plan.",
    intro:
      "A good plan saves money long before the first brick. We develop layouts, drawings and visuals that you can understand, and that a site team can build from.",
    icon: "compass",
    included: [
      "Site analysis and concept options",
      "Floor plans, elevations and sections",
      "3D visuals and walkthroughs",
      "Structural and services coordination",
      "Statutory drawing sets for approvals",
      "Working drawings and specifications",
    ],
    process: [
      { title: "Understand", text: "We learn how you want to live or work, and study the site, orientation and regulations." },
      { title: "Concepts", text: "Two or three layout options with visuals, so decisions are easy and informed." },
      { title: "Develop", text: "The chosen concept is refined into approval and construction drawings." },
      { title: "Coordinate", text: "Structure and services are integrated so the drawings are buildable as issued." },
    ],
    faqs: [
      { q: "Can you design and then hand the drawings to another builder?", a: "Yes, although many clients find the result is better when design and construction are coordinated by one team." },
      { q: "Will I see the design in 3D?", a: "Yes. Visuals are part of how we help you make decisions with confidence." },
      { q: "Do the drawings include approvals?", a: "We prepare the drawing sets required for statutory submissions and support the process." },
    ],
    relatedCategory: "Residential",
    image: local("architectural-planning", "/images/site/framed-balcony-front.jpg", 2000, 1275, "3D design of a house front with a framed balcony and timber roof soffit"),
  },
  {
    slug: "project-management",
    title: "Project Management",
    searchTitle: "Construction Project Management in Madurai",
    short: "Independent supervision, budgeting and quality control for builds you manage yourself.",
    intro:
      "If you have your own contractors or are building at a distance, we act as your site-side team: planning, supervising, reporting and protecting your interests.",
    icon: "kanban",
    included: [
      "Budget and programme planning",
      "Tendering and contractor comparison",
      "Site supervision and quality inspections",
      "Progress and cost reporting",
      "Contract and variation management",
      "Snagging and handover support",
    ],
    process: [
      { title: "Set-up", text: "We agree scope, programme, budget and reporting rhythm." },
      { title: "Procure", text: "Tenders are issued and compared like for like, so you can award with confidence." },
      { title: "Supervise", text: "Regular inspections and written reports against the drawings." },
      { title: "Close out", text: "Snag lists, final accounts and handover documentation." },
    ],
    faqs: [
      { q: "Can you manage a project built by other contractors?", a: "Yes. That is exactly what independent project management is for." },
      { q: "Can you supervise remotely if I live abroad?", a: "Yes. Regular photo, video and written reports keep you informed without being on site." },
      { q: "How do you charge?", a: "Typically a fixed fee or a percentage of project value, agreed up front." },
    ],
    relatedCategory: "Commercial",
    image: supervision[0],
    gallery: supervision,
  },
  {
    slug: "landscaping",
    title: "Landscaping",
    searchTitle: "Landscaping in Madurai",
    short: "Front gardens, planters, paving and outdoor lighting designed together with the house.",
    intro:
      "The outdoor space is part of the home. We plan planting, paving, boundary and lighting alongside the architecture, so the house and its surroundings read as one design.",
    icon: "plant",
    included: [
      "Site levels, drainage and layout planning",
      "Planting plan suited to sun, water and upkeep",
      "Driveways, pathways and paving",
      "Planters, compound walls and gates",
      "Outdoor and facade lighting",
      "Care guidance at handover",
    ],
    process: [
      { title: "Site study", text: "We look at sun, soil, drainage and how you want to use the outdoor space." },
      { title: "Plan", text: "Layout, planting and materials are shared as drawings and visuals, with an estimate." },
      { title: "Install", text: "Hard works come first, followed by services, planting and lighting." },
      { title: "Handover", text: "A walkthrough with simple care instructions for what has been planted." },
    ],
    faqs: [
      { q: "Can landscaping be planned with a new house?", a: "Yes, and it helps. Levels, drainage and wiring are easier to resolve before construction finishes." },
      { q: "Do you take up landscaping for an existing home?", a: "Tell us about the space. We start with a site visit and confirm what is practical." },
      { q: "What if I want low-maintenance planting?", a: "Say so at the start. Plant choice and irrigation are planned around the care you can give." },
    ],
    relatedCategory: "Residential",
    image: local("landscaping", "/images/site/front-planting.jpg", 1856, 1037, "3D design of tropical planting and paving in front of a UPEDGE house", "50% 55%"),
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
