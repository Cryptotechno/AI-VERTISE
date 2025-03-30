import React from 'react';
import Calculator from '../components/sections/Calculator';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import SuccessStories from '../components/sections/SuccessStories';
import About from '../components/sections/About';
import Contact from '../components/sections/Contact';
import BackToTop from '../components/ui/BackToTop';
import PageTransition from '../components/ui/PageTransition';
import { SEO } from '../components/common/SEO';
import { 
  SITE_DESCRIPTION, 
  CONTACT_EMAIL, 
  COMPANY_ADDRESS,
  SOCIAL_LINKEDIN,
  SOCIAL_TELEGRAM
} from '../utils/siteConfig';

const HomePage: React.FC = () => {
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
        SOCIAL_LINKEDIN,
        SOCIAL_TELEGRAM
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO {...homeSEOData} />
      <main>
        <PageTransition>
          <Hero />
        </PageTransition>
        <div className="space-y-24 md:space-y-32">
          <PageTransition>
            <Services />
          </PageTransition>
          <PageTransition>
            <Calculator />
          </PageTransition>
          <PageTransition>
            <SuccessStories />
          </PageTransition>
          <PageTransition>
            <About />
          </PageTransition>
          <PageTransition>
            <Contact />
          </PageTransition>
        </div>
        <BackToTop />
      </main>
    </div>
  );
};

export default HomePage; 