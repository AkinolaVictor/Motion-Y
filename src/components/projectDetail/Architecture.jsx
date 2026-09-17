// Architecture — numbered node diagram showing data flow.
// Each node is a numbered card connected by a horizontal arrow rail.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";

export default function Architecture({ nodes }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-arch-node]", {
        autoAlpha: 0,
        y: 10,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="arch-title"
      className="relative border-b border-[var(--border-subtle)] py-16 w9:py-24"
    >
      <Container className="flex flex-col gap-10">
        <header className="flex flex-col gap-3">
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">04</span>
            <span className="mx-2 text-[var(--text-muted)]/60">/</span>
            Architecture
          </p>
          <h2
            id="arch-title"
            className="overpass font-semibold tracking-tight leading-[1.05] text-[clamp(1.75rem,3.5vw,2.5rem)] text-[var(--text-primary)]"
          >
            Components and data flow.
          </h2>
          <p className="max-w-[60ch] text-[15px] leading-[1.7] text-[var(--text-muted)]">
            How the moving parts fit together. Solid arrows are synchronous calls; dashed arrows are queued or batched.
          </p>
        </header>

        <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 w6:p-6 w9:p-8">
          <div className="bg-grid absolute inset-0 rounded-2xl opacity-20 pointer-events-none" />
          <ol className="relative grid grid-cols-1 w6:grid-cols-2 w9:grid-cols-5 gap-3 w9:gap-4">
            {nodes.map((n, i) => (
              <li
                key={n}
                data-arch-node
                className="relative flex flex-col gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < nodes.length - 1 && (
                    <span className="mono hidden w9:inline text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]/70">
                      →
                    </span>
                  )}
                </div>
                <p className="overpass text-[15px] font-semibold tracking-tight text-[var(--text-primary)]">
                  {n}
                </p>
              </li>
            ))}
          </ol>

          {/* Mobile vertical arrow accents */}
          <div className="mt-3 w9:hidden text-center mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            ↓ flow continues
          </div>
        </div>
      </Container>
    </section>
  );
}
