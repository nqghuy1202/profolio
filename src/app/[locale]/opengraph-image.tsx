import { ImageResponse } from "next/og";
import { isLocale, defaultLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { profile } from "@/data/profile";

/**
 * Ảnh xem trước khi dán link vào LinkedIn, Zalo, Slack hay Messenger.
 *
 * Vẽ bằng code thay vì thiết kế sẵn một file PNG: sửa tên hay chức danh ở
 * một chỗ là ảnh tự đổi theo, và mỗi ngôn ngữ có một ảnh riêng mà không phải
 * xuất tay hai lần.
 *
 * Next tự dò thấy file này và tự chèn thẻ og:image — không phải khai báo thêm.
 */

/** Dựng sẵn ảnh cho cả hai ngôn ngữ lúc build, thay vì đợi lượt chia sẻ đầu
 *  tiên mới vẽ — lúc đó bot của LinkedIn thường đã bỏ cuộc vì chờ lâu. */
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

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0a0e13",
          padding: "80px",
          // Satori không hiểu var(), nên màu ở đây viết thẳng giá trị.
          // Đổi token trong globals.css thì nhớ đổi cả ở đây.
          borderTop: "10px solid #2dd4bf",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#2dd4bf",
            fontFamily: "monospace",
            letterSpacing: "0.08em",
          }}
        >
          {dict.hero.role.toUpperCase()}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: "#e6edf3",
            marginTop: 20,
          }}
        >
          {name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#94a3b1",
            marginTop: 28,
            lineHeight: 1.4,
            maxWidth: 900,
          }}
        >
          Oracle · PL/SQL · Node.js · React
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#64748b",
            marginTop: "auto",
            fontFamily: "monospace",
          }}
        >
          github.com/{profile.githubUser}
        </div>
      </div>
    ),
    size,
  );
}
