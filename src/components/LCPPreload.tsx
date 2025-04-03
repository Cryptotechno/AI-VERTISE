import React, { useEffect } from 'react';

/**
 * This component handles preloading critical resources for Largest Contentful Paint (LCP)
 * It injects preload tags for critical resources in the head
 */
const LCPPreload: React.FC = () => {
  useEffect(() => {
    // Preload critical CSS assets (dashboard styles)
    const preloadCSS = document.createElement('link');
    preloadCSS.rel = 'preload';
    preloadCSS.as = 'style';
    preloadCSS.href = '/assets/dashboard.css';
    document.head.appendChild(preloadCSS);

    // Apply preconnect for critical resources
    const domains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://ai-vertise.com'
    ];
    
    domains.forEach(domain => {
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = domain;
      preconnect.crossOrigin = 'anonymous';
      document.head.appendChild(preconnect);
    });

    // Generate inline critical CSS for the dashboard
    const style = document.createElement('style');
    style.textContent = `
      .dashboard-mockup {
        opacity: 1 !important;
        transform: none !important;
        will-change: opacity, transform;
        contain: layout style paint;
        content-visibility: auto;
        min-height: 600px;
      }
      
      /* Pre-render dashboard elements for instant display */
      .dashboard-mockup::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(8px);
        border-radius: 1rem;
        z-index: -1;
      }
    `;
    document.head.appendChild(style);

    // Apply priority hints to images
    document.querySelectorAll('img').forEach(img => {
      if (img.getBoundingClientRect().top < window.innerHeight) {
        img.fetchPriority = 'high';
        img.loading = 'eager';
      }
    });

    // Cleanup function
    return () => {
      document.head.removeChild(preloadCSS);
      document.head.removeChild(style);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default LCPPreload; 