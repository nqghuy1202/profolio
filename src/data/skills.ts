// Tên công nghệ giữ nguyên ở cả hai ngôn ngữ nên nằm ở đây; tiêu đề nhóm phải
// dịch nên nằm ở src/i18n/*.json theo `id`.
// Chỉ liệt kê thứ đã dùng thật và trả lời được câu hỏi sâu.

export interface SkillGroup {
  /** Khớp với khoá trong i18n: skills.groups.<id> */
  id: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    items: ["SQL", "PL/SQL", "JavaScript (ES6+)", "TypeScript", "Python"],
  },
  {
    id: "frontend",
    items: [
      "React 19",
      "Hand-written JavaScript",
      "jQuery",
      "AJAX",
      "Server-Sent Events client",
      "HTML",
      "CSS (custom properties, theming, responsive)",
    ],
  },
  {
    id: "backend",
    items: [
      "Go",
      "Gin",
      "Node.js 22",
      "Express 5",
      "REST API",
      "Server-Sent Events (SSE)",
      "Long-polling",
      "Oracle APEX 24.2",
      "ORDS",
      "UTL_HTTP",
      "Django REST Framework",
    ],
  },
  {
    id: "databases",
    items: [
      "Oracle Database 26ai",
      "PL/SQL packages",
      "Oracle CQN",
      "DBMS_VECTOR / Vector Search",
      "DBLink",
      "Connection pooling",
      "MySQL 8",
    ],
  },
  {
    id: "ai",
    items: [
      "Ollama",
      "Self-hosted LLM",
      "RAG",
      "Machine Learning (AdaBoost, scikit-learn)",
    ],
  },
  {
    id: "ops",
    items: [
      "Git",
      "Docker",
      "Oracle Linux 8",
      "nginx",
      "PM2",
      "Shell scripting",
      "testcontainers-go",
    ],
  },
];

/**
 * CỐ Ý KHÔNG CÓ TRONG DANH SÁCH TRÊN — đừng thêm vào nếu chưa dùng thật:
 *
 *   VueJS · Azure · Terraform · CI/CD · FastAPI · OCI · SQL Server ·
 *   MongoDB · SQLite
 *
 * Lý do: dòng Skills là lời hứa về mức thành thạo. Vòng phỏng vấn kỹ thuật
 * sẽ hỏi tới, và một keyword không đỡ nổi câu trả lời "tôi mới đọc qua".
 * Chỉ thêm sau khi đã có một thứ công khai chứng minh được — như cách React
 * và TypeScript được mở sau khi repo heart_risk_estimator hoàn thành, và Go
 * cùng Docker sau khi repo financal_management hoàn thành.
 */
