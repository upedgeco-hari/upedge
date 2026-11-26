import Image from "next/image";
import { ChevronPattern } from "@/components/media/ChevronPattern";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Rise } from "@/components/ui/Rise";
import { cta, site } from "@/data/site";

/** Full-bleed hero. Headline, one line of support, two CTAs, and a portrait on wide screens. */
export function Hero() {
  return (
    <section
      className="relative isolate flex flex-col overflow-hidden bg-inverse text-on-inverse lg:min-h-dvh lg:items-end"
      data-inverse
    >
      {/*
       * Depth, so the block is a lit room rather than a flat swatch: warm light pools, the
       * brand chevron at a whisper, and a vignette that pulls the corners down. Negative
       * z-index paints above the section background but under all the content.
       *
       * The two light rigs are separate because the layout is, not because of styling
       * convenience. From lg up the section is the full viewport and the cutout stands on
       * the right, so vh sizing and a top-right origin line up. On a phone the section is
       * only as tall as its content and the portrait sits in the middle of a vertical
       * stack, so the same values put the light above everything and leave the portrait
       * flat. Sizing in vw and anchoring to the portrait fixes that.
       */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="lg:hidden">
          <div className="glow drift left-1/2 top-[4%] size-[112vw] -translate-x-1/2 text-accent opacity-[0.2]" />
          <div className="glow -right-[28vw] bottom-[6%] size-[72vw] text-accent opacity-[0.1]" />
        </div>
        <div className="hidden lg:block">
          <div className="glow drift -top-[18%] -right-[14%] size-[62vh] text-accent opacity-[0.22]" />
          <div className="glow -bottom-[18%] -left-[12%] size-[48vh] text-accent opacity-[0.09]" />
        </div>
        <ChevronPattern className="text-on-inverse opacity-[0.035]" />
        {/* Vignette follows the light: centred over the portrait on a phone, over the
            cutout from lg up, and gentler on the phone so it does not wash the glow out. */}
        <div className="absolute inset-0 bg-[radial-gradient(115%_75%_at_50%_14%,transparent_44%,rgb(0_0_0/0.5))] lg:bg-[radial-gradient(130%_100%_at_72%_8%,transparent_38%,rgb(0_0_0/0.62))]" />
      </div>

      <div className="container-x relative z-10 order-1 pt-24 short:pt-20 lg:order-0 lg:pt-40">
        <Rise className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex items-center gap-3">
            <span className="h-px w-9 bg-accent" aria-hidden="true" />
            <span className="eyebrow text-on-inverse">Hariharan</span>
          </span>
          <span className="eyebrow text-on-inverse-muted">
            Construction company in {site.city}
          </span>
        </Rise>
      </div>

      {/* Portrait: contained card below lg (sized by screen height, so the buttons stay in view),
          positioned cutout beside the headline from lg up and on a sideways phone. */}
      <div className="relative z-10 order-2 mx-auto mt-6 aspect-[2/3] w-[min(70%,27dvh)] max-w-64 overflow-hidden rounded-card sm:max-w-xs md:max-w-sm lg:absolute lg:inset-y-0 lg:right-[max(2%,calc((100%-var(--container))/2))] lg:order-0 lg:mx-0 lg:mt-0 lg:mb-0 lg:aspect-auto lg:w-[38%] lg:max-w-none lg:rounded-none xl:w-[36%] xl:max-w-[44rem] short:absolute short:inset-y-0 short:right-[6%] short:mx-0 short:mt-0 short:aspect-auto short:w-[32%] short:max-w-none short:rounded-none">
        <Image
          src="/images/hero-portrait.webp"
          alt="Hariharan"
          fill
          priority
          quality={85}
          sizes="(min-width: 1280px) 36vw, (min-width: 1024px) 38vw, (min-width: 768px) 384px, 320px"
          className="object-contain object-bottom"
        />
      </div>

      {/* Grounds the cutout on wide screens, where it stands on the floor of the section. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden h-44 bg-gradient-to-t from-inverse via-inverse/55 to-transparent lg:block"
        aria-hidden="true"
      />

      <div className="container-x relative z-10 order-3 mt-4 pb-10 short:mt-3 short:pb-6 short:pr-[40%] lg:order-0 lg:mt-0 lg:pb-14">
        {/* No entrance delay on the headline: it is the LCP element. */}
        <Rise className="max-w-6xl lg:max-w-md xl:max-w-xl">
          <h1 className="display-1 text-balance short:text-[2.25rem]!">A Pinnacle Of Premium Construction.</h1>
        </Rise>
        <Rise delay={0.3} className="mt-6 flex flex-wrap items-center gap-3 short:mt-5 sm:mt-10 lg:mt-16">
          <Magnetic>
            <Button href="/contact">{cta.quote}</Button>
          </Magnetic>
          <Button href="/projects" variant="outline-inverse" arrow={false}>
            {cta.projects}
          </Button>
        </Rise>
      </div>
    </section>
  );
}
