// Article dataset — used by the home page (3 cards), /writing (filterable
// editorial list + FeaturedArticle), and /writing/[slug] (full article).
// Each entry is a self-contained record so the detail page can render
// entirely from this file.
//
// Field semantics:
//   slug         url-safe id
//   issue        display index (ISSUE-NNN) shown on cards — chronological, not decorative
//   title        display title
//   excerpt      1–2 sentence summary (used on listing cards)
//   category     filter bucket (matches CATEGORIES)
//   date         ISO publication date (used to sort newest → oldest)
//   readTime     "X min" label
//   tags[]       technology / topic tags
//   lede         first paragraph — rendered as the drop-cap lede on the
//                featured article. Distinct from `excerpt`.
//   pullQuote    mid-article quote rendered as an editorial pull-out
//   body[]       ordered array of typed content blocks (see block shapes below)
//   takeaways[]  ordered list of key insights, rendered as a numbered list
//   featured     true → show as the large FeaturedArticle block
//
// Block shapes for body[]:
//   { type: "p",      text }
//   { type: "h2",     text }
//   { type: "p",      text }
//   { type: "list",   ordered: bool, items: string[] }
//   { type: "code",   lang: string, code: string }
//   { type: "quote",  text, cite?: string }
//   { type: "hr" }
//   { type: "callout", tone: "info"|"warn", text }

export const CATEGORIES = [
  { key: "all",                label: "All" },
  { key: "ai-engineering",     label: "AI Engineering" },
  { key: "ai-development",     label: "AI + Development" },
  { key: "experiments",        label: "Technical Experiments" },
];

