/**
 * Simple analytics module that can be loaded on-demand
 * This helps reduce the initial JavaScript bundle size
 */

// Flag to prevent duplicate initialization
let initialized = false;

/**
 * Initialize analytics only when needed
 * This is called when the browser is idle
 */
export function initAnalytics(): void {
  if (initialized) return;
  
  console.log('Analytics initialized');
  
  // Track page views
  trackPageView();
  
  // Set up navigation tracking
  setupNavigationTracking();
  
  initialized = true;
}

/**
 * Track a page view
 */
export function trackPageView(): void {
  const path = window.location.pathname;
  console.log(`Analytics: Page view - ${path}`);
  
  // Here you would typically send data to your analytics provider
  // Example: gtag('event', 'page_view', { page_path: path });
}

/**
 * Track a custom event
 */
export function trackEvent(category: string, action: string, label?: string, value?: number): void {
  console.log(`Analytics: Event - ${category} / ${action} / ${label || ''} / ${value || ''}`);
  
  // Example: gtag('event', action, { event_category: category, event_label: label, value });
}

/**
 * Set up tracking for navigation events
 */
function setupNavigationTracking(): void {
  // Track navigation changes for SPAs
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    const result = originalPushState.apply(this, args);
    trackPageView();
    return result;
  };
  
  // Track when user navigates with browser buttons
  window.addEventListener('popstate', () => {
    trackPageView();
  });
  
  // Track performance metrics when idle
  if ('performance' in window && 'getEntriesByType' in performance) {
    // Use setTimeout to ensure this runs after page load
    setTimeout(() => {
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries && navigationEntries.length > 0) {
        const navData = navigationEntries[0] as PerformanceNavigationTiming;
        console.log(`Analytics: Page loaded in ${navData.loadEventEnd - navData.startTime}ms`);
      }
    }, 0);
  }
} 