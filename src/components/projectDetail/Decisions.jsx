// Decisions — engineering decisions, each with choice / alternatives / reason.

import Container from "../primitives/Container";

export default function Decisions({ items }) {
  if (!items?.length) return null;
  return (
    <section
      aria-labelledby="decisions-title"
      className="relative border-b border-[var(--border-subtle)] py-16 w9:py-24"
    >
      <Container className="flex flex-col gap-10">
        <header className="flex flex-col gap-3">
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">06</span>
            <span className="mx-2 text-[var(--text-muted)]/60">/</span>
            Engineering decisions
          </p>
          <h2
            id="decisions-title"
            className="overpass font-semibold tracking-tight leading-[1.05] text-[clamp(1.75rem,3.5vw,2.5rem)] text-[var(--text-primary)]"
          >
            What we picked, and why.
          </h2>
        </header>

        <ol className="flex flex-col gap-4">
          {items.map((d, i) => (
            <li
              key={d.title}
              className="grid grid-cols-1 w9:grid-cols-12 gap-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 w9:p-7"
            >
              <div className="w9:col-span-3 flex flex-col gap-2">
                <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="overpass text-[18px] font-semibold tracking-tight text-[var(--text-primary)]">
                  {d.title}
                </h3>
              </div>
              <div className="w9:col-span-9 grid grid-cols-1 w6:grid-cols-3 gap-4">
                <div>
                  <p className="mono mb-1 text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Choice
                  </p>
                  <p className="text-[14px] leading-[1.6] text-[var(--text-primary)]/90">
                    {d.choice}
                  </p>
                </div>
                <div>
                  <p className="mono mb-1 text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Alternatives
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {d.alternatives.map((a) => (
                      <li
                        key={a}
                        className="inline-flex items-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2 py-0.5 text-[12px] text-[var(--text-muted)]"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mono mb-1 text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Why
                  </p>
                  <p className="text-[14px] leading-[1.6] text-[var(--text-muted)]">{d.reason}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
