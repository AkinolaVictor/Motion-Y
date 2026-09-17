// ServiceFeatureGrid — A grid of specific capabilities and outcomes.
// Uses the brand's accent and a clean, technical layout.

import Container from "../primitives/Container";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceFeatureGrid({ features }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Use fromTo to prevent "from" animation glitches in React Strict Mode.
      // This explicitly defines the start and end states, avoiding conflicts
      // during re-renders or rapid page reloads.
      gsap.fromTo(".feature-card",
        {
          autoAlpha: 0,
          y: 20
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
          }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-[var(--bg-base)]">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <span className="mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] font-medium">
            Capabilities
          </span>
          <h2 className="overpass text-3xl font-semibold text-[var(--text-primary)]">
            Engineered for Outcome.
          </h2>
        </div>

        <div className="grid grid-cols-1 w6:grid-cols-2 w9:grid-cols-4 gap-4 w9:gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card group relative p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_12px_30px_-12px_color-mix(in_srgb,var(--accent)_30%,transparent)]"
            >
              <div className="mb-4 h-10 w-10 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-fg)] transition-colors duration-300">
                {/* Simple icon placeholder - could use Lucide */}
                <div className="h-5 w-5 rounded-sm border-2 border-current" />
              </div>
              <h3 className="overpass text-lg font-medium text-[var(--text-primary)] mb-2">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
