import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaClock, FaEye, FaFire } from 'react-icons/fa';
import { blogPosts } from '../../data/blogPosts';

const BlogCard: React.FC<{ post: typeof blogPosts[0] }> = ({ post }) => (
  <Link to={`/blog/${post.slug}`} className="block">
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
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
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
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

const Blog: React.FC = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog; 