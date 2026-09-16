import type { Dictionary } from "@/i18n/dictionaries";
import { Box, DiagramFrame, EdgeLabel } from "./diagrams/primitives";

type Diagram = Dictionary["work"]["diagrams"]["chat"];

// Sơ đồ đường đi của một tin nhắn. SVG viết tay vì giao diện thật là sản phẩm
// nội bộ, không chụp màn hình được. Màu lấy từ design token qua var().
// Đường màu nhấn = chuỗi thời gian thực (CQN → Node → SSE → trình duyệt),
// đường xám = chiều yêu cầu đi ra.
export function ChatArchitecture({ diagram }: { diagram: Diagram }) {
  const { nodes, edges } = diagram;

  return (
    <DiagramFrame
      titleId="chat-arch-title"
      descId="chat-arch-desc"
      title={diagram.title}
      caption={diagram.caption}
      viewBox="0 0 680 330"
    >
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
        stroke="#94a3b8"
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
        stroke="#94a3b8"
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
        stroke="#94a3b8"
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
        stroke="#059669"
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
        stroke="#059669"
        strokeWidth={1.5}
        strokeDasharray="5 4"
        markerEnd="url(#arrow-accent)"
      />
      <EdgeLabel x={340} y={18} accent>
        {edges.stream}
      </EdgeLabel>
    </DiagramFrame>
  );
}
