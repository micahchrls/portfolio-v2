"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, memo } from "react";
import { IconQuote, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { LazyMotion, domAnimation } from "framer-motion";

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
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 20 : -20,
    opacity: 0,
    transition: { 
      duration: 0.2,
      ease: 'easeIn'
    }
  })
};

// Memoized navigation button component
const NavigationButton = memo(({ direction, onClick, icon: Icon }: { 
  direction: 'left' | 'right';
  onClick: () => void;
  icon: typeof IconChevronLeft | typeof IconChevronRight;
}) => (
  <motion.button
    onClick={onClick}
    className="group h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center pointer-events-auto transition-all"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors" />
  </motion.button>
));

NavigationButton.displayName = 'NavigationButton';

// Memoized pagination dot component
const PaginationDot = memo(({ isActive, onClick }: { 
  isActive: boolean;
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    className={`group transition-all ${
      isActive ? "w-6 sm:w-8" : "w-2 sm:w-2 hover:w-4"
    }`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <div 
      className={`h-0.5 sm:h-[2px] rounded-full transition-all duration-300 ${
        isActive 
          ? "bg-blue-500/70 dark:bg-blue-400/70" 
          : "bg-gray-300/50 dark:bg-gray-700/50 group-hover:bg-gray-400 dark:group-hover:bg-gray-500"
      }`}
    />
  </motion.button>
));

PaginationDot.displayName = 'PaginationDot';

export const AnimatedTestimonials = memo(({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  const paginate = useCallback((newDirection: number) => {
    const newPage = (page + newDirection + testimonials.length) % testimonials.length;
    setPage([newPage, newDirection]);
  }, [page, testimonials.length]);

  useEffect(() => {
    if (autoplay && !isHovered) {
      const timer = setInterval(() => paginate(1), 5000);
      return () => clearInterval(timer);
    }
  }, [autoplay, isHovered, paginate]);

  return (
    <LazyMotion features={domAnimation}>
      <div 
        className="relative w-full max-w-6xl mx-auto px-3 sm:px-6 py-8 sm:py-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-full min-h-[500px] sm:min-h-[400px] md:min-h-[450px] w-full">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={`testimonial-${page}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <div className="h-full w-full overflow-hidden">
                  <div className="h-full flex flex-col md:grid md:grid-cols-[1fr_3fr] gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">
                    {/* Image Section */}
                    <div className="flex items-center justify-center">
                      <motion.div 
                        className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-xl overflow-hidden group"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative h-full w-full">
                          <img
                            src={testimonials[page].src}
                            alt={testimonials[page].name}
                            sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 192px"
                            className="object-cover object-center transition-all duration-500 ease-out will-change-transform"
                            style={{
                              transform: 'scale(1.1)',
                              filter: 'grayscale(0%)',
                            }}
                          />
                        </div>
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        />
                      </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col justify-between py-2 mt-8">
                      <div>
                        <IconQuote 
                          className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500/30 dark:text-blue-400/30 mb-3 sm:mb-4" 
                          stroke={1}
                        />
                        <motion.div 
                          className="relative"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.p 
                            className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                          >
                            {testimonials[page].quote}
                          </motion.p>
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 sm:mt-6"
                      >
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                          {testimonials[page].name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {testimonials[page].designation}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute -left-2 -right-2 sm:-left-4 md:-left-12 sm:right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <NavigationButton
                direction="left"
                onClick={() => paginate(-1)}
                icon={IconChevronLeft}
              />
              <NavigationButton
                direction="right"
                onClick={() => paginate(1)}
                icon={IconChevronRight}
              />
            </div>

            {/* Pagination Dots */}
            <div className="absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3">
              {testimonials.map((_, index) => (
                <PaginationDot
                  key={`dot-${index}`}
                  isActive={index === page}
                  onClick={() => setPage([index, index > page ? 1 : -1])}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
});

AnimatedTestimonials.displayName = 'AnimatedTestimonials';
