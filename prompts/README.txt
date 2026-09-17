================================================================
PROMPTS INDEX  (AI Portfolio — page-by-page build prompts)
================================================================

This folder is at the repository root:  /prompts/
The build order is:

  00_Foundation.txt         (build FIRST)
  01_Home.txt
  02_Projects.txt
  03_ProjectDetail.txt
  04_Lab.txt
  05_Writing.txt
  06_ArticleDetail.txt
  07_About.txt
  08_Contact.txt            (build LAST)

Each file ends with an "ASSUMPTIONS" section. Read both the
prompt AND the data it references before you begin. The
prompts assume the foundation prompt (00) has already been
completed.

Companion files:
  - /CLAUDE.md                      (project rules, must read)
  - /.claude/rules/dev_rules.md
  - /.claude/rules/ui_rules.md
  - /docs/<Page>UI.md               (per-page spec)
  - /docs/prototypes/<Page>UI.png   (per-page visual ref)
  - /src/data/*.js                  (data sources — read only
                                     unless the prompt tells
                                     you to add helpers)
  - /src/components/primitives/*   (Button, Container, Pill,
                                     SectionHeader, Portrait)
  - /src/components/layout/*        (Navbar, Footer, PageShell)

Build verification:
  - After 00: `npm run dev` shows the navbar + footer with
    the pulsing accent dot and the theme toggle working.
  - After each subsequent page: visit the route, check
    responsive at < w7 / w7 — w8 / ≥ w9, check both
    dark and light modes, check prefers-reduced-motion.
  - Final: run `npm run build`; all `getStaticPaths` and
    `getStaticProps` should compile.

Per-page canonical links (used everywhere socials appear):
  GitHub:    https://github.com/AkinolaVictor
  LinkedIn:  https://www.linkedin.com/in/victoral/
  X:         https://x.com/MoreThanAVictor
  Email:     mailto:akinolavictor50@gmail.com
================================================================
