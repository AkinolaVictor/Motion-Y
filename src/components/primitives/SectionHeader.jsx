// SectionHeader — eyebrow + title + optional lead paragraph.
// Eyebrow uses a mono number/label pair (e.g. "01 / FOCUS") to give the page a chapter rhythm.

import cn from "../../utils/cn";

export default function SectionHeader({
  index,
  label,
  title,
  lead,
  align = "left",
  className = "",
}) {
  const justify = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <header className={cn("flex flex-col gap-3", justify, className)}>
      {(index || label) && (
        <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
          <span className="text-[var(--accent)]">{index}</span>
          {index && label ? <span className="mx-2 text-[var(--text-muted)]/60">/</span> : null}
          {label}
        </p>
      )}
      {title && (
        <h2 className="overpass font-semibold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-[var(--text-primary)]">
          {title}
        </h2>
      )}
      {lead && (
        <p className="max-w-[60ch] text-[15px] leading-[1.7] text-[var(--text-muted)]">
          {lead}
        </p>
      )}
    </header>
  );
}
