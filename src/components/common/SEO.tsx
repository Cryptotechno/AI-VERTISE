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
import { blogPosts } from '../../data/blogPosts';

interface MetaData {
  title: string;
  description: string;
  image: string;
  type: string;
  keywords: string[];
}

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
    ]
  };

  // Find blog post if we're on a blog page
  const blogPost = pathname.startsWith('/blog/') 
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
          'AI Technology'
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
        return {
          title: `${blogPost.title} - AI Vertise Blog`,
          description: blogPost.excerpt || defaultMeta.description,
          image: blogPost.image || defaultMeta.image,
          type: 'article',
          keywords: [...blogPost.tags || [], ...defaultMeta.keywords]
        };
      }
      return defaultMeta;
  }
};

export const SEO: React.FC = () => {
  const { pathname } = useLocation();
  const meta = getMetaData(pathname);
  const fullUrl = `${SITE_URL}${pathname}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords.join(', ')} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* PWA */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#6B46C1" />
      
      {/* Additional Meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content={SITE_NAME} />
    </Helmet>
  );
};

export const SiteStructuredData: React.FC = () => {
  const { pathname } = useLocation();
  const meta = getMetaData(pathname);
  const fullUrl = `${SITE_URL}${pathname}`;

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

  const pageStructuredData = pathname.startsWith('/blog/') ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.title,
    "description": meta.description,
    "image": meta.image,
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
    "url": fullUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    }
  } : null;

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(baseStructuredData)}
      </script>
      {pageStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(pageStructuredData)}
        </script>
      )}
    </>
  );
}; 