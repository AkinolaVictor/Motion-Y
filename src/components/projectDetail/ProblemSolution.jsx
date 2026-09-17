// ProblemSolution — two-column Problem vs Solution block on the detail page.

import Container from "../primitives/Container";

function Pane({ index, label, children }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 w9:p-8">
      <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
        <span className="text-[var(--accent)]">{index}</span>
        <span className="mx-2 text-[var(--text-muted)]/60">/</span>
        {label}
      </p>
      <div className="text-[15.5px] leading-[1.7] text-[var(--text-primary)]/90">{children}</div>
    </div>
  );
}

export default function ProblemSolution({ problem, solution }) {
  return (
    <section
      aria-labelledby="problem-solution"
      className="relative border-b border-[var(--border-subtle)] py-16 w9:py-24"
    >
      <Container>
        <h2 id="problem-solution" className="sr-only">
          Problem and solution
        </h2>
        <div className="grid grid-cols-1 w7:grid-cols-2 gap-4 w9:gap-6">
          <Pane index="01" label="Problem">{problem}</Pane>
          <Pane index="02" label="Solution">{solution}</Pane>
        </div>
      </Container>
    </section>
  );
}
