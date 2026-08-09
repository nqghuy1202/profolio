/**
 * Dự án.
 *
 * File này giữ phần KHÔNG đổi theo ngôn ngữ: tên công nghệ, đường link, loại
 * thẻ, trạng thái, slug URL. Toàn bộ câu chữ nằm ở src/i18n/*.json dưới khoá
 * `work.items.<id>`.
 *
 * Hai điều đã cân nhắc kỹ, đừng đổi mà không đọc lý do:
 *
 * 1. TÊN KHÁCH HÀNG ĐƯỢC ẨN DANH. Trang này công khai và Google index được,
 *    khác với CV gửi riêng cho nhà tuyển dụng. Ghi "khách hàng ngành sản xuất"
 *    thay vì tên công ty. Tên thật vẫn nói được khi phỏng vấn.
 *
 * 2. PHẦN LỚN DỰ ÁN KHÔNG CÓ LINK, VÀ ĐÓ LÀ CHỦ Ý. Code thuộc sở hữu công ty
 *    và khách hàng. Trang chi tiết của những dự án đó dùng sơ đồ kiến trúc và
 *    một dòng ghi rõ vì sao không có mã nguồn — chỗ thiếu link đọc ra thành
 *    ranh giới nghề nghiệp, không phải chỗ trống.
 */

/** Nhãn tầng công nghệ, dùng chung toàn site để các trang đọc giống nhau. */
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
  /** Khớp với khoá trong i18n: work.items.<id> */
  id: string;
  /** Đoạn cuối URL: /en/work/<slug> */
  slug: string;
  kind: ProjectKind;
  featured: boolean;
  status?: ProjectStatus;
  /** Ba công nghệ in ở hàng chỉ mục trang chủ — chọn thứ nói được nhiều nhất */
  highlightTech: string[];
  tech: { layer: TechLayer; items: string[] }[];
  links?: { repo?: string; demo?: string };
  /** Tên sơ đồ SVG vẽ kèm ở trang chi tiết, thay cho ảnh chụp màn hình. */
  diagram?: "chat";
}

export const projects: Project[] = [
  {
    id: "chat",
    slug: "real-time-chat",
    kind: "professional",
    featured: true,
    status: "production",
    diagram: "chat",
    highlightTech: ["Node.js", "Server-Sent Events", "Oracle CQN"],
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
    slug: "heart-risk-estimator",
    kind: "openSource",
    featured: true,
    highlightTech: ["React 19", "TypeScript", "Django 5.2"],
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
    slug: "self-hosted-llm",
    kind: "professional",
    featured: false,
    status: "pilot",
    highlightTech: ["Ollama", "RAG", "DBMS_VECTOR"],
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
    slug: "erp-warehouse-integration",
    kind: "professional",
    featured: false,
    highlightTech: ["ORDS REST", "UTL_HTTP", "PL/SQL"],
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
    slug: "erp-production-module",
    kind: "professional",
    featured: false,
    highlightTech: ["Oracle APEX", "PL/SQL", "Schema design"],
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
    slug: "supplier-kpi-module",
    kind: "professional",
    featured: false,
    status: "live",
    highlightTech: ["Oracle APEX", "PL/SQL", "Oracle Database"],
    tech: [
      { layer: "frontend", items: ["JavaScript"] },
      {
        layer: "backendDatabase",
        items: ["Oracle APEX 24.2", "PL/SQL", "Oracle Database 19c"],
      },
    ],
  },
];

/** Tra dự án theo slug URL. Trả undefined nếu không có — trang gọi sẽ 404. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
