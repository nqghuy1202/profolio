import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { locales, defaultLocale } from "@/i18n/config";

// Next phục vụ file này tại /sitemap.xml. Sinh từ `locales` để thêm ngôn ngữ
// thứ ba là sitemap tự có thêm dòng.
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${profile.siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale === defaultLocale ? 1 : 0.8,
  }));
}
