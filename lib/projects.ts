import "server-only";
import { projects as staticProjects } from "@/data/projects";
import { discoverImages, discoveryEnabled } from "@/lib/cloudinary-discover";
import type { Project } from "@/lib/types";

/**
 * Single read path for projects. By default this returns data/projects.ts as is.
 * With CLOUDINARY_DISCOVERY=true, each project's images (and cover) are replaced by
 * whatever is found in upedge/projects/{slug}/ on Cloudinary, sorted by filename.
 * A project needs at least 5 discovered images to be switched; otherwise the
 * static list is kept.
 */
async function resolve(p: Project): Promise<Project> {
  if (!discoveryEnabled) return p;
  const found = await discoverImages(p.slug, p.title);
  if (found.length < 5) return p;
  const last = found[found.length - 1];
  return {
    ...p,
    status: "live",
    images: found,
    cover: { publicId: last.publicId, alt: `${p.title}, ${p.location}` },
    beforeAfter: p.beforeAfter
      ? { before: { ...found[0] }, after: { ...last } }
      : undefined,
  };
}

export async function getAllProjects(): Promise<Project[]> {
  return Promise.all(staticProjects.map(resolve));
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const p = staticProjects.find((x) => x.slug === slug);
  return p ? resolve(p) : undefined;
}

export async function getRelated(slug: string, count = 3): Promise<Project[]> {
  const all = await getAllProjects();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];
  const same = all.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = all.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...same, ...rest].slice(0, count);
}
