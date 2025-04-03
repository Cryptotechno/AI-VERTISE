import { useEffect, useRef } from 'react';

/**
 * Hook to optimize performance specifically on mobile devices
 * - Reduces DOM size by hiding non-essential elements
 * - Defers offscreen images
 * - Optimizes rendering performance
 */
export function useMobileOptimization() {
  const hasOptimizedRef = useRef(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  useEffect(() => {
    // Only run on mobile devices
    if (!isMobile || hasOptimizedRef.current) return;
    
    // Mark as optimized to prevent running multiple times
    hasOptimizedRef.current = true;
    
    // 1. Reduce DOM size by hiding non-essential elements
    const reduceDOMSize = () => {
      // Hide decorative elements on mobile
      const decorativeElements = document.querySelectorAll(
        '.desktop-decoration, .desktop-only, .background-decoration'
      );
      decorativeElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
          el.setAttribute('aria-hidden', 'true');
          // Remove from tab order
          el.setAttribute('tabindex', '-1');
        }
      });
      
      // Simplify complex DOM elements
      const complexElements = document.querySelectorAll('.dashboard-mockup, .complex-animation');
      complexElements.forEach(el => {
        if (el instanceof HTMLElement) {
          // Use contain property to isolate rendering
          el.style.contain = 'content';
          // Mark for content-visibility optimization
          el.style.contentVisibility = 'auto';
        }
      });
    };
    
    // 2. Defer loading offscreen images
    const deferOffscreenImages = () => {
      // Only handle images outside viewport
      const allImages = document.querySelectorAll('img:not([loading="eager"])');
      
      allImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        // If image is far below viewport
        if (rect.top > window.innerHeight + 500) {
          // Save original src and set to blank
          const originalSrc = img.getAttribute('src');
          if (originalSrc && !img.getAttribute('data-src')) {
            img.setAttribute('data-src', originalSrc);
            img.setAttribute('src', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E');
            img.setAttribute('loading', 'lazy');
            
            // Create intersection observer to load when approaching viewport
            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    const dataSrc = img.getAttribute('data-src');
                    if (dataSrc) {
                      img.src = dataSrc;
                      img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                  }
                });
              },
              { rootMargin: '200px 0px' }
            );
            observer.observe(img);
          }
        }
      });
    };
    
    // 3. Optimize rendering performance
    const optimizeRendering = () => {
      // Add will-change to elements with animations
      const animatedElements = document.querySelectorAll('.animate-in, .animate-on-scroll');
      animatedElements.forEach(el => {
        if (el instanceof HTMLElement) {
          // Simplify animations on mobile
          el.style.willChange = 'opacity, transform';
          
          // Remove complex animations
          if (el.classList.contains('complex-animation')) {
            el.classList.remove('complex-animation');
            el.classList.add('simple-animation');
          }
        }
      });
      
      // Optimize form elements on mobile
      const formInputs = document.querySelectorAll('input, select, textarea');
      formInputs.forEach(input => {
        if (input instanceof HTMLElement) {
          // Increase tap target size
          input.style.fontSize = '16px';
          input.style.minHeight = '44px';
        }
      });

      // Fix janky card hover animations
      optimizeCardAnimations();
    };
    
    // 4. Fix layout shifts
    const fixLayoutShifts = () => {
      // Add min-height to containers that might change height
      const dynamicContainers = document.querySelectorAll('.dynamic-content, .card, .panel');
      dynamicContainers.forEach(container => {
        if (container instanceof HTMLElement) {
          // Get current height and set as min-height
          const height = container.clientHeight;
          if (height > 0) {
            container.style.minHeight = `${height}px`;
          }
        }
      });
      
      // Pre-allocate space for images
      const images = document.querySelectorAll('img:not([width]):not([height])');
      images.forEach(img => {
        // Set default aspect ratio if missing dimensions
        if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
          img.setAttribute('width', '100%');
          if (img instanceof HTMLImageElement) {
            img.style.aspectRatio = '16/9';
          }
        }
      });

      // Apply text rendering optimizations
      const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li, button');
      textElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.classList.add('text-loading-fix');
        }
      });
    };

    // 5. Fix font flashing (FOUT)
    const fixFontFlashing = () => {
      // Add the font loading script if it doesn't exist
      if (!document.querySelector('script[src="/font-loading.js"]')) {
        const script = document.createElement('script');
        script.src = '/font-loading.js';
        script.async = false;
        document.head.appendChild(script);
      }

      // Ensure all text elements have anti-aliasing applied
      document.documentElement.classList.add('text-loading-fix');
      
      // Force immediate text visibility
      const style = document.createElement('style');
      style.textContent = `
        /* Prevent FOIT */
        * {
          font-synthesis: none !important;
          font-display: swap !important;
        }
        
        /* Apply fallback fonts immediately */
        body, h1, h2, h3, h4, h5, h6, p, span, a, li, button {
          visibility: visible !important;
          opacity: 1 !important;
        }
      `;
      document.head.appendChild(style);
    };

    // 6. Fix janky card animations specifically
    const optimizeCardAnimations = () => {
      // Disable hover animations for framer motion components on mobile
      const disableFramerAnimation = () => {
        // Find all Framer Motion components with hover animations
        const framerElements = document.querySelectorAll('[data-framer-component-type="motion"], [style*="transform"]');
        
        framerElements.forEach(el => {
          if (el instanceof HTMLElement) {
            // Add GPU acceleration and simplified animations class
            el.classList.add('mobile-card-fix');
            
            // Ensure the element has GPU acceleration
            el.style.transform = 'translateZ(0)';
            el.style.backfaceVisibility = 'hidden';
            
            // Replace any complex animation effects with simpler ones
            if (el.getAttribute('style')?.includes('scale')) {
              // Use CSS for hover effects instead of JavaScript
              el.style.transition = 'transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)';
            }
          }
        });
      };
      
      // Target specific card components that are causing jank
      const fixJankyCards = () => {
        // Find all card components across the app
        const cardComponents = document.querySelectorAll('.card, .bg-white.rounded-xl, .bg-white.p-3.rounded-xl, .bg-white.p-4.rounded-xl, div[class*="shadow"]');
        
        cardComponents.forEach(card => {
          if (card instanceof HTMLElement) {
            // Add GPU acceleration class
            card.classList.add('mobile-card-fix');
            
            // Replace shadow animations with transform only
            if (card.className.includes('hover:shadow')) {
              // Simplify box-shadow animations which are not hardware accelerated
              const existingTransition = card.style.transition;
              card.style.transition = existingTransition 
                ? existingTransition.replace('box-shadow', 'transform')
                : 'transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)';
              
              // Ensure hover is handled by transform
              card.addEventListener('touchstart', () => {
                card.style.transform = 'translateZ(0) scale(1.01)';
              }, { passive: true });
              
              card.addEventListener('touchend', () => {
                card.style.transform = 'translateZ(0) scale(1)';
              }, { passive: true });
            }
            
            // Remove will-change after animation completes to free resources
            card.addEventListener('transitionend', () => {
              setTimeout(() => {
                card.style.willChange = 'auto';
              }, 300);
            }, { passive: true });
          }
        });
      };
      
      // Apply specific fixes for animations on cards in Dashboard
      const fixDashboardCards = () => {
        const dashboardCards = document.querySelectorAll('.dashboard-mockup [class*="rounded-xl"], .dashboard-mockup [class*="shadow"]');
        
        dashboardCards.forEach(card => {
          if (card instanceof HTMLElement) {
            // Apply specific optimizations for dashboard cards
            card.classList.add('mobile-card-fix');
            card.style.willChange = 'transform';
            card.style.transform = 'translateZ(0)';
            
            // Override Framer Motion hover effects with simpler CSS alternatives
            const style = document.createElement('style');
            style.textContent = `
              .dashboard-mockup [class*="rounded-xl"]:hover,
              .dashboard-mockup [class*="shadow"]:hover {
                transform: translateZ(0) scale(1.01) !important;
                transition: transform 0.2s cubic-bezier(0.2, 0, 0.2, 1) !important;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
              }
            `;
            document.head.appendChild(style);
          }
        });
      };
      
      // Run all card animation optimizations
      disableFramerAnimation();
      fixJankyCards();
      fixDashboardCards();
      
      // Apply a global listener to react to newly added cards after initial load
      document.addEventListener('animationstart', (e) => {
        // Check if this is a card element being added or animated
        if (e.target instanceof HTMLElement) {
          const el = e.target;
          if (
            el.className.includes('card') || 
            el.className.includes('rounded-xl') ||
            el.getAttribute('style')?.includes('transform')
          ) {
            el.classList.add('mobile-card-fix');
            el.style.transform = 'translateZ(0)';
          }
        }
      }, { passive: true });
    };
    
    // Run all optimizations
    try {
      // Run font fixes first to prevent flashing
      fixFontFlashing();
      
      // Then run other optimizations
      reduceDOMSize();
      deferOffscreenImages();
      optimizeRendering();
      fixLayoutShifts();
      
      // Listen for content changes to optimize new content
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Run optimizations again when new content is added
            setTimeout(() => {
              reduceDOMSize();
              deferOffscreenImages();
              optimizeRendering();
              fixLayoutShifts();
            }, 100);
          }
        });
      });
      
      observer.observe(document.body, { childList: true, subtree: true });
      
      return () => {
        observer.disconnect();
      };
    } catch (error) {
      console.error('Mobile optimization error:', error);
    }
  }, [isMobile]);
} 