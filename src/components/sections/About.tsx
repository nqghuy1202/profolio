import { GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { toneAt } from "@/lib/palette";
import type { Dictionary } from "@/i18n/dictionaries";

export function About({ about }: { about: Dictionary["about"] }) {
  return (
    <Section id="about" index="03" label={about.title}>
      <Container>
        <div className="space-y-5 pt-6 pb-12">
          {about.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-base leading-[1.75] text-text-2"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Kinh nghiệm — mỗi vị trí một thẻ, dải màu bên trái theo bảng xoay */}
        <div>
          <p className="text-sm font-semibold text-primary-deep">
            {about.experienceTitle}
          </p>
          <ol className="mt-5 space-y-4">
            {about.experience.map((job, index) => {
              const tone = toneAt(index);
              return (
                <Reveal key={job.period} delay={index * 70}>
                  <li
                    className={`grid gap-x-8 gap-y-2 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:grid-cols-[9rem_minmax(0,1fr)] border-l-4 ${tone.borderLeft}`}
                  >
                    <p className="font-mono text-xs font-semibold tracking-wide text-text-3 uppercase">
                      {job.period}
                    </p>
                    <div>
                      <p className="text-base font-semibold text-text">
                        {job.role}
                      </p>
                      <p className="mt-0.5 text-sm text-text-3">
                        {job.company}
                      </p>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-2">
                        {job.summary}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>

        <div className="mt-10 pb-16">
          <p className="text-sm font-semibold text-primary-deep">
            {about.educationTitle}
          </p>
          <div className="mt-5 flex items-start gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-2 text-white">
              <GraduationCap size={20} />
            </span>
            <div>
              <p className="font-mono text-xs font-semibold tracking-wide text-text-3 uppercase">
                {about.education.year}
              </p>
              <p className="mt-1 text-base font-semibold text-text">
                {about.education.degree}
              </p>
              <p className="mt-0.5 text-sm text-text-3">
                {about.education.school}
              </p>
              <p className="mt-2 font-mono text-sm font-medium text-text-2">
                {about.education.gpa}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
