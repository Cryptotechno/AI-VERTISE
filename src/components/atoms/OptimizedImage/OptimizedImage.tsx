import React, { useState, useEffect, CSSProperties } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  loading?: 'lazy' | 'eager';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  sizes?: string;
}

/**
 * OptimizedImage component that automatically handles:
 * - Next-gen image formats (WebP, AVIF) with fallbacks
 * - Mobile-specific optimizations
 * - Layout shift prevention
 * - Proper lazy loading
 * - Image priority
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  onLoad,
  loading = 'lazy',
  objectFit = 'cover',
  sizes = '100vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Determine if this should be eagerly loaded
  const shouldEagerLoad = priority || loading === 'eager';
  
  // Generate paths for next-gen formats
  const basePath = src.split('?')[0]; // Remove query params if any
  const webpSrc = basePath.replace(/\.(jpe?g|png)$/i, '.webp');
  const avifSrc = basePath.replace(/\.(jpe?g|png)$/i, '.avif');
  
  // Handle responsive sizes only for mobile
  const mobileSizes = isMobile ? '(max-width: 767px) 100vw, 50vw' : sizes;
  
  // Set fetchpriority based on priority prop
  const fetchPriority = priority ? 'high' : 'auto';
  
  // Function to handle image loading
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  // Set explicit dimensions if available to prevent layout shifts
  const dimensionProps: Record<string, string | number> = {};
  if (width) dimensionProps.width = width;
  if (height) dimensionProps.height = height;
  
  // Mobile-specific CSS
  const mobileStyles: CSSProperties = isMobile ? {
    willChange: 'opacity',
    // Use proper types for CSS properties
    // @ts-ignore - contentVisibility is not yet in all TypeScript definitions
    contentVisibility: 'auto',
    contain: 'paint',
    // Reduced animation complexity
    transition: 'opacity 0.3s',
  } : {};
  
  return (
    <picture>
      {/* AVIF format - best compression, modern browsers */}
      <source
        srcSet={avifSrc}
        type="image/avif"
        sizes={mobileSizes}
      />
      
      {/* WebP format - good compression, wide support */}
      <source
        srcSet={webpSrc}
        type="image/webp"
        sizes={mobileSizes}
      />
      
      {/* Original format fallback */}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading={shouldEagerLoad ? 'eager' : 'lazy'}
        decoding={shouldEagerLoad ? 'sync' : 'async'}
        onLoad={handleLoad}
        fetchPriority={fetchPriority}
        sizes={mobileSizes}
        style={{
          objectFit,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s',
          ...mobileStyles
        }}
        {...dimensionProps}
      />
    </picture>
  );
};

export default OptimizedImage; 