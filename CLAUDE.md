# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this dev repository.

## What this repo is
Pages currently present: `index.js` (stub "Home page"), `about.js` (empty), `api/hello.js` (placeholder). No tests, no Cursor/Copilot rules.

## Introduction
I am starting ot as an AI Engineer and this project is my portfolio website to help me demonstrate my drive in creating AI products, developing intelligent agentic systems, and building integrated skill workflows

## Features
Below are the web pages to be in this website
pages
  ├── Home
  ├── /projects
  ├── /projects/[slug]
  ├── /about (include resumee)
  ├── /lab
  ├── /writing (blog)
  └── /contact

## Project layout
```
  src/
  ├── pages/              Next.js Pages Router
  │   ├── _app.js         Redux Provider + global refs
  │   ├── _document.js    HTML shell + Google Fonts
  │   ├── index.js        Home (stub)
  │   ├── about.js        About (stub)
  │   └── api/hello.js    API route (placeholder)
  ├── redux/
  │   ├── store.js        configureStore
  │   └── slices/
  │       └── generalSlice.js
  └── styles/
      └── globals.css     Tailwind v4 + theme tokens
  public/                 Static assets (logos, favicon)
```

<!--  -->


## Development
- make sure to always check the rules in the .claude folder before making any change to this project
- When working on the frontend of a particular page, Ensure to check its corresponding prototype design in the #references section
- Ensure to always ask me any question when necessary
- make sure to follow through the /frontend-design skill installed globally


## references
Ensure to only read the files below when you referred to it by the development section, only open the document you need.
- Home: @docs\HomeUI.md
- Project: @docs\ProjectUI.md
- Contact: @docs\ContactUI.md
- Lab: @docs\LabUI.md
- Project: @docs\ProjectUI.md
- Writting: @docs\WrittingUI.md
- About: @docs\AboutUI.md



