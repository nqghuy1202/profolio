import type { Dictionary } from "@/i18n/dictionaries";
import { Box, DiagramFrame, EdgeLabel } from "./diagrams/primitives";

type Diagram = Dictionary["work"]["diagrams"]["aiAssistant"];

// Sơ đồ hai đường đi có gác chắn: router phân loại ý định rồi rẽ sang RAG
// (đọc) hoặc NL→SQL có xác nhận (ghi), cả hai cùng chạm Oracle AI Database.
// Đường trả lời (accent, nét đứt) vẽ riêng để nhấn: dù đi đường nào, người
// dùng luôn nhận lại câu trả lời qua cùng một chỗ, chứ không phải một API
// ghi trực tiếp trả về "đã sửa xong".
export function AiAssistantArchitecture({ diagram }: { diagram: Diagram }) {
  const { nodes, edges } = diagram;

  return (
    <DiagramFrame
      titleId="ai-arch-title"
      descId="ai-arch-desc"
      title={diagram.title}
      caption={diagram.caption}
      viewBox="0 0 900 360"
      minWidth={640}
    >
      <Box x={0} y={145} width={170} height={70} title={nodes.user} subtitle={nodes.userSub} />
      <Box x={210} y={145} width={170} height={70} title={nodes.router} subtitle={nodes.routerSub} />
      <Box x={460} y={30} width={200} height={70} title={nodes.rag} subtitle={nodes.ragSub} />
      <Box x={460} y={260} width={200} height={70} title={nodes.nl2sql} subtitle={nodes.nl2sqlSub} accent />
      <Box x={710} y={145} width={190} height={70} title={nodes.db} subtitle={nodes.dbSub} />

      {/* Khách hàng hỏi router */}
      <line x1={170} y1={180} x2={206} y2={180} stroke="#94a3b8" strokeWidth={1} markerEnd="url(#arrow-neutral)" />
      <EdgeLabel x={188} y={170}>{edges.ask}</EdgeLabel>

      {/* Router rẽ lên RAG (đọc) */}
      <line x1={380} y1={160} x2={456} y2={72} stroke="#94a3b8" strokeWidth={1} markerEnd="url(#arrow-neutral)" />
      <EdgeLabel x={400} y={105}>{edges.routeRag}</EdgeLabel>

      {/* Router rẽ xuống NL→SQL (ghi) — vẽ bằng màu nhấn để đánh dấu đây là
          đường có gác chắn, khác hẳn đường đọc phía trên */}
      <line x1={380} y1={200} x2={456} y2={288} stroke="#059669" strokeWidth={1.5} markerEnd="url(#arrow-accent)" />
      <EdgeLabel x={400} y={255} accent>{edges.routeSql}</EdgeLabel>

      {/* RAG tìm kiếm vector trong database */}
      <line x1={660} y1={72} x2={706} y2={162} stroke="#94a3b8" strokeWidth={1} markerEnd="url(#arrow-neutral)" />
      <EdgeLabel x={715} y={110}>{edges.search}</EdgeLabel>

      {/* NL→SQL ghi vào database, vẫn giữ màu nhấn xuyên suốt đường có gác chắn */}
      <line x1={660} y1={288} x2={706} y2={198} stroke="#059669" strokeWidth={1.5} markerEnd="url(#arrow-accent)" />
      <EdgeLabel x={715} y={255} accent>{edges.write}</EdgeLabel>

      {/* Câu trả lời luôn quay lại đúng một chỗ, bất kể đi đường nào */}
      <path
        d="M 805 143 L 805 10 L 85 10 L 85 143"
        fill="none"
        stroke="#059669"
        strokeWidth={1.5}
        strokeDasharray="5 4"
        markerEnd="url(#arrow-accent)"
      />
      <EdgeLabel x={445} y={2} accent>{edges.answer}</EdgeLabel>
    </DiagramFrame>
  );
}
