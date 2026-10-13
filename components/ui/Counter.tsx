"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type Props = { value: number | null; suffix?: string; className?: string; /** Show the number as written (years): no animation, no separators. */ plain?: boolean };

/**
 * Counts up once when scrolled into view. value: null renders an obvious [00] placeholder.
 * Writes straight to the DOM node, so no re-renders per frame.
 */
export function Counter({ value, suffix = "", className, plain }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || value === null || plain) return;
    if (!inView || reduce) {
      el.textContent = (reduce ? value : 0).toLocaleString("en-IN") + suffix;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toLocaleString("en-IN") + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, reduce, plain]);

  if (value === null) return <span className={className}>[00]{suffix}</span>;
  if (plain) return <span className={className}>{value}{suffix}</span>;
  return (
    <span ref={ref} className={className}>
      {(reduce ? value : 0).toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
