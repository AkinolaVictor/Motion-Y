// Pill — small mono-style tag/badge used on project cards, capability tooltips, etc.
// Variants:
//   default — subtle border + muted text. Use for general metadata.
//   accent  — accent border + accent text. Use sparingly for active/featured tags.

import cn from "../../utils/cn";

const base =
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 " +
  "text-[11px] uppercase tracking-[0.12em] mono";

const variants = {
  default: "border-[var(--border-subtle)] text-[var(--text-muted)]",
  accent:  "border-[var(--accent)] text-[var(--accent)]",
};

export default function Pill({ children, variant = "default", className = "", ...rest }) {
  return (
    <span className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </span>
  );
}
