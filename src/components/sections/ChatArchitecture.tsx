import type { Dictionary } from "@/i18n/dictionaries";

type Diagram = Dictionary["projects"]["diagram"];

/**
 * Sơ đồ đường đi của một tin nhắn trong hệ chat.
 *
 * Vẽ bằng SVG viết tay thay vì ảnh chụp màn hình, vì hai lý do:
 * giao diện thật là sản phẩm nội bộ của công ty nên không chụp được, và một
 * sơ đồ nói được điều mà ảnh chụp không nói: vì sao trình duyệt không gọi
 * thẳng service Node.
 *
 * Màu lấy từ chính design token qua var(), nên sơ đồ tự khớp với phần còn
 * lại của trang mà không phải khai báo màu lần thứ hai.
 *
 * Đường màu nhấn là chuỗi thời gian thực (CQN → Node → SSE → trình duyệt);
 * đường xám là chiều yêu cầu đi ra. Tách màu để mắt bắt được phần khó trước.
 */
export function ChatArchitecture({ diagram }: { diagram: Diagram }) {
  const { nodes, edges } = diagram;

  return (
    <figure className="mt-6">
      {/* Trên điện thoại sơ đồ hẹp lại thì chữ không đọc nổi, nên cho cuộn
          ngang trong khung riêng thay vì bóp nhỏ. */}
      <div className="min-w-0 overflow-x-auto rounded-lg border border-line bg-canvas-subtle p-4">
        <svg
          viewBox="0 0 680 330"
          role="img"
          aria-labelledby="chat-arch-title chat-arch-desc"
          className="h-auto w-full min-w-[560px]"
        >
          <title id="chat-arch-title">{diagram.chatTitle}</title>
          <desc id="chat-arch-desc">{diagram.chatCaption}</desc>

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
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--line-strong)" />
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
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* --- Bốn thành phần --- */}
          <Box x={0} y={64} title={nodes.browser} subtitle={nodes.browserSub} />
          <Box x={260} y={64} title={nodes.apex} subtitle={nodes.apexSub} />
          <Box x={520} y={64} title={nodes.node} subtitle={nodes.nodeSub} />
          <Box x={520} y={230} title={nodes.oracle} subtitle={nodes.oracleSub} />

          {/* --- Chiều đi ra: trình duyệt gửi tin nhắn --- */}
          <line
            x1={162}
            y1={99}
            x2={254}
            y2={99}
            stroke="var(--line-strong)"
            strokeWidth={1.5}
            markerEnd="url(#arrow-neutral)"
          />
          <EdgeLabel x={208} y={88}>
            {edges.send}
          </EdgeLabel>

          <line
            x1={422}
            y1={99}
            x2={514}
            y2={99}
            stroke="var(--line-strong)"
            strokeWidth={1.5}
            markerEnd="url(#arrow-neutral)"
          />
          <EdgeLabel x={468} y={88}>
            {edges.forward}
          </EdgeLabel>

          {/* --- Node ghi xuống database --- */}
          <line
            x1={612}
            y1={136}
            x2={612}
            y2={226}
            stroke="var(--line-strong)"
            strokeWidth={1.5}
            markerEnd="url(#arrow-neutral)"
          />
          <EdgeLabel x={622} y={185} anchor="start">
            {edges.write}
          </EdgeLabel>

          {/* --- Chuỗi thời gian thực: database đẩy ngược lên Node --- */}
          <line
            x1={588}
            y1={226}
            x2={588}
            y2={138}
            stroke="var(--accent)"
            strokeWidth={1.5}
            markerEnd="url(#arrow-accent)"
          />
          <EdgeLabel x={578} y={185} anchor="end" accent>
            {edges.notify}
          </EdgeLabel>

          {/* --- Node đẩy sự kiện thẳng về trình duyệt qua SSE --- */}
          <path
            d="M 600 62 L 600 26 L 80 26 L 80 60"
            fill="none"
            stroke="var(--accent)"
            strokeWidth={1.5}
            strokeDasharray="5 4"
            markerEnd="url(#arrow-accent)"
          />
          <EdgeLabel x={340} y={18} accent>
            {edges.stream}
          </EdgeLabel>
        </svg>
      </div>

      <figcaption className="mt-3 text-xs leading-relaxed text-ink-faint">
        {diagram.chatCaption}
      </figcaption>
    </figure>
  );
}

function Box({
  x,
  y,
  title,
  subtitle,
}: {
  x: number;
  y: number;
  title: string;
  subtitle: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={160}
        height={70}
        rx={10}
        fill="var(--surface)"
        stroke="var(--line-strong)"
        strokeWidth={1}
      />
      <text
        x={x + 80}
        y={y + 30}
        textAnchor="middle"
        fill="var(--ink)"
        fontSize={13}
        fontWeight={600}
      >
        {title}
      </text>
      <text
        x={x + 80}
        y={y + 50}
        textAnchor="middle"
        fill="var(--ink-faint)"
        fontSize={10}
      >
        {subtitle}
      </text>
    </g>
  );
}

function EdgeLabel({
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
      fill={accent ? "var(--accent)" : "var(--ink-faint)"}
      fontSize={10}
    >
      {children}
    </text>
  );
}
