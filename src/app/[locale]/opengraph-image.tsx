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
  const paper = "#fbfaf8";
  const ink = "#14110f";
  const inkFaint = "#857e76";
  const accent = "#a0522d";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: paper,
          color: ink,
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.18em",
              color: accent,
            }}
          >
            {dict.hero.role.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.18em",
              color: inkFaint,
            }}
          >
            {locale === "vi" ? "TP. HỒ CHÍ MINH" : "HO CHI MINH CITY"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            textTransform: "uppercase",
            maxWidth: 1000,
          }}
        >
          {name}
        </div>

        {/* Đường kẻ chỉ chạy hết bề ngang — chi tiết định hình của cả trang */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 1, backgroundColor: ink }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 24,
              fontSize: 22,
              letterSpacing: "0.14em",
              color: inkFaint,
            }}
          >
            <div style={{ display: "flex" }}>
              ORACLE · PL/SQL · NODE.JS · REACT
            </div>
            <div style={{ display: "flex" }}>
              GITHUB.COM/{profile.githubUser.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
