import type { Metadata, Viewport } from "next";
import Link from "next/link";
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
  themeColor: "#fbfaf8",
};

export default function GlobalNotFound() {
  return (
    <html lang={localeTags[locales[0]]} className={`${fontVariables} h-full`}>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <main className="flex-1">
          <Container>
            <div className="max-w-[var(--measure)] py-20 sm:py-28">
              <p className="numeral text-6xl leading-none text-accent">404</p>

              <div className="mt-10 border-t border-rule-ink">
                {locales.map((locale) => {
                  const copy = getDictionary(locale).notFound;

                  return (
                    <div key={locale} className="border-b border-rule py-8">
                      <p className="label text-ink-3">{localeTags[locale]}</p>

                      <h1
                        lang={localeTags[locale]}
                        className="display-sm mt-4 text-ink"
                      >
                        {copy.title}
                      </h1>

                      <p
                        lang={localeTags[locale]}
                        className="mt-4 text-base leading-[1.7] text-ink-2"
                      >
                        {copy.lead}
                      </p>

                      <Link
                        href={`/${locale}`}
                        hrefLang={locale}
                        lang={localeTags[locale]}
                        className="label underline-grow mt-6 inline-block text-accent"
                      >
                        {copy.backHome} →
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
