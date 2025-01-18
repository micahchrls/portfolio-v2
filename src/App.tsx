import { ThemeProvider } from "@/context/theme-provider"
import Page from "@/components/Page"
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Page />
      </ThemeProvider>
    </>
  )
}

export default App
