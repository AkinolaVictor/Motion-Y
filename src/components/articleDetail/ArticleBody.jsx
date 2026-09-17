// ArticleBody — renders the typed block array on the article detail page.
// Block types supported (see data/writing.js):
//   { type: "h2", text }
//   { type: "p",  text }
//   { type: "list", ordered, items }
//   { type: "code", lang, code }
//   { type: "quote", text, cite? }
//   { type: "hr" }
//   { type: "callout", tone: "info"|"warn", text }
//
// Visual language: prose gets a generous measure (~68ch), tight leading,
// and ink-on-paper feel; code blocks are terminal-styled mono blocks.

import Container from "../primitives/Container";

function CodeBlock({ lang, code }) {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
      <figcaption className="mono flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-base)]/60 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
        <span>{lang || "code"}</span>
        <span className="text-[var(--text-muted)]/60">utf-8</span>
      </figcaption>
      <pre className="mono overflow-x-auto px-4 py-4 text-[13px] leading-[1.65] text-[var(--text-primary)]/90">
        <code>{code}</code>
      </pre>
    </figure>
  );
}

function Callout({ tone, text }) {
  const styles =
    tone === "warn"
      ? "border-amber-400/40 bg-amber-400/5 text-[var(--text-primary)]"
      : "border-[var(--accent)]/40 bg-[var(--accent)]/5 text-[var(--text-primary)]";
  const tag =
    tone === "warn" ? "WARN" : "NOTE";
  const tagColor =
    tone === "warn" ? "text-amber-400" : "text-[var(--accent)]";
  return (
    <aside
      className={`my-8 rounded-xl border ${styles} px-5 py-4`}
      role="note"
    >
      <p className="mono mb-1 text-[10px] uppercase tracking-[0.22em]">
        <span className={tagColor}>{tag}</span>
        <span className="ml-2 text-[var(--text-muted)]/70">editor</span>
      </p>
      <p className="text-[15.5px] leading-[1.7]">{text}</p>
    </aside>
  );
}

function renderBlock(block, i) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={i}
          className="overpass mt-12 mb-4 text-[26px] w8:text-[30px] font-semibold tracking-[-0.01em] leading-[1.2] text-[var(--text-primary)] first:mt-0"
        >
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p
          key={i}
          className="mb-5 text-[17px] leading-[1.75] text-[var(--text-primary)]/90"
        >
          {block.text}
        </p>
      );
    case "list":
      return block.ordered ? (
        <ol
          key={i}
          className="mb-6 ml-6 list-decimal space-y-2 marker:mono marker:text-[var(--text-muted)]"
        >
          {block.items.map((item, j) => (
            <li key={j} className="text-[17px] leading-[1.7] text-[var(--text-primary)]/90 pl-1">
              {item}
            </li>
          ))}
        </ol>
      ) : (
        <ul
          key={i}
          className="mb-6 ml-6 list-disc space-y-2 marker:text-[var(--text-muted)]"
        >
          {block.items.map((item, j) => (
            <li key={j} className="text-[17px] leading-[1.7] text-[var(--text-primary)]/90 pl-1">
              {item}
            </li>
          ))}
        </ul>
      );
    case "code":
      return <CodeBlock key={i} lang={block.lang} code={block.code} />;
    case "quote":
      return (
        <blockquote
          key={i}
          className="my-8 border-l-2 border-[var(--accent)] pl-5 italic text-[var(--text-muted)]"
        >
          <p className="text-[18px] leading-[1.7]">"{block.text}"</p>
          {block.cite && (
            <cite className="mono mt-2 block text-[11px] not-italic uppercase tracking-[0.22em] text-[var(--text-muted)]/70">
              — {block.cite}
            </cite>
          )}
        </blockquote>
      );
    case "hr":
      return (
        <hr
          key={i}
          className="my-10 border-0 border-t border-[var(--border-subtle)]"
        />
      );
    case "callout":
      return <Callout key={i} tone={block.tone} text={block.text} />;
    default:
      return null;
  }
}

export default function ArticleBody({ blocks }) {
  if (!blocks?.length) return null;
  return (
    <section
      aria-labelledby="article-body"
      className="relative border-b border-[var(--border-subtle)] py-16 w9:py-24"
    >
      <Container>
        <h2 id="article-body" className="sr-only">
          Article body
        </h2>
        <div className="mx-auto max-w-[68ch]">
          {blocks.map(renderBlock)}
        </div>
      </Container>
    </section>
  );
}
