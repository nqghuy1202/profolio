import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { skillGroups } from "@/data/skills";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Kỹ năng trình bày dạng danh sách định nghĩa hai cột, mỗi nhóm một hàng kẻ
 * chỉ — không chip, không thẻ, không khung bo góc.
 *
 * Lý do: một chip là một cái hộp; sáu nhóm × bảy công nghệ là bốn mươi cái
 * hộp, và mắt phải xử lý từng cái. Một dòng chữ ngăn bằng dấu chấm giữa thì
 * đọc một lượt là hết, mà vẫn phân nhóm rõ nhờ nhãn bên trái.
 */
export function Skills({ skills }: { skills: Dictionary["skills"] }) {
  return (
    <Section id="skills" index="02" label={skills.title}>
      <Container>
        <div className="max-w-[var(--measure)] pt-10">
          <p className="text-base leading-[1.7] text-ink-2">{skills.lead}</p>
        </div>

        <dl className="mt-10 border-t border-rule-ink">
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} delay={index * 60}>
              <div className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[13rem_1fr] sm:gap-8">
                <dt className="label pt-1 text-accent">
                  {skills.groups[group.id as keyof typeof skills.groups]}
                </dt>
                <dd className="text-[0.9375rem] leading-[1.9] text-ink">
                  {group.items.map((item, itemIndex) => (
                    <span key={item}>
                      {itemIndex > 0 ? (
                        <span aria-hidden="true" className="px-2 text-ink-3">
                          ·
                        </span>
                      ) : null}
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
