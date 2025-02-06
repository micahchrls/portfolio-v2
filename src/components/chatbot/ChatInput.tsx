import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
}

const buttonVariants = {
  initial: { 
    scale: 1,
  },
  hover: { 
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { 
    scale: 0.95,
  }
};

const iconVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.1,
    rotate: [0, -10, 10, -10, 0],
    transition: {
      rotate: {
        duration: 0.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      },
      scale: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }
};

export function ChatInput({
  value,
  onChange,
  onSend,
  onKeyDown,
  isLoading,
}: ChatInputProps) {
  return (
    <div className="flex gap-2 px-0.5">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Type your message..."
        disabled={isLoading}
        className="focus-visible:ring-1 bg-background/50 backdrop-blur-sm border-zinc-200/50 dark:border-zinc-800/50 h-10 sm:h-11 text-sm sm:text-base"
      />
      <motion.div
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        <Button
          onClick={onSend}
          disabled={isLoading}
          size="icon"
          className="relative shrink-0 bg-primary/90 hover:bg-primary transition-all duration-200 h-10 w-10 sm:h-11 sm:w-11"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                <Loader2 className="h-4 w-4 animate-spin" />
              </motion.div>
            ) : (
              <motion.div
                key="send"
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                className="flex items-center justify-center"
              >
                <Send className="h-4 w-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  );
}
