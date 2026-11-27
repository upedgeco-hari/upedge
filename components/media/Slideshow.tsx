"use client";

import { AnimatePresence, motion } from "motion/react";
import { CloudImage } from "@/components/media/CloudImage";
import type { Media } from "@/lib/types";

/** Time each image stays before the next one starts to appear. */
export const SLIDE_MS = 1200;

/** How long one image takes to dissolve into the next. */
export const crossfade = { duration: 0.9, ease: [0.4, 0, 0.2, 1] as const };

/** The incoming image eases back from a slight zoom, still gliding as the next one arrives. */
const transition = { opacity: crossfade, scale: { duration: 2.4, ease: [0.16, 1, 0.3, 1] as const } };

type Props = {
  frames: Media[];
  /** Index of the image on show. The parent decides when it changes. */
  step: number;
  sizes: string;
  priority?: boolean;
};

/** One smooth image-to-image transition, filling a relatively positioned, clipped parent. */
export function Slideshow({ frames, step, sizes, priority }: Props) {
  // Two ahead, so a slow connection still has the image before it is needed.
  const upcoming = [1, 2].filter((n) => n < frames.length).map((n) => frames[(step + n) % frames.length]);
  return (
    <>
      {/* Coming images load out of sight, so each is ready when its turn comes. */}
      <div className="absolute inset-0 opacity-0" aria-hidden="true">
        {upcoming.map((frame) => (
          <CloudImage key={frame.publicId} media={frame} sizes={sizes} />
        ))}
      </div>
      <AnimatePresence initial={false}>
        {/* The outgoing image stays solid underneath while the next one fades in over it. */}
        <motion.div
          key={frames[step].publicId}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.99 }}
          transition={transition}
        >
          <CloudImage media={frames[step]} sizes={sizes} priority={priority} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
