
export default function Profile() {
  return (
    <div className="flex items-center gap-4">
      <img
        alt="Micah Mustaham"
        width="160"
        height="160"
        decoding="async"
        src="/profile.jpeg"
        data-nimg="1"
        className="rounded-lg w-32 h-32 md:w-40 md:h-40 object-cover flex-shrink-0"
      />
      <div>
        <h1 className="text-lg md:text-2xl font-bold truncate">
          Micah Mustaham
        </h1>
        <h2 className="mt-1 text-lg font-medium tracking-tight text-dark-200 sm:text-xl">
          Software Developer
        </h2>
        <p className="text-xs md:text-sm text-foreground/70 mt-0.5 flex items-center gap-1">
          <svg
            className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <span className="truncate">Zamboanga City, Philippines</span>
        </p>
        <div className="mt-4 flex gap-2">
          <a
            target="_blank"
            className="inline-flex h-7 md:h-8 items-center rounded-lg bg-foreground px-2.5 md:px-4 text-[10px] md:text-xs font-medium text-background transition-all duration-200 hover:bg-foreground/90 hover:-translate-y-0.5 gap-1 md:gap-1.5 whitespace-nowrap"
            href="https://calendly.com/bryllim/consultation"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <span className="text-left">Let's Talk</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              ></path>
            </svg>
          </a>
          <a
            className="inline-flex h-7 md:h-8 items-center rounded-lg border border-border bg-background px-2.5 md:px-4 text-[10px] md:text-xs font-medium transition-all duration-200 hover:bg-muted hover:-translate-y-0.5 gap-1 md:gap-1.5 whitespace-nowrap"
            href="mailto:bryllim@gmail.com"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            <span className="text-left">Send Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}
