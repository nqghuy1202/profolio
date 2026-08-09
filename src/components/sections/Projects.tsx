import { Section } from "@/components/ui/Section";
import { projects } from "@/data/projects";
import type { Dictionary } from "@/i18n/dictionaries";
import { ProjectCard } from "./ProjectCard";

export function Projects({ copy }: { copy: Dictionary["projects"] }) {
  return (
    <Section id="projects" title={copy.title} lead={copy.lead}>
      {/* Dự án nổi bật chiếm trọn hai cột (xem class lg:col-span-2 trong
          ProjectCard), phần còn lại xếp hai cột trên màn hình rộng. */}
      <div className="grid items-start gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            copy={copy.items[project.id as keyof typeof copy.items]}
            projects={copy}
          />
        ))}
      </div>
    </Section>
  );
}
