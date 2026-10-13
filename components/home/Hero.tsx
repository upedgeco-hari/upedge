import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Rise } from "@/components/ui/Rise";
import { cta } from "@/data/site";

/** Full-bleed hero. Headline, one line of support, two CTAs, and a portrait on wide screens. */
export function Hero() {
  return (
    <section className="relative isolate flex flex-col overflow-hidden bg-inverse text-on-inverse lg:min-h-dvh lg:items-end" data-inverse>
      <div className="container-x relative z-10 order-1 pt-24 lg:order-0 lg:pt-40">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-on-inverse/70">
          Hariharan
        </p>
      </div>

      {/* Portrait: contained card below lg, positioned cutout beside the headline from lg up. */}
      <div className="relative z-10 order-2 mx-auto mt-6 aspect-4/5 w-[70%] max-w-64 overflow-hidden rounded-4xl lg:absolute lg:inset-y-0 lg:right-[2%] lg:order-0 lg:mx-0 lg:mt-0 lg:mb-0 lg:aspect-auto lg:w-[38%] lg:max-w-none lg:rounded-none xl:right-[3%] xl:w-[36%]">
        <Image
          src="/images/hero-portrait.png"
          alt="Hariharan"
          fill
          quality={100}
          sizes="(min-width: 1280px) 34vw, (min-width: 1024px) 36vw, 340px"
          className="object-cover object-top"
        />
      </div>

      <div className="container-x relative z-10 order-3 mt-4 pb-10 lg:order-0 lg:mt-0 lg:pb-14">
        <Rise className="max-w-6xl lg:max-w-md xl:max-w-xl">
          <h1 className="display-1 text-balance">A Pinnacle Of Premium Construction.</h1>
        </Rise>
        <Rise delay={0.3} className="mt-10 flex flex-wrap items-center gap-3 lg:mt-16">
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
