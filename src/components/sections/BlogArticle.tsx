import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaClock, FaEye, FaShareAlt, FaLinkedin, FaTwitter, FaFacebook, FaLink, FaBookmark, FaChartLine, FaLightbulb, FaFire, FaChartBar, FaBullseye, FaDatabase, FaBrain, FaInfoCircle } from 'react-icons/fa';
import { BlogPost } from '../../data/blogPosts';
import { ProgrammaticAdSvg, SocialMediaSvg, PrivacySvg } from '../ui/BlogImages';
import { IconType } from 'react-icons';
import { SEO } from '../common/SEO';
import { SITE_URL, SITE_DESCRIPTION, OG_IMAGE_ABSOLUTE_URL } from '../../utils/siteConfig';

// Map pattern names to CSS classes
const patternClasses: { [key: string]: string } = {
  "circuit-board": "bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-400",
  "gradient-mesh": "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-400",
  "blueprint": "bg-blue-50 border-blue-400",
  "neural-network": "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-400",
  "social-network": "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-400",
  "dot-matrix": "bg-gray-50 border-gray-400",
  "platform-icons": "bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-400",
  "data-flow": "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-400",
  "video-editing": "bg-gradient-to-br from-purple-50 to-fuchsia-50 border-purple-400",
  "streaming-service": "bg-gradient-to-r from-sky-50 to-indigo-50 border-sky-400",
  "video-analytics": "bg-gradient-to-br from-violet-50 to-purple-50 border-violet-400",
  "content-creation": "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-400",
  "placement-optimization": "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-400",
  "measurement-attribution": "bg-gradient-to-r from-blue-50 to-sky-50 border-blue-400",
  "keyword-discovery": "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-400",
  "bid-management": "bg-gradient-to-r from-green-50 to-emerald-50 border-green-400",
  "ad-creative": "bg-gradient-to-br from-rose-50 to-pink-50 border-rose-400",
  "influencer-discovery": "bg-gradient-to-r from-violet-50 to-purple-50 border-violet-400",
  "campaign-metrics": "bg-gradient-to-br from-cyan-50 to-sky-50 border-cyan-400",
  "code-snippet": "bg-gray-50 border-gray-600",
  "privacy-techniques": "bg-gradient-to-br from-slate-50 to-gray-50 border-slate-400",
  "global-regulations": "bg-gradient-to-r from-red-50 to-rose-50 border-red-400"
};

// Map icon names to components
const iconMap: { [key: string]: IconType } = {
  'chart-line': FaChartLine,
  'lightbulb': FaLightbulb,
  'fire': FaFire,
  'chart-bar': FaChartBar,
  'bullseye': FaBullseye,
  'database': FaDatabase,
  'brain': FaBrain,
  'info-circle': FaInfoCircle
};

// Reading time estimator component
const ReadingProgress: React.FC<{ scrollPercentage: number }> = ({ scrollPercentage }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-indigo-600 transition-all duration-300"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
};

// Progress tracker component
const ProgressTracker: React.FC<{ activeSection: number, totalSections: number }> = ({ activeSection, totalSections }) => {
  return (
    <div 
      className="fixed top-1/3 right-6 hidden xl:flex flex-col items-center space-y-2 z-20"
      role="navigation"
      aria-label="Article sections navigation"
    >
      {Array.from({ length: totalSections }).map((_, index) => (
        <div 
          key={index}
          className={`w-2 h-2 rounded-full ${
            index < activeSection 
              ? 'bg-indigo-600' 
              : index === activeSection 
                ? 'bg-indigo-600 ring-4 ring-indigo-100' 
                : 'bg-gray-300'
          } transition-all duration-300`}
          role="button"
          aria-label={`Jump to section ${index + 1}`}
          aria-current={index === activeSection ? "true" : "false"}
          onClick={() => {
            const section = document.getElementById(`section-${index}`);
            section?.scrollIntoView({ behavior: 'smooth' });
          }}
          tabIndex={0}
        />
      ))}
    </div>
  );
};

