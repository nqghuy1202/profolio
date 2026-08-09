import { Section } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n/dictionaries";

export function About({ about }: { about: Dictionary["about"] }) {
  return (
    <Section id="about" title={about.title}>
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <div className="space-y-5">
          {about.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="text-base leading-relaxed text-ink-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
              {about.experienceTitle}
            </h3>
            <ol className="mt-4 space-y-5 border-l border-line pl-5">
              {about.experience.map((job) => (
                <li key={job.period} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.55rem] top-1.5 h-2 w-2 rounded-full border border-line-strong bg-canvas"
                  />
                  <p className="text-sm font-semibold text-ink">{job.role}</p>
                  <p className="text-sm text-ink-muted">{job.company}</p>
                  <p className="mt-0.5 font-mono text-xs text-ink-faint">
                    {job.period}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {job.summary}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
              {about.educationTitle}
            </h3>
            <div className="mt-4 rounded-lg border border-line bg-surface p-5">
              <p className="text-sm font-semibold text-ink">
                {about.education.degree}
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                {about.education.school}
              </p>
              <p className="mt-2 font-mono text-xs text-ink-faint">
                {about.education.year} · {about.education.gpa}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
