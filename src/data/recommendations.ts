export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Micah is an exceptional professional with deep backend development expertise. He writes clean, efficient code and has a strong focus on optimization. His effective communication and positive collaborative approach make him a valuable team member.",
    name: "Rhaidszal Ali",
    designation: "Senior Frontend Software Engineer at X-Team ",
    src: "/ali.jpg",
  },
  {
    quote: "Micah is a great software developer who excels at solving complex problems and shows deep passion for his craft. I witnessed his capabilities when i was interning in their company.",
    name: "Shan Umbong",
    designation: "Web Developer at Emergence Systems and Solutions",
    src: "/umbong.jpg",
  },
];
