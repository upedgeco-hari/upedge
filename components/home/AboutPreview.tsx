import { CloudImage } from "@/components/media/CloudImage";
import { Button } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { media } from "@/data/site";
import { isLive } from "@/lib/cloudinary";

/** Editorial split: a tall image with an overlapping detail, and the short company story. */
export function AboutPreview() {
  return (
    <section className="section-y">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal variant="media" className="relative lg:col-span-6">
          <div className="bezel">
            <div className="relative aspect-[4/5] overflow-hidden rounded-inner short:aspect-[16/10]">
              <Parallax distance={60} scale={1.1} disabled={!isLive(media.about)}>
                <CloudImage media={media.about} sizes="(min-width: 1024px) 46vw, 100vw" />
              </Parallax>
            </div>
          </div>
          <div className="bezel absolute -bottom-8 right-4 w-[44%] sm:-bottom-10 sm:-right-4 lg:-right-6 lg:w-[40%]">
            <div className="relative aspect-square overflow-hidden rounded-inner">
              <CloudImage media={media.aboutSecondary} sizes="(min-width: 1024px) 18vw, 40vw" />
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-8">
          <SectionHeader
            eyebrow="About UPEDGE"
            title="Built on planning, precision and plain talk."
            lead="UPEDGE treats every project as a long-term commitment. Design, approvals and construction sit under one team, so you deal with one accountable partner from the first sketch to the final handover."
          />
          <Reveal delay={0.24} className="cta-gap">
            <Button href="/about" variant="dark">
              Our Story
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
