"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Testimonial } from "@/lib/types";

const round =
  "grid size-12 place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--line-strong)] transition-[background-color,color,transform,box-shadow] duration-[var(--dur-3)] ease-smooth hover:bg-ink hover:text-paper hover:shadow-[inset_0_0_0_1px_var(--ink),var(--elev-3)] active:scale-95";

/** One large quote at a time. Quotes are capped at three lines by the data, not by CSS tricks. */
export function Testimonials({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const t = items[i];
  const go = (d: number) => setI((i + d + items.length) % items.length);

  return (
    <section className="section-y edge-top" aria-roledescription="carousel" aria-label="Client testimonials">
      <div className="container-x">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="display-3 max-w-3xl text-balance">What clients say</h2>
          <p className="index-num tabular text-muted">
            {String(i + 1).padStart(2, "0")}
            <span className="mx-1.5 text-line-strong">/</span>
            {String(items.length).padStart(2, "0")}
          </p>
        </div>

        <div className="block-gap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="relative min-h-60 lg:col-span-8">
            {/* Oversized quote glyph, set in the accent and clipped by the type above it. */}
            <span
              className="pointer-events-none absolute -left-1 -top-8 select-none text-[7rem] leading-none text-accent/12 sm:-left-2 sm:-top-16 sm:text-[12rem] lg:-top-24 lg:text-[16rem]"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={i}
                className="relative"
                initial={reduce ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -14 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                aria-live="polite"
              >
                <blockquote className="display-3 measure-quote text-balance">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 text-muted">
                  <span className="h-px w-9 shrink-0 bg-accent" aria-hidden="true" />
                  <span>
                    <span className="font-medium text-ink">{t.name}</span>
                    <br />
                    {t.role}
                    {t.project ? `, ${t.project}` : ""}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="flex items-end gap-3 lg:col-span-3 lg:col-start-10 lg:justify-end">
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
