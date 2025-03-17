import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Hero from './components/sections/Hero'
import Services from './components/sections/Services'
import Calculator from './components/sections/Calculator'
import SuccessStories from './components/sections/SuccessStories'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import BackToTop from './components/ui/BackToTop'
import PageTransition from './components/ui/PageTransition'

function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Close any open modals or menus
        document.dispatchEvent(new CustomEvent('closeModals'))
      }

      // Skip to main content
      if (e.key === '/' && e.ctrlKey) {
        e.preventDefault()
        const main = document.querySelector('main')
        main?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Add structured data for SEO
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "AI VERTISE",
      "description": "AI-powered digital advertising agency in Poznań, specializing in programmatic ads, paid social, and performance marketing.",
      "url": "https://aivertise.pl",
      "logo": "https://aivertise.pl/logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Za Bramką 1",
        "addressLocality": "Poznań",
        "postalCode": "61-842",
        "addressCountry": "PL"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+48503589781",
        "contactType": "customer service",
        "email": "natalymakota@gmail.com"
      },
      "sameAs": [
        "https://www.linkedin.com/company/aivertise",
        "https://t.me/aivertise"
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // Add meta tags for accessibility
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'description'
    meta.content = 'AI VERTISE - AI-powered digital advertising agency in Poznań, specializing in programmatic ads, paid social, and performance marketing.'
    document.head.appendChild(meta)

    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section')
      const navItems = document.querySelectorAll('nav button')

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          navItems[index]?.classList.add('text-indigo-600')
          navItems[index]?.classList.remove('text-gray-600')
        } else {
          navItems[index]?.classList.remove('text-indigo-600')
          navItems[index]?.classList.add('text-gray-600')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 
          focus:px-4 focus:py-2 focus:bg-white focus:text-indigo-600 focus:shadow-lg focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 origin-left z-50"
        style={{ scaleX }}
        role="progressbar"
        aria-label="Page scroll progress"
      />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main id="main-content" tabIndex={-1} className="relative overflow-x-hidden outline-none">
        <PageTransition>
          <Hero />
        </PageTransition>
        <div className="space-y-24 md:space-y-32">
          <PageTransition>
            <Services />
          </PageTransition>
          <PageTransition>
            <Calculator />
          </PageTransition>
          <PageTransition>
            <SuccessStories />
          </PageTransition>
          <PageTransition>
            <About />
          </PageTransition>
          <PageTransition>
            <Contact />
          </PageTransition>
        </div>
        <Footer />
      </main>
      <BackToTop />
    </div>
  )
}

export default App
