// ServiceCTA — Focused call-to-action to convert a visitor into a lead.
// Maintains a minimal, high-contrast layout.

import Container from "../primitives/Container";
import Button from "../primitives/Button";

export default function ServiceCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <Container className="relative z-10 flex flex-col items-center text-center gap-8">
        <div className="flex flex-col gap-4 max-w-2xl">
          <h2 className="overpass text-4xl w7:text-5xl font-semibold tracking-tight text-[var(--text-primary)]">
            Ready to augment your <span className="text-[var(--accent)]">operations?</span>
          </h2>
          <p className="text-lg text-[var(--text-muted)] leading-relaxed">
            Whether you need a full automation roadmap or a custom agentic system, let's build something that moves the needle.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="primary"
            size="lg"
            href="/contact"
            className="px-10"
          >
            Start a Project
          </Button>
          <Button
            variant="ghost"
            size="lg"
            href="/about"
          >
            View My Work
          </Button>
        </div>
      </Container>
    </section>
  );
}
