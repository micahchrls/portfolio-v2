# Portfolio v3 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a new `portfolio-v3` repository (seeded from `portfolio-v2`), sync its content to the current resume (`MustahamResume2.pdf`), and apply a 2026 visual-trend layer (hero+grid Experience layout, larger display typography, scroll-reactive `BoxReveal` motion) — while leaving `portfolio-v2` live and untouched.

**Architecture:** Single-page React SPA, unchanged from v2's structure. All work happens in a fresh copy of the repo (`~/Desktop/portfolio-v3`) with its own git history and GitHub remote. No shared code or shared deployment with v2.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion — identical to v2, no new dependencies.

## Global Constraints

- All source edits happen in `~/Desktop/portfolio-v3`, never in `~/Desktop/portfolio-v2` (v2 stays live and untouched — see spec Goals/Non-goals).
- No new npm dependencies — every visual change uses Framer Motion and the existing `magicui/box-reveal.tsx` component, both already installed.
- No automated test suite exists in this repo (portfolio, not app logic) — verification is `npm run build` (type-check), `npm run lint`, and manual browser checks, per spec Section 5.
- Content changes (Experience, Projects, skills, positioning) must match `~/Downloads/MustahamResume2.pdf` exactly where the spec calls for parity — this is factual content about a real person, not placeholder copy.
- Do not build a shared `FeaturedCard`/`CompactGrid` abstraction across Projects and Experience — each section stays self-contained (spec Non-goals).

---

### Task 1: Scaffold portfolio-v3 repository locally

**Files:**
- Create: `~/Desktop/portfolio-v3/` (full copy of `~/Desktop/portfolio-v2/`, excluding `.git`, `node_modules`, `dist`)
- Modify: `~/Desktop/portfolio-v3/package.json` (name field)

**Interfaces:**
- Consumes: nothing (first task)
- Produces: a working, independently-buildable copy of the v2 codebase at `~/Desktop/portfolio-v3`, with its own git history, that all later tasks edit in place.

- [ ] **Step 1: Copy the repository, excluding git/build artifacts**

```bash
rsync -a --exclude='.git' --exclude='node_modules' --exclude='dist' \
  ~/Desktop/portfolio-v2/ ~/Desktop/portfolio-v3/
cd ~/Desktop/portfolio-v3
```

- [ ] **Step 2: Verify the copy is complete**

Run: `ls ~/Desktop/portfolio-v3/src/components/main-components/`
Expected: `About.tsx  Certifications.tsx  Contact.tsx  Experience.tsx  Footer.tsx  Projects.tsx  Recommendations.tsx` (7 files, no `.git`/`node_modules`/`dist` present at the repo root)

- [ ] **Step 3: Update package.json name**

In `~/Desktop/portfolio-v3/package.json`, change:

```json
  "name": "portfolio-v2",
```

to:

```json
  "name": "portfolio-v3",
```

- [ ] **Step 4: Initialize fresh git history**

```bash
cd ~/Desktop/portfolio-v3
git init
git add -A
```

- [ ] **Step 5: Install dependencies and verify the build**

```bash
npm install
npm run build
```

Expected: exits 0, `dist/` is created. This confirms the copy is a complete, working repo before any redesign work starts.

- [ ] **Step 6: Commit the initial copy**

```bash
git commit -m "Initial commit: seed portfolio-v3 from portfolio-v2"
```

---

### Task 2: Publish portfolio-v3 to GitHub

**Files:**
- None (no source changes — this task only sets up the remote)

**Interfaces:**
- Consumes: the local git repo created in Task 1 (`~/Desktop/portfolio-v3`, 1 commit on the default branch)
- Produces: a public GitHub repo `micahchrls/portfolio-v3` with the initial commit pushed, and a configured `origin` remote that later tasks push to.

**This task requires interactive authentication that cannot be scripted — do not attempt to automate `gh auth login` or guess credentials.** Two paths, pick whichever the environment supports:

- [ ] **Step 1: Check for GitHub CLI**

```bash
which gh
```

If found and `gh auth status` shows an authenticated account, skip to Step 2a. If not found or not authenticated, use Step 2b.

- [ ] **Step 2a: Create and push via `gh` (if authenticated)**

```bash
cd ~/Desktop/portfolio-v3
gh repo create micahchrls/portfolio-v3 --public --source=. --remote=origin --push
```

Expected: prints the new repo URL (`https://github.com/micahchrls/portfolio-v3`) and pushes the initial commit.

- [ ] **Step 2b: Manual creation (if `gh` is unavailable or unauthenticated)**

