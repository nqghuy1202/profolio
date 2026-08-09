/**
 * Thông tin định danh — phần không đổi theo ngôn ngữ.
 *
 * Mọi câu chữ nằm ở src/i18n/*.json. File này chỉ giữ những giá trị mà dịch
 * sang tiếng Việt cũng không khác đi: tên riêng, đường dẫn, tay cầm mạng xã hội.
 */

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

  /**
   * Bản CV công khai — cố ý KHÔNG có số điện thoại. Bản đầy đủ dùng để nộp
   * trực tiếp, không đặt lên web cho bot quét.
   */
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
