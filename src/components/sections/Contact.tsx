import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";

type ContactCopy = Dictionary["contact"];

// Server Component. Trước đây mục này là Client Component vì cái form cần
// state cho giá trị nhập, lỗi và trạng thái gửi. Bỏ form thì không còn gì
// chạy trong trình duyệt, nên cả khối này không gửi JavaScript nào xuống nữa.
export function Contact({ copy }: { copy: ContactCopy }) {
  const directLinks = [
    {
      href: `mailto:${profile.email}`,
      label: copy.emailLabel,
      value: profile.email,
      external: false,
    },
    {
      href: profile.githubUrl,
      label: copy.githubLabel,
      value: `github.com/${profile.githubUser}`,
      external: true,
    },
    {
      href: profile.linkedinUrl,
      label: copy.linkedinLabel,
      value: "linkedin.com/in/huy-nqg",
      external: true,
    },
  ];

  return (
    <Section id="contact" index="04" label={copy.title}>
      <Container>
        <div className="max-w-[var(--measure)] pt-12">
          <p className="text-base leading-[1.7] text-ink-2">{copy.lead}</p>
        </div>

        {/* Cùng dạng lưới nhãn–nội dung với mục Kinh nghiệm và Học vấn ở phần
            Giới thiệu, để ba khối danh sách trên trang đọc như một hệ. */}
        <div className="mt-12 pb-20">
          <p className="label text-accent">{copy.directTitle}</p>
          <ul className="mt-5 border-t border-rule-ink">
            {directLinks.map((link) => (
              <li
                key={link.label}
                className="grid gap-x-8 gap-y-2 border-b border-rule py-5 sm:grid-cols-[11rem_minmax(0,1fr)]"
              >
                <span className="label pt-1 text-ink-3">{link.label}</span>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="underline-grow justify-self-start text-base text-ink"
                >
                  {link.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
