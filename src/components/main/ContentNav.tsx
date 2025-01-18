export default function ContentNav() {
  return (
    <nav className="nav hidden lg:block" aria-label="In-page jump links">
      <ul className="mt-16 w-max">
        <li>
          <a className="group flex items-center py-3" href="#about">
            <span className="nav-indicator mr-4 h-px w-8 bg-white transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
            <span className="nav-text text-xs font-bold uppercase tracking-widest group-hover:text-slate-200 group-focus-visible:text-slate-200">
              About
            </span>
          </a>
        </li>
        <li>
          <a className="group flex items-center py-3 active" href="#experience">
            <span className="nav-indicator mr-4 h-px w-8 bg-white transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
            <span className="nav-text text-xs font-bold uppercase tracking-widest group-hover:text-slate-200 group-focus-visible:text-slate-200">
              Experience
            </span>
          </a>
        </li>
        <li>
          <a className="group flex items-center py-3 " href="#projects">
            <span className="nav-indicator mr-4 h-px w-8 bg-white transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
            <span className="nav-text text-xs font-bold uppercase tracking-widest group-hover:text-slate-200 group-focus-visible:text-slate-200">
              Projects
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
