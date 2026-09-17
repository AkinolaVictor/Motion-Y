// Experiment dataset — used by /lab (filterable specimen list) and the
// FeaturedExperiment block at the top of the page. Each entry is a
// self-contained lab-notebook record.
//
// Field semantics:
//   id           stable slug (EXP-NNN style) used as the visual index on cards
//   title        display title (short, often a question or fragment)
//   category     filter bucket used on the listing filter bar (matches CATEGORIES)
//   date         ISO date of the experiment (used to sort newest → oldest)
//   status       "exploring" | "successful" | "failed" | "iterating"
//   tech[]       models / frameworks / datasets used
//   question     what I was trying to understand or solve
//   experiment   what approach, model, architecture, or technique was tested
//   result       what happened — include metrics or observations
//   learned      the key insight or lesson
//   github       optional repo URL ("#" placeholder if not yet public)
//   featured     true → show as the large FeaturedExperiment block

export const CATEGORIES = [
  { key: "all",          label: "All" },
  { key: "local-llm",    label: "Local LLM" },
  { key: "agents",       label: "Agents" },
  { key: "rag",          label: "RAG" },
  { key: "prompts",      label: "Prompts" },
  { key: "multimodal",   label: "Multimodal" },
  { key: "devtools",     label: "Developer Tools" },
];

export const STATUS_LABELS = {
  exploring:  { label: "Exploring",  dot: "bg-[var(--accent)]" },
  successful: { label: "Successful", dot: "bg-emerald-400" },
  failed:     { label: "Failed",     dot: "bg-rose-400" },
  iterating:  { label: "Iterating",  dot: "bg-amber-400" },
};

