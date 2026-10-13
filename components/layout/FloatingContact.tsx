import { ChatCircleText, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { CSSProperties } from "react";
import { digits, hasNumber, site } from "@/data/site";

const btn =
  "grid size-12 place-items-center rounded-full shadow-[0_10px_30px_-10px_rgb(13_13_13/0.45)] transition-transform duration-500 ease-smooth hover:scale-105 active:scale-95";

/** Floating WhatsApp and call buttons. Fall back to the contact page until real numbers are set. */
export function FloatingContact() {
  const wa = hasNumber(site.whatsapp) ? `https://wa.me/${digits(site.whatsapp)}` : null;
  const tel = hasNumber(site.phone) ? `tel:+${digits(site.phone)}` : null;

  return (
    <div
      className="rise fixed bottom-5 right-4 z-[var(--z-floating)] flex flex-col gap-3 sm:right-6"
      style={{ "--d": "1.2s" } as CSSProperties}
    >
      {tel ? (
        <a href={tel} aria-label="Call UPEDGE" className={`${btn} bg-ink text-paper`}>
          <Phone size={22} weight="light" />
        </a>
      ) : null}
      {wa ? (
        <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className={`${btn} bg-accent text-accent-ink`}>
          <WhatsappLogo size={24} weight="light" />
        </a>
      ) : (
        <Link href="/contact" aria-label="Contact UPEDGE" className={`${btn} bg-accent text-accent-ink`}>
          <ChatCircleText size={24} weight="light" />
        </Link>
      )}
    </div>
  );
}
