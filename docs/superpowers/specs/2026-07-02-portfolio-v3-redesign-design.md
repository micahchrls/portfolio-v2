# Portfolio v3 Redesign — Design Spec

**Date:** 2026-07-02
**Status:** Approved, pending implementation plan

## Context

The May 2026 grilling session (`docs` in prior memory, see `[[project-portfolio-redesign-2026]]`) locked 17 content/positioning decisions for portfolio-v2 — audience, section order, project depth, trust signals — and all of them shipped in commit `e9ec959` ("Portfolio overhaul"). That work is done and not being revisited here.

This spec covers a second, independent layer of work: (1) syncing portfolio content to a newly-updated resume (`MustahamResume2.pdf`), and (2) applying 2026 portfolio design trends (bento-style card hierarchy, larger display typography, scroll-reactive motion) to the Experience section and typography scale. Research into 2026 trends (bento grids, kinetic typography, scroll storytelling, dark-mode-first minimalism) confirmed portfolio-v2 is already aligned on stack and motion approach — the gap was layout hierarchy and type scale, not palette or framework choice.

Mid-brainstorm, scope expanded further: instead of modifying portfolio-v2 in place, this work ships as a new repository, **portfolio-v3**, seeded from a copy of v2. portfolio-v2 stays live and untouched at its current Vercel URL until v3 is ready to cut over.

## Goals

- Bring portfolio content (Experience, Projects, positioning, skills) in line with the current resume.
- Apply a hero-card + compact-grid layout to Experience, matching the pattern Projects already uses.
- Scale up display typography and put the previously-unused `BoxReveal` component to work.
- Do all of the above in a new `portfolio-v3` repo, not by mutating portfolio-v2.

## Non-goals

- Re-litigating the May 2026 content/positioning decisions (section order, project depth, trust signals) — those stand as-is.
- Changing the stack (React/Vite/TypeScript/Tailwind/shadcn/Framer Motion) — v3 reuses v2's stack and components wholesale.
- Restyling Recommendations or Certifications — reviewed and left as-is; only their headings inherit the typography scale change.
- Building a shared `FeaturedCard`/`CompactGrid` abstraction across Projects and Experience — each section stays self-contained, consistent with how the codebase is already structured.

## 1. Repository setup

1. `cp -r ~/Desktop/portfolio-v2 ~/Desktop/portfolio-v3`, excluding `.git`, `node_modules`, `dist`.
2. `git init` fresh in `portfolio-v3` — new history, does not carry v2's commit log.
3. Update `package.json`: `name` → `portfolio-v3`, `version` reset to `0.0.0`.
4. Review self-referential URLs (the "Portfolio Website" project entry in `Projects.tsx` currently links to `micahchrls.vercel.app`) — decide at cutover time whether v3 points at itself or continues pointing at the live v2 URL.
5. Create GitHub repo `micahchrls/portfolio-v3`, public. Push the initial copy as commit 1.
6. Add a `portfolio-v3` row to `~/CLAUDE.md`'s project table once the repo exists.
7. Create a separate Vercel project for `portfolio-v3` with its own deployment URL. Portfolio-v2's `micahchrls.vercel.app` is not touched until cutover.

## 2. Content updates (data layer)

All changes below are made against `portfolio-v3`, sourced from `MustahamResume2.pdf`.

### Positioning

`About.tsx` / `Profile.tsx` positioning copy changes from the locked-spec line ("Senior Laravel engineer bringing AI-agent workflows to production teams") to the resume's line:

> "Backend Engineer | PHP & Laravel | Legacy Migrations & AI-Augmented Delivery"

This also replaces `Profile.tsx`'s current tagline (`"Laravel · Software Development · Systems Development · AI-Integrated Solutions"`).

### Experience (`src/data/experiences.ts`)

Restructure from 7 entries to 3, matching the resume exactly:

1. **Titan FX** — Software Developer, Jul 2025–Present. Bullets: sole dev lead on 3-month CodeIgniter→Laravel trader ID-verification migration; built in-house feature-flag platform (Laravel + Filament + write-through Redis); REST APIs for live forex/CFD trading platform; drove agentic AI (Claude) adoption across the team.
2. **Zamboanga City Medical Center** — Backend Developer (Computer Programmer I–II), Jun 2024–Jun 2025 (merged from the two separate v2 entries). Bullets: PNPKI digital-signature integration (Laravel + FastAPI microservice); Eloquent query caching on DTR/leave-report modules; Purchase Request Monitoring System REST APIs; AI coding tools (Windsurf, Codex) adoption.
3. **Ateneo de Zamboanga University** — System Developer, Jan 2023–Jun 2024. Same substance as v2's existing entry, reformatted from a single paragraph into 2 bullets (procurement system; legacy portal/DTR module) to match the new `bullets: string[]` shape.

