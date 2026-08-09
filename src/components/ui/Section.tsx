import type { ReactNode } from "react";
import { Container } from "./Container";

/**
 * Khung chung cho một section của trang.
 *
 * `aria-labelledby` trỏ vào chính thẻ h2 bên trong: trình đọc màn hình liệt
 * kê các vùng của trang theo tiêu đề này, nên người dùng nhảy thẳng tới
 * "Projects" được mà không phải nghe hết trang.
 */
export function Section({
  id,
  title,
  lead,
  children,
}: {
  id: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="border-t border-line py-16 sm:py-24"
    >
      <Container>
        <div className="max-w-2xl">
          <h2
            id={headingId}
            className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          >
            {title}
          </h2>
          {lead ? (
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              {lead}
            </p>
          ) : null}
        </div>
        <div className="mt-10 sm:mt-12">{children}</div>
      </Container>
    </section>
  );
}
