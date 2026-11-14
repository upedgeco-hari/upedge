"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "up" | "mask" | "media";

type Props = {
  children: ReactNode;
  delay?: number;
  /** Vertical travel in px. Ignored by the mask variant, which travels its own height. */
  y?: number;
  /** Start scale, for frames that should settle rather than slide. */
  scale?: number;
  /**
   * up    body copy, lists, cards: fade and rise.
   * mask  section headings: the line slides up out of its own box. Put the heading
   *       classes on this element (as="h2"), not on a child, or the mask will clip.
   * media photographs: barely any travel, settling out of an over-size.
   */
  variant?: Variant;
  className?: string;
  /** Forwarded: a Reveal rendered as <nav> still needs its accessible name. */
  "aria-label"?: string;
  as?: "div" | "li" | "ul" | "ol" | "nav" | "section" | "article" | "figure" | "header" | "h2" | "h3";
};

// One shared observer for every Reveal on the page (cheaper than one per element).
let observer: IntersectionObserver | undefined;
function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        (e.target as HTMLElement).dataset.in = "";
        observer?.unobserve(e.target);
      }
    },
    // Fires as soon as any part of the element clears the bottom twelfth of the viewport.
    // A threshold ratio would make tall blocks (a full project card) wait until they are
    // most of the way up the screen, which reads as a late, laggy reveal.
    { rootMargin: "0px 0px -8% 0px", threshold: 0 },
  );
  return observer;
}

/**
 * Scroll-triggered entrance. Purpose: reveals content in reading order so the eye is led
 * down the page, with the motion matched to what is being revealed rather than one fade
 * applied to everything. Transitions live in CSS (globals.css), which also handles
 * reduced motion and no-JS. For above-the-fold content use <Rise>.
 */
export function Reveal({ children, delay = 0, y, scale, variant = "up", className, as = "div", "aria-label": ariaLabel }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  const Tag = as as "div"; // typed as div; the element may be an li, h2, figure, ...
  const style = {
    "--d": `${delay}s`,
    ...(variant === "media"
      ? { "--y": `${y ?? 14}px`, "--s": scale ?? 1.04 }
      : { "--y": `${y ?? 26}px`, ...(scale ? { "--s": scale } : {}) }),
  } as CSSProperties;

  // The mask variant needs an inner block to slide inside the clipped heading.
  if (variant === "mask") {
    return (
      <Tag ref={ref} aria-label={ariaLabel} className={cn("reveal-mask", className)} style={{ "--d": `${delay}s` } as CSSProperties}>
        <span>{children}</span>
      </Tag>
    );
  }

  return (
    <Tag ref={ref} aria-label={ariaLabel} className={cn("reveal", variant === "media" && "reveal-media", className)} style={style}>
      {children}
    </Tag>
  );
}
