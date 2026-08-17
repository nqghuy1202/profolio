import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

// Chỗ duy nhất trên trang đảo màu: mực làm nền, giấy làm chữ.
export function Footer({
  footer,
  contact,
  locale,
}: {
  footer: Dictionary["footer"];
  contact: Dictionary["contact"];
  locale: Locale;
}) {
  const year = new Date().getFullYear();
  const name = locale === "vi" ? profile.fullNameVi : profile.fullName;

  const links = [
    {
      label: contact.emailLabel,
      value: profile.email,
      href: `mailto:${profile.email}`,
      external: false,
    },
    {
      label: contact.githubLabel,
      value: `github.com/${profile.githubUser}`,
      href: profile.githubUrl,
      external: true,
    },
    {
      label: contact.linkedinLabel,
      value: "linkedin.com/in/huy-nqg",
      href: profile.linkedinUrl,
      external: true,
    },
  ];

  return (
    <footer className="border-t border-rule-ink bg-ink text-paper">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-[1fr_auto] lg:gap-20">
          <div>
            <p className="display-sm text-paper">{name}</p>
            {/* accent-light chứ không phải accent: nền ở đây là mực, mà nâu
                gốc trên mực chỉ đạt 3,35:1. Xem --accent-light trong
                globals.css. */}
            <p className="label mt-4 text-accent-light">{footer.availability}</p>
          </div>

          <ul className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
            {links.map((link) => (
              <li key={link.label}>
                <span className="label block text-paper/50">{link.label}</span>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="underline-grow mt-2 inline-block text-sm text-paper"
                >
                  {link.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-paper/15">
        <Container>
          <div className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="label text-paper/50">
              © {year} {profile.fullName}
            </p>
            <p className="text-xs text-paper/50">{footer.builtWith}</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
