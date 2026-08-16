"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";

// Client Component vì menu điện thoại cần state đóng/mở. Chữ nhận qua props
// để hai file JSON ngôn ngữ không bị gói vào bundle gửi xuống trình duyệt.
export function Header({
  locale,
  nav,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Bốn mục điều hướng đều là section của TRANG CHỦ. Ở trang chi tiết dự án
  // thì "#work" không trỏ tới đâu cả — trang đó không có section nào mang id
  // ấy — nên phải kèm đường dẫn trang chủ. Còn khi đang đứng ở trang chủ thì
  // giữ nguyên href chỉ có hash, để trình duyệt tự cuộn và `scroll-behavior:
  // smooth` trong globals.css còn tác dụng.
  const onHome = pathname === `/${locale}`;
  const links = [
    { hash: "#work", label: nav.projects },
    { hash: "#skills", label: nav.skills },
    { hash: "#about", label: nav.about },
    { hash: "#contact", label: nav.contact },
  ].map((link) => ({
    ...link,
    href: onHome ? link.hash : `/${locale}${link.hash}`,
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-rule-ink bg-paper">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link
            href={`/${locale}`}
            className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.2em] text-ink"
          >
            Huy Nguyen<span className="text-accent">.</span>
          </Link>

          <nav
            aria-label={nav.mainNavigation}
            className="hidden items-center gap-9 md:flex"
          >
            {links.map((link) => (
              <SectionLink
                key={link.href}
                href={link.href}
                samePage={onHome}
                className="label underline-grow text-ink-2 hover:text-ink"
              >
                {link.label}
              </SectionLink>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <LanguageSwitch locale={locale} label={nav.switchLanguage} />

            <a
              href={profile.cvPath}
              download
              className="label underline-grow hidden text-accent sm:inline-block"
            >
              {nav.downloadCv} ↓
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="label text-ink md:hidden"
            >
              {open ? nav.close : nav.menu}
            </button>
          </div>
        </div>
      </Container>

      {/*
        Menu luôn nằm trong DOM để trượt ra có chuyển động thật, nhưng khi đóng
        thì gắn `inert` — thuộc tính này gỡ toàn bộ phần tử bên trong khỏi thứ
        tự tab và khỏi trình đọc màn hình. Chỉ dùng `opacity: 0` thì link vẫn
        bấm được bằng phím Tab dù mắt không thấy.
      */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`overflow-hidden border-t border-rule bg-paper transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Container>
          <nav aria-label={nav.mainNavigation} className="flex flex-col py-2">
            {links.map((link) => (
              <SectionLink
                key={link.href}
                href={link.href}
                samePage={onHome}
                onClick={() => setOpen(false)}
                className="display-sm border-b border-rule py-4 text-ink"
              >
                {link.label}
              </SectionLink>
            ))}
            <a
              href={profile.cvPath}
              download
              onClick={() => setOpen(false)}
              className="label py-5 text-accent"
            >
              {nav.downloadCv} ↓
            </a>
          </nav>
        </Container>
      </div>
    </header>
  );
}

// Ở trang chủ thì href chỉ có hash, để trình duyệt tự cuộn — đi qua router của
// Next sẽ mất hiệu ứng cuộn mượt. Ở trang khác thì dùng Link để chuyển trang
// phía client thay vì tải lại cả trang.
function SectionLink({
  href,
  samePage,
  onClick,
  className,
  children,
}: {
  href: string;
  samePage: boolean;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}) {
  if (samePage) {
    return (
      <a href={href} onClick={onClick} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

// Mỗi ngôn ngữ một bộ route và slug dự án dùng chung cho cả hai, nên đổi ngôn
// ngữ chỉ là thay đoạn locale ở đầu đường dẫn. Trỏ cứng về "/vi" thì người
// đang đọc một dự án sẽ bị ném về trang chủ, mất đúng chỗ họ đang xem.
function LanguageSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/[^/]*/, "");

  return (
    <div role="group" aria-label={label} className="label flex items-center">
      {locales.map((code, position) => (
        <span key={code} className="flex items-center">
          {position > 0 ? (
            <span aria-hidden="true" className="px-1.5 text-ink-3">
              /
            </span>
          ) : null}
          <Link
            href={`/${code}${rest}`}
            hrefLang={code}
            aria-current={code === locale ? "page" : undefined}
            className={
              code === locale
                ? "text-ink"
                : "text-ink-3 transition-colors hover:text-ink"
            }
          >
            {localeLabels[code]}
          </Link>
        </span>
      ))}
    </div>
  );
}
