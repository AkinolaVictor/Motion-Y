// Container — page-wide max-width + responsive horizontal padding.
// Use as the outer wrapper for every page section.

export default function Container({ children, className = "", as: Tag = "div" }) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[1200px] px-6 w7:px-10 w9:px-14 ${className}`}
    >
      {children}
    </Tag>
  );
}
