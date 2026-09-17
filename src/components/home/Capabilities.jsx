// Capabilities — section 04 / CAPABILITIES.
// Hosts the interactive node graph and a static capability list as fallback / mobile overview.

import Container from "../primitives/Container";
import SectionHeader from "../primitives/SectionHeader";
import CapabilitiesNetwork from "./CapabilitiesNetwork";

const LIST = [
  ["LLM Applications", "Ship-ready language model apps."],
  ["RAG", "Retrieval-grounded systems with provenance."],
  ["AI Agents", "Multi-step planners that use tools."],
  ["Multimodal AI", "Vision, audio, and document understanding."],
  ["AI Automation", "Workflows that blend models + deterministic code."],
  ["LLMOps", "Observability, routing, and caching."],
  ["AI Evaluation", "Rubrics and regression gates."],
  ["AI Developer Tools", "Tooling that changes how we build."],
];

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="relative border-b border-[var(--border-subtle)] py-20 w9:py-28"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeader
          index="03"
          label="CAPABILITIES"
          title={<span id="capabilities-title">AI engineering capabilities.</span>}
          // lead="The eight clusters I work in most often. Hover a node to see what I mean by each."
        />

        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 w7:p-6">
          <CapabilitiesNetwork />
        </div>

        <ul className="grid grid-cols-1 w6:grid-cols-2 w9:grid-cols-4 gap-3 w9:gap-4">
          {LIST.map(([label, blurb]) => (
            <li
              key={label}
              className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4"
            >
              <p className="mono mb-1 text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                {label}
              </p>
              <p className="text-[13px] leading-[1.55] text-[var(--text-muted)]">{blurb}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
