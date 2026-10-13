import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Above-the-fold entrance. Pure CSS (no JavaScript), so the hero text paints immediately
 * and the Largest Contentful Paint is not delayed by hydration. Below the fold, use <Reveal>.
 * Reduced-motion users get the final state instantly (see the global rule in globals.css).
 */
export function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={cn("rise", className)} style={{ "--d": `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}
