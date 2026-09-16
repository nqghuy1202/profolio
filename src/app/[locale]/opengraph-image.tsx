import { ImageResponse } from "next/og";
import { isLocale, defaultLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { profile } from "@/data/profile";

// Ảnh xem trước khi dán link. Vẽ bằng code nên sửa tên hay chức danh một chỗ
// là cả hai ngôn ngữ tự đổi theo. Next tự chèn thẻ og:image.

// Dựng sẵn lúc build: đợi lượt chia sẻ đầu tiên mới vẽ thì bot của LinkedIn
// thường đã bỏ cuộc vì chờ lâu.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.fullName} — Full Stack Developer`;

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const name = locale === "vi" ? profile.fullNameVi : profile.fullName;

  // Satori không đọc được var(), nên màu ở đây viết thẳng giá trị.
  // Đổi token trong globals.css thì nhớ đổi cả ở đây.
  const canvas = "#f8fafc";
  const text = "#0f172a";
  const textFaint = "#94a3b8";
  const primary = "#0284c7";
  const primary2 = "#059669";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: canvas,
          color: text,
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: primary,
              backgroundColor: "#ecfdf5",
              padding: "8px 20px",
              borderRadius: 999,
            }}
          >
            {dict.hero.role}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.1em",
              color: textFaint,
            }}
          >
            {locale === "vi" ? "TP. HỒ CHÍ MINH" : "HO CHI MINH CITY"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 104,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            maxWidth: 1000,
          }}
        >
          {name}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              height: 6,
              width: 160,
              borderRadius: 999,
              backgroundImage: `linear-gradient(90deg, ${primary}, ${primary2})`,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 24,
              fontSize: 22,
              letterSpacing: "0.06em",
              color: textFaint,
            }}
          >
            <div style={{ display: "flex" }}>
              Oracle AI Database · Python · React · Go
            </div>
            <div style={{ display: "flex" }}>
              github.com/{profile.githubUser}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
