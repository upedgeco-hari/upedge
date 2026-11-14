import { ChevronPattern } from "@/components/media/ChevronPattern";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { cta } from "@/data/site";

type Props = {
  title?: string;
  text?: string;
  /** Quote link, so a service or project page can carry its own context (lib/enquiry.ts). */
  href?: string;
};

/** Closing call to action on the brand accent. Ink on accent passes AA (9.9:1). */
export function CtaBanner({
  title = "Planning to build? Tell us about your site.",
  text = "Share a few details and we will come back with a clear next step, usually within one working day.",
  href = "/contact",
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-accent text-accent-ink">
      <ChevronPattern className="text-accent-ink opacity-[0.13]" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="glow drift -top-[30%] left-[8%] size-[70vh] text-white opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_110%_at_20%_0%,transparent_45%,rgb(21_19_15/0.22))]" />
      </div>
      <div className="container-x relative py-24 sm:py-32 lg:py-40">
        <Reveal className="max-w-4xl">
          <h2 className="display-1 text-balance">{title}</h2>
        </Reveal>
        <Reveal delay={0.1} className="measure-sm mt-6">
          <p className="text-lg text-accent-ink/85">{text}</p>
        </Reveal>
        <Reveal delay={0.2} className="cta-gap">
          <Magnetic className="inline-block">
            <Button href={href} variant="dark">
              {cta.quote}
            </Button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
