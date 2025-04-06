import React, { useState } from 'react';

const ImageWrapper: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    return (
      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-100">
        <span className="text-gray-400">Image not available</span>
      </div>
    );
  }
  
  return (
    <div className="absolute inset-0 w-full h-full">
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover" 
        onError={() => setHasError(true)}
        loading="lazy"
      />
    </div>
  );
};

export const ProgrammaticAdSvg: React.FC = () => (
  <ImageWrapper src="/images/blog/programmatic-ai.svg" alt="Programmatic Advertising AI" />
);

export const SocialMediaSvg: React.FC = () => (
  <ImageWrapper src="/images/blog/social-media-ai.svg" alt="Social Media AI" />
);

export const PrivacySvg: React.FC = () => (
  <ImageWrapper src="/images/blog/privacy-advertising.svg" alt="Privacy-First Advertising" />
);

export const EcommerceSvg: React.FC = () => (
  <ImageWrapper src="/images/blog/ecommerce-ai.svg" alt="AI-Driven E-commerce Personalization" />
);

export const MetaverseSvg: React.FC = () => (
  <ImageWrapper src="/images/blog/metaverse-marketing.svg" alt="Metaverse Marketing" />
);

export const UKLandscapeSvg: React.FC = () => (
  <ImageWrapper src="/images/blog/uk-advertising-landscape.svg" alt="UK Digital Advertising Landscape" />
);

export const TelegramAISvg: React.FC = () => (
  <ImageWrapper src="/images/blog/telegram-ai.svg" alt="AI-Powered Telegram Channel Selection" />
);

export const CustomAIToolsSvg: React.FC = () => (
  <ImageWrapper src="/images/blog/custom-ai-tools.svg" alt="Building Custom AI Marketing Tools" />
); 