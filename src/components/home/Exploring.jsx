// Exploring — section 06 / NOTES.
// "Live research notebook" — typewriter loop through the topics I'm currently digging into.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";
import SectionHeader from "../primitives/SectionHeader";

const TOPICS = [
  "agentic architectures",
  "multimodal retrieval",
  "local llm deployment",
  "ai evaluation rubrics",
  "model quantization",
  "tool-use protocols",
  "long-context memory",
];

export default function Exploring() {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Loop: type, pause, erase, advance.
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
      TOPICS.forEach((topic) => {
        const stepDur = 0.05;
        tl.to({}, { duration: topic.length * stepDur, onStart: () => type(topic) })
          .to({}, { duration: 1.4 })
          .to({}, {
            duration: topic.length * stepDur,
            onStart: () => erase(topic.length),
          })
          .to({}, { duration: 0.4 });
      });
      return () => tl.kill();

      function type(text) {
        const el = ref.current?.querySelector("[data-typing]");
        if (!el) return;
        let i = 0;
        el.textContent = "";
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
      id="exploring"
      aria-labelledby="exploring-title"
      className="relative border-b border-[var(--border-subtle)] py-20 w9:py-28"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeader
          index="06"
          label="NOTES"
          title={<span id="exploring-title">Currently exploring.</span>}
          lead="Working notes from whatever I'm poking at this week. Not polished — on purpose."
        />

        <div
          ref={ref}
          className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
        >
          {/* Terminal header */}
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

          <div className="px-6 py-8 w9:px-10 w9:py-12">
            <p className="mono text-[12px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
              → dig into
            </p>
            <p className="mono mt-3 text-[clamp(1.5rem,3.5vw,2.25rem)] leading-[1.3] text-[var(--text-primary)]">
              <span className="text-[var(--accent)]">$</span>{" "}
              <span data-typing aria-live="polite">
                {TOPICS[0]}
              </span>
              <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-[var(--accent)] animate-pulse" />
            </p>

            <ul className="mt-8 grid grid-cols-2 w7:grid-cols-3 gap-2 w7:gap-3">
              {TOPICS.map((t) => (
                <li
                  key={t}
                  className="mono flex items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2 text-[12px] text-[var(--text-muted)]"
                >
                  <span className="text-[var(--accent)]">›</span> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
