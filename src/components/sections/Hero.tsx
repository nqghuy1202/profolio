import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { ArrowIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/icons";
import type { Locale } from "@/i18n/config";

export function Hero({
  hero,
  contact,
  locale,
}: {
  hero: Dictionary["hero"];
  contact: Dictionary["contact"];
  locale: Locale;
}) {
  const name = locale === "vi" ? profile.fullNameVi : profile.fullName;

  const socials = [
    { href: profile.githubUrl, label: contact.githubLabel, Icon: GitHubIcon },
    { href: profile.linkedinUrl, label: contact.linkedinLabel, Icon: LinkedInIcon },
    { href: `mailto:${profile.email}`, label: contact.emailLabel, Icon: MailIcon },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Lưới chấm mờ phía sau. aria-hidden vì nó thuần trang trí. */}
      <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />

      <Container>
        <div className="max-w-3xl py-20 sm:py-28">
          <p className="font-mono text-sm text-accent">{hero.role}</p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {name}
          </h1>

          <p className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">
            {hero.intro}
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {hero.highlights.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-ink-muted"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
            >
              {hero.ctaWork}
              <ArrowIcon />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {hero.ctaContact}
            </a>

            <div className="ml-1 flex items-center gap-3 text-lg">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="text-ink-faint transition-colors hover:text-accent"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
