// Results — single full-width paragraph describing the outcome.

import Container from "../primitives/Container";

export default function Results({ body, future }) {
  return (
    <section
      aria-labelledby="results-title"
      className="relative border-b border-[var(--border-subtle)] py-16 w9:py-24"
    >
      <Container className="grid grid-cols-1 w9:grid-cols-12 gap-10">
        <div className="w9:col-span-3 flex flex-col gap-2">
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">09</span>
            <span className="mx-2 text-[var(--text-muted)]/60">/</span>
            Results
          </p>
        </div>
        <div className="w9:col-span-9 flex flex-col gap-8">
          <p
            id="results-title"
            className="overpass text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.01em] leading-[1.3] text-[var(--text-primary)]"
          >
            {body}
          </p>

          {future?.length ? (
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6">
              <p className="mono mb-3 text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                <span className="text-[var(--accent)]">10</span>
                <span className="mx-2 text-[var(--text-muted)]/60">/</span>
                Future improvements
              </p>
              <ul className="flex flex-col gap-2">
                {future.map((f) => (
                  <li
                    key={f}
                    className="mono flex items-start gap-2 text-[13.5px] leading-[1.6] text-[var(--text-primary)]/90"
                  >
                    <span className="mt-1 text-[var(--accent)]">›</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
