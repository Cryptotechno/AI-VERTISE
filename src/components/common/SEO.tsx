import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  OG_IMAGE_ABSOLUTE_URL,
  CONTACT_EMAIL,
  SOCIAL_LINKEDIN_COMPANY,
  SOCIAL_TELEGRAM
} from '../../utils/siteConfig';
import blogPosts from '../../data/blogPosts';

interface MetaData {
  title: string;
  description: string;
  image: string;
  type: string;
  keywords: string[];
  alternateLanguages?: {[key: string]: string};
  geoTargeting?: string[];
}

// Function to determine if a post is for a specific region
const isRegionSpecificPost = (tags: string[], region: string): boolean => {
  return tags.some(tag => tag.toLowerCase() === region.toLowerCase());
};

const getMetaData = (pathname: string): MetaData => {
  const defaultMeta = {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    image: OG_IMAGE_ABSOLUTE_URL,
    type: 'website',
    keywords: [
      'AI Marketing',
      'Digital Marketing',
      'AI Advertising',
      'Programmatic Ads',
      'Marketing Automation'
    ],
    geoTargeting: ['US', 'UK', 'EU']
  };

  // Find blog post if we're on a blog page
  const blogPost = pathname.startsWith('/blog/') && pathname.split('/blog/').length > 1
    ? blogPosts.find(post => post.slug === pathname.split('/blog/')[1])
    : null;

  switch (pathname) {
    case '/':
      return defaultMeta;
    case '/blog':
      return {
        ...defaultMeta,
        title: 'AI Marketing Blog | Latest Insights - AI Vertise',
        description: 'Discover cutting-edge insights on AI in digital marketing, programmatic advertising, and marketing automation strategies.',
        keywords: [
          'AI Marketing Blog',
          'Digital Marketing Insights',
          'AI Advertising Tips',
          'Marketing Strategy',
          'AI Technology',
          'US Digital Marketing',
          'UK Advertising Trends'
        ]
      };
    case '/privacy':
      return {
        ...defaultMeta,
        title: 'Privacy Policy - AI Vertise',
        description: 'Learn about our commitment to protecting your privacy and data security at AI Vertise.',
        type: 'WebPage'
      };
    case '/terms':
      return {
        ...defaultMeta,
        title: 'Terms of Service - AI Vertise',
        description: 'Read our terms and conditions for using AI Vertise services and platforms.',
        type: 'WebPage'
      };
    default:
      if (blogPost) {
        // Determine if this is a US or UK specific post
        const isUSPost = isRegionSpecificPost(blogPost.tags || [], 'US');
        const isUKPost = isRegionSpecificPost(blogPost.tags || [], 'UK');
        
        // Create region-specific geo targeting
        const geoTargeting = [];
        if (isUSPost) geoTargeting.push('US');
        if (isUKPost) geoTargeting.push('UK');
        if (geoTargeting.length === 0) geoTargeting.push('US', 'UK', 'EU');
        
        // Enhance title with region for region-specific posts
        let enhancedTitle = blogPost.title || '';
        if (isUSPost && !enhancedTitle.includes('US')) {
          enhancedTitle = `${enhancedTitle} [US Guide]`;
        } else if (isUKPost && !enhancedTitle.includes('UK')) {
          enhancedTitle = `${enhancedTitle} [UK Guide]`;
        }
        
        return {
          title: `${enhancedTitle} - AI Vertise Blog`,
          description: blogPost.summary || defaultMeta.description,
          image: blogPost.image || defaultMeta.image,
          type: 'article',
          keywords: [...(blogPost.tags || []), ...defaultMeta.keywords],
          geoTargeting
        };
      }
      return defaultMeta;
  }
};

