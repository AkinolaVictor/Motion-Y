// VisionMission — High-level purpose and guiding star.
// Uses strong typography and a minimal layout.

import Container from "../primitives/Container";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function VisionMission() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(".vm-reveal", {
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-[var(--bg-surface)]">
      <Container className="flex flex-col gap-16">
        <div className="vm-reveal flex flex-col items-center text-center gap-4">
          <span className="mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] font-medium">
            Our Purpose
          </span>
          <h2 className="overpass text-4xl font-semibold text-[var(--text-primary)] tracking-tight">
            Strategic Intelligence.
          </h2>
        </div>

        <div className="grid grid-cols-1 w9:grid-cols-2 gap-12">
          <div className="vm-reveal flex flex-col gap-6 p-8 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-base)]">
            <h3 className="overpass text-2xl font-semibold text-[var(--accent)]">The Vision</h3>
            <p className="text-lg leading-relaxed text-[var(--text-muted)]">
              To help businesses multiply productivity, accelerate growth, and achieve extraordinary heights in technologically possible ways.
            </p>
          </div>
          <div className="vm-reveal flex flex-col gap-6 p-8 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-base)]">
            <h3 className="overpass text-2xl font-semibold text-[var(--accent)]">The Mission</h3>
            <p className="text-lg leading-relaxed text-[var(--text-muted)]">
              To transform businesses through AI and intelligent technology, enabling them to work smarter, grow faster, and turn ambitious goals into measurable results.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
