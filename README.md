# Motion-Y

**Architecting the intelligence layer for the modern enterprise.**

Motion-Y is a high-end AI engineering agency website designed to showcase a production-ready approach to artificial intelligence. Unlike typical AI portfolios, Motion-Y positions itself as a professional partner specializing in the intersection of robust software engineering and cutting-edge LLM orchestration.

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.x-green?logo=greensock)](https://greensock.com/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)](https://redux-toolkit.js.org/)

---

## 🧠 Core Philosophy: Engineering over Prompting

The central thesis of Motion-Y is that AI is only as valuable as the system it lives in. While the industry focuses on prompt engineering, Motion-Y focuses on **AI Engineering**:

- **Software Rigor**: Implementing version control for prompts, automated evaluation pipelines, and robust error handling.
- **Production-Ready**: Moving beyond "chatbots" to autonomous agentic systems that reason and execute.
- **Full-Stack Ownership**: End-to-end delivery from vector database architecture and API middleware to high-fidelity React frontends.

---

## 🚀 Key Offerings

- **Autonomous Agents**: Building systems that don't just talk, but take actions across your business toolset.
- **RAG Systems**: Architecting Retrieval-Augmented Generation pipelines for high-accuracy, domain-specific knowledge.
- **Business Automation**: Transforming manual workflows into intelligent, automated pipelines.
- **AI Consulting**: Strategic guidance on integrating LLMs into existing enterprise architectures.

---

## 🛠️ Tech Stack

### Frontend & Animation
- **Framework**: Next.js (Pages Router) for optimized routing and SEO.
- **Styling**: Tailwind CSS v4 using custom design tokens (CSS variables) for a sophisticated, dark-first aesthetic.
- **Animation**: GSAP (GreenSock) with `ScrollTrigger` for high-fidelity, staggered reveals and smooth cinematic transitions.
- **State Management**: Redux Toolkit for global theme and layout state.

### Backend & Integration
- **API Routes**: Next.js Serverless functions.
- **Communication**: Nodemailer (SMTP via Gmail) for professional, transactional email delivery via the contact form.
- **Data Layer**: Data-driven architecture utilizing centralized JS configuration files (`src/data/`).

---

## 🏗️ Architecture

The project follows a strict separation of concerns to ensure scalability and ease of content updates:

```
src/
├── data/               # Centralized content (Services, Portfolio, Contact info)
├── components/         # Modular UI components
│   ├── layout/         # Global shells (Navbar, PageShell)
│   ├── primitives/    # Atomic UI elements (Button, Container, Pill)
│   └── [page]/         # Page-specific sections (AboutHero, OurStory, etc.)
├── pages/              # Next.js routes composing the components
├── redux/              # Global state management
└── styles/             # Design tokens and global Tailwind CSS
```

**Data-Driven Flow:** `src/data/` $\rightarrow$ `src/components/` $\rightarrow$ `src/pages/`

---

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/motion-y.git
   cd motion-y
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-app-password
   CONTACT_EMAIL=your-recipient@gmail.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` to view the site.

---

## 🎨 Design Guidelines
- **Default Scheme**: Dark-first, minimal, and technical.
- **Palette**: Near-black/charcoal backgrounds, soft-white typography, and a single electric accent color.
- **Motion**: Subtle, purposeful animations that guide the user's attention without distracting from the content.

---

## 📄 License
This project is developed for professional showcase purposes. See `package.json` for licensing details.
