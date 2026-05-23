export interface Certification {
  name: string;
  issuer: string;
  issuedDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
}

export const certifications: Certification[] = [
  {
    name: "Claude 101",
    issuer: "Anthropic",
    issuedDate: "Mar 2026",
    credentialId: "xxmp9z9tqppz",
    credentialUrl: "https://verify.skilljar.com/c/xxmp9z9tqppz",
    skills: ["Claude", "Prompt Engineering", "LLM Integration"],
  },
  {
    name: "AI Fluency Framework & Foundations",
    issuer: "Anthropic",
    issuedDate: "Mar 2026",
    credentialId: "m2jzusoi4766",
    credentialUrl: "https://verify.skilljar.com/c/m2jzusoi4766",
    skills: ["AI Literacy", "LLM Fundamentals", "Prompt Engineering"],
  },
  {
    name: "Claude Code in Action",
    issuer: "Anthropic",
    issuedDate: "Mar 2026",
    credentialId: "otvgzvj6h6xi",
    credentialUrl: "https://verify.skilljar.com/c/otvgzvj6h6xi",
    skills: ["Claude Code", "AI-Augmented Development", "Agentic Workflows"],
  },
  {
    name: "Claude Code 101",
    issuer: "Anthropic",
    issuedDate: "Apr 2026",
    credentialId: "qv2etaottjgw",
    credentialUrl: "https://verify.skilljar.com/c/qv2etaottjgw",
    skills: ["Claude Code", "AI Tooling", "CLI"],
  },
  {
    name: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    issuedDate: "Apr 2026",
    credentialId: "y83gcqna2psj",
    credentialUrl: "https://verify.skilljar.com/c/y83gcqna2psj",
    skills: ["MCP", "Claude", "AI Integration"],
  },
];
