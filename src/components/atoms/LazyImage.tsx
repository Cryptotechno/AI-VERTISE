import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  useWebp?: boolean;
  usePlaceholder?: boolean;
  placeholderColor?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  objectFit = 'cover',
  useWebp = true,
  usePlaceholder = true,
  placeholderColor = '#f3f4f6',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate WebP version path
  const getWebpPath = (originalPath: string) => {
    const hasQueryParams = originalPath.includes('?');
    const basePath = hasQueryParams 
      ? originalPath.split('?')[0] 
      : originalPath;
    
    if (basePath.endsWith('.webp')) return originalPath;
    
    // Check if path already has an extension
    const hasExtension = /\.[a-zA-Z0-9]+$/.test(basePath);
    const webpPath = hasExtension 
      ? basePath.replace(/\.[a-zA-Z0-9]+$/, '.webp') 
      : `${basePath}.webp`;
      
    return hasQueryParams 
      ? `${webpPath}?${originalPath.split('?')[1]}` 
      : webpPath;
  };

  useEffect(() => {
    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Load when within 200px of viewport
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Generate sources for picture element if using WebP
  const webpSrc = useWebp ? getWebpPath(src) : '';

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        backgroundColor: usePlaceholder ? placeholderColor : 'transparent',
      }}
    >
      {isInView ? (
        <>
          <picture>
            {useWebp && <source srcSet={webpSrc} type="image/webp" />}
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              loading="lazy"
              decoding="async"
              onLoad={handleLoad}
              className={`transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                objectFit,
                width: '100%',
                height: '100%',
              }}
            />
          </picture>
          {usePlaceholder && !isLoaded && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-gray-100"
              style={{ backgroundColor: placeholderColor }}
            >
              <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default LazyImage; 