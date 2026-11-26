import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteWork } from "@/data/site";

/** A strip of real site work: the stages behind a finished building. */
export function SiteWork() {
  if (!siteWork.length) return null;

  return (
    <section className="section-y edge-top">
      <div className="container-x">
        <SectionHeader eyebrow="From our sites" title="The work behind the finish." lead="Moments from UPEDGE sites, from marking out the plot to fitting the doors." />
        <ul className="block-gap grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {siteWork.map((w, i) => (
            <Reveal as="li" key={w.image} delay={(i % 3) * 0.08}>
              <figure>
                <div className="relative aspect-[3/4] overflow-hidden rounded-inner">
                  <Image src={`/images/sites/${w.image}.jpg`} alt={`${w.label} on a UPEDGE site`} fill sizes="(min-width: 1024px) 16vw, (min-width: 768px) 31vw, 48vw" className="object-cover" />
                </div>
                <figcaption className="mt-3 text-sm text-muted">{w.label}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
