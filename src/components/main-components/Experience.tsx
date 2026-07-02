import { experiences } from '@/data/experiences';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Briefcase } from 'lucide-react';
import { Timeline } from '@/components/ui/timeline';
import { MagicCard } from '@/components/magicui/magic-card';

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();

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

  const timelineData = experiences.map((experience) => ({
    title: experience.duration,
    content: (
      <MagicCard
        className="rounded-lg border border-zinc-200 dark:border-zinc-800 cursor-default transition-opacity duration-300 lg:group-hover/list:opacity-60 lg:hover:!opacity-100"
        gradientColor="#14532d"
        gradientFrom="#22c55e"
        gradientTo="#10b981"
        gradientSize={250}
        gradientOpacity={0.12}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col gap-2 mb-3">
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
              <Briefcase className="w-5 h-5 flex-shrink-0" />
              {experience.role}
            </h3>
            <p className="text-base font-semibold text-zinc-600 dark:text-zinc-400">
              {experience.company}
            </p>
          </div>

          {/* Description */}
          <ul className="space-y-2 mb-4">
            {experience.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-2.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
              >
                <span
                  className="mt-[7px] h-1 w-1 rounded-full bg-emerald-500/70 flex-shrink-0"
                  aria-hidden="true"
                />
                {bullet}
              </li>
            ))}
          </ul>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-400/10 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </MagicCard>
    ),
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

      <div className="group/list w-full">
        <Timeline data={timelineData} />
        
        {/* View Resume Link */}
        <motion.div 
          variants={item}
          className="mt-12 flex justify-center md:justify-start md:pl-10"
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
      </div>
    </motion.section>
  );
}
