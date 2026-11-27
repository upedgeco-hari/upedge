"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CloudImage } from "@/components/media/CloudImage";
import { crossfade, SLIDE_MS, Slideshow } from "@/components/media/Slideshow";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/types";
import { useMediaQuery } from "@/lib/useMediaQuery";

type Props = {
  project: Project;
  /** Tailwind aspect utility for the image frame, e.g. "aspect-[4/5]". */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Cover image with title, location and category underneath. The image slides through the
 * project's views or construction stages, one every 1.2 seconds: on hover or keyboard focus,
 * and on touch screens whenever the card is in view.
 */
export function ProjectCard({ project, aspect = "aspect-[4/3]", sizes = "(min-width: 1024px) 50vw, 100vw", priority, className }: Props) {
  const reduce = useReducedMotion();
  const touch = useMediaQuery("(hover: none)");
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame, { amount: 0.6 });
  const [pointed, setPointed] = useState(false);
  const frames = project.images;
  const count = frames.length;
  // The slideshow starts on the cover, so nothing jumps before the first change.
  const first = Math.max(0, frames.findIndex((f) => f.publicId === project.cover.publicId));
  const [step, setStep] = useState(first);
  const active = !reduce && count > 1 && (pointed || (touch && inView));

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setStep((s) => (s + 1) % count), SLIDE_MS);
    return () => clearInterval(id);
  }, [active, count]);

  const start = () => {
    setStep(first);
    setPointed(true);
  };
  const stop = () => setPointed(false);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn("group block", className)}
      // A finger has no hover: on touch screens being in view drives the slideshow instead.
      onPointerEnter={(e) => e.pointerType !== "touch" && start()}
      onPointerLeave={(e) => e.pointerType !== "touch" && stop()}
      onFocus={(e) => e.currentTarget.matches(":focus-visible") && start()}
      onBlur={stop}
    >
      <div className="bezel group-hover:-translate-y-1 group-hover:shadow-[inset_0_0_0_1px_var(--line),var(--elev-4)]">
        <div ref={frame} className={cn("relative overflow-hidden rounded-inner", aspect, "short:aspect-[16/9]")}>
          <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]">
            <CloudImage media={project.cover} sizes={sizes} priority={priority} />

            <AnimatePresence initial={false}>
              {active && (
                <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={crossfade} aria-hidden="true">
                  <Slideshow frames={frames} step={step} sizes={sizes} priority={priority} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress ticks, shown while the slideshow runs */}
          <div className={cn("pointer-events-none absolute inset-x-4 bottom-4 flex gap-1 transition-opacity duration-500", active ? "opacity-100" : "opacity-0")} aria-hidden="true">
            {frames.map((f, i) => (
              <span key={f.publicId} className="h-0.5 flex-1 rounded-full bg-on-inverse/40">
                <span className={cn("block h-full origin-left rounded-full bg-accent transition-transform ease-linear", i === step ? "duration-[1200ms]" : "duration-300", i <= step && active ? "scale-x-100" : "scale-x-0")} />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6 px-1">
        <div>
          <h3 className="text-xl font-medium tracking-tight sm:text-2xl">{project.title}</h3>
          <p className="mt-2 text-sm text-muted">
            {project.category}, {project.location ?? (project.kind === "design" ? "3D design" : "Site photos")}
          </p>
        </div>
        <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full bg-ink/5 transition-[background-color,box-shadow] duration-[var(--dur-3)] ease-smooth group-hover:bg-accent group-hover:shadow-accent" aria-hidden="true">
          <ArrowUpRight size={18} weight="light" className="transition-transform duration-[var(--dur-3)] ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
