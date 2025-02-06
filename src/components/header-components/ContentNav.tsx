import { useEffect, useState } from "react";

export default function ContentNav() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const handleScroll = () => {
      const sections = ["about", "experience", "projects"];
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

  return (
    <nav className="nav hidden lg:block" aria-label="In-page jump links">
      <ul className="mt-16 w-max">
        <li>
          <a 
            className={`group flex items-center py-3 transition-all duration-300 ease-in-out ${
              activeSection === "about" ? "active scale-105" : ""
            }`} 
            href="#about"
          >
            <span className={`nav-indicator mr-4 transition-all duration-300 ease-in-out group-hover:w-16 group-hover:bg-zinc-800 dark:group-hover:bg-white group-focus-visible:w-16 group-focus-visible:bg-zinc-800 dark:group-focus-visible:bg-white motion-reduce:transition-none ${
              activeSection === "about" 
                ? "w-16 h-px bg-zinc-800 dark:bg-white shadow-glow" 
                : "w-8 h-px bg-zinc-400 dark:bg-gray-600"
            }`}></span>
            <span className={`nav-text text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-in-out group-hover:text-zinc-800 dark:group-hover:text-white group-focus-visible:text-zinc-800 dark:group-focus-visible:text-white group-hover:translate-x-2 ${
              activeSection === "about" ? "text-zinc-800 dark:text-white translate-x-2" : "text-zinc-500 dark:text-gray-500"
            }`}>
              About
            </span>
          </a>
        </li>
        <li>
          <a 
            className={`group flex items-center py-3 transition-all duration-300 ease-in-out ${
              activeSection === "experience" ? "active scale-105" : ""
            }`} 
            href="#experience"
          >
            <span className={`nav-indicator mr-4 transition-all duration-300 ease-in-out group-hover:w-16 group-hover:bg-zinc-800 dark:group-hover:bg-white group-focus-visible:w-16 group-focus-visible:bg-zinc-800 dark:group-focus-visible:bg-white motion-reduce:transition-none ${
              activeSection === "experience" 
                ? "w-16 h-px bg-zinc-800 dark:bg-white shadow-glow" 
                : "w-8 h-px bg-zinc-400 dark:bg-gray-600"
            }`}></span>
            <span className={`nav-text text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-in-out group-hover:text-zinc-800 dark:group-hover:text-white group-focus-visible:text-zinc-800 dark:group-focus-visible:text-white group-hover:translate-x-2 ${
              activeSection === "experience" ? "text-zinc-800 dark:text-white translate-x-2" : "text-zinc-500 dark:text-gray-500"
            }`}>
              Experience
            </span>
          </a>
        </li>
        <li>
          <a 
            className={`group flex items-center py-3 transition-all duration-300 ease-in-out ${
              activeSection === "projects" ? "active scale-105" : ""
            }`} 
            href="#projects"
          >
            <span className={`nav-indicator mr-4 transition-all duration-300 ease-in-out group-hover:w-16 group-hover:bg-zinc-800 dark:group-hover:bg-white group-focus-visible:w-16 group-focus-visible:bg-zinc-800 dark:group-focus-visible:bg-white motion-reduce:transition-none ${
              activeSection === "projects" 
                ? "w-16 h-px bg-zinc-800 dark:bg-white shadow-glow" 
                : "w-8 h-px bg-zinc-400 dark:bg-gray-600"
            }`}></span>
            <span className={`nav-text text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-in-out group-hover:text-zinc-800 dark:group-hover:text-white group-focus-visible:text-zinc-800 dark:group-focus-visible:text-white group-hover:translate-x-2 ${
              activeSection === "projects" ? "text-zinc-800 dark:text-white translate-x-2" : "text-zinc-500 dark:text-gray-500"
            }`}>
              Projects
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
