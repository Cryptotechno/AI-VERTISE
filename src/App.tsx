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

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      const navItems = document.querySelectorAll('nav a, nav button')

      sections.forEach((section) => {
        const sectionId = section.getAttribute('id')
        if (!sectionId) return
        
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          // Find all nav items with href pointing to this section
          navItems.forEach(item => {
            if (item instanceof HTMLAnchorElement && item.getAttribute('href') === `#${sectionId}`) {
              item.classList.add('text-indigo-600')
              item.classList.remove('text-gray-800')
            } else if (item instanceof HTMLButtonElement && item.dataset.section === sectionId) {
              item.classList.add('text-indigo-600')
              item.classList.remove('text-gray-800')
            }
          })
        } else {
          navItems.forEach(item => {
            if (item instanceof HTMLAnchorElement && item.getAttribute('href') === `#${sectionId}`) {
              item.classList.remove('text-indigo-600')
              item.classList.add('text-gray-800')
            } else if (item instanceof HTMLButtonElement && item.dataset.section === sectionId) {
              item.classList.remove('text-indigo-600')
              item.classList.add('text-gray-800')
            }
          })
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
