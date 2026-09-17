// CapabilitiesNetwork — interactive SVG node-graph showing the 8 capability clusters.
// Edges draw on scroll-in; nodes float gently and reveal a tooltip on hover.

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NODES = [
  { id: "llm",   label: "LLM Apps",          x: 220, y:  90, r: 28, blurb: "Apps built on language models with care for prompts, context, latency, and cost." },
  { id: "rag",   label: "RAG",               x: 420, y:  70, r: 24, blurb: "Retrieval-augmented systems grounded in private or curated corpora." },
  { id: "agent", label: "Agents",            x: 600, y: 130, r: 30, blurb: "Tool-using, multi-step agents with planning and reflection." },
  { id: "mm",    label: "Multimodal",        x: 720, y: 250, r: 22, blurb: "Vision-language, audio, and document understanding pipelines." },
  { id: "auto",  label: "Automation",        x: 600, y: 360, r: 22, blurb: "Workflow automation that fuses models with deterministic code." },
  { id: "ops",   label: "LLMOps",            x: 420, y: 410, r: 24, blurb: "Observability, eval, routing, caching — the rails an AI product needs." },
  { id: "eval",  label: "Evaluation",        x: 220, y: 360, r: 24, blurb: "Rubrics, regression gates, and human review loops that hold the line." },
  { id: "dev",   label: "AI Dev Tools",      x: 100, y: 250, r: 26, blurb: "Tooling that puts model power into the developer's hands." },
];

const EDGES = [
  ["llm", "rag"],
  ["rag", "agent"],
  ["agent", "mm"],
  ["agent", "auto"],
  ["auto", "ops"],
  ["ops", "eval"],
  ["eval", "dev"],
  ["dev", "llm"],
  ["llm", "agent"],
  ["rag", "ops"],
  ["mm", "auto"],
  ["dev", "eval"],
];

export default function CapabilitiesNetwork() {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapRef.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Node float
      gsap.to("[data-cap-node]", {
        y: "random(-5, 5)",
        x: "random(-4, 4)",
        duration: "random(3.5, 5)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.2, from: "random" },
      });

      // Edge draw-on-scroll
      const edges = wrapRef.current.querySelectorAll("[data-cap-edge]");
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      gsap.fromTo(
        edges,
        { strokeDashoffset: 220 },
        {
          strokeDashoffset: 0,
          duration: reduce ? 0 : 1.2,
          ease: "power2.out",
          stagger: reduce ? 0 : 0.07,
          scrollTrigger: { trigger: wrapRef.current, start: "top 75%" },
        }
      );
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  const activeNode = NODES.find((n) => n.id === active);

  return (
    <div ref={wrapRef} className="relative w-full">
      <svg
        ref={svgRef}
        viewBox="0 0 820 480"
        className="block h-auto w-full"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Interactive capability network"
      >
        <defs>
          <radialGradient id="cap-node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Backdrop grid */}
        <g opacity="0.18">
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 55} y1="0" x2={i * 55} y2="480" stroke="var(--border-subtle)" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 55} x2="820" y2={i * 55} stroke="var(--border-subtle)" />
          ))}
        </g>

        {/* Edges */}
        <g stroke="var(--accent)" strokeWidth="1.2" opacity="0.55" fill="none">
          {EDGES.map(([a, b], i) => {
            const A = NODES.find((n) => n.id === a);
            const B = NODES.find((n) => n.id === b);
            return (
              <line
                key={i}
                data-cap-edge
                x1={A.x}
                y1={A.y}
                x2={B.x}
                y2={B.y}
                strokeDasharray="220"
                strokeDashoffset="220"
                opacity={active && (active === a || active === b) ? 0.95 : 0.45}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g>
          {NODES.map((n) => {
            const isActive = active === n.id;
            return (
              <g
                key={n.id}
                data-cap-node
                transform={`translate(${n.x} ${n.y})`}
                onMouseEnter={() => setActive(n.id)}
                onMouseLeave={() => setActive(null)}
                style={{ cursor: "pointer" }}
              >
                <circle r={n.r + 14} fill="url(#cap-node-glow)" opacity={isActive ? 1 : 0.6} />
                <circle
                  r={n.r}
                  fill="var(--bg-base)"
                  stroke={isActive ? "var(--accent)" : "var(--text-muted)"}
                  strokeWidth={isActive ? 2 : 1.2}
                />
                <text
                  y={n.r + 18}
                  textAnchor="middle"
                  fontSize="11"
                  fill={isActive ? "var(--accent)" : "var(--text-primary)"}
                  style={{ fontFamily: "ui-monospace, SF Mono, Menlo, monospace", letterSpacing: "0.06em" }}
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Tooltip */}
      <div
        aria-live="polite"
        className={[
          "pointer-events-none absolute right-4 top-4 max-w-[260px] rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3",
          "transition-opacity duration-200",
          activeNode ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        <p className="mono mb-1 text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
          {activeNode?.label}
        </p>
        <p className="text-[13px] leading-[1.55] text-[var(--text-muted)]">
          {activeNode?.blurb}
        </p>
      </div>
    </div>
  );
}
