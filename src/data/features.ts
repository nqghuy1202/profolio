// Công tắc bật/tắt tính năng.

export const features = {
  // Khối GitHub stats. Tắt tới khi dọn xong các repo cũ trên profile.
  githubStats: false,

  // Ảnh chân dung cạnh tên ở Hero, đọc từ public/portrait.jpg.
  // Ảnh thay thế phải vuông, nếu không vòng tròn sẽ cắt lệch khuôn mặt.
  portrait: true,
} as const;
