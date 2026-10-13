import type { Media, Service } from "@/lib/types";

const img = (slug: string, alt: string): Media => ({
  publicId: `upedge/services/${slug}`,
  alt,
  placeholder: true,
  label: `Service image, 4:3. Upload as upedge/services/${slug}`,
});

export const services: Service[] = [
  {
    slug: "residential-construction",
    title: "Residential Construction",
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
    image: img("residential-construction", "A newly built UPEDGE family home"),
  },
  {
    slug: "commercial-construction",
    title: "Commercial Construction",
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
    image: img("commercial-construction", "A UPEDGE commercial building under construction"),
  },
  {
    slug: "renovation-and-remodelling",
    title: "Renovation & Remodelling",
    short: "Structural alterations, extensions and full refurbishments for existing buildings.",
    intro:
      "Working on an existing building asks for careful investigation before any demolition. We assess what is there, plan the works, and keep disruption as low as the job allows.",
    icon: "hammer",
    included: [
      "Condition survey and structural assessment",
      "Selective demolition and structural alterations",
      "Extensions, additional floors and layout changes",
      "Waterproofing, plumbing and electrical upgrades",
      "Façade refresh and external works",
      "Finishing and clean-up",
    ],
    process: [
      { title: "Survey", text: "We inspect the structure and services so the scope reflects what is really behind the walls." },
      { title: "Plan", text: "Works are sequenced to protect what stays and to limit disruption to occupants." },
      { title: "Execute", text: "Strip-out, alterations and rebuild with regular photo updates." },
      { title: "Finish", text: "Finishes, snagging and a clean handover." },
    ],
    faqs: [
      { q: "Can we live in the property during the work?", a: "Sometimes. It depends on scope. We will tell you honestly whether phased works or a temporary move is the better route." },
      { q: "Will you check the structure before adding a floor?", a: "Always. A structural assessment comes first and informs both the design and the estimate." },
      { q: "What if you find something unexpected?", a: "We stop, document it, explain the options and agree the way forward with you before continuing." },
    ],
    relatedCategory: "Renovation",
    image: img("renovation-and-remodelling", "A renovated UPEDGE project, before and after"),
  },
  {
    slug: "interiors-and-fit-outs",
    title: "Interiors & Fit-outs",
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
    image: img("interiors-and-fit-outs", "A finished UPEDGE interior"),
  },
  {
    slug: "architectural-planning",
    title: "Architectural Planning",
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
    image: img("architectural-planning", "Architectural drawings and a 3D model on a desk"),
  },
  {
    slug: "project-management",
    title: "Project Management",
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
    image: img("project-management", "A UPEDGE site manager reviewing progress"),
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
