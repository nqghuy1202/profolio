import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";

type ContactCopy = Dictionary["contact"];

// Server Component. Ba đường liên hệ trực tiếp hiện thành ba thẻ bo góc thay
// vì hàng nhãn–nội dung kẻ chỉ, để mắt bắt ngay được cách liên hệ nhanh nhất.
export function Contact({ copy }: { copy: ContactCopy }) {
  const directLinks = [
    {
      href: `mailto:${profile.email}`,
      label: copy.emailLabel,
      value: profile.email,
      external: false,
      icon: Mail,
      tone: "bg-sky-50 text-sky-600",
    },
    {
      href: profile.githubUrl,
      label: copy.githubLabel,
      value: `github.com/${profile.githubUser}`,
      external: true,
      icon: GithubIcon,
      tone: "bg-emerald-50 text-emerald-600",
    },
    {
      href: profile.linkedinUrl,
      label: copy.linkedinLabel,
      value: "linkedin.com/in/huy-nqg",
      external: true,
      icon: LinkedinIcon,
      tone: "bg-teal-50 text-teal-600",
    },
  ];

  return (
    <Section id="contact" index="04" label={copy.title}>
      <Container>
        <div className="pt-6 pb-8">
          <p className="text-base leading-[1.7] text-text-2">{copy.lead}</p>
        </div>

        <div className="grid gap-4 pb-24 sm:grid-cols-3">
          {directLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full ${link.tone}`}
              >
                <link.icon size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-text-3">
                  {link.label}
                </p>
                <p className="mt-1 text-base font-semibold break-all text-text group-hover:text-primary-deep">
                  {link.value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}
