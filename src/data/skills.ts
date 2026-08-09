/**
 * Kỹ năng kỹ thuật.
 *
 * Tên công nghệ giữ nguyên ở cả hai ngôn ngữ nên nằm ở đây; chỉ tiêu đề nhóm
 * là phải dịch, và nó nằm ở src/i18n/*.json theo `id`.
 *
 * NGUYÊN TẮC: chỉ liệt kê thứ đã dùng thật và trả lời được câu hỏi sâu về nó.
 * Danh sách cố ý loại trừ nằm ở cuối file — đọc trước khi định thêm dòng mới.
 */

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
      "Node.js 22",
      "Express 5",
      "REST API",
      "Server-Sent Events (SSE)",
      "Long-polling",
      "Oracle APEX 24.2",
      "ORDS",
      "UTL_HTTP",
      "Django 5.2",
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
    items: ["Git", "Oracle Linux 8", "nginx", "PM2", "Shell scripting"],
  },
];

/**
 * CỐ Ý KHÔNG CÓ TRONG DANH SÁCH TRÊN — đừng thêm vào nếu chưa dùng thật:
 *
 *   VueJS · Azure · Docker · Terraform · CI/CD · Django REST Framework ·
 *   FastAPI · OCI · SQL Server · MongoDB · SQLite
 *
 * Lý do: dòng Skills là lời hứa về mức thành thạo. Vòng phỏng vấn kỹ thuật
 * sẽ hỏi tới, và một keyword không đỡ nổi câu trả lời "tôi mới đọc qua".
 * Chỉ thêm sau khi đã có một thứ công khai chứng minh được — như cách React
 * và TypeScript được mở sau khi repo heart_risk_estimator hoàn thành.
 */
