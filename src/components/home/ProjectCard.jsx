// ProjectCard — variable-layout card for the Featured Projects bento grid.
// `variant` controls visual treatment: feature / wide / compact / tall.

import cn from "../../utils/cn";
import Pill from "../primitives/Pill";

function ProceduralCover({ tags, accent, variant }) {
  // Deterministic pseudo-random per tag-set keeps the visual stable across renders.
  const seed = tags.join("|").length;
  const circles = Array.from({ length: 5 }).map((_, i) => ({
    cx: ((seed * (i + 1)) % 100),
    cy: ((seed * (i + 3)) % 100),
    r: 6 + ((seed * (i + 2)) % 22),
  }));

  const isWide = variant === "wide";
  const heightClass = isWide ? "h-40 w9:h-44" : variant === "tall" ? "h-44 w9:h-full w9:min-h-[260px]" : "h-32";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-[var(--border-subtle)]",
        "bg-[var(--bg-elevated)]",
        heightClass
      )}
    >
      {/* Hairline grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <radialGradient id="pc-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.45" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="34" fill="url(#pc-glow)" />
        {circles.map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r={c.r / 5} fill="none" stroke={accent} strokeOpacity="0.55" strokeWidth="0.3" />
        ))}
        {circles.slice(0, 3).map((c, i) => (
          <circle key={`f-${i}`} cx={c.cx} cy={c.cy} r="0.6" fill={accent} />
        ))}
      </svg>
      {/* Mono label */}
      <span className="mono absolute left-3 top-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] backdrop-blur-sm">
        {tags[0]}
      </span>
    </div>
  );
}

export default function ProjectCard({ project }) {
  const { name, description, tags, github, demo, variant, span, accent } = project;

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl border border-[var(--border-subtle)]",
        "bg-[var(--bg-surface)] p-5 transition-colors duration-200 hover:border-[var(--accent)]/40",
        span
      )}
    >
      <ProceduralCover tags={tags} accent={accent} variant={variant} />

      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="overpass text-[20px] w8:text-[22px] font-semibold tracking-tight text-[var(--text-primary)]">
            {name}
          </h3>
          <span className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]/70">
            /{project.slug}
          </span>
        </div>
        <p className="text-[14px] leading-[1.6] text-[var(--text-muted)]">{description}</p>

        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>

        <div className="mt-1 flex items-center gap-2">
          <a
            href={github}
            className="mono inline-flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] px-2.5 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] hover:border-[var(--text-muted)]"
          >
            GitHub
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </a>
          <a
            href={demo}
            className="mono inline-flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] px-2.5 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)] transition-colors hover:text-[var(--accent)] hover:border-[var(--accent)]"
          >
            Live Demo
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
