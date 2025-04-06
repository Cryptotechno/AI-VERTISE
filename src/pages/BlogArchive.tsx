import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaCalendarAlt, FaChevronLeft, FaTag, FaMapMarkerAlt } from 'react-icons/fa';
import blogPosts from '../data/blogPosts';
import { SEO } from '../components/common/SEO';
import { AnimatePresence, motion } from 'framer-motion';

type ArchiveParams = {
  year?: string;
  month?: string;
};

interface PostsByDate {
  [year: string]: {
    [month: string]: typeof blogPosts;
  };
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const BlogArchive: React.FC = () => {
  const { year, month } = useParams<ArchiveParams>();
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 640);
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);
  
  // Extract unique years and months from blog posts
  const postsByDate: PostsByDate = useMemo(() => {
    const result: PostsByDate = {};
    
    blogPosts.forEach(post => {
      const date = new Date(post.date);
      const postYear = date.getFullYear().toString();
      const postMonth = (date.getMonth() + 1).toString().padStart(2, '0');
      
      if (!result[postYear]) {
        result[postYear] = {};
      }
      
      if (!result[postYear][postMonth]) {
        result[postYear][postMonth] = [];
      }
      
      result[postYear][postMonth].push(post);
    });
    
    return result;
  }, []);
  
  // Get years in descending order
  const years = useMemo(() => {
    return Object.keys(postsByDate).sort((a, b) => parseInt(b) - parseInt(a));
  }, [postsByDate]);
  
  // Get months for the selected year in descending order
  const months = useMemo(() => {
    if (!year || !postsByDate[year]) return [];
    return Object.keys(postsByDate[year]).sort((a, b) => parseInt(b) - parseInt(a));
  }, [year, postsByDate]);
  
  // Get posts for the selected year and month, filtered by region if applicable
  const filteredPosts = useMemo(() => {
    if (!year) return [];
    
    if (year && month && postsByDate[year]?.[month]) {
      const posts = postsByDate[year][month];
      
      if (selectedRegion === 'all') {
        return posts;
      } else {
        return posts.filter(post => 
          post.tags.some(tag => tag.toLowerCase() === selectedRegion.toLowerCase())
        );
      }
    }
    
    // If only year is selected, combine all posts from all months in that year
    if (year && postsByDate[year]) {
      const posts = Object.values(postsByDate[year]).flat();
      
      if (selectedRegion === 'all') {
        return posts;
      } else {
        return posts.filter(post => 
          post.tags.some(tag => tag.toLowerCase() === selectedRegion.toLowerCase())
        );
      }
    }
    
    return [];
  }, [year, month, postsByDate, selectedRegion]);
  
  // SEO data for the archive page
  const archiveSEOData = {
    title: `Blog Archive ${year ? `- ${year}` : ''} ${month && year ? `- ${monthNames[parseInt(month) - 1]}` : ''} | AI VERTISE`,
    description: `Browse our archive of AI marketing insights ${year ? `from ${year}` : ''} ${month && year ? `in ${monthNames[parseInt(month) - 1]}` : ''}.`,
    keywords: `blog archive, digital marketing articles, AI marketing insights, ${year || ''}, ${month && monthNames[parseInt(month) - 1] || ''}`,
    ogTitle: `AI VERTISE Blog Archive ${year ? `- ${year}` : ''} ${month && year ? `- ${monthNames[parseInt(month) - 1]}` : ''}`,
    ogDescription: `Browse our archive of AI marketing insights ${year ? `from ${year}` : ''} ${month && year ? `in ${monthNames[parseInt(month) - 1]}` : ''}.`,
  };
  
  // Handle year and month selection
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = event.target.value;
    if (selectedYear === 'all') {
      navigate('/blog/archive');
    } else {
      navigate(`/blog/archive/${selectedYear}`);
    }
  };
  
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = event.target.value;
    if (selectedMonth === 'all') {
      navigate(`/blog/archive/${year}`);
    } else {
      navigate(`/blog/archive/${year}/${selectedMonth}`);
    }
  };
  
  // Handle region selection
  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
  };
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9f7fd' }}>
      <SEO {...archiveSEOData} />
      <div className="container mx-auto px-4 py-24">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-indigo-900">
              Blog Archive
              {year && ` - ${year}`}
              {month && year && ` - ${monthNames[parseInt(month) - 1]}`}
            </h1>
            <Link to="/blog" className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2">
              <FaChevronLeft />
              Back to Blog
            </Link>
          </div>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Browse our complete collection of articles on AI-driven digital advertising and marketing strategies.
            Use the filters below to find content from specific time periods or regions.
          </p>
          
          {/* Archive Navigation */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Year Selection */}
              <div>
                <label htmlFor="year-select" className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <FaCalendarAlt className="text-indigo-600" />
                  Year
                </label>
                <select
                  id="year-select"
                  value={year || 'all'}
                  onChange={handleYearChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                >
                  <option value="all">All Years</option>
                  {years.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              
              {/* Month Selection - Only enabled if year is selected */}
              <div>
                <label htmlFor="month-select" className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <FaCalendarAlt className="text-indigo-600" />
                  Month
                </label>
                <select
                  id="month-select"
                  value={month || 'all'}
                  onChange={handleMonthChange}
                  disabled={!year}
                  className={`w-full p-3 border border-gray-200 rounded-lg ${
                    year ? 'focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white' 
                         : 'bg-gray-100 cursor-not-allowed'
                  }`}
                >
                  <option value="all">All Months</option>
                  {months.map(m => (
                    <option key={m} value={m}>
                      {monthNames[parseInt(m) - 1]}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Region Selection */}
              <div>
                <label htmlFor="region-select" className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <FaMapMarkerAlt className="text-indigo-600" />
                  Region
                </label>
                <select
                  id="region-select"
                  value={selectedRegion}
                  onChange={handleRegionChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                >
                  <option value="all">All Regions</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Post List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <Link 
                key={post.id} 
                to={`/blog/${post.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                  <div className="p-6 flex-grow">
                    <div className="flex items-center gap-2 mb-4 text-sm">
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md font-medium">
                        {post.category}
                      </span>
                      
                      {post.tags.some(tag => tag === 'US' || tag === 'UK') && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md font-medium flex items-center gap-1">
                          <FaMapMarkerAlt className="text-xs" />
                          {post.tags.includes('US') ? 'US' : 'UK'}
                        </span>
                      )}
                    </div>
                    
                    <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                      {post.summary}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <FaCalendarAlt className="mr-1 text-indigo-600" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No posts found</h3>
              <p className="text-gray-600">
                Try changing your filters or check back later for new content.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogArchive; 