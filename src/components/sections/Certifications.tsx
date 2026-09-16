import { Award } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { certifications } from "@/data/certifications";
import type { Dictionary } from "@/i18n/dictionaries";

// Không đánh số thứ tự như các section chính, để bật/tắt khối này
// không làm lệch dãy 01–04 — cùng quy ước với GitHubStats.
export function Certifications({
  copy,
}: {
  copy: Dictionary["certifications"];
}) {
  if (certifications.length === 0) return null;

  return (
    <section aria-labelledby="certifications-label" className="scroll-mt-24">
      <Container>
        <div className="pt-16">
          <h2 id="certifications-label" className="text-2xl font-bold tracking-tight text-text">
            {copy.title}
          </h2>
          <p className="mt-3 text-sm text-text-2">
            {copy.lead}
          </p>
        </div>

        <ul className="mt-6 grid gap-4 pb-16 sm:grid-cols-2">
          {certifications.map((cert) => (
            <li
              key={cert.id}
              className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <Award size={20} />
              </span>
              <div>
                <p className="text-base font-bold text-text">{cert.name}</p>
                <p className="mt-0.5 text-sm text-text-3">{cert.issuer}</p>
                <p className="mt-1 font-mono text-xs font-semibold tracking-wide text-text-3 uppercase">
                  {cert.date}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
