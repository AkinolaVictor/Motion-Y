
import Head from "next/head";
import { useId, useMemo, useState } from "react";
import PageShell from "../../components/layout/PageShell";
import Container from "../../components/primitives/Container";
import ProjectListItem from "../../components/projects/ProjectListItem";
import ProjectsBio from "../../components/projects/ProjectsBio";
import { CATEGORIES, PROJECTS, listProjectsByCategory } from "../../data/projects";
import FinalCTA from "@/components/home/FinalCTA";

export default function ProjectsPage() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const searchId = useId();

  const counts = useMemo(() => {
    const byCategory = { all: PROJECTS.length };
    for (const c of CATEGORIES) {
      if (c.key === "all") continue;
      byCategory[c.key] = PROJECTS.filter((p) => p.categories.includes(c.key)).length;
    }
    return { total: PROJECTS.length, byCategory };
  }, []);

  // Category-filtered list — the base pool for search.
  const filtered = useMemo(() => listProjectsByCategory(active), [active]);

  // Search takes priority: when a query is present we ignore the category filter
  // and match against slug / name / tagline / description / tags / labels.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return filtered;
    return filtered.filter((p) => {
      const haystack = [
        p.slug,
        p.name,
        p.tagline,
        p.description,
        ...(p.tags ?? []),
        ...(p.labels ?? []),
        ...(p.categories ?? []),
        String(p.year ?? ""),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [filtered, query]);

  return (
    <>
      <Head>
        <title>Projects — Motion-Y</title>
        <meta
          name="description"
          content="Explore AI systems and intelligent applications built by Motion-Y to solve real-world challenges.."
        />
      </Head>

      <PageShell>
        <section
          aria-label="Search projects"
          className="border-b border-[var(--border-subtle)]"
        >

          <Container className="relative pt-16 pb-2 w7:pt-24 w9:pt-28 w9:pb-2">
            <div className="flex flex-col gap-8">
              <p className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-[var(--accent)] accent-pulse" />
                  <span className="absolute inset-0 rounded-full bg-[var(--accent)]" />
                </span>
                Works
                {/* <span className="text-[var(--text-muted)]/50">/</span> */}
                {/* <span className="text-[var(--text-muted)]/80">2024—26</span> */}
              </p>
    
              <div className="flex flex-col gap-4 w9:flex-row w9:items-end w9:justify-between">
                <h1
                  id="projects-title"
                  className="overpass font-semibold tracking-[-0.02em] leading-[1.02] text-[clamp(2.75rem,7vw,5.5rem)]"
                >
                  Projects.
                </h1>
                {/* <p className="mono max-w-[58ch] text-[12px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {counts?.total ?? 0} entries · {CATEGORIES.length - 1} categories
                </p> */}
              </div>
    
              <p className="max-w-[60ch] text-[17px] w8:text-[18px] leading-[1.65] text-[var(--text-muted)]">
                A showcase of AI systems, intelligent applications, and tools built to explore ideas, solve real-world challenges, and push the boundaries of what’s possible with AI.
              </p>
    
              {/* Filter pills */}
              <div role="tablist" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => {
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
                Search projects
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
                placeholder="Search by name, slug, tag, label, or year…"
                aria-label="Search projects by name, slug, tag, label, or year"
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

        <section aria-label="Project list" className="border-b border-[var(--border-subtle)]">
          <Container>
            {visible.length === 0 ? (
              <div className="py-16 text-center">
                <p className="mono text-[12px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {query
                    ? `No projects match "${query.trim()}" — try another term.`
                    : "Nothing in this category yet — try another."}
                </p>
              </div>
            ) : (
              <ul className="flex flex-col">
                {visible.map((p, i) => (
                  <li key={p.slug}>
                    <ProjectListItem project={p} index={i} />
                  </li>
                ))}
              </ul>
            )}
            <div className="hairline mt-2" />
          </Container>
        </section>

        {/* <ProjectsBio /> */}
        <FinalCTA env/>
      </PageShell>
    </>
  );
}
