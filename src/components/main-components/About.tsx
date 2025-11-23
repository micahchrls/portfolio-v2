import { motion } from "framer-motion";

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
    "I'm a backend specialist with a knack for simplifying complexity—whether that's untangling legacy code or helping new developers ramp up fast. With 4+ years of experience in Laravel and API development, I build scalable systems that streamline workflows and bring teams together through clean, reliable code. I've also bridged frontend/backend gaps with React and TypeScript, contributing across the stack when needed. Beyond the code, I'm passionate about clear communication and collaborative problem-solving—qualities that make me a steady presence in fast-moving environments.",
  currentRole: "Currently building scalable backend systems at",
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
    "Database Optimization",
    "Eloquent ORM",
    "Git",
    "C++",
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

/**
 * Renders the About section of the portfolio.
 *
 * @remarks
 * This component uses Framer Motion to animate the content, and Tailwind CSS to style it.
 * It renders a header with the title "About", followed by a container with a max-width of 2xl.
 * The container has a sticky top navigation bar with the title "About" and a link to the resume.
 * The main content of the section is divided into three sections: technical stack, impact metrics, and a call to action.
 * The technical stack section renders a list of skills as tags, and the impact metrics section renders a grid of metrics.
 * The call to action section renders a link to the resume and a link to the portfolio.
 */
const About = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
                <ExternalLink {...aboutContent.links.workplace} />, where I
                build and maintain backend systems in an agile environment.
                I collaborate with cross-functional teams to design, develop,
                and ship features that drive business value, while contributing
                to software architecture decisions and implementing robust testing
                practices.
              </Paragraph>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
