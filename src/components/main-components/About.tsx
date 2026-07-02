import { motion, useReducedMotion } from "framer-motion";

interface ExternalLink {
  text: string;
  url: string;
  label: string;
}

interface SkillGroup {
  label: string;
  items: string[];
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

export const skillGroups: SkillGroup[] = [
  {
    label: "Backend",
    items: ["PHP", "Laravel", "Filament", "REST API Design", "Eloquent ORM", "Python", "FastAPI"],
  },
  {
    label: "Databases & Caching",
    items: ["MySQL", "PostgreSQL", "Redis", "Query Optimization", "Schema Design"],
  },
  {
    label: "Frontend",
    items: ["React", "TypeScript", "Inertia.js", "Tailwind CSS", "shadcn/ui"],
  },
  {
    label: "AI & LLM Integration",
    items: ["Claude API", "Agentic Workflows", "Reusable Skills & Agents", "OpenAI & Gemini APIs"],
  },
  {
    label: "DevOps & Tools",
    items: ["Git", "Docker", "AWS", "CI/CD", "Laravel Cloud"],
  },
];

export const aboutContent: AboutContent = {
  intro:
    "Backend engineer with 3+ years building production systems in PHP and Laravel — from hospital and university platforms to a live forex trading system. I own legacy-to-Laravel migrations end to end, build REST APIs and Redis-backed internal tooling, and ship without regressions. Comfortable across the stack in React and TypeScript, and fluent in Python for microservices.",
  currentRole: "Currently doing exactly that at",
  skills: skillGroups.flatMap((group) => group.items),
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
                forex broker, where correctness and latency are the product.
                I bring the same discipline to freelance work — if you need a
                backend built, migrated, or un-stuck, I can help.
              </Paragraph>
            </motion.div>
          </div>

          <motion.div variants={item} className="space-y-4">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
