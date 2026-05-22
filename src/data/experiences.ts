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
      company: "Titan FX",
      role: "Backend Software Developer",
      duration: "Jul 2025 - Present",
      description:
        "Building and modernizing backend systems for a global forex brokerage, with a focus on Laravel-based API development and legacy system migration. Architect and ship production features across the full backend lifecycle — from database design to API contracts — while integrating AI-powered developer tooling (including Claude Code) into the team's workflow to increase delivery speed and code quality. Collaborate with cross-functional teams on software architecture decisions and mentor junior developers on backend best practices.",
      skills: ["Laravel", "PHP", "API Development", "Legacy Migration", "Software Architecture", "AI-Augmented Development", "Code Review", "Mentorship"]
    },
    {
      company: "Zamboanga City Medical Center",
      role: "Computer Programmer II",
      duration: "Jan 2025 - Jul 2025",
      description:
        "Led backend architecture and development of the Purchase Request Monitoring System — a Laravel REST API that digitized the hospital's entire procurement workflow, replacing a paper-based process and giving each department real-time visibility into request status and policy compliance. Spearheaded PNPKI digital signature integration by building a FastAPI microservice that enabled secure, legally-compliant digital document signing across the organization. Leveraged Claude and AI coding tools throughout the development cycle to accelerate API design, generate boilerplate, and validate architectural decisions — producing cleaner, more maintainable code faster. Also optimized the DTR and leave reports backend through query caching and Eloquent ORM tuning, significantly cutting report generation time for HR.",
      skills: ["Laravel", "FastAPI", "Python", "MySQL", "REST API", "PNPKI Integration", "Database Optimization", "Eloquent ORM", "AI-Augmented Development"]
    },
    {
      company: "Zamboanga City Medical Center",
      role: "Computer Programmer I",
      duration: "Jun 2024 - Dec 2024",
      description:
        "Worked as a backend developer designing and building RESTful APIs for two hospital systems: the DTR and Leave Reports module — which gave the HR team automated, reliable data on employee lates, absences, and leave balances — and the Annual Operation Plan system, which supported department-level planning and budget reporting across ZCMC. Used AI tools including Claude models to assist with API design patterns and code generation, improving both output quality and delivery speed. Optimized Eloquent queries on high-traffic reporting endpoints and established API standards through code reviews. This work led to a formal promotion to Computer Programmer II within 6 months.",
      skills: ["PHP", "Laravel", "MySQL", "REST API", "Eloquent ORM", "AI-Augmented Development"]
    },
    {
      company: "Ateneo de Zamboanga University",
      role: "College Professor (Part-time)",
      duration: "2023 - Jan 2025",
      description:
        "Taught foundational programming, object-oriented programming, and core computer science subjects to undergraduate students across CS, IT, and Computer Engineering programs. Designed coursework with a hands-on emphasis — labs, projects, and real-world coding scenarios — to bridge the gap between theory and employable software development skills.",
      skills: ["Teaching", "Programming", "OOP", "Mentorship", "Curriculum Design"]
    },
    {
      company: "Ateneo de Zamboanga University",
      role: "System Developer",
      duration: "Jan 2023 - Jun 2024",
      description:
        "Designed and deployed full-stack applications that replaced manual university workflows with digital systems. Built a Procurement System using PHP, Bootstrap, and MySQL that digitized the end-to-end purchasing process — from request submission to approval tracking — eliminating the paperwork bottleneck. Maintained a legacy university portal and developed the DTR Reports module, then trained staff on the new systems to ensure smooth rollout and adoption.",
      skills: ["PHP", "MySQL", "JavaScript", "Bootstrap", "jQuery", "Full-Stack Development", "Legacy System Maintenance"]
    },
    {
      company: "Fiverr",
      role: "Freelance Software Developer",
      duration: "Apr 2020 - Nov 2021",
      description:
        "Took on C++ debugging and optimization contracts alongside web development projects for international clients. Built a web-based ordering system for a restaurant client using Django and Bootstrap, replacing their phone-based ordering process. Delivered responsive portfolio and business websites in HTML, CSS, and JavaScript across multiple client engagements.",
      skills: ["C++", "Django", "Laravel", "PostgreSQL", "PHP", "Bootstrap", "HTML", "CSS", "JavaScript"]
    },
    {
      company: "Symph",
      role: "Dev Intern",
      duration: "Apr 2021 - Jun 2021",
      description:
        "Contributed to client product websites using React and Node.js, resolving UI bugs and improving frontend reliability. Worked within an Agile team on sprint deliverables, gaining experience with professional code review workflows and production deployment practices.",
      skills: ["React", "Node.js", "JavaScript", "Git", "Agile Methodology"]
    }
  ];
