import { ThemeProvider } from "@/context/theme-provider"
import Page from "@/components/Page"
import { BrowserRouter } from "react-router-dom"


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Page />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