// Article metadata component
const ArticleMeta: React.FC<{ post: BlogPost, readTime: string }> = ({ post, readTime }) => {
  return (
    <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 md:gap-6 mb-8">
      <div className="flex items-center">
        <FaClock className="mr-2 text-indigo-600" />
        <span>{readTime}</span>
      </div>
      <div className="flex items-center">
        <FaEye className="mr-2 text-indigo-600" />
        <span>{post.views.toLocaleString()} views</span>
      </div>
      <div className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
        {post.category}
      </div>
      <div className="flex items-center">
        <span className="font-medium text-gray-700">By {post.position}</span>
      </div>
    </div>
  );
};

// ShareBar component
const ShareBar: React.FC<{ title: string, url: string }> = ({ title, url }) => {
  const [saved, setSaved] = useState(false);
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div 
        className="p-2 lg:p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, '_blank')}
      >
        <FaTwitter className="text-[#1DA1F2] text-lg lg:text-xl" />
      </div>
      <div 
        className="p-2 lg:p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank')}
      >
        <FaLinkedin className="text-[#0077B5] text-lg lg:text-xl" />
      </div>
      <div 
        className="p-2 lg:p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank')}
      >
        <FaFacebook className="text-[#4267B2] text-lg lg:text-xl" />
      </div>
      <div 
        className="p-2 lg:p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(url);
          alert('Link copied to clipboard!');
        }}
      >
        <FaLink className="text-gray-600 text-lg lg:text-xl" />
      </div>
      <div 
        className="p-2 lg:p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer" 
        onClick={() => setSaved(!saved)}
      >
        <FaBookmark className={`text-lg lg:text-xl ${saved ? 'text-indigo-600' : 'text-gray-400'}`} />
      </div>
    </div>
  );
};

