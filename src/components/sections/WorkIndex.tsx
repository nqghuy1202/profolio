import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { projects } from "@/data/projects";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

// Mỗi dự án một hàng, không phải một thẻ: quét nhanh hơn, phần dài nằm ở
// trang riêng của từng dự án.
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
        <div className="max-w-[var(--measure)] pt-10 pb-2">
          <p className="text-base leading-[1.7] text-ink-2">{work.lead}</p>
        </div>
      </Container>

      <div className="mt-8 border-t border-rule-ink">
        {projects.map((project, index) => {
          const copy = work.items[project.id as keyof typeof work.items];

          // Những gì đáng nói về dự án ở mức danh sách, xếp theo thứ tự người
          // đọc quan tâm: bấm xem được ngay quan trọng hơn đọc được code, và
          // cả hai đều quan trọng hơn việc nó thuộc loại nào.
          const marks = [work.kinds[project.kind]];
          if (project.status) marks.push(work.status[project.status]);
          if (project.links?.demo) marks.push(work.labels.hasDemo);
          if (project.links?.repo) marks.push(work.labels.hasCode);

          return (
            <Link
              key={project.id}
              href={`/${locale}/work/${project.slug}`}
              className="row-invert block border-b border-rule"
            >
              <Container>
                <div className="grid gap-x-8 gap-y-4 py-8 sm:py-10 lg:grid-cols-[3.5rem_minmax(0,1fr)_16rem_1.5rem] lg:items-start">
                  {/* Dạng "01/06" bằng chữ mono, KHÔNG dùng .numeral serif
                      nghiêng màu nhấn. Kiểu đó đang dành riêng cho số thứ tự
                      section, mà section ngay phía trên cũng mang số 01 — hai
                      chữ 01 giống hệt nhau cách nhau một quãng ngắn thì người
                      đọc không biết cái nào đếm cái gì. Thêm mẫu số cũng nói
                      luôn danh sách có bao nhiêu mục. */}
                  <span aria-hidden="true" className="row-mute label">
                    {String(index + 1).padStart(2, "0")}/
                    {String(projects.length).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <h3 className="display-sm">{copy.title}</h3>
                    <p className="row-mute mt-3 max-w-[34rem] text-[0.9375rem] leading-relaxed">
                      {copy.tagline}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="row-mute label leading-[1.9]">
                      {project.highlightTech.join(" · ")}
                    </p>

                    {/* Câu dẫn ngay trên danh sách hứa "dự án mã nguồn mở là
                        nơi bạn đọc được code" — nếu hàng nào cũng trông như
                        nhau thì người đọc phải bấm thử từng cái mới biết là
                        cái nào. Dấu gạch chéo là chữ trang trí nên để
                        aria-hidden; trình đọc màn hình đọc liền các mục. */}
                    <p className="row-accent label mt-3 leading-[1.9]">
                      {marks.map((mark, markIndex) => (
                        <span key={mark}>
                          {markIndex > 0 ? (
                            <span aria-hidden="true" className="row-mute px-1.5">
                              /
                            </span>
                          ) : null}
                          {mark}
                        </span>
                      ))}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="row-arrow hidden text-xl leading-none lg:block"
                  >
                    →
                  </span>
                </div>
              </Container>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
