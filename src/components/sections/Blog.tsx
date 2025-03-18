import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaClock, FaEye, FaFire, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { blogPosts } from '../../data/blogPosts';

const BlogCard: React.FC<{ post: typeof blogPosts[0]; featured?: boolean }> = ({ post, featured = false }) => (
  <Link to={`/blog/${post.slug}`} className="block h-full">
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full cursor-pointer ${featured ? 'border-2 border-indigo-500' : ''}`}
    >
      <div className={`relative ${featured ? 'h-64' : 'h-48'} overflow-hidden`}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
        {post.trending && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            <FaFire className="text-sm" />
            <span>Trending</span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <FaClock className="text-indigo-600" />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1">
            <FaEye className="text-indigo-600" />
            {post.views.toLocaleString()} views
          </span>
        </div>
        <h3 className={`${featured ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 mb-3 line-clamp-2`}>
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
                className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
            Read more
            <svg
              className="w-4 h-4"
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
}> = ({ search, setSearch, selectedCategory, setSelectedCategory }) => {
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(blogPosts.map(post => post.category))];
    return cats;
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-grow">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition ${
              selectedCategory === category 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
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
    <div className="bg-indigo-50 rounded-xl p-8 mt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"></div>
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Subscribe to our newsletter</h3>
        <p className="text-gray-600 mb-6">
          Get the latest insights about AI in digital advertising delivered straight to your inbox.
        </p>
        {submitted ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Thank you for subscribing! We'll be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Subscribe
            </button>
          </form>
        )}
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
      <nav className="flex items-center">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`mx-1 p-2 rounded-md ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-indigo-50'
          }`}
          aria-label="Previous page"
        >
          <FaChevronLeft />
        </button>
        
        {startPage > 1 && (
          <>
            <button
              onClick={() => setCurrentPage(1)}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === 1
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-indigo-50'
              }`}
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
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === number
                ? 'bg-indigo-600 text-white'
                : 'text-gray-700 hover:bg-indigo-50'
            }`}
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
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-indigo-50'
              }`}
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`mx-1 p-2 rounded-md ${
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

const Blog: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const trendingPost = useMemo(() => {
    return blogPosts.find(post => post.trending === true);
  }, []);
  
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      // Apply category filter
      if (selectedCategory !== 'All' && post.category !== selectedCategory) {
        return false;
      }
      
      // Apply search filter (search in title, summary, and tags)
      if (search) {
        const searchTerm = search.toLowerCase();
        return (
          post.title.toLowerCase().includes(searchTerm) ||
          post.summary.toLowerCase().includes(searchTerm) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
          post.category.toLowerCase().includes(searchTerm)
        );
      }
      
      return true;
    });
  }, [search, selectedCategory]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);
  
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

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Latest Articles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover insights about AI in digital advertising, from programmatic buying to social media marketing.
          </p>
        </div>

        <SearchAndFilter 
          search={search} 
          setSearch={setSearch} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />

        {trendingPost && !search && selectedCategory === 'All' && currentPage === 1 && (
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <FaFire className="mr-2 text-red-500" /> 
              Featured Article
            </h3>
            <BlogCard post={trendingPost} featured={true} />
          </div>
        )}

        {currentPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            
            <Pagination
              totalItems={filteredPostsCount}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
        
        <NewsletterSignup />
      </div>
    </section>
  );
};

export default Blog; 