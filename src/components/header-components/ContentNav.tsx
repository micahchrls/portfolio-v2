import { useEffect, useState } from "react";
import { User2, Briefcase, FolderKanban, Star } from "lucide-react";

export default function ContentNav() {
  const [activeSection, setActiveSection] = useState<string>("");

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

  return (
    <nav className="nav hidden lg:block" aria-label="In-page jump links">
      <ul className="mt-16 w-max">
        {navItems.map((item) => (
          <li key={item.id}>
            <a 
              className={`group flex items-center py-3 transition-all duration-300 ease-in-out ${
                activeSection === item.id ? "active scale-105" : ""
              }`} 
              href={`#${item.id}`}
            >
              <span className={`mr-4 transition-all duration-300 ease-in-out ${
                activeSection === item.id 
                  ? "text-zinc-800 dark:text-white" 
                  : "text-zinc-400 dark:text-gray-600 group-hover:text-zinc-800 dark:group-hover:text-white"
              }`}>
                <item.icon className="h-4 w-4" />
              </span>
              <span className={`nav-text text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-in-out group-hover:text-zinc-800 dark:group-hover:text-white group-focus-visible:text-zinc-800 dark:group-focus-visible:text-white group-hover:translate-x-2 ${
                activeSection === item.id ? "text-zinc-800 dark:text-white translate-x-2" : "text-zinc-500 dark:text-gray-500"
              }`}>
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
