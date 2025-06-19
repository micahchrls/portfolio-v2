const Footer = () => {
  return (
    <footer className=" mb-16 flex flex-col items-start gap-4 pb-16 text-sm text-slate-500/80 sm:pb-0">
      <div className="flex max-w-2xl flex-col gap-4">
        <p className="leading-relaxed">
          Designed and coded with passion by yours truly. Built with{' '}
          <a
            href="https://vitejs.dev/"
            className="inline-flex items-center font-medium text-slate-400 transition-colors hover:text-slate-500 focus-visible:text-slate-500"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Vite (opens in a new tab)"
          >
            Vite
          </a>
          ,{' '}
          <a
            href="https://react.dev/"
            className="inline-flex items-center font-medium text-slate-400 transition-colors hover:text-slate-500 focus-visible:text-slate-500"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="React (opens in a new tab)"
          >
            React
          </a>
          , and{' '}
          <a
            href="https://tailwindcss.com/"
            className="inline-flex items-center font-medium text-slate-400 transition-colors hover:text-slate-500 focus-visible:text-slate-500"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Tailwind CSS (opens in a new tab)"
          >
            Tailwind CSS
          </a>
          .
        </p>
        <p className="leading-relaxed">
          Components powered by{' '}
          <a
            href="https://ui.aceternity.com/"
            className="inline-flex items-center font-medium text-slate-400 transition-colors hover:text-slate-500 focus-visible:text-slate-500"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Aceternity UI (opens in a new tab)"
          >
            Aceternity UI
          </a>
          {' '}and{' '}
          <a
            href="https://ui.shadcn.com/"
            className="inline-flex items-center font-medium text-slate-400 transition-colors hover:text-slate-500 focus-visible:text-slate-500"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="shadcn/ui (opens in a new tab)"
          >
            shadcn/ui
          </a>
          . All text is set in the{' '}
          <a
            href="https://rsms.me/inter/"
            className="inline-flex items-center font-medium text-slate-400 transition-colors hover:text-slate-500 focus-visible:text-slate-500"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Inter (opens in a new tab)"
          >
            Inter
          </a>{' '}
          typeface.
        </p>
      </div>
      <div className="mt-2 flex w-full items-center justify-between border-t border-slate-600/10 pt-6 dark:border-slate-700/50">
        <p className="font-medium">© 2025 Micah Mustaham</p>
        <p className="text-sm text-slate-500">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;