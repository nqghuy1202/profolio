// Phần không đổi theo ngôn ngữ: công nghệ, link, loại, trạng thái, slug.
// Câu chữ nằm ở src/i18n/*.json dưới khoá `work.items.<id>`.
//
// Tên khách hàng để ẩn danh vì trang này Google index được, khác với CV gửi
// riêng. Phần lớn dự án không có link vì code thuộc sở hữu công ty và khách
// hàng — những dự án đó dùng sơ đồ kiến trúc thay cho mã nguồn.

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
  /** Ảnh chụp thật, chỉ có ở dự án cho xem được giao diện — đường dẫn trong
   *  public/projects/. Ưu tiên hơn diagram khi liệt kê ở trang chủ. */
  image?: { src: string; width: number; height: number };
  /** Ảnh phụ, hiện dưới ảnh/sơ đồ chính ở trang chi tiết — dùng cho bằng
   *  chứng trực quan không phải ảnh giao diện (ví dụ confusion matrix). */
  secondaryImage?: { src: string; width: number; height: number };
  /** Tên sơ đồ SVG vẽ kèm ở trang chi tiết, thay cho ảnh chụp màn hình.
   *  "chat" và "aiAssistant" dùng component sơ đồ riêng; các dự án còn lại
   *  dùng FlowDiagram chung với dữ liệu boxes/edges trong work.diagrams. */
  diagram?:
    | "chat"
    | "aiAssistant"
    | "erpWarehouse"
    | "erpProduction"
    | "kpiSupplier";
}

export const projects: Project[] = [
  {
    id: "chat",
    slug: "real-time-chat",
    kind: "professional",
    featured: true,
    status: "production",
    diagram: "chat",
    highlightTech: ["Node.js", "Server-Sent Events", "SharedWorker"],
    tech: [
      {
        layer: "frontend",
        items: [
          "Hand-written JavaScript (ES6)",
          "EventSource / SSE client",
          "SharedWorker (one connection per browser, not per tab)",
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
          "HMAC-SHA256 token authentication",
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
    id: "finance",
    slug: "personal-finance-manager",
    kind: "openSource",
    featured: true,
    image: { src: "/projects/personal-finance-manager.png", width: 1600, height: 900 },
    highlightTech: ["Go 1.26", "React 19", "MySQL 8"],
    links: {
      repo: "https://github.com/nqghuy1202/financal_management",
      demo: "https://finance.hlcompany.id.vn",
    },
    tech: [
      {
        layer: "frontend",
        items: [
          "React 19",
          "TypeScript 5",
          "Vite 6",
          "Tailwind CSS v4",
          "React Router 7",
          "Recharts",
          "React Context",
        ],
      },
      {
        layer: "backend",
        items: [
          "Go 1.26",
          "Gin",
          "database/sql",
          "JWT (HS256)",
          "bcrypt",
          "REST API",
          "Transactional budget-threshold alerts",
        ],
      },
      {
        layer: "database",
        items: ["MySQL 8", "Schema auto-migration"],
      },
      {
        layer: "infrastructure",
        items: [
          "Docker (multi-stage)",
          "Docker Compose",
          "Alpine",
          "Rate limiting",
        ],
      },
    ],
  },
  {
    id: "debtCrusher",
    slug: "debt-crusher",
    kind: "openSource",
    featured: true,
    image: { src: "/projects/debt-crusher.png", width: 1600, height: 900 },
    secondaryImage: { src: "/projects/debt-crusher-compare.png", width: 1600, height: 1336 },
    highlightTech: ["Java 26", "Spring Boot 4", "React 19"],
    links: {
      repo: "https://github.com/nqghuy1202/debt-crusher",
      demo: "https://balance.hlcompany.id.vn",
    },
    tech: [
      {
        layer: "frontend",
        items: [
          "React 19",
          "TypeScript",
          "Vite",
          "Tailwind CSS 4",
          "React Router 7",
          "Axios",
        ],
      },
      {
        layer: "backend",
        items: [
          "Java 26",
          "Spring Boot 4",
          "Maven multi-module (DDD)",
          "JWT authentication",
          "Resilience4j rate limiting",
          "Strategy + Factory pattern",
        ],
      },
      {
        layer: "database",
        items: ["MySQL", "Spring Data JPA"],
      },
      {
        layer: "infrastructure",
        items: ["Docker Compose", "Separate deploy docs"],
      },
    ],
  },
  {
    id: "heartRisk",
    slug: "heart-risk-estimator",
    kind: "openSource",
    featured: true,
    image: { src: "/projects/heart-risk-estimator.png", width: 1600, height: 900 },
    secondaryImage: {
      src: "/projects/heart-risk-confusion-matrix.png",
      width: 960,
      height: 720,
    },
    highlightTech: ["React 19", "TypeScript", "Django 5.2"],
    links: {
      repo: "https://github.com/nqghuy1202/heart_risk_estimator",
      // Bản deploy thật đã đổi sang thương hiệu "HL Care" (đổi logo 16/09/2026),
      // link Vercel cũ không còn là bản đang chạy — trỏ lại đúng domain.
      demo: "https://care.hlcompany.id.vn",
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
    featured: true,
    status: "production",
    diagram: "aiAssistant",
    highlightTech: ["Agentic RAG + NL→SQL", "Ollama", "Oracle AI Database 26ai"],
    tech: [
      {
        layer: "backend",
        items: [
          "Ollama (qwen2.5:3b-instruct)",
          "Agentic intent routing",
          "RAG pipeline",
          "Guarded Natural-Language-to-SQL",
          "PL/SQL",
        ],
      },
      {
        layer: "database",
        items: [
          "Oracle AI Database 26ai",
          "DBMS_VECTOR",
          "HNSW vector indexing",
          "bge-m3 embeddings",
          "PL/SQL",
        ],
      },
      {
        layer: "infrastructure",
        items: ["Oracle Linux 8", "nginx", "CPU-only inference", "Packet capture (tcpdump)"],
      },
    ],
  },
  {
    id: "erpWarehouse",
    slug: "erp-warehouse-integration",
    kind: "professional",
    featured: false,
    diagram: "erpWarehouse",
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
    diagram: "erpProduction",
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
    diagram: "kpiSupplier",
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
