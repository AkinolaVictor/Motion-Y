// Strengths — section 05 / TECHNICAL STRENGTHS.
// Two-column layout: section header on the left, grid of category groups on the right.
// Categories use plain bordered pills rather than cards, matching the prototype's restraint.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";
import { STACK } from "../../data/about";

export default function Strengths() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.from(gridRef.current.querySelectorAll("[data-group]"), {
          y: 12,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        });
        gsap.from(gridRef.current.querySelectorAll("[data-pill]"), {
          autoAlpha: 0,
          y: 6,
          duration: 0.35,
          ease: "power2.out",
          stagger: 0.02,
          delay: 0.15,
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="strengths"
      aria-labelledby="strengths-title"
      className="relative border-b border-[var(--border-subtle)] py-20 w9:py-28"
    >
      <Container className="flex flex-col gap-12">
        <div className="grid grid-cols-1 w9:grid-cols-12 gap-10 w9:gap-12">
          <header className="w9:col-span-5 flex flex-col gap-3">
            <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
              <span className="text-[var(--accent)]">05</span>
              <span className="mx-2 text-[var(--text-muted)]/60">/</span>
              Technical strengths
            </p>
            <h2
              id="strengths-title"
              className="overpass font-semibold tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,3.5vw,2.75rem)]"
            >
              A practical working stack.
            </h2>
            <p className="max-w-[44ch] text-[14px] leading-[1.7] text-[var(--text-muted)]">
              Tools I reach for — categorised by where they sit in the system.
            </p>
          </header>

          <div
            ref={gridRef}
            className="w9:col-span-7 grid grid-cols-1 w6:grid-cols-2 gap-x-8 gap-y-7"
          >
            {STACK.map((group) => (
              <div key={group.label} data-group className="flex flex-col gap-3">
                <p className="overpass text-[15px] font-semibold tracking-tight text-[var(--text-primary)]">
                  {group.label}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      data-pill
                      className="mono inline-flex items-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
