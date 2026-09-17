// Metrics — large-number stat cards. Mirrors the live reference's big numeral callouts.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";

export default function Metrics({ items }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-metric]", {
        autoAlpha: 0,
        y: 14,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  if (!items?.length) return null;

  return (
    <section
      ref={ref}
      aria-labelledby="metrics-title"
      className="relative border-b border-[var(--border-subtle)] py-16 w9:py-24"
    >
      <Container className="flex flex-col gap-10">
        <header className="flex flex-col gap-3">
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">07</span>
            <span className="mx-2 text-[var(--text-muted)]/60">/</span>
            Evaluation
          </p>
          <h2
            id="metrics-title"
            className="overpass font-semibold tracking-tight leading-[1.05] text-[clamp(1.75rem,3.5vw,2.5rem)] text-[var(--text-primary)]"
          >
            What we measured.
          </h2>
        </header>

        <ul className="grid grid-cols-2 w7:grid-cols-4 gap-3 w9:gap-4">
          {items.map((m, i) => (
            <li
              key={m.label}
              data-metric
              className="flex flex-col gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 w9:p-6"
            >
              <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="overpass font-semibold tracking-[-0.02em] leading-[1] text-[clamp(2rem,5vw,3rem)] text-[var(--accent)]">
                {m.value}
                {m.suffix && <span className="text-[var(--text-muted)]">{m.suffix}</span>}
              </p>
              <p className="text-[13px] leading-[1.55] text-[var(--text-muted)]">{m.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
