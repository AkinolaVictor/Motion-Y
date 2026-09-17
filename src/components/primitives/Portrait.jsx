// Portrait — small circular byline avatar shared across project & article heroes.
// Single source of truth so any future restyle (border, ring, fallback) lands in
// one place. Rendered inside the existing eyebrow strip on detail pages —
// alongside the existing mono metadata, never as a standalone block.
//
// Props let callers override the size or hide the byline text when the page
// already shows an author label elsewhere (e.g. /writing has a WritingBio).

export default function Portrait({
  size = 40,
  src = "/me.jpg",
  name = "Akinola Victor",
  showByline = true,
}) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2">
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className="rounded-full border border-[var(--border-subtle)] object-cover"
        style={{ width: size, height: size }}
      />
      {showByline && (
        <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
          by {name}
        </span>
      )}
    </span>
  );
}