Ask the user to create an empty repository named `portfolio-v3` under their GitHub account at https://github.com/new (public, no README/gitignore/license — the local repo already has these), then run:

```bash
cd ~/Desktop/portfolio-v3
git remote add origin https://github.com/micahchrls/portfolio-v3.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Verify the push**

```bash
git log origin/main --oneline -1
```

Expected: shows the "Initial commit: seed portfolio-v3 from portfolio-v2" commit hash, confirming it's live on GitHub.

---

### Task 3: Restructure Experience data and rebuild the Experience component

**Files:**
- Modify: `~/Desktop/portfolio-v3/src/data/experiences.ts` (interface + all entries)
- Modify: `~/Desktop/portfolio-v3/src/components/main-components/Experience.tsx` (full rewrite)

**Interfaces:**
- Consumes: `MagicCard` from `@/components/magicui/magic-card` (existing, unchanged), `BoxReveal` from `@/components/magicui/box-reveal` (existing, unused until now — props: `{ children: JSX.Element; width?: "fit-content" | "100%"; boxColor?: string; duration?: number }`)
- Produces: `experiences: Experience[]` where `Experience = { company: string; role: string; duration: string; bullets: string[]; skills: string[]; links?: { name: string; url: string }[] }` — 3 entries, index 0 is Titan FX (current role). `Experience.tsx`'s default export renders this as a hero card (index 0) + 2-up compact grid (remaining entries) — no other file consumes `experiences` today, so no other files change.

- [ ] **Step 1: Replace `experiences.ts` with the 3-role structure**

Replace the entire contents of `~/Desktop/portfolio-v3/src/data/experiences.ts` with:

```ts
export interface Experience {
  company: string;
  role: string;
  duration: string;
  bullets: string[];
  skills: string[];
  links?: { name: string; url: string }[];
}

