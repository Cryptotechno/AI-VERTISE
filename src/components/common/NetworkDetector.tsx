import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const NetworkDetector: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  useEffect(() => {
    if (!isOnline) {
      // Use React Router navigation instead of direct window.location change
      navigate('/offline', { replace: true });
    }
  }, [isOnline, navigate]);
  
  return null;
};

export default NetworkDetector; 