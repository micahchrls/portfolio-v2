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
        "Develop and maintain software applications in accordance with company requirements and standards. Collaborate with cross-functional teams to define, design, and ship new features. Implement automated testing platforms and unit tests to ensure software reliability. Contribute to the design and architecture of software solutions while mentoring junior developers and communicating effectively with project managers and stakeholders.",
      skills: ["Laravel", "API Development", "Software Architecture", "Automated Testing", "Team Collaboration", "Code Review", "Mentorship"]
    },
    {
      company: "Zamboanga City Medical Center",
      role: "Computer Programmer II",
      duration: "Jan 2025 - Jul 2025",
      description:
        "Developed Laravel-based APIs for a hospital Purchase Request Monitoring System, enhancing procurement transparency and streamlining the approval process. Led the integration of PNPKI digital signatures by developing Laravel backend APIs and a FastAPI microservice for secure, scalable digital document signing. Contributed to the development of a User Management Information System and optimized the Reports module (DTR, leave reports) by implementing query caching and improving database performance using Laravel Eloquent.",
      skills: ["Laravel", "FastAPI", "MySQL", "API Development", "PNPKI Integration", "Database Optimization", "Eloquent ORM", "Microservices"]
    },
    {
      company: "Zamboanga City Medical Center",
      role: "Computer Programmer I",
      duration: "Jun 2024 - Dec 2024",
      description:
        "Part of the development team for the Annual Operation Plan system, building RESTful APIs with Laravel and optimizing database queries using Eloquent ORM. Participated in code reviews and contributed to improving system reliability and performance.",
      skills: ["PHP", "Laravel", "MySQL", "REST API", "Eloquent ORM"]
    },
    {
      company: "Ateneo de Zamboanga University",
      role: "College Professor (Part-time)",
      duration: "2023 - Jan 2025",
      description:
        "Teach foundational programming, object-oriented programming (OOP), and core computer science subjects to CS, IT and Computer Engineering students. Provide mentorship and practical coding experience through hands-on teaching of software development practices.",
      skills: ["Teaching", "Programming", "OOP", "Mentorship", "Curriculum Development"]
    },
    {
      company: "Ateneo de Zamboanga University",
      role: "System Developer",
      duration: "Jan 2023 - Jun 2024",
      description:
        "Maintained a legacy university portal using vanilla PHP, MySQL, and Bootstrap, and developed the DTR Reports module with raw database queries. Designed and deployed full-stack applications, including a Procurement System for the university developed with PHP, Bootstrap, Ajax(jQuery), and MySQL, streamlining the manual procurement process. Provided technical support and training to users on newly implemented systems and facilitated smooth adoption.",
      skills: ["PHP", "MySQL", "JavaScript", "Bootstrap", "jQuery", "Full-Stack Development", "Legacy System Maintenance"]
    },
    {
      company: "Fiverr",
      role: "Freelance Software Developer",
      duration: "Apr 2020 - Nov 2021",
      description:
        "Specialized in C++ projects, debugging and optimizing web applications built with Django and Laravel. Developed a web application ordering system for a pizza company using Django and Bootstrap, improving customer order management. Developed clean, responsive portfolio websites using HTML, CSS, and JavaScript, delivering solutions to a global client base.",
      skills: ["C++", "Django", "Laravel", "PostgreSQL", "PHP", "Bootstrap", "HTML", "CSS", "JavaScript", "Responsive Design"]
    },
    {
      company: "Symph",
      role: "Dev Intern",
      duration: "Apr 2021 - Jun 2021",
      description:
        "Leveraged JavaScript technologies like React and Node.js to build and debug client product websites. Contributed to a more streamlined user experience by resolving bugs and enhancing website functionality, reducing user-reported issues. Utilized Linear platform for task management and GitHub for version control and code collaboration.",
      skills: ["React", "Node.js", "JavaScript", "Git", "GitHub", "Agile Methodology", "Linear"]
    }
  ];