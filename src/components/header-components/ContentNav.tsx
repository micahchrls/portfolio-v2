import { useEffect, useState } from "react";

export default function ContentNav() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    // Add smooth scroll behavior to the html element
    document.documentElement.style.scrollBehavior = "smooth";

    const handleScroll = () => {
      const sections = ["about", "experience", "projects"];
      const scrollPosition = window.scrollY + 100; // offset for better trigger point

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Reset scroll behavior when component unmounts
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <nav className="nav hidden lg:block" aria-label="In-page jump links">
      <ul className="mt-16 w-max">
        <li>
          <a 
            className={`group flex items-center py-3 transition-all duration-300 ease-in-out ${
              activeSection === "about" ? "active" : ""
            }`} 
            href="#about"
          >
            <span className={`nav-indicator mr-4 h-px w-8 transition-all duration-300 ease-in-out group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none ${
              activeSection === "about" ? "w-16 bg-slate-200" : "bg-white"
            }`}></span>
            <span className={`nav-text text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-in-out group-hover:text-slate-200 group-focus-visible:text-slate-200 group-hover:translate-x-2 ${
              activeSection === "about" ? "text-slate-200 translate-x-2" : ""
            }`}>
              About
            </span>
          </a>
        </li>
        <li>
          <a 
            className={`group flex items-center py-3 transition-all duration-300 ease-in-out ${
              activeSection === "experience" ? "active" : ""
            }`} 
            href="#experience"
          >
            <span className={`nav-indicator mr-4 h-px w-8 transition-all duration-300 ease-in-out group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none ${
              activeSection === "experience" ? "w-16 bg-slate-200" : "bg-white"
            }`}></span>
            <span className={`nav-text text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-in-out group-hover:text-slate-200 group-focus-visible:text-slate-200 group-hover:translate-x-2 ${
              activeSection === "experience" ? "text-slate-200 translate-x-2" : ""
            }`}>
              Experience
            </span>
          </a>
        </li>
        <li>
          <a 
            className={`group flex items-center py-3 transition-all duration-300 ease-in-out ${
              activeSection === "projects" ? "active" : ""
            }`} 
            href="#projects"
          >
            <span className={`nav-indicator mr-4 h-px w-8 transition-all duration-300 ease-in-out group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none ${
              activeSection === "projects" ? "w-16 bg-slate-200" : "bg-white"
            }`}></span>
            <span className={`nav-text text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-in-out group-hover:text-slate-200 group-focus-visible:text-slate-200 group-hover:translate-x-2 ${
              activeSection === "projects" ? "text-slate-200 translate-x-2" : ""
            }`}>
              Projects
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
