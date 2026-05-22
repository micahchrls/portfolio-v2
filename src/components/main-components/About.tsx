import { motion, useReducedMotion } from "framer-motion";
import { Github, Globe } from "lucide-react";

interface ExternalLink {
  text: string;
  url: string;
  label: string;
}

interface AboutContent {
  intro: string;
  currentRole: string;
  skills: string[];
  links: {
    workplace: ExternalLink;
    github: ExternalLink;
    portfolio: ExternalLink;
  };
}

const ExternalLink: React.FC<ExternalLink & { className?: string }> = ({
  text,
  url,
  label,
  className = "font-medium text-zinc-800 hover:text-zinc-600 dark:text-zinc-200 dark:hover:text-zinc-50 focus-visible:text-zinc-600 dark:focus-visible:text-zinc-50 transition-colors duration-200",
}) => (
  <a
    className={className}
    href={url}
    target="_blank"
    rel="noreferrer noopener"
    aria-label={`${label} (opens in a new tab)`}
  >
    {text}
  </a>
);

const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mb-6 text-base leading-7 text-zinc-600 dark:text-zinc-400">
    {children}
  </p>
);

const aboutContent: AboutContent = {
  intro:
    "Backend engineer specializing in Laravel and API development — and one who actively uses AI agents to build faster and better. I integrate tools like Claude Code into my development workflow for code generation, architecture review, and rapid iteration, letting me move at a pace that would normally require a larger team without sacrificing quality. Across fintech, healthcare, and government projects, I've built and modernized systems that replace manual processes with transparent, auditable backends.",
  currentRole: "Currently building backend infrastructure and migrating legacy systems at",
  skills: [
    "PHP",
    "Laravel",
    "Python",
    "FastAPI",
    "React",
    "TypeScript",
    "MySQL",
    "PostgreSQL",
    "API Development",
    "AI Agents",
    "LLM Integration",
    "Database Optimization",
    "Eloquent ORM",
    "Git",
  ],
  links: {
    workplace: {
      text: "Titan FX",
      url: "https://www.titanfx.com/",
      label: "Titan FX",
    },
    github: {
      text: "GitHub",
      url: "https://github.com/micahchrls",
      label: "Github",
    },
    portfolio: {
      text: "portfolio",
      url: "https://micahchrls.vercel.app",
      label: "Portfolio",
    },
  },
};

const About = () => {
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.5 } },
  };

  return (
    <section
      id="about"
      className="mb-12 scroll-mt-16 md:mb-16 lg:mb-20 lg:scroll-mt-24"
      aria-label="About me"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-0 lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
      >
        <motion.h2
          variants={item}
          className="text-sm font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200 lg:sr-only"
        >
          About
        </motion.h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-2xl"
      >
        <motion.div variants={item} className="space-y-8">
          <div className="space-y-6">
            <motion.div variants={item}>
              <Paragraph>{aboutContent.intro}</Paragraph>
            </motion.div>

            <motion.div variants={item}>
              <Paragraph>
                {aboutContent.currentRole}{" "}
                <ExternalLink {...aboutContent.links.workplace} />, a global
                forex brokerage, where I build new features and lead legacy
                system migrations using an AI-augmented development process.
                I bring the same approach to freelance projects — if you need
                a backend system built or modernized, I can help.
              </Paragraph>
            </motion.div>
          </div>

          <motion.div variants={item} className="flex flex-wrap gap-2">
            {aboutContent.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-md"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-4 flex flex-wrap gap-2">
            <a
              href={aboutContent.links.github.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub (opens in a new tab)"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href={aboutContent.links.portfolio.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Portfolio (opens in a new tab)"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              Portfolio
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
