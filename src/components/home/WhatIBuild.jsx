// WhatIBuild — section 02 / FOCUS.
// Six interactive cards describing the kinds of systems Akinola builds.
// Includes a subtle hover-tilt micro-interaction via CSS perspective + transform.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Container from "../primitives/Container";
import SectionHeader from "../primitives/SectionHeader";

const ITEMS = [
  {
    title: "AI Agents Development",
    description:
      "Systems that reason, plan, call tools, and complete multi-step work without hand-holding.",
    glyph: "agent",
    slug: "ai_agents",
  },
  {
    title: "Process Automation",
    description:
      "End-to-end automation solutions that streamline operations and reduce manual work by up to 80%",
    glyph: "app",
    slug: "automation",
  },
  {
    title: "Intelligent Softwares",
    description:
      "Smart softwares built to solve complex problems and deliver smarter digital experiences.",
    glyph: "rag",
    slug: "i_softwares",
  },
  {
    title: "API & Integration",
    description:
      "Seamless integration of AI capabilities into your existing systems and workflows",
    glyph: "dev",
    slug: "integrations",
  },
  {
    title: "AI Consulting",
    description:
      "Strategic guidance to identify AI opportunities and build your automation roadmap",
    glyph: "biz",
    slug: "consulting",
  },
  {
    title: "Marketing Systems",
    description:
      "AI-powered content, copy, and campaign systems that turn brand voice into compounding output.",
    glyph: "mkt",
    slug: "marketing",
  },
];

function Glyph({ kind }) {
  // Tiny inline glyphs — visual variety without stock imagery.
  const common = "h-8 w-8";
  switch (kind) {
    case "app":
      return (
        <svg viewBox="0 0 32 32" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="6" y="4" width="20" height="24" rx="3" />
          <path d="M11 9h10" />
          <circle cx="11" cy="22" r="1" />
          <circle cx="16" cy="22" r="1" />
          <circle cx="21" cy="22" r="1" />
        </svg>
      );
    case "rag":
      return (
        <svg viewBox="0 0 32 32" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <ellipse cx="16" cy="9" rx="9" ry="3" />
          <path d="M7 9v6c0 1.66 4.03 3 9 3s9-1.34 9-3V9" />
          <path d="M7 15v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
        </svg>
      );
    case "agent":
      return (
        <svg viewBox="0 0 32 32" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="16" cy="16" r="4" />
          <path d="M16 6v3" />
          <path d="M16 23v3" />
          <path d="M6 16h3" />
          <path d="M23 16h3" />
          <path d="m9 9 2 2" />
          <path d="m21 21 2 2" />
          <path d="m9 23 2-2" />
          <path d="m21 11 2-2" />
        </svg>
      );
    case "dev":
      return (
        <svg viewBox="0 0 32 32" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m12 9-7 7 7 7" />
          <path d="m20 9 7 7-7 7" />
          <path d="m18 7-4 18" />
        </svg>
      );
    case "biz":
      return (
        <svg viewBox="0 0 32 32" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="9" width="24" height="18" rx="2" />
          <path d="M4 14h24" />
          <path d="M10 19h3" />
          <path d="M16 19h6" />
          <path d="M10 23h3" />
          <path d="M16 23h6" />
          <path d="M12 9V5h8v4" />
        </svg>
      );
    case "mkt":
      return (
        <svg viewBox="0 0 32 32" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 11h14" />
          <path d="M5 16h10" />
          <path d="M5 21h7" />
          <path d="M22 9v14" />
          <path d="M22 23l5-7-5-7" />
        </svg>
      );
    default:
      return null;
  }
}

export default function WhatIBuild() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !gridRef.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-build-card]", {
        autoAlpha: 0,
        y: 16,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  const handleMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg) translateY(-2px)`;
    card.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    card.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
  };
  const handleLeave = (e) => {
    e.currentTarget.style.transform = "";
    e.currentTarget.style.removeProperty("--mx");
    e.currentTarget.style.removeProperty("--my");
  };

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative border-b border-[var(--border-subtle)] py-20 w9:py-28"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeader
          index="02"
          label="FOCUS"
          title={<span id="services-title">Our Services.</span>}
          lead="Comprehensive AI solutions tailored to your business needs."
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 w6:grid-cols-2 w9:grid-cols-3 gap-4 w9:gap-5"
        >
          {ITEMS.map((item, i) => (
            <Link
              key={item.title}
              href={`/services/${item.slug}`}
              className="block group"
            >
              <article
                data-build-card
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                className="relative flex flex-col gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 w9:p-7 transition-transform duration-200 will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Cursor-following highlight */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--accent) 10%, transparent), transparent 50%)",
                  }}
                />

                <div className="relative flex items-center justify-between">
                  <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[var(--accent)] transition-transform duration-300 group-hover:-rotate-6">
                    <Glyph kind={item.glyph} />
                  </span>
                </div>

                <h3 className="overpass relative text-[22px] w8:text-[24px] font-semibold tracking-tight text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="relative text-[14.5px] leading-[1.65] text-[var(--text-muted)]">
                  {item.description}
                </p>

                <span
                  aria-hidden="true"
                  className="relative mt-2 h-px w-full bg-gradient-to-r from-[var(--accent)]/0 via-[var(--border-subtle)] to-[var(--accent)]/0 opacity-50"
                />
              </article>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
