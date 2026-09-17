// Beliefs — section 04 / WHAT I BELIEVE.
// Two-column: section header on the left, numbered list of principles on the right.
// Each principle is a full-width row with a numeric prefix and hairline divider.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";
import { BELIEFS } from "../../data/about";

export default function Beliefs() {
  const listRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      if (listRef.current) {
        gsap.from(listRef.current.querySelectorAll("[data-belief]"), {
          y: 14,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: listRef.current, start: "top 80%" },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="beliefs"
      aria-labelledby="beliefs-title"
      className="relative border-b border-[var(--border-subtle)] py-20 w9:py-28"
    >
      <Container className="flex flex-col gap-12">
        <div className="grid grid-cols-1 w9:grid-cols-12 gap-10 w9:gap-12">
          <header className="w9:col-span-5 flex flex-col gap-3">
            <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
              <span className="text-[var(--accent)]">04</span>
              <span className="mx-2 text-[var(--text-muted)]/60">/</span>
              What I believe
            </p>
            <h2
              id="beliefs-title"
              className="overpass font-semibold tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,3.5vw,2.75rem)]"
            >
              Principles over posturing.
            </h2>
            <p className="max-w-[44ch] text-[14px] leading-[1.7] text-[var(--text-muted)]">
              Engineering principles I keep returning to — short on purpose, so they stay useful.
            </p>
          </header>

          <ol
            ref={listRef}
            className="w9:col-span-7 flex flex-col"
          >
            {BELIEFS.map((b, i) => (
              <li
                key={b}
                data-belief
                className="grid grid-cols-[3rem_1fr] items-baseline gap-3 border-t border-[var(--border-subtle)] py-5 first:border-t-0 first:pt-0"
              >
                <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="overpass text-[18px] w8:text-[20px] font-semibold tracking-tight text-[var(--text-primary)]">
                  {b}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
