import React from 'react';
import { Link } from 'react-router-dom';

const GDPRLogo: React.FC = () => {
  return (
    <Link to="/privacy" className="inline-flex items-center text-xs text-gray-500 hover:text-gray-600 transition-colors">
      <div className="flex items-center border border-gray-300 rounded px-2 py-1 bg-white">
        <span className="font-semibold text-indigo-600 mr-1.5">GDPR</span>
        <span className="text-gray-600">Compliant</span>
      </div>
    </Link>
  );
};

export default GDPRLogo; 