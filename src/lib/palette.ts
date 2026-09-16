// Bảng màu xoay vòng cho các khối lặp lại — thẻ dự án, nhóm kỹ năng — để
// trang có nhiều màu như hướng "SaaS hiện đại" đã chọn, mà không cần tự
// nghĩ màu cho từng chỗ.
//
// Chọn theo mệnh Mộc: chỉ dùng tông xanh lá (Mộc, bản mệnh) và xanh
// dương/lục lam (Thủy, sinh Mộc — tương sinh). Không dùng tông trắng/xám
// ánh kim làm màu nổi bật (Kim khắc Mộc), cũng tránh đỏ/cam/tím (Hỏa/không
// thuộc bộ hai hành này) để cả bảng nhất quán về phong thủy.
//
// Chuỗi class phải viết trọn vẹn ở đây (không ghép bằng biến) vì Tailwind
// quét mã nguồn theo chuỗi tĩnh — `bg-${color}-50` sẽ không được nhận ra.
export interface PaletteTone {
  /** Nền nhạt + chữ đậm, dùng cho chip/badge */
  chip: string;
  /** Hai điểm dừng gradient, dùng với bg-gradient-to-br */
  gradientFrom: string;
  gradientTo: string;
  /** Chữ đậm cùng tông, dùng khi cần chữ nổi bật không phải trên nền chip */
  text: string;
  /** Viền nhạt cùng tông */
  ring: string;
  /** Viền trái đậm 4px, dùng cho thẻ dạng timeline */
  borderLeft: string;
}

export const palette: PaletteTone[] = [
  {
    chip: "bg-emerald-50 text-emerald-700",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-500",
    text: "text-emerald-600",
    ring: "ring-emerald-100",
    borderLeft: "border-l-emerald-500",
  },
  {
    chip: "bg-sky-50 text-sky-700",
    gradientFrom: "from-sky-500",
    gradientTo: "to-blue-500",
    text: "text-sky-600",
    ring: "ring-sky-100",
    borderLeft: "border-l-sky-500",
  },
  {
    chip: "bg-teal-50 text-teal-700",
    gradientFrom: "from-teal-500",
    gradientTo: "to-emerald-500",
    text: "text-teal-600",
    ring: "ring-teal-100",
    borderLeft: "border-l-teal-500",
  },
  {
    chip: "bg-blue-50 text-blue-700",
    gradientFrom: "from-blue-500",
    gradientTo: "to-sky-500",
    text: "text-blue-600",
    ring: "ring-blue-100",
    borderLeft: "border-l-blue-500",
  },
  {
    chip: "bg-green-50 text-green-700",
    gradientFrom: "from-green-500",
    gradientTo: "to-emerald-500",
    text: "text-green-600",
    ring: "ring-green-100",
    borderLeft: "border-l-green-500",
  },
  {
    chip: "bg-cyan-50 text-cyan-700",
    gradientFrom: "from-cyan-500",
    gradientTo: "to-sky-500",
    text: "text-cyan-600",
    ring: "ring-cyan-100",
    borderLeft: "border-l-cyan-500",
  },
];

export function toneAt(index: number): PaletteTone {
  return palette[index % palette.length];
}
