// Phần không đổi theo ngôn ngữ: tên riêng, đường dẫn, tài khoản mạng xã hội.
// Mọi câu chữ nằm ở src/i18n/*.json.

export const profile = {
  /** Dạng dùng trong CV tiếng Anh, thứ tự họ trước như trên giấy tờ. */
  fullName: "Huy Nguyen Quoc Gia",
  /** Dạng tiếng Việt, dùng cho thẻ meta khi xem bản vi. */
  fullNameVi: "Nguyễn Quốc Gia Huy",
  /** Tên gọi ngắn, dùng ở Hero và footer. */
  shortName: "Huy Nguyen",

  email: "nqghuy1202@gmail.com",

  githubUser: "nqghuy1202",
  githubUrl: "https://github.com/nqghuy1202",

  /** Repo công khai được trỏ thẳng vào, thay vì trỏ vào trang profile. */
  featuredRepo: "heart_risk_estimator",
  featuredRepoUrl: "https://github.com/nqghuy1202/heart_risk_estimator",

  linkedinUrl: "https://www.linkedin.com/in/huy-nqg",

  /** Bản công khai, không có số điện thoại — bản đầy đủ chỉ nộp trực tiếp. */
  cvPath: "/cv/HuyNguyen_FullStackDeveloper_Resume.pdf",

  /** Mốc bắt đầu tính kinh nghiệm: 07/2024, gồm cả kỳ thực tập. */
  experienceStart: "2024-07",

  /** Đổi khi mua tên miền riêng. Dùng cho canonical URL và ảnh Open Graph. */
  siteUrl: "https://huynguyen.vercel.app",
} as const;

/** Số năm kinh nghiệm, tính từ experienceStart để không phải sửa tay mỗi năm. */
export function yearsOfExperience(now: Date = new Date()): number {
  const [year, month] = profile.experienceStart.split("-").map(Number);
  const months =
    (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
  return Math.max(1, Math.floor(months / 12));
}
