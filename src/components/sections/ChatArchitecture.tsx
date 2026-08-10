import type { Dictionary } from "@/i18n/dictionaries";

type Diagram = Dictionary["work"]["diagram"];

// Sơ đồ đường đi của một tin nhắn. SVG viết tay vì giao diện thật là sản phẩm
// nội bộ, không chụp màn hình được. Màu lấy từ design token qua var().
// Đường màu nhấn = chuỗi thời gian thực (CQN → Node → SSE → trình duyệt),
// đường xám = chiều yêu cầu đi ra.
export function ChatArchitecture({ diagram }: { diagram: Diagram }) {
  const { nodes, edges } = diagram;

  return (
    <figure className="mt-8">
      {/* Trên điện thoại sơ đồ hẹp lại thì chữ không đọc nổi, nên cho cuộn
          ngang trong khung riêng thay vì bóp nhỏ. min-w-0 để khung này chịu
          co lại theo cột cha thay vì đẩy cả trang rộng ra. */}
      <div className="min-w-0 overflow-x-auto border border-rule bg-paper-tint p-5">
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
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink-3)" />
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

          {/* Bốn thành phần */}
          <Box x={0} y={64} title={nodes.browser} subtitle={nodes.browserSub} />
          <Box x={260} y={64} title={nodes.apex} subtitle={nodes.apexSub} />
          <Box x={520} y={64} title={nodes.node} subtitle={nodes.nodeSub} />
          <Box x={520} y={230} title={nodes.oracle} subtitle={nodes.oracleSub} />

          {/* Chiều đi ra: trình duyệt gửi tin nhắn */}
          <line
            x1={162}
            y1={99}
            x2={254}
            y2={99}
            stroke="var(--ink-3)"
            strokeWidth={1}
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
            stroke="var(--ink-3)"
            strokeWidth={1}
            markerEnd="url(#arrow-neutral)"
          />
          <EdgeLabel x={468} y={88}>
            {edges.forward}
          </EdgeLabel>

          {/* Node ghi xuống database */}
          <line
            x1={612}
            y1={136}
            x2={612}
            y2={226}
            stroke="var(--ink-3)"
            strokeWidth={1}
            markerEnd="url(#arrow-neutral)"
          />
          <EdgeLabel x={622} y={185} anchor="start">
            {edges.write}
          </EdgeLabel>

          {/* Chuỗi thời gian thực: database đẩy ngược lên Node */}
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

          {/* Node đẩy sự kiện thẳng về trình duyệt qua SSE */}
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

      <figcaption className="mt-4 max-w-[var(--measure)] text-sm leading-relaxed text-ink-3">
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
        rx={0}
        fill="var(--paper)"
        stroke="var(--ink)"
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
        fill="var(--ink-3)"
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
      fill={accent ? "var(--accent)" : "var(--ink-3)"}
      fontSize={10}
    >
      {children}
    </text>
  );
}
