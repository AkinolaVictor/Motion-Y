// FeaturedExperiment — the "thesis" block for the Lab page.
// One large specimen card showing Question → Experiment → Result → Insight.
// Mirrors the project's hero rhythm but reads as a research notebook, not a
// product showcase. The OscilloscopeCover sits at the top as the
// instrument-trace signature element.

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";
import OscilloscopeCover from "./OscilloscopeCover";
import { CATEGORIES, STATUS_LABELS } from "../../data/experiments";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
}

export default function FeaturedExperiment({ experiment }) {
  const ref = useRef(null);
  const status = STATUS_LABELS[experiment.status] ?? STATUS_LABELS.exploring;
  const category = CATEGORIES.find((c) => c.key === experiment.category);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-feat]", {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 82%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="featured-exp-title"
      className="relative border-b border-[var(--border-subtle)] py-16 w9:py-24"
    >
      <Container className="flex flex-col gap-10">
        {/* Header strip */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">★</span>
            <span className="text-[var(--accent)]">FEATURED SPECIMEN</span>
            <span className="text-[var(--text-muted)]/40">·</span>
            <span>{category?.label ?? experiment.category}</span>
          </p>
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]/70">
            {formatDate(experiment.date)} · {experiment.id}
          </p>
        </div>

        {/* Card */}
        <article
          data-feat
          className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 w7:p-6 flex flex-col gap-6"
        >
          <OscilloscopeCover seed={experiment.id} label={`CH-01 · ${experiment.id}`} height="h-40 w7:h-48" />

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mono inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
              <span className="mono text-[var(--text-muted)]/40">·</span>
              <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {experiment.tech.slice(0, 3).join(" · ")}
              </span>
            </div>

            <h2
              id="featured-exp-title"
              className="overpass text-[clamp(1.75rem,3.6vw,2.5rem)] font-semibold tracking-tight leading-[1.08] text-[var(--text-primary)]"
            >
              {experiment.title}
            </h2>
          </div>

          {/* Question → Experiment → Result → Insight */}
          <dl className="grid grid-cols-1 w7:grid-cols-2 gap-6 w9:gap-8 border-t border-[var(--border-subtle)] pt-6">
            <SpecimenRow term="Question" body={experiment.question} />
            <SpecimenRow term="Experiment" body={experiment.experiment} />
            <SpecimenRow term="Result" body={experiment.result} accent />
            <SpecimenRow term="What I learned" body={experiment.learned} accent />
          </dl>

          {experiment.github && experiment.github !== "#" && (
            <a
              href={experiment.github}
              target="_blank"
              rel="noreferrer noopener"
              className="mono inline-flex w-fit items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              View repo
              <span>↗</span>
            </a>
          )}
        </article>
      </Container>
    </section>
  );
}

function SpecimenRow({ term, body, accent = false }) {
  return (
    <div className="flex flex-col gap-2">
      <dt className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
        <span className="text-[var(--accent)]">›</span>
        {term}
      </dt>
      <dd
        className={`text-[15px] leading-[1.7] ${accent ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`}
      >
        {body}
      </dd>
    </div>
  );
}
