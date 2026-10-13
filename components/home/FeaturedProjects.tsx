import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cta } from "@/data/site";
import { featuredSlugs } from "@/data/projects";
import { getAllProjects } from "@/lib/projects";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/types";

const layout = [
  { span: "lg:col-span-7", aspect: "aspect-[4/3]", offset: "" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "lg:mt-28" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "lg:-mt-16" },
  { span: "lg:col-span-7", aspect: "aspect-[4/3]", offset: "lg:mt-12" },
];

/** The signature section: four case studies. Hover a card to preview its construction stages. */
export async function FeaturedProjects() {
  const all = await getAllProjects();
  const featured = featuredSlugs.map((s) => all.find((p) => p.slug === s)).filter((p): p is Project => !!p);

  return (
    <section className="section-y border-t border-line">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <h2 className="display-2 text-balance">Projects, documented from before to final.</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-6">
          <p className="lead">Every build is photographed at each stage, so you can see how it was made as well as how it looks.</p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-12">
          {featured.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 2) * 0.1} className={cn(layout[i].span, layout[i].offset)}>
              <ProjectCard
                project={p}
                aspect={layout[i].aspect}
                sizes={layout[i].span.includes("7") ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 42vw, 100vw"}
              />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-20 lg:mt-28">
          <Button href="/projects" variant="dark">
            {cta.projects}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
