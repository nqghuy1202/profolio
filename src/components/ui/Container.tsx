import type { ReactNode } from "react";

// Giới hạn bề rộng nội dung. Kẻ chỉ ngăn cách section KHÔNG đi qua đây —
// chúng phải chạy hết bề ngang màn hình.
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--content)] px-6 sm:px-10 ${className}`}
    >
      {children}
    </div>
  );
}
