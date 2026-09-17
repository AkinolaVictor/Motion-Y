// OscilloscopeCover — the Lab page's signature element.
// A faux instrument-trace: deterministic waveform derived from the input `seed`,
// rendered as an animated SVG. Each experiment gets a unique trace so the cards
// read as distinct specimens, not duplicates.
//
// Pure presentational. Animation respects prefers-reduced-motion.

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Mulberry32 — small, fast, seedable PRNG. Same seed → same waveform.
function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = t;
    r = Math.imul(r ^ (r >>> 15), r | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Build a single waveform sample (0..1) along x∈[0..W].
function buildWaveform(seed, W = 200, H = 60) {
  const rnd = mulberry32(seed);
  // Choose a waveform "style" deterministically.
  const style = Math.floor(rnd() * 4); // 0 sine, 1 square-ish, 2 spike, 3 mixed
  const amp = H * (0.18 + rnd() * 0.18);
  const cy = H / 2;
  const points = [];
  for (let x = 0; x <= W; x++) {
    const t = x / W;
    let y = cy;
    if (style === 0) {
      // layered sines
      y = cy
        - amp * Math.sin(t * Math.PI * (2 + Math.floor(rnd() * 4)))
        - amp * 0.35 * Math.sin(t * Math.PI * 11);
    } else if (style === 1) {
      // step-ish
      const step = Math.floor(t * 9 + rnd()) % 2 === 0;
      y = step ? cy - amp : cy + amp * 0.5;
    } else if (style === 2) {
      // sparse spikes
      const spike = Math.random() < 0.08 ? amp : 0; // intentional non-deterministic accent
      y = cy - amp * 0.25 * Math.sin(t * Math.PI * 6) - spike;
    } else {
      // mixed
      y = cy - amp * Math.sin(t * Math.PI * 3) - (rnd() - 0.5) * amp * 0.6;
    }
    // Clamp + jitter
    y = Math.max(2, Math.min(H - 2, y));
    points.push([x, y]);
  }
  return points;
}

function pointsToPath(pts) {
  return pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
}

export default function OscilloscopeCover({ seed = "lab", label, height = "h-32" }) {
  const root = useRef(null);
  const seedNum = typeof seed === "number" ? seed : hashString(String(seed));
  const pts = buildWaveform(seedNum);
  const path = pointsToPath(pts);

  useEffect(() => {
    if (typeof window === "undefined" || !root.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Cursor sweep across the trace.
      gsap.fromTo(
        "[data-cursor]",
        { attr: { x1: 0, x2: 0 } },
        {
          attr: { x1: 200, x2: 200 },
          duration: 4.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        }
      );
      // Subtle baseline blink.
      gsap.to("[data-baseline]", { opacity: 0.35, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      // Waveform draw-on once visible.
      gsap.fromTo(
        "[data-trace]",
        { strokeDashoffset: 600 },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 88%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className={`relative w-full overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] ${height}`}
    >
      {/* Faint grid backdrop */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Hairline axis ticks */}
      <div className="absolute inset-x-3 top-1/2 h-px bg-[var(--border-subtle)]/70" data-baseline />

      <svg
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`grad-${seedNum}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Main trace */}
        <path
          data-trace
          d={path}
          fill="none"
          stroke={`url(#grad-${seedNum})`}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="600"
          strokeDashoffset="0"
          vectorEffect="non-scaling-stroke"
        />

        {/* Sweep cursor */}
        <line
          data-cursor
          x1="0"
          y1="0"
          x2="0"
          y2="60"
          stroke="var(--accent)"
          strokeWidth="0.8"
          opacity="0.55"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Mono readout chips */}
      <div className="absolute inset-x-3 top-2 flex items-center justify-between">
        <span className="mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
          {label || "CH-01"}
        </span>
        <span className="mono flex items-center gap-1 text-[9px] uppercase tracking-[0.2em] text-[var(--accent)]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)] accent-pulse" />
          live
        </span>
      </div>

      {/* Scale ticks along the bottom */}
      <div className="absolute inset-x-3 bottom-1.5 flex items-center justify-between">
        <span className="mono text-[8px] uppercase tracking-[0.18em] text-[var(--text-muted)]/70">
          0ms
        </span>
        <span className="mono text-[8px] uppercase tracking-[0.18em] text-[var(--text-muted)]/70">
          t →
        </span>
      </div>
    </div>
  );
}
