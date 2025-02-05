import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section
      id="about"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="About me"
    >
      <Card className="border bg-transparent">
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-zinc-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
            About
          </h2>
        </div>
        <CardContent className="pt-4 text-sm leading-relaxed">
          <div>
            <p className="mb-4">
              I'm a software developer with a strong background in backend
              development, database management, and API integrations. Passionate
              about building secure, scalable systems that optimize workflows
              and enhance user experience.
            </p>

            <p className="mb-4">
              Currently, I'm a <strong>Software Developer</strong> at{" "}
              <a
                className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                href="https://zcmc.doh.gov.ph/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Zamboanga City Medical Center (opens in a new tab)"
              >
                Zamboanga City Medical Center
              </a>
              , where I develop backend APIs using <strong>Laravel</strong> and{" "}
              <strong>FastAPI</strong>, integrating secure authentication and
              digital signatures through PNPKI to enhance security for hospital
              systems.
            </p>

            <p className="mb-4">
              In addition, I serve as a{" "}
              <strong>Part-Time College Professor</strong> at{" "}
              <a
                className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                href="https://www.adzu.edu.ph/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Ateneo de Zamboanga University (opens in a new tab)"
              >
                Ateneo de Zamboanga University
              </a>
              , teaching programming, object-oriented programming (OOP), and
              core computer science subjects, mentoring students in software
              development best practices.
            </p>

            <p className="mb-4">
              Previously, I developed full-stack web applications for the
              university, maintained legacy systems, and built high-performance
              backend services in <strong>PHP, MySQL, and JavaScript</strong>.
              I've also worked as a freelance developer, building Django-based
              ordering systems, debugging C++ projects, and crafting portfolio
              websites for global clients.
            </p>

            <p>
              When I'm not coding, I enjoy teaching, learning about new
              technologies, and working on personal projects. Feel free to check
              out my work on{" "}
              <a
                className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                href="https://github.com/micah3252625"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Github (opens in a new tab)"
              >
                GitHub
              </a>{" "}
              or explore my{" "}
              <a
                className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                href="https://micahmustaham.netlify.app/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Portfolio (opens in a new tab)"
              >
                portfolio
              </a>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
