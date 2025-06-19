import { useEffect, useState } from "react";
import { User2, Briefcase, FolderKanban, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function ContentNav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const handleScroll = () => {
      const sections = ["about", "experience", "projects", "recommendations"];
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Check if we're at the very top of the page
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
      id: "experience",
      label: "Experience",
      icon: Briefcase
    },
    {
      id: "projects",
      label: "Projects",
      icon: FolderKanban
    },
    {
      id: "recommendations",
      label: "Recommendations",
      icon: Star
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
        className="mt-16 w-max"
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
              className="relative my-1"
              onMouseEnter={() => setHoveredItem(navItem.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Active indicator line */}
              <motion.div 
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-0.5 bg-zinc-800 dark:bg-white rounded-full"
                initial={{ height: 0 }}
                animate={{ 
                  height: isActive ? 24 : 0,
                  opacity: isActive ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
              />

              <a 
                className="group relative flex items-center py-3 px-1 text-zinc-500 dark:text-zinc-500"
                href={`#${navItem.id}`}
              >
                <motion.div
                  className="absolute inset-0 rounded-md -z-10 bg-zinc-100 dark:bg-zinc-800/40"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ 
                    opacity: isHovered ? 0.5 : 0,
                    scale: isHovered ? 1 : 0.95
                  }}
                  transition={{ duration: 0.2 }}
                />

                <motion.div
                  className="mr-6 text-zinc-400 dark:text-zinc-400"
                  animate={{ 
                    scale: isHovered || isActive ? 1.1 : 1,
                    x: isHovered || isActive ? 2 : 0,
                    color: isActive 
                      ? "rgb(39, 39, 42)" 
                      : isHovered
                        ? "rgb(63, 63, 70)"
                        : "rgb(161, 161, 170)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <navItem.icon className="h-6 w-6" />
                </motion.div>

                <motion.span
                  className="text-sm font-bold uppercase tracking-wider"
                  animate={{ 
                    x: isHovered || isActive ? 4 : 0,
                    color: isActive 
                      ? "rgb(39, 39, 42)" 
                      : isHovered
                        ? "rgb(63, 63, 70)"
                        : "rgb(113, 113, 122)"
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 17 }}
                >
                  {navItem.label}
                </motion.span>
              </a>
            </motion.li>
          );
        })}
      </motion.ul>
    </nav>
  );
}
