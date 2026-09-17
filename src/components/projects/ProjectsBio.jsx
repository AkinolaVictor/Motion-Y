// ProjectsBio — quiet "tagline + secondary nav" block at the bottom of /projects.
// Mirrors the live reference: eyebrow + bold tagline + inline links.

import Link from "next/link";
import Container from "../primitives/Container";

const LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/writing",   label: "Writing" },
  { href: "/about",     label: "About" },
  { href: "/contact",   label: "Contact" },
];

export default function ProjectsBio() {
  return (
    <section
      aria-labelledby="projects-bio"
      className="relative border-b border-[var(--border-subtle)] py-20 w9:py-28"
    >
      <Container className="flex flex-col gap-8">
        <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
          <span className="text-[var(--accent)]">/</span>
          <span className="mx-2">ai engineer</span>
          <span className="text-[var(--text-muted)]/60">/</span>
          <span className="ml-2">builder</span>
        </p>

        <h2
          id="projects-bio"
          className="overpass max-w-[18ch] font-semibold tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,5vw,3.5rem)] text-[var(--text-primary)]"
        >
          Building useful intelligence for the real world.
        </h2>

        <nav aria-label="More from me" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className="mono group inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              <span className="text-[var(--accent)]/70">0{i + 1}</span>
              <span className="mx-1 text-[var(--text-muted)]/50">·</span>
              {l.label}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          ))}
        </nav>
      </Container>
    </section>
  );
}
