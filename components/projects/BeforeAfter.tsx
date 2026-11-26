"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { ArrowsHorizontal } from "@phosphor-icons/react/dist/ssr";
import { CloudImage } from "@/components/media/CloudImage";
import { cn } from "@/lib/cn";
import type { Comparison } from "@/lib/types";

/**
 * Two-image comparison (before/after, day/night). A transparent native range input sits on top, so the slider
 * is draggable by mouse and touch, and operable with arrow keys by assistive tech.
 */
export function BeforeAfter({ before, after, labels }: Pick<Comparison, "before" | "after" | "labels">) {
  const portrait = (after.height ?? 0) > (after.width ?? 0);
  const sizes = portrait ? "(min-width: 768px) 640px, 100vw" : "(min-width: 1280px) 1200px, 100vw";
  const pos = useMotionValue(50);
  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);

  return (
    <div className={cn("bezel", portrait && "mx-auto max-w-2xl short:max-w-xs")}>
      <div className={cn("relative overflow-hidden rounded-inner", portrait ? "aspect-[4/5]" : "aspect-[4/3] sm:aspect-[16/9]")}>
        <CloudImage media={after} sizes={sizes} />
        {/* The first image is revealed from the left up to the handle */}
        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <CloudImage media={before} sizes={sizes} />
        </motion.div>

        <motion.div className="pointer-events-none absolute inset-y-0 w-px bg-on-inverse" style={{ left }} aria-hidden="true">
          <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-accent-ink shadow-accent">
            <ArrowsHorizontal size={22} weight="light" />
          </span>
        </motion.div>

        <p className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-inverse/70 px-3 py-1.5 text-xs text-on-inverse backdrop-blur-md">{labels[0]}</p>
        <p className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-inverse/70 px-3 py-1.5 text-xs text-on-inverse backdrop-blur-md">{labels[1]}</p>

        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          defaultValue={50}
          aria-label={`Drag to compare ${labels[0]} and ${labels[1]}`}
          onChange={(e) => pos.set(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
        />
      </div>
    </div>
  );
}
