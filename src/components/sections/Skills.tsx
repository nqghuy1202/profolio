import { Section } from "@/components/ui/Section";
import { skillGroups } from "@/data/skills";
import type { Dictionary } from "@/i18n/dictionaries";

export function Skills({ skills }: { skills: Dictionary["skills"] }) {
  return (
    <Section id="skills" title={skills.title} lead={skills.lead}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div
            key={group.id}
            className="rounded-lg border border-line bg-surface p-5"
          >
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
              {skills.groups[group.id as keyof typeof skills.groups]}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded border border-line bg-surface-2 px-2 py-1 text-xs text-ink-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
