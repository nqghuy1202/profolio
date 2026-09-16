import type { ReactNode } from "react";

// Mảnh dùng chung cho mọi sơ đồ kiến trúc SVG viết tay của trang (chat,
// AI assistant, các dự án ERP không có ảnh chụp). Gom về một chỗ để ba
// component không lặp lại cùng một khối <defs>/Box/EdgeLabel — sửa một nơi,
// mọi sơ đồ đổi theo. Bo góc + màu gradient thương hiệu, khớp với hướng
// "SaaS hiện đại" của phần còn lại trên trang.

const INK = "#334155"; // slate-700 — viền/chữ box thường
const MUTED = "#94a3b8"; // slate-400 — chữ phụ, mũi tên thường
const PRIMARY = "#059669"; // emerald-600 — box/mũi tên có gác chắn, đường chính
const SURFACE = "#ffffff";

/** Khối mũi tên dùng chung, tham chiếu bằng #arrow-neutral / #arrow-accent. */
export function ArrowDefs() {
  return (
    <defs>
      <marker
        id="arrow-neutral"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={MUTED} />
      </marker>
      <marker
        id="arrow-accent"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={PRIMARY} />
      </marker>
    </defs>
  );
}

export function Box({
  x,
  y,
  title,
  subtitle,
  width = 160,
  height = 70,
  accent = false,
}: {
  x: number;
  y: number;
  title: string;
  subtitle?: string;
  width?: number;
  height?: number;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={14}
        fill={SURFACE}
        stroke={accent ? PRIMARY : "#e2e8f0"}
        strokeWidth={accent ? 2 : 1.5}
      />
      <text
        x={x + width / 2}
        y={y + (subtitle ? height / 2 - 6 : height / 2 + 4)}
        textAnchor="middle"
        fill={INK}
        fontSize={13}
        fontWeight={700}
      >
        {title}
      </text>
      {subtitle ? (
        <text
          x={x + width / 2}
          y={y + height / 2 + 14}
          textAnchor="middle"
          fill={MUTED}
          fontSize={10}
        >
          {subtitle}
        </text>
      ) : null}
    </g>
  );
}

export function EdgeLabel({
  x,
  y,
  anchor = "middle",
  accent = false,
  children,
}: {
  x: number;
  y: number;
  anchor?: "start" | "middle" | "end";
  accent?: boolean;
  children: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill={accent ? PRIMARY : MUTED}
      fontSize={10}
      fontWeight={accent ? 600 : 400}
    >
      {children}
    </text>
  );
}

/** Khung figure/svg/figcaption dùng chung — cuộn ngang trên điện thoại thay vì
 *  bóp nhỏ chữ tới mức không đọc nổi. */
export function DiagramFrame({
  titleId,
  descId,
  title,
  caption,
  viewBox,
  minWidth = 560,
  children,
}: {
  titleId: string;
  descId: string;
  title: string;
  caption: string;
  viewBox: string;
  minWidth?: number;
  children: ReactNode;
}) {
  return (
    <figure>
      <div className="min-w-0 overflow-x-auto rounded-2xl border border-border bg-gradient-to-br from-sky-50/60 via-surface to-emerald-50/60 p-5">
        <svg
          viewBox={viewBox}
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
          className="h-auto w-full"
          style={{ minWidth }}
        >
          <title id={titleId}>{title}</title>
          <desc id={descId}>{caption}</desc>
          <ArrowDefs />
          {children}
        </svg>
      </div>
      <figcaption className="mt-4 max-w-[var(--measure)] text-sm leading-relaxed text-text-3">
        {caption}
      </figcaption>
    </figure>
  );
}
