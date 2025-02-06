import { motion } from "framer-motion";

const dotVariants = {
  initial: { y: 0 },
  animate: { y: -5 },
};

const containerVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export function TypingIndicator() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex items-end gap-2"
    >
      <div className="relative">
        <img
          src="/avatar.jpeg"
          alt="Micah"
          className="w-6 h-6 rounded-full object-cover mb-1 ring-2 ring-background"
        />
        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
      </div>
      <div className="flex items-center gap-1 px-4 py-3 rounded-2xl bg-muted/50 backdrop-blur-sm rounded-bl-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            variants={dotVariants}
            animate="animate"
            initial="initial"
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.4,
              delay: i * 0.1,
            }}
            className="w-2 h-2 rounded-full bg-foreground/50"
          />
        ))}
      </div>
    </motion.div>
  );
}
