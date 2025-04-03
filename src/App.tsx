import React, { lazy, Suspense, memo, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import { Footer } from './components/common/Footer'
import CookieConsent from './components/common/CookieConsent'
import { ScrollProgressIndicator } from './components/atoms/ScrollProgressIndicator'
import { PageLoader } from './components/atoms/PageLoader'
import { SiteStructuredData } from './components/common/SEO'
import { PWAInstallPrompt } from './components/common/PWAInstallPrompt'
import { useScrollHandler } from './hooks/useScrollHandler'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'
import { useAnalyticsPageview } from './hooks/useAnalyticsPageview'
import { useMobileOptimization } from './hooks/useMobileOptimization'
import { blogPosts } from './data/blogPosts'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import LCPPreload from './components/LCPPreload'
import MobileAnimationOptimizer from './components/MobileAnimationOptimizer'
import { useAppStore } from './store'

// Lazy-loaded components with correct type assertions
// Non-critical routes are lazy loaded
const retryImport = (importFn: () => Promise<any>, retries = 3, interval = 1500) => {
  return new Promise<any>((resolve, reject) => {
    const attempt = () => {
      importFn()
        .then(resolve)
        .catch((error) => {
          console.warn(`Dynamic import failed, retries left: ${retries}`, error);
          if (retries === 0) {
            reject(error);
            return;
          }
          
          setTimeout(() => {
            retries--;
            attempt();
          }, interval);
        });
    };
    
    attempt();
  });
};

const BlogPage = lazy(() => retryImport(() => import('./pages/BlogPage')));
const BlogArticle = lazy(() => retryImport(() => import('./components/sections/BlogArticle')));
const PrivacyPolicy = lazy(() => retryImport(() => import('./pages/PrivacyPolicy')));
const TermsOfService = lazy(() => retryImport(() => import('./pages/TermsOfService')));
const OfflinePage = lazy(() => retryImport(() => import('./pages/OfflinePage')));

// HomePage is not lazy loaded for better LCP optimization on the landing page
import HomePage from './pages/HomePage'

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
  
  // Apply mobile-specific optimizations
  useMobileOptimization()

  // Preload and optimize LCP immediately
  useEffect(() => {
    // Set high priority on the main content
    document.documentElement.setAttribute('data-priority', 'true');
    
    // Add a class to help with initial styling
    document.body.classList.add('lcp-optimized');
    
    // Remove optimization markers when no longer needed
    return () => {
      document.documentElement.removeAttribute('data-priority');
      document.body.classList.remove('lcp-optimized');
    };
  }, []);

  return (
    <Router>
      <ErrorBoundary>
        <div className="relative min-h-screen bg-gray-50">
          {/* Optimize animations for mobile */}
          <MobileAnimationOptimizer />
          {/* Preload critical assets for LCP */}
          <LCPPreload />
          <ScrollProgressIndicator />
          <SiteStructuredData />
          <AnalyticsTracker />
          <NetworkDetector />
          <MemoizedNavbar />
          
          {/* Special handling for homepage (not lazy-loaded) */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogArticleWrapper />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/offline" element={<OfflinePage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            } />
          </Routes>
          
          <MemoizedFooter />
          <MemoizedCookieConsent />
          <PWAInstallPrompt />
        </div>
      </ErrorBoundary>
    </Router>
  )
}

export default App
