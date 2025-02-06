import Main from "@/components/Main"
import Header from "@/components/Header"
import { motion } from "framer-motion";
import { Chatbot } from "@/components/chatbot/Chatbot";

const Page = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex min-h-screen flex-col"
      >
        <div className="mx-auto max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0">
          <div className="lg:flex lg:justify-between lg:gap-4">
            <Header />
            <Main />
          </div>
        </div>
      </motion.div>
      <Chatbot />
    </>
  )
}

export default Page