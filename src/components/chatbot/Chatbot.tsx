import { useState, useCallback, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "./useChat";
import { ChatMessage } from "./ChatMessage";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { SuggestedQuestion } from "@/components/chatbot/SuggestedQuestion";
import { UserAvatar } from "@/components/chatbot/Avatar";

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
    // boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
  },
  hover: { 
    scale: 1.05,
    // boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  tap: { 
    scale: 0.95,
    // boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
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
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const [welcomeVisible, setWelcomeVisible] = useState(true);

  // Auto-hide welcome after 5 seconds
  useEffect(() => {
    if (isOpen && welcomeVisible) {
      const timer = setTimeout(() => {
        setWelcomeVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, welcomeVisible]);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    if (messagesEndRef.current && shouldAutoScroll) {
      messagesEndRef.current.scrollIntoView({
        behavior,
        block: "end",
      });
    }
  }, [shouldAutoScroll]);

  // Handle scroll events to determine if user has manually scrolled up
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const isScrolledToBottom = 
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) < 50;
    
    setShouldAutoScroll(isScrolledToBottom);
    setShowScrollButton(!isScrolledToBottom);
  }, []);

  // Scroll to bottom on new messages or loading state change
  useEffect(() => {
    if (messages.length > 0 || isLoading) {
      scrollToBottom();
    }
  }, [messages, isLoading, scrollToBottom]);

  // Use MutationObserver to detect content changes in the chat area
  useEffect(() => {
    if (isOpen && scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      
      if (scrollElement) {
        // Disconnect previous observer if it exists
        if (observerRef.current) {
          observerRef.current.disconnect();
        }

        // Create new observer
        observerRef.current = new MutationObserver((_mutations) => {
          if (shouldAutoScroll) {
            scrollToBottom("smooth");
          }
        });

        // Start observing
        observerRef.current.observe(scrollElement, {
          childList: true,
          subtree: true,
          attributes: false,
          characterData: true
        });
      }

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
  }, [isOpen, shouldAutoScroll, scrollToBottom]);

  // Initial scroll and window resize handler
  useEffect(() => {
    if (isOpen) {
      scrollToBottom("auto");
      const handleResize = () => scrollToBottom("auto");
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isOpen, scrollToBottom]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    
    try {
      setShouldAutoScroll(true); // Reset auto-scroll when sending new message
      setShowScrollButton(false);
      await sendMessage(input.trim());
      setInput("");
      scrollToBottom();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }, [input, isLoading, sendMessage, scrollToBottom]);

  const handleScrollToBottom = () => {
    setShouldAutoScroll(true);
    setShowScrollButton(false);
    scrollToBottom();
  };

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
              <Card className="w-[380px] h-[600px] shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 fixed bottom-0 right-0 sm:relative sm:bottom-auto sm:right-auto overflow-hidden">
                <ChatHeader
                  onClose={() => setIsOpen(false)}
                  onClear={clearMessages}
                />
                <CardContent className="p-0">
                  <ScrollArea 
                    ref={scrollAreaRef}
                    className="h-[calc(600px-64px-80px)] chat-messages-container px-4"
                    onScroll={handleScroll}
                  >
                    <AnimatePresence mode="sync">
                      {messages.length <= 1 && welcomeVisible && (
                        <motion.div 
                          className="flex flex-col items-center justify-center py-8 px-4 text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ 
                            duration: 0.75,
                            ease: "easeInOut"
                          }}
                          key="welcome-screen"
                        >
                          <div className="mb-4">
                            <UserAvatar />
                          </div>
                          
                          <h3 className="text-lg font-medium mb-2">
                            Hi, I'm Micah's AI Assistant
                          </h3>
                          
                          <p className="text-sm text-muted-foreground mb-4">
                            Ask me anything about Micah's skills, experience, or projects!
                          </p>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="rounded-full"
                            onClick={() => setWelcomeVisible(false)}
                          >
                            Start chatting
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div className="py-4 mb-4 space-y-4">
                      <AnimatePresence initial={false} mode="popLayout">
                        {messages.map((message, index) => (
                          <div
                            key={message.id}
                            ref={index === messages.length - 1 ? lastMessageRef : null}
                          >
                            <ChatMessage
                              message={message}
                              isLastMessage={index === messages.length - 1}
                            />
                          </div>
                        ))}
                        {isLoading && (
                          <div ref={lastMessageRef}>
                            <TypingIndicator />
                          </div>
                        )}
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
                      <div ref={messagesEndRef} style={{ height: 1, visibility: 'hidden', opacity: 0 }} />
                    </div>
                    
                    {/* Suggested Questions - Show only when no messages or just welcome message */}
                    {messages.length <= 1 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="px-4 pb-4"
                      >
                        <div className="text-sm text-muted-foreground mb-2 mt-2">Here are some things you can ask me:</div>
                        <div className="flex flex-wrap gap-2">
                          <SuggestedQuestion 
                            onClick={() => {
                              setInput("Tell me about your work experience");
                              setTimeout(() => handleSendMessage(), 0);
                            }}
                          >
                            Work experience
                          </SuggestedQuestion>
                          <SuggestedQuestion 
                            onClick={() => {
                              setInput("What are your technical skills?");
                              setTimeout(() => handleSendMessage(), 0);
                            }}
                          >
                            Technical skills
                          </SuggestedQuestion>
                          <SuggestedQuestion 
                            onClick={() => {
                              setInput("Tell me about your projects");
                              setTimeout(() => handleSendMessage(), 0);
                            }}
                          >
                            Projects
                          </SuggestedQuestion>
                          <SuggestedQuestion 
                            onClick={() => {
                              setInput("How can I contact you?");
                              setTimeout(() => handleSendMessage(), 0);
                            }}
                          >
                            Contact info
                          </SuggestedQuestion>
                        </div>
                      </motion.div>
                    )}
                  </ScrollArea>
                  
                  {showScrollButton && (
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-[88px] right-4 z-10 rounded-full h-8 w-8 p-0 shadow-md"
                      onClick={handleScrollToBottom}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t">
                    <ChatInput
                      value={input}
                      onChange={setInput}
                      onSend={handleSendMessage}
                      onKeyDown={handleKeyPress}
                      isLoading={isLoading}
                    />
                  </div>
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
