"use client";

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
};

/**
 * Every Cloudinary image on the site goes through this component:
 * f_auto + q_auto, responsive srcset, blur-up placeholder, lazy loading.
 * It fills its (relatively positioned) parent, so give the parent an aspect ratio
 * to avoid layout shift.
 */
export function CloudImage({ media, sizes, priority, className, placeholderTop }: Props) {
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
      className={cn("object-cover", className)}
    />
  );
}
