import type { ReactNode } from "react";
import { Container } from "./Container";

// Không còn kẻ chỉ chạy hết bề ngang — bố cục mới dựa vào khoảng trắng và
// card nổi trên nền canvas, không phải đường viền. Số thứ tự đổi từ chữ số
// serif nghiêng sang một huy hiệu tròn tô gradient thương hiệu.
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
    <section id={id} aria-labelledby={`${id}-label`} className="scroll-mt-24">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6 pt-20 sm:pt-28">
          <h2 id={`${id}-label`} className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-2 font-mono text-xs font-bold text-white shadow-sm shadow-primary/30"
            >
              {index}
            </span>
            <span className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
              {label}
            </span>
          </h2>
          {action}
        </div>
      </Container>

      {children}
    </section>
  );
}
