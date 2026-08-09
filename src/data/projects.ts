/**
 * Dự án.
 *
 * File này giữ phần KHÔNG đổi theo ngôn ngữ: tên công nghệ, đường link, loại
 * thẻ, trạng thái. Toàn bộ câu chữ (tiêu đề, mô tả, đầu việc, con số) nằm ở
 * src/i18n/*.json dưới khoá `projects.<id>`.
 *
 * Hai điều đã cân nhắc kỹ, đừng đổi mà không đọc lý do:
 *
 * 1. TÊN KHÁCH HÀNG ĐƯỢC ẨN DANH. Trang này công khai và Google index được,
 *    khác với CV gửi riêng cho nhà tuyển dụng. Ghi "khách hàng ngành sản xuất"
 *    thay vì tên công ty. Tên thật vẫn nói được khi phỏng vấn.
 *
 * 2. PHẦN LỚN DỰ ÁN KHÔNG CÓ LINK, VÀ ĐÓ LÀ CHỦ Ý. Code thuộc sở hữu công ty
 *    và khách hàng. Thẻ `professional` được thiết kế riêng cho trường hợp này
 *    — có nhãn giải thích và sơ đồ kiến trúc thay cho ảnh chụp màn hình — nên
 *    việc thiếu link đọc ra là một ranh giới nghề nghiệp, không phải chỗ trống.
 */

/** Nhãn tầng công nghệ, dùng chung toàn site để các thẻ đọc giống nhau. */
export type TechLayer =
  | "frontend"
  | "backend"
  | "backendDatabase"
  | "database"
  | "integration"
  | "machineLearning"
  | "infrastructure";

export type ProjectKind = "openSource" | "professional";

/** Trạng thái thật của sản phẩm. `pilot` không được viết thành `production`. */
export type ProjectStatus = "production" | "pilot" | "live";

export interface Project {
  /** Khớp với khoá trong i18n: projects.items.<id> */
  id: string;
  kind: ProjectKind;
  featured: boolean;
  status?: ProjectStatus;
  tech: { layer: TechLayer; items: string[] }[];
  links?: { repo?: string; demo?: string };
  /** Tên sơ đồ SVG vẽ kèm, thay cho ảnh chụp màn hình. */
  diagram?: "chat";
}

export const projects: Project[] = [
  {
    id: "chat",
    kind: "professional",
    featured: true,
    status: "production",
    diagram: "chat",
    tech: [
      {
        layer: "frontend",
        items: [
          "Hand-written JavaScript (ES6)",
          "EventSource / SSE client",
          "jQuery",
          "AJAX",
        ],
      },
      {
        layer: "backend",
        items: [
          "Node.js 22",
          "Express 5",
          "Server-Sent Events",
          "Long-polling",
          "REST API",
          "Token-based authentication",
        ],
      },
      {
        layer: "database",
        items: [
          "Oracle Database 26ai",
          "PL/SQL",
          "Oracle CQN",
          "oracledb connection pool",
        ],
      },
      {
        layer: "integration",
        items: ["UTL_HTTP", "Oracle APEX AJAX callbacks"],
      },
      {
        layer: "infrastructure",
        items: ["Oracle Linux", "nginx", "PM2", "Shell scripts"],
      },
    ],
  },
  {
    id: "heartRisk",
    kind: "openSource",
    featured: true,
    links: {
      repo: "https://github.com/nqghuy1202/heart_risk_estimator",
    },
    tech: [
      {
        layer: "frontend",
        items: [
          "React 19",
          "TypeScript",
          "Vite",
          "Vitest + React Testing Library",
          "Hand-written CSS",
        ],
      },
      {
        layer: "backend",
        items: [
          "Python 3.11",
          "Django 5.2",
          "JSON REST API",
          "Django form validation",
          "CSRF protection",
        ],
      },
      {
        layer: "machineLearning",
        items: ["scikit-learn (AdaBoost)", "pandas", "NumPy", "joblib"],
      },
    ],
  },
  {
    id: "localAi",
    kind: "professional",
    featured: false,
    status: "pilot",
    tech: [
      {
        layer: "backend",
        items: ["Ollama", "Qwen (local LLM)", "RAG pipeline"],
      },
      {
        layer: "database",
        items: [
          "Oracle Database 26ai",
          "DBMS_VECTOR",
          "Vector Search",
          "PL/SQL",
        ],
      },
      {
        layer: "infrastructure",
        items: ["Oracle Linux 8", "nginx", "CPU-only inference"],
      },
    ],
  },
  {
    id: "erpWarehouse",
    kind: "professional",
    featured: false,
    tech: [
      { layer: "frontend", items: ["JavaScript", "AJAX"] },
      {
        layer: "backendDatabase",
        items: [
          "Oracle APEX 24.2",
          "PL/SQL",
          "Oracle Database 19c",
          "ORDS REST",
        ],
      },
      {
        layer: "integration",
        items: ["Bizzi invoice API (REST)", "UTL_HTTP"],
      },
    ],
  },
  {
    id: "erpProduction",
    kind: "professional",
    featured: false,
    tech: [
      { layer: "frontend", items: ["JavaScript", "jQuery", "AJAX"] },
      {
        layer: "backendDatabase",
        items: ["Oracle APEX 24.2", "PL/SQL", "Oracle Database 19c"],
      },
    ],
  },
  {
    id: "kpiSupplier",
    kind: "professional",
    featured: false,
    status: "live",
    tech: [
      { layer: "frontend", items: ["JavaScript"] },
      {
        layer: "backendDatabase",
        items: ["Oracle APEX 24.2", "PL/SQL", "Oracle Database 19c"],
      },
    ],
  },
];
