"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CloudImage } from "@/components/media/CloudImage";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/types";

/** Time each photo stays before the next one fades in. */
const SLIDE_MS = 1200;

type Props = {
  service: Pick<Service, "image" | "gallery">;
  sizes: string;
  priority?: boolean;
};

/**
 * A service's picture, filling its (relatively positioned) parent. A service with a gallery
 * slides through it in order, only while on screen; reduced motion keeps the first photo.
 */
export function ServiceImage({ service, sizes, priority }: Props) {
  const frames = service.gallery ?? [service.image];
  const count = frames.length;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce || !inView || count < 2) return;
    const id = setInterval(() => setStep((s) => (s + 1) % count), SLIDE_MS);
    return () => clearInterval(id);
  }, [reduce, inView, count]);

  if (count < 2) return <CloudImage media={frames[0]} sizes={sizes} priority={priority} />;

  const previous = (step - 1 + count) % count;
  return (
    <div ref={ref} className="absolute inset-0">
      {frames.map((frame, i) => (
        // The outgoing photo stays solid underneath while the next one fades in over it.
        <div
          key={frame.publicId}
          className={cn("absolute inset-0", i === step ? "z-[2] opacity-100 transition-opacity duration-500 ease-smooth" : i === previous ? "z-[1] opacity-100" : "opacity-0")}
          aria-hidden={i !== step}
        >
          <CloudImage media={frame} sizes={sizes} priority={priority} />
        </div>
      ))}
    </div>
  );
}
