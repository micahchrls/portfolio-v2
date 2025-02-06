import { motion } from "framer-motion";
import { Message } from "./types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { forwardRef } from "react";

interface ChatMessageProps {
  message: Message;
  isLastMessage?: boolean;
}

const messageVariants = {
  hidden: { 
    opacity: 0,
    y: 10,
    scale: 0.95,
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    }
  }
};

const bubbleVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25,
    }
  }
};

interface ChatBubbleProps {
  children: React.ReactNode;
  isAssistant: boolean;
  className?: string;
}

const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ children, isAssistant, className }, ref) => (
    <motion.div
      ref={ref}
      variants={bubbleVariants}
      initial="initial"
      animate="animate"
      className={cn(
        "rounded-2xl px-3.5 py-2 shadow-sm backdrop-blur-sm transition-colors duration-200 mt-2",
        isAssistant
          ? "bg-muted/50 hover:bg-muted/70 rounded-bl-none"
          : "bg-primary/90 hover:bg-primary text-primary-foreground rounded-br-none",
        className
      )}
    >
      {children}
    </motion.div>
  )
);
ChatBubble.displayName = "ChatBubble";

const UserAvatar = () => (
  <div className="relative">
    <Avatar className="h-6 w-6 ring-2 ring-background">
      <AvatarImage src="/avatar.jpeg" alt="Micah" />
      <AvatarFallback>ML</AvatarFallback>
    </Avatar>
    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
  </div>
);

export function ChatMessage({ message, isLastMessage = false }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "flex w-full",
        isAssistant ? "justify-start" : "justify-end",
        isLastMessage && "mb-4"
      )}
    >
      <div 
        className={cn(
          "flex items-end gap-2 max-w-[80%] group",
          !isAssistant && "flex-row-reverse"
        )}
      >
        {isAssistant && <UserAvatar />}
        <ChatBubble isAssistant={isAssistant}>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-[13px] leading-[1.6] tracking-[-0.01em] font-normal break-words"
            >
              {message.content}
            </motion.div>
            <motion.div
              className="absolute -bottom-3.5 left-0 text-[10px] text-muted-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </motion.div>
          </div>
        </ChatBubble>
      </div>
    </motion.div>
  );
}
