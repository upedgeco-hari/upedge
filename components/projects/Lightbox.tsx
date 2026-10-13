"use client";

import { ArrowLeft, ArrowRight, MagnifyingGlassMinus, MagnifyingGlassPlus, X } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CloudImage } from "@/components/media/CloudImage";
import { cn } from "@/lib/cn";
import type { ProjectImage } from "@/lib/types";

type Props = {
  images: ProjectImage[];
  /** null = closed */
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
};

const ctl =
  "grid size-11 place-items-center rounded-full bg-on-inverse/10 text-on-inverse transition-colors duration-300 hover:bg-on-inverse hover:text-inverse disabled:opacity-30 disabled:hover:bg-on-inverse/10 disabled:hover:text-on-inverse";

/** Fullscreen viewer with zoom, arrow-key navigation, Esc to close and a focus trap. */
export function Lightbox({ images, index, onClose, onIndex }: Props) {
  const open = index !== null;
  const [zoom, setZoom] = useState<{ for: number | null }>({ for: null });
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const i = index ?? 0;
  const zoomed = zoom.for === index; // zoom resets whenever the image changes

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("[data-close]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onIndex(Math.min(images.length - 1, i + 1));
      else if (e.key === "ArrowLeft") onIndex(Math.max(0, i - 1));
      else if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      previous?.focus();
    };
  }, [open, i, images.length, onClose, onIndex]);

  const img = images[i];

  return (
    <AnimatePresence>
      {open && img && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${i + 1} of ${images.length}: ${img.stage}`}
          data-lenis-prevent
          data-inverse
          className="fixed inset-0 z-[var(--z-modal)] flex flex-col bg-inverse text-on-inverse"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="flex items-center justify-between gap-4 px-[var(--gutter)] py-4">
            <p className="tabular text-sm">
              <span className="font-medium">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-on-inverse-muted"> / {String(images.length).padStart(2, "0")}</span>
              <span className="ml-4 hidden sm:inline">{img.stage}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={ctl}
                aria-label={zoomed ? "Zoom out" : "Zoom in"}
                aria-pressed={zoomed}
                onClick={() => setZoom({ for: zoomed ? null : index })}
              >
                {zoomed ? <MagnifyingGlassMinus size={20} weight="light" /> : <MagnifyingGlassPlus size={20} weight="light" />}
              </button>
              <button type="button" data-close className={ctl} aria-label="Close" onClick={onClose}>
                <X size={20} weight="light" />
              </button>
            </div>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden">
            <motion.div
              key={img.publicId}
              className={cn("absolute inset-0 px-4 sm:px-16", zoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in")}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              onClick={() => !zoomed && setZoom({ for: index })}
            >
              <motion.div
                className="relative mx-auto h-full w-full max-w-[1800px]"
                animate={{ scale: zoomed ? 2.2 : 1 }}
                transition={{ type: "spring", stiffness: 160, damping: 24 }}
                drag={zoomed}
                dragConstraints={{ left: -400, right: 400, top: -300, bottom: 300 }}
                dragElastic={0.1}
              >
                <div className="absolute inset-0 [&_img]:object-contain!">
                  <CloudImage media={img} sizes="100vw" />
                </div>
              </motion.div>
            </motion.div>

            <button type="button" className={cn(ctl, "absolute left-3 top-1/2 -translate-y-1/2 sm:left-5")} aria-label="Previous image" disabled={i === 0} onClick={() => onIndex(i - 1)}>
              <ArrowLeft size={20} weight="light" />
            </button>
            <button type="button" className={cn(ctl, "absolute right-3 top-1/2 -translate-y-1/2 sm:right-5")} aria-label="Next image" disabled={i === images.length - 1} onClick={() => onIndex(i + 1)}>
              <ArrowRight size={20} weight="light" />
            </button>
          </div>

          <p className="px-[var(--gutter)] py-4 text-center text-sm text-on-inverse-muted">{img.caption}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
