"use client";

import { useState } from "react";
import Link from "next/link";
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

  const links = [
    { href: "#work", label: nav.projects },
    { href: "#skills", label: nav.skills },
    { href: "#about", label: nav.about },
    { href: "#contact", label: nav.contact },
  ];

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
              <a
                key={link.href}
                href={link.href}
                className="label underline-grow text-ink-2 hover:text-ink"
              >
                {link.label}
              </a>
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
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="display-sm border-b border-rule py-4 text-ink"
              >
                {link.label}
              </a>
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

// Mỗi ngôn ngữ một bộ route, nên đổi ngôn ngữ chỉ là đi tới "/vi" hoặc "/en".
function LanguageSwitch({ locale, label }: { locale: Locale; label: string }) {
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
            href={`/${code}`}
            hrefLang={code}
            aria-current={code === locale ? "true" : undefined}
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
