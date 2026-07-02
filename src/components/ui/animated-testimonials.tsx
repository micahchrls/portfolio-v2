import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 20 : -20,
    opacity: 0,
    transition: { duration: 0.15, ease: "easeOut" },
  }),
};

export const AnimatedTestimonials = ({
  testimonials,
}: {
  testimonials: Testimonial[];
}) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([currentPage]) => [
        (currentPage + newDirection + testimonials.length) % testimonials.length,
        newDirection,
      ]);
    },
    [testimonials.length]
  );

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [isPaused, shouldReduceMotion, paginate]);

  const current = testimonials[page];

  return (
    <div
      className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="relative min-h-[240px] sm:min-h-[200px] p-6 sm:p-8">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={`testimonial-${page}`}
            custom={direction}
            variants={shouldReduceMotion ? undefined : slideVariants}
            initial={shouldReduceMotion ? { opacity: 0 } : "enter"}
            animate={shouldReduceMotion ? { opacity: 1 } : "center"}
            exit={shouldReduceMotion ? { opacity: 0 } : "exit"}
            transition={shouldReduceMotion ? { duration: 0.15 } : undefined}
            className="flex flex-col gap-5"
          >
            <Quote
              className="h-5 w-5 text-emerald-500/50"
              aria-hidden="true"
            />
            <blockquote className="text-sm sm:text-base leading-7 text-zinc-600 dark:text-zinc-400">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3 mt-auto">
              <img
                src={current.src}
                alt={current.name}
                loading="lazy"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {current.name}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-tight">
                  {current.designation}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-6 sm:px-8 pb-5">
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Recommendations"
        >
          {testimonials.map((t, index) => (
            <button
              key={t.name}
              role="tab"
              aria-selected={index === page}
              aria-label={`Recommendation from ${t.name}`}
              onClick={() => setPage([index, index > page ? 1 : -1])}
              className={`h-1 rounded-full transition-[width,background-color] duration-300 ${
                index === page
                  ? "w-8 bg-emerald-500/80"
                  : "w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-500"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous recommendation"
            className="h-8 w-8 rounded-md flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200 active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => paginate(1)}
            aria-label="Next recommendation"
            className="h-8 w-8 rounded-md flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200 active:scale-95"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
