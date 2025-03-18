import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBookmark, FaRegBookmark, FaShare, FaEye, FaClock, FaUser } from 'react-icons/fa';
import { BlogPost } from '../../data/blogPosts';

interface BlogArticleProps {
  post: BlogPost;
}

const BlogArticle: React.FC<BlogArticleProps> = ({ post }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: window.location.href
      });
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <span className="px-4 py-2 bg-gradient-to-r from-[#6C5CE7] to-[#a594ff] text-white rounded-full text-sm font-medium">
            {post.category}
          </span>
          <span className="text-gray-500 text-sm">{post.date}</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center space-x-6 text-gray-600">
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
            <span>{post.views.toLocaleString()} views</span>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative mb-12 rounded-2xl overflow-hidden">
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={post.image}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-lg max-w-none"
      >
        {/* Introduction */}
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          {post.content.introduction}
        </p>

        {/* Sections */}
        {post.content.sections.map((section, index) => (
          <section key={index} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
            <p className="text-gray-700 mb-6">{section.content}</p>
            
            {section.list && (
              <ul className="list-disc pl-6 mb-6 space-y-2">
                {section.list.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-700">{item}</li>
                ))}
              </ul>
            )}

            {section.code && (
              <div className="bg-gray-900 rounded-lg p-6 mb-6 overflow-x-auto">
                <pre className="text-gray-100">
                  <code>{section.code}</code>
                </pre>
              </div>
            )}
          </section>
        ))}

        {/* Conclusion */}
        <p className="text-xl text-gray-700 leading-relaxed">
          {post.content.conclusion}
        </p>
      </motion.div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 text-gray-600 hover:text-[#6C5CE7] transition-colors"
            >
              {isSaved ? <FaBookmark /> : <FaRegBookmark />}
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 text-gray-600 hover:text-[#6C5CE7] transition-colors"
            >
              <FaShare />
              <span>Share</span>
            </button>
          </div>
        </div>
      </footer>
    </article>
  );
};

export default BlogArticle; 