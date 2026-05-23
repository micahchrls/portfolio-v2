import { useEffect, useState } from "react";
import { Briefcase, Award, FolderKanban, Star, Mail, User2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ContentNav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const handleScroll = () => {
      const sections = ["about", "projects", "experience", "recommendations", "certifications", "contact"];
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
    {
      id: "about",
      label: "About",
      icon: User2
    },
    {
      id: "projects",
      label: "Projects",
      icon: FolderKanban
    },
    {
      id: "experience",
      label: "Experience",
      icon: Briefcase
    },
    {
      id: "recommendations",
      label: "Recommendations",
      icon: Star
    },
    {
      id: "certifications",
      label: "Certifications",
      icon: Award
    },
    {
      id: "contact",
      label: "Contact",
      icon: Mail
    }
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
          const isHovered = hoveredItem === navItem.id;

          return (
            <motion.li
              key={navItem.id}
              variants={item}
              onMouseEnter={() => setHoveredItem(navItem.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <a
                href={`#${navItem.id}`}
                className="relative flex items-center gap-3 rounded-md px-3 py-2"
              >
                {/* Active/hover background pill */}
                <motion.div
                  className="absolute inset-0 rounded-md bg-zinc-100 dark:bg-zinc-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : isHovered ? 0.5 : 0 }}
                  transition={{ duration: 0.15 }}
                />

                {/* Left accent bar for active */}
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full bg-zinc-800 dark:bg-zinc-100"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: isActive ? 16 : 0, opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />

                <span
                  className={`relative z-10 transition-colors duration-150 ${
                    isActive
                      ? "text-zinc-900 dark:text-zinc-100"
                      : isHovered
                      ? "text-zinc-700 dark:text-zinc-300"
                      : "text-zinc-400 dark:text-zinc-500"
                  }`}
                >
                  <navItem.icon className="h-4 w-4" />
                </span>

                <span
                  className={`relative z-10 text-xs font-semibold uppercase tracking-widest transition-colors duration-150 ${
                    isActive
                      ? "text-zinc-900 dark:text-zinc-100"
                      : isHovered
                      ? "text-zinc-700 dark:text-zinc-300"
                      : "text-zinc-400 dark:text-zinc-500"
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
