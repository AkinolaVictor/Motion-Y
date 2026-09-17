// Navbar — sticky top navigation. Sits at the top of every page.
// Contains: brand mark, primary links, theme toggle, "Let's talk" CTA.
// Collapses to a compact mobile menu below the w7 breakpoint (728px).

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../primitives/Button";
import useThemeToggle from "../../hooks/useThemeToggle";
import Image from "next/image";

// True for /projects/[slug] when /projects is the nav target.
function isActive(asPath, href) {
  if (!asPath) return false;
  if (href === "/") return asPath === "/";
  return asPath === href || asPath.startsWith(href + "/");
}

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/projects", label: "Projects" },
  // { href: "/lab", label: "Lab" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
// Monitor icon — represents "system theme" mode (follows OS preference).
function MonitorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
    </svg>
  );
}

export default function Navbar() {
  const router = useRouter();
  const { mode, theme, cycle, hydrated } = useThemeToggle();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Indicator color: white on dark, near-black on light.
  const indicatorColor = theme === "light" ? "#0a0a0a" : "#ededed";

  // Icon reflects the user's chosen mode (the *setting*, not the resolved paint).
  // Until hydrated, default the icon to the moon — that matches the dark default
  // and avoids a flash of the wrong glyph during the first paint.
  const ModeIcon = hydrated
    ? mode === "dark" ? MoonIcon : mode === "light" ? SunIcon : MonitorIcon
    : MoonIcon;

  // aria-label describes what clicking will switch to next, so screen-reader
  // users get the same affordance as sighted users.
  // Cycle is dark → light → system → dark.
  const nextMode = mode === "dark" ? "light" : mode === "light" ? "system" : "dark";
  const nextLabel = nextMode === "system" ? "system theme" : `${nextMode} mode`;
  const themeLabel = hydrated
    ? `Theme: ${mode === "system" ? "system" : mode}. Click to switch to ${nextLabel}.`
    : "Toggle theme";

  // Subtle border fade-in once the user scrolls past the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = theme === "dark" ? "/logo_rounded_light.png" : "/logo_rounded_dark.png";
    }
  }, [theme]);

  // Close the mobile menu when resizing back up.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 728 && open) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full",
        "backdrop-blur-md",
        "border-b transition-colors duration-200",
        scrolled
          ? "border-[var(--border-subtle)] bg-[color-mix(in_srgb,var(--bg-base)_85%,transparent)]"
          : "border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-[60px] w-full max-w-[1200px] items-center justify-between px-6 w7:px-10 w9:px-14">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-3" aria-label="Home">
          <Image
            src={theme === "dark" ? "/logo_light.png" : "/logo_dark.png"}
            alt="Motion-Y Logo"
            width={24}
            height={24}
            className="group-hover:scale-110 transition-transform duration-300"
          />
          <span className="mono text-[18px] uppercase tracking-[0.22em] text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
            Motion<span className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">-Y</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden w7:flex items-center gap-1" aria-label="Primary">
          {LINKS.map((l) => {
            const active = isActive(router.asPath, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "relative rounded-md px-3 py-1.5 text-[14px] transition-colors",
                  active
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
                ].join(" ")}
              >
                {l.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-2 -bottom-[6px] h-[2px] rounded-full"
                    style={{ backgroundColor: indicatorColor }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={cycle}
            aria-label={themeLabel}
            title={themeLabel}
            className="theme-toggle inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ModeIcon />
          </button>
          <span className="hidden w7:inline-flex">
            <Button href="/contact" size="sm" variant="primary">
              Let&apos;s talk
            </Button>
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex w7:hidden h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="w7:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-base)]">
          <nav className="mx-auto flex max-w-[1200px] flex-col gap-1 px-6 py-3" aria-label="Primary mobile">
            {LINKS.map((l) => {
              const active = isActive(router.asPath, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "flex items-center justify-between rounded-md px-3 py-2 text-[15px] transition-colors",
                    active
                      ? "bg-[var(--bg-elevated)] text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]",
                  ].join(" ")}
                >
                  <span>{l.label}</span>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="block h-[2px] w-3 rounded-full"
                      style={{ backgroundColor: indicatorColor }}
                    />
                  )}
                </Link>
              );
            })}
            <div className="pt-2">
              <Button href="/contact" size="sm" variant="primary" className="w-full">
                Let&apos;s talk
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
