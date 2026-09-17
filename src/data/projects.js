// Project dataset — used by the home page (8 cards), the /projects listing (filterable),
// and /projects/[slug] (full case study). Each entry is a self-contained record so the
// detail page can render entirely from `getProjectBySlug(slug)`.
//
// Field semantics:
//   slug         url-safe id
//   name         display title
//   tagline      one-line elevator pitch (used on listing cards)
//   description  1–2 sentence summary (used on listing cards)
//   tags[]       primary tech tags
//   categories[] filter buckets used on the listing page filter bar
//   status       "live" | "experimental" | "open-source"
//   labels[]     e.g. ["Featured", "Experimental", "Open Source"]
//   github       repo URL (or "#" placeholder)
//   demo         live URL  (or "#" placeholder)
//   year         build year, shown in detail meta
//   role         short role description for the detail hero
//   accent       color used by procedural covers + accents
//   problem      long-form problem statement
//   solution     long-form solution narrative
//   workflow[]   ordered { label, blurb } steps for the "How it works" section
//   architecture string[] ordered list of architecture nodes rendered in detail page
//   tech         { ai_ml[], frontend[], backend[], database[], infra[], apis[] }
//   decisions[]  { title, choice, alternatives, reason }
//   metrics[]    { label, value, suffix? } — evaluation/results numbers
//   challenges[] { title, what, fix }
//   results[]    string — outcome summary
//   future[]     string — planned improvements

export const CATEGORIES = [
  { key: "all",          label: "All" },
  { key: "rag",          label: "RAG" },
  { key: "agents",       label: "Agents" },
  { key: "multimodal",   label: "Multimodal" },
  { key: "llm",          label: "LLM" },
  { key: "devtools",     label: "Developer Tools" },
  { key: "automation",   label: "Automation" },
  { key: "evaluation",   label: "Evaluation" },
  { key: "local-llm",    label: "Local LLM" },
];

