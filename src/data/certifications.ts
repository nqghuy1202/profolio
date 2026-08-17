// Phần không đổi theo ngôn ngữ: tên chứng chỉ, đơn vị cấp, ngày cấp, link xác
// thực. Tên chứng chỉ và đơn vị cấp là danh từ riêng nên không dịch — giữ
// nguyên bản gốc ở cả hai ngôn ngữ, cùng quy ước với profile.ts.

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  /** Hiển thị nguyên văn, ví dụ "Aug 2026" — không parse thành Date. */
  date: string;
  credentialUrl?: string;
}

export const certifications: Certification[] = [
  {
    id: "awsCloudQuestPractitioner",
    name: "AWS Cloud Quest: Cloud Practitioner — Training Badge",
    issuer: "Amazon Web Services (AWS)",
    date: "Aug 2026",
  },
];
