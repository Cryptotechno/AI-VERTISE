import React, { useEffect, Suspense } from 'react'
import { HashRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Navbar } from './components/common/Navbar'
import { Footer } from './components/common/Footer'
import { HomePage } from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import BlogArticle from './components/sections/BlogArticle'
import { blogPosts } from './data/blogPosts'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import CookieConsent from './components/common/CookieConsent'

// Importing section components for dedicated pages
import Services from './components/sections/Services'
import About from './components/sections/About'
import Calculator from './components/sections/Calculator'
import Contact from './components/sections/Contact'

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

const BlogArticleWrapper = () => {
  const { slug } = useParams()
  const post = blogPosts.find(post => post.slug === slug) || blogPosts[0]
  return <BlogArticle post={post} />
}

// Wrappers for section components to add proper layout
const ServicesPage = () => (
  <div className="pt-16 bg-gray-50">
    <Services />
  </div>
)

const AboutPage = () => (
  <div className="pt-16 bg-gray-50">
    <About />
  </div>
)

const CalculatorPage = () => (
  <div className="pt-16 bg-gray-50">
    <Calculator />
  </div>
)

const ContactPage = () => (
  <div className="pt-16 bg-gray-50">
    <Contact />
  </div>
)

function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Reset scroll position on page navigation
  useEffect(() => {
    // Create a scroll restoration function
    const handleScrollRestoration = () => {
      // Reset scroll and ensure body can scroll
      window.scrollTo(0, 0);
      document.body.style.overflow = '';
    };

    // Listen for navigation events
    window.addEventListener('popstate', handleScrollRestoration);
    
    return () => {
      window.removeEventListener('popstate', handleScrollRestoration);
    };
  }, []);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        document.dispatchEvent(new CustomEvent('closeModals'))
      }
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
        "streetAddress": "Głogowska 40A",
        "addressLocality": "Poznań",
        "postalCode": "60-734",
        "addressCountry": "PL"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+48503589781",
        "contactType": "customer service",
        "email": "natalymakota@gmail.com"
      },
      "sameAs": [
        "https://www.linkedin.com/in/nataliia-r/",
        "https://t.me/natalyineu"
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

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  return (
    <ErrorBoundary>
      <Router>
        <div className="relative min-h-screen bg-gray-50">
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 transform-none z-50"
            style={{ scaleX }}
          />
          <Navbar />
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogArticleWrapper />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
          <Footer />
          <CookieConsent />
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App
