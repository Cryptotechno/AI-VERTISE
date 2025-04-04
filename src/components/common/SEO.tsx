import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_URL,
  SITE_NAME,
  OG_IMAGE_PATH,
  OG_IMAGE_ABSOLUTE_URL,
  DEFAULT_OG_TYPE,
  DEFAULT_TWITTER_CARD,
  COMPANY_ADDRESS,
  CONTACT_EMAIL,
  SOCIAL_LINKEDIN_COMPANY,
  SOCIAL_TELEGRAM,
  assetUrl,
  canonicalUrl
} from '../../utils/siteConfig';
import { 
  createOrganizationSchema, 
  createFaqSchema,
  createDatasetSchema
} from '../../utils/schemaMarkup';
import {
  generateAIMetadata,
  aiModelSchemas
} from '../../utils/aiModelMetadata';
import { useLocation } from 'react-router-dom';
import { Helmet as HelmetAsync } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  path?: string;
  structuredData?: object;
  includeFaq?: boolean;
  includeDataset?: boolean;
  includeTechnologyService?: boolean;
  includeSoftwareApplication?: boolean;
  canonicalUrl?: string;
  robots?: string;
}

interface MetaData {
  title: string;
  description: string;
  image?: string;
  type?: string;
}

const getMetaData = (pathname: string): MetaData => {
  const defaultMeta = {
    title: 'AI Vertise - AI-Powered Digital Marketing Solutions',
    description: 'Transform your digital marketing with AI Vertise. Expert AI solutions for programmatic advertising, social media, and privacy-first marketing strategies.',
    image: '/logo_optimized.png',
    type: 'website'
  };

  switch (pathname) {
    case '/':
      return defaultMeta;
    case '/blog':
      return {
        ...defaultMeta,
        title: 'AI Vertise Blog - Latest AI Marketing Insights',
        description: 'Discover the latest insights on AI in digital marketing, programmatic advertising, and marketing automation.',
      };
    case '/privacy':
      return {
        ...defaultMeta,
        title: 'Privacy Policy - AI Vertise',
        description: 'Our commitment to protecting your privacy and data security at AI Vertise.',
      };
    case '/terms':
      return {
        ...defaultMeta,
        title: 'Terms of Service - AI Vertise',
        description: 'Terms and conditions for using AI Vertise services and platforms.',
      };
    default:
      if (pathname.startsWith('/blog/')) {
        // Handle blog posts
        return {
          ...defaultMeta,
          type: 'article',
          // You can enhance this by getting actual blog post data
          title: `${pathname.split('/').pop()?.split('-').join(' ')} - AI Vertise Blog`,
          description: 'Read our latest insights on AI-powered digital marketing strategies.',
        };
      }
      return defaultMeta;
  }
};

export const SEO: React.FC = () => {
  const { pathname } = useLocation();
  const meta = getMetaData(pathname);

  return (
    <HelmetAsync>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={meta.type} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      {meta.image && <meta property="og:image" content={meta.image} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {meta.image && <meta name="twitter:image" content={meta.image} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={`https://ai-vertise.com${pathname}`} />
    </HelmetAsync>
  );
};

export const SiteStructuredData: React.FC = () => {
  useEffect(() => {
    // Use enhanced organization schema for better AI model understanding
    const structuredData = createOrganizationSchema();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    
    // Check if a script with the same type already exists to avoid duplicates
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    for (let i = 0; i < existingScripts.length; i++) {
      try {
        const scriptData = JSON.parse(existingScripts[i].textContent || '{}');
        if (scriptData['@type'] === 'Organization') {
          return; // Organization schema already exists, don't add another
        }
      } catch (e) {
        console.error('Error parsing existing schema:', e);
      }
    }
    
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null;
}; 