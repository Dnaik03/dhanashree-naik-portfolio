
import { useEffect } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductPuzzle from './components/ProductPuzzle'
import About from './components/About'
import Work from './components/Work'
import Skills from './components/Skills'
import Experience from './components/Experience'
import BeyondWork from './components/Beyond Work'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-page)] text-[var(--color-text-primary)]">
      <Navbar />

      <main>
        <section
          id="home"
          className="container grid min-h-[calc(100vh-76px)] items-center gap-14 pt-6 pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:pt-8 lg:pb-12"
        >
          <Hero />
          <ProductPuzzle />
        </section>

        <About />
        <Work />
        <Skills />
        <Experience />
        <BeyondWork />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default App
