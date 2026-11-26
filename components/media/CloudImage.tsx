"use client";

import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { CLOUD_NAME, blurUrl } from "@/lib/cloudinary";
import { cn } from "@/lib/cn";
import type { Media } from "@/lib/types";
import { Placeholder } from "@/components/media/Placeholder";

type Props = {
  media: Media;
  /** Responsive sizes hint, e.g. "(min-width: 1024px) 50vw, 100vw". Drives the srcset. */
  sizes: string;
  /** Use for the hero / first story frame only. */
  priority?: boolean;
  className?: string;
  /** Pin the placeholder label to the top (for frames with text overlaid at the bottom). */
  placeholderTop?: boolean;
  /** "contain" shows the whole image (story viewer, lightbox) instead of cropping to the frame. */
  fit?: "cover" | "contain";
};

/**
 * `sizes` for a photo shown whole (fit="contain") in a screen-high frame: a portrait one
 * only fills the height, so it needs far fewer pixels than the full screen width.
 */
export function containSizes({ width, height }: Media) {
  return width && height ? `min(100vw, ${Math.ceil((width / height) * 100)}vh)` : "100vw";
}

/**
 * Every content image on the site goes through this component. Files in public/ (media.src)
 * are optimised by next/image; everything else comes from Cloudinary (f_auto + q_auto,
 * blur-up). Both get a responsive srcset and lazy loading.
 * It fills its (relatively positioned) parent, so give the parent an aspect ratio
 * to avoid layout shift.
 */
export function CloudImage({ media, sizes, priority, className, placeholderTop, fit = "cover" }: Props) {
  const style = fit === "cover" && media.position ? { objectPosition: media.position } : undefined;
  const classes = cn(fit === "cover" ? "object-cover" : "object-contain", className);

  if (media.src && !media.placeholder) {
    return (
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        loading={priority ? "eager" : undefined}
        fetchPriority={priority ? "high" : undefined}
        className={classes}
        style={style}
      />
    );
  }
  if (media.placeholder || !CLOUD_NAME) {
    return <Placeholder label={media.label ?? media.publicId} className={className} top={placeholderTop} />;
  }
  return (
    <CldImage
      src={media.publicId}
      alt={media.alt}
      fill
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={blurUrl(media.publicId)}
      className={classes}
      style={style}
    />
  );
}
