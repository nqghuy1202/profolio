import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../globals.css";

import { fontVariables } from "../fonts";
import { isLocale, locales, localeTags, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { profile } from "@/data/profile";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

type Params = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Chỉ có đúng hai ngôn ngữ, nên đoạn locale nào khác thì không có gì để dựng.
// Chặn ở đây để "/fr" rơi thẳng vào trang 404 đã prerender, thay vì render
// động rồi ném notFound() — kiểu đó làm hỏng shell SSR và trang lỗi về tay
// người xem ở dạng trắng trơn, phải đợi JavaScript mới thấy chữ.
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return { robots: { index: false, follow: false } };

  const locale = raw;
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
  themeColor: "#f8fafc",
};

export default async function LocaleLayout({
  children,
  params,
}: Params & { children: ReactNode }) {
  const { locale: raw } = await params;

  // Cố ý KHÔNG gọi notFound() ở đây. Layout mà tự ném lỗi thì ranh giới bắt
  // lỗi nằm CAO HƠN nó, nên trang 404 sẽ hiện ra trần trụi — không header,
  // không footer, không font. Layout cứ dựng khung bằng ngôn ngữ mặc định,
  // còn việc báo 404 để page.tsx làm, khi đó trang lỗi nằm gọn trong khung.
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <html
      lang={localeTags[locale]}
      className={`${fontVariables} h-full`}
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
      <body className="flex min-h-full flex-col bg-canvas text-text">
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
