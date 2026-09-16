import { Box, DiagramFrame, EdgeLabel } from "./diagrams/primitives";

// Hình dạng dùng chung cho mọi sơ đồ "chuỗi thẳng" — dự án tài chính (trình
// duyệt → binary → MySQL) và ba phân hệ ERP không có ảnh chụp. Chỉ khác nhau
// ở nhãn box/cạnh, nên một component nhận dữ liệu thay vì viết lại hình học
// bốn lần.
type FlowDiagramCopy = {
  title: string;
  caption: string;
  boxes: { title: string; subtitle?: string }[];
  edges: string[];
};

export function FlowDiagram({
  diagram,
  titleId,
}: {
  diagram: FlowDiagramCopy;
  titleId: string;
}) {
  const boxWidth = 200;
  const boxHeight = 80;
  const gap = 70;
  const y = 30;
  const width = diagram.boxes.length * boxWidth + (diagram.boxes.length - 1) * gap;
  const height = y * 2 + boxHeight;

  return (
    <DiagramFrame
      titleId={titleId}
      descId={`${titleId}-desc`}
      title={diagram.title}
      caption={diagram.caption}
      viewBox={`0 0 ${width} ${height}`}
      minWidth={Math.min(width, 640)}
    >
      {diagram.boxes.map((box, index) => {
        const x = index * (boxWidth + gap);
        return (
          <Box
            key={box.title}
            x={x}
            y={y}
            width={boxWidth}
            height={boxHeight}
            title={box.title}
            subtitle={box.subtitle}
          />
        );
      })}

      {diagram.edges.map((label, index) => {
        const x1 = index * (boxWidth + gap) + boxWidth;
        const x2 = x1 + gap;
        const lineY = y + boxHeight / 2;
        return (
          <g key={label}>
            <line
              x1={x1}
              y1={lineY}
              x2={x2}
              y2={lineY}
              stroke="#94a3b8"
              strokeWidth={1}
              markerEnd="url(#arrow-neutral)"
            />
            <EdgeLabel x={(x1 + x2) / 2} y={lineY - 10}>
              {label}
            </EdgeLabel>
          </g>
        );
      })}
    </DiagramFrame>
  );
}

export type { FlowDiagramCopy };
