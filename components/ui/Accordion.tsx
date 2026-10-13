"use client";

import { Plus } from "@phosphor-icons/react/dist/ssr";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";

type Item = { q: string; a: string };

/** FAQ accordion. One item open at a time; fully keyboard and screen-reader accessible. */
export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                id={`${id}-t-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium tracking-tight sm:text-xl"
              >
                {item.q}
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full bg-ink/5 transition-transform duration-500 ease-smooth",
                    isOpen && "rotate-45 bg-accent",
                  )}
                  aria-hidden="true"
                >
                  <Plus size={16} weight="light" />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-p-${i}`}
              role="region"
              aria-labelledby={`${id}-t-${i}`}
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-smooth",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pb-6 text-ink-2">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
