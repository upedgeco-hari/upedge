import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { serviceAreas } from "@/data/site";

const places = [...serviceAreas.tamilNadu, ...serviceAreas.elsewhere];
// Row two starts a few places further along, so the bands never sit in lockstep.
const placesShifted = [...places.slice(5), ...places.slice(0, 5)];

function Track({ items, dir, duration }: { items: string[]; dir: "left" | "right"; duration: string }) {
  // Duplicated so the strip can loop seamlessly at -50%.
  const loop = [...items, ...items];
  return (
    <div className="marquee-track" data-dir={dir} style={{ "--marquee-duration": duration } as CSSProperties}>
      {loop.map((p, i) => (
        <span key={`${p}-${i}`} className="flex items-center leading-none">
          <span
            className={cn("place-word select-none px-2.5 py-1 text-3xl font-medium tracking-tight sm:px-4 sm:py-2 sm:text-6xl lg:text-7xl")}
            data-active={p === "Madurai"}
          >
            {p}
          </span>
          <span className="text-xl text-muted sm:text-4xl lg:text-5xl" aria-hidden="true">
            .
          </span>
        </span>
      ))}
    </div>
  );
}

/** Where UPEDGE has built: a two-band marquee of districts across Tamil Nadu, plus Bangalore and Kerala. */
export function ServiceAreas() {
  return (
    <section className="section-y overflow-hidden border-t border-line">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <h2 className="display-2 text-balance">Built across Tamil Nadu, and beyond.</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-6">
          <p className="lead">
            We have completed projects in {serviceAreas.tamilNadu.length} districts of Tamil Nadu, and in Bangalore and Kerala.
          </p>
        </Reveal>
      </div>

      <Reveal
        delay={0.15}
        className="mt-10 space-y-1 mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] sm:mt-16 sm:space-y-4"
      >
        <div className="marquee-row" aria-hidden="true">
          <Track items={places} dir="left" duration="50s" />
        </div>
        <div className="marquee-row" aria-hidden="true">
          <Track items={placesShifted} dir="right" duration="50s" />
        </div>
      </Reveal>

      {/* Real list for assistive tech; the marquee above is decorative and duplicated. */}
      <ul className="sr-only">
        {places.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </section>
  );
}
