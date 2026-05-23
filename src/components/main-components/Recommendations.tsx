import { testimonials } from "@/data/recommendations";
import { motion, useReducedMotion } from "framer-motion";

export default function Recommendations() {
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
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
      id="recommendations"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Recommendations"
    >
      <motion.div
        variants={item}
        className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
      >
        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200 lg:sr-only">
          Recommendations
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            variants={item}
            className="flex flex-col gap-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-5"
          >
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 flex-1">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <img
                src={t.src}
                alt={t.name}
                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                  {t.name}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-tight">
                  {t.designation}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
