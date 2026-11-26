import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { familyMoments } from "@/data/site";

/** Bhoomi poojas and housewarmings: the days a project starts and the days it is handed over. */
export function HappyFamilies() {
  if (!familyMoments.length) return null;

  return (
    <section className="section-y edge-top">
      <div className="container-x">
        <SectionHeader eyebrow="Moments" title="Our happy families." lead="From the first pooja on an empty plot to the day the family steps in." />
        <ul className="block-gap grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {familyMoments.map((m, i) => (
            <Reveal as="li" key={m.image} delay={(i % 4) * 0.08}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-inner">
                  <Image
                    src={`/images/families/${m.image}.jpg`}
                    alt={m.place ? `${m.event} at ${m.place}` : `${m.event} with a UPEDGE family`}
                    fill
                    sizes="(min-width: 1024px) 24vw, 48vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm">
                  <span className="font-medium">{m.event}</span>
                  {m.place && <span className="block text-muted">{m.place}</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
