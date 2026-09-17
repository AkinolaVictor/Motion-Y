// Timeline — section 07 / TIMELINE.
// A vertical timeline rendered as a two-column grid: year on the left, content on the right.
// Hairline connector runs down the left gutter to read as a real timeline, not a list.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";
import { TIMELINE } from "../../data/about";

export default function Timeline() {
  const listRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      if (listRef.current) {
        gsap.from(listRef.current.querySelectorAll("[data-row]"), {
          x: -12,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: listRef.current, start: "top 80%" },
        });
        // Draw the connector line as rows reveal.
        gsap.from(listRef.current.querySelector("[data-spine]"), {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: listRef.current, start: "top 80%" },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      aria-labelledby="timeline-title"
      className="relative border-b border-[var(--border-subtle)] py-20 w9:py-28"
    >
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">07</span>
            <span className="mx-2 text-[var(--text-muted)]/60">/</span>
            Timeline
          </p>
          <h2
            id="timeline-title"
            className="overpass font-semibold tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,3.5vw,2.75rem)]"
          >
            Still becoming.
          </h2>
        </div>

        <ol ref={listRef} className="relative flex flex-col">
          {/* Spine — vertical hairline running the height of the list. */}
          <span
            data-spine
            aria-hidden="true"
            className="pointer-events-none absolute top-1 bottom-1 hidden w6:block w-px bg-[var(--border-subtle)]"
            style={{ left: "calc(5.5rem + 0.75rem - 1px)" }}
          />

          {TIMELINE.map((row) => (
            <li
              key={row.year}
              data-row
              className="relative grid grid-cols-[5.5rem_1fr] gap-x-6 gap-y-1 border-t border-[var(--border-subtle)] py-6 first:border-t-0 first:pt-0"
            >
              {/* Year column */}
              <div className="relative flex items-start">
                <span className="mono text-[12px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                  {row.year}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 hidden h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--accent)] ring-4 ring-[var(--bg-base)] w6:block"
                  style={{ left: "calc(5.5rem + 0.75rem)" }}
                />
              </div>

              {/* Content column */}
              <div className="flex flex-col gap-1">
                <p className="overpass text-[18px] font-semibold tracking-tight text-[var(--text-primary)]">
                  {row.title}
                </p>
                <p className="mono text-[11.5px] uppercase tracking-[0.18em] text-[var(--text-muted)]/80">
                  {row.meta}
                </p>
                <p className="text-[14px] leading-[1.6] text-[var(--text-muted)]">{row.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
