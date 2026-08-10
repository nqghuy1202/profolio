import type { Locale } from "./config";
import en from "./en.json";
import vi from "./vi.json";

// Suy kiểu từ chính en.json, nên `Record<Locale, Dictionary>` bên dưới thành
// một phép kiểm tra lúc biên dịch: thêm khoá vào en.json mà quên vi.json thì
// tsc báo lỗi ngay.
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, vi };

// Chỉ gọi từ Server Component, để hai file JSON không bị gói vào bundle gửi
// xuống trình duyệt. Client Component nào cần chữ thì nhận qua props.
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
