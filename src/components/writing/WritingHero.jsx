// WritingHero — page header for /writing.
// Mirrors ProjectsHero and LabHero rhythm: pulsing-dot eyebrow, mono category
// ribbon, big display title, subtitle, then category filter pills below.
// Filter state owned by the parent (/writing page passes { active, onChange, counts }).
//
// Tone: "quarterly engineering journal" — title is "Writing.", eyebrow reads
// "JOURNAL", subtitle leans into the publication metaphor.

import Container from "../primitives/Container";
import { CATEGORIES } from "../../data/writing";

export default function WritingHero({ active, onChange, counts, total }) {
  return (
    <section
      aria-labelledby="writing-title"
      className="relative overflow-hidden border-b border-[var(--border-subtle)]"
    >
      <Container className="relative pt-16 pb-10 w7:pt-24 w9:pt-28 w9:pb-14">
        <div className="flex flex-col gap-8">
          <p className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-[var(--accent)] accent-pulse" />
              <span className="absolute inset-0 rounded-full bg-[var(--accent)]" />
            </span>
            Insights
          </p>

          <div className="flex flex-col gap-4 w9:flex-row w9:items-end w9:justify-between">
            <h1
              id="writing-title"
              className="overpass font-semibold tracking-[-0.02em] leading-[1.02] text-[clamp(2.75rem,7vw,5.5rem)]"
            >
              Latest Insights.
            </h1>
            <p className="mono max-w-[58ch] text-[12px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {total ?? counts?.total ?? 0} Articles
              <span className="mx-2 text-[var(--text-muted)]/50">·</span>
              {CATEGORIES.length - 1} categories
            </p>
          </div>

          <p className="max-w-[60ch] text-[17px] w8:text-[18px] leading-[1.65] text-[var(--text-muted)]">
            Stay updated with the latest in AI agents and automation
          </p>

          {/* Mono category ribbon */}
          <p className="mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]/80">
            <span className="text-[var(--accent)]">ARTICLES</span>
            <span className="text-[var(--text-muted)]/40">·</span>
            <span>LEARNING</span>
            <span className="text-[var(--text-muted)]/40">·</span>
            <span>ENGINEERING</span>
            <span className="text-[var(--text-muted)]/40">·</span>
            <span>EXPERIMENTS</span>
          </p>

          {/* Filter pills */}
          <div role="tablist" aria-label="Filter articles by category" className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const isActive = active === c.key;
              const count = counts?.byCategory?.[c.key] ?? 0;
              return (
                <button
                  key={c.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onChange?.(c.key)}
                  className={[
                    "mono inline-flex items-center gap-2 rounded-full border px-3 py-1.5",
                    "text-[11px] uppercase tracking-[0.18em] transition-colors duration-200",
                    isActive
                      ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)]"
                      : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]",
                  ].join(" ")}
                >
                  {c.label}
                  <span
                    className={[
                      "rounded-full px-1.5 text-[10px]",
                      isActive
                        ? "bg-[var(--accent-fg)]/15 text-[var(--accent-fg)]"
                        : "bg-[var(--bg-elevated)] text-[var(--text-muted)]",
                    ].join(" ")}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
