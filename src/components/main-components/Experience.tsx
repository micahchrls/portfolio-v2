import { experiences } from '@/data/experiences';
import { HoverEffect } from "@/components/ui/card-hover-effect";

export default function Experience() {
  const experienceItems = experiences.map((experience) => ({
    title: `${experience.role} · ${experience.company}`,
    description: experience.description,
    link: "#",
    duration: experience.duration,
    skills: experience.skills,
  }));

  return (
    <section
      id="experience"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Experience"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-zinc-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-200 lg:sr-only">
          Experience
        </h2>
      </div>

      <div className="lg:group/list">
        <HoverEffect 
          items={experienceItems}
          className="gap-4"
        />
      </div>
    </section>
  );
}
