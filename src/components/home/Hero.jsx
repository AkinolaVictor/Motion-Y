// Hero — section 01 / IDENTITY.
// Eyebrow with pulsing accent dot, large display name, subtitle, two CTAs,
// mono right-rail meta block, and the system visualization on the right.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "../primitives/Button";
import Container from "../primitives/Container";
import HeroSystemViz from "./HeroSystemViz";

const META_LINES = [
  { prompt: "$", text: "Automate repetitive works" },
  { prompt: ">", text: "Streamline business operations" },
  { prompt: ">", text: "Turn ideas into products" },
  { prompt: ">", text: "Build intelligent agents" },
  { prompt: ">", text: "Accelerate growth and productivity" },
  { prompt: ">", text: "AI-powered solutions" },
];

export default function Hero() {
  const titleRef = useRef(null);
  const metaRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll("[data-char]");
        gsap.from(chars, {
          y: 24,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.025,
        });
        gsap.from("[data-hero-cta]", {
          y: 10,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.4,
        });
      }
      if (metaRef.current) {
        gsap.from(metaRef.current.querySelectorAll("[data-meta-line]"), {
          x: -6,
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.07,
          delay: 0.6,
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const title = "Let's Build The";
  const title2 = "Future Together";

  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative overflow-hidden border-b border-[var(--border-subtle)]"
    >
      <Container className="relative pt-16 pb-20 w7:pt-24 w9:pt-28 w9:pb-28">
        <div className="grid grid-cols-1 w9:grid-cols-12 gap-10 w9:gap-12 items-center">
          {/* Left — copy */}
          <div className="w9:col-span-7 flex flex-col gap-7">
            <p className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-[var(--accent)] accent-pulse" />
                <span className="absolute inset-0 rounded-full bg-[var(--accent)]" />
              </span>
              AI Agency
            </p>

            <h1
              id="home-title"
              ref={titleRef}
              className="overpass font-semibold tracking-[-0.02em] leading-[1.02] text-[clamp(2.3rem,5.5vw,4.8rem)]"
            >
              {/* {Array.from(title).map((ch, i) => (
                <span key={i} data-char className="inline-block whitespace-pre">
                  {ch}
                </span>
              ))} */}
              {title}
            </h1>
            <h1
              id="home-title"
              ref={titleRef}
              className="overpass font-semibold tracking-[-0.02em] leading-[1.02] text-[clamp(2.3rem,5.5vw,4.8rem)]"
            >
                {/* {Array.from(title2).map((ch, i) => (
                  <span key={i} data-char className="inline-block whitespace-pre">
                    {ch}
                  </span>
                ))} */}
              {title2}
            </h1>

            <p className="max-w-[58ch] text-[17px] w8:text-[18px] leading-[1.65] text-[var(--text-muted)]">
              {/* I build <span className="text-[var(--text-primary)]">intelligent applications, </span> <span className="text-[var(--text-primary)]">advanced systems</span> and{" "}
              <span className="text-[var(--text-primary)]">AI-powered workflows</span> that turn complex ideas into
              useful products. */}
              We turn ambitious ideas into intelligent solutions that automate work, accelerate growth, and help businesses move faster in an AI-powered world.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span data-hero-cta>
                <Button href="/projects" size="lg" variant="primary">
                  Explore Projects
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </span>
              <span data-hero-cta>
                <Button
                  href="/contact"
                  // external
                  size="lg"
                  variant="ghost"
                >
                  Let's Talk
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </Button>
              </span>
            </div>
          </div>

          {/* Right — viz + meta */}
          <div className="w9:col-span-5 flex flex-col gap-5">
            <HeroSystemViz />

            <div className="hiddexn w9:block rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3">
              <p className="mono mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]/80">
                /workspace/possibilities
              </p>
              <ul className="flex flex-col gap-1">
                {META_LINES.map((l, i) => (
                  <li
                    key={i}
                    data-meta-line
                    className="mono text-[12px] text-[var(--text-muted)]"
                  >
                    <span className="mr-2 text-[var(--accent)]">{l.prompt}</span>
                    {l.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
