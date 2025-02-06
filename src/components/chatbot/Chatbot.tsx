import { useState, useCallback, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "./useChat";
import { ChatMessage } from "./ChatMessage";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";

const chatVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    x: "100%",
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    x: "100%",
    transition: {
      duration: 0.2,
    },
  },
};

const buttonVariants = {
  initial: { 
    scale: 1,
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
  },
  hover: { 
    scale: 1.05,
    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  tap: { 
    scale: 0.95,
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
  },
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const labelVariants = {
  initial: { opacity: 0, x: -20 },
  hover: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, isLoading, error, sendMessage } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTo({
        top: scrollArea.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0 || isLoading) {
      scrollToBottom();
    }
  }, [messages, isLoading, scrollToBottom]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    
    try {
      await sendMessage(input.trim());
      setInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }, [input, isLoading, sendMessage]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/5 backdrop-blur-[2px] z-40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              variants={chatVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <Card className="w-[380px] sm:w-[380px] w-full h-[85vh] sm:h-auto max-h-[600px] shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 fixed bottom-0 right-0 sm:relative sm:bottom-auto sm:right-auto">
                <ChatHeader onClose={() => setIsOpen(false)} />
                <CardContent className="p-3 sm:p-6">
                  <ScrollArea 
                    ref={scrollAreaRef}
                    className="h-[calc(100%-80px)] pr-4 mb-4"
                  >
                    <div className="space-y-4 min-h-full">
                      <AnimatePresence initial={false}>
                        {messages.map((message, index) => (
                          <ChatMessage
                            key={message.id}
                            message={message}
                            isLastMessage={index === messages.length - 1}
                          />
                        ))}
                        {isLoading && <TypingIndicator />}
                      </AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex justify-center"
                        >
                          <div className="text-sm text-destructive">{error}</div>
                        </motion.div>
                      )}
                    </div>
                  </ScrollArea>
                  <ChatInput
                    value={input}
                    onChange={setInput}
                    onSend={handleSendMessage}
                    onKeyDown={handleKeyPress}
                    isLoading={isLoading}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              <motion.div
                variants={buttonVariants}
                initial="initial"
                animate="float"
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  onClick={() => setIsOpen(true)}
                  variant="secondary"
                  className="rounded-full px-4 sm:px-6 h-12 sm:h-14 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 font-medium"
                >
                  <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                  <span className="hidden sm:inline">Chat with Micah!</span>
                  <span className="sm:hidden">Chat</span>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
