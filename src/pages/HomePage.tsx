import React, { lazy, Suspense } from 'react';
import Hero from '../components/sections/Hero';
import BackToTop from '../components/ui/BackToTop';
import PageTransition from '../components/ui/PageTransition';
import { SEO } from '../components/common/SEO';
import { useLCPOptimization } from '../hooks/useLCPOptimization';
import { 
  SITE_DESCRIPTION, 
  CONTACT_EMAIL, 
  COMPANY_ADDRESS,
  SOCIAL_LINKEDIN_COMPANY,
  SOCIAL_TELEGRAM
} from '../utils/siteConfig';

// Lazy load non-critical sections
const Calculator = lazy(() => import('../components/sections/Calculator'));
const Services = lazy(() => import('../components/sections/Services'));
const SuccessStories = lazy(() => import('../components/sections/SuccessStories'));
const About = lazy(() => import('../components/sections/About'));
const Contact = lazy(() => import('../components/sections/Contact'));

const HomePage: React.FC = () => {
  // Optimize the largest contentful paint element
  useLCPOptimization('.dashboard-mockup'); // Target the dashboard mockup as it's likely the LCP element

  const homeSEOData = {
    title: 'AI VERTISE - AI-Powered Digital Advertising Agency in Poznań',
    description: 'Innovative AI-powered digital advertising agency in Poznań specializing in programmatic ads, paid social, and data-driven performance marketing strategies.',
    keywords: 'AI advertising agency, programmatic ads, digital marketing Poznań, paid social media, AI marketing tools, performance marketing, machine learning marketing, LLM marketing applications, generative AI, AI media buying, predictive analytics',
    ogTitle: 'AI VERTISE - Future-Ready Digital Advertising',
    ogDescription: 'Transform your marketing with AI-driven strategies, programmatic advertising, and data analytics for superior ROI and business growth.',
    path: '/',
    includeFaq: true,
    includeDataset: true,
    includeTechnologyService: true,
    includeSoftwareApplication: true,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "AI VERTISE",
      "description": SITE_DESCRIPTION,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": COMPANY_ADDRESS.street,
        "addressLocality": COMPANY_ADDRESS.city,
        "postalCode": COMPANY_ADDRESS.postalCode,
        "addressCountry": COMPANY_ADDRESS.countryCode
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "52.4064",
        "longitude": "16.9252"
      },
      "openingHours": "Mo,Tu,We,Th,Fr 09:00-17:00",
      "telephone": "",
      "email": CONTACT_EMAIL,
      "priceRange": "$$",
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "52.4064",
          "longitude": "16.9252"
        },
        "geoRadius": "50000"
      },
      "sameAs": [
        SOCIAL_LINKEDIN_COMPANY,
        SOCIAL_TELEGRAM
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO {...homeSEOData} />
      <main>
        {/* Hero section is critical, keep it non-lazy */}
        <PageTransition>
          <Hero />
        </PageTransition>
        <div className="space-y-24 md:space-y-32">
          <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading services...</div>}>
            <PageTransition>
              <Services />
            </PageTransition>
          </Suspense>
          
          <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading calculator...</div>}>
            <PageTransition>
              <Calculator />
            </PageTransition>
          </Suspense>
          
          <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading success stories...</div>}>
            <PageTransition>
              <SuccessStories />
            </PageTransition>
          </Suspense>
          
          <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading about section...</div>}>
            <PageTransition>
              <About />
            </PageTransition>
          </Suspense>
          
          <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading contact form...</div>}>
            <PageTransition>
              <Contact />
            </PageTransition>
          </Suspense>
        </div>
        <BackToTop />
      </main>
    </div>
  );
};

export default HomePage; 