import { testimonials } from "@/data/recommendations";
import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function Recommendations() {
  return (
    <motion.section
      id="recommendations"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24 relative overflow-hidden"
      aria-label="Recommendations"
    >
      <motion.div
        className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
      >
        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200 lg:sr-only">
          Recommendations
        </h2>
      </motion.div>

      <div className="flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-2xl mx-auto relative">
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </div>
    </motion.section>
  );
}