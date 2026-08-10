import type { ReactNode } from "react";
import { Container } from "./Container";

// Đường kẻ đặt NGOÀI Container để chạm mép màn hình, chữ vẫn thụt vào lề.
// Số thứ tự để aria-hidden: trình đọc màn hình đọc thành "không một, Dự án".
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
