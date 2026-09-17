// Philosophy — section 03 / ENGINEERING PHILOSOPHY.
// The page's signature: a full-bleed accent band with oversized "Build → Measure → Improve"
// and a one-line explainer. The accent paints with --accent, and text flips to the
// high-contrast accent foreground so it stays legible across light/dark themes.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";

export default function Philosophy() {
  const titleRef = useRef(null);
  const leadRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll("[data-word]");
        gsap.from(words, {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        });
        // Arrows draw in after their words settle.
        gsap.from(titleRef.current.querySelectorAll("[data-arrow]"), {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.4,
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        });
      }
      if (leadRef.current) {
        gsap.from(leadRef.current, {
          autoAlpha: 0,
          y: 12,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.4,
          scrollTrigger: { trigger: leadRef.current, start: "top 85%" },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  // Each tuple: a word, plus a flag for whether an arrow should follow it.
  const parts = [
    { text: "Build", arrow: true },
    { text: "Measure", arrow: true },
    { text: "Improve", arrow: false },
  ];

  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-title"
      className="relative bg-[var(--accent)] text-[var(--accent-fg)]"
    >
      {/* Subtle grid wash so the band reads as engineered, not flat. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08] bg-grid"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <Container className="relative flex flex-col gap-10 py-20 w9:py-28">
        <div className="flex flex-col gap-3">
          <p className="mono text-[11px] uppercase tracking-[0.22em] opacity-80">
            Engineering philosophy
          </p>
          <h2
            id="philosophy-title"
            ref={titleRef}
            className="overpass font-semibold tracking-[-0.025em] leading-[1.02] text-[clamp(2.5rem,7vw,5rem)]"
          >
            {parts.map((p, i) => (
              <span key={p.text} className="inline-block">
                <span data-word className="inline-block">
                  {p.text}
                </span>
                {p.arrow && (
                  <span data-arrow className="mx-3 inline-block translate-y-[-0.06em] opacity-70">
                    →
                  </span>
                )}
                {i < parts.length - 1 ? " " : ""}
              </span>
            ))}
          </h2>
        </div>

        <p
          ref={leadRef}
          className="max-w-[55ch] text-[16px] w8:text-[17px] leading-[1.65] opacity-90"
        >
          Build practical systems, measure their behavior, identify weaknesses, and continuously
          improve them.
        </p>
      </Container>
    </section>
  );
}