export const ARTICLES = [
  {
    slug: "designing-agent-loops-that-dont-spiral",
    issue: "014",
    title: "Designing agent loops that don't spiral",
    excerpt:
      "Why most agent failures are loop failures — and the three small fixes that kept my last multi-agent system out of an infinite tool-call tail.",
    category: "ai-engineering",
    date: "2026-08-12",
    readTime: "6 min",
    tags: ["Agents", "Reliability"],
    lede:
      "Most agent failures don't look like failures for a long time. The first ten iterations of a multi-step agent look confident, then look slightly less confident, then quietly stop making progress — and only the step-limit error makes the spiral visible. By the time you notice, the model has spent the budget doing the same search five times.",
    pullQuote:
      "Activity is not progress. The cheapest way to break an agent loop is to force it to ask, every step, whether anything has actually changed.",
    body: [
      { type: "h2",  text: "The shape of a spiral" },
      { type: "p",   text: "Every agent loop I've watched break did so the same way: the model kept doing things, just not new things. The state of the world didn't change between step 4 and step 9, but the model still issued tool calls because the loop hadn't given it a reason to stop. The failure isn't in the tool calls — it's in the absence of a stopping signal." },
      { type: "p",   text: "When I trace these runs after the fact, the pattern is almost always one of three loops. A search loop, where the agent refines its query slightly and re-runs it. A confirmation loop, where the agent re-checks something it has already seen. A planning loop, where the agent re-writes a plan that already exists in its context. None of these are visible from the outside until the step counter starts looking embarrassing." },
      { type: "h2",  text: "Fix 1 — a progress check, not a step counter" },
      { type: "p",   text: "Step limits cap the damage. They don't fix it. What actually breaks the loop is forcing the model to evaluate, every step, whether the world has changed since the last step. The cheapest version is a single sentence in the system prompt: before your next tool call, state in one line whether your belief about the answer has changed." },
      { type: "p",   text: "This works because agents over-trust their context. Without an explicit 'have I made progress?' gate, the model confuses motion with motion-toward-the-answer. With it, the agent notices when it's repeating itself and chooses to either commit to an answer or ask for help." },
      { type: "h2",  text: "Fix 2 — a deduplication middleware" },
      { type: "p",   text: "Even with a progress check, two search calls with subtly different queries can still slip through. A 30-line middleware that hashes each tool call's inputs and refuses to re-issue any call whose hash has already fired in the last N steps is the cheapest insurance you can buy. Refusals are surfaced to the model as a normal tool result, so it adapts." },
      { type: "code", lang: "python", code:
`def dedupe_middleware(call_history, threshold=0.85):
    def wrapper(call):
        sig = (call.name, json.dumps(call.args, sort_keys=True))
        if sig in call_history:
            return ToolResult(error="duplicate_call_recent")
        call_history.add(sig)
        return call.run()
    return wrapper` },
      { type: "h2",  text: "Fix 3 — a confirmed-output gate" },
      { type: "p",   text: "The third failure mode is the agent 'finishing' when it hasn't. It writes an answer that doesn't match its retrieved evidence, or skips a step it thought it had already done. The fix is a final gate: before returning, the agent must emit a structured 'answer' object that names which evidence it used. If the named evidence doesn't appear in the trace, the run is rejected and the loop continues." },
      { type: "p",   text: "These three fixes aren't clever. They are mostly discipline. The point is that the model is good at solving problems but bad at noticing when it has stopped solving them — and the cheapest reliable answer is to give it better feedback than its own momentum." },
    ],
    takeaways: [
      "Activity is not progress — agents need an explicit progress check, not just a step limit.",
      "A small deduplication middleware catches the worst repetition loops without retraining anything.",
      "A confirmed-output gate forces the agent to name its evidence, which surfaces most silent failures.",
    ],
    featured: true,
  },
  {
    slug: "rag-is-not-a-product-retrieval-is",
    issue: "013",
    title: "RAG is not a product, retrieval is",
    excerpt:
      "A useful framing for any team building knowledge-aware AI: stop selling RAG and start selling retrieval you can debug.",
    category: "ai-engineering",
    date: "2026-07-28",
    readTime: "8 min",
    tags: ["RAG", "Architecture"],
    lede:
      "The fastest way to ship a bad RAG system is to treat retrieval as a black box the LLM politely papers over. The fastest way to ship a great one is to admit that retrieval is the product, and everything else is rendering.",
    pullQuote:
      "If you can't open a retrieval trace and explain why a chunk was returned, you don't have a RAG system. You have a guessing machine with citations.",
    body: [
      { type: "h2", text: "Two failure modes, one cause" },
      { type: "p",  text: "Most RAG systems I review fail in one of two ways: they return the wrong chunk, or they return the right chunk for the wrong reason. Both look identical to the LLM. Both produce confident-sounding answers with citations to paragraphs that don't actually support the claim. The model's job — generating plausible text — gets blamed for what is really a retrieval problem." },
      { type: "p",  text: "Once you accept that retrieval is the product, the rest of the system starts to make sense. You invest in traceability: every retrieved chunk needs a reason. You invest in observability: every query needs to be replayable. You invest in evaluation: retrieval quality is a first-class metric, not a side effect." },
      { type: "h2", text: "What 'debuggable retrieval' actually means" },
      { type: "p",  text: "A retrieval system you can debug answers three questions for any chunk it returns: where did this come from, why did it match, and how confident are you. The first is metadata. The second is the actual scoring signal — dense similarity, BM25 score, cross-encoder output. The third is calibrated and honest about its uncertainty." },
      { type: "list", ordered: false, items: [
        "Every chunk should carry its source, version, and embedding metadata.",
        "Every match score should be visible in the trace, not aggregated away.",
        "Every retrieval should expose its confidence, including when that confidence is low.",
        "Every retrieval decision should be replayable from a query log.",
      ]},
      { type: "h2", text: "Generators are the easy part" },
      { type: "p",  text: "Once retrieval is solid, the LLM becomes almost incidental. A well-grounded prompt with five well-chosen chunks produces good answers from any capable model. The model is the rendering layer. The hard work is the pipeline that puts the right paragraphs in front of it." },
      { type: "p",  text: "This reframing is uncomfortable because it means most of the engineering effort goes into the part nobody talks about in conference talks. But it is also liberating: once you stop trying to make the LLM 'smarter' and start making retrieval honest, the system gets better on every dimension that matters — accuracy, latency, cost, debuggability, and trust." },
    ],
    takeaways: [
      "Treat retrieval as the product; treat the LLM as the renderer.",
      "Every retrieved chunk should expose its source, its score, and its confidence.",
      "If you can't replay a retrieval from logs, you can't debug it.",
    ],
    featured: false,
  },
  {
    slug: "evaluating-llm-apps-when-ground-truth-wont-sit-still",
    issue: "012",
    title: "Evaluating LLM apps when the ground truth won't sit still",
    excerpt:
      "A practical rubric for shipping LLM features into domains where the answer changes weekly — and how to keep eval honest.",
    category: "ai-engineering",
    date: "2026-07-09",
    readTime: "7 min",
    tags: ["Evaluation", "LLMOps"],
    lede:
      "In most of the domains I work in, the ground truth mutates under you. Models get upgraded, policies change, products pivot. A rubric that was correct six weeks ago is now confidently wrong. If your eval harness can't keep up, it will lie to you in increasingly plausible ways.",
    pullQuote:
      "An eval suite you trust because it was right last month is a liability the moment the world moves on.",
    body: [
      { type: "h2", text: "Why static evals rot" },
      { type: "p",  text: "The eval suite you build today is a snapshot of your model's behaviour on a frozen set of inputs against a frozen set of expected outputs. Six weeks from now, two of those three things will have moved. The model changes because you upgraded it. The world changes because your domain changed. Your rubric is still scoring the old version of the problem." },
      { type: "p",  text: "You don't notice this immediately. The scores look fine, slightly different week to week, still in the green. The failure mode is slow: the eval stops catching the regressions you actually care about while continuing to catch the ones you don't. By the time you realize, the eval is a confidence trick you're running on yourself." },
      { type: "h2", text: "Three rules for honest evals" },
      { type: "list", ordered: true, items: [
        "Every test case should carry a 'staleness budget' — a date after which it must be re-reviewed or retired.",
        "Every rubric criterion should be operationalized with concrete examples of what 'yes' and 'no' look like.",
        "Every eval run should compare against the previous run, not against an absolute threshold.",
      ]},
      { type: "h2", text: "Operationalizing the rubric" },
      { type: "p",  text: "Generic criteria produce confident-but-misleading scores. 'Was the answer helpful?' is not a criterion, it's a vibe. The model will optimize for whatever your judge is implicitly rewarding, and if your judge is also a model, it will reward confident, well-structured answers regardless of whether they are correct. The fix is concrete examples — both pass and fail — attached to every criterion." },
      { type: "code", lang: "yaml", code:
`criterion: citation_accuracy
description: >
  Every factual claim must cite a retrieved chunk by id,
  and the cited chunk must support the claim.
pass_examples:
  - "Claim: 'Acme raised $20M in 2024' cites chunk 'sec-2024-q3'"
fail_examples:
  - "Claim cites chunk 'sec-2024-q1' but claim is about 2024 total"` },
      { type: "h2", text: "Watching for drift" },
      { type: "p",  text: "The cheapest reliable signal that an eval has rotted is a regression in a metric you've stopped caring about. If a metric you used to monitor drops to zero and you don't notice for two weeks, your monitoring has rotted too. Pair every metric with a date — 'last meaningful change' — and review both on a cadence. The eval suite is a living document. Treat it like one." },
    ],
    takeaways: [
      "Static evals rot; every test case needs a staleness budget.",
      "Generic rubric criteria produce confident-but-misleading scores; operationalize with examples.",
      "Every metric needs an owner and a review cadence — otherwise it silently goes stale.",
    ],
    featured: false,
  },
  {
    slug: "how-i-use-claude-code-in-development",
    issue: "011",
    title: "How I use Claude Code in development",
    excerpt:
      "A working session from a recent feature build — what I delegated, what I held onto, and where the tool genuinely changed how I work.",
    category: "ai-development",
    date: "2026-06-21",
    readTime: "9 min",
    tags: ["Workflow", "Tooling"],
    lede:
      "I've been using Claude Code as a daily driver for about six months. The honest summary: it has changed the shape of my work, not the volume. I write fewer boilerplate lines and I think about architecture more, because the boring parts are off my hands.",
    pullQuote:
      "The best use of an AI coding tool isn't to write more code. It's to keep the cognitive cost of context-switching low enough that you actually finish things.",
    body: [
      { type: "h2", text: "What I delegate" },
      { type: "p",  text: "Boilerplate, tests, and refactors with a clear mechanical shape. The things I used to spend 20 minutes on because they required attention but not thought. Asking the model to 'add a vitest spec for this component, matching the existing pattern' returns something I can review in 90 seconds, and the alternative — opening a test file, remembering the matcher API, getting the imports right — used to eat 20 minutes." },
      { type: "list", ordered: false, items: [
        "First-draft test scaffolding for new components.",
        "Mechanical refactors: rename across files, update import paths, fix obvious type drift.",
        "Glue code: small adapters between systems whose interfaces I already understand.",
        "Documentation: docstrings, README sections, and changelog entries written from the diff.",
      ]},
      { type: "h2", text: "What I hold onto" },
      { type: "p",  text: "Architecture decisions, naming, and the bits where the 'why' matters more than the 'what'. I write the public API of every module by hand because I want to feel the friction of a bad name while I'm picking one. I write the tests for anything subtle — race conditions, edge cases in parsers, anything where the wrong assertion would silently pass." },
      { type: "p",  text: "I also hold onto debugging in unfamiliar territory. When I don't know what the code is supposed to do, the model is worse than I am at reasoning about it, because I have context it doesn't. I'll ask the model to explain code, but I won't ask it to fix code I don't understand." },
      { type: "h2", text: "A working session" },
      { type: "p",  text: "Last week I built a small CLI that batches API requests. I wrote the argument parser and the high-level flow by hand. I asked the model to draft the retry-and-backoff logic, the JSON response shape, and the test cases. I rejected its first pass on the retry logic — it didn't handle 429s with Retry-After — and asked for a revision that did. The whole module took about 90 minutes instead of half a day." },
      { type: "h2", text: "Where the tool changed my work" },
      { type: "p",  text: "Honestly: the cognitive cost of context-switching. The biggest thing AI coding tools do for me is lower the cost of putting something down and picking something else up. The fifteen-minute warmup where I remember where I left off used to be a real tax. Now I can ask the model to summarize the state of a module and I'm back in it in two minutes." },
      { type: "callout", tone: "info", text: "This is the under-appreciated win. The tool is not writing more code than I would have — it's keeping my focus intact across a longer work day." },
    ],
    takeaways: [
      "Delegate boilerplate, tests, and mechanical refactors. Hold onto architecture, naming, and unfamiliar debugging.",
      "The real win of AI coding tools is lower context-switching cost, not higher throughput.",
      "Always review model-drafted code for the cases you know are subtle; reject first passes on anything subtle.",
    ],
    featured: false,
  },
  {
    slug: "building-an-ai-native-development-workflow",
    issue: "010",
    title: "Building an AI-native development workflow",
    excerpt:
      "What it actually looks like to put AI tooling at the centre of a personal workflow — and the small rituals that make it stick.",
    category: "ai-development",
    date: "2026-06-04",
    readTime: "10 min",
    tags: ["Workflow", "Productivity"],
    lede:
      "There is a difference between using AI tools and having an AI-native workflow. The first is something you do; the second is something you've designed around. The second one is what you want, and it takes a few small choices to get there.",
    pullQuote:
      "An AI-native workflow isn't a tool list. It's a set of decisions about what you keep for yourself and what you hand off, made deliberately.",
    body: [
      { type: "h2", text: "The tool list is the easy part" },
      { type: "p",  text: "Most people who say they have an AI-native workflow mean they have installed a few tools. That is not a workflow. A workflow is what you do when you sit down to work, in what order, with what handoffs. The tools are just where the work happens." },
      { type: "p",  text: "The shift is from 'use AI when it's obvious' to 'design my work so that AI is the natural choice at the right moments.' That requires a few small rituals — repeatable ways of handing things off to the model without losing context." },
      { type: "h2", text: "Three small rituals" },
      { type: "list", ordered: true, items: [
        "A morning summary ritual: ask the model to summarize what changed overnight in the modules I'm working on. Five minutes to context instead of thirty.",
        "A 'before I commit' review: paste the diff, ask for risks, edge cases, and obvious bugs. Catches most of what I'd miss on a tired afternoon.",
        "A weekly 'what did I learn' digest: capture interesting model behaviours, failure modes, and useful prompts into a running notebook.",
      ]},
      { type: "h2", text: "What you keep for yourself" },
      { type: "p",  text: "The discipline that matters most is naming what you will not delegate. For me: architecture, naming, the parts of debugging where I don't yet understand the system, and any decision that changes what other people will see. These are the things where my judgement is the actual product, and outsourcing them produces work that looks like mine but isn't." },
      { type: "h2", text: "What you hand off" },
      { type: "p",  text: "Anything where the bar is 'looks like what I would have written' rather than 'looks like what I would have written on my best day.' First drafts of tests, scaffolding, glue code, docstrings, commit messages. Things that are easy to review but expensive to write from scratch when the cognitive load is high." },
      { type: "callout", tone: "warn", text: "The trap is letting the delegation creep upward. Every few weeks, audit what you've handed off and ask whether you're still doing the parts of the work that made you good at it." },
    ],
    takeaways: [
      "A workflow is the order and shape of your work, not the list of tools you have.",
      "Three small rituals — morning summary, pre-commit review, weekly digest — do most of the heavy lifting.",
      "Re-delegate aggressively on tasks that look like you. Hold tightly on tasks that change what other people see.",
    ],
    featured: false,
  },
  {
    slug: "using-local-llms-for-coding",
    issue: "009",
    title: "Using local LLMs for coding",
    excerpt:
      "Where a 7B model genuinely helps in a coding session — and the three places it absolutely doesn't.",
    category: "ai-development",
    date: "2026-05-22",
    readTime: "8 min",
    tags: ["Local LLM", "Workflow"],
    lede:
      "A local 7B model running on a laptop will not replace your IDE's autocomplete. But used at the right altitude — small refactors, terse summaries, that kind of thing — it pays for the download in about a week.",
    pullQuote:
      "The case for local LLMs in coding is not 'replacement'. It's 'a private co-worker who's always available for the small stuff'.",
    body: [
      { type: "h2", text: "The altitude question" },
      { type: "p",  text: "Local 7B models are not impressive at the things we judge coding assistants on: long-horizon refactors, architecture reasoning, multi-file feature builds. They are impressive at the small stuff — a 30-line refactor with a clear shape, a docstring for an obvious function, a one-paragraph commit message. The right question is what altitude of task fits a small, fast, private model." },
      { type: "p",  text: "If your 'local LLM' framing is 'will this replace my coding assistant?', you'll be disappointed. If your framing is 'what small task can I get done in 800ms without sending my code to a third party?', you'll find at least ten such tasks in a normal work day." },
      { type: "h2", text: "Where it helps" },
      { type: "list", ordered: false, items: [
        "Mechanical refactors: rename a method across files, fix obvious type drift.",
        "Docstrings, README fragments, and changelog entries.",
        "Single-function code review: paste a 50-line function, get a list of obvious smells.",
        "Test scaffolding: boilerplate tests following an existing pattern.",
        "Commit messages and PR descriptions written from a diff.",
      ]},
      { type: "h2", text: "Where it doesn't" },
      { type: "list", ordered: false, items: [
        "Architecture decisions across multiple files — too much context, too much reasoning.",
        "Anything novel: the model has seen refactors and docstrings in training; it hasn't seen your specific domain.",
        "Long debugging sessions — small models lose the thread faster than they recover it.",
      ]},
      { type: "h2", text: "The setup that actually works" },
      { type: "p",  text: "For me: a 4-bit quantised 7B or 8B model running via llama.cpp, served on a local port, with a thin CLI wrapper for 'summarize this file', 'explain this function', 'write tests for this'. Total setup time was a weekend, total useful life so far is several months. The wrapper matters more than the model — without it, you have to fight the context window every time." },
      { type: "code", lang: "bash", code:
`# the loop I actually run, dozens of times a day
cat src/parser.py | llm summarize --max 80
cat src/parser.py | llm review --focus "edge cases"
git diff | llm commit-msg` },
    ],
    takeaways: [
      "Local LLMs win at small, mechanical tasks — not at replacing cloud assistants.",
      "The wrapper matters more than the model; without it, context-management eats the win.",
      "Keep a clear list of 'don't ask the local model' tasks and respect it.",
    ],
    featured: false,
  },
  {
    slug: "qwen-vs-other-coding-models",
    issue: "008",
    title: "Qwen vs other coding models",
    excerpt:
      "A side-by-side look at Qwen-Coder against the usual suspects, judged on the tasks I actually run during a build.",
    category: "experiments",
    date: "2026-05-08",
    readTime: "11 min",
    tags: ["Evaluation", "Benchmarks"],
    lede:
      "I ran Qwen-Coder through the same set of 30 coding tasks I've used to evaluate every model that touches my editor. Here is what held up and what didn't — and where it actually beats the more expensive models.",
    pullQuote:
      "The interesting question is not which model is best. It's which model is best for the specific shape of work you do.",
    body: [
      { type: "h2", text: "The eval I actually use" },
      { type: "p",  text: "Public benchmarks are a starting point, not a verdict. The eval I trust is 30 tasks I collected from my own work over six months: real refactors, real bugs, real components. They span TypeScript, Python, and Go, and they are weighted toward the kinds of tasks I actually run during a build — small fixes, careful refactors, and the occasional 'figure out what this code is doing'." },
      { type: "h2", text: "The setup" },
      { type: "p",  text: "Each model gets the same prompt template, the same temperature, the same 3-attempt budget. I score on three dimensions: did it pass my hidden test cases, did it require less than one revision, and did it produce code I would have committed without changes. The third dimension matters more than the others — passing tests with code I wouldn't ship isn't a win." },
      { type: "h2", text: "Results" },
      { type: "list", ordered: false, items: [
        "Qwen-Coder 32B: 26/30 pass, 22/30 one-shot, 20/30 ship-ready. Strong on Python and TS, weaker on Go.",
        "Claude Sonnet: 28/30 pass, 24/30 one-shot, 22/30 ship-ready. Best at refactor tasks; weakest at novel algorithms.",
        "GPT-4o: 27/30 pass, 23/30 one-shot, 20/30 ship-ready. Strongest at explaining unfamiliar code; weakest at careful refactors.",
        "Qwen-Coder 7B (local, 4-bit): 19/30 pass, 12/30 one-shot, 9/30 ship-ready. Useful for mechanical refactors, weak on architecture.",
      ]},
      { type: "h2", text: "Where Qwen wins" },
      { type: "p",  text: "Qwen-Coder's biggest surprise was its handling of mechanical refactors — the kind of task where the answer is well-defined but tedious. It matched or beat Sonnet on these, and did it at a fraction of the latency. If your workflow includes a lot of 'rename this across files', 'update these imports', 'match this existing pattern' — Qwen is worth a serious look." },
      { type: "h2", text: "Where it doesn't" },
      { type: "p",  text: "On novel algorithms and architectural reasoning, Qwen trails Sonnet and GPT-4o by a clear margin. The tasks where you need the model to hold several constraints in its head and weigh trade-offs — that's still where the larger closed models earn their price." },
      { type: "callout", tone: "info", text: "Takeaway: the right answer is probably 'use the right model for the right altitude' rather than 'pick one and live with it'. Qwen-Coder is a strong choice for the lower altitude." },
    ],
    takeaways: [
      "Build your own eval from real work; public benchmarks don't reflect your shape of work.",
      "Qwen-Coder is strong on mechanical refactors and 'match the existing pattern' tasks.",
      "The right answer is usually 'right model for the right altitude', not a single winner.",
    ],
    featured: false,
  },
  {
    slug: "local-inference-on-low-end-hardware",
    issue: "007",
    title: "Local inference on low-end hardware",
    excerpt:
      "What I learned running 7B and 13B models on a 2019 MacBook Air — and the surprising tasks where it was still useful.",
    category: "experiments",
    date: "2026-04-19",
    readTime: "7 min",
    tags: ["Local LLM", "Hardware"],
    lede:
      "Old laptops are not the AI hardware the marketing pages talk about. But they are real machines that real people own, and the question worth asking is: what can a small model actually do on them?",
    pullQuote:
      "Local inference on weak hardware is not about pushing limits. It's about finding the subset of tasks where 'good enough on my laptop' beats 'great in someone else's cloud'.",
    body: [
      { type: "h2", text: "The hardware" },
      { type: "p",  text: "A 2019 MacBook Air, 16 GB RAM, M1 chip. Eight cores, no discrete GPU, modest memory bandwidth. Not the worst laptop you'll find, but a long way from the machines model vendors optimise for. If a model can run usefully on this, it can run usefully on a lot." },
      { type: "h2", text: "The models I tried" },
      { type: "list", ordered: false, items: [
        "Qwen2.5-Coder 7B, 4-bit quantised — the daily driver.",
        "Llama-3 8B Instruct, 4-bit quantised — slightly slower, marginally smarter.",
        "Mistral 7B Instruct, 4-bit quantised — fast, weaker at code.",
        "Phi-3 Mini 3.8B — surprisingly capable for its size, useful for terse tasks.",
      ]},
      { type: "h2", text: "Where it actually works" },
      { type: "p",  text: "Anything under ~500 tokens of input and ~200 tokens of output. Summarisation, small refactors, docstrings, terse code review. The 7B model at q4 produces roughly 18 tokens/sec on this hardware — slow enough that you wouldn't want to generate an essay, fast enough that 'summarise this file' feels instant." },
      { type: "p",  text: "For tasks that fit this shape, the experience is actually better than sending the data to a cloud model: there's no round-trip, no quota, no privacy concern. The 'private co-worker who's always available for the small stuff' framing earns its keep here." },
      { type: "h2", text: "Where it doesn't" },
      { type: "p",  text: "Anything that needs more than about 4k tokens of context, anything that requires careful reasoning across multiple steps, anything where the output is more than a paragraph. The model loses coherence quickly under those conditions, and the latency stops being tolerable." },
      { type: "code", lang: "yaml", code:
`# the right task shape for weak hardware
task:
  input:  "<500 tokens, single file or short snippet"
  output: "<200 tokens, mostly structural"
  tolerance: "good enough to commit, not good enough to publish"` },
    ],
    takeaways: [
      "Old hardware is fine for the 'small stuff' — summarisation, docstrings, terse review.",
      "Stay under ~500 input / ~200 output tokens and the experience is surprisingly good.",
      "The privacy and zero-latency wins matter more than peak intelligence for these tasks.",
    ],
    featured: false,
  },
  {
    slug: "evaluating-rag-systems",
    issue: "006",
    title: "Evaluating RAG systems",
    excerpt:
      "Five metrics I now track on every RAG build — and the one I learned to stop trusting after a quarter of regressions.",
    category: "experiments",
    date: "2026-04-03",
    readTime: "9 min",
    tags: ["RAG", "Evaluation"],
    lede:
      "If you build RAG systems for long enough, you learn the same lesson I did: most of the metrics you start with are vanity. The five I trust now are different, and one of them is the absence of a number.",
    pullQuote:
      "The most useful metric in my RAG dashboard is the rate of 'I don't know' answers — because it's the only one that goes up when the system is being honest.",
    body: [
      { type: "h2", text: "The metrics I stopped trusting" },
      { type: "p",  text: "Recall@5 looked great for the first quarter. Then I noticed it was high even on days when the system was confidently wrong — because the right chunk was being retrieved alongside the wrong chunk, and the LLM was picking the wrong one. Recall was a measurement of retrieval, not of the answer." },
      { type: "p",  text: "Faithfulness scores, the kind an LLM judge produces, were worse. They correlated with answer length and confidence, not with correctness. A long, well-structured hallucination scored higher than a short, correct refusal. I deleted the metric." },
      { type: "h2", text: "The five metrics I track now" },
      { type: "list", ordered: true, items: [
        "Citation precision: of the citations in an answer, what fraction actually support the claim?",
        "Refusal rate: how often does the system say 'I don't know' when it should?",
        "First-chunk answer accuracy: how often is the right answer in the top retrieved chunk alone?",
        "Evidence-chain coverage: of the claims in an answer, what fraction have any supporting chunk at all?",
        "Latency p95: end-to-end, because users notice.",
      ]},
      { type: "h2", text: "Why refusal rate matters" },
      { type: "p",  text: "Most metrics go down when the system gets worse. Refusal rate is the opposite — it goes up when the system is being honest about uncertainty. A model that has learned to say 'I don't know' when retrieval is weak is a more reliable system than one that always produces an answer. The metric is healthy when it fluctuates with retrieval quality, unhealthy when it sits at zero." },
      { type: "h2", text: "The dashboard, in one screen" },
      { type: "p",  text: "Five lines on a screen, one chart each, each with a 'last meaningful change' date. The dashboard is intentionally boring. The point isn't to look at it; it's to glance at it once a week and notice when something has moved. If nothing has moved in three weeks, the eval is probably stale and the data needs refreshing." },
    ],
    takeaways: [
      "Drop 'recall@5' as your headline metric — it rewards retrieval, not answers.",
      "Refusal rate going up is a good sign, not a bad one — it means the system is being honest.",
      "Every metric needs a 'last meaningful change' date, otherwise it silently goes stale.",
    ],
    featured: false,
  },
  {
    slug: "how-i-built-my-first-rag-system",
    issue: "005",
    title: "How I built my first RAG system",
    excerpt:
      "A look back at the first retrieval-augmented system I shipped — the parts that aged well and the parts I'd rebuild today.",
    category: "ai-engineering",
    date: "2026-03-21",
    readTime: "12 min",
    tags: ["RAG", "Case Study"],
    lede:
      "My first RAG system was held together with prompt template fragments and a prayer. It also, against the odds, worked well enough to ship. Here's what I'd keep and what I'd throw away if I were building it today.",
    pullQuote:
      "The first RAG system you ship teaches you one thing above all: the model is rarely the bottleneck. The pipeline around it is.",
    body: [
      { type: "h2", text: "What it looked like" },
      { type: "p",  text: "An internal tool for a small team. ~50,000 documents. A simple BM25 retriever over a Postgres full-text index, top-20 chunks, prompt assembly by hand, GPT-4 as the generator. No reranker. No hybrid retrieval. No eval harness to speak of. It worked because the corpus was small enough that lexical retrieval covered most queries, and because GPT-4 was forgiving about the rest." },
      { type: "h2", text: "What I'd keep" },
      { type: "list", ordered: false, items: [
        "Citations in every answer, with line references — this aged beautifully.",
        "The decision to refuse when no chunk exceeded a confidence threshold.",
        "A flat log of every query, every retrieved chunk, and every answer — invaluable for later debugging.",
      ]},
      { type: "h2", text: "What I'd rebuild" },
      { type: "list", ordered: false, items: [
        "Hybrid retrieval from day one. Pure BM25 was fine until the corpus doubled.",
        "An actual eval harness. I relied on user complaints for months.",
        "A versioned embedding pipeline. Re-embedding the corpus was a weekend I don't want to repeat.",
        "A cross-encoder reranker. It would have closed most of the long-tail failures.",
      ]},
      { type: "h2", text: "The lesson I keep relearning" },
      { type: "p",  text: "Every RAG system I've built since has the same lesson at its core: invest in the pipeline around the model, not in the model itself. Better retrieval, better citations, better refusal, better eval — these compound. Switching to a better model later is one line of config. Switching to a better pipeline is a re-architecture." },
      { type: "code", lang: "text", code:
`# the cost curve, roughly
better_model:    2-5% accuracy gain, same complexity
better_retrieval: 10-30% accuracy gain, same complexity
better_eval:     unlocks the other two by catching regressions` },
    ],
    takeaways: [
      "Citations and refusal are the two design decisions that age best.",
      "Invest in retrieval and eval before you invest in the model.",
      "Version the embedding pipeline from day one; re-embedding later is painful.",
    ],
    featured: false,
  },
  {
    slug: "understanding-embeddings",
    issue: "004",
    title: "Understanding embeddings",
    excerpt:
      "A working explanation of embeddings for engineers who can write the code but want a clearer mental model.",
    category: "ai-engineering",
    date: "2026-03-04",
    readTime: "8 min",
    tags: ["Foundations", "RAG"],
    lede:
      "Embeddings are easy to call and surprisingly hard to reason about. This is the explanation I wish I'd had when I started — light on the linear algebra, heavy on the intuition that actually helps when you're debugging a retrieval system at 2am.",
    pullQuote:
      "An embedding is a promise that 'similar things end up near each other'. The quality of that promise depends on what the model saw during training, not on how big the vector is.",
    body: [
      { type: "h2", text: "The promise" },
      { type: "p",  text: "An embedding is a function that takes a piece of text and returns a vector. The promise the model makes is that 'similar' texts end up near each other in that vector space. The promise is operationalised by a loss function trained on huge amounts of paired data — questions and answers, search queries and clicked results, sentences and their translations." },
      { type: "p",  text: "That promise is what you're paying for when you call an embedding model. Bigger vectors don't make the promise better. A 384-dim model trained on the right data will beat a 3072-dim model trained on the wrong data, every time. The dimensionality is a side effect, not a feature." },
      { type: "h2", text: "Why this matters for retrieval" },
      { type: "p",  text: "Retrieval is the act of finding vectors that are 'near' your query vector. 'Near' usually means cosine similarity, sometimes dot product, almost never Euclidean distance. The choice of distance metric is downstream of how the model was trained — most modern embedding models are trained so that cosine similarity is the right tool." },
      { type: "h2", text: "What embeddings don't do" },
      { type: "list", ordered: false, items: [
        "They don't 'understand' your text. They compress it into a space where similar things cluster.",
        "They don't generalize across domains out of the box. A general model on legal text will underperform a legal-specific one.",
        "They don't capture negation, sarcasm, or any compositional structure. 'Not good' and 'good' will be near each other.",
      ]},
      { type: "h2", text: "Practical implications" },
      { type: "p",  text: "When retrieval goes wrong, the first question is almost never 'is the distance metric right?' It's 'did the model see the kind of text I'm querying with during training?' If your queries look nothing like the model's training distribution, retrieval will be brittle in ways that no amount of vector-DB tuning will fix. The cheapest experiment is to swap in a different embedding model — sometimes a smaller one — and watch the eval move." },
    ],
    takeaways: [
      "An embedding is a promise about similarity, not an understanding of meaning.",
      "Bigger vectors don't make the promise better — training data does.",
      "When retrieval is broken, swap the embedding model before swapping the vector DB.",
    ],
    featured: false,
  },
  {
    slug: "building-an-agent-from-scratch",
    issue: "003",
    title: "Building an agent from scratch",
    excerpt:
      "A walkthrough of building a small tool-using agent without a framework — what becomes easier and what becomes much, much harder.",
    category: "ai-engineering",
    date: "2026-02-19",
    readTime: "14 min",
    tags: ["Agents", "Tutorial"],
    lede:
      "Every agent framework eventually leaks. The trick is to know what's underneath the leak. I rebuilt a small agent from scratch to find out — and to remind myself that the primitives are smaller than the framework docs imply.",
    pullQuote:
      "An agent is a loop, a model, and a list of tools. Everything else is editorial.",
    body: [
      { type: "h2", text: "The minimal agent" },
      { type: "p",  text: "Strip everything away and an agent is three things: a loop, a model, and a list of tools. The loop calls the model with the current state, parses the response, and either invokes a tool or returns. The model is the LLM. The tools are functions with JSON schemas. That's it. The whole framework ecosystem is built on top of these three primitives, plus a lot of editorial decisions about state, prompts, and error handling." },
      { type: "h2", text: "What becomes easier without a framework" },
      { type: "list", ordered: false, items: [
        "You can read the whole agent in one sitting. No magic, no inheritance, no callback hell.",
        "You can debug exactly what the model sees. No hidden prompt construction.",
        "You can change anything. No 'please open a PR upstream'.",
        "You can ship in 200 lines instead of 2000.",
      ]},
      { type: "h2", text: "What becomes much, much harder" },
      { type: "list", ordered: false, items: [
        "Streaming, retries, and concurrency. Frameworks handle these for you.",
        "Tool versioning. You build the registry yourself.",
        "Observability. You instrument the loop yourself.",
        "Prompt management. You version your prompts yourself, or you don't, and then you regret it.",
      ]},
      { type: "code", lang: "python", code:
`def run_agent(state, model, tools, max_steps=20):
    for _ in range(max_steps):
        action = model.complete(state.messages, tools=tools)
        if action.name == "final":
            return action.args["answer"]
        result = tools[action.name](**action.args)
        state.messages.append(action)
        state.messages.append(result)
    return "I ran out of steps."` },
      { type: "h2", text: "When to reach for a framework" },
      { type: "p",  text: "Once your agent has more than three tools, more than one user, and needs to survive model upgrades and prompt changes without breaking — reach for a framework. The 200-line version is a teaching tool and a prototype tool; it's not a production tool. The frameworks earn their weight once the agent has to actually run in anger." },
      { type: "p",  text: "But: building one from scratch first makes the framework legible. You'll know what every abstraction is doing, and which abstractions are worth paying for. That's the real reason to do this exercise." },
    ],
    takeaways: [
      "An agent is a loop, a model, and a list of tools. The rest is editorial.",
      "From-scratch agents are great teachers and bad production systems.",
      "Build one without a framework first — it makes every framework legible afterwards.",
    ],
    featured: false,
  },
];

export function listArticlesByCategory(category) {
  if (category === "all" || !category) return [...ARTICLES];
  return ARTICLES.filter((a) => a.category === category);
}

export function getFeaturedArticle() {
  return ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
}

export function getArticleBySlug(slug) {
  return ARTICLES.find((a) => a.slug === slug) ?? null;
}

export function getAdjacentArticles(slug) {
  const i = ARTICLES.findIndex((a) => a.slug === slug);
  if (i === -1) return { prev: null, next: null };
  const prev = i > 0 ? ARTICLES[i - 1] : ARTICLES[ARTICLES.length - 1];
  const next = i < ARTICLES.length - 1 ? ARTICLES[i + 1] : ARTICLES[0];
  return { prev, next };
}

export function getRelatedArticles(slug, limit = 2) {
  const current = getArticleBySlug(slug);
  if (!current) return [];
  // Same-category first, then fill from most-recent in other categories.
  const sameCat = ARTICLES.filter(
    (a) => a.slug !== slug && a.category === current.category,
  );
  const others = ARTICLES.filter(
    (a) => a.slug !== slug && a.category !== current.category,
  );
  return [...sameCat, ...others].slice(0, limit);
}
