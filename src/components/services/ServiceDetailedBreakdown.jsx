// ServiceDetailedBreakdown — Deep dive into the "How" and "Why".
// Uses a split layout to contrast the conceptual shift with practical points.

import Container from "../primitives/Container";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ServiceDetailedBreakdown({ section }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(".breakdown-item", {
        autoAlpha: 0,
        x: -20,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-20 border-b border-[var(--border-subtle)]">
      <Container className="grid grid-cols-1 w9:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col gap-6">
          <h2 className="overpass text-3xl font-semibold text-[var(--text-primary)] tracking-tight">
            {section.title}
          </h2>
          <p className="text-[16px] leading-relaxed text-[var(--text-muted)]">
            {section.text}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {section.points.map((point, i) => (
            <div
              key={i}
              className="breakdown-item flex items-center gap-4 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] group hover:border-[var(--accent)] transition-colors duration-300"
            >
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center text-xs font-bold mono">
                {String(i + 1).padStart(2, "0")}
              </div>
              <span className="text-[15px] text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                {point}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
