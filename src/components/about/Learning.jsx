// Learning — section 06 / CURRENT LEARNING.
// A live research notebook — a terminal frame, a typewriter-style "now digging" line,
// and a row of bordered tags for the actual topics.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";
import { LEARNING } from "../../data/about";

export default function Learning() {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
      LEARNING.forEach((topic) => {
        const stepDur = 0.05;
        tl.to({}, { duration: topic.length * stepDur, onStart: () => type(topic) })
          .to({}, { duration: 1.6 })
          .to({}, {
            duration: topic.length * stepDur,
            onStart: () => erase(topic.length),
          })
          .to({}, { duration: 0.4 });
      });

      function type(text) {
        const el = ref.current?.querySelector("[data-typing]");
        if (!el) return;
        let i = 0;
        el.textContent = "";
        clearInterval(el.__interval);
        el.__interval = setInterval(() => {
          i++;
          el.textContent = text.slice(0, i);
          if (i >= text.length) clearInterval(el.__interval);
        }, 50);
      }
      function erase(len) {
        const el = ref.current?.querySelector("[data-typing]");
        if (!el) return;
        let i = len;
        clearInterval(el.__interval);
        el.__interval = setInterval(() => {
          i--;
          el.textContent = el.textContent.slice(0, i);
          if (i <= 0) clearInterval(el.__interval);
        }, 30);
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="learning"
      aria-labelledby="learning-title"
      className="relative border-b border-[var(--border-subtle)] py-20 w9:py-28"
    >
      <Container className="flex flex-col gap-12">
        <div className="grid grid-cols-1 w9:grid-cols-12 gap-10 w9:gap-12">
          <header className="w9:col-span-5 flex flex-col gap-3">
            <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
              <span className="text-[var(--accent)]">06</span>
              <span className="mx-2 text-[var(--text-muted)]/60">/</span>
              Current learning
            </p>
            <h2
              id="learning-title"
              className="overpass font-semibold tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,3.5vw,2.75rem)]"
            >
              Digging into this.
            </h2>
            <p className="max-w-[44ch] text-[14px] leading-[1.7] text-[var(--text-muted)]">
              The areas I'm actively pushing into — half-formed ideas welcome.
            </p>
          </header>

          <div
            ref={ref}
            className="w9:col-span-7 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]/70">
                ~/notes/2026.md
              </span>
              <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                live
              </span>
            </div>

            <div className="px-6 py-7 w9:px-8 w9:py-10">
              <p className="mono text-[12px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                → digging into
              </p>
              <p className="mono mt-3 text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.3] text-[var(--text-primary)]">
                <span className="text-[var(--accent)]">$</span>{" "}
                <span data-typing aria-live="polite">
                  {LEARNING[0]}
                </span>
                <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-[var(--accent)] animate-pulse" />
              </p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {LEARNING.map((t) => (
                  <li
                    key={t}
                    className="mono flex items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-1.5 text-[12px] text-[var(--text-muted)]"
                  >
                    <span className="text-[var(--accent)]">›</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
