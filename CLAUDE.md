# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Architecture
Motion-Y is a high-end AI agency website built with a **data-driven architecture**.

### Tech Stack
- **Framework**: Next.js (Pages Router)
- **Styling**: Tailwind CSS v4 (Dark-first, minimal, sophisticated)
- **Animation**: GSAP + `ScrollTrigger` (Max 5s duration)
- **State**: Redux Toolkit (Theme and global layout)
- **Email**: Nodemailer (SMTP via Gmail)

### Core Structure
The project follows a strict separation of concerns:
- `src/data/`: Centralized content (Services, Portfolio, Contact). This is the source of truth.
- `src/components/`: Modular UI elements.
    - `layout/`: Global shells (Navbar, PageShell).
    - `primitives/`: Atomic elements (Button, Container, Pill).
    - `[page]/`: Page-specific sections (e.g., `about/OurStory.jsx`).
- `src/pages/`: Next.js routes that compose components.
- `src/redux/`: Global state slices.
- `src/styles/`: Global CSS and design tokens.

**Data Flow**: `src/data/` $\rightarrow$ `src/components/` $\rightarrow$ `src/pages/`

## Development Rules
### Engineering Principles
- **Sectional Build**: Each page must be built section by section, with each section in its own file.
- **Layout**: Use Flexbox for all layouts unless strictly necessary otherwise.
- **State**: Only introduce global state/slices if truly necessary.
- **Documentation**: Every component must have a small commented-out description.
- **Organization**: `components/` for UI, `utils/` for logic. Only add folders when necessary.

### UI & Style Guidelines
- **Aesthetic**: Dark-first, minimal, technical, and futuristic but professional.
- **Palette**: Near-black/charcoal background, soft-white primary text, muted gray secondary text, and one electric accent color (blue/cyan).
- **Constraint**: Avoid excessive gradients, glassmorphism, neon effects, or stock AI imagery.
- **Themes**: Implement dark, light, and system modes globally.
- **Animation**: Only use GSAP. All animations must be "stunning and cool" and under 5s.
