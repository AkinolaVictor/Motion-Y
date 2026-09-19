// HowIBuild — section 05 / METHOD.
// 9-step pipeline that reveals sequentially on scroll.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";
import SectionHeader from "../primitives/SectionHeader";

const STEPS = [
  ["Idea",      "Capture the problem."],
  ["Research",  "Survey prior art, papers, and product analogs."],
  ["Plan",      "Define scope, success metrics, and constraints."],
  ["Architect", "Sketch data flow, interfaces, and failure modes."],
  ["Build",     "Implement smallest useful end-to-end slice first."],
  ["Test",      "Unit, integration, and adversarial cases."],
  ["Evaluate",  "Measure quality against the rubric."],
  ["Iterate",   "Refine prompts, retrieval, and UX."],
  ["Deploy",    "Ship behind a flag; observe in production."],
];

export default function HowIBuild() {
  const listRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !listRef.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-step]", {
        autoAlpha: 0,
        y: 14,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: { trigger: listRef.current, start: "top 80%" },
      });
    }, listRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-i-build"
      aria-labelledby="how-i-build-title"
      className="relative border-b border-[var(--border-subtle)] py-20 w9:py-28"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeader
          index="04"
          label="METHOD"
          title={<span id="how-i-build-title">How we build.</span>}
          lead="A loop, not a line. Each turn makes the system more honest about its strengths and weaknesses."
        />

        <ol
          ref={listRef}
          className="relative grid grid-cols-1 w6:grid-cols-2 w9:grid-cols-3 gap-3 w9:gap-4"
        >
          {STEPS.map(([label, blurb], i) => (
            <li
              key={label}
              data-step
              className="relative flex flex-col gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5"
            >
              <div className="flex items-center justify-between">
                <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]/70">
                  {i < STEPS.length - 1 ? "next →" : "loop"}
                </span>
              </div>
              <p className="overpass text-[18px] font-semibold tracking-tight text-[var(--text-primary)]">
                {label}
              </p>
              <p className="text-[13px] leading-[1.6] text-[var(--text-muted)]">{blurb}</p>
            </li>
          ))}
        </ol>

        <p className="mono self-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
          human engineering <span className="text-[var(--accent)]">+</span> ai augmentation
        </p>
      </Container>
    </section>
  );
}
