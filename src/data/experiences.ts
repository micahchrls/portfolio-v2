export interface Experience {
    company: string;
    role: string;
    duration: string;
    bullets: string[];
    skills: string[];
    links?: { name: string; url: string }[];
  }

  export const experiences: Experience[] = [
    {
      company: "Titan FX",
      role: "Software Developer",
      duration: "Jul 2025 - Present",
      bullets: [
        "Sole developer leading the migration of the trader ID-verification module from legacy CodeIgniter to Laravel — delivered in 3 months, preserving heavy onboarding business rules, and maintained through production launch.",
        "Led an in-house feature-flag platform built on Laravel + Filament with write-through Redis caching, so flag changes propagate instantly — replacing a slow third-party service.",
        "Build and maintain backend REST APIs behind a live forex/CFD trading platform, where high availability and low latency are non-negotiable.",
        "Drove adoption of an agentic AI workflow with Claude across the engineering team — reusable skills, agents, and automated tests that shortened delivery cycles.",
      ],
      skills: ["Laravel", "PHP", "Filament", "Redis", "REST APIs", "Legacy Migration", "Agentic AI Workflows"]
    },
    {
      company: "Zamboanga City Medical Center",
      role: "Backend Developer (Computer Programmer I–II)",
      duration: "Jun 2024 - Jun 2025",
      bullets: [
        "Led PNPKI digital-signature integration: Laravel backend APIs plus a Python FastAPI microservice delivering standards-compliant e-signatures for hospital documents.",
        "Optimized the DTR and leave-report modules with Eloquent query caching and targeted query rewrites — cut report load times without a schema rewrite or added infrastructure.",
        "Built Laravel REST APIs for the Purchase Request Monitoring System, digitizing paper procurement with a multi-department approval workflow.",
        "Brought AI coding tools (Windsurf, Codex) into daily development — built automations and reusable prompt workflows.",
      ],
      skills: ["Laravel", "Python", "FastAPI", "MySQL", "Eloquent ORM", "Query Optimization", "PNPKI Integration"]
    },
    {
      company: "Ateneo de Zamboanga University",
      role: "College Professor (Part-time)",
      duration: "Aug 2023 - Jan 2025",
      bullets: [
        "Taught foundational programming, object-oriented programming, and core computer science subjects to CS, IT, and Computer Engineering undergraduates.",
        "Designed hands-on coursework — labs, projects, and real-world coding scenarios — to bridge the gap between theory and employable software development skills.",
      ],
      skills: ["Teaching", "Programming", "OOP", "Mentorship", "Curriculum Design"]
    },
    {
      company: "Ateneo de Zamboanga University",
      role: "System Developer",
      duration: "Jan 2023 - Jun 2024",
      bullets: [
        "Built a full-stack procurement system (PHP, MySQL, Ajax/jQuery) replacing the university's manual paper process with a tracked, end-to-end approval workflow.",
        "Maintained the legacy PHP/MySQL university portal and built a DTR reporting module on raw SQL against existing production schemas — no rewrite, no downtime.",
      ],
      skills: ["PHP", "MySQL", "jQuery", "Ajax", "Raw SQL", "Legacy Systems"]
    },
    {
      company: "Fiverr",
      role: "Freelance Software Developer",
      duration: "Apr 2020 - Nov 2021",
      bullets: [
        "Built, debugged, and optimized web applications built with Django and Laravel for clients worldwide.",
        "Developed a web-based ordering system for a pizza company using Django and Bootstrap, improving customer order management.",
        "Delivered clean, responsive portfolio websites in HTML, CSS, and JavaScript to a global client base.",
      ],
      skills: ["Django", "Laravel", "PHP", "PostgreSQL", "Bootstrap", "JavaScript"]
    },
    {
      company: "Symph",
      role: "Dev Intern",
      duration: "Apr 2021 - Jun 2021",
      bullets: [
        "Built and debugged client product websites with React and Node.js.",
        "Streamlined the user experience by resolving bugs and enhancing site functionality, reducing user-reported issues.",
        "Worked with Linear for task management and GitHub for version control and code collaboration.",
      ],
      skills: ["React", "Node.js", "JavaScript", "GitHub", "Linear"]
    }
  ];
