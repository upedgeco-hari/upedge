"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { CloudImage } from "@/components/media/CloudImage";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/types";

type Props = {
  project: Project;
  /** Tailwind aspect utility for the image frame, e.g. "aspect-[4/5]". */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Cover image with title, location and category underneath. On hover or keyboard focus the
 * image steps through the construction stages (Before to Final), previewing the story.
 */
export function ProjectCard({ project, aspect = "aspect-[4/3]", sizes = "(min-width: 1024px) 50vw, 100vw", priority, className }: Props) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const frames = project.images;

  useEffect(() => {
    if (!active || reduce) return;
    // Start from the first frame, then advance every 900ms until the final frame.
    const id = setInterval(() => setStep((s) => (s + 1 < frames.length ? s + 1 : s)), 900);
    return () => clearInterval(id);
  }, [active, reduce, frames.length]);

  const start = () => {
    setStep(0);
    setActive(true);
  };
  const stop = () => setActive(false);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn("group block", className)}
      onPointerEnter={start}
      onPointerLeave={stop}
      onFocus={start}
      onBlur={stop}
    >
      <div className="bezel">
        <div className={cn("relative overflow-hidden rounded-inner", aspect)}>
          <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]">
            <CloudImage media={project.cover} sizes={sizes} priority={priority} />
          </div>

          {!reduce && (
            <AnimatePresence initial={false}>
              {active && (
                <motion.div
                  key={frames[step].publicId}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  aria-hidden="true"
                >
                  <CloudImage media={frames[step]} sizes={sizes} />
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Stage ticks appear on hover */}
          <div className="pointer-events-none absolute inset-x-4 bottom-4 flex gap-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
            {frames.map((f, i) => (
              <span key={f.publicId} className="h-0.5 flex-1 rounded-full bg-on-inverse/40">
                <span className={cn("block h-full rounded-full bg-accent transition-transform duration-500", i <= step && active ? "scale-x-100" : "scale-x-0")} style={{ transformOrigin: "left" }} />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6 px-1">
        <div>
          <h3 className="text-xl font-medium tracking-tight sm:text-2xl">{project.title}</h3>
          <p className="mt-1 text-sm text-muted">
            {project.category}, {project.location}
          </p>
        </div>
        <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full bg-ink/5 transition-colors duration-500 ease-smooth group-hover:bg-accent" aria-hidden="true">
          <ArrowUpRight size={18} weight="light" className="transition-transform duration-500 ease-smooth group-hover:-translate-y-px group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
