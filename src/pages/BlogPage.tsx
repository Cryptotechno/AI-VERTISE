import React, { useEffect } from 'react';
import Blog from '../components/sections/Blog';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const BlogPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <Helmet>
          <title>AI-Driven Marketing Insights Blog | AI VERTISE</title>
          <meta name="description" content="Discover the latest trends and strategies in AI-driven digital advertising, programmatic marketing, and data-driven campaigns." />
          <meta name="keywords" content="AI marketing, programmatic advertising, digital marketing blog, AI advertising" />
          <meta property="og:title" content="AI-Driven Marketing Insights Blog | AI VERTISE" />
          <meta property="og:description" content="Discover the latest trends and strategies in AI-driven digital advertising, programmatic marketing, and data-driven campaigns." />
          <meta property="og:type" content="website" />
          <link rel="canonical" href="https://ai-vertise.com/blog" />
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "Blog",
                "name": "AI VERTISE Blog",
                "description": "Insights on AI-driven digital advertising and marketing",
                "url": "https://ai-vertise.com/blog"
              }
            `}
          </script>
        </Helmet>
        <main>
          <div className="pt-16">
            <Blog />
          </div>
        </main>
        <div className="mt-16 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPage; 