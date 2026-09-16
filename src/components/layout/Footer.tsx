import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

// Dải tối duy nhất trên trang — làm điểm kết bằng gradient thương hiệu thay
// vì đen phẳng, để tông màu vẫn nối với phần còn lại của site.
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
      icon: Mail,
    },
    {
      label: contact.githubLabel,
      value: `github.com/${profile.githubUser}`,
      href: profile.githubUrl,
      external: true,
      icon: GithubIcon,
    },
    {
      label: contact.linkedinLabel,
      value: "linkedin.com/in/huy-nqg",
      href: profile.linkedinUrl,
      external: true,
      icon: LinkedinIcon,
    },
  ];

  return (
    <footer className="mt-24 rounded-t-[2.5rem] bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-[1fr_auto] lg:gap-20">
          <div>
            <p className="text-2xl font-bold tracking-tight text-white">
              {name}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {footer.availability}
            </p>
          </div>

          <ul className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="group flex items-center gap-3 text-sm text-white/90 transition-colors hover:text-white"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
                    <link.icon size={16} />
                  </span>
                  <span>
                    <span className="block text-xs text-white/50">
                      {link.label}
                    </span>
                    {link.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container>
          <div className="flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {profile.fullName}
            </p>
            <p>{footer.builtWith}</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
