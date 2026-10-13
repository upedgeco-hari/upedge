/** Tiny className joiner (falsy values are dropped). */
export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}
