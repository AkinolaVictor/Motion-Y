// HeroSystemViz — animated SVG node-graph. The page's signature element.
// Pulses nodes, draws data-flow edges, and floats a few code fragments. Uses gsap only;
// respects prefers-reduced-motion.

import { useEffect, useRef } from "react";
import gsap from "gsap";

const NODES = [
  { id: "llm",  x: 110, y:  60, r: 6,  label: "llm" },
  { id: "rag",  x: 230, y: 130, r: 5,  label: "rag" },
  { id: "tool", x:  60, y: 180, r: 5,  label: "tools" },
  { id: "mem",  x: 320, y:  60, r: 4,  label: "memory" },
  { id: "obs",  x: 290, y: 220, r: 5,  label: "observe" },
  { id: "eval", x: 160, y: 240, r: 4,  label: "eval" },
  { id: "ctx",  x:  40, y: 100, r: 4,  label: "context" },
];

const EDGES = [
  ["llm", "rag"],
  ["llm", "tool"],
  ["rag", "ctx"],
  ["tool", "obs"],
  ["obs", "mem"],
  ["llm", "eval"],
  ["rag", "obs"],
];

const FRAGMENTS = [
  { x: 340, y: 130, text: "→ call tool" },
  { x: 30,  y: 220, text: "$ ingest" },
  { x: 250, y: 30,  text: "agent.step()" },
];

export default function HeroSystemViz() {
  const root = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !root.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Node float
      gsap.to("[data-node]", {
        y: "random(-6, 6)",
        x: "random(-4, 4)",
        duration: "random(3, 5)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.2, from: "random" },
      });

      // Pulse rings on each node
      gsap.to("[data-pulse]", {
        scale: 1.8,
        opacity: 0,
        duration: 2.2,
        ease: "power2.out",
        repeat: -1,
        stagger: { each: 0.4, from: "random" },
        transformOrigin: "50% 50%",
      });

      // Data-flow dashes along edges
      gsap.to("[data-edge]", {
        strokeDashoffset: -24,
        duration: 1.6,
        ease: "none",
        repeat: -1,
        stagger: { each: 0.15, from: "random" },
      });

      // Fragments blink in/out
      gsap.to("[data-fragment]", {
        opacity: 0.2,
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.3, from: "random" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="relative w-full aspect-[4/3] max-w-[520px] mx-auto w7:mx-0"
      aria-hidden="true"
    >
      {/* Soft grid backdrop */}
      <div className="absolute inset-0 rounded-2xl bg-grid opacity-40 border border-[var(--border-subtle)]" />

      <svg
        viewBox="0 0 400 300"
        className="relative h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="vignette" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="var(--bg-base)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--bg-base)" stopOpacity="1" />
          </radialGradient>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="var(--accent)" opacity="0.7" />
          </marker>
        </defs>

        {/* Edges */}
        <g stroke="var(--accent)" strokeWidth="1" opacity="0.55" fill="none">
          {EDGES.map(([a, b], i) => {
            const A = NODES.find((n) => n.id === a);
            const B = NODES.find((n) => n.id === b);
            return (
              <line
                key={i}
                data-edge
                x1={A.x}
                y1={A.y}
                x2={B.x}
                y2={B.y}
                strokeDasharray="4 6"
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g>
          {NODES.map((n) => (
            <g key={n.id} data-node>
              <circle
                data-pulse
                cx={n.x}
                cy={n.y}
                r={n.r + 2}
                fill="var(--accent)"
                opacity="0.25"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill="var(--bg-base)"
                stroke="var(--accent)"
                strokeWidth="1.5"
              />
              <text
                x={n.x + n.r + 6}
                y={n.y + 3}
                className="mono"
                fontSize="8"
                fill="var(--text-muted)"
                style={{ fontFamily: "ui-monospace, SF Mono, Menlo, monospace" }}
              >
                {n.label}
              </text>
            </g>
          ))}
        </g>

        {/* Floating code fragments */}
        <g fill="var(--text-muted)" opacity="0.9" style={{ fontFamily: "ui-monospace, SF Mono, Menlo, monospace" }}>
          {FRAGMENTS.map((f, i) => (
            <text key={i} data-fragment x={f.x} y={f.y} fontSize="9">
              {f.text}
            </text>
          ))}
        </g>

        {/* Edge fade */}
        <rect width="400" height="300" fill="url(#vignette)" pointerEvents="none" />
      </svg>
    </div>
  );
}
