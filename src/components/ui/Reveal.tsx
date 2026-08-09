"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Hiện dần khi cuộn tới.
 *
 * Dùng IntersectionObserver thay vì bắt sự kiện scroll: trình duyệt tự báo
 * khi phần tử lọt vào khung nhìn, nên không có hàm nào chạy mỗi lần cuộn.
 * `observer.disconnect()` ngay sau lần đầu — hiệu ứng chỉ chạy một lượt,
 * cuộn ngược lên rồi xuống lại không lặp lại (lặp lại gây khó chịu).
 *
 * Trạng thái ẩn ban đầu nằm ở class .reveal trong globals.css. Người tắt
 * JavaScript vẫn đọc được trang nhờ thẻ <noscript> trong layout.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Kích hoạt khi phần tử vào sâu 12% khung nhìn, thay vì ngay lúc chạm
      // mép — chạm mép thì hiệu ứng chạy xong trước khi mắt kịp nhìn tới.
      { rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
