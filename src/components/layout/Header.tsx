"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

// Thanh điều hướng nổi: bo góc, đổ bóng nhẹ, kính mờ — cách một khoảng với
// mép trên thay vì dính liền, cho cảm giác "floating nav" của các trang SaaS.
// Vẫn là Client Component vì menu điện thoại cần state đóng/mở.
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
    <header className="sticky top-0 z-50 px-3 pt-3 sm:top-4 sm:px-6">
      <div className="mx-auto max-w-[var(--content)] rounded-2xl border border-border bg-surface/90 shadow-sm backdrop-blur-md">
        <div className="flex h-16 items-center justify-between gap-6 px-4 sm:px-6">
          <Link
            href={`/${locale}`}
            className="text-base font-extrabold tracking-tight text-text"
          >
            Huy Nguyen<span className="gradient-text">.</span>
          </Link>

          <nav
            aria-label={nav.mainNavigation}
            className="hidden items-center gap-1 md:flex"
          >
            {links.map((link) => (
              <SectionLink
                key={link.href}
                href={link.href}
                samePage={onHome}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-text-2 transition-colors hover:bg-surface-2 hover:text-text"
              >
                {link.label}
              </SectionLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <LanguageSwitch locale={locale} label={nav.switchLanguage} />

            <a
              href={profile.cvPath}
              download
              className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-primary-2 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-primary/30 transition hover:shadow-md hover:shadow-primary/40 sm:inline-flex"
            >
              {nav.downloadCv}
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-text transition-colors hover:bg-surface-2 md:hidden"
            >
              <span className="sr-only">{open ? nav.close : nav.menu}</span>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/*
          Menu luôn nằm trong DOM để trượt ra có chuyển động thật, nhưng khi
          đóng thì gắn `inert` — thuộc tính này gỡ toàn bộ phần tử bên trong
          khỏi thứ tự tab và khỏi trình đọc màn hình. Chỉ dùng `opacity: 0`
          thì link vẫn bấm được bằng phím Tab dù mắt không thấy.
        */}
        <div
          id="mobile-menu"
          inert={!open}
          className={`overflow-hidden border-t border-border transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav
            aria-label={nav.mainNavigation}
            className="flex flex-col gap-1 p-3"
          >
            {links.map((link) => (
              <SectionLink
                key={link.href}
                href={link.href}
                samePage={onHome}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-semibold text-text transition-colors hover:bg-surface-2"
              >
                {link.label}
              </SectionLink>
            ))}
            <a
              href={profile.cvPath}
              download
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-primary-2 px-4 py-3 text-base font-semibold text-white shadow-sm"
            >
              {nav.downloadCv}
            </a>
          </nav>
        </div>
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
    <div
      role="group"
      aria-label={label}
      className="flex items-center gap-0.5 rounded-full bg-surface-2 p-1 text-xs font-semibold"
    >
      {locales.map((code) => (
        <Link
          key={code}
          href={`/${code}${rest}`}
          hrefLang={code}
          aria-current={code === locale ? "page" : undefined}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            code === locale
              ? "bg-surface text-text shadow-sm"
              : "text-text-3 hover:text-text-2"
          }`}
        >
          {localeLabels[code]}
        </Link>
      ))}
    </div>
  );
}
