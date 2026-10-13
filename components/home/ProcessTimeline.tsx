"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/data/site";

/**
 * Six-stage process. A vertical line fills as the reader scrolls, so progress through the
 * stages is visible without numbering them.
 */
export function ProcessTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 65%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <section className="section-y border-t border-line">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <h2 className="display-2 text-balance">From first call to final handover.</h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-6">
              <p className="lead">Six clear stages, each with a defined outcome, so you always know where your project stands.</p>
            </Reveal>
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-6 lg:col-start-7">
          <span className="absolute bottom-3 left-[0.6875rem] top-3 w-px bg-line-strong" aria-hidden="true" />
          <motion.span
            className="absolute bottom-3 left-[0.6875rem] top-3 w-px origin-top bg-accent"
            style={{ scaleY: reduce ? 1 : fill }}
            aria-hidden="true"
          />
          {processSteps.map((s) => (
            <Reveal as="li" key={s.title} className="relative pb-14 pl-12 last:pb-0">
              <span className="absolute left-0 top-1.5 grid size-6 place-items-center rounded-full bg-paper shadow-[inset_0_0_0_1px_var(--line-strong)]" aria-hidden="true">
                <span className="size-2 rounded-full bg-accent" />
              </span>
              <h3 className="display-3">{s.title}</h3>
              <p className="mt-3 max-w-[52ch] text-ink-2">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
