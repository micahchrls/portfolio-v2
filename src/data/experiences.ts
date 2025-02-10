export interface Experience {
    company: string;
    role: string;
    duration: string;
    description: string;
    skills: string[];
    links?: { name: string; url: string }[];
  }
  
  export const experiences: Experience[] = [
    {
      company: "Zamboanga City Medical Center",
      role: "Software Developer | Backend",
      duration: "2024 - Present",
      description:
        "Developing backend APIs for hospital systems using Laravel and FastAPI. Integrated PNPKI for secure digital signatures and built reporting modules to optimize data management. Collaborating with cross-functional teams to enhance hospital workflows.",
      skills: ["Laravel", "FastAPI", "MySQL", "Git", "PHP"]
    },
    {
      company: "Ateneo de Zamboanga University",
      role: "College Professor",
      duration: "August 2023 - 2024",
      description:
        "Teaching programming, OOP, and core CS subjects to CS, IT, and Engineering students. Providing mentorship through hands-on coding exercises, project-based learning, and software development best practices.",
      skills: ["Teaching", "Programming", "Mentorship"]
    },
    {
      company: "Ateneo de Zamboanga University",
      role: "System Developer",
      duration: "2023 - 2024",
      description:
        "Maintained and optimized legacy university systems in PHP, MySQL, and VB6. Developed full-stack web applications, including the Student Information System and Procurement System, ensuring smooth operations and data handling.",
      skills: ["PHP", "MySQL", "JavaScript", "Bootstrap", "VB6", "Java"]
    },
    {
      company: "Fiverr",
      role: "Freelance Software Developer",
      duration: "2020 – 2022",
      description:
        "Developed custom software solutions for global clients, including a Django-based pizza ordering system and portfolio websites. Specialized in C++ debugging and performance optimization for high-efficiency applications.",
      skills: ["C++", "Django", "Laravel", "Bootstrap", "HTML", "CSS", "JavaScript"]
    },
    {
      company: "Symph",
      role: "Developer Intern",
      duration: "April 2021 – June 2021",
      description:
        "Worked on client product websites using React and Node.js, improving user experience and fixing critical bugs to enhance performance and reliability.",
      skills: ["React", "Node.js", "JavaScript"]
    }
  ];