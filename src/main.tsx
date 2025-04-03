import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { executeWhenIdle } from './utils/idleLoader'

// Preload critical fonts
const fontPreloadLink = document.createElement('link')
fontPreloadLink.rel = 'preload'
fontPreloadLink.as = 'font'
fontPreloadLink.type = 'font/woff2'
fontPreloadLink.href = '/fonts/inter-var-latin.woff2'
fontPreloadLink.crossOrigin = 'anonymous'
document.head.appendChild(fontPreloadLink)

// Initialize core app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered:', registration)
    }).catch(error => {
      console.log('SW registration failed:', error)
    })
  })
}

// Initialize non-critical features when browser is idle
executeWhenIdle(() => {
  // Load analytics
  import('./utils/analytics').then(module => {
    module.initAnalytics()
  }).catch(err => console.warn('Failed to load analytics:', err))
  
  // Load other non-critical features
  const loadNonCritical = async () => {
    try {
      // Preconnect to any third-party domains
      const domains = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com']
      domains.forEach(domain => {
        const link = document.createElement('link')
        link.rel = 'preconnect'
        link.href = domain
        document.head.appendChild(link)
      })
      
      // Load any remaining deferred features
    } catch (error) {
      console.warn('Error loading non-critical features:', error)
    }
  }
  
  loadNonCritical()
})
