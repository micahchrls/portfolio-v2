"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative h-[400px] w-full">
        <AnimatePresence mode="wait">
          {testimonials.map((testimonial, index) => (
            index === active && (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-full w-full">
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    className="h-full w-full object-cover rounded-2xl"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/0 rounded-2xl" />
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-lg font-medium mb-4"
                    >
                      {testimonial.quote}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="font-semibold text-xl">{testimonial.name}</h3>
                      <p className="text-sm text-gray-300">{testimonial.designation}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
          aria-label="Previous testimonial"
        >
          <IconArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
          aria-label="Next testimonial"
        >
          <IconArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
