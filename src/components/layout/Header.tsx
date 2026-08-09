"use client";

import { useState } from "react";
import Link from "next/link";
import { profile } from "@/data/profile";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { CloseIcon, DownloadIcon, MenuIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";

/**
 * Đây là Client Component vì menu trên điện thoại cần state đóng/mở.
 * Chữ nghĩa nhận qua props chứ không tự gọi getDictionary(), để hai file JSON
 * ngôn ngữ không bị kéo vào bundle gửi xuống trình duyệt.
 */
export function Header({
  locale,
  nav,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "#skills", label: nav.skills },
    { href: "#projects", label: nav.projects },
    { href: "#about", label: nav.about },
    { href: "#contact", label: nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href={`/${locale}`}
            className="font-mono text-sm font-semibold tracking-tight text-ink transition-colors hover:text-accent"
          >
            {profile.shortName}
            <span className="text-accent">.</span>
          </Link>

          {/* Điều hướng cho màn hình rộng */}
          <nav
            aria-label={nav.mainNavigation}
            className="hidden items-center gap-7 md:flex"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitch locale={locale} label={nav.switchLanguage} />

            <a
              href={profile.cvPath}
              download
              className="hidden items-center gap-2 rounded-md border border-line-strong px-3 py-1.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent sm:inline-flex"
            >
              <DownloadIcon />
              {nav.downloadCv}
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
              className="inline-flex items-center justify-center rounded-md border border-line-strong p-2 text-lg text-ink md:hidden"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </Container>

      {/* Menu điện thoại: chỉ render khi mở, để nội dung ẩn không lọt vào
          thứ tự tab của bàn phím. */}
      {menuOpen ? (
        <div id="mobile-menu" className="border-t border-line md:hidden">
          <Container>
            <nav className="flex flex-col py-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-line py-3 text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={profile.cvPath}
                download
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 py-3 text-sm text-accent"
              >
                <DownloadIcon />
                {nav.downloadCv}
              </a>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

/**
 * Trang chỉ có đúng một route cho mỗi ngôn ngữ, nên đổi ngôn ngữ chỉ là đi
 * tới "/vi" hoặc "/en". Không cần đọc pathname hiện tại.
 */
function LanguageSwitch({ locale, label }: { locale: Locale; label: string }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center rounded-md border border-line-strong p-0.5"
    >
      {locales.map((code) => {
        const isActive = code === locale;
        return (
          <Link
            key={code}
            href={`/${code}`}
            hrefLang={code}
            aria-current={isActive ? "true" : undefined}
            className={`rounded px-2 py-1 font-mono text-xs transition-colors ${
              isActive
                ? "bg-accent text-accent-ink"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            {localeLabels[code]}
          </Link>
        );
      })}
    </div>
  );
}
