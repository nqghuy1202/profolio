import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { locales, defaultLocale } from "@/i18n/config";

/**
 * Next tự phục vụ file này tại /sitemap.xml.
 *
 * Chỉ có hai URL, nên viết tay cũng được — nhưng sinh từ danh sách `locales`
 * thì thêm ngôn ngữ thứ ba là sitemap tự có thêm dòng, không ai phải nhớ.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${profile.siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale === defaultLocale ? 1 : 0.8,
  }));
}
