// ContactHero — section 01 / CONTACT.
// Oversized "Let's build something." headline with a subtle animated connection
// network on the right (canvas-style SVG, no library) so the visual stays
// secondary to the message.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";

export default function ContactHero() {
  const titleRef = useRef(null);
  const leadRef = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll("[data-word]");
        gsap.from(words, {
          y: 32,
          autoAlpha: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.09,
        });
      }
      if (leadRef.current) {
        gsap.from(leadRef.current, {
          y: 12,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.4,
        });
      }
      // Network: pulses + lines draw in.
      if (networkRef.current) {
        gsap.from(networkRef.current.querySelectorAll("[data-node]"), {
          scale: 0,
          transformOrigin: "center center",
          duration: 0.6,
          ease: "back.out(1.6)",
          stagger: 0.06,
          delay: 0.3,
        });
        gsap.from(networkRef.current.querySelectorAll("[data-link]"), {
          strokeDasharray: 200,
          strokeDashoffset: 200,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.05,
          delay: 0.5,
        });
        // Continuous node pulse on the origin node only.
        gsap.to(networkRef.current.querySelectorAll("[data-pulse]"), {
          opacity: 0.2,
          scale: 1.6,
          duration: 1.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const title = "Let's build something.";

  // Hand-laid network: 6 nodes positioned across a 360x220 viewBox.
  // Lines drawn between them on load — origin node (top-left) pulses.
  const NODES = [
    { id: "a", cx: 40,  cy: 40,  r: 5, pulse: true },
    { id: "b", cx: 160, cy: 70,  r: 4 },
    { id: "c", cx: 280, cy: 50,  r: 4 },
    { id: "d", cx: 100, cy: 150, r: 4 },
    { id: "e", cx: 220, cy: 170, r: 5 },
    { id: "f", cx: 330, cy: 140, r: 4 },
  ];
  const LINKS = [
    ["a", "b"], ["a", "d"], ["b", "c"], ["b", "e"], ["c", "f"], ["d", "e"], ["e", "f"],
  ];
  const pos = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <section
      id="contact-hero"
      aria-labelledby="contact-hero-title"
      className="relative overflow-hidden border-b border-[var(--border-subtle)]"
    >
      <Container className="relative pt-16 pb-20 w7:pt-24 w9:pt-28 w9:pb-28">
        <div className="grid grid-cols-1 w9:grid-cols-12 gap-10 w9:gap-12 items-start">
          {/* Left — copy */}
          <div className="w9:col-span-7 flex flex-col gap-7">
            <p className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-[var(--accent)] accent-pulse" />
                <span className="absolute inset-0 rounded-full bg-[var(--accent)]" />
              </span>
              Contact
              <span className="text-[var(--text-muted)]/50">/</span>
              <span className="text-[var(--text-muted)]/80">open channel</span>
            </p>

            <h1
              id="contact-hero-title"
              ref={titleRef}
              className="overpass font-semibold tracking-[-0.025em] leading-[0.98] text-[clamp(3rem,8.5vw,6.25rem)]"
            >
              {title.split(" ").map((w, i) => (
                <span key={i} data-word className="inline-block whitespace-pre">
                  {w}{" "}
                </span>
              ))}
            </h1>

            <p
              ref={leadRef}
              className="max-w-[58ch] text-[17px] w8:text-[18px] leading-[1.65] text-[var(--text-muted)]"
            >
              Have an interesting AI problem, idea, or project? Let&apos;s talk about it and explore
              what we can build together.
            </p>
          </div>

          {/* Right — network visualization (desktop only). */}
          <div className="hidden w9:col-span-5 w9:flex w9:justify-end w9:pt-8">
            <div
              ref={networkRef}
              className="relative w-full max-w-[360px]"
              aria-hidden="true"
            >
              <svg viewBox="0 0 360 220" className="block h-auto w-full">
                {/* Background grid wash */}
                <defs>
                  <pattern id="contact-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path
                      d="M24 0 L0 0 0 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-[var(--border-subtle)]"
                      opacity="0.55"
                    />
                  </pattern>
                </defs>
                <rect width="360" height="220" fill="url(#contact-grid)" />

                {/* Links */}
                {LINKS.map(([from, to], i) => (
                  <line
                    key={i}
                    data-link
                    x1={pos[from].cx}
                    y1={pos[from].cy}
                    x2={pos[to].cx}
                    y2={pos[to].cy}
                    stroke="currentColor"
                    className="text-[var(--accent)]"
                    strokeWidth="1"
                    opacity="0.45"
                    strokeLinecap="round"
                  />
                ))}

                {/* Nodes */}
                {NODES.map((n) => (
                  <g key={n.id}>
                    {n.pulse && (
                      <circle
                        data-pulse
                        cx={n.cx}
                        cy={n.cy}
                        r={n.r}
                        className="text-[var(--accent)]"
                        fill="currentColor"
                        opacity="0.35"
                      />
                    )}
                    <circle
                      data-node
                      cx={n.cx}
                      cy={n.cy}
                      r={n.r}
                      className="text-[var(--accent)]"
                      fill="currentColor"
                    />
                  </g>
                ))}
              </svg>
              <p className="mono absolute right-0 -bottom-6 text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]/70">
                signal · flowing
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
