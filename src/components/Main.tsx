import About from "@/components/main-components/About"
import Experience from "@/components/main-components/Experience"
import Projects from "@/components/main-components/Projects"
import Recommendations from "@/components/main-components/Recommendations"
import Footer from "@/components/main-components/Footer"

const Main = () => {
  return (
    <main className="xl:pt-24 lg:w-[52%] lg:py-4">
      <About />
      <Experience />
      <Projects />
      <Recommendations />
      <Footer/>
    </main>
  )
}

export default Main