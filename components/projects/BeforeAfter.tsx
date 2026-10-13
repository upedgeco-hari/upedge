"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { ArrowsHorizontal } from "@phosphor-icons/react/dist/ssr";
import { CloudImage } from "@/components/media/CloudImage";
import type { Media } from "@/lib/types";

/**
 * Before/after comparison. A transparent native range input sits on top, so the slider
 * is draggable by mouse and touch, and operable with arrow keys by assistive tech.
 */
export function BeforeAfter({ before, after }: { before: Media; after: Media }) {
  const pos = useMotionValue(50);
  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);

  return (
    <div className="bezel">
      <div className="relative aspect-[4/3] overflow-hidden rounded-inner sm:aspect-[16/9]">
        <CloudImage media={after} sizes="(min-width: 1280px) 1200px, 100vw" />
        {/* "Before" is revealed from the left up to the handle */}
        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <CloudImage media={before} sizes="(min-width: 1280px) 1200px, 100vw" />
        </motion.div>

        <motion.div className="pointer-events-none absolute inset-y-0 w-px bg-on-inverse" style={{ left }} aria-hidden="true">
          <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-accent-ink shadow-[0_8px_24px_-8px_rgb(13_13_13/0.5)]">
            <ArrowsHorizontal size={22} weight="light" />
          </span>
        </motion.div>

        <p className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-inverse/70 px-3 py-1.5 text-xs text-on-inverse backdrop-blur-md">Before</p>
        <p className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-inverse/70 px-3 py-1.5 text-xs text-on-inverse backdrop-blur-md">After</p>

        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          defaultValue={50}
          aria-label="Drag to compare before and after"
          onChange={(e) => pos.set(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  );
}
