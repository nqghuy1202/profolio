import type { ReactNode } from "react";

/**
 * Giới hạn chiều rộng nội dung và tạo lề hai bên.
 *
 * Chiều rộng lấy từ token --content-width nên đổi một chỗ là đổi cả trang.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--content-width)] px-5 sm:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
