"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  /** Total vertical travel in px across the viewport pass (positive moves content down as you scroll). */
  distance?: number;
  /** Slightly over-scale so travel never reveals an edge. */
  scale?: number;
  /** Turn motion off (used for placeholders, which should stay put and readable). */
  disabled?: boolean;
  className?: string;
};

/**
 * Image parallax: purposeful depth on large photography, driven by motion values (no state).
 * Wrap content inside an overflow-hidden, relatively positioned frame.
 */
export function Parallax({ children, distance = 80, scale = 1.12, disabled, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2]);

  return (
    <div ref={ref} className={cn("absolute inset-0", className)}>
      <motion.div className="absolute inset-0" style={reduce || disabled ? undefined : { y, scale }}>
        {children}
      </motion.div>
    </div>
  );
}
