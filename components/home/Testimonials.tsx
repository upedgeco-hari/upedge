"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Testimonial } from "@/lib/types";

const round =
  "grid size-12 place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--line-strong)] transition-[background-color,color,transform] duration-500 ease-smooth hover:bg-ink hover:text-paper active:scale-95";

/** One large quote at a time. Quotes are capped at three lines by the data, not by CSS tricks. */
export function Testimonials({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const t = items[i];
  const go = (d: number) => setI((i + d + items.length) % items.length);

  return (
    <section className="section-y border-t border-line" aria-roledescription="carousel" aria-label="Client testimonials">
      <div className="container-x">
        <h2 className="display-3 max-w-xl">What clients say</h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="min-h-[15rem] lg:col-span-9">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={i}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                aria-live="polite"
              >
                <blockquote className="display-3 max-w-[30ch] text-balance sm:max-w-[36ch]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 text-muted">
                  <span className="font-medium text-ink">{t.name}</span>
                  <br />
                  {t.role}
                  {t.project ? `, ${t.project}` : ""}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="flex items-end gap-3 lg:col-span-3 lg:justify-end">
            <button type="button" className={round} aria-label="Previous testimonial" onClick={() => go(-1)}>
              <ArrowLeft size={20} weight="light" />
            </button>
            <button type="button" className={round} aria-label="Next testimonial" onClick={() => go(1)}>
              <ArrowRight size={20} weight="light" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
