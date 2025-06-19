import { useState, useCallback, useEffect, useMemo } from "react";
import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";
import { ChatState, Message, safetySettings } from "@/components/chatbot/types";
import { PERSONAL_CONTEXT, QUERY_PATTERNS, SAMPLE_RESPONSES } from "@/components/chatbot/constants";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Hi! 👋 I'm Micah's AI assistant. How can I help you today?",
  id: "welcome",
  timestamp: Date.now(),
};

// Detect conversation intent for better responses
const detectIntent = (query: string): string => {
  query = query.toLowerCase();
  
  // Check through all defined patterns
  for (const [intent, patterns] of Object.entries(QUERY_PATTERNS)) {
    if (patterns.some(pattern => query.includes(pattern))) {
      return intent;
    }
  }
  
  return "";
};

// Extract key conversation topics
const extractTopics = (content: string, conversationContext: string): string => {
  const topicKeywords = [
    "php", "laravel", "react", "javascript", "typescript", 
    "project", "work", "experience", "education", "skills", 
    "database", "api", "backend", "frontend", "development",
    "teaching", "professor", "zamboanga", "portfolio"
  ];
  
  const contentLower = content.toLowerCase();
  const newTopics = topicKeywords.filter(topic => contentLower.includes(topic));
  
  // Combine with existing context, avoiding duplicates
  const existingTopics = conversationContext.split(',').filter(t => t.trim());
  const allTopics = [...new Set([...existingTopics, ...newTopics])];
  
  // Limit to 5 most recent topics
  return allTopics.slice(-5).join(',');
};

// Add natural language variations to make responses more conversational
const addConversationalElements = (text: string, query: string): string => {
  // Don't modify text that's already short
  if (text.length < 50) return text;
  
  const isQuestion = query.includes('?');
  const isGreeting = /^(hi|hello|hey|greetings|howdy)/i.test(query);
  const isThankYou = /thank|thanks/i.test(query);
  
  // Personalized conversation starters based on query type
  if (isGreeting) {
    const greetings = [
      "Hey there! ",
      "Hi! Great to chat with you. ",
      "Hello! Thanks for reaching out. "
    ];
    return greetings[Math.floor(Math.random() * greetings.length)] + text;
  }
  
  if (isThankYou) {
    const endings = [
      "\n\nIs there anything else you'd like to know?",
      "\n\nHappy to help! Let me know if you have other questions.",
      "\n\nGlad I could help. Feel free to ask about anything else!"
    ];
    return text + endings[Math.floor(Math.random() * endings.length)];
  }
  
  if (isQuestion) {
    const starters = [
      "Great question! ",
      "I'd be happy to explain. ",
      "Definitely! ",
      "Sure, I can help with that. "
    ];
    return starters[Math.floor(Math.random() * starters.length)] + text;
  }
  
  return text;
};

