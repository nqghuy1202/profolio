import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCover } from "@/components/sections/ProjectCover";
import { projects } from "@/data/projects";
import { toneAt } from "@/lib/palette";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

// Lưới thẻ có ảnh bìa: mỗi dự án là một case study nhỏ để lướt qua, phần dài
// nằm ở trang riêng của từng dự án. Thẻ bo góc, đổ bóng, nổi lên khi hover —
// khác hẳn hàng kẻ chỉ phẳng của bản trước.
export function WorkIndex({
  work,
  locale,
}: {
  work: Dictionary["work"];
  locale: Locale;
}) {
  return (
    <Section id="work" index="01" label={work.title}>
      <Container>
        <div className="pt-6 pb-10">
          <p className="text-base leading-[1.7] text-text-2">{work.lead}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const copy = work.items[project.id as keyof typeof work.items];
            const tone = toneAt(index);

            // Những gì đáng nói về dự án ở mức danh sách, xếp theo thứ tự
            // người đọc quan tâm: bấm xem được ngay quan trọng hơn đọc được
            // code, và cả hai đều quan trọng hơn việc nó thuộc loại nào.
            const marks = [work.kinds[project.kind]];
            if (project.status) marks.push(work.status[project.status]);
            if (project.links?.demo) marks.push(work.labels.hasDemo);
            if (project.links?.repo) marks.push(work.labels.hasCode);

            return (
              <Reveal key={project.id} delay={(index % 3) * 60}>
                <Link
                  href={`/${locale}/work/${project.slug}`}
                  className="group block h-full overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <ProjectCover
                    project={project}
                    index={index + 1}
                    kindLabel={work.kinds[project.kind]}
                  />

                  <div className="p-6">
                    <h3 className="text-lg font-semibold tracking-tight text-text">
                      {copy.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-2">
                      {copy.tagline}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.highlightTech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-text-2"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tone.chip}`}
                      >
                        {marks.join(" · ")}
                      </span>

                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-text-2 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-2 group-hover:text-white"
                      >
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
