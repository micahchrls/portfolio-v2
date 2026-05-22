# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # TypeScript check + Vite production build
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

## Stack

- **React 18** + **TypeScript** via **Vite**
- **Tailwind CSS** with CSS custom properties for theming (light/dark)
- **shadcn/ui** (Radix UI primitives) for accessible UI components
- **Framer Motion** for animations
- **React Router DOM** (BrowserRouter, single-page scroll navigation)
- **Vercel Analytics** for deployment tracking
- Path alias: `@/` → `src/`

## Architecture

Single-page portfolio with a two-column desktop layout (fixed left header sidebar + scrollable right content). Sections are rendered sequentially in `Main.tsx`, not via route-based navigation.

```
src/
├── components/
│   ├── Page.tsx              # Root layout: header sidebar + main content
│   ├── Main.tsx              # Ordered list of content sections
│   ├── main-components/      # About, Experience, Projects, Recommendations, Footer, Blog, Contact
│   ├── header-components/    # Profile, ContentNav, SocMedNav
│   ├── ui/                   # shadcn/ui component library (don't modify directly)
│   └── magicui/              # Custom animated components (MagicCard, BoxReveal, etc.)
├── context/
│   └── theme-provider.tsx    # Dark/Light/System theme via React Context + localStorage
├── data/                     # Static typed data: experiences.ts, recommendations.ts, blog-posts.ts
├── hooks/
│   └── useGithubMetrics.ts   # GitHub API with 1-hour client-side cache + rate-limit handling
└── utils/env.ts              # VITE_ environment variable accessor
```

## Key Patterns

**Theming:** CSS custom properties defined in `index.css` under `:root` and `.dark`. Tailwind uses `darkMode: 'class'`. The `ThemeProvider` in `context/theme-provider.tsx` toggles the `dark` class on `<html>`.

**Content data:** Portfolio content (experience, recommendations, blog posts) lives in `src/data/` as typed arrays — edit there to update page content.

**GitHub metrics hook:** `useGithubMetrics` batches API requests (size 5), caches results for 1 hour in memory, and handles pagination + rate limiting with exponential backoff.

**Environment variables:** Requires `VITE_GITHUB_USERNAME`. Optional `VITE_GEMINI_API_KEY` for the (currently disabled) chatbot. See `.env.example`.

**shadcn/ui:** Components are copied into `src/components/ui/` and can be customized. Add new components with `npx shadcn@latest add <component>`.
