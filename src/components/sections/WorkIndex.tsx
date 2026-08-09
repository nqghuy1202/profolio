import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { projects } from "@/data/projects";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

/**
 * Mục lục dự án — mỗi dự án một HÀNG, không phải một thẻ.
 *
 * Đây là thay đổi lớn nhất so với bản trước. Sáu cái thẻ dày đặc chữ đứng
 * cạnh nhau buộc người xem đọc hết mới biết nên bấm vào đâu. Sáu hàng chỉ có
 * số thứ tự, tên, một dòng tóm tắt và ba công nghệ thì quét trong năm giây là
 * xong, còn phần dài nằm ở trang riêng của từng dự án.
 *
 * Rê chuột thì cả hàng đảo nền sang màu mực. Đây là bản chuyển thể của hiệu
 * ứng "ảnh mờ đi, chữ hiện lên" trong HL Company: portfolio không có ảnh sản
 * phẩm để làm mờ, nên sức nặng dồn vào việc đảo màu nguyên hàng.
 */
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

          return (
            <Link
              key={project.id}
              href={`/${locale}/work/${project.slug}`}
              className="row-invert block border-b border-rule"
            >
              <Container>
                <div className="grid gap-x-8 gap-y-4 py-8 sm:py-10 lg:grid-cols-[3.5rem_minmax(0,1fr)_16rem_1.5rem] lg:items-start">
                  <span
                    aria-hidden="true"
                    className="numeral row-accent text-2xl leading-none"
                  >
                    {String(index + 1).padStart(2, "0")}
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
                    {project.status ? (
                      <p className="row-accent label mt-3">
                        {work.status[project.status]}
                      </p>
                    ) : null}
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
