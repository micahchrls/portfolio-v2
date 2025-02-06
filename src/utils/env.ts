declare global {
  interface Window {
    __env?: {
      NEXT_PUBLIC_GEMINI_API_KEY?: string;
    };
  }
}

export const getEnvVariable = (key: string): string | undefined => {
  if (typeof window !== 'undefined') {
    return window.__env?.[key as keyof typeof window.__env];
  }
  return process.env[key];
};
