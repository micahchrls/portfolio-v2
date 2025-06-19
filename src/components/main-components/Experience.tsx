import { experiences } from '@/data/experiences';
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Experience() {
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

  const experienceItems = experiences.map((experience) => ({
    title: `${experience.role} · ${experience.company}`,
    description: experience.description,
    link: `${experience.company.toLowerCase().replace(/\s+/g, '-')}-${experience.role.toLowerCase().replace(/\s+/g, '-')}`,
    duration: experience.duration,
    skills: experience.skills,
  }));

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

      <motion.div 
        variants={item}
        className="lg:group/list px-6"
      >
        <HoverEffect 
          items={experienceItems}
          className="gap-4"
        />
        
        <motion.div 
          variants={item}
          className="mt-12 flex justify-start"
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
      </motion.div>
    </motion.section>
  );
}
