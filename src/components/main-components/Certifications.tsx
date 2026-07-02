import { certifications } from '@/data/certifications';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Award, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

export default function Certifications() {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
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
      viewport={{ once: true, margin: '-100px' }}
      id="certifications"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Certifications"
    >
      <motion.div
        variants={item}
        className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
      >
        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200 lg:sr-only">
          Certifications
        </h2>
      </motion.div>

      <motion.div
        variants={item}
        className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6"
      >
        <div className="flex items-start gap-3 mb-5">
          <Award className="w-5 h-5 mt-0.5 flex-shrink-0 text-zinc-700 dark:text-zinc-300" />
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Anthropic Certified Specialist
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">
              Anthropic &middot; Mar – Apr 2026
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {certifications.map((cert, idx) => (
            <li
              key={cert.name}
              className="relative"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 rounded-md bg-emerald-400/10"
                    layoutId={shouldReduceMotion ? undefined : 'certHoverBackground'}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.2, ease: 'easeOut' },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, ease: 'easeOut' },
                    }}
                  />
                )}
              </AnimatePresence>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify ${cert.name} credential`}
                className="group relative flex items-start justify-between gap-3 rounded-md px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {cert.name}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                    {cert.issuedDate}
                  </p>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 mt-1 text-zinc-400 dark:text-zinc-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.section>
  );
}
