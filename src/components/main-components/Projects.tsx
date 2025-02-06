'use client';

import { motion } from 'framer-motion';
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { ExternalLink, Github } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const ProjectTitle = ({ children, href, github }: { children: React.ReactNode; href?: string; github?: string }) => (
  <div className="inline-flex items-center gap-2 justify-between w-full h-full">
    <span>{children}</span>
    <div className="flex gap-2">
      {href && (
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
          <Github className="h-4 w-4" />
        </a>
      )}
    </div>
  </div>
);

const projects = [
  {
    title: <ProjectTitle href="https://leonorafinance.com/">Leonora</ProjectTitle>,
    description: 'A comprehensive personal finance platform featuring a loan management system. Built with focus on efficient data handling and optimal user experience.',
    link: '#',
    skills: ['PHP', 'Bootstrap', 'jQuery', 'MySQL']
  },
  {
    title: <ProjectTitle href="https://pt.zambo.tech/">Premiere Telekkom API Portal</ProjectTitle>,
    description: 'An API-driven dashboard for managing load transactions and registering reloader companies via the DITO API. Features modern UI and robust API interactions.',
    link: '#',
    skills: ['PHP', 'Bootstrap', 'MySQL', 'Ajax', 'jQuery']
  },
  {
    title: (
      <ProjectTitle 
        href="https://micahmustaham.netlify.app/"
        github="https://github.com/micahchrls"
      >
        Portfolio V1
      </ProjectTitle>
    ),
    description: 'A personal portfolio showcasing development skills, featuring interactive 3D rendering and modern design principles.',
    link: '#',
    skills: ['React.js', 'Three.js', 'Tailwind CSS', 'Shadcn']
  },
  {
    title: (
      <ProjectTitle 
        href="https://klimahub.netlify.app/"
        github="https://github.com/micahchrls/klimahub"
      >
        Klimahub
      </ProjectTitle>
    ),
    description: 'A weather app using React, Tailwind CSS and OpenWeather API. Features a modern design and easy-to-use interface.',
    link: '#',
    skills: ['React.js', 'Tailwind CSS', 'OpenWeather API', 'Shadcn']
  },
  {
    title: (
      <ProjectTitle 
        href="https://shortmoto.netlify.app/"
        github="https://github.com/micahchrls/shortmoto"
      >
        Shortmoto
      </ProjectTitle>
    ),
    description: 'A URL shortener using React, Tailwind CSS, Supabase and Shadcn. Features a modern design and simple user interface.',
    link: '#',
    skills: ['React.js', 'Tailwind CSS', 'Supabase', 'Shadcn']
  }
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
        <motion.h2 variants={item} className="text-sm font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200 lg:sr-only">
          Projects
        </motion.h2>
      </motion.div>

      <motion.div 
        variants={item}
        className="lg:group/list px-6"
      >
        <HoverEffect 
          items={projects}
          className="gap-4"
        />
      </motion.div>
    </motion.section>
  );
}