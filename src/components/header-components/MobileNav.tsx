import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Briefcase, Star, Mail, User2 } from "lucide-react";

const navItems = [
  { id: "about", label: "About", icon: User2 },
  { id: "experience", label: "Work", icon: Briefcase },
  { id: "recommendations", label: "Reviews", icon: Star },
  { id: "certifications", label: "Certs", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function MobileNav() {
  const [activeSection, setActiveSection] = useState<string>("about");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((n) => n.id);
      const windowHeight = window.innerHeight;

      if (window.scrollY === 0) {
        setActiveSection("about");
        return;
      }

      let maxVisible = "";
      let maxHeight = 0;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const visible = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
          if (visible > maxHeight) {
            maxHeight = visible;
            maxVisible = id;
          }
        }
      }

      if (maxVisible) setActiveSection(maxVisible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md"
      aria-label="Section navigation"
    >
      <ul className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-md transition-colors"
                aria-label={label}
              >
                <motion.span
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ duration: 0.15 }}
                  className={isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-500"}
                >
                  <Icon className="h-5 w-5" />
                </motion.span>
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-500"
                  }`}
                >
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
