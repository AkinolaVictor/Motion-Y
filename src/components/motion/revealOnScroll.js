// revealOnScroll — tiny reusable gsap + ScrollTrigger helper.
// Targets every element matching `selector` inside `scope` (default: scope itself)
// and plays a fade + translateY reveal once per element when it enters the viewport.

"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
function ensureRegistered() {
  if (registered) return;
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export function revealOnScroll(scope, selector = "[data-reveal]", opts = {}) {
  if (typeof window === "undefined" || !scope) return () => {};
  ensureRegistered();

  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const duration = reduce ? 0 : opts.duration ?? 0.6;
  const y = reduce ? 0 : opts.y ?? 12;
  const stagger = reduce ? 0 : opts.stagger ?? 0.08;
  const start = opts.start ?? "top 85%";

  const ctx = gsap.context(() => {
    const els = scope.querySelectorAll(selector);
    if (!els.length) return;
    gsap.set(els, { autoAlpha: 0, y });
    gsap.to(els, {
      autoAlpha: 1,
      y: 0,
      duration,
      stagger,
      ease: "power2.out",
      scrollTrigger: { trigger: els, start, toggleActions: "play none none none" },
    });
  }, scope);

  return () => ctx.revert();
}
