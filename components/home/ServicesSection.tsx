import { ServicesList } from "@/components/home/ServicesList";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section className="section-y border-t border-line">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <h2 className="display-2 text-balance">Everything a build needs, under one roof.</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-6">
          <p className="lead">Six services that cover the whole journey, from the first drawing to the final coat of paint.</p>
        </Reveal>
        <Reveal delay={0.15} className="mt-16">
          <ServicesList services={services} />
        </Reveal>
        <Reveal className="mt-12">
          <Button href="/services" variant="outline">
            All Services
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
