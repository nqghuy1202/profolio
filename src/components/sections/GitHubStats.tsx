import { Container } from "@/components/ui/Container";
import { getGitHubStats } from "@/lib/github";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

// Không đánh số thứ tự như các section chính, để bật/tắt khối này
// (features.githubStats) không làm lệch dãy 01–04.
export async function GitHubStats({
  copy,
  locale,
}: {
  copy: Dictionary["github"];
  locale: Locale;
}) {
  const stats = await getGitHubStats();

  const tiles = stats
    ? [
        { label: copy.repos, value: String(stats.publicRepos) },
        { label: copy.followers, value: String(stats.followers) },
        { label: copy.stars, value: String(stats.stars) },
        {
          label: copy.updated,
          value: stats.lastPushedAt
            ? new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }).format(new Date(stats.lastPushedAt))
            : "—",
        },
      ]
    : [];

  return (
    <section
      aria-labelledby="github-label"
      className="border-t border-rule-ink bg-paper-tint"
    >
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-4 pt-8">
          <h2 id="github-label" className="label text-accent">
            {copy.title}
          </h2>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="label underline-grow text-ink-2 hover:text-ink"
          >
            {copy.viewProfile} ↗
          </a>
        </div>

        {stats ? (
          <dl className="grid gap-8 pt-8 pb-12 sm:grid-cols-2 lg:grid-cols-4">
            {tiles.map((tile) => (
              <div key={tile.label}>
                <dt className="text-[clamp(1.5rem,3vw,2.25rem)] leading-none font-semibold tracking-[-0.02em] text-ink">
                  {tile.value}
                </dt>
                <dd className="mt-3 text-sm text-ink-2">{tile.label}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="pt-6 pb-12 text-sm text-ink-3">{copy.unavailable}</p>
        )}
      </Container>
    </section>
  );
}
