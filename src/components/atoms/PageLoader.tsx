import React from 'react';

interface PageLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ 
  size = 'md',
  className = ''
}) => {
  const sizeMap = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-indigo-600 ${sizeMap[size]}`}></div>
    </div>
  );
}; 