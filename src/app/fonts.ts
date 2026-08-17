import { Archivo, IBM_Plex_Mono } from "next/font/google";

// Archivo cho chữ đọc, IBM Plex Mono cho nhãn và số. Cả hai phải nạp subset
// `vietnamese`, nếu không dấu tiếng Việt rơi sang font dự phòng của hệ điều
// hành.
//
// Khai báo ở file riêng vì có hai chỗ dựng thẻ <html>: layout theo ngôn ngữ và
// trang 404 toàn cục. Gọi next/font hai lần với cùng tham số vẫn ra hai biến
// CSS khác nhau, nên phải dùng chung đúng một khai báo.
//
// Từng có Instrument Serif ở đây, chỉ để đặt chữ số thứ tự. Một bộ chữ 15,7KB
// cho khoảng mười ký tự là cái giá không đáng, nên chữ số nay dùng Georgia —
// có sẵn trên máy người xem, cũng là serif, cũng nghiêng được.

export const archivo = Archivo({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-archivo",
  display: "swap",
});

// Chỉ nạp độ đậm 500. Đây là độ đậm của .label, tức gần như mọi chữ mono trên
// trang. Nạp thêm 400 tốn thêm ba file (~22,9KB) cho đúng một dòng GPA.
export const plexMono = IBM_Plex_Mono({
  weight: "500",
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-plex-mono",
  display: "swap",
});

/** Chuỗi class gắn vào thẻ <html> để hai biến font có hiệu lực toàn trang. */
export const fontVariables = `${archivo.variable} ${plexMono.variable}`;
