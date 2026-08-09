import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

import { isLocale, locales, localeTags } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { profile } from "@/data/profile";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

type Params = { params: Promise<{ locale: string }> };

/**
 * Báo trước cho Next danh sách locale để nó dựng sẵn /en và /vi lúc build.
 * Kết quả là hai file HTML tĩnh — không có server nào phải chạy khi ai đó
 * mở trang, và bot của nhà tuyển dụng đọc được ngay cả khi JavaScript hỏng.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(profile.siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      // hreflang nói với Google rằng hai trang này là cùng một nội dung ở hai
      // ngôn ngữ, chứ không phải nội dung trùng lặp.
      languages: {
        en: "/en",
        "vi-VN": "/vi",
      },
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
  themeColor: "#0a0e13",
};

export default async function LocaleLayout({
  children,
  params,
}: Params & { children: ReactNode }) {
  const { locale } = await params;

  // URL nào không phải /en hay /vi thì trả 404, thay vì render một trang
  // trống không có chữ.
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <html
      lang={localeTags[locale]}
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a href="#main" className="skip-link">
          {dict.meta.skipToContent}
        </a>
        <Header locale={locale} nav={dict.nav} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer footer={dict.footer} contact={dict.contact} />
      </body>
    </html>
  );
}
