import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/data/site";

/** Credibility strip: four numbers separated by hairlines, no card boxes. */
export function Stats() {
  return (
    <section aria-label="UPEDGE at a glance" className="border-b border-line">
      <dl className="container-x grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.08}
            className="flex flex-col border-line px-0 py-10 sm:py-14 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0 [&:nth-child(even)]:pl-6 md:[&:nth-child(even)]:pl-8"
          >
            <dd className="display-2 tabular order-first">
              <Counter value={s.value} suffix={s.suffix} plain={s.plain} />
            </dd>
            <dt className="mt-2 text-sm text-muted">{s.label}</dt>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
