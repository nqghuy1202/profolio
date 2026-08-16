// Công tắc bật/tắt tính năng.

export const features = {
  // Khối GitHub stats. Tắt tới khi dọn xong các repo cũ trên profile.
  githubStats: false,

  // Ảnh chân dung ở mục Giới thiệu. Bật khi đã đặt file vào
  // public/portrait.jpg — vuông 1:1, mặt nằm giữa khung, đặt ở cỡ 11rem.
  // Ảnh để nguyên màu: đây là ngoại lệ duy nhất của bảng màu giấy–mực–một
  // màu nhấn, nên giữ nó ở cỡ nhỏ để không lấn vai trò dẫn mắt của màu nhấn.
  portrait: true,
} as const;
