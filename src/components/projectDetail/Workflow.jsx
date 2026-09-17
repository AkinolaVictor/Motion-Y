// Workflow — "How it works" row of numbered steps. Mirrors the live site's 01-05 pattern.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";

export default function Workflow({ steps }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-step]", {
        autoAlpha: 0,
        y: 12,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="workflow-title"
      className="relative border-b border-[var(--border-subtle)] py-16 w9:py-24"
    >
      <Container className="flex flex-col gap-10">
        <header className="flex flex-col gap-3">
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">03</span>
            <span className="mx-2 text-[var(--text-muted)]/60">/</span>
            How it works
          </p>
          <h2
            id="workflow-title"
            className="overpass font-semibold tracking-tight leading-[1.05] text-[clamp(1.75rem,3.5vw,2.5rem)] text-[var(--text-primary)]"
          >
            The system, end to end.
          </h2>
        </header>

        <ol className="grid grid-cols-1 w6:grid-cols-2 w9:grid-cols-5 gap-3 w9:gap-4">
          {steps.map((s, i) => (
            <li
              key={s.label}
              data-step
              className="relative flex flex-col gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5"
            >
              <div className="flex items-center justify-between">
                <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]/70">
                  {i < steps.length - 1 ? "next →" : "loop"}
                </span>
              </div>
              <p className="overpass text-[18px] font-semibold tracking-tight text-[var(--text-primary)]">
                {s.label}
              </p>
              <p className="text-[13px] leading-[1.6] text-[var(--text-muted)]">{s.blurb}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
