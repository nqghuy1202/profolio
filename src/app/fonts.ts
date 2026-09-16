import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

// Geist — font riêng của Vercel, tự host qua next/font/local (không gọi ra
// Google Fonts lúc build). Từ bản 1.6.0 của gói `geist` đã hỗ trợ đầy đủ dấu
// tiếng Việt, xác nhận trước khi chọn: https://github.com/vercel/geist-font.
//
// Khai báo ở file riêng vì có hai chỗ dựng thẻ <html>: layout theo ngôn ngữ và
// trang 404 toàn cục. Import hai lần vẫn ra cùng một font-face (khác Google
// Fonts, không tạo biến CSS mới mỗi lần gọi), nhưng dùng chung một khai báo
// cho gọn.
//
// Trước đây ở đây là Archivo + IBM Plex Mono. Đổi sang Geist vì đây là hướng
// người dùng chọn cho bản redesign kiểu SaaS hiện đại.

export const geistSans = GeistSans;
export const geistMono = GeistMono;

/** Chuỗi class gắn vào thẻ <html> để hai biến font có hiệu lực toàn trang. */
export const fontVariables = `${geistSans.variable} ${geistMono.variable}`;
