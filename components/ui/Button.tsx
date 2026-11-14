import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "outline" | "outline-inverse";

const variants: Record<Variant, { shell: string; dot: string; sheen: boolean }> = {
  // Accent fill + near-black text: 9.9:1 contrast. The shadow carries the accent hue,
  // so the pill reads as lit rather than stuck on with generic black blur.
  primary: {
    shell: "bg-accent text-accent-ink shadow-accent hover:bg-accent-hover hover:shadow-accent-lift",
    dot: "bg-accent-ink/10",
    sheen: true,
  },
  dark: {
    shell: "bg-ink text-paper shadow-elev-3 hover:bg-ink-2 hover:shadow-elev-4",
    dot: "bg-paper/15",
    sheen: true,
  },
  outline: {
    shell:
      "text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] hover:bg-ink hover:text-paper hover:shadow-[inset_0_0_0_1px_var(--ink),var(--elev-3)]",
    dot: "bg-ink/8 group-hover:bg-paper/15",
    sheen: false,
  },
  "outline-inverse": {
    shell:
      "text-on-inverse shadow-[inset_0_0_0_1px_var(--line-inverse-strong)] hover:bg-on-inverse hover:text-inverse",
    dot: "bg-on-inverse/12 group-hover:bg-inverse/10",
    sheen: false,
  },
};

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  /** Show the nested arrow disc (button-in-button). */
  arrow?: boolean;
  size?: "md" | "sm";
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

/**
 * Pill button. Labels stay on one line (whitespace-nowrap); the arrow sits in its own
 * disc flush with the right padding and nudges diagonally on hover. Filled variants lift
 * a hair off the page and catch a slow highlight sweep, which is the whole hover state:
 * no colour flashing, nothing that moves the surrounding layout.
 */
export function Button({ children, href, variant = "primary", arrow = true, size = "md", className, ...rest }: Props) {
  const v = variants[variant];
  const classes = cn(
    "group relative isolate inline-flex items-center overflow-hidden whitespace-nowrap rounded-full font-medium",
    size === "sm" ? "gap-2.5 text-sm" : "gap-3 text-[0.9375rem]",
    arrow ? (size === "sm" ? "py-1.5 pl-5 pr-1.5" : "py-2 pl-6 pr-2") : size === "sm" ? "px-5 py-2.5" : "px-6 py-3.5",
    "transition-[background-color,color,box-shadow,transform] duration-[var(--dur-3)] ease-smooth",
    "hover:-translate-y-px active:translate-y-0 active:scale-[0.985]",
    "disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none",
    v.shell,
    className,
  );
  const inner = (
    <>
      {v.sheen && (
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_35%,rgb(255_255_255/0.22)_50%,transparent_65%)] transition-transform duration-1100 ease-smooth group-hover:translate-x-full"
          aria-hidden="true"
        />
      )}
      <span className="relative">{children}</span>
      {arrow && (
        <span
          className={cn(
            "relative grid place-items-center rounded-full transition-colors duration-[var(--dur-3)] ease-smooth",
            size === "sm" ? "size-8" : "size-10",
            v.dot,
          )}
          aria-hidden="true"
        >
          <ArrowUpRight
            size={size === "sm" ? 16 : 18}
            weight="light"
            className="transition-transform duration-[var(--dur-3)] ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105"
          />
        </span>
      )}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {inner}
    </button>
  );
}
