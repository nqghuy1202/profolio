import { Section } from "@/components/ui/Section";
import { getGitHubStats } from "@/lib/github";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { ArrowIcon } from "@/components/ui/icons";

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
    <Section id="github" title={copy.title} lead={copy.lead}>
      {stats ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className="rounded-lg border border-line bg-surface p-5"
            >
              <p className="font-mono text-2xl font-semibold text-accent">
                {tile.value}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{tile.label}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-ink-faint">{copy.unavailable}</p>
      )}

      <a
        href={profile.githubUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-accent"
      >
        {copy.viewProfile}
        <ArrowIcon />
      </a>
    </Section>
  );
}
