import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Archivo, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

import { isLocale, locales, localeTags } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { profile } from "@/data/profile";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * Ba bộ chữ, mỗi bộ một việc — đúng cách một trang tạp chí xếp chữ:
 *
 *   Archivo         grotesque, gánh toàn bộ chữ đọc và chữ hiển thị cỡ lớn
 *   IBM Plex Mono   nhãn chữ hoa, con số, tên công nghệ
 *   Instrument Serif serif nghiêng, CHỈ dùng cho chữ số thứ tự
 *
 * Hai bộ đầu phải nạp bộ ký tự `vietnamese`, nếu không dấu tiếng Việt sẽ rơi
 * sang font dự phòng của hệ điều hành và lộ ra ngay. Bộ serif thì không cần —
 * nó chỉ đặt chữ số, mà chữ số thì không có dấu.
 */
const archivo = Archivo({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-plex-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

type Params = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(profile.siteUrl),
    title: {
      default: dict.meta.title,
      template: `%s — ${profile.fullName}`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", "vi-VN": "/vi" },
    },
    openGraph: {
      type: "profile",
      locale: localeTags[locale],
      url: `/${locale}`,
      title: dict.meta.title,
      description: dict.meta.description,
      siteName: profile.fullName,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#fbfaf8",
};

export default async function LocaleLayout({
  children,
  params,
}: Params & { children: ReactNode }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <html
      lang={localeTags[locale]}
      className={`${archivo.variable} ${plexMono.variable} ${instrumentSerif.variable} h-full`}
    >
      <head>
        {/* Hiệu ứng hiện dần khi cuộn bắt đầu ở trạng thái trong suốt. Người
            tắt JavaScript sẽ không có gì bật nó lên, nên ghi đè ở đây — thà
            mất hiệu ứng còn hơn mất nội dung. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: ".reveal{opacity:1 !important;transform:none !important}",
            }}
          />
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <a href="#main" className="skip-link">
          {dict.meta.skipToContent}
        </a>
        <Header locale={locale} nav={dict.nav} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer footer={dict.footer} contact={dict.contact} locale={locale} />
      </body>
    </html>
  );
}
