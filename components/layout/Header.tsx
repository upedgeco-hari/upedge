"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { setScrollLocked } from "@/lib/scroll-lock";
import { cta, nav } from "@/data/site";

/** Routes that open on a dark, full-bleed photo, so the header starts with light text. */
const overImage = (path: string) => path === "/" || /^\/projects\/[^/]+$/.test(path);

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const open = menuFor === pathname; // menu closes automatically on navigation

  // Reading progress. Spring-smoothed so the line glides instead of tracking every
  // wheel tick, which is what makes a progress indicator look cheap.
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.3 });

  // Discrete state only: flips once when the threshold is crossed.
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuFor(null);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    document.documentElement.dataset.menuOpen = "true";
    setScrollLocked(true);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      delete document.documentElement.dataset.menuOpen;
      setScrollLocked(false);
    };
  }, [open]);

  const light = (overImage(pathname) && !scrolled) || open;

  return (
    <header className={cn("fixed inset-x-0 top-0", open ? "z-[var(--z-overlay)]" : "z-[var(--z-header)]")}>
      <motion.div
        className="absolute inset-x-0 top-0 h-px origin-left bg-accent"
        style={{ scaleX: reduce ? 0 : progress }}
        aria-hidden="true"
      />

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 top-0 flex h-[100dvh] flex-col justify-between overflow-y-auto overscroll-contain bg-inverse/92 px-[var(--gutter)] pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-28 text-on-inverse backdrop-blur-3xl lg:hidden"
            data-inverse
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            <nav aria-label="Mobile">
              <ul>
                {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={reduce ? false : { y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, delay: 0.06 + i * 0.055, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* items-center, not items-baseline: sharing a baseline with a
                          36px label drops a 12px number to the bottom of the word and
                          reads as a slip. Centred, the digits sit on the label's cap
                          centre, which is where the eye expects an index. */}
                      <Link href={item.href} className="group flex items-center gap-1 py-2">
                        <span className="index-num w-5 shrink-0 text-accent/80">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-4xl font-medium tracking-tight sm:text-5xl">{item.label}</span>
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
            "mx-auto flex h-14 max-w-[var(--container)] items-center justify-between rounded-full pl-6 pr-1.5",
            "transition-[background-color,box-shadow,color,backdrop-filter] duration-[var(--dur-3)] ease-smooth",
            light ? "text-on-inverse" : "text-ink",
            scrolled && !open ? "glass" : "bg-transparent",
          )}
        >
          <Link href="/" aria-label="UPEDGE home" className="relative z-10 shrink-0">
            <Logo variant="wordmark" className="w-[6.75rem] sm:w-[7.5rem]" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {nav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative block rounded-full px-4 py-2.5 text-[0.9375rem]",
                        "transition-[opacity,background-color] duration-[var(--dur-2)] ease-smooth",
                        active ? "font-medium" : "opacity-75 hover:bg-current/8 hover:opacity-100",
                      )}
                    >
                      {item.label}
                    </Link>
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent"
                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                        aria-hidden="true"
                      />
                    )}
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
              className="relative z-10 grid size-11 place-items-center rounded-full transition-colors duration-[var(--dur-2)] hover:bg-current/8 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setMenuFor(open ? null : pathname)}
            >
              <span
                className={cn(
                  "absolute h-px w-5 bg-current transition-transform duration-[var(--dur-3)] ease-spring",
                  open ? "rotate-45" : "-translate-y-[3px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-5 bg-current transition-transform duration-[var(--dur-3)] ease-spring",
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
