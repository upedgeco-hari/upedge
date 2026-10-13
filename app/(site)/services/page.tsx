import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { CtaBanner } from "@/components/home/CtaBanner";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { CloudImage } from "@/components/media/CloudImage";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description: "Residential and commercial construction, renovation, interiors, architectural planning and project management from UPEDGE.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services"
        lead="Design, approvals and construction under one accountable team. Choose a single service or the whole journey."
      />
      <section className="container-x pb-28 sm:pb-40">
        <ul className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 2) * 0.1}>
              <Link href={`/services/${s.slug}`} className="group block h-full rounded-card bg-surface p-3 shadow-[inset_0_0_0_1px_var(--line)] transition-colors duration-500 ease-smooth hover:bg-surface-2">
                <div className="relative aspect-[16/10] overflow-hidden rounded-inner">
                  <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]">
                    <CloudImage media={s.image} sizes="(min-width: 768px) 46vw, 100vw" />
                  </div>
                </div>
                <div className="flex items-start justify-between gap-6 p-5 sm:p-6">
                  <div>
                    <ServiceIcon name={s.icon} className="text-accent-deep" />
                    <h2 className="display-3 mt-5">{s.title}</h2>
                    <p className="mt-3 max-w-[44ch] text-muted">{s.short}</p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink/5 transition-colors duration-500 ease-smooth group-hover:bg-accent" aria-hidden="true">
                    <ArrowUpRight size={20} weight="light" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
      <CtaBanner />
    </>
  );
}
