import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaClock, FaEye, FaFire, FaSearch, FaChevronLeft, FaChevronRight, FaTags, FaFilter, FaRss, FaBrain, FaLightbulb, FaRobot, FaChartLine, FaChartBar, FaArchive } from 'react-icons/fa';
import blogPosts from '../../data/blogPosts';
import { 
  ProgrammaticAdSvg, 
  SocialMediaSvg, 
  PrivacySvg, 
  EcommerceSvg, 
  MetaverseSvg, 
  UKLandscapeSvg, 
  TelegramAISvg, 
  CustomAIToolsSvg 
} from '../ui/BlogImages';

// Helper function to get the appropriate SVG based on post ID or slug
const getPostImage = (post: typeof blogPosts[0]) => {
  if (post.id === '1' || post.slug === 'programmatic-advertising-ai') {
    return <ProgrammaticAdSvg />;
  } else if (post.id === '2' || post.slug === 'social-media-ai-content') {
    return <SocialMediaSvg />;
  } else if (post.id === '3' || post.slug === 'privacy-first-advertising') {
    return <PrivacySvg />;
  } else if (post.id === '4' || post.slug === 'ecommerce-personalization') {
    return <EcommerceSvg />;
  } else if (post.id === '5' || post.slug === 'metaverse-marketing-opportunities') {
    return <MetaverseSvg />;
  } else if (post.id === '6' || post.slug === 'uk-advertising-landscape-2024') {
    return <UKLandscapeSvg />;
  } else if (post.id === '7' || post.slug === 'telegram-ai-channel-selection') {
    return <TelegramAISvg />;
  } else if (post.id === '8' || post.slug === 'custom-ai-marketing-tools') {
    return <CustomAIToolsSvg />;
  }
  
  // Default fallback based on the image path in the post
  return (
    <div className="absolute inset-0 w-full h-full">
      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
    </div>
  );
};

