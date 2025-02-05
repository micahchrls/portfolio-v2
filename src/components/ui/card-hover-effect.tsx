import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    duration?: string;
    skills?: string[];
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("flex flex-col space-y-12", className)}>
      {items.map((item, idx) => (
        <Link
          to={item?.link}
          key={item?.link}
          className="group relative block w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl lg:-inset-x-6 lg:block 
                lg:group-hover:bg-gradient-to-r from-zinc-100/10 via-zinc-200/10 to-zinc-100/10 
                dark:lg:group-hover:bg-gradient-to-r dark:from-zinc-800/50 dark:via-zinc-700/50 dark:to-zinc-800/50 
                lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] 
                dark:lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] 
                lg:group-hover:drop-shadow-lg"
                layoutId="hoverBackground"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { 
                    duration: 0.35,
                    ease: [0.23, 1, 0.32, 1]
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.98,
                  transition: { 
                    duration: 0.35, 
                    ease: [0.23, 1, 0.32, 1]
                  },
                }}
              />
            )}
          </AnimatePresence>
          <div className="relative">
            <Card>
              <div className="group relative grid pb-1 transition-all duration-300 ease-out sm:grid-cols-8 sm:gap-8 md:gap-4 
                            transform motion-safe:group-hover:-translate-y-1">
                <header className="z-10 mb-2 mt-1 sm:col-span-2">
                  <CardDescription duration={item.duration} />
                </header>
                <div className="z-10 sm:col-span-6">
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription skills={item.skills}>
                    {item.description}
                  </CardDescription>
                </div>
              </div>
            </Card>
          </div>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("w-full transition-all duration-300 ease-out group-hover:opacity-100 lg:group-hover/list:opacity-50 lg:group-hover:opacity-100", className)}>
      {children}
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h3 className={cn("font-medium leading-snug text-zinc-800 dark:text-zinc-200", className)}>
      <div>
        <span className="inline-flex items-baseline font-medium leading-tight text-zinc-800 dark:text-zinc-200 text-base">
          <span>{children}</span>
        </span>
      </div>
    </h3>
  );
};

export const CardDescription = ({
  className,
  children,
  duration,
  skills,
}: {
  className?: string;
  children?: React.ReactNode;
  duration?: string;
  skills?: string[];
}) => {
  if (duration && !children && !skills) {
    return (
      <div className="text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-500">
        {duration}
      </div>
    );
  }

  return (
    <div className={cn("text-sm leading-normal", className)}>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{children}</p>
      {skills && skills.length > 0 && (
        <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
          {skills.map((skill, skillIndex) => (
            <li key={skillIndex} className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium leading-5 text-zinc-800 dark:text-zinc-300">
                {skill}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
