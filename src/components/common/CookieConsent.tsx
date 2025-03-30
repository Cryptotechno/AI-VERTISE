import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store';
import { Button } from '../atoms/Button';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { cookieConsent, setCookieConsent } = useAppStore();

  useEffect(() => {
    // Check if user has already consented
    if (!cookieConsent) {
      // Show the consent banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [cookieConsent]);

  const handleAccept = () => {
    setCookieConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Even when declining, we save that the user has made a choice
    setCookieConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-50 transition-all duration-300 transform translate-y-0">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 md:mr-8">
            <p className="mb-2">
              Our website uses cookies to enhance your experience. By continuing to browse our site, you agree to our use of cookies.
            </p>
            <p>
              Learn more in our{' '}
              <Link to="/privacy" className="text-indigo-600 hover:text-indigo-800 underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDecline}
            >
              Decline
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAccept}
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent; 