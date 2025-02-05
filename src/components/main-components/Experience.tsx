import { experiences } from '@/data/experiences';
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { motion } from 'framer-motion';

export default function Experience() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const experienceItems = experiences.map((experience) => ({
    title: `${experience.role} · ${experience.company}`,
    description: experience.description,
    link: "#",
    duration: experience.duration,
    skills: experience.skills,
  }));

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      id="experience"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Experience"
    >
      <motion.div
        variants={item}
        className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
      >
        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-200 lg:sr-only">
          Experience
        </h2>
      </motion.div>

      <motion.div 
        variants={item}
        className="lg:group/list p-6"
      >
        <HoverEffect 
          items={experienceItems}
          className="gap-4"
        />
      </motion.div>
    </motion.section>
  );
}
