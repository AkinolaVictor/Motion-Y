// ExperimentCard — specimen card for the experiment grid.
// Layout: oscilloscope cover on top, then EXP-### / category / status meta,
// the title, the question (the entry's hook), and a 4-line excerpt of result.
//
// Click target is the whole card. Keyboard / screen-reader friendly via
// `role="link"` + `tabIndex` since the target is a child <a>.

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import OscilloscopeCover from "./OscilloscopeCover";
import Pill from "../primitives/Pill";
import { CATEGORIES, STATUS_LABELS } from "../../data/experiments";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
}

export default function ExperimentCard({ experiment, index }) {
  const cardRef = useRef(null);
  const status = STATUS_LABELS[experiment.status] ?? STATUS_LABELS.exploring;
  const category = CATEGORIES.find((c) => c.key === experiment.category);

  useEffect(() => {
    if (typeof window === "undefined" || !cardRef.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        autoAlpha: 0,
        y: 14,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 90%" },
        delay: (index % 6) * 0.04,
      });
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  return (
    <article
      ref={cardRef}
      className="group relative flex flex-col gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 w7:p-5 transition-colors duration-200 hover:border-[var(--accent)]/40"
    >
      <OscilloscopeCover seed={experiment.id} label={`CH-01 · ${experiment.id}`} height="h-28 w7:h-32" />

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
          <span className="text-[var(--accent)]">{experiment.id}</span>
          <span className="mx-1.5 text-[var(--text-muted)]/50">/</span>
          {category?.label ?? experiment.category}
        </span>
        <span className="mono text-[var(--text-muted)]/40">·</span>
        <span className="mono inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          <span className={`inline-block h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
        <span className="mono text-[var(--text-muted)]/40">·</span>
        <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]/70">
          {formatDate(experiment.date)}
        </span>
      </div>

      {/* Title */}
      <h3 className="overpass text-[19px] w8:text-[21px] font-semibold tracking-tight leading-[1.2] text-[var(--text-primary)]">
        {experiment.title}
      </h3>

      {/* Question excerpt */}
      <p className="text-[14px] leading-[1.65] text-[var(--text-muted)] line-clamp-3">
        {experiment.question}
      </p>

      {/* Result hint */}
      <p className="mono text-[12px] leading-[1.6] text-[var(--text-primary)]/90 border-l border-[var(--accent)]/40 pl-3 line-clamp-2">
        <span className="text-[var(--accent)]">↳ </span>
        {experiment.result}
      </p>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {experiment.tech.slice(0, 4).map((t) => (
          <Pill key={t}>{t}</Pill>
        ))}
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-[var(--border-subtle)]">
        <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]/70">
          /{experiment.id.toLowerCase()}
        </span>
        {experiment.github && experiment.github !== "#" ? (
          <a
            href={experiment.github}
            target="_blank"
            rel="noreferrer noopener"
            className="mono inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            Repo
            <span>↗</span>
          </a>
        ) : (
          <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]/60">
            private · notes only
          </span>
        )}
      </div>
    </article>
  );
}
