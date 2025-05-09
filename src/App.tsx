import React, { lazy, Suspense, memo, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams, Navigate, useNavigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
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
import blogPosts from './data/blogPosts'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import LCPPreload from './components/LCPPreload'
import MobileAnimationOptimizer from './components/MobileAnimationOptimizer'
import { useAppStore } from './store'
import AnalyticsTracker from './components/common/AnalyticsTracker'
import NetworkDetector from './components/common/NetworkDetector'

// Lazy-loaded components with correct type assertions
// Non-critical routes are lazy loaded
const retryImport = (importFn: () => Promise<any>, retries = 3, interval = 1500) => {
  return new Promise<any>((resolve, reject) => {
    const attempt = () => {
      importFn()
        .then(resolve)
        .catch((error: Error) => {
          // More detailed error logging
          const errorType = error instanceof TypeError ? 'Network Error' : 
                           error instanceof SyntaxError ? 'Syntax Error' : 
                           'Import Error';
          
          console.warn(`Dynamic import failed (${errorType}), retries left: ${retries}`, error);
          
          // Handle specific error types differently
          if (error instanceof TypeError && error.message.includes('fetch')) {
            console.error('Network issue detected during module loading');
          }
          
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
const BlogArchive = lazy(() => retryImport(() => import('./pages/BlogArchive')));
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
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(post => post.slug === slug);
  
  useEffect(() => {
    if (!post && slug) {
      console.warn(`Blog post not found for slug: ${slug}`);
      navigate('/blog', { replace: true });
    }
  }, [post, slug, navigate]);
  
  if (!post) {
    return <PageLoader />;
  }
  
  return <BlogArticle post={post} />;
}

// Network detection component is now imported from its own file

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
    <HelmetProvider>
      <Router>
        <ErrorBoundary>
          <div className="flex flex-col min-h-screen overflow-x-hidden" style={{ backgroundColor: '#f9f7fd' }}>
            {/* Optimize animations for mobile */}
            <MobileAnimationOptimizer />
            {/* Preload critical assets for LCP */}
            <LCPPreload />
            <ScrollProgressIndicator />
            <SiteStructuredData />
            <AnalyticsTracker />
            <NetworkDetector />
            <MemoizedNavbar />
            
            <main className="flex-grow">
              {/* Special handling for homepage (not lazy-loaded) */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/blog/archive/:year/:month" element={<BlogArchive />} />
                      <Route path="/blog/archive/:year" element={<BlogArchive />} />
                      <Route path="/blog/archive" element={<BlogArchive />} />
                      <Route path="/blog/:slug" element={<BlogArticleWrapper />} />
                      <Route path="/blog" element={<BlogPage />} />
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      <Route path="/terms" element={<TermsOfService />} />
                      <Route path="/offline" element={<OfflinePage />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </Suspense>
                } />
              </Routes>
            </main>
            
            <MemoizedFooter />
            <MemoizedCookieConsent />
            <PWAInstallPrompt />
          </div>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  )
}

export default App
