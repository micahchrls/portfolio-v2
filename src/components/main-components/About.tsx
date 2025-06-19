import { motion } from "framer-motion";
import {
  BarChart3,
  Github,
  Star,
  GitFork,
  GitCommit,
  Monitor,
  Server,
  LineChart,
} from "lucide-react";
import useGitHubMetrics from "@/hooks/useGithubMetrics";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { NumberTicker } from "@/components/magicui/number-ticker";

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

interface Metric {
  label: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
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

// Commented out as it's unused but might be needed later
// const SkillTag: React.FC<{ skill: string; index: number }> = ({
// skill,
//   index,
// }) => (
//   <motion.span
//    initial={{ opacity: 0, y: 20 }}
//    animate={{ opacity: 1, y: 0 }}
//    transition={{ duration: 0.3, delay: index * 0.1 }}
//     className="inline-block bg-zinc-100/50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 
//               hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-700 dark:hover:text-zinc-50 transition-colors duration-200"
//  >
//     {skill}
//   </motion.span>
// );

const MetricCard: React.FC<{ metric: Metric; index: number }> = ({
  metric,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="bg-zinc-100/70 dark:bg-zinc-800/50 rounded-lg p-4 flex flex-col items-start"
  >
    <div className="flex items-center justify-between w-full mb-2">
      <NumberTicker
        value={parseInt(metric.value, 10) || 0}
        className="text-3xl font-bold text-zinc-900 dark:text-zinc-100"
        delay={0.2}
      />
      {metric.icon || (
        <BarChart3 className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
      )}
    </div>
    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-200">
      {metric.label}
    </span>
    {metric.description && (
      <span className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
        {metric.description}
      </span>
    )}
  </motion.div>
);

const LanguageBar: React.FC<{
  language: string;
  percentage: number;
  index: number;
}> = ({ language, percentage, index }) => {
  // Generate a consistent color based on the language name
  const getLanguageColor = (lang: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-orange-500",
      "bg-teal-500",
      "bg-cyan-500",
    ];

    // Simple hash function to get consistent colors for language names
    let hash = 0;
    for (let i = 0; i < lang.length; i++) {
      hash = lang.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="mb-2"
    >
      <div className="flex justify-between mb-1 text-xs">
        <span className="font-medium text-zinc-800 dark:text-zinc-200">
          {language}
        </span>
        <span className="text-zinc-600 dark:text-zinc-400">
          <NumberTicker
            value={percentage}
            decimalPlaces={1}
            delay={0.3 + index * 0.1}
            className="text-xs"
          />
          %
        </span>
      </div>
      <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
        <motion.div
          className={`${getLanguageColor(language)} h-2 rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 0.8,
            delay: 0.3 + index * 0.1,
            ease: "easeOut",
          }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

// Create a component for language category display
// Remove unused icon parameter
const LanguageCategory: React.FC<{
  title: string;
  // icon removed as it's unused
  languages: Record<string, number>;
  loading: boolean;
}> = ({ title, languages, loading }) => {
  const languageEntries = Object.entries(languages);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-pulse text-sm text-zinc-600 dark:text-zinc-400">
          Loading language statistics...
        </div>
      </div>
    );
  }

  if (languageEntries.length === 0) {
    return (
      <div className="text-sm text-zinc-600 dark:text-zinc-400 py-2">
        No {title.toLowerCase()} languages found
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {languageEntries
        .slice(0, 3) // Show top 3 languages per category
        .map(([language, percentage], index) => (
          <LanguageBar
            key={language}
            language={language}
            percentage={percentage}
            index={index}
          />
        ))}
    </div>
  );
};

const aboutContent: AboutContent = {
  intro:
    "Experienced Backend Engineer with over three years of hands-on development using PHP and Laravel, with strong expertise in SQL and relational database management. Specializing in scalable APIs, database optimization, and secure architecture for healthcare and education sectors with a proven track record of successful legacy system migrations and third-party integrations.",
  currentRole: "Currently driving innovation in healthcare systems at",
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
      text: "Zamboanga City Medical Center",
      url: "https://zcmc.doh.gov.ph/",
      label: "Zamboanga City Medical Center",
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

  // Extract GitHub username from URL
  const githubUsername = aboutContent.links.github.url.split("github.com/")[1];
  const {
    totalStars,
    totalRepos,
    totalCommits,
    contributions,
    languagesByCategory,
    loading,
    error,
  } = useGitHubMetrics(githubUsername);

  // Dynamically generate metrics based on GitHub data
  const gitHubMetrics: Metric[] = [
    {
      label: "GitHub Stars",
      value: loading ? "..." : totalStars.toString(),
      description: "Total stars earned across repositories",
      icon: <Star className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />,
    },
    {
      label: "Repositories",
      value: loading ? "..." : totalRepos.toString(),
      description: "Public GitHub repositories",
      icon: <Github className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />,
    },
    {
      label: "Commits",
      value: loading ? "..." : totalCommits.toString(),
      description: "Code commits across projects",
      icon: <GitCommit className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />,
    },
    {
      label: "Contributions",
      value: loading ? "..." : contributions.toString(),
      description: "Public contributions on GitHub",
      icon: <GitFork className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />,
    },
  ];

  // Use the work metrics from before if you want to keep them, or just use GitHub metrics
  const metrics = gitHubMetrics;

  return (
    <section
      id="about"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
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
                architect Laravel-based APIs and integrate PNPKI digital
                signatures. My work has reduced procurement processing time by
                32% and improved report generation efficiency by 28% through
                optimized database queries and caching strategies.
              </Paragraph>
            </motion.div>
          </div>

          <motion.div variants={item} className="py-2">
            <div className="flex items-center gap-2 mb-4">
              <LineChart className="h-4 w-4 text-zinc-800 dark:text-zinc-200" />
              <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                GitHub Metrics
              </h3>
            </div>
            <BoxReveal width="100%" boxColor="#71717a">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {error && (
                  <div className="col-span-4 text-sm text-red-500">
                    Failed to load GitHub metrics: {error}
                  </div>
                )}
                {metrics.map((metric, index) => (
                  <MetricCard
                    key={metric.label}
                    metric={metric}
                    index={index}
                  />
                ))}
              </div>
            </BoxReveal>
            <motion.div variants={item} className="py-2">
              <p className="text-xs text-center text-zinc-500 dark:text-zinc-400 italic">
                <Github className="inline h-3 w-3 mr-1 mb-0.5" />
                All GitHub metrics and language statistics are fetched directly
                from my GitHub account data.
              </p>
            </motion.div>
          </motion.div>

          <motion.div variants={item} className="pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Frontend Languages */}

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Monitor className="h-4 w-4 text-zinc-800 dark:text-zinc-200" />
                  <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    Frontend Languages
                  </h3>
                </div>
                <BoxReveal width="100%" boxColor="#71717a">
                  <div className="bg-zinc-100/70 dark:bg-zinc-800/50 rounded-lg p-4">
                    {loading ? (
                      <div className="flex items-center justify-center py-6">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-zinc-500"></div>
                        <span className="ml-2 text-sm text-zinc-500">
                          Loading GitHub data...
                        </span>
                      </div>
                    ) : (
                      <LanguageCategory
                        title="Frontend"
                        languages={languagesByCategory.frontend}
                        loading={loading}
                      />
                    )}
                  </div>
                </BoxReveal>
              </div>

              {/* Backend Languages */}
              <BoxReveal width="100%" boxColor="#71717a">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Server className="h-4 w-4 text-zinc-800 dark:text-zinc-200" />
                    <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      Backend Languages
                    </h3>
                  </div>
                  <div className="bg-zinc-100/70 dark:bg-zinc-800/50 rounded-lg p-4">
                    {loading ? (
                      <div className="flex items-center justify-center py-6">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-zinc-500"></div>
                        <span className="ml-2 text-sm text-zinc-500">
                          Loading GitHub data...
                        </span>
                      </div>
                    ) : (
                      <LanguageCategory
                        title="Backend"
                        languages={languagesByCategory.backend}
                        loading={loading}
                      />
                    )}
                  </div>
                </div>
              </BoxReveal>
            </div>
            <p className="text-xs text-center mt-2 text-zinc-500 dark:text-zinc-400 italic">
              <Github className="inline h-3 w-3 mr-1 mb-0.5" />
              All GitHub metrics and language statistics are fetched directly
              from my GitHub account data.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
