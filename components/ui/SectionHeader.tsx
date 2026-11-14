import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Props = {
  /** Small label above the title, introduced by the brand rule. */
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** display-2 for a primary section, display-3 for a secondary one. */
  size?: "lg" | "sm";
  className?: string;
};

/**
 * The one section header on the site.
 *
 * Every section used to set its own eyebrow style and its own eyebrow-to-title and
 * title-to-lead gaps, so no two headers aligned. This fixes that rhythm in one place:
 * the rule sits 1.5rem above the title, the lead 1.5rem below it, and the content that
 * follows is spaced with `block-gap`. Measure is capped so a title never runs wider
 * than the lead underneath it.
 *
 * Motion: the three parts cascade rather than arriving together, and the title uses the
 * curtain reveal so the heading is the one thing on the page that moves differently.
 * The heading classes sit on the Reveal element itself because the mask clips to it.
 */
export function SectionHeader({ eyebrow, title, lead, size = "lg", className }: Props) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && (
        <Reveal className="mb-6 flex items-center gap-3">
          <span className="h-px w-9 shrink-0 bg-accent" aria-hidden="true" />
          <span className="eyebrow text-muted">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal
        as="h2"
        variant="mask"
        delay={eyebrow ? 0.08 : 0}
        className={cn(size === "lg" ? "display-2" : "display-3", "text-balance")}
      >
        {title}
      </Reveal>
      {lead && (
        <Reveal delay={eyebrow ? 0.22 : 0.14} className="mt-6">
          <p className="lead">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
