import { CtaBanner } from "@/components/home/CtaBanner";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { PageHero } from "@/components/ui/PageHero";
import { categories } from "@/data/projects";
import { getAllProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description: "Homes and interiors by UPEDGE: photos from our sites and 3D house designs.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  return (
    <>
      <PageHero
        title="Our projects"
        lead="Photos from our sites and 3D house designs. Open a project to see it from more angles."
      />
      <section className="section-pb container-x">
        <ProjectGrid projects={projects} categories={categories} />
      </section>
      <CtaBanner />
    </>
  );
}
