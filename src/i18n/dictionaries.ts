import type { Locale } from "./config";
import en from "./en.json";
import vi from "./vi.json";

/**
 * Kiểu Dictionary được suy ra từ chính file tiếng Anh.
 *
 * Nhờ vậy `Record<Locale, Dictionary>` bên dưới trở thành một phép kiểm tra
 * lúc biên dịch: thêm khoá mới vào en.json mà quên thêm vào vi.json thì
 * `tsc` báo lỗi ngay, không phải đợi tới lúc mở trang mới thấy chữ bị thiếu.
 */
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, vi };

/**
 * Hàm này chỉ được gọi từ Server Component. Giữ nguyên như vậy để hai file
 * JSON không bị gói vào bundle gửi xuống trình duyệt — Client Component nào
 * cần chữ thì nhận qua props.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
