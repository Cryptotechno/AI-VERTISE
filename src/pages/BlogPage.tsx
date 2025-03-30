import React, { useEffect } from 'react';
import Blog from '../components/sections/Blog';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Button } from '../components/atoms/Button';

const BlogPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogSEOData = {
    title: 'AI-Driven Marketing Insights Blog | AI VERTISE',
    description: 'Discover the latest trends and strategies in AI-driven digital advertising, programmatic marketing, and data-driven campaigns.',
    keywords: 'AI marketing, programmatic advertising, digital marketing blog, AI advertising',
    ogTitle: 'AI-Driven Marketing Insights Blog | AI VERTISE',
    ogDescription: 'Discover the latest trends and strategies in AI-driven digital advertising, programmatic marketing, and data-driven campaigns.',
    ogType: 'website',
    canonicalUrl: 'https://ai-vertise.com/blog',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "AI VERTISE Blog",
      "description": "Insights on AI-driven digital advertising and marketing",
      "url": "https://ai-vertise.com/blog"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <SEO {...blogSEOData} />
        <main>
          <div className="pt-16">
            <Blog />
          </div>
        </main>
        <div className="mt-16 text-center">
          <Button 
            variant="primary"
            size="lg"
            as={Link}
            to="/"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage; 