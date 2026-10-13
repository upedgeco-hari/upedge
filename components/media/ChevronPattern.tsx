import { chevronPath } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";

// Brand chevron (taken from the logo's own accent path) as an alpha mask, so the tile
// takes whatever text colour it sits in: accent on dark surfaces, ink on the accent block.
const tile = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72"><path transform="translate(23 26) scale(0.55) translate(-216 -164)" d="${chevronPath()}"/></svg>`,
);
const mask = `url("data:image/svg+xml,${tile}")`;

/** Decorative brand pattern. Fills its relatively positioned parent. Colour via text-* utility. */
export function ChevronPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 bg-current text-accent", className)}
      style={{ maskImage: mask, WebkitMaskImage: mask, maskSize: "72px 72px", WebkitMaskSize: "72px 72px" }}
    />
  );
}
