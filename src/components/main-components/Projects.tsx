"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";

interface HeroProject {
  key: string;
  title: string;
  role: string;
  description: string;
  outcome: string;
  stack: string[];
  href?: string;
  github?: string;
}

interface OtherProject {
  key: string;
  title: string;
  description: string;
  stack: string[];
  href?: string;
  github?: string;
}

const heroProjects: HeroProject[] = [
  {
    key: "centrosys",
    title: "CentroSys: Pharmacy Management",
    role: "Lead Full-Stack Engineer",
    description:
      "Digitized a paper-based pharmacy sales and inventory process end-to-end. Designed the MySQL schema, built a RESTful Laravel API backend, and developed the React frontend. Key decisions included optimistic UI updates for counter staff speed and a batch-import flow for existing inventory records.",
    outcome: "Reduced inventory discrepancies by 85% within the first month of rollout.",
    stack: ["Laravel", "React", "TypeScript", "MySQL", "ShadCN", "RESTful API"],
    href: "https://centrosys.online/",
  },
  {
    key: "titansys",
    title: "TitanSys: Inventory Management",
    role: "Lead Full-Stack Engineer",
    description:
      "Built a real-time inventory system for a car-parts business tracking 1,000+ SKUs across multiple product categories. Used Laravel 12 with Inertia.js and React for a seamless SPA experience without a separate API layer — reducing context-switching for the dev team and improving data consistency.",
    outcome: "Reduced weekly inventory management time by 70%; shipped on Laravel Cloud for zero-downtime deploys.",
    stack: ["Laravel 12", "Inertia.js", "React", "MySQL", "Laravel Cloud"],
    href: "https://titansys.laravel.cloud/",
  },
];

const otherProjects: OtherProject[] = [
  {
    key: "leonora",
    title: "Leonora: Finance Platform",
    description:
      "Personal finance platform with comprehensive loan management capabilities that streamlined financial operations by 65%.",
    stack: ["PHP", "Bootstrap", "jQuery", "MySQL", "Finance API"],
    href: "https://leonorafinance.com/",
  },
  {
    key: "premiere-telekkom",
    title: "Premiere Telekkom API Portal",
    description:
      "API-driven dashboard for telecom load transactions processing 500+ daily requests, integrated with DITO API.",
    stack: ["PHP", "Bootstrap", "MySQL", "Ajax", "jQuery"],
    href: "https://pt.zambo.tech/",
  },
  {
    key: "portfolio-v2",
    title: "Portfolio Website",
    description:
      "This site — built with React, Tailwind CSS, and Framer Motion. High Lighthouse scores through optimized assets and clean component architecture.",
    stack: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    href: "https://micahchrls.vercel.app",
    github: "https://github.com/micahchrls/portfolio-v2",
  },
];

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.5 } },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      id="projects"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Projects"
    >
      <motion.div
        variants={item}
        className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
      >
        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200 lg:sr-only">
          Projects
        </h2>
      </motion.div>

      {/* Hero case studies */}
      <motion.div variants={container} className="space-y-8 mb-12">
        {heroProjects.map((project) => (
          <motion.div key={project.key} variants={item}>
            <MagicCard
              className="rounded-lg border border-zinc-200 dark:border-zinc-800"
              gradientColor="#14532d"
              gradientFrom="#22c55e"
              gradientTo="#10b981"
              gradientSize={300}
              gradientOpacity={0.1}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {project.title}
                    </h3>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500 mt-0.5">
                      {project.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                        aria-label={`${project.title} GitHub`}
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                        aria-label={`${project.title} live site`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>

                <div className="rounded-md bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40 px-4 py-3">
                  <p className="text-sm text-emerald-800 dark:text-emerald-300 font-medium">
                    {project.outcome}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-md"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </MagicCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Other work grid */}
      <motion.div variants={item}>
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
          Other work
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project) => (
            <div
              key={project.key}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-4 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-tight">
                  {project.title}
                </h4>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                      aria-label={`${project.title} GitHub`}
                    >
                      <Github className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                      aria-label={`${project.title} live site`}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-500 flex-1">
                {project.description}
              </p>
              <ul className="flex flex-wrap gap-1" aria-label="Stack">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
