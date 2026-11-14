import { CtaBanner } from "@/components/home/CtaBanner";
import { CloudImage } from "@/components/media/CloudImage";
import { Parallax } from "@/components/ui/Parallax";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/ui/Rise";
import { certifications, companyTimeline, media, site, team, values } from "@/data/site";
import { isLive } from "@/lib/cloudinary";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description: "UPEDGE is a construction company that brings design, approvals and building under one accountable team.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="A pinnacle of premium construction."
        lead="UPEDGE designs and builds homes, commercial spaces and renovations with careful planning, clear communication and workmanship that lasts."
      />

      {/* Story */}
      <section className="section-pb container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <Rise className="lg:col-span-7">
          <div className="bezel">
            <div className="relative aspect-[4/3] overflow-hidden rounded-inner">
              <Parallax distance={70} scale={1.1} disabled={!isLive(media.about)}>
                <CloudImage media={media.about} sizes="(min-width: 1024px) 58vw, 100vw" priority />
              </Parallax>
            </div>
          </div>
        </Rise>
        <div className="space-y-6 lg:col-span-4 lg:col-start-9">
          <Reveal>
            <h2 className="display-3 text-balance">Our story</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-ink-2">
              [Write two or three short paragraphs about how {site.name} started, who is behind it and what drives the team. Keep it factual and personal.]
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-ink-2">
              What we can say today is how we work: one team across design, approvals and construction, written estimates, and quality checks at every stage.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vision and mission */}
      <section className="section-pb container-x">
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal className="rounded-card bg-accent p-8 text-accent-ink sm:p-12">
            <h2 className="text-sm">Vision</h2>
            <p className="display-3 mt-10">To be the builder people trust with the most important structures of their lives.</p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-card bg-inverse p-8 text-on-inverse sm:p-12">
            <h2 className="text-sm text-on-inverse-muted">Mission</h2>
            <p className="display-3 mt-10">To deliver premium construction through careful planning, honest communication and uncompromising workmanship.</p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section-y edge-top">
        <div className="container-x">
          <SectionHeader eyebrow="Values" title="What we stand for" />
          <ul className="block-gap grid sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={(i % 2) * 0.08} className="border-t border-line py-10 sm:pr-12 [&:nth-child(even)]:sm:pl-12 [&:nth-child(even)]:sm:border-l">
                <h3 className="display-3">{v.title}</h3>
                <p className="measure-sm mt-4 text-ink-2">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Team */}
      <section className="section-y edge-top">
        <div className="container-x">
          <SectionHeader eyebrow="Team" title="The people behind the build" />
          <ul className="block-gap grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal as="li" key={m.photo.publicId} delay={(i % 4) * 0.08}>
                <div className="bezel">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-inner">
                    <CloudImage media={m.photo} sizes="(min-width: 1024px) 22vw, 46vw" />
                  </div>
                </div>
                <p className="mt-5 font-medium">{m.name}</p>
                <p className="text-sm text-muted">{m.role}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-y edge-top">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <SectionHeader className="lg:col-span-4" size="sm" title="Certifications and registrations" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:grid-cols-3">
            {certifications.map((c, i) => (
              <Reveal as="li" key={i} delay={i * 0.08} className="rounded-card bg-surface p-6 shadow-[inset_0_0_0_1px_var(--line)]">
                <p className="font-medium">{c.title}</p>
                <p className="mt-2 text-sm text-muted">{c.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-y edge-top">
        <div className="container-x">
          <SectionHeader eyebrow="Timeline" title="Our journey" />
          <ol className="block-gap divide-y divide-line border-y border-line">
            {companyTimeline.map((t, i) => (
              <Reveal as="li" key={i} delay={i * 0.06} className="grid gap-3 py-8 md:grid-cols-12 md:items-baseline">
                <p className="display-3 tabular md:col-span-3">{t.year}</p>
                <h3 className="text-xl font-medium md:col-span-4">{t.title}</h3>
                <p className="text-ink-2 md:col-span-5">{t.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
