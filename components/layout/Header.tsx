"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { cta, nav } from "@/data/site";

/** Routes that open on a dark, full-bleed photo, so the header starts with light text. */
const overImage = (path: string) => path === "/" || /^\/projects\/[^/]+$/.test(path);

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const open = menuFor === pathname; // menu closes automatically on navigation

  // Discrete state only: flips once when the threshold is crossed.
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuFor(null);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const light = (overImage(pathname) && !scrolled) || open;

  return (
    <header className="fixed inset-x-0 top-0 z-[var(--z-header)]">
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 flex flex-col justify-between bg-inverse/92 px-[var(--gutter)] pb-10 pt-28 text-on-inverse backdrop-blur-3xl lg:hidden"
            data-inverse
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={reduce ? false : { y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        className="block py-2 text-4xl font-medium tracking-tight sm:text-5xl"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <Button href="/contact" className="self-start">
              {cta.quote}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-[var(--gutter)] pt-4">
        <div
          className={cn(
            "mx-auto flex h-14 max-w-[var(--container)] items-center justify-between rounded-full pl-6 pr-1.5 transition-[background-color,box-shadow,color,backdrop-filter] duration-700 ease-smooth",
            light ? "text-on-inverse" : "text-ink",
            scrolled && !open
              ? "bg-paper/80 shadow-[0_8px_32px_-12px_rgb(13_13_13/0.2),inset_0_0_0_1px_var(--line)] backdrop-blur-xl"
              : "bg-transparent",
          )}
        >
          <Link href="/" aria-label="UPEDGE home" className="relative z-10 shrink-0">
            <Logo variant="wordmark" className="w-[6.75rem] sm:w-[7.5rem]" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-full px-4 py-2 text-[0.9375rem] transition-opacity duration-300",
                        active ? "font-medium" : "opacity-80 hover:opacity-100",
                      )}
                    >
                      {item.label}
                      {active && (
                        <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent" aria-hidden="true" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <Button href="/contact" variant="primary" size="sm">
                {cta.quote}
              </Button>
            </div>
            <button
              type="button"
              className="relative z-10 grid size-10 place-items-center rounded-full lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setMenuFor(open ? null : pathname)}
            >
              <span
                className={cn(
                  "absolute h-px w-5 bg-current transition-transform duration-500 ease-smooth",
                  open ? "rotate-45" : "-translate-y-[3px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-5 bg-current transition-transform duration-500 ease-smooth",
                  open ? "-rotate-45" : "translate-y-[3px]",
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

