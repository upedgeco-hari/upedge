import "server-only";
import { unstable_cache } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import type { ProjectImage } from "@/lib/types";

/**
 * OPTIONAL: auto-discover a project's images from its Cloudinary folder.
 * Enable with CLOUDINARY_DISCOVERY=true plus the three Cloudinary env variables.
 * Server only: the API secret is never sent to the browser.
 */
export const discoveryEnabled =
  process.env.CLOUDINARY_DISCOVERY === "true" &&
  !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
  !!process.env.CLOUDINARY_API_KEY &&
  !!process.env.CLOUDINARY_API_SECRET;

const STAGE_NAMES: Record<string, string> = {
  before: "Before",
  foundation: "Foundation",
  structure: "Structure",
  finishing: "Finishing",
  final: "Final",
};

/** "03-structure_ab12cd" -> { order: 3, stage: "Structure" } */
export function parseName(publicId: string) {
  const file = publicId.split("/").pop() ?? publicId;
  const m = /^(\d+)[-_ ]?(.*)$/.exec(file);
  const order = m ? parseInt(m[1], 10) : 999;
  // Cloudinary appends _xxxxxx when a duplicate name is uploaded.
  const raw = (m ? m[2] : file).replace(/_[a-z0-9]{6}$/i, "").replace(/[-_]+/g, " ").trim();
  const key = raw.toLowerCase();
  const stage = STAGE_NAMES[key] ?? (raw ? raw.replace(/\b\w/g, (c) => c.toUpperCase()) : `Step ${order}`);
  return { order, stage };
}

async function fetchFolder(slug: string, title: string): Promise<ProjectImage[]> {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  const res = await cloudinary.search
    .expression(`resource_type:image AND asset_folder="upedge/projects/${slug}"`)
    .max_results(100)
    .with_field("context")
    .execute();

  return (res.resources as { public_id: string; context?: { custom?: { caption?: string; alt?: string } } }[])
    .map((r) => ({ r, ...parseName(r.public_id) }))
    .sort((a, b) => a.order - b.order || a.r.public_id.localeCompare(b.r.public_id))
    .map(({ r, stage }) => ({
      publicId: r.public_id,
      stage,
      caption: r.context?.custom?.caption,
      alt: r.context?.custom?.alt ?? `${title}: ${stage.toLowerCase()} stage`,
    }));
}

/** Cached for an hour (ISR-style). Returns [] when the folder is empty or the API fails. */
export const discoverImages = unstable_cache(
  async (slug: string, title: string) => {
    try {
      return await fetchFolder(slug, title);
    } catch {
      return [];
    }
  },
  ["cloudinary-project-images"],
  { revalidate: 3600, tags: ["cloudinary"] },
);
