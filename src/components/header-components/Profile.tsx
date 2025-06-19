import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { motion } from "framer-motion";

export default function Profile() {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
      <motion.img
        alt="Micah Mustaham"
        width="180"
        height="180"
        decoding="async"
        src="/profile.jpeg"
        data-nimg="1"
        className="rounded-lg w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="flex flex-col items-center sm:items-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h1
          className="text-lg md:text-2xl font-bold text-zinc-800 dark:text-zinc-200"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Micah Mustaham
        </motion.h1>
        <motion.h2
          className="mt-1 text-sm sm:text-lg font-semibold tracking-tight text-zinc-600 dark:text-zinc-400"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          System Developer | Laravel, FastApi, ReactJS
        </motion.h2>
        <motion.p
          className="mt-1 text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-normal italic text-center sm:text-left"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          "Building digital experiences that matter"
        </motion.p>
        <motion.p
          className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mt-2 flex items-center gap-1.5 justify-center sm:justify-start"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <svg
            className="w-3.5 h-3.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>Zamboanga City, Philippines</span>
        </motion.p>
        <motion.div
          className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <a target="_blank" href="https://calendly.com/micahmustaham">
            <InteractiveHoverButton>Let's Talk</InteractiveHoverButton>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
