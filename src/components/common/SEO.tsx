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
  SOCIAL_LINKEDIN,
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

export const SEO: React.FC<SEOProps> = ({
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  keywords = SITE_KEYWORDS,
  ogTitle = title,
  ogDescription = description,
  ogType = DEFAULT_OG_TYPE,
  ogImage = OG_IMAGE_ABSOLUTE_URL,
  twitterCard = DEFAULT_TWITTER_CARD,
  twitterTitle = ogTitle,
  twitterDescription = ogDescription,
  twitterImage = ogImage,
  path = '',
  structuredData,
  includeFaq = false,
  includeDataset = false,
  includeTechnologyService = false,
  includeSoftwareApplication = false,
  canonicalUrl: customCanonicalUrl,
  robots
}) => {
  const pageUrl = customCanonicalUrl || (path ? canonicalUrl(path) : SITE_URL);
  const aiMetadataTags = generateAIMetadata({ title, description });
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={SITE_NAME} />
      {robots && <meta name="robots" content={robots} />}
      
      {/* Favicon support */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* AI/ML Model Metadata - Enhanced understanding for models */}
      {aiMetadataTags.map((tag, index) => (
        <meta key={`ai-meta-${index}`} name={tag.name} content={tag.content} />
      ))}
      
      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogTitle} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={twitterImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />
      
      {/* Primary Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Schema.org data for various AI/ML models */}
      {includeFaq && (
        <script type="application/ld+json">
          {JSON.stringify(createFaqSchema())}
        </script>
      )}
      
      {includeDataset && (
        <script type="application/ld+json">
          {JSON.stringify(createDatasetSchema())}
        </script>
      )}
      
      {includeTechnologyService && (
        <script type="application/ld+json">
          {JSON.stringify(aiModelSchemas.createTechnologyServiceSchema())}
        </script>
      )}
      
      {includeSoftwareApplication && (
        <script type="application/ld+json">
          {JSON.stringify(aiModelSchemas.createSoftwareApplicationSchema())}
        </script>
      )}
    </Helmet>
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