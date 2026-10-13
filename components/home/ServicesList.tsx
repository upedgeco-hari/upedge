"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { CloudImage } from "@/components/media/CloudImage";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/types";

/**
 * Interactive service list. Hovering or focusing a row swaps the preview image on the right
 * (desktop). On small screens every row simply shows its description.
 */
export function ServicesList({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = services[active];

  return (
    <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
      <ul className="divide-y divide-line border-y border-line">
        {services.map((s, i) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group block py-7 sm:py-8"
            >
              <span className="flex items-center justify-between gap-6">
                <span
                  className={cn(
                    "display-3 transition-[opacity,transform] duration-500 ease-smooth",
                    i === active ? "lg:translate-x-3" : "lg:opacity-60",
                  )}
                >
                  {s.title}
                </span>
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-full transition-colors duration-500 ease-smooth",
                    i === active ? "bg-accent" : "bg-ink/5",
                  )}
                  aria-hidden="true"
                >
                  <ArrowUpRight size={20} weight="light" />
                </span>
              </span>
              <span className="mt-3 block max-w-[52ch] text-muted lg:hidden">{s.short}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="relative hidden lg:block" aria-hidden="true">
        <div className="sticky top-28">
          <div className="bezel">
            <div className="relative aspect-[4/5] overflow-hidden rounded-inner">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.slug}
                  className="absolute inset-0"
                  initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                >
                  <CloudImage media={current.image} sizes="(min-width: 1024px) 36vw, 0px" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <p className="mt-6 max-w-[40ch] text-ink-2">{current.short}</p>
        </div>
      </div>
    </div>
  );
}
