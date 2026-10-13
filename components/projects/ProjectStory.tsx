"use client";

import { ArrowLeft, ArrowRight, ArrowsOut } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CloudImage } from "@/components/media/CloudImage";
import { Lightbox } from "@/components/projects/Lightbox";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/types";
import { useMediaQuery } from "@/lib/useMediaQuery";

const pad = (n: number) => String(n).padStart(2, "0");
const ease = [0.32, 0.72, 0, 1] as const;

const round =
  "grid size-12 place-items-center rounded-full bg-on-inverse/12 text-on-inverse backdrop-blur-md transition-[background-color,color,transform] duration-500 ease-smooth hover:bg-on-inverse hover:text-inverse active:scale-95 disabled:opacity-30 disabled:hover:bg-on-inverse/12 disabled:hover:text-on-inverse";

/**
 * The construction story.
 *  - Scroll mode (desktop default): a sticky full-height panel changes image as you scroll.
 *  - Browse mode (always on phones): step with buttons, arrow keys, swipe or thumbnails.
 * Both share one index, a stage label, a counter, a segmented progress bar and the lightbox.
 */
export function ProjectStory({ project }: { project: Project }) {
  const { images } = project;
  const n = images.length;
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)", true);
  const [mode, setMode] = useState<"scroll" | "browse">("scroll");
  const [manual, setManual] = useState(0);
  const [scrollIdx, setScrollIdx] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [prev, setPrev] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-30% 0px -30% 0px" });
  const scrollMode = desktop && mode === "scroll";
  const active = scrollMode ? scrollIdx : manual;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setScrollIdx(Math.min(n - 1, Math.max(0, Math.floor(p * n)))));

  // Remember the previous frame so it can fade out even after a jump (thumbnail click).
  useEffect(() => {
    const id = requestAnimationFrame(() => setPrev(active));
    return () => cancelAnimationFrame(id);
  }, [active]);

  const sectionTop = () => (sectionRef.current ? sectionRef.current.getBoundingClientRect().top + window.scrollY : 0);

  const goTo = useCallback(
    (i: number) => {
      const next = Math.min(n - 1, Math.max(0, i));
      if (scrollMode) {
        window.scrollTo({ top: sectionTop() + next * window.innerHeight + 4, behavior: reduce ? "auto" : "smooth" });
      } else {
        setManual(next);
      }
    },
    [n, scrollMode, reduce],
  );

  const switchMode = (next: "scroll" | "browse") => {
    if (next === mode) return;
    const top = sectionTop();
    if (next === "browse") setManual(active);
    setMode(next);
    // Section height changes with the mode, so re-anchor to the same frame.
    requestAnimationFrame(() =>
      window.scrollTo({ top: next === "scroll" ? top + active * window.innerHeight + 4 : top, behavior: "instant" }),
    );
  };

  // Arrow keys step through frames while the story is on screen (left/right never scroll the page).
  useEffect(() => {
    if (!inView || lightbox !== null) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowRight") goTo(active + 1);
      if (e.key === "ArrowLeft") goTo(active - 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [inView, lightbox, active, goTo]);

  const current = images[active];
  const visible = new Set([active - 1, active, active + 1, prev]); // current, neighbours (preloaded) and the one fading out

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label={`${project.title} construction story`}
      className="relative h-[100dvh] md:h-[var(--story-h)]"
      style={{ ["--story-h" as string]: mode === "scroll" ? `${n * 100}dvh` : "100dvh" }}
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-inverse text-on-inverse" data-inverse>
        {/* Frames */}
        <div className="absolute inset-0">
          {images.map((img, i) =>
            visible.has(i) ? (
              <motion.div
                key={img.publicId}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.05 }}
                transition={{ duration: reduce ? 0 : 1, ease }}
                aria-hidden={i !== active}
              >
                <CloudImage media={img} sizes="100vw" priority={i === 0} />
              </motion.div>
            ) : null,
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-inverse/85 via-inverse/10 to-inverse/45" aria-hidden="true" />

        {/* Swipe layer (pan-y keeps vertical page scroll working on touch) */}
        <motion.div
          className="absolute inset-0"
          style={{ touchAction: "pan-y" }}
          onPanEnd={(_, info) => {
            if (Math.abs(info.offset.x) < 60 || Math.abs(info.offset.x) < Math.abs(info.offset.y)) return;
            goTo(active + (info.offset.x < 0 ? 1 : -1));
          }}
        />

        {/* Top bar */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between px-[var(--gutter)] pt-24">
          <p className="max-w-[24ch] text-sm text-on-inverse/85 sm:max-w-none">
            {project.title}
            <span className="text-on-inverse-muted"> / {project.category}</span>
          </p>
          <div className="pointer-events-auto flex items-center gap-2">
            <div role="group" aria-label="Viewing mode" className="hidden rounded-full bg-on-inverse/12 p-1 backdrop-blur-md md:flex">
              {(["scroll", "browse"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={mode === m}
                  onClick={() => switchMode(m)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm capitalize transition-colors duration-500 ease-smooth",
                    mode === m ? "bg-accent text-accent-ink" : "text-on-inverse hover:bg-on-inverse/10",
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
            <button type="button" className={round} aria-label="View fullscreen" onClick={() => setLightbox(active)}>
              <ArrowsOut size={20} weight="light" />
            </button>
          </div>
        </div>

        {/* Stage, counter, caption */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-8 px-[var(--gutter)] pb-10 sm:pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="tabular text-sm text-on-inverse/85" aria-live="polite">
              <span className="font-medium text-on-inverse">{pad(active + 1)}</span> / {pad(n)}
            </p>
            <div className="mt-3 overflow-hidden pb-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.h2
                  key={current.stage + active}
                  className="display-2"
                  initial={reduce ? false : { y: "100%" }}
                  animate={{ y: 0 }}
                  exit={reduce ? undefined : { y: "-100%" }}
                  transition={{ duration: 0.55, ease }}
                >
                  {current.stage}
                </motion.h2>
              </AnimatePresence>
            </div>
            <p className="mt-4 min-h-[3.5rem] max-w-[48ch] text-on-inverse/85">{current.caption}</p>
          </div>

          <div className="pointer-events-auto flex flex-col items-start gap-5 pr-16 lg:items-end">
            <ul className="no-scrollbar hidden max-w-[34rem] gap-2 overflow-x-auto md:flex" aria-label="Frames">
              {images.map((img, i) => (
                <li key={img.publicId}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to ${pad(i + 1)}, ${img.stage}`}
                    aria-current={i === active}
                    className={cn(
                      "relative block h-12 w-[4.25rem] shrink-0 overflow-hidden rounded-lg transition-[opacity,box-shadow] duration-500 ease-smooth",
                      i === active ? "opacity-100 shadow-[0_0_0_2px_var(--accent)]" : "opacity-60 hover:opacity-100",
                    )}
                  >
                    {img.placeholder ? (
                      <span className="tabular grid h-full place-items-center bg-inverse-2 text-xs text-on-inverse">{pad(i + 1)}</span>
                    ) : (
                      <CloudImage media={img} sizes="68px" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <button type="button" className={round} aria-label="Previous frame" disabled={active === 0} onClick={() => goTo(active - 1)}>
                <ArrowLeft size={20} weight="light" />
              </button>
              <button type="button" className={round} aria-label="Next frame" disabled={active === n - 1} onClick={() => goTo(active + 1)}>
                <ArrowRight size={20} weight="light" />
              </button>
            </div>
          </div>
        </div>

        {/* Slim segmented progress */}
        <div className="absolute inset-x-0 bottom-0 flex gap-1 px-[var(--gutter)] pb-4" aria-hidden="true">
          {images.map((img, i) => (
            <span key={img.publicId} className="h-0.5 flex-1 overflow-hidden rounded-full bg-on-inverse/25">
              <span
                className="block h-full origin-left bg-accent transition-transform duration-700 ease-smooth"
                style={{ transform: `scaleX(${i <= active ? 1 : 0})` }}
              />
            </span>
          ))}
        </div>
      </div>

      <Lightbox images={images} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
    </section>
  );
}
