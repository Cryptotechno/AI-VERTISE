import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already acknowledged the cookie notice
    const hasAcknowledged = localStorage.getItem('cookieNoticeAcknowledged');
    if (!hasAcknowledged) {
      // Show cookie notice after 1 second
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcknowledge = () => {
    // Save acknowledgment to localStorage
    localStorage.setItem('cookieNoticeAcknowledged', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900 text-white shadow-lg"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">Cookie Notice</h3>
                <p className="text-gray-300 text-sm md:text-base">
                  This website only uses essential cookies to enable basic functions and ensure the website operates 
                  correctly. We do not use analytics or tracking cookies. For more information, please read our{' '}
                  <Link to="/privacy" className="text-indigo-400 hover:text-indigo-300 underline">
                    Privacy Policy
                  </Link>.
                </p>
              </div>
              <div className="flex flex-row gap-3 mt-2 md:mt-0">
                <button 
                  onClick={handleAcknowledge}
                  className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors text-sm"
                >
                  Acknowledge
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent; 