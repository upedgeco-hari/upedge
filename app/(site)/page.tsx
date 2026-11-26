import { AboutPreview } from "@/components/home/AboutPreview";
import { CtaBanner } from "@/components/home/CtaBanner";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { HappyFamilies } from "@/components/home/HappyFamilies";
import { Hero } from "@/components/home/Hero";
import { InstagramPosts } from "@/components/home/InstagramPosts";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { ServiceAreas } from "@/components/home/ServiceAreas";
import { ServicesSection } from "@/components/home/ServicesSection";
import { SiteWork } from "@/components/home/SiteWork";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyUpedge } from "@/components/home/WhyUpedge";
import { testimonials } from "@/data/testimonials";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Upedge Construction Company",
  absoluteTitle: true,
  description: `${site.name} builds homes, commercial spaces and interiors in ${site.city} and across Tamil Nadu: house design, construction and landscaping. Call ${site.phone}.`,
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
      <SiteWork />
      <ServiceAreas />
      <HappyFamilies />
      <Testimonials items={testimonials} />
      <InstagramPosts />
      <CtaBanner />
    </>
  );
}
