import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '../components/common/SEO';
import { Helmet } from 'react-helmet-async';

const OfflinePage: React.FC = () => {
  return (
    <>
      <SEO 
        title="You're Offline | AI VERTISE"
        description="It looks like you're currently offline. Some features may be unavailable."
      />
      
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center bg-indigo-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md"
        >
          <div className="mb-8">
            <svg 
              className="w-24 h-24 mx-auto text-indigo-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M18.364 5.636a9 9 0 010 12.728m-3.536-3.536a4 4 0 010 5.656m2.121-9.192a4 4 0 00-5.656 0M9.172 16.172a4 4 0 01-5.656 0m12.728-9.9a4 4 0 00-5.656 0M6.343 6.343a4 4 0 015.657 0"
              />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={1.5} />
            </svg>
          </div>
          
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            You're Offline
          </h1>
          
          <p className="mb-8 text-lg text-gray-600">
            It looks like you've lost your internet connection. 
            Don't worry - some features are still available.
          </p>
          
          <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Try the following:
            </h2>
            <ul className="pl-6 mt-4 space-y-2 text-left text-gray-700 list-disc">
              <li>Check your internet connection</li>
              <li>Refresh the page when back online</li>
              <li>Browse cached pages using the navigation below</li>
            </ul>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/" 
              className="px-6 py-3 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Go to Homepage
            </Link>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 font-medium text-indigo-600 transition-colors bg-white border border-indigo-600 rounded-lg hover:bg-indigo-50"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default OfflinePage; 