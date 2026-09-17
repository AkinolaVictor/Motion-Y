// Portfolio Index Page — filtering and grid display of work.
// Mirrors the search/category logic of the Projects page but renders in a grid.

import Head from "next/head";
import { useId, useMemo, useState } from "react";
import PageShell from "../../components/layout/PageShell";
import Container from "../../components/primitives/Container";
import PortfolioGrid from "../../components/portfolio/PortfolioGrid";
import FinalCTA from "@/components/home/FinalCTA";
import { PORTFOLIO_CATEGORIES, PORTFOLIO_PROJECTS } from "../../data/portfolio";

export default function PortfolioPage() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const searchId = useId();

  const counts = useMemo(() => {
    const byCategory = { all: PORTFOLIO_PROJECTS.length };
    for (const c of PORTFOLIO_CATEGORIES) {
      if (c.key === "all") continue;
      byCategory[c.key] = PORTFOLIO_PROJECTS.filter((p) => p.category === c.key).length;
    }
    return { total: PORTFOLIO_PROJECTS.length, byCategory };
  }, []);

  const filtered = useMemo(() => {
    if (active === "all") return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((p) => p.category === active);
  }, [active]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return filtered;
    return filtered.filter((p) => {
      const haystack = [
        p.slug,
        p.company,
        p.title,
        p.description,
        ...(p.tags ?? []),
        p.category,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [filtered, query]);

  return (
    <>
      <Head>
        <title>Portfolio — Motion-Y</title>
        <meta
          name="description"
          content="A curated selection of AI-powered systems and digital transformations built by Motion-Y."
        />
      </Head>

      <PageShell>
        <section
          aria-label="Search portfolio"
          className="border-b border-[var(--border-subtle)]"
        >
          <Container className="relative pt-16 pb-2 w7:pt-24 w9:pt-28 w9:pb-2">
            <div className="flex flex-col gap-8">
              <p className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-[var(--accent)] accent-pulse" />
                  <span className="absolute inset-0 rounded-full bg-[var(--accent)]" />
                </span>
                Portfolio
              </p>

              <div className="flex flex-col gap-4 w9:flex-row w9:items-end w9:justify-between">
                <h1
                  id="portfolio-title"
                  className="overpass font-semibold tracking-[-0.02em] leading-[1.02] text-[clamp(2.75rem,7vw,5.5rem)]"
                >
                  Portfolio.
                </h1>
              </div>

              <p className="max-w-[60ch] text-[17px] w8:text-[18px] leading-[1.65] text-[var(--text-muted)]">
                A showcase of production-ready AI systems, from autonomous agents to enterprise-scale automation pipelines.
              </p>

              <div role="tablist" aria-label="Filter portfolio by category" className="flex flex-wrap gap-2">
                {PORTFOLIO_CATEGORIES.map((c) => {
                  const isActive = active === c.key;
                  const count = counts?.byCategory?.[c.key] ?? 0;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActive(c.key)}
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
                          isActive ? "bg-[var(--accent-fg)]/15 text-[var(--accent-fg)]" : "bg-[var(--bg-elevated)] text-[var(--text-muted)]",
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

          <Container className="py-6 w9:py-8">
            <div className="relative w-full">
              <label htmlFor={searchId} className="sr-only">
                Search portfolio
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
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by company, project, or tag..."
                aria-label="Search portfolio"
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
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="mono absolute right-2 top-1/2 inline-flex h-7 -translate-y-1/2 items-center justify-center rounded-md px-2 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  esc
                </button>
              )}
            </div>

            {query && (
              <p className="mono mt-3 text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]/80">
                {visible.length} {visible.length === 1 ? "match" : "matches"} for
                <span className="text-[var(--text-primary)]"> "{query.trim()}"</span>
              </p>
            )}
          </Container>
        </section>

        <section aria-label="Portfolio grid" className="border-b border-[var(--border-subtle)] py-20 w9:py-28">
          <Container>
            {visible.length === 0 ? (
              <div className="py-16 text-center">
                <p className="mono text-[12px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {query
                    ? `No matches for "${query.trim()}" — try another term.`
                    : "Nothing in this category yet — try another."}
                </p>
              </div>
            ) : (
              <PortfolioGrid projects={visible} />
            )}
            <div className="hairline mt-20" />
          </Container>
        </section>

        <FinalCTA env/>
      </PageShell>
    </>
  );
}
