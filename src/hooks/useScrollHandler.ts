import { useEffect } from 'react';

interface UseScrollHandlerOptions {
  onScroll?: () => void;
}

export const useScrollHandler = (options: UseScrollHandlerOptions = {}) => {
  // Reset scroll position on page navigation
  useEffect(() => {
    // Create a scroll restoration function
    const handleScrollRestoration = () => {
      // Reset scroll and ensure body can scroll
      window.scrollTo(0, 0);
      document.body.style.overflow = '';
    };

    // Listen for navigation events
    window.addEventListener('popstate', handleScrollRestoration);
    
    return () => {
      window.removeEventListener('popstate', handleScrollRestoration);
    };
  }, []);

  // Set up manual scroll restoration
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  // Handle active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const navItems = document.querySelectorAll('nav a, nav button');

      sections.forEach((section) => {
        const sectionId = section.getAttribute('id');
        if (!sectionId) return;
        
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          // Find all nav items with href pointing to this section
          navItems.forEach(item => {
            if (item instanceof HTMLAnchorElement && item.getAttribute('href') === `#${sectionId}`) {
              item.classList.add('text-indigo-600');
              item.classList.remove('text-gray-800');
            } else if (item instanceof HTMLButtonElement && item.dataset.section === sectionId) {
              item.classList.add('text-indigo-600');
              item.classList.remove('text-gray-800');
            }
          });
        } else {
          navItems.forEach(item => {
            if (item instanceof HTMLAnchorElement && item.getAttribute('href') === `#${sectionId}`) {
              item.classList.remove('text-indigo-600');
              item.classList.add('text-gray-800');
            } else if (item instanceof HTMLButtonElement && item.dataset.section === sectionId) {
              item.classList.remove('text-indigo-600');
              item.classList.add('text-gray-800');
            }
          });
        }
      });

      // Call additional onScroll handler if provided
      if (options.onScroll) {
        options.onScroll();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [options.onScroll]);
}; 