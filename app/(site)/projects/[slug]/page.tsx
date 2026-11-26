import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "@/components/seo/JsonLd";
import { CloudImage } from "@/components/media/CloudImage";
import { BeforeAfter } from "@/components/projects/BeforeAfter";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectStory } from "@/components/projects/ProjectStory";
import { BackLink } from "@/components/ui/BackLink";
import { Button } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/ui/Rise";
import { projects as staticProjects } from "@/data/projects";
import { getService } from "@/data/services";
import { cta, site } from "@/data/site";
import { isLive } from "@/lib/cloudinary";
import { projectEnquiry, quoteHref } from "@/lib/enquiry";
import { getProjectBySlug, getRelated } from "@/lib/projects";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata, mediaUrl, shareImage } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return staticProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) return {};
  return buildMetadata({
    title: `${p.title}, ${p.category} project`,
    description: p.summary,
    path: `/projects/${p.slug}`,
    image: shareImage(p.cover),
    type: "article",
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const related = await getRelated(slug);
  const used = (project.services ?? []).map(getService).filter((s) => !!s);
  const design = project.kind === "design";
  // Portrait covers sit beside the title: stretched full-bleed they would lose most of the house.
  const portrait = (project.cover.height ?? 0) > (project.cover.width ?? 0);
  const photos = project.images.filter((img) => mediaUrl(img));

  // Only facts that are actually known are shown.
  const facts = [
    ["Category", project.category],
    ["Shown as", design ? "3D design visualisation" : "Site photos"],
    ["Location", project.location],
    ["Built-up area", project.area ? `${project.area.toLocaleString("en-IN")} sq. ft.` : undefined],
    ["Duration", project.duration],
    ["Year", project.year ? String(project.year) : undefined],
    ["Client", project.clientType],
  ].filter((f): f is [string, string] => !!f[1]);

  const heading = (
    <>
      <Rise>
        <h1 className="display-1 max-w-4xl text-balance">{project.title}</h1>
      </Rise>
      <Rise delay={0.12} className="mt-6">
        <p className="lead text-on-inverse/90!">{project.summary}</p>
      </Rise>
    </>
  );

  return (
    <>
      {/* Hero */}
      {portrait ? (
        <section className="bg-inverse text-on-inverse" data-inverse>
          <div className="container-x grid items-center gap-10 pb-12 pt-28 sm:pb-16 short:grid-cols-2 short:pb-8 short:pt-20 lg:min-h-[88dvh] lg:grid-cols-2 lg:gap-16 lg:pt-32">
            <div>{heading}</div>
            <Rise delay={0.18} className="mx-auto w-full max-w-md short:max-w-[min(100%,56dvh)] lg:max-w-[min(100%,56dvh)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-card">
                <CloudImage media={project.cover} sizes="(min-width: 1024px) 40vw, (min-width: 480px) 448px, 100vw" priority />
              </div>
            </Rise>
          </div>
        </section>
      ) : (
        <section className="relative isolate flex min-h-[88dvh] items-end overflow-hidden bg-inverse text-on-inverse" data-inverse>
          <Parallax distance={100} scale={1.12} disabled={!isLive(project.cover)}>
            <CloudImage media={project.cover} sizes="100vw" priority placeholderTop />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-inverse/90 via-inverse/30 to-inverse/55" aria-hidden="true" />
          <div className="container-x relative pb-12 pt-40 sm:pb-16">{heading}</div>
        </section>
      )}

      {project.status === "placeholder" && (
        <p className="bg-accent-tint px-[var(--gutter)] py-3 text-center text-sm text-ink">
          Sample project. Replace the details and images in <span className="font-medium">data/projects.ts</span>.
        </p>
      )}

      {/* Facts */}
      <section className="container-x pt-14 sm:pt-20" aria-label="Project facts">
        <div className="mb-10">
          <BackLink href="/projects">All projects</BackLink>
        </div>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-8 border-b border-line pb-12 md:grid-cols-3 lg:grid-cols-6">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt className="text-sm text-muted">{k}</dt>
              <dd className="mt-1.5 font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Story text */}
      <section className="section-y container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-6 lg:col-span-7">
          <Reveal>
            <h2 className="display-3 text-balance">{design ? "The design" : "The brief and the build"}</h2>
          </Reveal>
          {project.story.map((para, i) => (
            <Reveal key={i} delay={0.06 * (i + 1)}>
              <p className="lead">{para}</p>
            </Reveal>
          ))}
        </div>
        {used.length > 0 && (
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <h2 className="text-sm text-muted">{design ? "Related services" : "Services used"}</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {used.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="group flex items-center justify-between py-4 font-medium">
                    {s.title}
                    <ArrowRight size={18} weight="light" className="transition-transform duration-500 ease-smooth group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </section>

      {/* Image story (scroll-driven, with browse mode) */}
      <ProjectStory project={project} />

      {/* Comparison slider */}
      {project.comparison && (
        <section className="section-y container-x">
          <SectionHeader eyebrow={project.comparison.eyebrow} title={project.comparison.title} lead={project.comparison.lead} />
          <Reveal variant="media" delay={0.1} className="block-gap">
            <BeforeAfter before={project.comparison.before} after={project.comparison.after} labels={project.comparison.labels} />
          </Reveal>
        </section>
      )}

      {/* Related + CTA */}
      <section className="section-y edge-top">
        <div className="container-x">
          <SectionHeader eyebrow="Keep looking" title="More projects" />
          <ul className="block-gap grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Reveal as="li" key={p.slug}>
                <ProjectCard project={p} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw" />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-accent text-accent-ink">
        <div className="container-x py-24 sm:py-32">
          <Reveal className="max-w-4xl">
            <h2 className="display-1 text-balance">Start a similar project.</h2>
            <p className="measure-sm mt-6 text-lg text-accent-ink/85">
              Tell us about your plot or property and we will outline how a project like {project.title} could work for you.
            </p>
            <div className="cta-gap">
              <Button href={quoteHref(projectEnquiry(project))} variant="dark">
                {cta.quote}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.summary,
            url: absoluteUrl(`/projects/${project.slug}`),
            genre: project.category,
            locationCreated: project.location,
            creator: { "@type": "Organization", name: site.name, url: site.url },
            image: photos.length
              ? photos.map((img) => ({
                  "@type": "ImageObject",
                  contentUrl: mediaUrl(img),
                  name: `${project.title}: ${img.stage}`,
                  caption: img.caption ?? img.alt,
                }))
              : undefined,
          },
        ]}
      />
    </>
  );
}
