import type { Media, Post } from "@/lib/types";

const cover = (slug: string, alt: string): Media => ({
  publicId: `upedge/blog/${slug}`,
  alt,
  placeholder: true,
  label: `Article cover, 16:9. Upload as upedge/blog/${slug}`,
});

export const posts: Post[] = [
  {
    slug: "how-to-plan-a-home-construction-budget",
    title: "How to plan a home construction budget that holds",
    excerpt: "The costs that surprise first-time builders, and how to allow for them before you break ground.",
    date: "2026-03-12",
    readingMinutes: 5,
    category: "Planning",
    cover: cover("home-construction-budget", "Floor plans and a calculator on a desk"),
    body: [
      { type: "p", text: "A budget that only covers the building itself is a budget that will be exceeded. Most overruns come from items that were never on the list, not from the items that were." },
      { type: "h2", text: "Start with the whole project, not just the structure" },
      { type: "p", text: "Before you compare quotes, write down everything the project needs. Land preparation, design fees, approvals, utility connections, compound walls, landscaping and furniture all belong in the total, even if different people will deliver them." },
      { type: "h2", text: "Keep a contingency, and protect it" },
      { type: "p", text: "Set aside a contingency for the unknowns that every build contains, such as ground conditions or material price movement. Treat it as a reserve for genuine surprises, not as extra spending money for upgrades." },
      { type: "h2", text: "Ask for an itemised estimate" },
      { type: "p", text: "A single lump-sum figure hides assumptions. An itemised estimate shows quantities and specifications, so you can compare like with like and see exactly what changes when you change a finish." },
      { type: "ul", items: ["Decide the finishes you care about early, and cap the rest", "Agree how variations will be priced and approved in writing", "Link payments to completed milestones, not to dates"] },
      { type: "p", text: "A builder who is comfortable with this level of detail is usually a builder who is comfortable with accountability." },
    ],
  },
  {
    slug: "what-happens-before-construction-starts",
    title: "What happens before construction starts",
    excerpt: "Site checks, drawings and approvals: the unglamorous work that decides how smoothly the build goes.",
    date: "2026-02-04",
    readingMinutes: 4,
    category: "Process",
    cover: cover("before-construction", "A surveyor measuring a plot"),
    body: [
      { type: "p", text: "The first weeks of a project can feel slow because nothing is visibly being built. In reality, this is when the largest risks are removed." },
      { type: "h2", text: "Understanding the site" },
      { type: "p", text: "A site assessment looks at soil, levels, access, drainage, neighbouring structures and local regulations. These findings shape the foundation design, the schedule and the budget." },
      { type: "h2", text: "Drawings that can be built" },
      { type: "p", text: "Architectural drawings show what the building looks like. Structural and services drawings show how it works. They need to agree with each other before work starts, otherwise the conflicts get solved on site, at your expense." },
      { type: "h2", text: "Approvals and permissions" },
      { type: "p", text: "Depending on where you build, you may need sanctioned plans, utility approvals and other permissions. Tracking them early avoids the stop-start progress that frustrates owners." },
      { type: "ul", items: ["Confirm ownership documents and boundaries", "Complete a soil investigation where the structure needs it", "Finalise drawings, specifications and the estimate", "Agree the schedule and the site access arrangements"] },
    ],
  },
  {
    slug: "renovate-or-rebuild",
    title: "Renovate or rebuild? How to decide",
    excerpt: "A practical way to weigh structure, cost, regulations and what you actually want from the building.",
    date: "2026-01-15",
    readingMinutes: 4,
    category: "Renovation",
    cover: cover("renovate-or-rebuild", "An older house with scaffolding"),
    body: [
      { type: "p", text: "It is a common question, and the honest answer is that it depends on the building. A structural survey will tell you far more than any rule of thumb." },
      { type: "h2", text: "Start with the structure" },
      { type: "p", text: "If the frame, foundations and roof are sound, renovation is often the more economical route. If they are not, spending heavily on finishes can be a poor investment." },
      { type: "h2", text: "Check what regulations allow" },
      { type: "p", text: "Sometimes an existing building enjoys rights that a new one would not, such as a larger footprint or a closer setback. In other cases, rebuilding allows you to use the plot far better. Check before you decide." },
      { type: "h2", text: "Think about the end result" },
      { type: "ul", items: ["Will the layout ever work for how you live now?", "Can services be upgraded without opening everything up?", "How long can you be without the property during the work?"] },
      { type: "p", text: "Whichever way you lean, ask for a costed comparison of both options. Numbers on paper make the decision much easier." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