export const EXPERIMENTS = [
  {
    id: "EXP-014",
    title: "Can a 7B model ground its own citations?",
    category: "rag",
    date: "2026-08-12",
    status: "iterating",
    tech: ["Mistral 7B", "QLoRA", "pgvector", "BM25"],
    question:
      "Can a small open-source model be trained to refuse to answer when retrieval confidence drops below a threshold — instead of hallucinating?",
    experiment:
      "Fine-tuned Mistral-7B with QLoRA on 4k synthetic (query, grounded-answer, refusal) triplets. Hybrid retriever (BM25 + dense) feeds top-8 chunks with calibrated scores. Generator forced to emit either a cited answer or a structured REFUSE token.",
    result:
      "Refusal precision climbed from 0.61 → 0.89. Hallucination rate dropped 3.4×. Cost: 18% increase in latency and ~600 MB extra VRAM at inference.",
    learned:
      "A small model can learn citation discipline, but only if the training data includes plenty of 'should have refused' examples. The generator over-trusts context without them.",
    github: "#",
    featured: true,
  },
  {
    id: "EXP-013",
    title: "Agent loop with a self-critic step",
    category: "agents",
    date: "2026-07-28",
    status: "successful",
    tech: ["Claude Sonnet", "LangGraph", "Tavily"],
    question:
      "Does adding an explicit self-critic step (generate → critique → revise) improve tool-use agent accuracy on multi-hop tasks?",
    experiment:
      "Built two LangGraph agents on identical prompts and tool sets. Control: single-shot generate. Test: generate → critic (same model) → revise up to 2 times. Ran both over 120 HotpotQA-style questions.",
    result:
      "Test agent reached 71% final-answer accuracy vs 58% control. Cost: 2.3× more tokens. Critic flagged real errors 64% of the time, hallucinated issues 11%.",
    learned:
      "Self-critique helps, but the critic itself becomes a weak link. A bigger or more specialised critic model would likely close the remaining gap.",
    github: "#",
    featured: false,
  },
  {
    id: "EXP-012",
    title: "Quantising Llama-3 8B for M-series Mac",
    category: "local-llm",
    date: "2026-07-10",
    status: "successful",
    tech: ["Llama-3 8B", "MLX", "GPTQ"],
    question:
      "What's the lowest quantisation level at which Llama-3 8B remains useful for code review on a 16 GB M2 MacBook?",
    experiment:
      "Ran the same 200-function review benchmark across q4, q3, and q2 quantisations via MLX and GPTQ. Scored against GPT-4o as ground truth.",
    result:
      "q4: 0.92 alignment with GPT-4o. q3: 0.78. q2: 0.51, with frequent reasoning collapses. Memory: 4.6 GB / 3.8 GB / 3.1 GB respectively.",
    learned:
      "q4 is the sweet spot. q2 is unusable for any reasoning task. Tokens/sec almost identical — quantisation is a quality lever, not a speed lever.",
    github: "#",
    featured: false,
  },
  {
    id: "EXP-011",
    title: "Prompt contract for tool calls",
    category: "prompts",
    date: "2026-06-22",
    status: "successful",
    tech: ["Claude Haiku", "JSON schema"],
    question:
      "Can a strict JSON-schema prompt contract reduce tool-call format errors below 1% without using constrained decoding?",
    experiment:
      "Designed a single system prompt with explicit JSON-schema, allowed-empty-field rules, and example failures. Ran 5,000 tool calls across 12 tool types.",
    result:
      "Format errors dropped from 4.7% to 0.6%. Adding few-shot examples of valid edge cases (nulls, empty arrays) closed most of the remaining gap.",
    learned:
      "Models are remarkably good at following schema contracts if you show them what 'almost-but-not-quite' looks like. Edge-case examples beat rephrased rules.",
    github: "#",
    featured: false,
  },
  {
    id: "EXP-010",
    title: "Multimodal PDF chunking",
    category: "multimodal",
    date: "2026-06-04",
    status: "iterating",
    tech: ["GPT-4o vision", "Unstructured", "Chroma"],
    question:
      "Does rendering each PDF page as an image and letting a vision model extract semantic chunks beat traditional text extraction on mixed-layout documents?",
    experiment:
      "Processed 80 mixed-layout PDFs (tables, figures, footnotes) three ways: (a) Unstructured text extraction, (b) layout-aware extraction, (c) per-page vision model extraction. Retrieval benchmark on 60 domain questions.",
    result:
      "Vision approach: 0.79 recall@5. Layout-aware: 0.71. Plain text: 0.54. Vision cost: 14× more, 9s/page vs 0.3s.",
    learned:
      "Vision wins on layout-rich content, but the latency is the blocker. Best path is likely a hybrid: text extraction first, vision reranker for low-confidence pages.",
    github: "#",
    featured: false,
  },
  {
    id: "EXP-009",
    title: "Why my agent kept calling the same tool",
    category: "agents",
    date: "2026-05-18",
    status: "failed",
    tech: ["Claude Haiku", "function calling"],
    question:
      "Why does my ReAct agent repeatedly invoke the same search tool with near-identical queries until it hits the step limit?",
    experiment:
      "Logged 50 broken traces. Manually classified the failure modes. Tested three fixes: tighter step budgets, query-deduplication middleware, and a 'progress check' prompt.",
    result:
      "62% of failures were repetition loops, 24% were circular tool chains, 14% were infinite confirmation loops. Only the progress-check prompt actually helped — 71% reduction.",
    learned:
      "Step limits cap the damage but don't fix it. The agent needs an explicit 'have I made progress?' check, otherwise it confuses activity with progress.",
    github: "#",
    featured: false,
  },
  {
    id: "EXP-008",
    title: "Local RAG with no vector DB",
    category: "local-llm",
    date: "2026-05-02",
    status: "successful",
    tech: ["llama.cpp", "Numpy", "BM25"],
    question:
      "How much of a difference does the vector DB actually make for a single-user, single-machine RAG setup with under 10k documents?",
    experiment:
      "Built two retrieval pipelines with identical prompts and generator: (a) Chroma + sentence-transformers, (b) pure BM25 in-memory. Same 500-query eval set.",
    result:
      "Vector: 0.68 recall@5. BM25: 0.61. Difference smaller than expected. Vector pipeline took 3× longer to index and 1.4× longer to query.",
    learned:
      "For small corpora, BM25 is shockingly competitive and dramatically simpler to operate. Vector search is a scale solution, not a quality solution by default.",
    github: "#",
    featured: false,
  },
  {
    id: "EXP-007",
    title: "AI eval rubrics for subjective tasks",
    category: "prompts",
    date: "2026-04-14",
    status: "exploring",
    tech: ["Claude Opus", "rubric design"],
    question:
      "Can LLM-as-judge work for subjective tasks (UX writing, design critique) if the rubric is structured carefully enough?",
    experiment:
      "Wrote 12 detailed rubrics across writing quality, code review tone, and design feedback specificity. Ran pairwise comparisons with both Opus-as-judge and human reviewers on 90 outputs.",
    result:
      "Opus-judge vs human agreement: 0.74 (writing), 0.68 (code review), 0.61 (design). Disagreement clusters around 'specificity' criteria — humans reward detail, the model rewards confidence.",
    learned:
      "LLM judges can scale subjective eval, but only if every rubric criterion is operationalised with concrete examples. Generic criteria produce confident-but-misleading scores.",
    github: "#",
    featured: false,
  },
  {
    id: "EXP-006",
    title: "Streaming a 70B model on consumer hardware",
    category: "local-llm",
    date: "2026-03-29",
    status: "failed",
    tech: ["Llama-3 70B", "exllamav2", "NVLink offload"],
    question:
      "Can a 70B-parameter model run interactively (≥15 tok/s) on a single consumer GPU with offloading tricks?",
    experiment:
      "Tested 4-bit exl2 quantisation on a 24 GB RTX 4090 with various CPU offload configurations. Measured sustained tokens/sec over a 2k-token generation.",
    result:
      "Best case: 11.2 tok/s with 12 GB CPU offload. Acceptable for batch but not for chat UX. 8-bit variant hit 6 tok/s — unusable.",
    learned:
      "For local inference, 70B is a batch tool, not an interactive one. Either drop to a 13B model for chat or accept a 4–5× slower interaction.",
    github: "#",
    featured: false,
  },
  {
    id: "EXP-005",
    title: "Building a minimal eval harness",
    category: "devtools",
    date: "2026-03-11",
    status: "successful",
    tech: ["Python", "Pytest", "JSONL"],
    question:
      "What's the smallest eval harness I can build that still catches regressions across prompt and model changes?",
    experiment:
      "Built a ~300-line Python harness: JSONL test cases, deterministic + LLM-judge scorers, regression thresholds, and a CLI for diffing runs. Used it on my own projects for 30 days.",
    result:
      "Caught 4 silent regressions over the month that I would have shipped. Cost: ~2 hours to build, ~10 minutes per run. Replaced my prior 'spot-check' workflow entirely.",
    learned:
      "Evals don't have to be a platform. A flat file, a runner, and a threshold are enough. The discipline matters more than the tooling.",
    github: "#",
    featured: false,
  },
  {
    id: "EXP-004",
    title: "Vision-language document Q&A",
    category: "multimodal",
    date: "2026-02-20",
    status: "successful",
    tech: ["GPT-4o", "pdf2image"],
    question:
      "For scanned invoices and receipts, does sending page images directly to a vision model beat OCR-then-LLM pipelines?",
    experiment:
      "Tested on 200 real receipts with hand-written annotations. Compared (a) Tesseract OCR + GPT-4o, (b) direct GPT-4o vision input, (c) Claude Sonnet vision input.",
    result:
      "OCR pipeline: 0.71 field accuracy. GPT-4o vision: 0.93. Claude vision: 0.91. Vision models also handled handwritten fields that OCR completely missed.",
    learned:
      "For noisy, layout-heavy documents, vision-language models have effectively replaced OCR+LLM pipelines. The extra cost is almost always worth it.",
    github: "#",
    featured: false,
  },
  {
    id: "EXP-003",
    title: "Prompt caching payoff",
    category: "prompts",
    date: "2026-02-04",
    status: "successful",
    tech: ["Anthropic prompt caching"],
    question:
      "How much does prompt caching actually save on a retrieval-heavy chat app with 20k conversations/day?",
    experiment:
      "Wrapped two identical workloads, one with prompt caching on the system prompt + retrieved context prefix, one without. Measured latency and cost over a week.",
    result:
      "Cost reduction: 78% on cached portion. p50 latency: 1.4s → 0.9s. Cache hit rate stabilised at 91% after the first day.",
    learned:
      "Caching is the single highest-leverage optimisation for retrieval-heavy apps. The only catch is the prefix must be stable — anything dynamic must come AFTER the cache breakpoint.",
    github: "#",
    featured: false,
  },
  {
    id: "EXP-002",
    title: "Agent that plans before it acts",
    category: "agents",
    date: "2026-01-22",
    status: "iterating",
    tech: ["Claude Sonnet", "ReAct", "Plan-and-Execute"],
    question:
      "Does forcing an agent to commit to a written plan before its first tool call reduce wasted tool invocations?",
    experiment:
      "Ran 80 web-research tasks under three agent modes: pure ReAct, plan-then-ReAct, and plan-then-execute (no replan). Measured tool-call counts and final accuracy.",
    result:
      "Plan-then-ReAct used 31% fewer tool calls and reached 0.78 accuracy vs 0.71. Plan-then-execute was faster but dropped to 0.62 — the inability to replan hurt.",
    learned:
      "A plan is useful as scaffolding, not as a contract. Agents need to be able to revise when the plan turns out wrong. Pure ReAct wanders; pure plan-and-execute gets stuck.",
    github: "#",
    featured: false,
  },
  {
    id: "EXP-001",
    title: "First fine-tune, first lesson",
    category: "local-llm",
    date: "2026-01-08",
    status: "successful",
    tech: ["Mistral 7B", "QLoRA", "PEFT"],
    question:
      "Can a domain-specific fine-tune on a 7B model beat GPT-3.5 on a narrow legal-summarisation task?",
    experiment:
      "Curated 1,200 (contract, summary) pairs. QLoRA fine-tuned Mistral-7B-Instruct. Ran a 100-task blind eval against GPT-3.5-Turbo, judged by GPT-4.",
    result:
      "Fine-tuned 7B: 0.74 win rate. GPT-3.5: 0.59 (0.34 ties). Fine-tune cost: $42 of compute. Inference cost per summary dropped from $0.011 to $0.0008.",
    learned:
      "Narrow fine-tunes pay off when (a) the domain vocabulary is consistent, (b) you have ≥1k quality examples, and (c) you can validate with a separate held-out set.",
    github: "#",
    featured: false,
  },
];

export function listExperimentsByCategory(category) {
  if (category === "all" || !category) return [...EXPERIMENTS];
  return EXPERIMENTS.filter((e) => e.category === category);
}

export function getFeaturedExperiment() {
  return EXPERIMENTS.find((e) => e.featured) ?? EXPERIMENTS[0];
}
