import { motion } from "framer-motion";
import { UserAvatar } from "./Avatar";

const dotVariants = {
  initial: { y: 0 },
  animate: { y: -5 },
};

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-end gap-2"
    >
      <div className="relative">
        <UserAvatar />
      </div>
      <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-muted/50 backdrop-blur-sm rounded-bl-none">
        <div className="flex space-x-1.5">
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
              className="w-2 h-2 rounded-full bg-foreground/70"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
