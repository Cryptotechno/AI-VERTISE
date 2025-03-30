import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, CONTACT_EMAIL, COMPANY_ADDRESS } from './siteConfig';

/**
 * Enhanced Schema.org utilities for better AI/ML model indexing
 * These provide richer semantic data for models like ChatGPT to understand the site content
 */

// Core organization schema with enhanced attributes
export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": SITE_NAME,
  "description": SITE_DESCRIPTION,
  "url": SITE_URL,
  "logo": `${SITE_URL}/favicon/android-chrome-512x512.png`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": COMPANY_ADDRESS.street,
    "addressLocality": COMPANY_ADDRESS.city,
    "postalCode": COMPANY_ADDRESS.postalCode,
    "addressCountry": COMPANY_ADDRESS.countryCode
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": CONTACT_EMAIL
  },
  "knowsAbout": [
    "Artificial Intelligence Marketing",
    "Programmatic Advertising",
    "Machine Learning",
    "Digital Marketing",
    "Performance Marketing",
    "Paid Social Media"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AI Marketing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI-Powered Advertising Campaigns",
          "description": "Data-driven advertising campaigns optimized with artificial intelligence"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Programmatic Ad Buying",
          "description": "Automated media buying using machine learning algorithms"
        }
      }
    ]
  }
});

// FAQ Schema for common questions about your services
export const createFaqSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does AI improve digital advertising?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI enhances digital advertising by analyzing vast amounts of data to identify patterns and insights humans might miss. It enables precise audience targeting, real-time campaign optimization, and predictive analytics that maximize ROI and performance."
      }
    },
    {
      "@type": "Question",
      "name": "What is programmatic advertising?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Programmatic advertising is the automated buying and selling of digital ad space using AI algorithms. It allows advertisers to target specific audiences with personalized messages across multiple platforms simultaneously, optimizing bids in real-time for maximum efficiency."
      }
    },
    {
      "@type": "Question",
      "name": "What services does AI VERTISE offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI VERTISE offers AI-powered digital advertising services including programmatic ad buying, performance marketing strategies, paid social media campaigns, data analytics, and custom AI marketing solutions tailored to your business objectives."
      }
    }
  ]
});

// Add dataset schema if you present any performance metrics or case studies
export const createDatasetSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "AI Marketing Performance Metrics",
  "description": "Performance comparison data between traditional and AI-powered marketing campaigns",
  "creator": {
    "@type": "Organization",
    "name": SITE_NAME
  },
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "variableMeasured": [
    "Return on Ad Spend (ROAS)",
    "Cost Per Acquisition (CPA)",
    "Click-Through Rate (CTR)",
    "Conversion Rate"
  ]
});

// Special Article schema for the blog section
export const createArticleSchema = (articleData: {
  headline: string;
  description: string;
  url: string;
  imageUrl: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": articleData.headline,
  "description": articleData.description,
  "image": articleData.imageUrl,
  "author": {
    "@type": "Person",
    "name": articleData.authorName
  },
  "publisher": {
    "@type": "Organization",
    "name": SITE_NAME,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/favicon/android-chrome-512x512.png`
    }
  },
  "datePublished": articleData.datePublished,
  "dateModified": articleData.dateModified,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": articleData.url
  }
}); 