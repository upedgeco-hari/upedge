"use client";

import { ChatCircleText, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useState, type CSSProperties } from "react";
import { digits, hasNumber, site } from "@/data/site";
import { cn } from "@/lib/cn";
import { pageEnquiry, quoteHref, whatsappText, whatsappUrl } from "@/lib/enquiry";

const btn =
  "grid size-11 sm:size-12 place-items-center rounded-full shadow-elev-4 transition-transform duration-[var(--dur-3)] ease-spring hover:-translate-y-0.5 hover:scale-105 active:scale-95";

/** Label that slides out of the button on hover. Never appears on touch, which has no hover. */
function Label({ children }: { children: string }) {
  return (
    <span
      className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-inverse px-3 py-1.5 text-xs text-on-inverse opacity-0 shadow-elev-3 transition-[opacity,transform] duration-[var(--dur-2)] ease-smooth group-hover:translate-x-0 group-hover:opacity-100 lg:block lg:translate-x-1"
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

/**
 * Floating WhatsApp and call buttons.
 *
 * The WhatsApp message is written before the chat opens, naming the service or project
 * the visitor is reading, so the conversation starts with a subject instead of "hi".
 * On phones they stay out of the way at the top of a page, where they would sit on the
 * headline, and slide in once the visitor scrolls.
 * Falls back to the contact page until real numbers are set.
 */
export function FloatingContact() {
  const pathname = usePathname();
  const context = pageEnquiry(pathname);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 240));
  const tel = hasNumber(site.phone) ? `tel:+${digits(site.phone)}` : null;
  const wa = hasNumber(site.whatsapp) ? whatsappUrl(whatsappText(context)) : null;

  return (
    <div
      className="floating-contact rise fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-3 z-[var(--z-floating)] sm:bottom-[max(1.25rem,env(safe-area-inset-bottom))] sm:right-6"
      style={{ "--d": "1.2s" } as CSSProperties}
    >
      <div
        className={cn(
          "flex flex-col gap-2.5 transition-[opacity,transform] duration-[var(--dur-3)] ease-smooth sm:gap-3",
          !scrolled && "max-sm:pointer-events-none max-sm:translate-y-3 max-sm:opacity-0 max-sm:focus-within:pointer-events-auto max-sm:focus-within:translate-y-0 max-sm:focus-within:opacity-100",
        )}
      >
        {tel ? (
          <a href={tel} aria-label="Call UPEDGE" className={`group relative ${btn} bg-ink text-paper`}>
            <Label>Call the office</Label>
            <Phone size={22} weight="light" />
          </a>
        ) : null}
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className={`group relative ${btn} bg-accent text-accent-ink`}
          >
            <Label>{context ? `Ask about ${context.about}` : "Chat on WhatsApp"}</Label>
            <WhatsappLogo size={24} weight="light" />
          </a>
        ) : (
          <Link href={quoteHref(context)} aria-label="Contact UPEDGE" className={`group relative ${btn} bg-accent text-accent-ink`}>
            <Label>{context ? `Enquire about ${context.about}` : "Get a quote"}</Label>
            <ChatCircleText size={24} weight="light" />
          </Link>
        )}
      </div>
    </div>
  );
}
