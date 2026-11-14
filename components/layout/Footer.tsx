import Link from "next/link";
import { EnvelopeSimple, FacebookLogo, InstagramLogo, LinkedinLogo, MapPin, Phone, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { site, nav, hasNumber, digits } from "@/data/site";
import { services } from "@/data/services";

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const socialIcons: Record<string, Icon> = {
  Instagram: InstagramLogo,
  LinkedIn: LinkedinLogo,
  Facebook: FacebookLogo,
  YouTube: YoutubeLogo,
};

/** One contact row: icon in a ring, then the value. The label is kept for screen readers. */
function ContactLine({ icon: IconEl, label, value, href, external }: { icon: Icon; label: string; value: string; href?: string; external?: boolean }) {
  const content = href ? (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="link-line">
      {value}
    </a>
  ) : (
    value
  );
  return (
    <li className="flex items-start gap-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-on-inverse/10 text-accent" aria-hidden="true">
        <IconEl size={18} weight="light" />
      </span>
      <span className="pt-[0.4375rem]">
        <span className="sr-only">{label}: </span>
        {content}
      </span>
    </li>
  );
}

export function Footer() {
  const socials = site.socials.filter((s) => s.href);
  return (
    <footer className="relative isolate overflow-hidden bg-inverse text-on-inverse" data-inverse>
      <div className="glow pointer-events-none -top-[40%] left-1/2 -z-10 size-[70vh] -translate-x-1/2 text-accent opacity-[0.07]" aria-hidden="true" />
      <div className="container-x pb-10 pt-20 sm:pt-28">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <Reveal>
            <Logo variant="full" className="w-60 sm:w-72" />
            <p className="measure-sm mt-8 text-on-inverse-muted">{site.description}</p>
          </Reveal>

          <Reveal as="nav" delay={0.08} aria-label="Footer: explore">
            <h2 className="text-sm text-on-inverse-muted">Explore</h2>
            <ul className="mt-5 space-y-4 lg:space-y-3">
              {[{ label: "Home", href: "/" }, ...nav].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-line text-on-inverse-muted transition-colors duration-[var(--dur-2)] hover:text-on-inverse">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="nav" delay={0.16} aria-label="Footer: services">
            <h2 className="text-sm text-on-inverse-muted">Services</h2>
            <ul className="mt-5 space-y-4 lg:space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="link-line text-on-inverse-muted transition-colors duration-[var(--dur-2)] hover:text-on-inverse">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.24}>
            <h2 className="text-sm text-on-inverse-muted">Contact</h2>
            <ul className="mt-5 space-y-4">
              <ContactLine icon={Phone} label="Phone" value={site.phone} href={hasNumber(site.phone) ? `tel:+${digits(site.phone)}` : undefined} />
              <ContactLine icon={EnvelopeSimple} label="Email" value={site.email} href={site.email.includes("@") ? `mailto:${site.email}` : undefined} />
              <ContactLine icon={MapPin} label="Office" value={site.address} />
              {socials.map((s) => (
                <ContactLine key={s.label} icon={socialIcons[s.label]} label={s.label} value={s.handle || s.label} href={s.href} external />
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line-inverse pt-8 text-sm text-on-inverse-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-6 pr-16">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-line transition-colors duration-[var(--dur-2)] hover:text-on-inverse">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
