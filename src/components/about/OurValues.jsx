// OurValues — Core agency and professional principles.
// Uses an elegant, non-card layout with strong typography.

import Container from "../primitives/Container";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function OurValues() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(".value-item", {
        autoAlpha: 0,
        x: -20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const VALUES = [
    { title: "Outcome-Driven", desc: "We don't build for novelty. We measure success by the measurable growth and efficiency our systems bring to your business." },
    { title: "Production-First", desc: "Prototyping is easy; production is hard. We prioritize security, scalability, and robustness over quick-and-dirty demos." },
    { title: "Strategic Simplicity", desc: "The most powerful AI systems are often the most focused. We eliminate unnecessary complexity to ensure reliable results." },
    { title: "Empirical Rigor", desc: "We don't guess about AI behavior. We implement strict evaluation gates and data-driven testing for every deployment." },
    { title: "Human-Centric AI", desc: "AI should multiply human capability, not replace it. We design systems that empower your team to do their best work." },
  ];

  return (
    <section ref={ref} className="py-24 border-b border-[var(--border-subtle)]">
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <span className="mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] font-medium">
            Agency Values
          </span>
          <h2 className="overpass text-3xl font-semibold text-[var(--text-primary)]">
            Our Guiding Principles.
          </h2>
        </div>

        <div className="grid grid-cols-1 w7:grid-cols-2 gap-x-16 gap-y-12">
          {VALUES.map((v, i) => (
            <div key={i} className="value-item flex flex-col gap-3 group">
              <h3 className="overpass text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                {v.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-[var(--text-muted)]">
                {v.desc}
              </p>
              <div className="h-px w-0 group-hover:w-full bg-[var(--accent)] transition-all duration-300 opacity-50" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
