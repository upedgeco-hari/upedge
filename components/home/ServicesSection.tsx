import { ServicesList } from "@/components/home/ServicesList";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section className="section-y edge-top">
      <div className="container-x">
        <SectionHeader
          eyebrow="Services"
          title="Everything a build needs, under one roof."
          lead="Six services that cover the whole journey, from the first drawing to the final coat of paint."
        />
        <Reveal delay={0.15} className="block-gap">
          <ServicesList services={services} />
        </Reveal>
        <Reveal className="cta-gap">
          <Button href="/services" variant="outline">
            All Services
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
