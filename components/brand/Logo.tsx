import { LOGO } from "@/components/brand/logo-paths";
import { cn } from "@/lib/cn";

type Props = {
  /** mark = the U monogram, wordmark = UPEDGE, full = wordmark with tagline */
  variant?: "mark" | "wordmark" | "full";
  className?: string;
  title?: string;
};

/**
 * Brand logo as inline SVG. The ink colour follows `currentColor` (so it flips with
 * the surrounding text colour and the theme); the chevron uses the --accent token.
 */
export function Logo({ variant = "wordmark", className, title = "UPEDGE" }: Props) {
  const shape = LOGO[variant];
  return (
    <svg
      viewBox={shape.viewBox}
      role="img"
      aria-label={title}
      className={cn("h-auto", className)}
      style={{ aspectRatio: `${shape.width} / ${shape.height}` }}
    >
      {shape.paths.map((p, i) => (
        <path key={i} d={p.d} fill={p.accent ? "var(--accent)" : "currentColor"} />
      ))}
    </svg>
  );
}

/** Brand chevron (taken from the logo's accent path), used as a decorative pattern tile. */
export function chevronPath() {
  return LOGO.mark.paths.find((p) => p.accent)?.d ?? "";
}