export const experiences: Experience[] = [
  {
    company: "Titan FX",
    role: "Software Developer",
    duration: "Jul 2025 - Present",
    bullets: [
      "Sole developer lead migrating the trader ID-verification module from legacy PHP CodeIgniter to Laravel in three months, preserving heavy onboarding business rules through a maintained production launch.",
      "Led development of an in-house feature-flag platform on Laravel and Filament, using write-through Redis so flag changes propagate instantly to all consuming systems, replacing a slow third-party service.",
      "Build and maintain the backend REST APIs behind a live forex/CFD trading platform, shipping new features and resolving production issues across a high-availability, latency-sensitive system.",
      "Drove adoption of an agentic AI workflow with Claude across the engineering team, building reusable skills, agents, and automated tests that shortened delivery cycles and cut rework per sprint.",
    ],
    skills: ["Laravel", "PHP", "Filament", "Redis", "REST API Design", "Legacy Migration", "AI-Augmented Development", "Software Architecture"],
  },
  {
    company: "Zamboanga City Medical Center",
    role: "Backend Developer (Computer Programmer I–II)",
    duration: "Jun 2024 - Jun 2025",
    bullets: [
      "Led PNPKI digital-signature integration for a government hospital, building the Laravel backend APIs and a Python FastAPI microservice for secure, standards-compliant electronic signatures.",
      "Developed Laravel REST APIs for a hospital Purchase Request Monitoring System that digitized a paper-based procurement process and streamlined a multi-step, multi-department approval workflow end to end.",
      "Optimized the DTR and leave-report modules with Eloquent query caching and targeted query rewrites, cutting report load times on a growing HR dataset without a schema rewrite or added infrastructure.",
    ],
    skills: ["Laravel", "FastAPI", "Python", "MySQL", "PNPKI Integration", "Eloquent ORM", "Query Optimization", "REST API"],
  },
  {
    company: "Ateneo de Zamboanga University",
    role: "System Developer",
    duration: "Jan 2023 - Jun 2024",
    bullets: [
      "Designed and deployed a full-stack procurement system in PHP, MySQL, and Ajax/jQuery that replaced a manual, paper-based process and gave staff a single, tracked, end-to-end approval workflow.",
      "Maintained a legacy PHP and MySQL university portal and built its DTR reporting module on raw SQL queries, working directly against existing production schemas without a full rewrite or downtime.",
    ],
    skills: ["PHP", "MySQL", "JavaScript", "Bootstrap", "jQuery", "Full-Stack Development", "Legacy System Maintenance"],
  },
];
```

- [ ] **Step 2: Verify the build fails against the old Experience.tsx**

Run: `npm run build`
Expected: FAILS with a TypeScript error in `Experience.tsx`, e.g. `Property 'description' does not exist on type 'Experience'` — confirms the interface change is live and the consumer needs updating (Step 3).

- [ ] **Step 3: Rewrite Experience.tsx with the hero + compact-grid layout**

Replace the entire contents of `~/Desktop/portfolio-v3/src/components/main-components/Experience.tsx` with:

```tsx
import { experiences } from '@/data/experiences';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Briefcase } from 'lucide-react';
import { MagicCard } from '@/components/magicui/magic-card';
import { BoxReveal } from '@/components/magicui/box-reveal';

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();
  const [heroExperience, ...gridExperiences] = experiences;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.5 } }
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      id="experience"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Experience"
    >
      <motion.div
        variants={item}
        className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
      >
        <motion.h2 variants={item} className="text-sm font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200 lg:sr-only">
          Experience
        </motion.h2>
      </motion.div>

      {/* Hero role */}
      <motion.div variants={item} className="mb-8">
        <MagicCard
          className="rounded-lg border border-zinc-200 dark:border-zinc-800 cursor-default"
          gradientColor="#14532d"
          gradientFrom="#22c55e"
          gradientTo="#10b981"
          gradientSize={300}
          gradientOpacity={0.1}
        >
          <div className="p-6 space-y-4">
            <div className="flex flex-col gap-2">
              <BoxReveal width="100%" boxColor="#22c55e">
                <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 flex-shrink-0" />
                  {heroExperience.role}
                </h3>
              </BoxReveal>
              <p className="text-base font-semibold text-zinc-600 dark:text-zinc-400">
                {heroExperience.company} &middot; {heroExperience.duration}
              </p>
            </div>

            <ul className="space-y-2 list-disc list-outside pl-5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {heroExperience.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {heroExperience.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </MagicCard>
      </motion.div>

      {/* Earlier roles */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {gridExperiences.map((experience) => (
          <div
            key={experience.company + experience.duration}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-4 flex flex-col gap-3"
          >
            <div>
              <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-tight">
                {experience.role}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">
                {experience.company} &middot; {experience.duration}
              </p>
            </div>
            <ul className="space-y-1.5 list-disc list-outside pl-4 text-xs leading-5 text-zinc-500 dark:text-zinc-500 flex-1">
              {experience.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-1" aria-label="Skills">
              {experience.skills.map((skill) => (
                <li
                  key={skill}
                  className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>

      {/* View Resume Link */}
      <motion.div
        variants={item}
        className="mt-8 flex justify-center md:justify-start"
      >
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <span>View Full Résumé</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </motion.div>
    </motion.section>
  );
}
```

- [ ] **Step 4: Verify the build passes**

Run: `npm run build`
Expected: exits 0, no TypeScript errors.

- [ ] **Step 5: Manual visual check**

Run `npm run dev`, open the site, scroll to Experience. Confirm: Titan FX renders as a large card with 4 bullets and a `Briefcase` icon; ZCMC and Ateneo render as a 2-up grid below it with 3 and 2 bullets respectively; the `Timeline` component (vertical line/dots) is gone.

- [ ] **Step 6: Commit**

```bash
git add src/data/experiences.ts src/components/main-components/Experience.tsx
git commit -m "Restructure Experience section: 3 roles matching resume, hero+grid layout"
```

---

### Task 4: Remove Leonora from Projects

**Files:**
- Modify: `~/Desktop/portfolio-v3/src/components/main-components/Projects.tsx:50-58`

**Interfaces:**
- Consumes: nothing new
- Produces: `otherProjects` array with 2 entries (`premiere-telekkom`, `portfolio-v2`) instead of 3 — no other file reads this array.

- [ ] **Step 1: Remove the Leonora entry**

In `~/Desktop/portfolio-v3/src/components/main-components/Projects.tsx`, delete this object from the `otherProjects` array (currently the first entry, lines 51-58):

```tsx
  {
    key: "leonora",
    title: "Leonora: Finance Platform",
    description:
      "Personal finance platform with comprehensive loan management capabilities that streamlined financial operations by 65%.",
    stack: ["PHP", "Bootstrap", "jQuery", "MySQL", "Finance API"],
    href: "https://leonorafinance.com/",
  },
```

`otherProjects` should now start directly with the `"premiere-telekkom"` entry.

- [ ] **Step 2: Verify the build passes**

Run: `npm run build`
Expected: exits 0 (removing an array entry can't break the type — this is a smoke check).

- [ ] **Step 3: Manual visual check**

Run `npm run dev`, scroll to Projects → "Other work" grid. Confirm only 2 cards render: Premiere Telekkom and Portfolio Website. No Leonora card, no layout gap.

- [ ] **Step 4: Commit**

```bash
git add src/components/main-components/Projects.tsx
git commit -m "Remove Leonora Finance from Projects to match current resume"
```

---

### Task 5: Scale up Projects hero card titles with BoxReveal

**Files:**
- Modify: `~/Desktop/portfolio-v3/src/components/main-components/Projects.tsx` (import + hero card title block)

**Interfaces:**
- Consumes: `BoxReveal` from `@/components/magicui/box-reveal` (same component/props used in Task 3)
- Produces: no change to any exported interface — visual-only change to the hero card title markup.

- [ ] **Step 1: Add the BoxReveal import**

In `~/Desktop/portfolio-v3/src/components/main-components/Projects.tsx`, add to the top imports:

```tsx
import { BoxReveal } from "@/components/magicui/box-reveal";
```

- [ ] **Step 2: Wrap and scale the hero card title**

Replace this block (inside the `heroProjects.map` hero card, currently the title `<div>`):

```tsx
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {project.title}
                    </h3>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500 mt-0.5">
                      {project.role}
                    </p>
                  </div>
```

with:

```tsx
                  <div>
                    <BoxReveal width="100%" boxColor="#22c55e">
                      <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-100">
                        {project.title}
                      </h3>
                    </BoxReveal>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500 mt-0.5">
                      {project.role}
                    </p>
                  </div>
```

- [ ] **Step 3: Verify the build passes**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 4: Manual visual check**

Run `npm run dev`, scroll to Projects. Confirm CentroSys and TitanSys hero card titles render larger, in Instrument Serif (visually distinct serif vs. the sans-serif body text), and slide-reveal into view on scroll (a colored box briefly covers the text before sliding away — refresh and scroll slowly to see it).

- [ ] **Step 5: Commit**

```bash
git add src/components/main-components/Projects.tsx
git commit -m "Scale up Projects hero titles with display type and scroll reveal"
```

---

### Task 6: Update Profile positioning copy and name typography

**Files:**
- Modify: `~/Desktop/portfolio-v3/src/components/header-components/Profile.tsx`

**Interfaces:**
- Consumes: `BoxReveal` from `@/components/magicui/box-reveal`
- Produces: no change to `Profile`'s export signature (still a default-export, no-props component) — content and visual-only change.

- [ ] **Step 1: Add the BoxReveal import**

In `~/Desktop/portfolio-v3/src/components/header-components/Profile.tsx`, add to the top imports:

```tsx
import { BoxReveal } from "@/components/magicui/box-reveal";
```

- [ ] **Step 2: Scale up and wrap the name in BoxReveal**

Replace:

```tsx
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Micah Mustaham
          </h1>
```

with:

```tsx
          <BoxReveal width="fit-content" boxColor="#5046e6">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Micah Mustaham
            </h1>
          </BoxReveal>
```

- [ ] **Step 3: Replace the tagline with the resume's positioning line**

Replace:

```tsx
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Laravel · Software Development · Systems Development · AI-Integrated Solutions
          </p>
```

with:

```tsx
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            Backend Engineer | PHP &amp; Laravel | Legacy Migrations &amp; AI-Augmented Delivery
          </p>
```

- [ ] **Step 4: Verify the build passes**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 5: Manual visual check across breakpoints**

Run `npm run dev`. At desktop width, confirm the name renders noticeably larger and reveals with the sliding-box animation on page load (it should trigger immediately since Profile is above the fold). At mobile width (`375px`), confirm the name + avatar row doesn't wrap awkwardly — if `text-4xl` collides with the 144px avatar on narrow viewports, drop the mobile size to `text-2xl` and keep `md:text-4xl` for desktop only (adjust the className from `text-3xl md:text-4xl` to `text-2xl md:text-4xl` if needed).

- [ ] **Step 6: Commit**

```bash
git add src/components/header-components/Profile.tsx
git commit -m "Scale up Profile name typography and update positioning line to match resume"
```

---

### Task 7: Expand and group the Skills list in About

**Files:**
- Modify: `~/Desktop/portfolio-v3/src/components/main-components/About.tsx`

**Interfaces:**
- Consumes: nothing new
- Produces: `aboutContent.skillGroups: { label: string; skills: string[] }[]` replaces `aboutContent.skills: string[]` — `aboutContent` is only consumed within this file, so no other file changes.

- [ ] **Step 1: Replace the `AboutContent` interface**

In `~/Desktop/portfolio-v3/src/components/main-components/About.tsx`, replace:

```tsx
interface AboutContent {
  intro: string;
  currentRole: string;
  skills: string[];
  links: {
    workplace: ExternalLink;
    github: ExternalLink;
    portfolio: ExternalLink;
  };
}
```

with:

```tsx
interface SkillGroup {
  label: string;
  skills: string[];
}

interface AboutContent {
  intro: string;
  currentRole: string;
  skillGroups: SkillGroup[];
  links: {
    workplace: ExternalLink;
    github: ExternalLink;
    portfolio: ExternalLink;
  };
}
```

- [ ] **Step 2: Verify the build fails**

Run: `npm run build`
Expected: FAILS — `aboutContent.skills` no longer exists on the type (the `skills:` array literal below still exists but doesn't match the new interface; the render code at the bottom still reads `aboutContent.skills`). Confirms Step 1 is live.

- [ ] **Step 3: Replace the `skills` array with grouped `skillGroups`**

Replace:

```tsx
  skills: [
    "PHP",
    "Laravel",
    "Python",
    "FastAPI",
    "React",
    "TypeScript",
    "MySQL",
    "PostgreSQL",
    "API Development",
    "AI Agents",
    "LLM Integration",
    "Database Optimization",
    "Eloquent ORM",
    "Git",
  ],
```

with:

```tsx
  skillGroups: [
    {
      label: "Backend",
      skills: ["PHP", "Laravel", "Filament", "Python", "FastAPI", "REST API Design"],
    },
    {
      label: "Databases & Caching",
      skills: ["MySQL", "PostgreSQL", "Redis", "Eloquent ORM"],
    },
    {
      label: "Frontend",
      skills: ["React", "TypeScript", "Inertia.js", "Tailwind CSS", "ShadCN UI"],
    },
    {
      label: "AI & LLM",
      skills: ["Claude API", "Agentic AI Workflows", "LLM Integration", "Automated Testing"],
    },
    {
      label: "DevOps & Tools",
      skills: ["Git", "Docker", "AWS", "CI/CD", "Laravel Cloud"],
    },
  ],
```

- [ ] **Step 4: Replace the render block**

Replace:

```tsx
          <motion.div variants={item} className="flex flex-wrap gap-2">
            {aboutContent.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-md"
              >
                {skill}
              </span>
            ))}
          </motion.div>
```

with:

```tsx
          <motion.div variants={item} className="space-y-4">
            {aboutContent.skillGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
```

- [ ] **Step 5: Verify the build passes**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 6: Manual visual check**

Run `npm run dev`, scroll to About. Confirm 5 labeled skill groups render (Backend, Databases & Caching, Frontend, AI & LLM, DevOps & Tools), each with its own pill row, 24 pills total, no overflow or awkward wrapping at mobile width (`375px`).

- [ ] **Step 7: Commit**

```bash
git add src/components/main-components/About.tsx
git commit -m "Expand and group Skills list to match current resume"
```

---

### Task 8: Full verification pass

**Files:**
- None (verification only — fixes go back into the task that owns the broken file, per task boundaries above)

**Interfaces:**
- Consumes: the fully-redesigned `portfolio-v3` repo from Tasks 1-7
- Produces: a verified-clean build, confirming the repo matches spec Section 5.

- [ ] **Step 1: Full build**

```bash
cd ~/Desktop/portfolio-v3
npm run build
```

Expected: exits 0.

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Expected: exits 0, no errors.

- [ ] **Step 3: Cross-check content against the resume**

Open `~/Downloads/MustahamResume2.pdf` side-by-side with the running site (`npm run dev`). Confirm exact match on: Experience role titles, companies, dates, and bullet content (Titan FX, ZCMC, Ateneo); Projects list (CentroSys, TitanSys, Premiere Telekkom — no Leonora); the positioning line under the name. Fix any mismatch in the file that owns it (`experiences.ts` → Task 3, `Projects.tsx` → Task 4, `Profile.tsx` → Task 6) and re-commit there.

- [ ] **Step 4: Responsive + theme check**

At mobile (375px), tablet (768px), and desktop (1280px) widths, in both light and dark mode, confirm: Experience hero+grid layout doesn't overflow or collapse; About's 5 skill groups wrap cleanly; Profile name + avatar don't collide at any width; `BoxReveal` animations complete without leaving content invisible (a stuck `opacity: 0` state means the `isInView` trigger never fired — check the element isn't nested inside another `overflow: hidden` container that clips it out of the viewport's intersection check).

- [ ] **Step 5: Confirm portfolio-v2 is untouched**

```bash
cd ~/Desktop/portfolio-v2
git status
```

Expected: clean working tree, no changes — confirms none of Tasks 1-7 accidentally touched the original repo.

- [ ] **Step 6: Push final state**

```bash
cd ~/Desktop/portfolio-v3
git push origin main
```

Expected: all 7 feature commits (Tasks 3-7) plus the Task 1 initial commit are now on `origin/main`.
