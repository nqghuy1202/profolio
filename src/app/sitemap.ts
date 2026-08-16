import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { locales, defaultLocale } from "@/i18n/config";
import { projects } from "@/data/projects";

// Next phục vụ file này tại /sitemap.xml. Sinh từ `locales` và `projects`, nên
// thêm ngôn ngữ thứ ba hay thêm một dự án là sitemap tự có thêm dòng.
export default function sitemap(): MetadataRoute.Sitemap {
  const home = locales.map((locale) => ({
    url: `${profile.siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale === defaultLocale ? 1 : 0.8,
  }));

  // Trang dự án là phần nội dung dày nhất của trang. Bỏ chúng ra khỏi sitemap
  // thì thứ duy nhất khai báo với công cụ tìm kiếm lại là hai trang chủ.
  const work = locales.flatMap((locale) =>
    projects.map((project) => ({
      url: `${profile.siteUrl}/${locale}/work/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: locale === defaultLocale ? 0.7 : 0.6,
    })),
  );

  return [...home, ...work];
}
