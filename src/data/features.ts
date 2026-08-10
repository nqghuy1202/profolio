// Công tắc bật/tắt tính năng.

export const features = {
  // Khối GitHub stats. Tắt tới khi dọn xong các repo cũ trên profile.
  githubStats: false,

  // Ảnh chân dung ở mục Giới thiệu. Bật khi đã đặt file vào
  // public/portrait.jpg — dọc 4:5, nền đơn sắc; trang tự chuyển sang trắng đen.
  portrait: false,
} as const;
