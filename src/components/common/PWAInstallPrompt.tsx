import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the BeforeInstallPromptEvent which isn't in the standard TypeScript types
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  useEffect(() => {
    // Check if the user has already installed the PWA
    const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches;
    
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      e.preventDefault();
      // Store the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Only show the prompt if the app is not already installed
      // and if the user hasn't dismissed it recently (using localStorage)
      const lastPromptTime = localStorage.getItem('pwaPromptDismissed');
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (!isAppInstalled && (!lastPromptTime || Date.now() - parseInt(lastPromptTime) > twentyFourHours)) {
        // Wait a bit before showing the prompt to not interrupt the user immediately
        setTimeout(() => {
          setShowPrompt(true);
        }, 5000); // 5 seconds delay
      }
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Detect when the PWA is successfully installed
    window.addEventListener('appinstalled', () => {
      // Hide the prompt if it's showing
      setShowPrompt(false);
      // Clear the stored prompt
      setDeferredPrompt(null);
      // Show a success toast message
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      
      // Analytics event for app installation
      if (window.gtag) {
        window.gtag('event', 'pwa_install', {
          event_category: 'PWA',
          event_label: 'App Installed',
        });
      }
    });
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);
  
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    await deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      // User accepted the install prompt
      console.log('User accepted the install prompt');
    } else {
      // User dismissed the install prompt
      console.log('User dismissed the install prompt');
      // Store the time when the user dismissed the prompt
      localStorage.setItem('pwaPromptDismissed', Date.now().toString());
    }
    
    // Clear the saved prompt since it can't be used again
    setDeferredPrompt(null);
    setShowPrompt(false);
  };
  
  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwaPromptDismissed', Date.now().toString());
  };
  
  // If there's no deferred prompt or we shouldn't show the prompt, don't render anything
  if (!showPrompt) {
    return null;
  }
  
  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-0 right-0 mx-auto max-w-sm p-4 bg-white border border-indigo-100 rounded-lg shadow-lg z-50"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <svg className="h-10 w-10 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-6m0 0V6m0 6h6m-6 0H6" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-lg font-medium text-gray-900">Install AI VERTISE</h3>
              <p className="mt-1 text-sm text-gray-500">
                Add our app to your home screen for quick and easy access.
              </p>
              <div className="mt-4 flex space-x-3">
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Install
                </button>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Not now
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDismiss}
              className="ml-4 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 p-4 bg-green-600 text-white rounded-lg shadow-lg z-50"
        >
          <div className="flex items-center">
            <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p>Successfully installed!</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 