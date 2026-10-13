import { AboutPreview } from "@/components/home/AboutPreview";
import { CtaBanner } from "@/components/home/CtaBanner";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { ServiceAreas } from "@/components/home/ServiceAreas";
import { ServicesSection } from "@/components/home/ServicesSection";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyUpedge } from "@/components/home/WhyUpedge";
import { testimonials } from "@/data/testimonials";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${site.name} | ${site.tagline}`,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutPreview />
      <ServicesSection />
      <FeaturedProjects />
      <WhyUpedge />
      <ProcessTimeline />
      <ServiceAreas />
      <Testimonials items={testimonials} />
      <CtaBanner />
    </>
  );
}
