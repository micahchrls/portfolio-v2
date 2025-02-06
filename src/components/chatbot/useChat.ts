import { useState, useCallback, useEffect, useMemo } from "react";
import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";
import { ChatState, Message, safetySettings } from "@/components/chatbot/types";
import { PERSONAL_CONTEXT } from "@/components/chatbot/constants";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Hi! 👋 I'm Micah's AI assistant. Ask me anything about his work or tech experience!",
  id: "welcome",
  timestamp: Date.now(),
};

export const useChat = () => {
  const [state, setState] = useState<ChatState>({
    messages: [WELCOME_MESSAGE],
    isLoading: false,
    error: null,
  });

  const model = useMemo(() => {
    if (typeof window === "undefined") return null;
    if (!GEMINI_API_KEY) {
      console.error("Gemini API key is missing");
      setState(prev => ({ ...prev, error: "API key is missing. Please check your environment variables." }));
      return null;
    }

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      return genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to initialize Gemini model";
      console.error("Failed to initialize Gemini model:", error);
      setState(prev => ({ ...prev, error: errorMessage }));
      return null;
    }
  }, []);

  const [chat, setChat] = useState<ChatSession | null>(null);

  useEffect(() => {
    if (!model) {
      return;
    }

    const initChat = async () => {
      try {
        const newChat = model.startChat({
          safetySettings,
          generationConfig: {
            temperature: 0.8,  // Slightly increased for more natural responses
            topK: 40,         // Increased for more diverse vocabulary
            topP: 0.95,       // Slightly increased for more creative responses
            maxOutputTokens: 1024, // Reduced to encourage concise responses
          },
        });

        await newChat.sendMessage(PERSONAL_CONTEXT);
        setChat(newChat);
        setState(prev => ({ ...prev, error: null }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to initialize chat";
        console.error("Failed to initialize chat with personal context:", error);
        setState(prev => ({ ...prev, error: errorMessage }));
      }
    };

    initChat();
  }, [model]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!model || !chat) {
        setState(prev => ({
          ...prev,
          error: "Chat is not ready. Please try again in a moment.",
        }));
        return;
      }

      setState(prev => ({ ...prev, isLoading: true, error: null }));
      setState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { role: "user", content, id: Date.now().toString(), timestamp: Date.now() },
        ],
      }));

      try {
        const result = await chat.sendMessage(content);
        const response = await result.response;
        const text = response.text();

        // Check if the response indicates uncertainty or lack of knowledge
        if (text.toLowerCase().includes("i don't know") || 
            text.toLowerCase().includes("i am not sure") || 
            text.toLowerCase().includes("i cannot help") ||
            text.toLowerCase().includes("i do not have access") ||
            text.toLowerCase().includes("i apologize")) {
          throw new Error("I'm not quite sure about that, but I can tell you about Micah's work in healthcare systems, education technology, or his technical skills. What would you like to know?");
        }

        // Clean up response text
        let cleanedText = text
          .replace(/^(As an AI assistant|As Micah's AI assistant|Let me|I would|I can|I am|I'm happy to)/i, '')
          .replace(/\n{3,}/g, '\n\n')
          .trim();

        // Ensure response starts with a capital letter
        cleanedText = cleanedText.charAt(0).toUpperCase() + cleanedText.slice(1);

        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: null,
          messages: [
            ...prev.messages,
            {
              role: "assistant",
              content: cleanedText,
              id: Date.now().toString(),
              timestamp: Date.now(),
            },
          ],
        }));
      } catch (error) {
        console.error("Failed to get response:", error);
        const errorMessage = error instanceof Error ? error.message : 
          "I encountered an issue processing your request. Please try asking about something else, like my technical skills or work experience!";
        
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
      }
    },
    [model, chat]
  );

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
  };
};
