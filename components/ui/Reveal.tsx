"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
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
    { rootMargin: "0px 0px -8% 0px", threshold: 0.15 },
  );
  return observer;
}

/**
 * Scroll-triggered fade-up. Purpose: reveals content in reading order so the eye is led
 * down the page. Transitions live in CSS (.reveal in globals.css), which also handles
 * reduced motion and no-JS. For above-the-fold content use <Rise>.
 */
export function Reveal({ children, delay = 0, y = 28, className, as = "div" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  const Tag = as as "div"; // typed as div; the element may be an li, section or article
  return (
    <Tag ref={ref} className={cn("reveal", className)} style={{ "--d": `${delay}s`, "--y": `${y}px` } as CSSProperties}>
      {children}
    </Tag>
  );
}
