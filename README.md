# Z-Flux

**Advanced web animations, made simple.**

Z-Flux is an open-source animation library built around **4 extensible animation engines** that power **190+ animation presets**. Use a preset as-is, customize it with `extendAnimation`, or build entirely new animations from scratch — the engines handle the complex scroll/timeline logic so you can focus on the experience.

🌐 **Live site:** [https://z-flux.vercel.app](https://z-flux.vercel.app)

---

## Highlights

- ⚛️ **Production-ready for React & Next.js** (React 19, Next.js 16, Pages Router)
- 🛠️ **4 animation engines** — Text, Overlay, VerticalScroll, DualScroll
- 🎨 **190+ presets** — every preset is just a configuration of one engine
- � **shadcn-installable** — `npx shadcn add https://z-flux.vercel.app/r/<Component>.json`
- 🔧 **Fully customizable** — `extendAnimation` augments presets or builds new ones from scratch
- 📚 **Interactive docs & live previews** at `/components`

---

## Architecture

Z-Flux is split across two npm packages so the core animation logic stays framework-agnostic:

```
┌─────────────────────────────────────────┐
│  z-flux-utils                           │  framework-agnostic core
│  - build_extend_animation               │  - findScrollingElement
│  - getProgressionData, getScrollHeight  │  - value_negator, randomizeArray
│  - preset maps (z_text_animations,      │
│    overlay_text_animations,             │
│    vertical_scroll_animations,          │
│    dual_scroll_animations)              │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  z-flux-react                           │  React/Next.js implementation
│  - Z_Text        (text engine)          │
│  - Overlay_Text  (overlay reveal)       │
│  - VerticalScroll (pinned h-track)      │
│  - DualScroll    (two-section sync)     │
└────────────────�────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  This repo (Z-Flux docs site)           │  Next.js Pages Router
│  - Live previews for every preset       │
│  - shadcn registry (public/r/*.json)    │
│  - Getting started / install guides     │
└─────────────────────────────────────────┘
```

The **engines** abstract the complex parts of scroll-driven GSAP animation. The **presets** are just data — a `{from, to}` object that the engine applies to the GSAP timeline. Adding a new preset means adding one entry to the corresponding preset file; no engine changes needed.

---

## The 4 engines

### 1. Z_Text — split-text animation engine
Splits text into chars / words / lines using `gsap/SplitText` and animates them along a GSAP timeline. 5 progression modes (`char`, `word`, `line`, `char_line`, `word_line`), 3 orders (`firstToLast`, `lastToFirst`, `random`), scroll/inview/none triggers, controller ref for imperative control.

- Source: `src/registry/z-flux/texts/Z_Text.js`
- Presets: `src/utils/animlations/animation_list.js`
- Usage: `public/codes/z_text/z_text_usage.txt`
- Props: `src/utils/engineProps/Z_TextEngineProps.js`

### 2. Overlay_Text — overlay-panel reveal engine
Stacks N colored layers over the text (or any component) and reveals them with a transform animation. Reveals text by sliding colored panels off, or reveals an entire component. Supports interactive reveal (toggle via `trigger`).

- Source: `src/registry/z-flux/texts/Overlay_Text.js`
- Presets: `src/utils/animlations/overlay_text_animations.js`
- Usage: `public/codes/overlay_text/overlay_text_usage.txt`
- Props: `src/utils/engineProps/Overlay_Text_Engine_Props.js`

### 3. VerticalScroll — pinned horizontal track
Pins a row of children in place and translates them horizontally as the page scrolls. Each child can have its own per-element entrance animation driven by the parent's `containerAnimation`. Reverses direction with `direction="reverse"` or `"backward"`.

- Source: `src/registry/z-flux/scrollers/VerticalScroll.js`
- Presets: `src/utils/animlations/vertical_scroll_animation.js`
- Usage: `public/codes/vertical_scroll/vertical_scroll_usage.txt`
- Props: `src/utils/engineProps/VerticalScrollProps.js`

### 4. DualScroll — two-section synchronized scroll
Renders two parallel sections (left/right or top/bottom) over the same `data` array. As the user scrolls, each section moves in opposite (or same, depending on style) directions — useful for parallax, before/after, and synchronized storytelling. Supports 8 layout modes (`row`, `row_2`, `col`, `col_2`, `stack`, `stack_2`, `stack_3`, `layer`).

- Source: `src/registry/z-flux/scrollers/DualScroll.js`
- Presets: `src/utils/animlations/dual_scroll_animations.js`
- Usage: `public/codes/dual_scroll/dual_scroll_usage.txt`
- Props: `src/utils/engineProps/DualScrollProps.js`

---

## Getting started

### Run the docs site locally

```bash
npm run installx     # install with --legacy-peer-deps
npm run dev          # http://localhost:3000
npm run dev2         # forces webpack instead of turbopack
npm run dev3         # port 3035
```

### Install Z-Flux in your own project

Three options — pick whichever fits:

**Option A — npm package:**
```bash
npm i z-flux-react
```
```jsx
import { Z_Text } from "z-flux-react";

<Z_Text animation="Fade" text="Hello, animated world" />
```

**Option B — shadcn registry:**
```bash
npx shadcn@latest init
npx shadcn add https://z-flux.vercel.app/r/Z_Text.json
```

**Option C — copy raw code** from the component page on the docs site.

### Customize any preset

Every engine accepts `extendAnimation` to either **augment a preset** or **build a new one from scratch**:

```jsx
// Augment an existing animation
<Z_Text
  animation="Fade"
  extendAnimation={{
    color: ["blue", "yellow"],
    x: [100, 0],
    skewX: [70, 0],
  }}
  text="Custom colors and skew"
/>

// Build from scratch (animation="none" or omitted)
<Z_Text
  animation="none"
  extendAnimation={{
    opacity: [0, 1],
    y: [50, 0],
    duration: [null, 0.8],
    stagger: [null, 0.05],
  }}
  text="Brand new animation"
/>
```

The template is `[fromValue, toValue]`. `null` on either side skips that side of the transition.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run installx` | Install with `--legacy-peer-deps` |
| `npm run dev` | Dev server on `:3000` |
| `npm run dev2` | Dev server forcing webpack |
| `npm run dev3` | Dev server on `:3035` |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run lint` | ESLint (flat config, `eslint-config-next` core-web-vitals) |
| `npm run shadcn` | Rebuild per-component JSON in `public/r/` |
| `npm run push` | `shadcn` + git add/commit/push in one go |

---

## Project structure

```
src/
├── pages/                          Next.js pages router
│   ├── index.js                    Landing page
│   ├── getting_started.js          Install / usage walkthrough
│   ├── components/                 Three-pane docs (menu | preview | props)
│   └── api/                        API routes
├── registry/
│   ├── z-flux/                     The 4 engines (Z_Text, Overlay_Text, VerticalScroll, DualScroll)
│   ├── locals/                     Docs-site-only UI (menu, props panel, header, footer)
│   └── default/                    shadcn defaults (empty)
├── utils/
│   ├── animlations/                Preset maps (one file per engine)
│   ├── comp_dir/                   Builds the sidebar directory tree from presets
│   ├── component_previews/         Preview wrappers per engine
│   ├── engineProps/                Prop metadata per engine (drives the right pane)
│   └── codes/                      Code samples
├── redux/                          Redux Toolkit store (generalSlice)
├── hooks/                          use-controlled-state, use-mobile
├── lib/                            get-strict-context, utils (cn helper)
└── styles/                         globals.css (Tailwind v4)
```

---

## Tech stack

- **Framework:** Next.js 16 (Pages Router), React 19
- **Animation:** GSAP 3.15 + `@gsap/react` + `SplitText` + `ScrollTrigger`
- **Smooth scroll:** Lenis
- **Styling:** Tailwind v4 + `@tailwindcss/postcss`, Radix UI, Lucide icons
- **State:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Distribution:** shadcn registry (`registry.json` + `public/r/*.json`)
- **Misc:** Motion, Three.js, react-range, react-select, react-syntax-highlighter, tailwind-merge

---

## Adding a new preset

1. Open the preset file for your engine (e.g. `src/utils/animlations/animation_list.js`).
2. Add a new entry — it's a `{from, to}` GSAP props object keyed by name.
3. The sidebar menu, props panel, and `/components/<engine>_<preset>` route will pick it up automatically — no other changes needed.
4. Run `npm run shadcn` if the preset should be installable via shadcn registry.

---

## Distribution & versioning

This repo is the **showcase site**. The actual library is published as two npm packages:

- [`z-flux-utils`](https://www.npmjs.com/package/z-flux-utils) — engine abstractions + presets
- [`z-flux-react`](https://www.npmjs.com/package/z-flux-react) — React/Next.js engines

When you change an engine file in this repo (`src/registry/z-flux/`), run `npm run shadcn` to refresh the per-component registry JSON in `public/r/`, then `npm run push` to commit + push. The engines themselves are released by updating the npm packages.

---

## Roadmap

- Vue support (engine is framework-agnostic via `z-flux-utils`; needs a thin `z-flux-vue` wrapper)
- More engines — cursors, sliders, transitions, page transitions
- More presets across all 4 existing engines

---

## License

Open source — see `package.json` for details.
