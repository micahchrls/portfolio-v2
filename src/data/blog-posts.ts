export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  slug: string;
  readTime: string;
  content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Optimizing Laravel Database Queries for Healthcare Applications",
    excerpt: "Learn how proper query optimization techniques reduced report generation time by 60% in a hospital management system.",
    date: "June 15, 2025",
    tags: ["Laravel", "MySQL", "Optimization", "Healthcare"],
    slug: "optimizing-laravel-queries-healthcare",
    readTime: "5 min read",
    content: "Coming soon..."
  },
  {
    id: "2",
    title: "Integrating PNPKI Digital Signatures in Laravel Applications",
    excerpt: "A step-by-step guide to implementing secure digital signatures in your PHP applications using PNPKI.",
    date: "May 28, 2025",
    tags: ["Laravel", "Security", "PNPKI", "Digital Signatures"],
    slug: "pnpki-digital-signatures-laravel",
    readTime: "7 min read",
    content: "Coming soon..."
  },
  {
    id: "3",
    title: "Modern Full-Stack Architecture with Laravel and React",
    excerpt: "Exploring the architecture decisions behind CentroSys, a pharmacy inventory system built with Laravel and React.",
    date: "April 10, 2025",
    tags: ["Laravel", "React", "Architecture", "TypeScript"],
    slug: "modern-fullstack-laravel-react",
    readTime: "6 min read",
    content: "Coming soon..."
  },
];
