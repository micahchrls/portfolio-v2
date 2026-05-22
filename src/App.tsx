import { ThemeProvider } from "@/context/theme-provider"
import Page from "@/components/Page"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Analytics } from '@vercel/analytics/react'

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-zinc-600 dark:text-zinc-400">
      <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-200">404</h1>
      <p className="text-base">Page not found.</p>
      <Link
        to="/"
        className="text-sm font-medium underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        Go home
      </Link>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Analytics />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
