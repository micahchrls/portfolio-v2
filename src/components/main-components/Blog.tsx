import { motion } from "framer-motion";
import { blogPosts } from "@/data/blog-posts";
import { ArrowUpRight, Clock } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface BlogCardProps {
  post: typeof blogPosts[0];
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => { // Removed unused 'index' parameter
  return (
    <motion.div
      variants={item}
      className="group relative rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
    >
      <div className="flex flex-col h-full">
        <div className="mb-2 flex items-center gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-1 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 flex-grow">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-zinc-500 dark:text-zinc-400" />
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{post.readTime}</span>
          </div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{post.date}</span>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-zinc-800/80 dark:bg-zinc-200/80 text-white dark:text-zinc-900 rounded-full p-2">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Blog() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      id="blog"
      className="mb-32 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Technical Articles"
    >
      <motion.div
        variants={item}
        className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
      >
        <motion.h2
          variants={item}
          className="text-sm font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200 lg:sr-only"
        >
          Technical Articles
        </motion.h2>
      </motion.div>

      <motion.div variants={item} className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 hidden lg:block">Technical Articles</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2 hidden lg:block">
          Insights and tutorials from my experience in backend development and system architecture
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {blogPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>
      
      <motion.div variants={item} className="flex justify-center mt-12">
        <a 
          href="#" 
          className="group inline-flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <span>View All Articles</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </motion.div>
    </motion.section>
  );
}
