"use client";

import { motion } from "framer-motion";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { ExternalLink, Github } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface ProjectTitle {
  children: React.ReactNode;
  href?: string;
  github?: string;
}

const ProjectTitle = ({
  children,
  href,
  github,
}: ProjectTitle) => (
  <div className="inline-flex items-center gap-2 justify-between w-full h-full">
    <span>{children}</span>
    <div className="flex gap-2">
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <Github className="h-4 w-4" />
        </a>
      )}
    </div>
  </div>
);

interface Project {
  key: string;
  title: string;
  titleComponent: JSX.Element;
  description: string;
  link: string;
  duration?: string;
  skills?: string[];
}

const projects: Project[] = [
  {
    key: "centrosys",
    title: "CentroSys: Pharmacy Management",
    titleComponent: (
      <ProjectTitle href="https://centrosys.online/">
        CentroSys: Pharmacy Management
      </ProjectTitle>
    ),
    description:
      "Full-stack pharmacy sales and inventory system that digitized manual processes, reducing inventory discrepancies by 85%. Built with React.js (TypeScript) frontend and Laravel RESTful API backend with optimized MySQL database design.",
    link: "centrosys",
    skills: ["React.js", "TypeScript", "Laravel", "MySQL", "ShadCN", "RESTful API"],
  },
  {
    key: "titansys",
    title: "TitanSys: Inventory Management",
    titleComponent: (
      <ProjectTitle href="https://titansys.laravel.cloud/">
        TitanSys: Inventory Management
      </ProjectTitle>
    ),
    description:
      "Comprehensive inventory system for a car parts business enabling real-time tracking across 1,000+ SKUs. Built with Laravel 12, Inertia.js and React for a seamless SPA experience, reducing inventory management time by 70%.",
    link: "titansys",
    skills: ["Laravel", "Inertia.js", "React", "MySQL", "Laravel Cloud"],
  },
  {
    key: "leonora",
    title: "Leonora: Finance Platform",
    titleComponent: (
      <ProjectTitle href="https://leonorafinance.com/">Leonora: Finance Platform</ProjectTitle>
    ),
    description:
      "Personal finance platform with comprehensive loan management capabilities that streamlined financial operations by 65%. Built with PHP, Bootstrap, jQuery, and MySQL for efficient data handling and optimal user experience.",
    link: "leonora",
    skills: ["PHP", "Bootstrap", "jQuery", "MySQL", "Finance API"],
  },
  {
    key: "premiere-telekkom",
    title: "Premiere Telekkom API Portal",
    titleComponent: (
      <ProjectTitle href="https://pt.zambo.tech/">
        Premiere Telekkom API Portal
      </ProjectTitle>
    ),
    description:
      "API-driven dashboard for telecom load transactions processing 500+ daily requests. Integrated with DITO API for seamless reloading operations, featuring modern UI and real-time monitoring of transaction status.",
    link: "premiere-telekkom",
    skills: ["PHP", "Bootstrap", "MySQL", "Ajax", "jQuery", "REST API"],
  },
  {
    key: "portfolio-v2",
    title: "Portfolio Website",
    titleComponent: (
      <ProjectTitle
        href="https://micahchrls.vercel.app"
        github="https://github.com/micahchrls/portfolio-v2"
      >
        Portfolio Website
      </ProjectTitle>
    ),
    description:
      "Modern personal portfolio built with React.js and Tailwind CSS, enhanced with ShadCN components for a sleek modular UI. Features an AI-powered chatbot using Google Gemini AI for interactive user engagement.",
    link: "portfolio-v2",
    skills: ["React.js", "Tailwind CSS", "Framer Motion", "ShadCN", "Gemini AI"],
  },
];

export default function Projects() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      id="projects"
      className="mb-32 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Projects"
    >
      <motion.div
        variants={item}
        className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
      >
        <motion.h2
          variants={item}
          className="text-sm font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200 lg:sr-only"
        >
          Projects
        </motion.h2>
      </motion.div>
      <div className="px-6" >
        <HoverEffect items={projects} className="gap-4" />
      </div>
    </motion.section>
  );
}
