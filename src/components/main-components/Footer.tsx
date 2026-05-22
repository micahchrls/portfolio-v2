const techStack = [
  { label: "Vite", url: "https://vitejs.dev/" },
  { label: "React", url: "https://react.dev/" },
  { label: "Tailwind CSS", url: "https://tailwindcss.com/" },
  { label: "shadcn/ui", url: "https://ui.shadcn.com/" },
  { label: "Framer Motion", url: "https://www.framer.com/motion/" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mb-16 pb-16 sm:pb-0">
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
        {/* Built with */}
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 mb-6">
          <span className="text-xs text-zinc-400 dark:text-zinc-600 mr-1">Built with</span>
          {techStack.map((tech, i) => (
            <span key={tech.label} className="inline-flex items-center gap-1.5">
              <a
                href={tech.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs font-medium text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                {tech.label}
              </a>
              {i < techStack.length - 1 && (
                <span className="text-zinc-300 dark:text-zinc-700">·</span>
              )}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            © {year} Micah Mustaham
          </p>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="text-xs text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
