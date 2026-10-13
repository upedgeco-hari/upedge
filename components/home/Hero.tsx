import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Rise } from "@/components/ui/Rise";
import { cta } from "@/data/site";

/** Full-bleed hero. Headline, one line of support, two CTAs, and a portrait on wide screens. */
export function Hero() {
  return (
    <section className="relative isolate flex flex-col overflow-hidden bg-inverse text-on-inverse lg:min-h-dvh lg:items-end" data-inverse>
      <div className="container-x relative z-10 order-3 pt-8 lg:order-none lg:pt-40">
        <p className="hidden text-sm font-medium uppercase tracking-[0.2em] text-on-inverse/70 lg:mb-4 lg:block">
          Hariharan
        </p>
        <Rise className="max-w-6xl lg:max-w-md xl:max-w-xl">
          <h1 className="display-1 text-balance">A Pinnacle Of Premium Construction.</h1>
        </Rise>
      </div>

      {/* Name: large outline display type above the portrait, mobile only. */}
      <div className="container-x relative z-10 order-1 mt-24 text-center lg:hidden">
        <p className="text-6xl font-extrabold leading-[0.95] tracking-tight text-transparent [-webkit-text-stroke:1.5px_var(--color-on-inverse)]">
          Hariharan
        </p>
      </div>
      <br />  
      

      {/* Portrait: top of the stack below lg, positioned cutout beside the headline from lg up. */}
      <div className="relative z-10 order-2 mx-auto mt-8 aspect-4/5 w-[85%] max-w-80 overflow-hidden rounded-4xl lg:absolute lg:inset-y-0 lg:right-[2%] lg:order-0 lg:mx-0 lg:mt-0 lg:aspect-auto lg:w-[38%] lg:max-w-none lg:rounded-none xl:right-[3%] xl:w-[36%]">
        <Image
          src="/images/hero-portrait.png"
          alt="Hariharan"
          fill
          quality={100}
          sizes="(min-width: 1280px) 34vw, (min-width: 1024px) 36vw, 340px"
          className="object-cover"
        />
      </div>

      <div className="container-x relative z-10 order-4 pb-10 pt-6 sm:pb-20 lg:order-none lg:pb-14 lg:pt-0">
        <Rise delay={0.3} className="flex flex-wrap items-center gap-3">
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
