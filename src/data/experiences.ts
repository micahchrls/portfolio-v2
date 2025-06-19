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
      role: "Backend Developer",
      duration: "June 2024 - Present",
      description:
        "Architected and implemented Laravel-based APIs for hospital procurement monitoring, reducing approval time by 40%. Engineered secure PNPKI digital signature integration using Laravel and FastAPI microservices, enabling legally compliant electronic document processing for 200+ staff. Optimized reporting modules through query caching and Eloquent ORM improvements, reducing generation time by 60% for critical reports.",
      skills: ["Laravel", "FastAPI", "MySQL", "API Development", "Database Optimization", "PNPKI Integration", "Eloquent ORM"]
    },
    {
      company: "Ateneo de Zamboanga University",
      role: "College Professor",
      duration: "August 2023 - Present",
        /**
         * Develop and deliver comprehensive curriculum in programming fundamentals, OOP, and core computer science subjects to 100+ undergraduate students.
         * Mentor students through practical coding exercises and real-world projects, with 90% achieving proficiency in fundamental programming concepts.
         * Design and implement project-based assessments that bridge theoretical concepts with industry-relevant applications.
         */
      description:
        "Develop and deliver comprehensive curriculum in programming fundamentals, OOP, and core computer science subjects to 100+ undergraduate students. Mentor students through practical coding exercises and real-world projects, with 90% achieving proficiency in fundamental programming concepts. Design and implement project-based assessments that bridge theoretical concepts with industry-relevant applications.",
      skills: ["Teaching", "Programming", "Mentorship", "Curriculum Development", "Project-Based Learning"]
    },
    {
      company: "Ateneo de Zamboanga University",
      role: "System Developer",
      duration: "January 2023 - June 2024",
      description:
        "Maintained and enhanced legacy university portal using vanilla PHP, MySQL, and Bootstrap, improving system reliability by 35%. Designed and deployed a comprehensive Procurement System that digitized manual workflows, reducing processing time by 50% and improving data accuracy. Provided technical support and training to users, facilitating smooth adoption of new systems across departments.",
      skills: ["PHP", "MySQL", "JavaScript", "Bootstrap", "jQuery", "System Design", "Legacy System Maintenance"]
    },
    {
      company: "Fiverr",
      role: "Freelance Software Developer",
      duration: "January 2023 - June 2024",
      description:
        "Specialized in C++ projects, debugging and optimizing performance-critical applications. Developed a comprehensive web ordering system for a pizza company using Django and Bootstrap, improving customer order management efficiency by 70%. Created custom portfolio websites using modern frontend technologies, delivering responsive solutions to a diverse global client base with 100% satisfaction rate.",
      skills: ["C++", "Django", "Laravel", "Bootstrap", "HTML", "CSS", "JavaScript", "Responsive Design"]
    },
    {
      company: "Symph",
      role: "Developer Intern",
      duration: "April 2021 - June 2021",
      description:
        "Contributed to data-centric features on React/Node applications for external clients, improving data visualization and user experience. Participated in agile development processes and sprint planning. Collaborated with senior developers through GitHub for code reviews and version control, gaining valuable industry experience in a production environment.",
      skills: ["React", "Node.js", "JavaScript", "Git", "GitHub", "Agile Methodology"]
    }
  ];