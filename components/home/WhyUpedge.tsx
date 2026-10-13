import { CalendarCheck, CheckCircle, Compass, Key, Receipt, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { ChevronPattern } from "@/components/media/ChevronPattern";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { differentiators } from "@/data/site";

const icons = { shield: ShieldCheck, receipt: Receipt, compass: Compass, check: CheckCircle, calendar: CalendarCheck, key: Key };

// Six cells, six items: 5+4+3 over 3+4+5 columns, each with its own surface.
const cells = [
  { span: "lg:col-span-5", tone: "bg-inverse text-on-inverse", muted: "text-on-inverse-muted", icon: "text-accent" },
  { span: "lg:col-span-4", tone: "bg-surface text-ink shadow-[inset_0_0_0_1px_var(--line)]", muted: "text-muted", icon: "text-accent-deep" },
  { span: "lg:col-span-3", tone: "bg-accent text-accent-ink", muted: "text-accent-ink/80", icon: "text-accent-ink" },
  { span: "lg:col-span-3", tone: "bg-surface-2 text-ink", muted: "text-muted", icon: "text-accent-deep" },
  { span: "lg:col-span-4", tone: "bg-accent-tint text-ink", muted: "text-ink-2", icon: "text-accent-deep" },
  { span: "lg:col-span-5", tone: "bg-surface text-ink shadow-[inset_0_0_0_1px_var(--line)]", muted: "text-muted", icon: "text-accent-deep" },
];

export function WhyUpedge() {
  return (
    <section className="section-y border-t border-line">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow w-fit rounded-full bg-ink/5 px-3.5 py-2">Why UPEDGE</p>
          <h2 className="display-2 mt-8 text-balance">Fewer surprises, by design.</h2>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {differentiators.map((d, i) => {
            const Icon = icons[d.icon];
            const c = cells[i];
            return (
              <Reveal as="li" key={d.title} delay={(i % 3) * 0.08} className={cn("md:col-span-1", c.span)}>
                <div className={cn("relative flex h-full min-h-[18rem] flex-col justify-between overflow-hidden rounded-card p-7 sm:p-8", c.tone)}>
                  {i === 4 && <ChevronPattern className="text-accent-deep opacity-[0.16]" />}
                  <Icon size={36} weight="light" className={cn("relative", c.icon)} aria-hidden="true" />
                  <div className="relative mt-12">
                    <h3 className="text-xl font-medium leading-snug tracking-tight sm:text-[1.375rem]">{d.title}</h3>
                    <p className={cn("mt-3 max-w-[40ch] text-[0.9375rem]", c.muted)}>{d.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
