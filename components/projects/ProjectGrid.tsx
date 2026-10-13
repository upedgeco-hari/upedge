"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { cn } from "@/lib/cn";
import type { Project, ProjectCategory } from "@/lib/types";

type Filter = "All" | ProjectCategory;

// Repeating asymmetric rhythm: [column span on lg, image aspect]
const rhythm = [
  { span: "lg:col-span-7", aspect: "aspect-[4/3]" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]" },
  { span: "lg:col-span-7", aspect: "aspect-[4/3]" },
] as const;

/** Filterable portfolio grid. Cards glide to their new positions when the filter changes. */
export function ProjectGrid({ projects, categories }: { projects: Project[]; categories: ProjectCategory[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const reduce = useReducedMotion();
  const shown = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.category === filter)), [filter, projects]);
  const options: Filter[] = ["All", ...categories.filter((c) => projects.some((p) => p.category === c))];

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={filter === o}
            onClick={() => setFilter(o)}
            className={cn(
              "shrink-0 rounded-full px-5 py-2.5 text-[0.9375rem] transition-[background-color,color,box-shadow] duration-500 ease-smooth",
              filter === o
                ? "bg-ink text-paper"
                : "text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] hover:bg-ink/5",
            )}
          >
            {o}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>

      <LayoutGroup>
        <motion.ul layout={!reduce} className="mt-10 grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => {
              const r = rhythm[i % rhythm.length];
              return (
                <motion.li
                  key={p.slug}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0.01, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(r.span, i % 4 === 1 && "lg:mt-24", i % 4 === 2 && "lg:-mt-12")}
                >
                  <ProjectCard
                    project={p}
                    aspect={r.aspect}
                    sizes={r.span.includes("7") ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 42vw, 100vw"}
                    priority={i < 2}
                  />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </div>
  );
}
