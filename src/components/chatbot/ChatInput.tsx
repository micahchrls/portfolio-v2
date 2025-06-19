import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, SmileIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

// Common emojis for quick access
const commonEmojis = ["👋", "👍", "🙌", "🤔", "💡", "🚀", "👨‍💻", "📱", "💻", "🎨", "🔥", "✅"];

export function ChatInput({
  value,
  onChange,
  onSend,
  onKeyDown,
  isLoading,
}: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [placeholderText, setPlaceholderText] = useState("Type your message...");

  // Cycling through different placeholder texts
  useEffect(() => {
    const placeholders = [
      "Type your message...",
      "Ask about my skills...",
      "Ask about my projects...",
      "Ask how to contact me..."
    ];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % placeholders.length;
      setPlaceholderText(placeholders[currentIndex]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Focus input when user clicks emoji
  const focusInputAfterEmoji = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };
  
  // Insert emoji at current cursor position
  const insertEmoji = (emoji: string) => {
    if (inputRef.current) {
      const startPos = inputRef.current.selectionStart || 0;
      const endPos = inputRef.current.selectionEnd || 0;
      const newValue = value.substring(0, startPos) + emoji + value.substring(endPos);
      onChange(newValue);
      
      // Set cursor position after emoji
      setTimeout(() => {
        if (inputRef.current) {
          const newCursorPos = startPos + emoji.length;
          inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
          inputRef.current.focus();
        }
      }, 10);
    } else {
      onChange(value + emoji);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-full shrink-0 text-muted-foreground hover:text-foreground"
            >
              <SmileIcon className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full max-w-[220px] p-2" side="top">
            <div className="flex flex-wrap gap-2 justify-center">
              {commonEmojis.map((emoji) => (
                <Button
                  key={emoji}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    insertEmoji(emoji);
                    focusInputAfterEmoji();
                  }}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <div className="relative flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={placeholderText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute pointer-events-none"
            >
              {value === "" && (
                <span className="text-muted-foreground/50 text-sm pl-3 pt-[9px] sm:pt-[11px]">
                  {placeholderText}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
          <Input
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder=""
            disabled={isLoading}
            className="focus-visible:ring-1 bg-background/50 backdrop-blur-sm border-zinc-200/50 dark:border-zinc-800/50 h-10 sm:h-11 text-sm sm:text-base pr-12"
          />
          {value.length > 0 && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {value.length}
            </div>
          )}
        </div>

        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            onClick={onSend}
            disabled={isLoading || value.trim() === ''}
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
    </div>
  );
}
