import { CtaBanner } from "@/components/home/CtaBanner";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { PageHero } from "@/components/ui/PageHero";
import { categories } from "@/data/projects";
import { getAllProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description: "Residential, commercial, renovation and interior projects by UPEDGE, documented from before to final.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  return (
    <>
      <PageHero
        title="Our projects"
        lead="Each project is photographed at every stage. Open one to follow the build from the first day on site to handover."
      />
      <section className="container-x pb-28 sm:pb-40">
        <ProjectGrid projects={projects} categories={categories} />
      </section>
      <CtaBanner />
    </>
  );
}
