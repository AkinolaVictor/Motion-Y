// FinalCTA — section 08 / CONTACT.
// Centered two-line heading + Start a Conversation.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";
import Button from "../primitives/Button";

export default function FinalCTA({env}) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-cta-line]", {
        autoAlpha: 0,
        y: 16,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="contact"
      aria-labelledby="cta-title"
      className="relative py-24 w9:py-32"
    >
      {/* Soft radial backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 70%)",
        }}
      />

      <Container className="relative flex flex-col items-center gap-8 text-center">
        {
          env?
          null:
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">05</span>
            <span className="mx-2 text-[var(--text-muted)]/60">/</span>
            CONTACT
          </p>
        }

        <h2
          id="cta-title"
          data-cta-line
          className="overpass max-w-[20ch] font-semibold tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,5vw,3.5rem)] text-[var(--text-primary)]"
        >
          Have an interesting AI problem?
        </h2>
        <p
          data-cta-line
          className="overpass max-w-[22ch] font-semibold tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,5vw,3.5rem)] text-[var(--accent)]"
        >
          Let&apos;s build something.
        </p>

        <p data-cta-line className="max-w-[52ch] text-[15px] leading-[1.7] text-[var(--text-muted)]">
          If you&apos;re working on something that
          needs real AI engineering — not just a demo — let&apos;s talk.
        </p>

        <div data-cta-line className="pt-2">
          <Button href="/contact" size="lg" variant="primary">
            Start a Conversation
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Button>
        </div>
      </Container>
    </section>
  );
}
