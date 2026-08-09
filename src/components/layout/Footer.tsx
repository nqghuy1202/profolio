import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/icons";

export function Footer({
  footer,
  contact,
}: {
  footer: Dictionary["footer"];
  contact: Dictionary["contact"];
}) {
  const year = new Date().getFullYear();

  const socials = [
    {
      href: profile.githubUrl,
      label: contact.githubLabel,
      Icon: GitHubIcon,
    },
    {
      href: profile.linkedinUrl,
      label: contact.linkedinLabel,
      Icon: LinkedInIcon,
    },
    {
      href: `mailto:${profile.email}`,
      label: contact.emailLabel,
      Icon: MailIcon,
    },
  ];

  return (
    <footer className="border-t border-line py-10">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm text-ink-muted">{footer.builtWith}</p>
            <p className="text-xs text-ink-faint">
              © {year} {profile.fullName}. {footer.rights}
            </p>
          </div>

          <div className="flex items-center gap-4 text-lg">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="text-ink-muted transition-colors hover:text-accent"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
