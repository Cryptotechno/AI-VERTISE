import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBookmark, FaRegBookmark, FaShare, FaEye, FaClock, FaUser } from 'react-icons/fa';
import { blogPosts } from '../../data/blogPosts';

const Blog: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Articles
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover insights, strategies, and best practices for leveraging AI in your marketing efforts.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-w-16 aspect-h-9">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Category and Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-[#6C5CE7] to-[#a594ff] text-white text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#6C5CE7] transition-colors">
                    {post.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-gray-600 mb-6 flex-grow">
                    {post.summary}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center space-x-4 text-gray-600 text-sm">
                    <div className="flex items-center space-x-2">
                      <FaUser className="text-[#6C5CE7]" />
                      <span>{post.position}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaClock className="text-[#6C5CE7]" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaEye className="text-[#6C5CE7]" />
                      <span>{post.views.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog; 