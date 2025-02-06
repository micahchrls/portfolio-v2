import { useState, useCallback, useEffect, useMemo } from "react";
import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";
import { ChatState, Message, safetySettings } from "./types";
import { PERSONAL_CONTEXT } from "./constants";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Hi there! 👋 Thanks for visiting my website. Feel free to ask me anything about programming, web development, or my experiences in tech. Let me know how I can help!",
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
      return genAI.getGenerativeModel({ model: "gemini-pro" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to initialize Gemini model";
      console.error("Failed to initialize Gemini model:", error);
      setState(prev => ({ ...prev, error: errorMessage }));
      return null;
    }
  }, []);

  const [chat, setChat] = useState<ChatSession | null>(null);

  useEffect(() => {
    if (!model) return;

    const initChat = async () => {
      try {
        const newChat = model.startChat({
          safetySettings,
          generationConfig: {
            temperature: 0.7,
            topK: 20,
            topP: 0.9,
            maxOutputTokens: 2048,
          },
        });

        await newChat.sendMessage(PERSONAL_CONTEXT);
        setChat(newChat);
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
          error: "Chat is not initialized. Please try again.",
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        isLoading: true,
        isTyping: true,
        error: null,
        messages: [
          ...prev.messages,
          { role: "user", content, id: Date.now().toString(), timestamp: Date.now() },
        ],
      }));

      try {
        const result = await chat.sendMessage(content);
        const response = await result.response;
        const text = await response.text();

        setState((prev) => ({
          ...prev,
          isLoading: false,
          isTyping: false,
          error: null,
          messages: [
            ...prev.messages,
            {
              role: "assistant",
              content: text,
              id: Date.now().toString(),
              timestamp: Date.now(),
            },
          ],
        }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to send message";
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isTyping: false,
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
