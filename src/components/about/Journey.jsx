// Journey — section 02 / MY JOURNEY.
// Two-column: stacked milestones on the left, terminal-style meta panel on the right.
// The big headline reuses the word-level split for a calm reveal.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";
import { JOURNEY } from "../../data/about";

export default function Journey() {
  const titleRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll("[data-word]");
        gsap.from(words, {
          y: 18,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        });
      }
      if (listRef.current) {
        gsap.from(listRef.current.querySelectorAll("[data-milestone]"), {
          x: -8,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: { trigger: listRef.current, start: "top 80%" },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const title = "Frontend → Full-stack → AI engineering";

  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="relative border-b border-[var(--border-subtle)] py-20 w9:py-28"
    >
      <Container className="flex flex-col gap-12">
        <div className="grid grid-cols-1 w9:grid-cols-12 gap-10 w9:gap-12">
          {/* Left — heading + milestones */}
          <div className="w9:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                <span className="text-[var(--accent)]">02</span>
                <span className="mx-2 text-[var(--text-muted)]/60">/</span>
                My journey
              </p>
              <h2
                id="journey-title"
                ref={titleRef}
                className="overpass font-semibold tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,3.5vw,2.75rem)]"
              >
                {title.split(" ").map((w, i) => (
                  <span key={i} data-word className="inline-block whitespace-pre">
                    {w}{" "}
                  </span>
                ))}
              </h2>
            </div>

            <ol ref={listRef} className="flex flex-col">
              {JOURNEY.map((m) => (
                <li
                  key={m.title}
                  data-milestone
                  className="flex flex-col gap-1 border-t border-[var(--border-subtle)] py-5 first:border-t-0 first:pt-0"
                >
                  <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                    {m.code}
                  </span>
                  <p className="overpass text-[19px] font-semibold tracking-tight text-[var(--text-primary)]">
                    {m.title}
                  </p>
                  <p className="text-[14px] leading-[1.6] text-[var(--text-muted)]">{m.blurb}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Right — terminal meta panel */}
          <div className="w9:col-span-5 w9:pt-16">
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]/70">
                  ~/logs/career.log
                </span>
                <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]/40">
                  read-only
                </span>
              </div>
              <div className="px-5 py-5">
                <p className="mono text-[12px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                  → path
                </p>
                <ul className="mono mt-3 flex flex-col gap-1.5 text-[12.5px] text-[var(--text-muted)]">
                  <li>
                    <span className="mr-2 text-[var(--accent)]">$</span>
                    frontend — interfaces, design systems, accessibility.
                  </li>
                  <li>
                    <span className="mr-2 text-[var(--accent)]">$</span>
                    full-stack — services, data modeling, infra basics.
                  </li>
                  <li>
                    <span className="mr-2 text-[var(--accent)]">$</span>
                    ai engineering — rag, agents, evals, deployment.
                  </li>
                  <li>
                    <span className="mr-2 text-[var(--accent)]">$</span>
                    <span className="text-[var(--text-primary)]">now:</span> shipping, writing, learning.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
