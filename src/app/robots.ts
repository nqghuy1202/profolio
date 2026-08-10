import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";

// Next phục vụ file này tại /robots.txt. Chặn /api vì đó là endpoint xử lý,
// không phải nội dung để index.
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
