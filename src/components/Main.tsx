import About from "@/components/main-components/About"
import Experience from "@/components/main-components/Experience"
import Certifications from "@/components/main-components/Certifications"
import Projects from "@/components/main-components/Projects"
import Recommendations from "@/components/main-components/Recommendations"
import Contact from "@/components/main-components/Contact"
import Footer from "@/components/main-components/Footer"

const Main = () => {
  return (
    <main className="xl:pt-24 lg:w-[52%] lg:py-4">
      <About />
      <Projects />
      <Experience />
      <Recommendations />
      <Certifications />
      <Contact />
      <Footer/>
    </main>
  )
}

export default Main