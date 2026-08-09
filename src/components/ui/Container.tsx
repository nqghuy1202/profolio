import type { ReactNode } from "react";

/**
 * Giới hạn bề rộng nội dung.
 *
 * Lưu ý: kẻ chỉ ngăn cách các section KHÔNG đi qua component này — chúng chạy
 * hết bề ngang màn hình. Đó là chi tiết làm nên chất tạp chí: chữ thì thụt
 * vào lề, còn đường kẻ thì chạm tới mép giấy.
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
      className={`mx-auto w-full max-w-[var(--content)] px-6 sm:px-10 ${className}`}
    >
      {children}
    </div>
  );
}
