import { motion } from "framer-motion";

const TypingAnimation = () => {
  return (
    <div className="flex items-center space-x-2 p-2">
      <motion.div
        className="w-2 h-2 bg-gray-400 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: 0,
        }}
      />
      <motion.div
        className="w-2 h-2 bg-gray-400 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: 0.2,
        }}
      />
      <motion.div
        className="w-2 h-2 bg-gray-400 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: 0.4,
        }}
      />
    </div>
  );
};

export default TypingAnimation;
