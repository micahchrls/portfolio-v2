import { useTheme } from "@/context/theme-provider";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative ml-1 xl:mt-8 h-10 w-10 rounded-xl bg-white/10 backdrop-blur-sm dark:bg-gray-800/10 border border-gray-200/20 dark:border-gray-700/20 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 transition-all duration-300"
      aria-label="Toggle theme"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      layout
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: 10, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -10, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? (
            <svg
              className="h-4 w-4 text-indigo-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
              <path
                fill="currentColor"
                d="m17.8 19.817l-2.172 1.138a0.392 .392 0 0 1 -.568 -.41l0.415 -2.411l-1.757 -1.707a0.389 .389 0 0 1 .217 -.665l2.428 -0.352l1.086 -2.193a0.392 .392 0 0 1 .702 0l1.086 2.193l2.428 0.352a0.39 .39 0 0 1 .217 .665l-1.757 1.707l0.414 2.41a0.39 .39 0 0 1 -.567 .411l-2.172 -1.138z"
                opacity={0.5}
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6 text-amber-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" />
            </svg>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}