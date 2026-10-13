import { ChevronPattern } from "@/components/media/ChevronPattern";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { cta } from "@/data/site";

type Props = {
  title?: string;
  text?: string;
};

/** Closing call to action on the brand accent. Ink on accent passes AA (9.9:1). */
export function CtaBanner({
  title = "Planning to build? Tell us about your site.",
  text = "Share a few details and we will come back with a clear next step, usually within one working day.",
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-accent text-accent-ink">
      <ChevronPattern className="text-accent-ink opacity-[0.13]" />
      <div className="container-x relative py-24 sm:py-32 lg:py-40">
        <Reveal className="max-w-4xl">
          <h2 className="display-1 text-balance">{title}</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-6 max-w-[48ch]">
          <p className="text-lg text-accent-ink/85">{text}</p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          <Magnetic className="inline-block">
            <Button href="/contact" variant="dark">
              {cta.quote}
            </Button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
