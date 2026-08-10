"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// IntersectionObserver thay vì sự kiện scroll, nên không có hàm nào chạy mỗi
// lần cuộn. disconnect() sau lần đầu: hiệu ứng chỉ chạy một lượt.
// Trạng thái ẩn ban đầu nằm ở class .reveal trong globals.css.
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
