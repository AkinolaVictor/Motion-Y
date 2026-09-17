// LabHero — page header for /lab.
// Mirrors ProjectsHero: pulsing-dot eyebrow, mono category ribbon, big display title,
// subtitle. The status counters and category filter pills live in ExperimentGrid
// (just below the "Specimen index." heading) — keeping the hero uncluttered and
// putting controls next to the content they control.
//
// Tone differs from /projects: eyebrow reads "LAB ONLINE", title is "Victor's AI Lab.",
// subtitle leans into the playground metaphor. The mono ribbon
// (EXPERIMENTS · RESEARCH · LEARNING · PROTOTYPES) gives the page its
// notebook rhythm.

import Container from "../primitives/Container";
import { CATEGORIES } from "../../data/experiments";

export default function LabHero({ counts }) {
  return (
    <section
      aria-labelledby="lab-title"
      className="relative overflow-hidden border-b border-[var(--border-subtle)]"
    >
      <Container className="relative pt-16 pb-10 w7:pt-24 w9:pt-28 w9:pb-14">
        <div className="flex flex-col gap-8">
          <p className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-[var(--accent)] accent-pulse" />
              <span className="absolute inset-0 rounded-full bg-[var(--accent)]" />
            </span>
            Lab online
            <span className="text-[var(--text-muted)]/50">·</span>
            <span className="text-[var(--text-muted)]/80">~/experiments</span>
          </p>

          <div className="flex flex-col gap-4 w9:flex-row w9:items-end w9:justify-between">
            <h1
              id="lab-title"
              className="overpass font-semibold tracking-[-0.02em] leading-[1.02] text-[clamp(2.75rem,7vw,5.5rem)]"
            >
              Victor&apos;s AI <span className="text-[var(--accent)]">Lab.</span>
            </h1>
            <p className="mono max-w-[58ch] text-[12px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {counts?.total ?? 0} specimens
              <span className="mx-2 text-[var(--text-muted)]/50">·</span>
              {CATEGORIES.length - 1} categories
            </p>
          </div>

          <p className="max-w-[60ch] text-[17px] w8:text-[18px] leading-[1.65] text-[var(--text-muted)]">
            An experimental playground for exploring AI systems, testing ideas, and learning through
            building. Not polished — on purpose.
          </p>

          {/* Mono category ribbon */}
          <p className="mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]/80">
            <span className="text-[var(--accent)]">EXPERIMENTS</span>
            <span className="text-[var(--text-muted)]/40">·</span>
            <span>RESEARCH</span>
            <span className="text-[var(--text-muted)]/40">·</span>
            <span>LEARNING</span>
            <span className="text-[var(--text-muted)]/40">·</span>
            <span>PROTOTYPES</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