// Table of Contents component
const TableOfContents: React.FC<{ sections: { title: string }[], activeSection: number, setActiveSection: (index: number) => void }> = ({ sections, activeSection, setActiveSection }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-8 hidden md:block w-full">
      <h3 className="text-lg font-bold text-gray-900 mb-4">📑 In This Article</h3>
      <ul className="space-y-2 overflow-y-auto pb-2 pr-2">
        {sections.map((section, index) => (
          <li key={index}>
            <button
              onClick={() => {
                const element = document.getElementById(`section-${index}`);
                if (element) {
                  const headerHeight = 120; // Estimated header height
                  const y = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                  setActiveSection(index);
                }
              }}
              className={`text-left w-full px-2 py-1.5 rounded transition-colors duration-200 text-sm whitespace-normal ${
                activeSection === index 
                  ? 'bg-indigo-100 text-indigo-800 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {index + 1}. {section.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// AccentBox component
const AccentBox: React.FC<{
  type: 'note' | 'highlight' | 'statistic';
  content: string;
  icon?: string;
}> = ({ type, content, icon }) => {
  const IconComponent = icon ? iconMap[icon] || FaInfoCircle : FaInfoCircle;
  
  const styles = {
    note: {
      wrapper: 'bg-emerald-50 border border-emerald-100',
      icon: 'text-emerald-600',
      title: 'text-emerald-800',
      content: 'text-emerald-700'
    },
    highlight: {
      wrapper: 'bg-indigo-50 border border-indigo-100',
      icon: 'text-indigo-600',
      title: 'text-indigo-800',
      content: 'text-indigo-700'
    },
    statistic: {
      wrapper: 'bg-purple-50 border border-purple-100',
      icon: 'text-purple-600',
      title: 'text-purple-800',
      content: 'text-purple-700'
    }
  };

  const style = styles[type];

  return (
    <div className={`rounded-xl p-4 my-6 ${style.wrapper}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-1 ${style.icon}`}>
          <IconComponent className="text-lg" />
        </div>
        <div>
          <div className={`font-semibold mb-1 ${style.title}`}>
            {type === 'note' && 'Important Note'}
            {type === 'highlight' && 'Key Highlight'}
            {type === 'statistic' && 'Key Metric'}
          </div>
          <div className={`${style.content}`}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

// Section component
const Section: React.FC<{ section: BlogPost['content']['sections'][0], index: number, isActive: boolean }> = ({ section, index, isActive }) => {
  // On mobile, border should be thinner and less intrusive
  const patternClass = section.pattern ? patternClasses[section.pattern] || '' : '';

  return (
    <motion.div 
      id={`section-${index}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-14 pb-8 ${isActive ? 'scroll-mt-32' : ''}`}
    >
      <h2 className={`text-2xl md:text-3xl font-bold mb-6 flex items-start gap-3 ${isActive ? 'text-indigo-700' : 'text-gray-900'}`}>
        <span className="inline-flex flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 items-center justify-center text-sm">
          {index + 1}
        </span>
        <span>{section.title}</span>
      </h2>
      
      {/* Mobile optimized content container */}
      <div className={`prose prose-lg max-w-none mb-6 ${patternClass} p-4 md:p-6 rounded-xl border-l-2 md:border-l-4`}>
        <p className="text-gray-700 leading-relaxed mb-6">{section.content}</p>
        
        {section.quote && (
          <blockquote className="border-l-2 md:border-l-4 border-indigo-400 pl-4 italic my-8 relative bg-indigo-50 p-4 md:p-6 rounded-r-lg">
            <div className="absolute -left-2 -top-2 text-indigo-200 text-4xl md:text-6xl opacity-20">"</div>
            <div className="relative z-10">
              <p className="text-indigo-900 not-italic font-medium mb-4">{section.quote.text}</p>
              <footer className="text-right">
                <span className="font-bold text-indigo-700 block">{section.quote.author}</span>
                {section.quote.position && (
                  <span className="text-gray-600 text-sm block">
                    {section.quote.position}{section.quote.company ? `, ${section.quote.company}` : ''}
                  </span>
                )}
              </footer>
            </div>
          </blockquote>
        )}
        
        {section.accent && (
          <AccentBox 
            type={section.accent.type} 
            content={section.accent.content} 
            icon={section.accent.icon} 
          />
        )}
        
        {section.list && section.list.length > 0 && (
          <div className="my-6">
            <ul className="space-y-3">
              {section.list.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Related articles component
const RelatedArticles: React.FC = () => (
  <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <div className="flex items-center gap-2 mb-6">
      <span className="text-xl">📚</span>
      <h3 className="text-xl font-bold text-gray-900">Related Articles</h3>
    </div>
    
    <div className="space-y-6">
      <div className="group">
        <div className="text-sm text-indigo-600 font-medium mb-1">Programmatic Advertising</div>
        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
          Future Trends in Programmatic Advertising
        </h4>
        <p className="text-gray-600 mt-2 mb-3">
          Discover what's next in the world of programmatic advertising technology.
        </p>
        <Link 
          to="/blog/future-trends" 
          className="inline-flex items-center text-indigo-600 font-medium group-hover:text-indigo-700"
        >
          Read more 
          <svg
            className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      <div className="group">
        <div className="text-sm text-indigo-600 font-medium mb-1">AI in Marketing</div>
        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
          How AI is Reshaping Creative Processes
        </h4>
        <p className="text-gray-600 mt-2 mb-3">
          Explore the impact of artificial intelligence on marketing creative workflows.
        </p>
        <Link 
          to="/blog/ai-creative-processes" 
          className="inline-flex items-center text-indigo-600 font-medium group-hover:text-indigo-700"
        >
          Read more 
          <svg
            className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  </div>
);

// Newsletter signup component
const NewsletterSignup: React.FC = () => (
  <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-6">
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xl">🚀</span>
      <h3 className="text-xl font-bold text-gray-900">Stay Ahead of AI Advertising Trends</h3>
    </div>
    
    <p className="text-gray-600 mb-6">
      Get exclusive insights and cutting-edge strategies delivered to your inbox.
    </p>
    
    <form className="space-y-4">
      <div>
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          type="email"
          id="newsletter-email"
          name="email"
          placeholder="Your email address"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200"
          aria-describedby="newsletter-privacy"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
      >
        Subscribe
      </button>
      <p id="newsletter-privacy" className="text-sm text-gray-500 text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  </div>
);

// Function to get the appropriate SVG based on post ID or slug
const getPostImage = (post: BlogPost) => {
  if (post.id === '1' || post.slug === 'programmatic-advertising-ai') {
    return <ProgrammaticAdSvg />;
  } else if (post.id === '2' || post.slug === 'social-media-ai-ads') {
    return <SocialMediaSvg />;
  } else if (post.id === '3' || post.slug === 'privacy-first-advertising') {
    return <PrivacySvg />;
  }
  // Default fallback
  return <ProgrammaticAdSvg />;
};

// Main BlogArticle component
const BlogArticle: React.FC<{ post: BlogPost }> = ({ post }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const sections = post.content.sections;
  
  const readTime = post.readTime || `${Math.max(1, Math.ceil((post.content.wordCount || 500) / 200))} min read`;
  
  // Calculate word count if not provided
  const wordCount = post.content.wordCount || 
    (post.content.introduction.split(' ').length + 
    post.content.sections.reduce((acc, section) => acc + section.content.split(' ').length, 0) + 
    post.content.conclusion.split(' ').length);
  
  // Prepare the article SEO data dynamically based on post content
  const articleSEOData = {
    title: `${post.title} | AI VERTISE Blog`,
    description: post.excerpt || post.summary || SITE_DESCRIPTION,
    keywords: post.tags.join(', '),
    ogTitle: post.title,
    ogDescription: post.excerpt || post.summary || SITE_DESCRIPTION,
    ogType: 'article',
    ogImage: post.image || post.featuredImage || OG_IMAGE_ABSOLUTE_URL,
    twitterTitle: post.title,
    twitterDescription: post.excerpt || post.summary || SITE_DESCRIPTION,
    canonicalUrl: `https://ai-vertise.com/blog/${post.slug}`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt || post.summary,
      "image": post.featuredImage || post.image || "https://ai-vertise.com/images/blog-featured.jpg",
      "author": {
        "@type": "Person",
        "name": post.position || "AI VERTISE Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "AI VERTISE",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ai-vertise.com/logo.png"
        }
      },
      "url": `https://ai-vertise.com/blog/${post.slug}`,
      "datePublished": post.publishDate || post.date,
      "dateModified": post.lastUpdated || post.publishDate || post.date,
      "articleSection": post.category,
      "keywords": post.tags.join(','),
      "wordCount": wordCount,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://ai-vertise.com/blog/${post.slug}`
      }
    }
  };

  const handleScroll = () => {
    // Calculate scroll percentage
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    setScrollPercentage(scrollPercent);
    
    // Determine active section
    for (let i = 0; i < sections.length; i++) {
      const element = document.getElementById(`section-${i}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(i);
          break;
        }
      }
    }
  }

  // Ensure scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Handle scroll events to update the active section and scroll percentage
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <article className="py-24" style={{ backgroundColor: '#f9f7fd' }}>
      <div className="container mx-auto px-4">
        <SEO {...articleSEOData} />
        <ReadingProgress scrollPercentage={scrollPercentage} />
        <ProgressTracker activeSection={activeSection} totalSections={sections.length} />
        
        <article className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-6">
            <Link to="/blog" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors mb-4">
              <FaArrowLeft className="mr-2" />
              <span>Back to all articles</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 xl:col-span-9">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>
              
              <ArticleMeta post={post} readTime={readTime} />
              
              <div className="rounded-xl overflow-hidden mb-10 h-64 md:h-80 lg:h-96 relative">
                {getPostImage(post)}
              </div>

              <div className="prose prose-lg max-w-none mb-10">
                <p className="text-xl leading-relaxed text-gray-700">{post.content.introduction}</p>
              </div>
              
              <TableOfContents 
                sections={sections} 
                activeSection={activeSection} 
                setActiveSection={setActiveSection} 
              />
              
              {sections.map((section, index) => (
                <Section 
                  key={index} 
                  section={section} 
                  index={index} 
                  isActive={index === activeSection} 
                />
              ))}
              
              <div className="prose prose-lg max-w-none border-t border-gray-200 pt-10">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Conclusion</h2>
                <p className="text-gray-700 leading-relaxed">{post.content.conclusion}</p>
              </div>
            </div>
            
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-24">
                <div className="mb-8 flex justify-center lg:justify-start lg:pl-6">
                  <ShareBar title={post.title} url={window.location.href} />
                </div>
                
                <div className="hidden lg:block">
                  <RelatedArticles />
                </div>
                
                <div className="mt-10 hidden lg:block">
                  <NewsletterSignup />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 lg:hidden">
            <RelatedArticles />
          </div>
          
          <div className="mt-10 lg:hidden">
            <NewsletterSignup />
          </div>
        </article>
      </div>
    </article>
  );
};

export default BlogArticle; 