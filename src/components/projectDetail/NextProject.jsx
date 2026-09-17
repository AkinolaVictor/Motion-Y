// NextProject — bottom-of-page CTA strip + prev/next navigation. Loops at the ends.

import Link from "next/link";
import Container from "../primitives/Container";
import Button from "../primitives/Button";

export default function NextProject({ project, prev, next }) {
  return (
    <section
      aria-labelledby="next-project"
      className="relative py-20 w9:py-28"
    >
      <Container className="flex flex-col gap-12">
        {/* CTA */}
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">/</span>
            <span className="mx-2">explore the build</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href={project.github} external size="lg" variant="primary">
              GitHub
            </Button>
            <Button href={project.demo} external size="lg" variant="ghost">
              Live Demo
            </Button>
          </div>
        </div>

        <div className="hairline" />

        {/* Prev / next */}
        <nav
          id="next-project"
          aria-label="Project navigation"
          className="grid grid-cols-1 w7:grid-cols-2 gap-4"
        >
          {prev && (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex flex-col gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 transition-colors hover:border-[var(--text-muted)]"
            >
              <span className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
                Previous project
              </span>
              <p className="overpass text-[20px] font-semibold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                {prev.name}
              </p>
              <p className="text-[13px] leading-[1.55] text-[var(--text-muted)]">{prev.tagline}</p>
            </Link>
          )}
          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 text-right transition-colors hover:border-[var(--text-muted)] w7:items-end"
            >
              <span className="mono flex items-center justify-end gap-2 text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                Next project
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </span>
              <p className="overpass text-[20px] font-semibold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                {next.name}
              </p>
              <p className="text-[13px] leading-[1.55] text-[var(--text-muted)]">{next.tagline}</p>
            </Link>
          )}
        </nav>
      </Container>
    </section>
  );
}
