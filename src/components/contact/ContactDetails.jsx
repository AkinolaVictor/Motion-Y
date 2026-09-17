// ContactDetails — left column of the contact band.
// Eyebrow, headline, lead paragraph, email card with copy-to-clipboard, socials.
// Returns just its column contents — ContactLayout owns the section grid.

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { EMAIL, EMAIL_LABEL, PHONE, PHONE_LABEL, RESPONSE_WINDOW, SOCIALS } from "../../data/contact";

export default function ContactDetails() {
  const ref = useRef(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  // Reset the "Copied!" pills after a short window.
  useEffect(() => {
    if (!emailCopied && !phoneCopied) return;
    const t = setTimeout(() => {
      setEmailCopied(false);
      setPhoneCopied(false);
    }, 1800);
    return () => clearTimeout(t);
  }, [emailCopied, phoneCopied]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll("[data-reveal]"), {
        y: 14,
        autoAlpha: 0,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, []);

  // Generic copy function to avoid repetition.
  async function copyToClipboard(text, setCopiedState) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopiedState(true);
    } catch {
      // Silent fail.
    }
  }

  const copyEmail = () => copyToClipboard(EMAIL, setEmailCopied);
  const copyPhone = () => copyToClipboard(PHONE, setPhoneCopied);

  return (
    <div ref={ref} className="w9:col-span-5 flex flex-col gap-7">
      <p
        data-reveal
        className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]"
      >
        Start a conversation
      </p>

      <h2
        id="contact-details-title"
        data-reveal
        className="overpass font-semibold tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,3.5vw,2.75rem)]"
      >
        Bring the interesting problem.
      </h2>

      <p
        data-reveal
        className="max-w-[44ch] text-[15px] leading-[1.7] text-[var(--text-muted)]"
      >
        We are open to thoughtful collaborations, product conversations, and opportunities to
        build useful AI systems.
      </p>

      {/* Email card */}
      {/* <button
        type="button"
        data-reveal
        onClick={copyEmail}
        aria-label={`Copy ${EMAIL_LABEL.toLowerCase()} ${EMAIL} to clipboard`}
        className="group relative flex items-center justify-between gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-4 text-left transition-colors hover:border-[var(--text-muted)] focus-visible:border-[var(--accent)]"
      >
        <span className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-muted)] group-hover:text-[var(--accent)]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </span>
          <span className="flex flex-col">
            <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
              {EMAIL_LABEL}
            </span>
            <span className="overpass text-[16px] font-semibold tracking-tight text-[var(--text-primary)]">
              {EMAIL}
            </span>
          </span>
        </span>

        <span className="flex items-center gap-2 text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">
          <span aria-live="polite" className="mono text-[10px] uppercase tracking-[0.22em]">
            {emailCopied ? "Copied" : "Copy"}
          </span>
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)]"
          >
            {emailCopied ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--accent)]"
              >
                <path d="m5 12 5 5L20 7" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15V5a2 2 0 0 1 2-2h10" />
              </svg>
            )}
          </span>
        </span>
      </button> */}

      {/* Phone card */}
      <button
        type="button"
        data-reveal
        onClick={copyPhone}
        aria-label={`Copy ${PHONE_LABEL.toLowerCase()} ${PHONE} to clipboard`}
        className="group relative flex items-center justify-between gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-4 text-left transition-colors hover:border-[var(--text-muted)] focus-visible:border-[var(--accent)]"
      >
        <span className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-muted)] group-hover:text-[var(--accent)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233a14 14 0 0 0 6.392 6.384"/>
            </svg>
          </span>
          <span className="flex flex-col">
            <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
              {PHONE_LABEL}
            </span>
            <span className="overpass text-[16px] font-semibold tracking-tight text-[var(--text-primary)]">
              {PHONE}
            </span>
          </span>
        </span>

        <span className="flex items-center gap-2 text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">
          <span aria-live="polite" className="mono text-[10px] uppercase tracking-[0.22em]">
            {phoneCopied ? "Copied" : "Copy"}
          </span>
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)]"
          >
            {phoneCopied ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--accent)]"
              >
                <path d="m5 12 5 5L20 7" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15V5a2 2 0 0 1 2-2h10" />
              </svg>
            )}
          </span>
        </span>
      </button>

      {/* Address */}
      <div
        data-reveal
        className="group relative flex items-center justify-between gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-4 text-left transition-colors hover:border-[var(--text-muted)]"
      >
        <span className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-muted)] group-hover:text-[var(--accent)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>
            </svg>
          </span>
          <span className="flex flex-col">
            <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
              Our Office
            </span>
            <span className="overpass text-[16px] font-semibold tracking-tight text-[var(--text-primary)]">
              Akure, Ondo State, Nigeria.
            </span>
          </span>
        </span>
      </div>

      <p
        data-reveal
        className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]/70"
      >
        {RESPONSE_WINDOW}
      </p>

      {/* Socials */}
      <ul data-reveal className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2">
        {SOCIALS.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              aria-label={s.label}
              target="_blank"
              rel="noreferrer noopener"
              className="mono group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            >
              <span className="text-[var(--text-muted)] group-hover:text-[var(--accent)]">
                {s.icon}
              </span>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
