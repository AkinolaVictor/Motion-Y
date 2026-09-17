// Logo — A minimalist, technical mark for Motion-Y.
// Designed as a scalable SVG that adapts to the brand's accent color.

export default function Logo({ className = "", size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* The "Y" structure - constructed as a technical vector path */}
      <path d="M7 4l5 8l5-8" />
      <path d="M12 12v10" />

      {/* The "Motion" element - a small node at the vertex indicating a point of intelligence */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />

      {/* A subtle accent line to indicate velocity/direction */}
      <path d="M15 16l3 3" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}
