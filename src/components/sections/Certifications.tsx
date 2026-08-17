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
    <section
      aria-labelledby="certifications-label"
      className="border-t border-rule-ink"
    >
      <Container>
        <div className="pt-8">
          <h2 id="certifications-label" className="label text-accent">
            {copy.title}
          </h2>
          <p className="mt-3 max-w-[var(--measure)] text-sm text-ink-2">
            {copy.lead}
          </p>
        </div>

        <ul className="mt-6 border-t border-rule-ink pb-12">
          {certifications.map((cert) => (
            <li
              key={cert.id}
              className="grid gap-x-8 gap-y-1 border-b border-rule py-5 sm:grid-cols-[11rem_minmax(0,1fr)]"
            >
              <p className="label pt-1 text-ink-3">{cert.date}</p>
              <div>
                <p className="text-base font-semibold text-ink">
                  {cert.name}
                </p>
                <p className="mt-0.5 text-sm text-ink-3">{cert.issuer}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