const BlogCard: React.FC<{ post: typeof blogPosts[0]; featured?: boolean }> = ({ post, featured = false }) => (
  <Link to={`/blog/${post.slug}`} className="block h-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-xl group">
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-full cursor-pointer transition-all duration-300 ${featured ? 'border-2 border-indigo-500' : 'border border-gray-200'} hover:shadow-lg hover:border-indigo-300`}
    >
      <div className={`relative ${featured ? 'h-52' : 'h-48'} overflow-hidden`}>
        {getPostImage(post)}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-purple-600/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 z-10">
          <span className="bg-indigo-500/90 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm">
            {post.category}
          </span>
        </div>
        {post.trending && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-red-500/90 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm z-10">
            <FaFire className="text-white text-sm" />
            <span>Trending</span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span className="flex items-center gap-1.5">
            <FaClock className="text-indigo-500" />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            <FaEye className="text-indigo-500" />
            {post.views.toLocaleString()} views
          </span>
        </div>
        <h3 className={`${featured ? 'text-xl' : 'text-lg'} font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300`}>
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {post.summary}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md text-sm font-medium hover:bg-indigo-100 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md text-sm font-medium hover:bg-indigo-100 transition-colors duration-200">
                +{post.tags.length - 2}
              </span>
            )}
          </div>
          <span className="text-indigo-500 group-hover:text-indigo-700 font-medium flex items-center gap-1.5 transition-colors duration-200">
            Read more
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
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
          </span>
        </div>
      </div>
    </motion.div>
  </Link>
);

const SearchAndFilter: React.FC<{
  search: string;
  setSearch: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedRegion: string;
  setSelectedRegion: (value: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (value: boolean) => void;
}> = ({ 
  search, 
  setSearch, 
  selectedCategory, 
  setSelectedCategory, 
  selectedRegion, 
  setSelectedRegion,
  isFilterOpen, 
  setIsFilterOpen 
}) => {
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(blogPosts.map(post => post.category))];
    return cats;
  }, []);

  const regions = ['All Regions', 'US', 'UK'];
  
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    const checkIsDesktop = () => {
      if (typeof window !== 'undefined') {
        setIsDesktop(window.innerWidth >= 640);
      }
    };
    
    checkIsDesktop();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkIsDesktop);
      return () => window.removeEventListener('resize', checkIsDesktop);
    }
  }, []);

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white shadow-sm hover:border-indigo-300"
            aria-label="Search articles"
          />
        </div>
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="sm:hidden bg-white text-indigo-600 px-4 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-indigo-50 transition-colors border border-gray-200"
          aria-expanded={isFilterOpen}
          aria-controls="category-filters"
        >
          <FaFilter />
          Filters
        </button>
      </div>
      
      <AnimatePresence>
        {(isFilterOpen || isDesktop) && (
          <motion.div 
            id="category-filters"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            <div className="flex flex-col gap-4">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                        selectedCategory === category 
                          ? 'bg-indigo-600 text-white shadow-sm' 
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Regions */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Regions</h3>
                <div className="flex flex-wrap gap-2">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                        selectedRegion === region 
                          ? 'bg-indigo-600 text-white shadow-sm' 
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-600'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-xl p-8 mt-16 relative overflow-hidden shadow-sm border border-gray-200">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-indigo-500" />
        </svg>
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-indigo-600 p-3 rounded-full shadow-sm">
            <FaRss className="text-white text-xl" />
          </div>
        </div>
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#312e81] via-[#4338ca] to-[#6366f1] mb-4 text-center">Subscribe to our newsletter</h3>
        <p className="text-gray-600 mb-6 text-center max-w-xl mx-auto">
          Get the latest insights about AI in digital advertising delivered straight to your inbox.
        </p>
        {submitted ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-inner text-center" role="status" aria-live="polite">
            <p className="font-medium">Thank you for subscribing!</p>
            <p className="text-sm mt-1">We'll be in touch soon with our latest insights.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-xl mx-auto gap-3">
            <label htmlFor="blog-email" className="sr-only">Email address</label>
            <input
              type="email"
              id="blog-email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
              aria-describedby="newsletter-terms"
              aria-required="true"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md font-medium"
              aria-label="Subscribe to newsletter"
            >
              Subscribe
            </button>
          </form>
        )}
        <p id="newsletter-terms" className="text-xs text-center mt-4 text-gray-500">We respect your privacy. You can unsubscribe at any time.</p>
      </div>
    </div>
  );
};

const Pagination: React.FC<{
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}> = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) return null;
  
  const pageNumbers = [];
  const maxPageNumbers = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);
  
  if (endPage - startPage + 1 < maxPageNumbers) {
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="flex justify-center items-center mt-12">
      <nav className="flex items-center" aria-label="Pagination">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`mx-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-indigo-50'
          }`}
          aria-label="Previous page"
        >
          <FaChevronLeft aria-hidden="true" />
        </button>
        
        {startPage > 1 && (
          <>
            <button
              onClick={() => setCurrentPage(1)}
              className={`mx-1 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                currentPage === 1
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-indigo-50'
              }`}
              aria-label="Go to page 1"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="mx-1 px-3 py-1 text-gray-500">...</span>
            )}
          </>
        )}
        
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`mx-1 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              currentPage === number
                ? 'bg-indigo-600 text-white'
                : 'text-gray-700 hover:bg-indigo-50'
            }`}
            aria-label={`Go to page ${number}`}
            aria-current={currentPage === number ? 'page' : undefined}
          >
            {number}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="mx-1 px-3 py-1 text-gray-500">...</span>
            )}
            <button
              onClick={() => setCurrentPage(totalPages)}
              className={`mx-1 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                currentPage === totalPages
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-indigo-50'
              }`}
              aria-label={`Go to page ${totalPages}`}
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`mx-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-indigo-50'
          }`}
          aria-label="Next page"
        >
          <FaChevronRight />
        </button>
      </nav>
    </div>
  );
};

const AIInsightsPanel: React.FC<{
  setSelectedCategory: (value: string) => void;
  setSearch: (value: string) => void;
}> = ({ setSelectedCategory, setSearch }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24 border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <FaBrain className="text-2xl text-indigo-600" />
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#312e81] via-[#4338ca] to-[#6366f1]">AI Content Insights</h3>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <FaLightbulb className="text-lg text-indigo-600" />
            <h4 className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#312e81] via-[#4338ca] to-[#6366f1]">Trending Topics</h4>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => {
                setSelectedCategory('Programmatic Advertising');
                setSearch('');
              }}
              className="w-full text-left px-3 py-2 rounded-md bg-white text-gray-600 hover:bg-indigo-50 transition-colors duration-200 flex items-center gap-2 group border border-gray-200"
            >
              <FaChartLine className="text-indigo-600 group-hover:text-indigo-600 transition-colors duration-200" />
              <span>Programmatic Trends</span>
            </button>
            <button
              onClick={() => {
                setSelectedCategory('Social Media');
                setSearch('');
              }}
              className="w-full text-left px-3 py-2 rounded-md bg-white text-gray-600 hover:bg-indigo-50 transition-colors duration-200 flex items-center gap-2 group border border-gray-200"
            >
              <FaRobot className="text-indigo-600 group-hover:text-indigo-600 transition-colors duration-200" />
              <span>Social Media</span>
            </button>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <FaTags className="text-lg text-indigo-500" />
            <h4 className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#312e81] via-[#4338ca] to-[#6366f1]">Popular Tags</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {['ai', 'programmatic', 'privacy', 'optimization', 'social media'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearch(tag)}
                className="px-2.5 py-1 bg-white rounded-md text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 border border-gray-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <FaRss className="text-lg text-indigo-500" />
            <h4 className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#312e81] via-[#4338ca] to-[#6366f1]">Latest Updates</h4>
          </div>
          <div className="space-y-2">
            {['New AI features', 'Privacy updates', 'Platform changes'].map((update) => (
              <div key={update} className="px-3 py-2 bg-white rounded-md text-gray-700 border border-gray-200">
                {update}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// New component for featured region content
const FeaturedRegion: React.FC<{
  region: string;
  setSelectedRegion: (region: string) => void;
}> = ({ region, setSelectedRegion }) => {
  const regionData = {
    'US': {
      title: 'US Market Insights',
      description: 'Discover the latest trends and strategies for the American digital advertising landscape.',
      stats: [
        { label: 'Market Size', value: '$315B' },
        { label: 'Growth', value: '+9.8%' },
        { label: 'Mobile Share', value: '72%' },
      ],
      icon: FaChartLine
    },
    'UK': {
      title: 'UK Market Insights',
      description: 'Explore strategies tailored for success in the British digital advertising ecosystem.',
      stats: [
        { label: 'Market Size', value: '£31.8B' },
        { label: 'Growth', value: '+7.8%' },
        { label: 'Mobile Share', value: '64%' },
      ],
      icon: FaChartBar
    }
  };

  const data = region === 'UK' ? regionData.UK : regionData.US;
  const Icon = data.icon;
  
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-white p-2.5 rounded-lg shadow-sm">
          <Icon className="text-indigo-600 text-xl" />
        </div>
        <h3 className="text-lg font-bold text-indigo-900">
          {data.title}
        </h3>
      </div>
      
      <p className="text-indigo-800 mb-5 text-sm">
        {data.description}
      </p>
      
      <div className="grid grid-cols-3 gap-3 mb-5">
        {data.stats.map((stat, index) => (
          <div key={index} className="bg-white p-3 rounded-lg shadow-sm text-center">
            <div className="text-indigo-900 font-bold">{stat.value}</div>
            <div className="text-xs text-indigo-600">{stat.label}</div>
          </div>
        ))}
      </div>
      
      <button
        onClick={() => setSelectedRegion(region)}
        className="w-full px-4 py-2.5 bg-white text-indigo-600 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-indigo-100 transition-colors border border-indigo-100 shadow-sm"
      >
        View {region} Content
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

const Blog: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [featuredRegion, setFeaturedRegion] = useState<'US' | 'UK'>('US');
  const itemsPerPage = 6;
  
  const trendingPost = useMemo(() => {
    return blogPosts.find(post => post.trending === true);
  }, []);
  
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = 
        search === '' || 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.summary.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
      
      const matchesCategory = 
        selectedCategory === 'All' || 
        post.category === selectedCategory;
      
      const matchesRegion = 
        selectedRegion === 'All Regions' || 
        post.tags.some(tag => tag.toLowerCase() === selectedRegion.toLowerCase());
      
      return matchesSearch && matchesCategory && matchesRegion;
    });
  }, [search, selectedCategory, selectedRegion]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, selectedRegion]);
  
  // Get current posts based on pagination
  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    return filteredPosts
      .filter(post => post.id !== trendingPost?.id)
      .slice(indexOfFirstPost, indexOfLastPost);
  }, [filteredPosts, currentPage, itemsPerPage, trendingPost]);
  
  // Count of filtered posts excluding the trending post
  const filteredPostsCount = useMemo(() => {
    return filteredPosts.filter(post => post.id !== trendingPost?.id).length;
  }, [filteredPosts, trendingPost]);

  // Auto-close mobile filters when window width changes
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= 640) {
        setIsFilterOpen(false);
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Toggle featured region every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedRegion(prev => prev === 'US' ? 'UK' : 'US');
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 pb-0 bg-[#f9f7fd] -mb-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-full text-indigo-600 text-sm font-medium mb-3 border border-gray-200 shadow-sm">
            <FaRobot className="text-indigo-600" />
            <span>AI-Enhanced Content Platform</span>
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#312e81] via-[#4338ca] to-[#6366f1]">
            Insights & Intelligence
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover AI-powered insights about digital advertising, programmatic strategies, and data-driven marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
              <Link
                to="/blog/archive"
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                <FaArchive className="text-sm" />
                Archive
              </Link>
            </div>
            <SearchAndFilter 
              search={search} 
              setSearch={setSearch} 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
            />

            {trendingPost && !search && selectedCategory === 'All' && currentPage === 1 && (
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-2 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                    <FaFire className="text-red-500" /> 
                    <span className="font-semibold text-red-600 text-sm">AI-Recommended Article</span>
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse"></div>
                </div>
                <BlogCard post={trendingPost} featured={true} />
              </motion.div>
            )}

            {currentPosts.length > 0 ? (
              <>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {currentPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="flex h-full"
                    >
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
                </motion.div>
                
                <Pagination
                  totalItems={filteredPostsCount}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </>
            ) : (
              <motion.div 
                className="text-center py-16 bg-white rounded-xl shadow-md my-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="max-w-md mx-auto">
                  <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <FaSearch className="text-xl text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">No articles found</h3>
                  <p className="text-gray-600 mb-6">Our AI couldn't find any articles matching your search criteria.</p>
                  <button 
                    onClick={() => {
                      setSearch('');
                      setSelectedCategory('All');
                      setSelectedRegion('All Regions');
                    }}
                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="space-y-8">
            {/* Featured Region - alternates between US and UK */}
            <FeaturedRegion 
              region={featuredRegion} 
              setSelectedRegion={setSelectedRegion} 
            />
            
            <AIInsightsPanel setSelectedCategory={setSelectedCategory} setSearch={setSearch} />
            
            <NewsletterSignup />
          </div>
        </div>
        
        <div className="mt-12 mb-0 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-colors">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-gray-200">
              <FaBrain className="text-xl text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#312e81] via-[#4338ca] to-[#6366f1] mb-2">AI Content Analysis</h3>
            <p className="text-gray-600">Our AI analyzes content patterns to determine what information is most valuable to readers.</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-colors">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-gray-200">
              <FaRobot className="text-xl text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#312e81] via-[#4338ca] to-[#6366f1] mb-2">Personalized Insights</h3>
            <p className="text-gray-600">Machine learning algorithms customize recommendations based on your interests.</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-colors">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-gray-200">
              <FaChartLine className="text-xl text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#312e81] via-[#4338ca] to-[#6366f1] mb-2">Trend Prediction</h3>
            <p className="text-gray-600">Our predictive algorithms identify emerging marketing trends before they go mainstream.</p>
          </div>
        </div>
        
        <div className="text-center mt-8 mb-0 pb-0">
          <Link
            to="/calculator"
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transition-colors mb-4"
          >
            Try AI Media Mix Calculator
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <p className="text-gray-600 text-lg mb-0 pb-0">
            Join these success stories and transform your digital marketing performance
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blog; 