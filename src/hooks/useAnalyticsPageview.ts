import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A hook that tracks page views in Google Analytics
 * when the location changes in a React Router app.
 */
export const useAnalyticsPageview = () => {
  const location = useLocation();

  useEffect(() => {
    // Only track if gtag exists
    if (typeof window.gtag !== 'undefined') {
      // Send a pageview to Google Analytics
      window.gtag('config', 'G-NS08SGTMJ2', {
        page_path: location.pathname + location.search
      });
    }
  }, [location.pathname, location.search]);
}; 