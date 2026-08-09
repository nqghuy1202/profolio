import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { features } from "@/data/features";
import type { Dictionary } from "@/i18n/dictionaries";

export function About({ about }: { about: Dictionary["about"] }) {
  return (
    <Section id="about" index="03" label={about.title}>
      <Container>
        <div
          className={`grid gap-10 pt-12 lg:gap-16 ${
            features.portrait ? "lg:grid-cols-[20rem_minmax(0,1fr)]" : ""
          }`}
        >
          {features.portrait ? (
            <div>
              {/* Ảnh để vuông góc, không bo tròn, không đổ bóng — cùng luật
                  với phần còn lại của trang. Tỉ lệ 4:5 là tỉ lệ chân dung
                  của tạp chí in. */}
              <Image
                src="/portrait.jpg"
                alt={about.portraitAlt}
                width={800}
                height={1000}
                sizes="(min-width: 1024px) 20rem, 100vw"
                className="w-full object-cover grayscale"
                priority={false}
              />
              <p className="label mt-3 text-ink-3">{about.portraitCaption}</p>
            </div>
          ) : null}

          <div className="max-w-[var(--measure)] space-y-6">
            {about.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-base leading-[1.75] text-ink-2"
              >
                {paragraph}
              </p>
            ))}
          </div>
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
              <p className="mt-2 font-mono text-sm text-ink-2">
                {about.education.gpa}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
