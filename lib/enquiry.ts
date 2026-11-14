import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { projectTypes } from "@/lib/contact-schema";
import type { Project, ProjectCategory } from "@/lib/types";

/**
 * Enquiry context: the thread that carries what someone was looking at into the way they
 * get in touch.
 *
 * Asking a homeowner to re-describe the service page they were just reading is the usual
 * way construction sites lose an enquiry. Every "Get a quote" on a service or project page
 * carries that page with it, so the form arrives already knowing the answer to its first
 * question, the WhatsApp message opens pre-written, and the email that reaches the office
 * says which page the request came from.
 */

export type ProjectType = (typeof projectTypes)[number];

export type EnquiryContext = {
  /** Human label for what the enquiry is about, e.g. "Residential Construction". */
  about: string;
  /** The matching option in the form's project type list, when there is one. */
  type?: ProjectType;
};

/** Service slug to the form's project type. Keys are the slugs in data/services.ts. */
const serviceType: Record<string, ProjectType> = {
  "residential-construction": "Residential construction",
  "commercial-construction": "Commercial construction",
  "renovation-and-remodelling": "Renovation and remodelling",
  "interiors-and-fit-outs": "Interiors and fit-outs",
  "architectural-planning": "Architectural planning",
  "project-management": "Project management",
};

const categoryType: Record<ProjectCategory, ProjectType> = {
  Residential: "Residential construction",
  Commercial: "Commercial construction",
  Renovation: "Renovation and remodelling",
  Interiors: "Interiors and fit-outs",
};

export function serviceEnquiry(slug: string): EnquiryContext | null {
  const service = services.find((s) => s.slug === slug);
  return service ? { about: service.title, type: serviceType[slug] } : null;
}

export function projectEnquiry(project: Pick<Project, "title" | "category">): EnquiryContext {
  return { about: project.title, type: categoryType[project.category] };
}

/** Link to the quote form, carrying the context when there is one. */
export function quoteHref(ctx?: EnquiryContext | null) {
  if (!ctx) return "/contact";
  const q = new URLSearchParams({ about: ctx.about });
  if (ctx.type) q.set("type", ctx.type);
  return `/contact?${q}`;
}

/** Read the context back off the URL, ignoring anything that is not a real option. */
export function enquiryFromParams(about: string | null, type: string | null): EnquiryContext | null {
  const label = about?.trim();
  if (!label || label.length > 120) return null;
  const match = projectTypes.find((t) => t === type);
  return { about: label, type: match };
}

/** The context for a page, used by the floating contact buttons. */
export function pageEnquiry(pathname: string): EnquiryContext | null {
  const service = pathname.match(/^\/services\/([^/]+)/);
  if (service) return serviceEnquiry(service[1]);
  const project = pathname.match(/^\/projects\/([^/]+)/);
  if (project) {
    const p = projects.find((x) => x.slug === project[1]);
    if (p) return projectEnquiry(p);
  }
  return null;
}

/** Pre-written WhatsApp message, so the chat opens with the subject already in it. */
export function whatsappText(ctx?: EnquiryContext | null) {
  return ctx
    ? `Hi UPEDGE, I was reading about ${ctx.about} on your website and would like to discuss a project.`
    : "Hi UPEDGE, I would like to discuss a construction project.";
}
