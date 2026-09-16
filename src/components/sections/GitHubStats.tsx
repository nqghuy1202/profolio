import { ArrowUpRight } from "lucide-react";
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
    <section aria-labelledby="github-label" className="scroll-mt-24">
      <Container>
        <div className="rounded-3xl border border-border bg-surface p-8 shadow-sm">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="github-label" className="text-xl font-bold tracking-tight text-text">
              {copy.title}
            </h2>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary-deep hover:underline"
            >
              {copy.viewProfile}
              <ArrowUpRight size={14} />
            </a>
          </div>

          {stats ? (
            <dl className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {tiles.map((tile) => (
                <div key={tile.label}>
                  <dt className="text-3xl font-extrabold tracking-tight text-text">
                    {tile.value}
                  </dt>
                  <dd className="mt-2 text-sm text-text-2">{tile.label}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-6 text-sm text-text-3">{copy.unavailable}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