export const useChat = () => {
  const [state, setState] = useState<ChatState>({
    messages: [WELCOME_MESSAGE],
    isLoading: false,
    error: null,
  });

  // Track conversation context for better follow-up responses
  const [conversationContext, setConversationContext] = useState<string>("");
  const [conversationMood, setConversationMood] = useState<"neutral" | "technical" | "casual">("neutral");
  
  // Track how many exchanges have happened to adjust response style
  const [exchangeCount, setExchangeCount] = useState<number>(0);

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
            temperature: 0.7,         // Slightly lower for more focused responses
            topK: 40,                 // Keep diverse vocabulary
            topP: 0.90,               // Slightly more controlled responses
            maxOutputTokens: 1024,    // Allow sufficient length for detailed answers
            stopSequences: ["User:"], // Prevent model from creating fake dialog
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
      
      // Update exchange counter
      setExchangeCount(prev => prev + 1);
      
      // Analyze if the conversation is becoming technical or casual
      if (content.includes('code') || content.includes('programming') || 
          content.includes('develop') || content.includes('technical')) {
        setConversationMood('technical');
      } else if (content.length < 20 || content.includes('thanks') || content.includes('hello')) {
        setConversationMood('casual');
      }

      try {
        // Extract conversation context from recent messages
        const recentMessages = state.messages.slice(-3);
        let contextualPrompt = content;
        
        // Detect conversation intent
        const intent = detectIntent(content);
        
        // If we have a matching template for common questions, use it to guide the response
        if (intent && SAMPLE_RESPONSES[intent as keyof typeof SAMPLE_RESPONSES]) {
          contextualPrompt = `The user is asking about ${intent}. 
Use this response format as a guide, but customize it to the specific question:
${SAMPLE_RESPONSES[intent as keyof typeof SAMPLE_RESPONSES]}

Now respond to: ${content}`;
        }
        // Add context from recent conversation if available
        else if (recentMessages.length > 1) {
          const context = recentMessages
            .map(msg => `${msg.role === 'user' ? 'User' : 'Micah'}: ${msg.content}`)
            .join('\n');
          
          // Track conversation topics to improve follow-up responses
          setConversationContext(extractTopics(content, conversationContext));
          
          // For follow-up questions, add context
          if ((content.length < 60 && !content.includes('?')) || 
              content.includes('what about') || 
              content.includes('how about') || 
              content.includes('and')) {
            contextualPrompt = `Given the recent conversation context: 
${context}

And considering the topics we've been discussing: ${conversationContext || "general information"}

The conversation tone is: ${conversationMood}

Respond to: ${content}

Keep your response ${conversationMood === 'technical' ? 'detailed and technically precise' : 'friendly and conversational'}. 
${exchangeCount > 3 ? "Since we've been talking for a while, you can be more casual and friendly." : ""}`;
          }
        }
        
        const result = await chat.sendMessage(contextualPrompt);
        const response = await result.response;
        const text = response.text();

        // Check if the response indicates uncertainty or lack of knowledge
        if (text.toLowerCase().includes("i don't know") || 
            text.toLowerCase().includes("i am not sure") || 
            text.toLowerCase().includes("i cannot help") ||
            text.toLowerCase().includes("i do not have access") ||
            text.toLowerCase().includes("i apologize")) {
          throw new Error("I don't have enough information about that specific topic in my knowledge base. I can tell you about my work experience, technical skills, or projects instead. What would you like to know?");
        }

        // Clean up response text
        let cleanedText = text
          // Remove common AI self-references
          .replace(/^(As an AI assistant|As Micah's AI assistant|Let me|I would|I can|I am|I'm happy to)/i, '')
          // Remove repeating newlines
          .replace(/\n{3,}/g, '\n\n')
          // Replace common hallucinated phrasing
          .replace(/As Micah, I can tell you that/gi, '')
          .replace(/Based on my experience/gi, 'Based on Micah\'s experience')
          .trim();

        // Enhanced formatting for markdown and lists
        cleanedText = cleanedText
          // Fix bullet points that might be malformed (no space after asterisk)
          .replace(/\n\*([\w])/g, '\n* $1')
          // Ensure proper spacing after bullet points
          .replace(/\n\* ([^\n]+)(?!\n)/g, '\n* $1\n')
          // Add proper spacing between bullet point items if missing
          .replace(/\n\* ([^\n]+)\n\* /g, '\n* $1\n\n* ')
          // Fix numbering in ordered lists
          .replace(/\n(\d+)\.([^\s])/g, '\n$1. $2')
          // Format code blocks properly
          .replace(/```(\w+)\n/g, '```$1\n')
          // Ensure proper code block closure
          .replace(/([^`])\n\s*```/g, '$1\n```');

        // Ensure response starts with a capital letter
        cleanedText = cleanedText.charAt(0).toUpperCase() + cleanedText.slice(1);

        // Add conversational elements based on the query and conversation state
        cleanedText = addConversationalElements(cleanedText, content);
        
        // Check for contact information requests and add contact details if needed
        const contactPattern = /(contact|reach|email|message|connect|get in touch|linkedin|github)/i;
        if (contactPattern.test(content.toLowerCase()) && !cleanedText.includes('micahmustaham@gmail.com')) {
          // Make sure we include contact information when users ask for it
          const contactInfo = `\n\nYou can reach me through:\n\n* **Email:** [micahmustaham@gmail.com](mailto:micahmustaham@gmail.com)\n* **LinkedIn:** [linkedin.com/in/micah-mustaham](https://www.linkedin.com/in/micah-mustaham)\n* **GitHub:** [github.com/micahchlrs](https://github.com/micahchlrs)\n* **Portfolio:** [micahchrls.vercel.app](https://micahchrls.vercel.app)`;
          
          if (!cleanedText.toLowerCase().includes('email') || !cleanedText.toLowerCase().includes('linkedin')) {
            cleanedText += contactInfo;
          }
        }
        
        // Check for specific domain inquiries and enhance responses
        if (cleanedText.toLowerCase().includes('project') || cleanedText.toLowerCase().includes('work')) {
          // Add subtle call-to-action for portfolio related questions
          if (!cleanedText.includes('portfolio') && !cleanedText.includes('micahchrls.vercel.app')) {
            cleanedText += '\n\nFor more details, you can visit my linked in profile at [Micah Mustaham](https://www.linkedin.com/in/micah-mustaham/)';
          }
        }

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
    [model, chat, conversationContext, conversationMood, exchangeCount]
  );

  const clearMessages = useCallback(async () => {
    setState(prev => ({ ...prev, messages: [WELCOME_MESSAGE], isLoading: false, error: null }));
    setConversationContext("");
    setConversationMood("neutral");
    setExchangeCount(0);
    
    if (model) {
      try {
        const newChat = model.startChat({
          safetySettings,
          generationConfig: {
            temperature: 0.7,         // Slightly lower for more focused responses
            topK: 40,                 // Keep diverse vocabulary
            topP: 0.90,               // Slightly more controlled responses
            maxOutputTokens: 1024,    // Allow sufficient length for detailed answers
            stopSequences: ["User:"], // Prevent model from creating fake dialog
          },
        });
        await newChat.sendMessage(PERSONAL_CONTEXT);
        setChat(newChat);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to reset chat";
        setState(prev => ({ ...prev, error: errorMessage }));
      }
    }
  }, [model]);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    clearMessages,
  };
};
