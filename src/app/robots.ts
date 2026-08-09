import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";

/**
 * Next tự phục vụ file này tại /robots.txt.
 *
 * Cho phép index toàn bộ — mục đích của trang này đúng là được tìm thấy.
 * Chặn /api vì đó là endpoint xử lý, không phải nội dung để đọc.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${profile.siteUrl}/sitemap.xml`,
  };
}
