import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Loader from './components/Loader'

type ThemeMode = 'dark' | 'light'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
    </>
  )
}

function AppContent({ theme, toggleTheme }: { theme: ThemeMode; toggleTheme: () => void }) {
  return (
    <div className="min-vh-100 position-relative overflow-hidden pt-4">
      <ScrollToTop />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="pt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="py-4 border-top border-secondary border-opacity-25 mt-5">
        <div className="container text-center">
          <p className="text-custom-muted small mb-0">
            © {new Date().getFullYear()} <span className="brand-text fs-5">𝓐𝓶𝓲𝓽.</span> All rights reserved. Built with React & Next.js aesthetics.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('portfolio_theme') as ThemeMode
    return saved === 'light' ? 'light' : 'dark'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.setAttribute('data-bs-theme', theme)
    localStorage.setItem('portfolio_theme', theme)
  }, [theme])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <Router>
      <Loader loading={loading} />
      <AppContent theme={theme} toggleTheme={toggleTheme} />
    </Router>
  )
}
