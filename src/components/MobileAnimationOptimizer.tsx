import React, { useEffect } from 'react';

/**
 * This component applies critical animation optimizations for mobile devices
 * to prevent janky card hover/tap animations.
 * 
 * It executes before React hydration to ensure smooth animations from the start.
 */
const MobileAnimationOptimizer: React.FC = () => {
  useEffect(() => {
    // Only apply optimizations on mobile devices
    if (window.innerWidth < 768) {
      // Apply optimizations immediately
      optimizeAnimations();
    }
  }, []);

  const optimizeAnimations = () => {
    // Create a style element for our optimizations
    const styleEl = document.createElement('style');
    styleEl.id = 'mobile-animation-optimizer';
    
    // Add CSS rules to prevent animation jank
    styleEl.textContent = `
      /* Hardware acceleration for elements with transforms */
      .card, 
      [class*="hover:"], 
      [class*="motion-"],
      [style*="transform"] {
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
        will-change: transform, opacity;
      }
      
      /* Simplify shadow transitions */
      .hover\\:shadow-lg, 
      .hover\\:shadow-xl,
      .hover\\:shadow-2xl {
        transition: transform 0.2s ease-out !important;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
      }
      
      /* Better active state for touch devices */
      .card:active,
      [class*="motion-"]:active {
        transform: scale(0.98) translateZ(0) !important;
        transition: transform 0.2s ease-out !important;
      }
      
      /* Reduce motion for users who prefer it */
      @media (prefers-reduced-motion: reduce) {
        *, ::before, ::after {
          animation-duration: 0.01ms !important;
          transition-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
        }
      }
      
      /* Simplified animations for mobile */
      @media (max-width: 767px) {
        .transition-all {
          transition-property: transform, opacity !important;
          transition-duration: 0.2s !important;
          transition-timing-function: ease-out !important;
        }
        
        /* Disable backdrop blur on mobile for performance */
        .backdrop-blur-sm,
        .backdrop-blur-md,
        .backdrop-blur-lg {
          backdrop-filter: none !important;
        }
        
        /* Reduce transform scale amounts */
        [style*="scale(1.05)"] {
          transform: scale(1.02) translateZ(0) !important;
        }
        
        [style*="scale(1.1)"] {
          transform: scale(1.03) translateZ(0) !important;
        }
      }
    `;
    
    // Add the style element to the head
    document.head.appendChild(styleEl);
    
    // Set up a MutationObserver to monitor for new elements and apply optimizations
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          // Apply optimizations to new nodes
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              const element = node as HTMLElement;
              
              // Find cards and apply optimizations
              if (element.classList?.contains('card') || 
                  element.querySelectorAll('.card').length > 0) {
                applyOptimizationsToElements(element);
              }
            }
          });
        }
      });
    });
    
    // Start observing the document
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    
    // Apply optimizations to existing elements
    applyOptimizationsToElements(document.body);
    
    // Function to apply optimizations to elements
    function applyOptimizationsToElements(rootElement: HTMLElement) {
      // Find all cards and elements with hover effects
      const cards = rootElement.querySelectorAll('.card, [class*="hover:"]');
      
      cards.forEach((card) => {
        const element = card as HTMLElement;
        
        // Add touch-action property for better handling on touch devices
        element.style.touchAction = 'manipulation';
        
        // Add event listeners if not already added
        if (!element.hasAttribute('data-optimized')) {
          element.setAttribute('data-optimized', 'true');
          
          // Add touch event listeners to handle hover effects
          element.addEventListener('touchstart', () => {
            element.classList.add('active');
          }, { passive: true });
          
          element.addEventListener('touchend', () => {
            element.classList.remove('active');
            // Small delay before removing active class to make animation visible
            setTimeout(() => {
              element.classList.remove('active');
            }, 200);
          }, { passive: true });
        }
      });
    }
    
    // Return a cleanup function
    return () => {
      // Remove the style element
      const style = document.getElementById('mobile-animation-optimizer');
      if (style) {
        style.remove();
      }
      
      // Disconnect the observer
      observer.disconnect();
    };
  };

  // This component doesn't render anything
  return null;
};

export default MobileAnimationOptimizer; 