import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "outline" | "outline-inverse";

const variants: Record<Variant, { shell: string; dot: string }> = {
  // Accent fill + near-black text: 9.9:1 contrast.
  primary: {
    shell: "bg-accent text-accent-ink hover:bg-accent-hover",
    dot: "bg-accent-ink/10",
  },
  dark: {
    shell: "bg-ink text-paper hover:bg-ink-2",
    dot: "bg-paper/15",
  },
  outline: {
    shell: "text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] hover:bg-ink hover:text-paper hover:shadow-[inset_0_0_0_1px_var(--ink)]",
    dot: "bg-ink/8 group-hover:bg-paper/15",
  },
  "outline-inverse": {
    shell: "text-on-inverse shadow-[inset_0_0_0_1px_var(--line-inverse)] hover:bg-on-inverse hover:text-inverse",
    dot: "bg-on-inverse/12 group-hover:bg-inverse/10",
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
 * disc flush with the right padding and nudges diagonally on hover.
 */
export function Button({ children, href, variant = "primary", arrow = true, size = "md", className, ...rest }: Props) {
  const v = variants[variant];
  const classes = cn(
    "group inline-flex items-center whitespace-nowrap rounded-full font-medium",
    size === "sm" ? "gap-2.5 text-sm" : "gap-3 text-[0.9375rem]",
    arrow ? (size === "sm" ? "py-1.5 pl-5 pr-1.5" : "py-2 pl-6 pr-2") : size === "sm" ? "px-5 py-2.5" : "px-6 py-3.5",
    "transition-[background-color,color,box-shadow,transform] duration-500 ease-smooth active:scale-[0.98]",
    "disabled:cursor-not-allowed disabled:opacity-60",
    v.shell,
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          className={cn(
            "grid place-items-center rounded-full transition-colors duration-500 ease-smooth",
            size === "sm" ? "size-8" : "size-10",
            v.dot,
          )}
          aria-hidden="true"
        >
          <ArrowUpRight
            size={size === "sm" ? 16 : 18}
            weight="light"
            className="transition-transform duration-500 ease-smooth group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105"
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
