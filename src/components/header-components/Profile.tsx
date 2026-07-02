import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { motion } from "framer-motion";
import { Download, MapPin, ArrowRight } from "lucide-react";

export default function Profile() {
  const handleLetsTalk = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Avatar + name side by side */}
      <div className="flex items-start gap-4">
        <motion.img
          alt="Micah Mustaham"
          width="180"
          height="180"
          decoding="async"
          src="/profile.webp"
          className="rounded-lg w-36 h-36 object-cover flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Name + title block */}
        <motion.div
          className="flex flex-col gap-1.5 min-w-0"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Micah Mustaham
          </h1>
          <h2 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
            Software Developer @{" "}
            <a
              href="https://www.linkedin.com/company/titan-fx/"
              target="_blank"
              rel="noopener noreferrer"
              className="italic text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Titan FX
            </a>
          </h2>
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            Backend engineer — PHP/Laravel. Transactional systems for finance, healthcare, and education.
          </p>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-600/20 dark:ring-emerald-400/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            Open to freelance work
          </span>
        </motion.div>
      </div>

      {/* CTAs */}
      <motion.div
        className="flex flex-wrap items-center gap-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <InteractiveHoverButton onClick={handleLetsTalk} className="w-auto px-6" icon={ArrowRight}>
          Let's Talk
        </InteractiveHoverButton>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Résumé
        </a>
      </motion.div>

      {/* Location + GitHub */}
      <motion.div
        className="flex flex-wrap gap-3 text-xs text-zinc-400 dark:text-zinc-500"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.38 }}
      >
        <span className="inline-flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          Zamboanga City, Philippines · Open to remote
        </span>
      </motion.div>
    </div>
  );
}
