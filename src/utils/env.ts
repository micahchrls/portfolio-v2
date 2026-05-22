export const getEnvVariable = (key: string): string | undefined => {
  return (import.meta as unknown as { env: Record<string, string> }).env[key];
};