export const PROJECTS = [
    {
      slug: "knowledge-rag",
      name: "Knowledge RAG",
      tagline: "Local-first RAG over websites, PDFs, docs, and spreadsheets.",
      description:
        "A full-stack RAG application with multi-kind ingestion, unified retrieval, and per-user chat history — all running locally with Ollama and ChromaDB.",
      tags: ["TypeScript", "Next.js", "ChromaDB", "Ollama", "LangChain"],
      categories: ["rag", "llm", "local-ai"],
      status: "live",
      labels: ["Open Source", "Local-First"],
      github: "#",
      demo: "#",
      year: 2026,
      role: "Architect · Sole builder",
      accent: "var(--accent)",
      problem:
        "Most RAG demos only handle one document type, require cloud APIs, or lose chat history on reload. Developers and researchers needed a single local-first tool that ingests websites, PDFs, Word docs, and spreadsheets — with persistent per-user libraries and citations.",
      solution:
        "Knowledge RAG provides a unified ingestion pipeline for five resource kinds (website, text, PDF, Word, sheet), each with deterministic resourceIds for idempotency. A single /api/chat endpoint retrieves top-K chunks across all selected collections, merges by Chroma distance, and streams answers from a local Ollama model with source citations. Per-user libraries and chat histories persist in localStorage; the Chroma registry survives Next.js HMR via a JSON mirror.",
      workflow: [
        { label: "Ingest",       blurb: "Add URLs, paste text, or upload files (PDF, .docx, .csv/.xlsx)." },
        { label: "Chunk & Embed", blurb: "RecursiveCharacterTextSplitter + snowflake-arctic-embed:110m via Ollama." },
        { label: "Store",        blurb: "Chroma collections per resource (kind_<resourceId>), registry mirrored to JSON." },
        { label: "Retrieve",     blurb: "Unified /api/chat queries top-K per collection, merges & ranks globally." },
        { label: "Generate",     blurb: "Local LLM (qwen2.5-coder:1.5b) answers with citations; streams to UI." },
      ],
      architecture: [
        "Client (Next.js + React + Tailwind)",
        "API routes (Next.js App Router style pages/api)",
        "Unified chat endpoint (multi-resource retrieval)",
        "Per-kind ingest endpoints (website, text, pdf, word, sheet)",
        "Registry persistence (Map + JSON mirror, HMR-safe)",
        "ChromaDB (vector store, cosine HNSW)",
        "Ollama (embeddings + chat, fully local)",
        "LangChain (text splitters, prompt templates)",
        "localStorage (per-user library + chat history)",
      ],
      tech: {
        ai_ml:     ["Ollama (snowflake-arctic-embed:110m, qwen2.5-coder:1.5b)", "LangChain (text splitters, prompts)"],
        frontend:  ["Next.js 14", "React 18", "Tailwind CSS"],
        backend:   ["Next.js API routes (Node.js)", "LangChain"],
        database:  ["ChromaDB (vector)", "SQLite (Chroma metadata)"],
        infra:     ["Docker-ready", "concurrently (dev)", "npm scripts"],
        apis:      ["Ollama REST API"],
      },
      decisions: [
        {
          title: "Unified chat endpoint for all resource kinds",
          choice: "Single /api/chat reads from registry, queries N collections in parallel, merges by distance",
          alternatives: ["Separate chat endpoints per kind", "Federated search service"],
          reason:
            "Keeps the frontend simple (one API call) and the backend DRY. The registry is the single source of truth mapping resourceId → collectionName + kind. Adding a new kind only requires an ingest route.",
        },
        {
          title: "Deterministic resourceIds for idempotent ingestion",
          choice: "Hash of content (URLs, text, file bytes) → 12-char hex resourceId",
          alternatives: ["UUIDv4 per upload", "Auto-increment IDs"],
          reason:
            "Re-ingesting the same content returns the existing record (alreadyIngested: true). The UI can safely retry; the library deduplicates on resourceId. No orphan collections from duplicate uploads.",
        },
        {
          title: "Registry persistence via JSON mirror (HMR survival)",
          choice: "In-memory Map mirrored to CHROMA_DB_PATH/.resource_registry.json with debounced atomic writes",
          alternatives: ["Plain module-scope Map", "External DB (Redis, Postgres)"],
          reason:
            "Next.js dev reloads wipe module scope. A plain Map loses all registrations. JSON mirror survives HMR with zero external deps. Debounced (50ms) + .tmp → rename avoids corruption.",
        },
        {
          title: "ChromaDB + Ollama fully local (no cloud keys)",
          choice: "Chroma on localhost:8000, Ollama on localhost:11434",
          alternatives: ["Pinecone/Weaviate + OpenAI/Anthropic", "Embedded vector store (e.g., LanceDB)"],
          reason:
            "Zero API costs, full data privacy, works offline. Chroma's HTTP API is simple and the JS client is lightweight. Ollama serves both embeddings and chat from one binary.",
        },
        {
          title: "Per-user isolation via localStorage (no auth backend)",
          choice: "Three keys: kr:user, kr:lib:<user>, kr:chats:<user>",
          alternatives: ["NextAuth + database", "Server-side sessions"],
          reason:
            "Keeps the stack minimal (no auth service, no user table). SSR-safe: server renders user=\"\", client hydrates from localStorage. Multi-user on one machine via username switcher in header.",
        },
      ],
      metrics: [
        { label: "Resource kinds",  value: "5", suffix: "" },
        { label: "Max URLs / ingest", value: "200", suffix: "" },
        { label: "Max PDF size", value: "100", suffix: "MB" },
        { label: "Max Word/Sheet size", value: "25", suffix: "MB" },
        { label: "Chunk size", value: "1000", suffix: "chars" },
        { label: "Chunk overlap", value: "200", suffix: "chars" },
        { label: "Top-K per collection", value: "5", suffix: "" },
        { label: "Global top-K", value: "5", suffix: "" },
      ],
      challenges: [
        { title: "Chroma Windows file locks on delete", what: "deleteCollection leaves HNSW segment folders locked (EBUSY) on Windows.", fix: "DELETE route reads segment folder names from sqlite BEFORE deleteCollection, then runs async retry purge (fast 20×250ms + slow 30min). /api/resources/_purge-orphans for manual sweep." },
        { title: "HMR wiping in-memory registry", what: "Next.js dev reload resets module scope; plain Map loses all resource registrations.", fix: "resourceStore.js mirrors Map to .resource_registry.json with debounced atomic writes; lazy reads on first access." },
        { title: "LangChain/Ollama role mismatch", what: "LangChain uses human/ai roles; Ollama expects user/assistant — empty responses without normalization.", fix: "chatModel.js normalizes via ROLE_MAP reading from message._getType() / getType() / lc_kwargs.role." },
        { title: "Multi-file ingestion idempotency", what: "Same file set uploaded twice should hit same Chroma collection.", fix: "Deterministic resourceId from sorted filenames + total bytes + combined SHA256 hash." },
      ],
      results:
        "Single binary (Ollama) + single vector DB (Chroma) + Next.js frontend delivers a complete local RAG stack. Five resource kinds ingest via unified pipeline. Per-user libraries persist across reloads. Chroma registry survives HMR. Windows file-lock cleanup automated with background purge + manual endpoint.",
      future: [
        "Hybrid retrieval (BM25 + dense) via Chroma's built-in BM25 or Tantivy",
        "Cross-encoder reranker (local, via Ollama or ONNX)",
        "Streaming citations (progressive as chunks arrive)",
        "Multi-tenancy with isolated Chroma collections per user",
        "Eval harness (groundedness, citation precision, refusal rate)",
        "PWA support for offline query of already-ingested corpus",
      ],
  },

  {
    slug: "atlas-rag",
    name: "Atlas RAG",
    tagline: "Knowledge-aware retrieval over private docs.",
    description:
      "Grounded retrieval with citations and confidence scoring, built for teams who can't ship hallucinated answers.",
    tags: ["Python", "FastAPI", "Vector DB", "LangChain"],
    categories: ["rag", "llm"],
    status: "live",
    labels: ["Featured", "Open Source"],
    github: "#",
    demo: "#",
    year: 2026,
    role: "Architect · Sole builder",
    accent: "var(--accent)",
    problem:
      "Most RAG systems either lose their grounding on long documents or surface confident-but-wrong answers with no way to tell the two apart. Knowledge teams needed something they could actually put in front of customers.",
    solution:
      "Atlas RAG combines hybrid retrieval (BM25 + dense), a cross-encoder reranker, and a citation-locked generator that refuses to answer when retrieval confidence is low. Every response ships with line-level citations and a calibrated confidence score.",
    workflow: [
      { label: "Query",       blurb: "User question + optional filters." },
      { label: "Retrieve",    blurb: "Hybrid BM25 + dense recall, top-50." },
      { label: "Rerank",      blurb: "Cross-encoder narrows to top-8." },
      { label: "Compose",     blurb: "Citation-locked prompt assembly." },
      { label: "Generate",    blurb: "Grounded answer + citations + score." },
    ],
    architecture: [
      "Client (web/SDK)",
      "API gateway",
      "Query router",
      "Hybrid retriever (BM25 + dense)",
      "Reranker (cross-encoder)",
      "Citation-locked LLM",
      "Postgres + vector store",
      "Telemetry pipeline",
    ],
    tech: {
      ai_ml:     ["OpenAI / Anthropic models", "BGE embeddings", "Cross-encoder reranker"],
      frontend:  ["Next.js", "Tailwind"],
      backend:   ["Python", "FastAPI", "LangChain"],
      database:  ["PostgreSQL", "pgvector", "Redis"],
      infra:     ["GitHub Actions"],
      apis:      ["OpenAI", "Anthropic", "Cohere rerank"],
    },
    decisions: [
      {
        title: "Hybrid retrieval instead of dense-only",
        choice: "BM25 + dense with reciprocal-rank fusion",
        alternatives: ["Dense-only retrieval", "Graph retrieval"],
        reason:
          "Lexical recall catches identifiers and rare terms that dense embeddings flatten; fusion keeps both signals honest.",
      },
      {
        title: "Citation-locked generation",
        choice: "Force the model to cite, refuse when unsupported",
        alternatives: ["Free-form generation + post-hoc citations"],
        reason:
          "Locking citations into the decoding loop removed the 'confident but ungrounded' failure mode we saw in early evals.",
      },
      {
        title: "pgvector instead of a dedicated vector DB",
        choice: "Postgres + pgvector",
        alternatives: ["Pinecone", "Weaviate", "Qdrant"],
        reason:
          "Customers already ran Postgres. One fewer system to operate, transactional consistency for free.",
      },
    ],
    metrics: [
      { label: "Grounded",  value: "94", suffix: "%" },
      { label: "Citation precision", value: "91", suffix: "%" },
      { label: "p95 latency", value: "1.4", suffix: "s" },
      { label: "Refusal rate", value: "6",  suffix: "%" },
    ],
    challenges: [
      { title: "Long-document retrieval drift", what: "Answers slowly drifted as corpus grew.", fix: "Introduced per-chunk metadata anchors + cross-encoder reranker." },
      { title: "Citation hallucination",        what: "Model cited plausible-but-wrong passages.", fix: "Switched to citation-locked decoding and required refusal when no support." },
    ],
    results:
      "Reduced ungrounded answers from ~22% to ~6% on the internal eval set. Three enterprise teams moved from pilot to production within a quarter.",
    future: [
      "Multimodal retrieval over diagrams and tables",
      "Streaming answers with progressive citations",
      "Tenant-aware evals as a managed service",
    ],
  },

  {
    slug: "cortex-agents",
    name: "Cortex Agents",
    tagline: "Multi-agent research assistant.",
    description:
      "Planner → researcher → writer agents that produce cited briefs from a single prompt.",
    tags: ["TypeScript", "Agents", "Tools", "Eval"],
    categories: ["agents", "llm"],
    status: "live",
    labels: ["Featured", "Open Source"],
    github: "#",
    demo: "#",
    year: 2026,
    role: "Architect · Builder",
    accent: "var(--accent)",
    problem:
      "Single-agent research pipelines either plateau on quality or burn budget re-running the same searches. We needed something that could plan a brief, dispatch focused workers, and consolidate without supervision.",
    solution:
      "Cortex splits the work into three roles — a planner that decomposes the brief, a researcher pool that performs focused searches in parallel, and a writer that consolidates with citations. A small judge model gates each step, so bad outputs are caught before they cascade.",
    workflow: [
      { label: "Brief",      blurb: "User prompt + constraints." },
      { label: "Plan",       blurb: "Planner decomposes into sub-questions." },
      { label: "Dispatch",   blurb: "Researchers search in parallel." },
      { label: "Judge",      blurb: "Per-result quality gate." },
      { label: "Consolidate", blurb: "Writer produces the cited brief." },
    ],
    architecture: [
      "Client UI",
      "Planner agent",
      "Tool registry",
      "Researcher pool (parallel)",
      "Judge model",
      "Writer agent",
      "Eval pipeline",
      "Persistent memory",
    ],
    tech: {
      ai_ml:     ["GPT-class planners", "Embedding-based dedup", "Lightweight judge model"],
      frontend:  ["Next.js", "MDX renderer"],
      backend:   ["TypeScript", "Node.js", "tRPC"],
      database:  ["Postgres", "Redis", "S3"],
      infra:     ["Fly.io", "GitHub Actions"],
      apis:      ["Serper", "Exa", "OpenAI", "Anthropic"],
    },
    decisions: [
      {
        title: "Planner / researcher / writer split",
        choice: "Three roles instead of one monolith",
        alternatives: ["Single ReAct loop", "Tree-of-thought"],
        reason:
          "Roles let us swap models per task and gave clean evaluation boundaries.",
      },
      {
        title: "Per-step judge instead of end-only eval",
        choice: "Inline quality gate after each researcher run",
        alternatives: ["End-to-end eval only"],
        reason:
          "Caught hallucinations at the source. End-only eval let bad research pollute the writer.",
      },
    ],
    metrics: [
      { label: "Brief completion", value: "98", suffix: "%" },
      { label: "Citation precision", value: "88", suffix: "%" },
      { label: "Cost / brief", value: "$0.42" },
      { label: "p95 latency", value: "22", suffix: "s" },
    ],
    challenges: [
      { title: "Researcher loops", what: "Workers kept re-querying.", fix: "Added a memory cache keyed on sub-question + tool." },
      { title: "Writer drift",     what: "Writer over-relied on early sources.", fix: "Forced it to read all researcher outputs before drafting." },
    ],
    results:
      "Briefs now match or beat junior-analyst drafts on internal rubrics 78% of the time.",
    future: [
      "Long-horizon planning with persistent scratchpads",
      "Domain-specific tool packs",
      "Eval-as-a-service integration",
    ],
  },

  {
    slug: "prism-multimodal",
    name: "Prism Multimodal",
    tagline: "Vision-language document parser.",
    description:
      "Turns PDFs, scans, and slides into structured, queryable data with section awareness.",
    tags: ["Multimodal", "Vision", "Eval"],
    categories: ["multimodal", "llm"],
    status: "experimental",
    labels: ["Experimental"],
    github: "#",
    demo: "#",
    year: 2026,
    role: "Architect · Builder",
    accent: "var(--accent)",
    problem:
      "Documents aren't text. Layout, tables, diagrams, and footnotes are load-bearing — and most pipelines flatten them on the way in.",
    solution:
      "Prism renders documents page-by-page, runs a vision-language model on each region, then reconciles into a structured schema with provenance. Tables become rows, diagrams become descriptions, footnotes stay attached.",
    workflow: [
      { label: "Render",    blurb: "PDF → page images at consistent DPI." },
      { label: "Detect",    blurb: "Layout regions + reading order." },
      { label: "Extract",   blurb: "VLM per region (text, tables, figures)." },
      { label: "Reconcile", blurb: "Stitch into schema, preserve links." },
      { label: "Export",    blurb: "JSON / Markdown / Postgres rows." },
    ],
    architecture: [
      "Upload pipeline",
      "PDF rasterizer",
      "Layout detector",
      "Region router",
      "Vision-LLM pool",
      "Reconciler",
      "Schema validator",
      "Export sinks",
    ],
    tech: {
      ai_ml:     ["GPT-4V / Claude vision", "LayoutLMv3", "Donut"],
      frontend:  ["React", "tldraw viewer"],
      backend:   ["Python", "FastAPI", "Celery"],
      database:  ["Postgres", "S3"],
      infra:     ["Modal", "GitHub Actions"],
      apis:      ["OpenAI", "Anthropic"],
    },
    decisions: [
      {
        title: "Region-by-region VLM calls",
        choice: "One VLM call per detected region",
        alternatives: ["Whole-page VLM", "Two-stage OCR + VLM"],
        reason:
          "Whole-page lost table structure; OCR+VLM doubled failure modes. Region routing gave the best recall on tables.",
      },
    ],
    metrics: [
      { label: "Table accuracy", value: "92", suffix: "%" },
      { label: "Section recall", value: "96", suffix: "%" },
      { label: "p95 / page", value: "3.1", suffix: "s" },
    ],
    challenges: [
      { title: "Multi-column layouts", what: "Reading order broke on two-column papers.", fix: "Added a layout-aware ordering pass with explicit column boundaries." },
    ],
    results:
      "Replaced a 4-step manual pipeline for two analyst teams. ~6× throughput on document-heavy briefs.",
    future: ["Diagram-level structural extraction", "OCR-free Chinese / Japanese"],
  },

  {
    slug: "forge-devtools",
    name: "Forge Dev Tools",
    tagline: "AI pair-programmer for legacy codebases.",
    description:
      "Repo-aware context engine that lets a model reason about unfamiliar code without copying it into a vendor cloud.",
    tags: ["DevTools", "LLM", "AST"],
    categories: ["devtools", "llm"],
    status: "live",
    labels: ["Featured", "Open Source"],
    github: "#",
    demo: "#",
    year: 2026,
    role: "Architect · Builder",
    accent: "var(--accent)",
    problem:
      "AI pair-programmers lose their minds in unfamiliar codebases. They hallucinate APIs, miss patterns, and ignore the conventions the team actually uses.",
    solution:
      "Forge indexes the repo into a typed symbol graph, then serves precise, scoped context per request. The model only sees what it needs to see — and always grounded in real files.",
    workflow: [
      { label: "Index",     blurb: "Build a typed symbol graph of the repo." },
      { label: "Locate",    blurb: "Locate candidate symbols per request." },
      { label: "Score",     blurb: "Rank by recency, similarity, and use." },
      { label: "Compose",   blurb: "Build a tight, grounded context window." },
      { label: "Respond",   blurb: "Model reasons against actual files." },
    ],
    architecture: [
      "Editor / CLI",
      "Indexer (TS / Python / Go)",
      "Symbol graph store",
      "Retriever",
      "Context composer",
      "Model adapter",
      "Local model fallback",
    ],
    tech: {
      ai_ml:     ["GPT-class models", "Local GGUF fallback", "CodeT5+ embeddings"],
      frontend:  ["VS Code extension", "CLI"],
      backend:   ["Rust", "Node.js"],
      database:  ["SQLite", "LanceDB"],
      infra:     ["Local-first", "Docker"],
      apis:      ["OpenAI", "Anthropic", "Ollama"],
    },
    decisions: [
      {
        title: "Symbol graph instead of chunked text",
        choice: "AST + references, not raw file slices",
        alternatives: ["Sliding window chunks", "Vector-only retrieval"],
        reason:
          "Chunked retrieval pulled in stale or wrong-version code. The symbol graph made references exact.",
      },
      {
        title: "Local model fallback",
        choice: "Route simple requests to a local GGUF model",
        alternatives: ["All requests to hosted models"],
        reason:
          "Cut cost on routine edits and kept private repos fully on-prem when needed.",
      },
    ],
    metrics: [
      { label: "Acceptance rate", value: "61", suffix: "%" },
      { label: "Latency p50", value: "0.9", suffix: "s" },
      { label: "Local fallback share", value: "34", suffix: "%" },
    ],
    challenges: [
      { title: "Multi-language repos", what: "Different AST strategies per language.", fix: "Pluggable indexer adapters with a shared symbol schema." },
    ],
    results:
      "Used daily by ~40 engineers. Reduced 'wrong API' rejections by 38% in the first month.",
    future: ["Incremental indexing", "Test-aware suggestions"],
  },

  {
    slug: "helix-automation",
    name: "Helix Automation",
    tagline: "Workflow automation with tool-using agents.",
    description:
      "Long-running automations that combine deterministic steps with agentic decision points.",
    tags: ["Automation", "Agents", "Python"],
    categories: ["automation", "agents"],
    status: "live",
    labels: ["Open Source"],
    github: "#",
    demo: "#",
    year: 2025,
    role: "Architect · Builder",
    accent: "var(--accent)",
    problem:
      "Pure-LLM automations are unreliable; pure-deterministic automations can't handle messy input. Real workflows need both.",
    solution:
      "Helix lets you define a graph of deterministic steps and agent nodes. The agent handles judgment calls; the graph keeps the system honest. Every transition is logged and replayable.",
    workflow: [
      { label: "Trigger",   blurb: "Schedule, webhook, or event." },
      { label: "Validate",  blurb: "Deterministic preconditions." },
      { label: "Decide",    blurb: "Agent node: plan the next move." },
      { label: "Act",       blurb: "Tool calls with retries + idempotency." },
      { label: "Verify",    blurb: "Post-condition checks before continuing." },
    ],
    architecture: [
      "Scheduler",
      "Workflow engine",
      "Agent nodes",
      "Tool registry",
      "Deterministic nodes",
      "State store",
      "Audit log",
      "Replay tooling",
    ],
    tech: {
      ai_ml:     ["Agent runtime", "Tool-use loops", "Lightweight verifier"],
      frontend:  ["React", "Workflow editor"],
      backend:   ["Python", "Temporal"],
      database:  ["Postgres", "Redis"],
      infra:     ["Kubernetes", "GitHub Actions"],
      apis:      ["Slack", "GitHub", "Linear", "OpenAI"],
    },
    decisions: [
      {
        title: "Deterministic graph + agent nodes",
        choice: "Hybrid DAG with explicit agent boundaries",
        alternatives: ["Pure agent loop", "Pure DAG"],
        reason:
          "Pure agent loops drifted; pure DAGs couldn't handle unstructured input. The hybrid shipped reliably.",
      },
    ],
    metrics: [
      { label: "Workflow success", value: "99.2", suffix: "%" },
      { label: "Median runtime", value: "47", suffix: "s" },
      { label: "Manual interventions", value: "1.4", suffix: "/wk" },
    ],
    challenges: [
      { title: "Replay determinism", what: "Agent calls weren't reproducible.", fix: "Captured full tool I/O + seed, replay from log." },
    ],
    results:
      "Replaced 11 bespoke automation scripts across ops. One on-call rotation went from weekly pages to monthly.",
    future: ["Visual workflow diff", "Approval gates for risky branches"],
  },

  {
    slug: "quiver-eval",
    name: "Quiver Eval",
    tagline: "LLM evaluation harness.",
    description:
      "Regression gates, rubric scoring, and human-in-the-loop review for LLM features.",
    tags: ["Evaluation", "LLMOps", "Python"],
    categories: ["evaluation", "llm"],
    status: "live",
    labels: ["Open Source"],
    github: "#",
    demo: "#",
    year: 2025,
    role: "Architect · Builder",
    accent: "var(--accent)",
    problem:
      "Most teams can't tell whether their LLM feature got better or worse after a change. Evals are scattered across notebooks, dashboards, and vibes.",
    solution:
      "Quiver is a small CLI + dashboard that turns evals into CI gates. Define a rubric, write cases, run on every PR, review failures in one place.",
    workflow: [
      { label: "Author",    blurb: "Write eval cases + rubrics." },
      { label: "Run",       blurb: "Execute locally or in CI." },
      { label: "Compare",   blurb: "Diff results against the last green." },
      { label: "Gate",      blurb: "Block merges on regression." },
      { label: "Review",    blurb: "Annotate failures for the next pass." },
    ],
    architecture: [
      "CLI",
      "Case runner",
      "Rubric scorer",
      "LLM judge",
      "Result store",
      "CI integration",
      "Web dashboard",
    ],
    tech: {
      ai_ml:     ["GPT-class judge", "Custom rubric scorers"],
      frontend:  ["React", "Vite"],
      backend:   ["Python", "FastAPI"],
      database:  ["Postgres", "DuckDB"],
      infra:     ["GitHub Actions", "Docker"],
      apis:      ["OpenAI", "Anthropic"],
    },
    decisions: [
      {
        title: "Code-first cases",
        choice: "Cases as Python + YAML, not a web form",
        alternatives: ["Web-only authoring"],
        reason:
          "Version control and reviewability beat any UI for eval authoring.",
      },
    ],
    metrics: [
      { label: "Eval runs / week", value: "2.4k" },
      { label: "Median regression catch", value: "<1", suffix: "d" },
      { label: "False positive gate", value: "2.1", suffix: "%" },
    ],
    challenges: [
      { title: "Judge drift", what: "LLM judge scores drifted over time.", fix: "Pinned judge model + monthly calibration set." },
    ],
    results:
      "Caught 14 regressions pre-merge in the first quarter across 6 product teams.",
    future: ["Multi-judge consensus", "Eval coverage reports"],
  },

  {
    slug: "lumen-local",
    name: "Lumen Local",
    tagline: "Local LLM deployment toolkit.",
    description:
      "Model routing, quantization, and offline inference for serious local deployments.",
    tags: ["Local LLM", "Inference", "Rust"],
    categories: ["local-llm"],
    status: "live",
    labels: ["Open Source"],
    github: "#",
    demo: "#",
    year: 2025,
    role: "Architect · Builder",
    accent: "var(--accent)",
    problem:
      "Local LLM deployments are a maze of runtimes, quantizations, and model-specific quirks. Nobody wants to debug llama.cpp configs in production.",
    solution:
      "Lumen wraps the boring parts: model registry, quantization presets, a routing layer that picks the right model per request, and a metrics surface that respects the offline-first promise.",
    workflow: [
      { label: "Pull",       blurb: "Fetch a verified model + quantization." },
      { label: "Quantize",   blurb: "Apply a preset (Q4, Q5, Q8)." },
      { label: "Route",      blurb: "Send requests to the right model." },
      { label: "Observe",    blurb: "Tokens/s, memory, error rates." },
      { label: "Update",     blurb: "Roll models without restart." },
    ],
    architecture: [
      "CLI / API",
      "Model registry",
      "Quantizer",
      "Inference pool",
      "Router",
      "Metrics exporter",
      "Hot-reload manager",
    ],
    tech: {
      ai_ml:     ["llama.cpp", "GGUF", "Token healing"],
      frontend:  ["Terminal UI"],
      backend:   ["Rust", "Tokio"],
      database:  ["SQLite"],
      infra:     ["systemd", "Docker"],
      apis:      ["OpenAI-compatible"],
    },
    decisions: [
      {
        title: "Rust core",
        choice: "Rust for the runtime, with thin Python bindings",
        alternatives: ["Pure Python"],
        reason:
          "Latency and memory predictability mattered more than developer ergonomics in the hot path.",
      },
    ],
    metrics: [
      { label: "Tokens / s", value: "62" },
      { label: "Cold start", value: "1.2", suffix: "s" },
      { label: "Memory ceiling", value: "9.4", suffix: "GB" },
    ],
    challenges: [
      { title: "Quantization regressions", what: "Some models degraded badly at Q4.", fix: "Per-model quantization presets with eval gates." },
    ],
    results:
      "Powers three internal copilots that run entirely on local hardware.",
    future: ["Speculative decoding", "GPU auto-tuning"],
  },

  {
    slug: "nimbus-productivity",
    name: "Nimbus Productivity",
    tagline: "Personal AI operating layer.",
    description:
      "Email triage, calendar shaping, and daily briefs stitched into one quiet surface.",
    tags: ["Productivity", "Agents", "Apps"],
    categories: ["agents", "automation"],
    status: "experimental",
    labels: ["Experimental"],
    github: "#",
    demo: "#",
    year: 2026,
    role: "Architect · Builder",
    accent: "var(--accent)",
    problem:
      "Personal AI tools tend to be either shallow chat windows or heavyweight agents that demand too much. I wanted something between a calendar and a colleague.",
    solution:
      "Nimbus watches the things you already use (inbox, calendar, notes), keeps a small persistent model of what's important, and surfaces a brief each morning. It acts when asked and shuts up otherwise.",
    workflow: [
      { label: "Watch",   blurb: "Inbox + calendar + notes via OAuth." },
      { label: "Model",   blurb: "Small persistent state of priorities." },
      { label: "Brief",   blurb: "Morning summary, ranked by you." },
      { label: "Act",     blurb: "Drafts replies, schedules focus blocks." },
      { label: "Reflect", blurb: "End-of-day log + weekly review." },
    ],
    architecture: [
      "Watchers (email / calendar / notes)",
      "State store",
      "Brief generator",
      "Action executor",
      "Reflection loop",
      "Local LLM fallback",
    ],
    tech: {
      ai_ml:     ["Hosted LLM", "Local GGUF fallback", "Embeddings for ranking"],
      frontend:  ["Next.js", "Tailwind"],
      backend:   ["TypeScript", "tRPC"],
      database:  ["Postgres", "SQLite"],
      infra:     ["Vercel", "Cron jobs"],
      apis:      ["Gmail", "Google Calendar", "Notion"],
    },
    decisions: [
      {
        title: "Quiet by default",
        choice: "Only surface what's worth surfacing",
        alternatives: ["Always-on notifications"],
        reason:
          "Notification fatigue kills personal tools. Nimbus only speaks when there's something worth saying.",
      },
    ],
    metrics: [
      { label: "Daily active", value: "92", suffix: "%" },
      { label: "Brief usefulness", value: "4.6", suffix: "/5" },
      { label: "Drafts accepted", value: "47", suffix: "%" },
    ],
    challenges: [
      { title: "Privacy boundary", what: "Cloud LLM saw personal context.", fix: "Added a local-only mode for sensitive accounts." },
    ],
    results:
      "Personal tool; used every day. Calendar density dropped 18% without missed commitments.",
    future: ["Voice briefs", "Cross-account state"],
  },
];

export function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug) || null;
}

export function getAdjacentProjects(slug) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  const prev = i > 0 ? PROJECTS[i - 1] : PROJECTS[PROJECTS.length - 1];
  const next = i < PROJECTS.length - 1 ? PROJECTS[i + 1] : PROJECTS[0];
  return { prev, next };
}

export function listProjectsByCategory(categoryKey) {
  if (!categoryKey || categoryKey === "all") return PROJECTS;
  return PROJECTS.filter((p) => p.categories.includes(categoryKey));
}
