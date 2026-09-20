import { Plus_Jakarta_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";

// Plus Jakarta Sans — font chữ chính, thay cho Geist (đổi 17/09/2026: Geist
// đọc quá giống "font mặc định của công cụ dev", ít dấu ấn riêng cho một
// portfolio cá nhân). Variable font, subset "vietnamese" xác nhận đủ dấu:
// https://fonts.google.com/specimen/Plus+Jakarta+Sans. Dải weight 200–800
// rộng hơn Geist Sans, đủ để tạo phân cấp đậm/nhạt rõ giữa các cấp chữ thay
// vì gần như mọi heading/tiêu đề card đều dùng chung một mức đậm.
//
// Vẫn giữ Geist Mono cho các nhãn/ngày tháng dùng font-mono — phần chữ đó
// chỉ mang tính trang trí nhỏ, không cần đổi cùng lúc với font chính.
//
// Khai báo ở file riêng vì có hai chỗ dựng thẻ <html>: layout theo ngôn ngữ và
// trang 404 toàn cục — dùng chung một khai báo cho gọn.

export const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});
export const geistMono = GeistMono;

/** Chuỗi class gắn vào thẻ <html> để hai biến font có hiệu lực toàn trang. */
export const fontVariables = `${sansFont.variable} ${geistMono.variable}`;
