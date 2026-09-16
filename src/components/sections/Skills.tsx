import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { skillGroups } from "@/data/skills";
import { toneAt } from "@/lib/palette";
import type { Dictionary } from "@/i18n/dictionaries";

// Mỗi nhóm kỹ năng một thẻ bo góc với sắc thái riêng, công nghệ hiển thị
// thành chip thay vì danh sách chữ nối bằng dấu chấm giữa.
export function Skills({ skills }: { skills: Dictionary["skills"] }) {
  return (
    <Section id="skills" index="02" label={skills.title}>
      <Container>
        <div className="pt-6 pb-10">
          <p className="text-base leading-[1.7] text-text-2">{skills.lead}</p>
        </div>

        <div className="grid gap-4 pb-16 sm:grid-cols-2">
          {skillGroups.map((group, index) => {
            const tone = toneAt(index);

            return (
              <Reveal key={group.id} delay={index * 60}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-sm">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tone.chip}`}
                  >
                    {skills.groups[group.id as keyof typeof skills.groups]}
                  </span>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-surface-2 px-3 py-1.5 text-sm text-text-2"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
