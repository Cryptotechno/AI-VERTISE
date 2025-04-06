import { useEffect, useRef } from 'react';

/**
 * This hook helps optimize the Largest Contentful Paint (LCP) metric
 * by prioritizing the loading of critical elements.
 * 
 * @param selector - CSS selector for the element that should be prioritized
 * @returns A function to manually trigger optimization if needed
 */
export function useLCPOptimization(selector: string) {
  const optimizedRef = useRef(false);
  const isMobile = useRef(false); // Default to false
  
  useEffect(() => {
    // Safely check if window is available (for SSR compatibility)
    if (typeof window !== 'undefined') {
      isMobile.current = window.innerWidth < 768;
    }
  }, []);

  const optimizeLCP = () => {
    if (optimizedRef.current) return;
    
    // Find the LCP element
    const element = document.querySelector(selector);
    if (!element) {
      console.warn(`LCP element not found: ${selector}`);
      return;
    }

    // Mobile-specific aggressive optimizations
    if (isMobile.current) {
      // Apply mobile-specific rendering optimizations
      if (element instanceof HTMLElement) {
        // Use content-visibility for faster paint
        element.style.contentVisibility = 'auto';
        
        // Prioritize this element's rendering
        element.style.contain = 'paint layout';
        
        // Optimize paint performance
        element.style.willChange = 'contents';
        
        // Reduce initial animation complexity on mobile
        const animatedElements = element.querySelectorAll('.animate-on-scroll, [data-animate]');
        animatedElements.forEach(animEl => {
          if (animEl instanceof HTMLElement) {
            animEl.classList.add('reduce-motion');
            // Simplify or disable animations for initial load
            animEl.style.transition = 'none';
            // Re-enable after initial render
            setTimeout(() => {
              animEl.style.transition = '';
            }, 2000);
          }
        });
        
        // Reduce image quality for the first paint on mobile
        const images = element.querySelectorAll('img');
        images.forEach(img => {
          // Set explicit width and height to prevent layout shift
          if (!img.getAttribute('width') && img.naturalWidth) {
            img.setAttribute('width', img.naturalWidth.toString());
          }
          if (!img.getAttribute('height') && img.naturalHeight) {
            img.setAttribute('height', img.naturalHeight.toString());
          }
          
          // Improve loading priority
          img.setAttribute('fetchpriority', 'high');
          img.decoding = 'async';
          
          // Force use of smaller/optimized images on mobile
          const src = img.getAttribute('src');
          if (src && src.match(/\.(jpe?g|png)$/i)) {
            // Try to use WebP or AVIF version if available
            const webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');
            const avifSrc = src.replace(/\.(jpe?g|png)$/i, '.avif');
            
            // Create an image object to check if the WebP/AVIF versions exist
            const checkWebP = new Image();
            checkWebP.onload = () => {
              img.src = webpSrc;
            };
            checkWebP.onerror = () => {
              // Try AVIF as fallback
              const checkAVIF = new Image();
              checkAVIF.onload = () => {
                img.src = avifSrc;
              };
              checkAVIF.src = avifSrc;
            };
            checkWebP.src = webpSrc;
          }
        });
      }
    }
    
    // If it's an image, prioritize loading
    if (element instanceof HTMLImageElement) {
      // Set high priority loading
      element.loading = 'eager';
      element.fetchPriority = 'high';
      element.decoding = 'sync';
      
      // If image is not yet loaded, preload it
      if (!element.complete) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = element.src;
        document.head.appendChild(preloadLink);
      }
    }
    
    // If it's a background image element
    if (!(element instanceof HTMLImageElement)) {
      const computedStyle = window.getComputedStyle(element);
      const backgroundImage = computedStyle.backgroundImage;
      
      if (backgroundImage && backgroundImage !== 'none') {
        // Extract the URL
        const urlMatch = /url\(['"]?([^'"]+)['"]?\)/g.exec(backgroundImage);
        if (urlMatch && urlMatch[1]) {
          const imageUrl = urlMatch[1];
          
          // Preload the background image
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'preload';
          preloadLink.as = 'image';
          preloadLink.href = imageUrl;
          document.head.appendChild(preloadLink);
        }
      }
    }
    
    // Mark as optimized to prevent duplicate work
    optimizedRef.current = true;
  };
  
  useEffect(() => {
    // Run optimization immediately
    optimizeLCP();
    
    // Add mobile-specific analytics to measure performance
    if (isMobile.current) {
      // Track real user metrics for mobile
      if ('PerformanceObserver' in window) {
        try {
          // Monitor mobile-specific LCP
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            if (entries.length > 0) {
              const lcpEntry = entries[entries.length - 1];
              console.debug('Mobile LCP:', lcpEntry.startTime);
              
              // Report to analytics if LCP is still high
              if (lcpEntry.startTime > 3000) {
                // Here we would log slow LCP to analytics
                console.debug('Slow mobile LCP detected:', lcpEntry.startTime);
              }
            }
          });
          
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
          
          // Also monitor FID (First Input Delay) on mobile
          const fidObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
              // Use the appropriate casting for PerformanceEventTiming
              const fidEntry = entry as PerformanceEventTiming;
              console.debug('Mobile FID:', fidEntry.processingStart - fidEntry.startTime);
            });
          });
          
          fidObserver.observe({ type: 'first-input', buffered: true });
        } catch (e) {
          console.warn('Mobile performance monitoring error:', e);
        }
      }
    }
    
    // Additional optimization on load event
    window.addEventListener('load', optimizeLCP);
    
    // Monitor LCP events if available
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          
          // If LCP entry is available, let's analyze it
          if (entries.length > 0) {
            const lcpEntry = entries[entries.length - 1];
            console.debug('LCP element:', lcpEntry);
            
            // If the LCP time is high, let's add additional optimizations
            if (lcpEntry.startTime > 2500) {
              console.debug('High LCP time detected, applying additional optimizations');
              
              // Here we could dynamically adjust image quality or other optimizations
            }
          }
          
          observer.disconnect();
        });
        
        // Observe LCP events
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        console.warn('PerformanceObserver for LCP failed:', e);
      }
    }
    
    return () => {
      window.removeEventListener('load', optimizeLCP);
    };
  }, [selector]);
  
  return optimizeLCP;
} 