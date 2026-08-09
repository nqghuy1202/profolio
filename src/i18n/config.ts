/**
 * Cấu hình đa ngôn ngữ.
 *
 * Cố ý không dùng thư viện i18n nào. Trang này chỉ có hai ngôn ngữ và một
 * route, nên toàn bộ nhu cầu gói gọn trong: một danh sách locale, một hàm
 * nạp file JSON, và segment [locale] của App Router. Thêm thư viện vào đây
 * là thêm một lớp phải giải thích mà không đổi lại được gì.
 */

export const locales = ["en", "vi"] as const;

export type Locale = (typeof locales)[number];

/** Locale dùng khi URL không chỉ rõ (vd. người dùng mở thẳng "/"). */
export const defaultLocale: Locale = "en";

/** Nhãn hiển thị trên nút chuyển ngôn ngữ. */
export const localeLabels: Record<Locale, string> = {
  en: "EN",
  vi: "VI",
};

/** Mã ngôn ngữ đầy đủ cho thuộc tính lang= và thẻ hreflang. */
export const localeTags: Record<Locale, string> = {
  en: "en",
  vi: "vi-VN",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
