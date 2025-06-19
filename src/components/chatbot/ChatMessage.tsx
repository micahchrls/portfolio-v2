import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import { Message } from "@/components/chatbot/types";
import { UserAvatar } from "@/components/chatbot/Avatar";

interface ChatBubbleProps {
  children: React.ReactNode;
  isAssistant: boolean;
}

interface ChatMessageProps {
  message: Message;
  isLastMessage?: boolean;
}

function ChatBubble({ children, isAssistant }: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "px-4 py-3 rounded-xl relative",
        isAssistant
          ? "bg-gray-100 dark:bg-neutral-800 text-black dark:text-white"
          : "bg-black text-white dark:bg-white dark:text-black"
      )}
    >
      {children}
    </div>
  );
}

export function ChatMessage({ message, isLastMessage = false }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={cn(
        "flex w-full",
        isAssistant ? "justify-start" : "justify-end",
        isLastMessage && "mb-4"
      )}
    >
      <div 
        className={cn(
          "flex items-end gap-2 max-w-[80%] md:max-w-[75%] group",
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
              className="text-[13px] md:text-[14px] leading-[1.6] tracking-[-0.01em] font-normal break-words markdown-content"
            >
              {isAssistant ? (
                <ReactMarkdown 
                  components={{
                    ul: ({node, ...props}) => (
                      <ul className="pl-5 list-disc space-y-1 my-1" {...props} />
                    ),
                    ol: ({node, ...props}) => (
                      <ol className="pl-5 list-decimal space-y-1 my-1" {...props} />
                    ),
                    li: ({node, ...props}) => (
                      <li className="my-0.5" {...props} />
                    ),
                    p: ({node, ...props}) => (
                      <p className="my-1.5" {...props} />
                    ),
                    h1: ({node, ...props}) => (
                      <h1 className="text-lg font-semibold my-2" {...props} />
                    ),
                    h2: ({node, ...props}) => (
                      <h2 className="text-md font-semibold my-2" {...props} />
                    ),
                    h3: ({node, ...props}) => (
                      <h3 className="font-semibold my-1.5" {...props} />
                    ),
                    a: ({node, href, ...props}) => (
                      <a 
                        href={href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        {...props} 
                      />
                    ),
                    strong: ({node, ...props}) => (
                      <strong className="font-semibold" {...props} />
                    ),
                    code: ({node, className, ...props}: any) => {
                      const isInline = (props as any).inline;
                      return isInline ? 
                        <code className="bg-gray-200 dark:bg-neutral-700 px-1 py-0.5 rounded text-xs font-mono" {...props} /> :
                        <code className="block bg-gray-200 dark:bg-neutral-700 p-2 rounded text-xs font-mono my-2 overflow-x-auto" {...props} />
                    },
                    pre: ({node, ...props}) => (
                      <pre className="bg-gray-200 dark:bg-neutral-700 p-2 rounded my-2 overflow-x-auto" {...props} />
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              ) : (
                message.content
              )}
            </motion.div>
          </div>
        </ChatBubble>
      </div>
    </motion.div>
  );
}
