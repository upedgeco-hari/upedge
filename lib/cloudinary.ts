import { getCldImageUrl } from "next-cloudinary";

export const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";

/** True when real Cloudinary delivery is possible. */
export const cloudinaryReady = CLOUD_NAME.length > 0;

/** True when this image should be fetched from Cloudinary rather than shown as a placeholder. */
export const isLive = (m: { placeholder?: boolean }) => cloudinaryReady && !m.placeholder;

/** Tiny blurred preview used as the blur-up placeholder (about 1 KB). */
export function blurUrl(publicId: string) {
  return getCldImageUrl(
    { src: publicId, width: 24, quality: 30, effects: [{ blur: "800" }] },
    { cloud: { cloudName: CLOUD_NAME } },
  );
}

/** Absolute, optimised URL for Open Graph / JSON-LD (1200 x 630, auto format and quality). */
export function ogImageUrl(publicId: string) {
  return getCldImageUrl(
    { src: publicId, width: 1200, height: 630, crop: "fill", gravity: "auto" },
    { cloud: { cloudName: CLOUD_NAME } },
  );
}

/** Generic delivery URL at a given width, for schema.org ImageObject. */
export function imageUrl(publicId: string, width = 1600) {
  return getCldImageUrl({ src: publicId, width }, { cloud: { cloudName: CLOUD_NAME } });
}
