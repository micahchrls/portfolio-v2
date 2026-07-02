"use client";
import {
  useScroll,
  useTransform,
  motion,
  useInView,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

const TimelineItem = ({ item }: { item: TimelineEntry }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { margin: "0px 0px -45% 0px" });

  return (
    <div ref={itemRef} className="relative pt-4 md:pt-8">
      {/* Timeline Dot */}
      <div
        className={`absolute left-[-31px] top-6 md:top-10 h-4 w-4 rounded-full bg-white dark:bg-zinc-950 border-2 flex items-center justify-center transition-colors duration-300 ${
          isInView ? "border-emerald-500" : "border-zinc-300 dark:border-zinc-700"
        }`}
      >
        <motion.div
          className={`h-2 w-2 rounded-full transition-colors duration-300 ${
            isInView ? "bg-emerald-500" : "bg-zinc-400 dark:bg-zinc-600"
          }`}
          animate={{ scale: isInView ? [1, 1.4, 1] : 1 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Date */}
      <h3
        className={`text-sm mb-3 transition-colors duration-300 ${
          isInView
            ? "font-bold text-zinc-900 dark:text-zinc-100"
            : "font-medium text-zinc-500 dark:text-zinc-500"
        }`}
      >
        {item.title}
      </h3>

      {/* Content */}
      <div className="w-full">{item.content}</div>
    </div>
  );
};

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => setHeight(el.getBoundingClientRect().height);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 pl-10">
        {data.map((item, index) => (
          <TimelineItem key={index} item={item} />
        ))}
        <div
          style={{ height: height + "px" }}
          className="absolute left-[-24px] top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-zinc-200 dark:via-zinc-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-emerald-500 via-emerald-400 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
