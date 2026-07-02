import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ContentNav() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const handleScroll = () => {
      const sections = ["about", "experience", "recommendations", "certifications", "contact"];
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollPosition === 0) {
        setActiveSection("about");
        return;
      }

      // Find the section that takes up the most space in the viewport
      let maxVisibleSection = "";
      let maxVisibleHeight = 0;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
          
          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            maxVisibleSection = section;
          }
        }
      }

      if (maxVisibleSection) {
        setActiveSection(maxVisibleSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "recommendations", label: "Recommendations" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <nav className="nav hidden lg:block" aria-label="In-page jump links">
      <motion.ul
        className="mt-12 flex flex-col gap-0.5"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {navItems.map((navItem) => {
          const isActive = activeSection === navItem.id;

          return (
            <motion.li key={navItem.id} variants={item}>
              <a
                href={`#${navItem.id}`}
                className="group flex items-center py-2.5"
              >
                {/* Growing indicator line */}
                <span
                  className={`mr-4 h-px transition-[width,background-color] duration-300 ${
                    isActive
                      ? "w-12 bg-zinc-900 dark:bg-zinc-100"
                      : "w-6 bg-zinc-300 dark:bg-zinc-700 group-hover:w-12 group-hover:bg-zinc-600 dark:group-hover:bg-zinc-400"
                  }`}
                  aria-hidden="true"
                />

                <span
                  className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${
                    isActive
                      ? "text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300"
                  }`}
                >
                  {navItem.label}
                </span>
              </a>
            </motion.li>
          );
        })}
      </motion.ul>
    </nav>
  );
}
