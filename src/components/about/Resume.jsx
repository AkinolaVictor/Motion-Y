// Resume — section 08 / RESUME.
// Compact card with a left prompt, two CTAs on the right.
// The Download CTA is disabled until RESUME_URL is wired up.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";
import Button from "../primitives/Button";
import { RESUME_URL, RESUME_SIZE, RESUME_UPDATED } from "../../data/about";

export default function Resume() {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 14,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, []);

  const hasResume = Boolean(RESUME_URL);

  return (
    <section
      id="resume"
      aria-labelledby="resume-title"
      className="relative border-b border-[var(--border-subtle)] py-16 w9:py-20"
    >
      <Container>
        <div
          ref={ref}
          className="flex flex-col gap-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-6 py-6 w7:flex-row w7:items-center w7:justify-between w7:gap-8 w7:px-8"
        >
          <div className="flex flex-col gap-2">
            <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
              <span className="text-[var(--text-muted)]">08</span>
              <span className="mx-2 text-[var(--text-muted)]/60">/</span>
              More details
            </p>
            <h3
              id="resume-title"
              className="overpass text-[20px] font-semibold tracking-tight text-[var(--text-primary)]"
            >
              Want the compact version?
            </h3>
            <p className="text-[13px] text-[var(--text-muted)]">
              A printable one-pager with the full chronology, projects, and stack.{" "}
              <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]/70">
                {RESUME_SIZE} · {RESUME_UPDATED}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              href={hasResume ? RESUME_URL : undefined}
              variant="primary"
              size="md"
              external={hasResume}
            >
              View resume
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
            <Button
              href={hasResume ? RESUME_URL : undefined}
              variant="ghost"
              size="md"
              external={hasResume}
              download={hasResume ? "Akinola-Victor-Resume.pdf" : undefined}
              aria-disabled={!hasResume}
              className={!hasResume ? "pointer-events-none opacity-50" : undefined}
            >
              Download CV
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3v12" />
                <path d="m7 10 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
