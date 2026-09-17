// Tech — technologies grouped by category. Simple two-column table.

import Container from "../primitives/Container";

const CATEGORY_LABELS = {
  ai_ml:    "AI / ML",
  frontend: "Frontend",
  backend:  "Backend",
  database: "Database",
  infra:    "Infrastructure",
  apis:     "APIs",
};

export default function Tech({ tech }) {
  return (
    <section
      aria-labelledby="tech-title"
      className="relative border-b border-[var(--border-subtle)] py-16 w9:py-24"
    >
      <Container className="flex flex-col gap-10">
        <header className="flex flex-col gap-3">
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">05</span>
            <span className="mx-2 text-[var(--text-muted)]/60">/</span>
            Technology
          </p>
          <h2
            id="tech-title"
            className="overpass font-semibold tracking-tight leading-[1.05] text-[clamp(1.75rem,3.5vw,2.5rem)] text-[var(--text-primary)]"
          >
            The stack.
          </h2>
        </header>

        <dl className="grid grid-cols-1 w6:grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--border-subtle)]">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
            const items = tech?.[key] ?? [];
            if (items.length === 0) return null;
            return (
              <div
                key={key}
                className="flex flex-col gap-3 bg-[var(--bg-surface)] p-6"
              >
                <dt className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  {label}
                </dt>
                <dd className="flex flex-wrap gap-1.5">
                  {items.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2 py-1 text-[12px] text-[var(--text-primary)]/90"
                    >
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
