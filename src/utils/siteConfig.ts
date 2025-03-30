/**
 * Site Configuration
 * Central place to manage site URLs and metadata
 */

// Site domain configuration
// When moving to the final domain, only change these values
export const SITE_DOMAIN = 'ai-vertise.com'; // Production domain
export const SITE_URL = `https://${SITE_DOMAIN}`;

// Site metadata
export const SITE_NAME = 'AI VERTISE';
export const SITE_TITLE = 'AI VERTISE – AI-Powered Marketing';
export const SITE_DESCRIPTION = 'Smart, automated, data-driven growth. Built with AI for brands ready to scale.';
export const SITE_KEYWORDS = 'AI advertising, programmatic ads, paid social, AI marketing, performance marketing, digital agency';

// Social media
export const SOCIAL_LINKEDIN = 'https://www.linkedin.com/in/nataliia-r/';
export const SOCIAL_TELEGRAM = 'https://t.me/natalyineu';

// Images and assets
export const LOGO_PATH = '/favicon.svg';
export const OG_IMAGE_PATH = '/og-image.png';
export const OG_IMAGE_ABSOLUTE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;
export const FAVICON_PATH = '/favicon.svg';

// SEO and Open Graph defaults
export const DEFAULT_OG_TYPE = 'website';
export const DEFAULT_TWITTER_CARD = 'summary_large_image';

// Contact information
export const CONTACT_EMAIL = 'natalymakota@gmail.com';
export const COMPANY_ADDRESS = {
  street: 'Głogowska 40A',
  city: 'Poznań',
  postalCode: '60-734',
  country: 'Poland',
  countryCode: 'PL',
};

// Function to generate full URLs for assets
export const assetUrl = (path: string): string => {
  // Handle absolute URLs
  if (path.startsWith('http')) return path;
  
  // Handle relative URLs
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

// Function to generate canonical URLs for pages
export const canonicalUrl = (path: string = ''): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}; 