import { ThemeProvider } from "@/context/theme-provider"
import Page from "@/components/Page"
import { BrowserRouter } from "react-router-dom"
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Page />
        <Analytics />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
