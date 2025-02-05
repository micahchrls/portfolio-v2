import { Card, CardContent } from "@/components/ui/card";
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
  <p className="mb-6 text-zinc-600 dark:text-zinc-400">{children}</p>
);

const SkillTag: React.FC<{ skill: string; index: number }> = ({ skill, index }) => (
  <motion.span
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="inline-block bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 
              hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-700 dark:hover:text-zinc-50 transition-colors duration-200"
  >
    {skill}
  </motion.span>
);

const aboutContent: AboutContent = {
  intro: "Software developer with over three years of expertise in building enterprise solutions for healthcare and education sectors. Specializing in backend development, database management, and secure system architecture with a focus on Laravel applications and API development.",
  currentRole: "Currently driving innovation in healthcare systems at",
  skills: [
    "PHP",
    "Laravel",
    "FastAPI",
    "React",
    "TypeScript",
    "Node.js",
    "MySQL",
    "PostgreSQL",
    "Git",
    "API Development",
    "C/C++",
    "Python"
  ],
  links: {
    workplace: {
      text: "Zamboanga City Medical Center",
      url: "https://zcmc.doh.gov.ph/",
      label: "Zamboanga City Medical Center",
    },
    github: {
      text: "GitHub",
      url: "https://github.com/micah3252625",
      label: "Github",
    },
    portfolio: {
      text: "portfolio",
      url: "https://micahmustaham.netlify.app/",
      label: "Portfolio",
    },
  },
};

const About = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

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
        className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
      >
        <motion.h2 variants={item} className="text-sm font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200 lg:sr-only">
          About
        </motion.h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card className="border-none">
            <CardContent>
              <motion.div variants={item}>
                <Paragraph>
                  {aboutContent.intro}
                </Paragraph>
              </motion.div>

              <motion.div variants={item}>
                <Paragraph>
                  {aboutContent.currentRole}{" "}
                  <ExternalLink {...aboutContent.links.workplace} />, where I develop secure backend APIs and integrate PNPKI digital signatures for healthcare systems. Additionally, I serve as a part-time professor at Ateneo de Zamboanga University, teaching programming and mentoring the next generation of developers.
                </Paragraph>
              </motion.div>

              <motion.div variants={item}>
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-3">Technical Stack:</h3>
                  <div className="flex flex-wrap">
                    {aboutContent.skills.map((skill, index) => (
                      <SkillTag key={skill} skill={skill} index={index} />
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={item} className="mt-6 flex gap-6">
                <p className="text-sm text-zinc-600 dark:text-zinc-500">
                  Explore my professional projects on{" "}
                  <ExternalLink {...aboutContent.links.github} /> or visit my{" "}
                  <ExternalLink {...aboutContent.links.portfolio} /> for detailed case studies.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
