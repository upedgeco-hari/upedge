import { CloudImage } from "@/components/media/CloudImage";
import { Button } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { media } from "@/data/site";
import { isLive } from "@/lib/cloudinary";

/** Editorial split: a tall image with an overlapping detail, and the short company story. */
export function AboutPreview() {
  return (
    <section className="section-y">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <Reveal className="relative lg:col-span-6">
          <div className="bezel">
            <div className="relative aspect-[4/5] overflow-hidden rounded-inner">
              <Parallax distance={60} scale={1.1} disabled={!isLive(media.about)}>
                <CloudImage media={media.about} sizes="(min-width: 1024px) 46vw, 100vw" />
              </Parallax>
            </div>
          </div>
          <div className="bezel absolute -bottom-10 right-4 w-[44%] sm:-right-6 lg:-right-10 lg:w-[40%]">
            <div className="relative aspect-square overflow-hidden rounded-inner">
              <CloudImage media={media.aboutSecondary} sizes="(min-width: 1024px) 18vw, 40vw" />
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow rounded-full bg-ink/5 px-3.5 py-2 text-ink w-fit">About UPEDGE</p>
          </Reveal>
          <Reveal delay={0.08} className="mt-8">
            <h2 className="display-2 text-balance">Built on planning, precision and plain talk.</h2>
          </Reveal>
          <Reveal delay={0.16} className="mt-6">
            <p className="lead">
              UPEDGE treats every project as a long-term commitment. Design, approvals and construction sit under one team, so you deal with one accountable partner from the first sketch to the final handover.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-10">
            <Button href="/about" variant="dark">
              Our Story
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