Dropped entirely: College Professor (Ateneo, 2023–Jan 2025), Fiverr freelance (Apr 2020–Nov 2021), Symph Dev Intern (Apr–Jun 2021).

The `Experience` interface's `description: string` field becomes `bullets: string[]` to support the bulleted-list rendering in Section 3.

### Projects (`Projects.tsx` inline data)

Remove the `"leonora"` entry from `otherProjects`. `heroProjects` (CentroSys, TitanSys) and the `"premiere-telekkom"` / `"portfolio-v2"` entries in `otherProjects` are unchanged.

### Skills (`About.tsx`)

Expand from 14 flat pills to ~20-24 pills, grouped under 5 category labels matching the resume's structure: **Backend**, **Databases & Caching**, **Frontend**, **AI & LLM**, **DevOps & Tools**. Curated from the resume's ~35 listed skills, dropping generic/implied items (e.g. "responsive design," "raw SQL"). Exact pill list finalized during implementation.

## 3. Experience component redesign

Replace the `Timeline`-based layout in `Experience.tsx` with a hero + compact-grid layout, following the visual pattern `Projects.tsx` already uses for its hero cards / "other work" grid:

- **Titan FX hero card**: full-width `MagicCard`, `text-2xl font-display` heading, role/company/duration, 4-bullet `<ul>` description (converted from the resume's prose), skill pills row. Visually matches the CentroSys/TitanSys hero cards.
- **ZCMC + Ateneo compact grid**: `grid-cols-1 sm:grid-cols-2` below the hero card. Each cell follows the exact `otherProjects` card markup (bordered, `p-4`, flex-col, same pill styling) — role/company/duration header, condensed 2–3 bullet description, skill pills.
- Drop the `Timeline` import from `Experience.tsx`. `ui/timeline.tsx` itself is left in place, unused, in case a future section wants it — no cost to keeping it.
- "View Full Résumé" link stays, positioned below the grid.

## 4. Typography & motion

- **Profile name** (`Profile.tsx` h1): `text-xl` → `text-3xl md:text-4xl`, wrapped in `BoxReveal` (previously defined but unused anywhere in the codebase) for a sliding-mask entrance on load.
- **Positioning line**: sized up slightly, `text-xs` → `text-sm`, to stay legible at the new name scale.
- **Layout check**: the avatar (`w-36 h-36`) sits beside the name in a flex row — if `text-4xl` wraps awkwardly against the avatar, restack to avatar-on-top on mobile only; desktop's `lg:w-[48%]` sidebar has enough width to keep them side-by-side.
- **Hero card titles** (Experience/Projects hero cards): `text-xl font-bold` → `text-2xl font-display` (Instrument Serif), completing the "Instrument Serif for headings" rule from the May 2026 spec, which was only partially applied.
- **Scroll-reactive reveal**: extend `BoxReveal`'s mask effect to hero card titles (Titan FX, CentroSys, TitanSys) as they scroll into view, using `viewport={{ once: true }}` to avoid re-triggering. Section `h2` labels keep their existing fade+slide `whileInView` animation — unchanged.
- No new dependencies. Everything uses Framer Motion (already installed) and the existing `BoxReveal` component.

## 5. Testing & verification

- `npm run build` (tsc + Vite) must pass clean. The `Experience` interface change (`description: string` → `bullets: string[]`) needs updating together with its only consumer, `Experience.tsx`.
- `npm run lint` clean.
- Manual browser pass at mobile/tablet/desktop breakpoints, both light and dark themes, covering: Experience hero+grid layout, skills pill wrapping at the new 24-pill/5-group density, positioning line at the new type scale.
- Verify `BoxReveal` renders correctly on first paint (Profile name) and on-scroll (hero card titles) — genuinely new code path, not a re-verification of existing behavior.
- Cross-check resume-derived content (bullets, dates, stack tags) against `MustahamResume2.pdf` for factual accuracy.
- No automated test suite exists in this repo (portfolio, not app logic) — verification stays manual/visual, consistent with how v2 was built.

## Open items for implementation time

- Exact final skills pill list (20-24 items) — curate from the resume's ~35 during implementation, not pre-specified here.
- Whether the "Portfolio Website" self-referential project entry in `Projects.tsx` points at the v2 or v3 URL — decide at cutover.
