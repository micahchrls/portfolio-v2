import About from "@/components/main-components/About"
import Experience from "@/components/main-components/Experience"
import Projects from "@/components/main-components/Projects"
import Recommendations from "@/components/main-components/Recommendations"

const Main = () => {
  return (
    <main className="xl:pt-24 lg:w-[52%] lg:py-4 relative">
  
      <About />
      <Experience />
      <Projects />
      <Recommendations />
    </main>
  )
}

export default Main