import { CalendarCheck, CheckCircle, Compass, Key, Receipt, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { ChevronPattern } from "@/components/media/ChevronPattern";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import { differentiators } from "@/data/site";

const icons = { shield: ShieldCheck, receipt: Receipt, compass: Compass, check: CheckCircle, calendar: CalendarCheck, key: Key };

// Six cells, six items: 5+4+3 over 3+4+5 columns, each with its own surface.
const cells = [
  { span: "xl:col-span-5", tone: "bg-inverse text-on-inverse shadow-elev-3", muted: "text-on-inverse-muted", icon: "text-accent" },
  { span: "xl:col-span-4", tone: "bg-surface text-ink shadow-[inset_0_0_0_1px_var(--line)]", muted: "text-muted", icon: "text-accent-deep" },
  { span: "xl:col-span-3", tone: "bg-accent text-accent-ink shadow-accent", muted: "text-accent-ink/80", icon: "text-accent-ink" },
  { span: "xl:col-span-3", tone: "bg-surface-2 text-ink shadow-elev-1", muted: "text-muted", icon: "text-accent-deep" },
  { span: "xl:col-span-4", tone: "bg-accent-tint text-ink shadow-elev-1", muted: "text-ink-2", icon: "text-accent-deep" },
  { span: "xl:col-span-5", tone: "bg-surface text-ink shadow-[inset_0_0_0_1px_var(--line)]", muted: "text-muted", icon: "text-accent-deep" },
];

export function WhyUpedge() {
  return (
    <section className="section-y edge-top">
      <div className="container-x">
        <SectionHeader eyebrow="Why UPEDGE" title="Fewer surprises, by design." />

        <ul className="block-gap grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
          {differentiators.map((d, i) => {
            const Icon = icons[d.icon];
            const c = cells[i];
            return (
              <Reveal as="li" key={d.title} delay={(i % 3) * 0.08} className={cn("md:col-span-1", c.span)}>
                <div className={cn("lift relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-card p-7 sm:p-8", c.tone)}>
                  {i === 4 && <ChevronPattern className="text-accent-deep opacity-[0.16]" />}
                  <Icon size={36} weight="light" className={cn("relative", c.icon)} aria-hidden="true" />
                  <div className="relative mt-12">
                    <h3 className="text-xl font-medium leading-snug tracking-tight sm:text-[1.375rem]">{d.title}</h3>
                    <p className={cn("measure-sm mt-3 text-[0.9375rem]", c.muted)}>{d.text}</p>
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
