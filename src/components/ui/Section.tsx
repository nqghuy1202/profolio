import type { ReactNode } from "react";
import { Container } from "./Container";

/**
 * Khung một section.
 *
 * Cấu trúc lấy từ trang tạp chí: một đường kẻ đậm chạy hết bề ngang, rồi một
 * hàng chạy đầu mục gồm số thứ tự và tên mục, rồi một đường kẻ mảnh, rồi mới
 * tới nội dung. Đường kẻ nằm NGOÀI Container nên nó chạm tới mép màn hình,
 * còn chữ thì vẫn thụt vào lề.
 *
 * Số thứ tự đặt aria-hidden: nó là ký hiệu thị giác, trình đọc màn hình đọc
 * lên thành "không một, Dự án" thì chỉ tổ rối.
 */
export function Section({
  id,
  index,
  label,
  action,
  children,
}: {
  id: string;
  index: string;
  label: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-label`}>
      <div className="border-t border-rule-ink">
        <Container>
          <div className="flex items-baseline justify-between gap-6 py-4">
            <h2 id={`${id}-label`} className="flex items-baseline gap-4">
              <span aria-hidden="true" className="numeral text-lg text-accent">
                {index}
              </span>
              <span className="label text-ink">{label}</span>
            </h2>
            {action}
          </div>
        </Container>
      </div>

      <div className="border-t border-rule">{children}</div>
    </section>
  );
}
