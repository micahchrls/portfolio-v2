import { motion } from "framer-motion";

export default function Profile() {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
      <img
        alt="Micah Mustaham"
        width="160"
        height="160"
        decoding="async"
        src="/profile.jpeg"
        data-nimg="1"
        className="rounded-lg w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
      />
      <div className="flex flex-col items-center sm:items-start">
        <h1 className="text-lg md:text-2xl font-bold text-zinc-800 dark:text-zinc-200">
          Micah Mustaham
        </h1>
        <h2 className="mt-1 text-base sm:text-lg font-medium tracking-tight text-zinc-600 dark:text-zinc-400">
          Software Developer
        </h2>
        <p className="mt-1 text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-normal italic text-center sm:text-left">
          "Building digital experiences that matter"
        </p>
        <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mt-2 flex items-center gap-1.5 justify-center sm:justify-start">
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
        </p>
        <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
          <motion.a
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            target="_blank"
            className="inline-flex h-8 items-center rounded-lg bg-zinc-800 dark:bg-zinc-700 px-3 text-xs font-medium 
                     text-white transition-colors duration-300 hover:bg-zinc-700 dark:hover:bg-zinc-600 gap-2"
            href="https://calendly.com/micahchrls/consultation"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Let's Talk</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </motion.a>
          <motion.a
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="inline-flex h-8 items-center rounded-lg border border-zinc-200 dark:border-zinc-700 
                     bg-white dark:bg-zinc-800 px-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 
                     transition-colors duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-700/70 gap-2"
            href="mailto:micahchrls@gmail.com"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>Send Email</span>
          </motion.a>
        </div>
      </div>
    </div>
  );
}
