import React, { lazy, Suspense, memo, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom'
import { Navbar } from './components/common/Navbar'
import { Footer } from './components/common/Footer'
import CookieConsent from './components/common/CookieConsent'
import { ScrollProgressIndicator } from './components/atoms/ScrollProgressIndicator'
import { PageLoader } from './components/atoms/PageLoader'
import { SiteStructuredData } from './components/common/SEO'
import { PWAInstallPrompt } from './components/common/PWAInstallPrompt'
import { useScrollHandler } from './hooks/useScrollHandler'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'
import { useAnalyticsPageview } from './hooks/useAnalyticsPageview'
import { blogPosts } from './data/blogPosts'
import { ErrorBoundary } from './components/common/ErrorBoundary'

// Lazy-loaded components with correct type assertions
const HomePage = lazy(() => import('./pages/HomePage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogArticle = lazy(() => import('./components/sections/BlogArticle'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const OfflinePage = lazy(() => import('./pages/OfflinePage'))

// Memoized for performance
const MemoizedNavbar = memo(Navbar)
const MemoizedFooter = memo(Footer)
const MemoizedCookieConsent = memo(CookieConsent)

const BlogArticleWrapper = () => {
  const { slug } = useParams()
  const post = blogPosts.find(post => post.slug === slug) || blogPosts[0]
  return <BlogArticle post={post} />
}

// This component ensures analytics are tracked on route changes
const AnalyticsTracker = () => {
  useAnalyticsPageview();
  return null;
};

// Network detection component
const NetworkDetector = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  useEffect(() => {
    if (!isOnline) {
      // Navigate to offline page when user goes offline
      window.location.href = '/offline';
    }
  }, [isOnline]);
  
  return null;
};

function App() {
  // Use our custom hooks
  useScrollHandler()
  useKeyboardNavigation()

  return (
    <Router>
      <ErrorBoundary>
        <div className="relative min-h-screen bg-gray-50">
          <ScrollProgressIndicator />
          <SiteStructuredData />
          <AnalyticsTracker />
          <NetworkDetector />
          <MemoizedNavbar />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogArticleWrapper />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/offline" element={<OfflinePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
          <MemoizedFooter />
          <MemoizedCookieConsent />
          <PWAInstallPrompt />
        </div>
      </ErrorBoundary>
    </Router>
  )
}

export default App
