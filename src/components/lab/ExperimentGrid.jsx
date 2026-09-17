// ExperimentGrid — chronological grid of ExperimentCards.
// Two-column at w7 (728px), three at w9 (900px). Heading reads
// "Specimen index" so the lab-notebook metaphor is consistent.
//
// Just below the heading sits the lab's control surface:
//   1. Status counters  (EXPLORING · SUCCESSFUL · FAILED · ITERATING)
//   2. Category pills   (ALL · LOCAL LLM · AGENTS · …)
//   3. Search bar       (matches title / id / tags)
//
// Putting controls next to the content they control keeps the LabHero uncluttered
// and means visitors see filters right where results render.
//
// Filter state is owned by /lab — search takes priority when active, so the
// query short-circuits the category filter inside the page.

import { useId } from "react";
import Container from "../primitives/Container";
import ExperimentCard from "./ExperimentCard";
import { CATEGORIES } from "../../data/experiments";

function StatusDot({ status }) {
  const map = {
    exploring: "bg-[var(--accent)]",
    successful: "bg-emerald-400",
    failed: "bg-rose-400",
    iterating: "bg-amber-400",
  };
  return (
    <span
      className={`inline-block h-1.5 w-1.5 rounded-full ${map[status] ?? "bg-[var(--text-muted)]"}`}
    />
  );
}

export default function ExperimentGrid({
  experiments,
  active,
  onChange,
  counts,
  statusCounts,
  query,
  onQueryChange,
}) {
  const searchId = useId();

  return (
    <section
      aria-labelledby="grid-title"
      className="relative border-b border-[var(--border-subtle)] py-16 w9:py-24"
    >
      <Container className="flex flex-col gap-10">
        {/* Heading row */}
        <div className="flex items-end justify-between gap-4 border-b border-[var(--border-subtle)] pb-3">
          <h2
            id="grid-title"
            className="overpass text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-tight leading-[1.1] text-[var(--text-primary)]"
          >
            Specimen index.
          </h2>
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]/80">
            {experiments.length} {experiments.length === 1 ? "entry" : "entries"}
          </p>
        </div>

        {/* Status counters */}
        {statusCounts && (
          <ul className="grid grid-cols-2 w6:grid-cols-4 gap-2">
            {Object.entries(statusCounts).map(([key, n]) => (
              <li
                key={key}
                className="mono flex items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]"
              >
                <span className="flex items-center gap-2">
                  <StatusDot status={key} />
                  {key}
                </span>
                <span className="text-[var(--text-primary)]">{n}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Filter pills */}
        <div
          role="tablist"
          aria-label="Filter experiments by category"
          className="flex flex-wrap gap-2"
        >
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

        {/* Search bar */}
        <div className="relative w-full">
          <label htmlFor={searchId} className="sr-only">
            Search experiments
          </label>
          <span
            aria-hidden="true"
            className="mono pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]/70"
          >
            grep
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id={searchId}
            type="search"
            inputMode="search"
            autoComplete="off"
            spellCheck="false"
            value={query}
            onChange={(e) => onQueryChange?.(e.target.value)}
            placeholder="Search by title, ID (EXP-NNN), or tag…"
            aria-label="Search experiments by title, ID, or tag"
            className={[
              "mono w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]",
              "py-3 pl-14 pr-10 text-[13px] tracking-[0.04em] text-[var(--text-primary)]",
              "placeholder:text-[var(--text-muted)]/70",
              "transition-colors duration-200",
              "focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20",
            ].join(" ")}
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange?.("")}
              aria-label="Clear search"
              className="mono absolute right-2 top-1/2 inline-flex h-7 -translate-y-1/2 items-center justify-center rounded-md px-2 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            >
              esc
            </button>
          )}
        </div>

        {/* Results */}
        {experiments.length === 0 ? (
          <div className="py-16 text-center">
            <p className="mono text-[12px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {query
                ? `No specimens match "${query.trim()}" — try another term.`
                : "No specimens in this category — try another."}
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 w7:grid-cols-2 w9:grid-cols-3 gap-5 w7:gap-6">
            {experiments.map((e, i) => (
              <li key={e.id}>
                <ExperimentCard experiment={e} index={i} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
