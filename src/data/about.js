// about.js — content for the About page.
// Sections are returned in render order. Keeping copy in one place so individual
// section components stay focused on layout/animation.

export const HERO_META = [
  { prompt: "$", text: "akinola-victor" },
  { prompt: ">", text: "ai engineer" },
  { prompt: ">", text: "builds useful intelligence" },
  { prompt: ">", text: "learns in public" },
];

export const JOURNEY = [
  {
    code: "01 / Foundation",
    title: "Frontend engineering",
    blurb:
      "Learning to make complex ideas feel simple through thoughtful interfaces.",
  },
  {
    code: "02 / Depth",
    title: "Full-stack development",
    blurb:
      "Understanding data, APIs, infrastructure, and the tradeoffs beneath the surface.",
  },
  {
    code: "03 / Direction",
    title: "AI engineering",
    blurb:
      "Building systems where models, tools, retrieval, and people work together.",
  },
];

export const BELIEFS = [
  "Build useful things.",
  "Understand the system, not just the model.",
  "Measure before assuming.",
  "Simplicity beats unnecessary complexity.",
  "AI should augment human capability.",
  "Continuous learning is part of engineering.",
];

export const STACK = [
  {
    label: "AI / ML",
    items: ["LLMs", "RAG", "Agents", "Multimodal AI", "Embeddings", "AI Evaluation"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Python", "FastAPI"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MongoDB", "Vector Databases"],
  },
  {
    label: "Tools",
    items: ["Git", "Docker", "GitHub", "Ollama"],
  },
];

export const LEARNING = [
  "agentic architectures",
  "multimodal retrieval",
  "local llm deployment",
  "ai evaluation rubrics",
  "model quantization",
];

export const TIMELINE = [
  {
    year: "2019",
    title: "Frontend",
    meta: "React · JavaScript · Interfaces",
    note: "Where the craft started — making ideas legible.",
  },
  {
    year: "2022",
    title: "Full-stack",
    meta: "Next.js · Node.js · PostgreSQL",
    note: "Owning the slice end-to-end: API, schema, UX.",
  },
  {
    year: "2024",
    title: "AI engineering",
    meta: "LLMs · RAG · AI applications",
    note: "Models became the new interface.",
  },
  {
    year: "now",
    title: "Exploring",
    meta: "Agents · Multimodal · Evaluation",
    note: "Building agents that plan, act, and explain.",
  },
];

// Set RESUME_URL when the PDF is hosted. The CTA gracefully disables itself
// when no resume is available yet.
export const RESUME_URL = "/resume.pdf";
export const RESUME_SIZE = "PDF · ~120KB";
export const RESUME_UPDATED = "Updated Aug 2026";
