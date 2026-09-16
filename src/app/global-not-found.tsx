import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import "./globals.css";

import { fontVariables } from "./fonts";
import { locales, localeTags } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";

// Trang 404 duy nhất của cả site. Nó thay thế TOÀN BỘ tài liệu, nên phải tự
// dựng <html> và <body> — layout theo ngôn ngữ không bọc quanh nó.
//
// Vì thay cả tài liệu, nó cũng không có cách nào biết người xem đang đọc bản
// tiếng Anh hay tiếng Việt: địa chỉ dẫn tới đây vốn không khớp route nào, kể
// cả đoạn /en hay /vi ở đầu. Nên trang này để song ngữ, thay vì đoán một
// ngôn ngữ rồi đoán sai với một nửa số người ghé qua.

export const metadata: Metadata = {
  title: "404",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f8fafc",
};

export default function GlobalNotFound() {
  return (
    <html lang={localeTags[locales[0]]} className={`${fontVariables} h-full`}>
      <body className="flex min-h-full flex-col bg-canvas text-text">
        <main className="flex-1">
          <Container>
            <div className="max-w-[var(--measure)] py-24 sm:py-32">
              <p className="gradient-text text-7xl font-extrabold tracking-tight">
                404
              </p>

              <div className="mt-10 space-y-6">
                {locales.map((locale) => {
                  const copy = getDictionary(locale).notFound;

                  return (
                    <div
                      key={locale}
                      className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
                    >
                      <p className="font-mono text-xs font-semibold tracking-wide text-text-3 uppercase">
                        {localeTags[locale]}
                      </p>

                      <h1 lang={localeTags[locale]} className="mt-3 text-2xl font-bold text-text">
                        {copy.title}
                      </h1>

                      <p
                        lang={localeTags[locale]}
                        className="mt-3 text-base leading-[1.7] text-text-2"
                      >
                        {copy.lead}
                      </p>

                      <Link
                        href={`/${locale}`}
                        hrefLang={locale}
                        lang={localeTags[locale]}
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-deep hover:underline"
                      >
                        {copy.backHome}
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </main>
      </body>
    </html>
  );
}