export const SEO: React.FC<{
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  canonicalUrl?: string;
  includeFaq?: boolean;
  includeDataset?: boolean;
  includeTechnologyService?: boolean;
  includeSoftwareApplication?: boolean;
  structuredData?: any;
}> = ({
  title: customTitle,
  description: customDescription,
  keywords: customKeywords,
  ogTitle: customOgTitle,
  ogDescription: customOgDescription,
  ogType: customOgType,
  canonicalUrl: customCanonicalUrl,
  structuredData: customStructuredData
}) => {
  const { pathname } = useLocation();
  const meta = getMetaData(pathname);
  const fullUrl = customCanonicalUrl || `${SITE_URL}${pathname}`;
  
  const title = customTitle || meta.title;
  const description = customDescription || meta.description;
  const keywordsArray = customKeywords ? customKeywords.split(',').map(k => k.trim()) : meta.keywords;
  const ogTitle = customOgTitle || title;
  const ogDescription = customOgDescription || description;
  const ogType = customOgType || meta.type;
  const geoTargeting = meta.geoTargeting || ['US', 'UK', 'EU'];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsArray.join(', ')} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_GB" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={meta.image} />
      
      {/* Geo Targeting */}
      {geoTargeting.includes('US') && <meta name="geo.placename" content="United States" />}
      {geoTargeting.includes('UK') && <meta name="geo.placename" content="United Kingdom" />}
      {geoTargeting.includes('US') && <meta name="geo.region" content="US" />}
      {geoTargeting.includes('UK') && <meta name="geo.region" content="GB" />}
      <meta name="geo.position" content="52.4064,16.9252" /> {/* Company location */}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Hreflang Tags for International SEO */}
      <link rel="alternate" href={fullUrl} hrefLang="en-us" />
      <link rel="alternate" href={fullUrl} hrefLang="en-gb" />
      <link rel="alternate" href={fullUrl} hrefLang="x-default" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* PWA */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#6B46C1" />
      
      {/* Additional Meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="author" content={SITE_NAME} />
    </Helmet>
  );
};

export const SiteStructuredData: React.FC = () => {
  const { pathname } = useLocation();
  const meta = getMetaData(pathname);
  const fullUrl = `${SITE_URL}${pathname}`;
  
  // Find blog post if we're on a blog page
  const blogPost = pathname.startsWith('/blog/') && pathname.split('/blog/').length > 1
    ? blogPosts.find(post => post.slug === pathname.split('/blog/')[1])
    : null;

  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": OG_IMAGE_ABSOLUTE_URL,
    "email": CONTACT_EMAIL,
    "description": SITE_DESCRIPTION,
    "sameAs": [
      SOCIAL_LINKEDIN_COMPANY,
      SOCIAL_TELEGRAM
    ]
  };

  let pageStructuredData = null;
  
  if (blogPost) {
    // Determine if this is a US or UK specific post
    const isUSPost = isRegionSpecificPost(blogPost.tags || [], 'US');
    const isUKPost = isRegionSpecificPost(blogPost.tags || [], 'UK');
    
    pageStructuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blogPost.title || '',
      "description": blogPost.summary || '',
      "image": blogPost.image || '',
      "keywords": blogPost.tags ? blogPost.tags.join(',') : '',
      "datePublished": blogPost.publishDate || blogPost.date || new Date().toISOString(),
      "dateModified": blogPost.lastUpdated || blogPost.date || new Date().toISOString(),
      "author": {
        "@type": "Organization",
        "name": SITE_NAME
      },
      "publisher": {
        "@type": "Organization",
        "name": SITE_NAME,
        "logo": {
          "@type": "ImageObject",
          "url": OG_IMAGE_ABSOLUTE_URL
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": fullUrl
      },
      // Add inLanguage property as string to avoid TypeScript errors
      ...(isUSPost ? { "inLanguage": "en-US" } : 
          isUKPost ? { "inLanguage": "en-GB" } : 
                     { "inLanguage": "en" })
    };
  } else if (pathname === '/blog') {
    pageStructuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "AI VERTISE Blog",
      "description": "Insights on AI-driven digital advertising and marketing",
      "url": "https://ai-vertise.com/blog"
    };
  }

  // Use safe approach for script tags - avoid direct DOM manipulation
  const baseStructuredDataString = JSON.stringify(baseStructuredData);
  const pageStructuredDataString = pageStructuredData ? JSON.stringify(pageStructuredData) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: baseStructuredDataString }} />
      {pageStructuredDataString && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: pageStructuredDataString }} />
      )}
    </>
  );
}; 