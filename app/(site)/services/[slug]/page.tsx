import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { CtaBanner } from "@/components/home/CtaBanner";
import { CloudImage } from "@/components/media/CloudImage";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Rise } from "@/components/ui/Rise";
import { getService, services } from "@/data/services";
import { cta, site } from "@/data/site";
import { getAllProjects } from "@/lib/projects";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({ title: s.title, description: s.short, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const all = await getAllProjects();
  const related = all.filter((p) => p.category === service.relatedCategory || p.services?.includes(service.slug)).slice(0, 2);

  return (
    <>
      <PageHero title={service.title} lead={service.intro} />

      <section className="container-x pb-20 sm:pb-28">
        <Rise>
          <div className="bezel">
            <div className="relative aspect-[16/9] overflow-hidden rounded-inner sm:aspect-[21/9]">
              <CloudImage media={service.image} sizes="(min-width: 1400px) 1300px, 100vw" priority />
            </div>
          </div>
        </Rise>
      </section>

      {/* What is included */}
      <section className="container-x grid gap-12 pb-24 sm:pb-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <ServiceIcon name={service.icon} className="text-accent-deep" />
          <h2 className="display-3 mt-6">What is included</h2>
        </Reveal>
        <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:col-span-8">
          {service.included.map((item, i) => (
            <Reveal as="li" key={item} delay={(i % 2) * 0.06} className="flex gap-4">
              <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-accent text-accent-ink" aria-hidden="true">
                <Check size={14} weight="bold" />
              </span>
              <span>{item}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Process */}
      <section className="section-y border-t border-line">
        <div className="container-x">
          <Reveal>
            <h2 className="display-2 text-balance">How it works</h2>
          </Reveal>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} className="border-t border-line-strong pt-6">
                <h3 className="display-3 text-[1.375rem]!">{p.title}</h3>
                <p className="mt-3 text-ink-2">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="section-y border-t border-line">
          <div className="container-x">
            <Reveal>
              <h2 className="display-2 text-balance">Related projects</h2>
            </Reveal>
            <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
              {related.map((p) => (
                <Reveal as="li" key={p.slug}>
                  <ProjectCard project={p} aspect="aspect-[4/3]" sizes="(min-width: 768px) 46vw, 100vw" />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section-y border-t border-line">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="display-3">Questions we hear often</h2>
            <div className="mt-8">
              <Button href="/contact">{cta.quote}</Button>
            </div>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion items={service.faqs} />
          </div>
        </div>
      </section>

      <CtaBanner />

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.intro,
            url: absoluteUrl(`/services/${service.slug}`),
            provider: { "@type": "Organization", name: site.name, url: site.url },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: service.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />
    </>
  );
}
