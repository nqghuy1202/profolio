import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

export function About({ about }: { about: Dictionary["about"] }) {
  return (
    <Section id="about" index="03" label={about.title}>
      <Container>
        <div className="max-w-[var(--measure)] space-y-6 pt-12">
          {about.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-base leading-[1.75] text-ink-2"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Kinh nghiệm — mỗi vị trí một hàng kẻ chỉ, đọc như mục lục */}
        <div className="mt-16">
          <p className="label text-accent">{about.experienceTitle}</p>
          <ol className="mt-5 border-t border-rule-ink">
            {about.experience.map((job, index) => (
              <Reveal key={job.period} delay={index * 70}>
                <li className="grid gap-x-8 gap-y-2 border-b border-rule py-6 sm:grid-cols-[11rem_minmax(0,1fr)]">
                  <p className="label pt-1 text-ink-3">{job.period}</p>
                  <div>
                    <p className="text-base font-semibold text-ink">
                      {job.role}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-3">{job.company}</p>
                    <p className="mt-3 max-w-[var(--measure)] text-[0.9375rem] leading-relaxed text-ink-2">
                      {job.summary}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-14 pb-16">
          <p className="label text-accent">{about.educationTitle}</p>
          <div className="mt-5 grid gap-x-8 gap-y-2 border-t border-rule-ink pt-6 sm:grid-cols-[11rem_minmax(0,1fr)]">
            <p className="label pt-1 text-ink-3">{about.education.year}</p>
            <div>
              <p className="text-base font-semibold text-ink">
                {about.education.degree}
              </p>
              <p className="mt-0.5 text-sm text-ink-3">
                {about.education.school}
              </p>
              {/* font-medium vì bộ mono chỉ nạp độ đậm 500 — xem src/app/fonts.ts */}
              <p className="mt-2 font-mono font-medium text-sm text-ink-2">
                {about.education.gpa}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
