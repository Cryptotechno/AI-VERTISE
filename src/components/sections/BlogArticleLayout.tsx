import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaClock, FaShare, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

interface BlogArticleLayoutProps {
  article: {
    title: string;
    date: string;
    author: string;
    category: string;
    readTime: string;
    image: string;
    content: React.ReactNode;
  };
  nextArticle?: {
    slug: string;
    title: string;
    image: string;
  };
  previousArticle?: {
    slug: string;
    title: string;
    image: string;
  };
}

export const BlogArticleLayout: React.FC<BlogArticleLayoutProps> = ({
  article,
  nextArticle,
  previousArticle
}) => {
  return (
    <article className="min-h-screen" style={{ backgroundColor: '#f9f7fd' }}>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Link
                to="/blog"
                className="text-sm text-[#6C5CE7] hover:text-[#8075FF] transition-colors"
              >
                ← Back to Blog
              </Link>
              <span className="text-gray-300">|</span>
              <span className="inline-block px-4 py-1 bg-[#6C5CE7] text-white text-sm font-medium rounded-full">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>

            <div className="flex items-center justify-between border-b border-gray-200 pb-6">
              <div className="flex items-center gap-6 text-gray-600">
                <span>{article.date}</span>
                <div className="flex items-center">
                  <FaClock className="w-4 h-4 mr-2" />
                  <span>{article.readTime}</span>
                </div>
                <span>By {article.author}</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-[#6C5CE7] transition-colors">
                  <FaLinkedin className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-[#6C5CE7] transition-colors">
                  <FaTwitter className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-[#6C5CE7] transition-colors">
                  <FaFacebook className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative aspect-video mb-12 rounded-2xl overflow-hidden shadow-xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {article.content}
          </div>

          {/* Author Bio */}
          <div className="mt-16 p-8 bg-gray-50 rounded-2xl">
            <div className="flex items-center gap-6">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(article.author)}&background=6C5CE7&color=fff`}
                alt={article.author}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{article.author}</h3>
                <p className="text-gray-600">
                  AI and Digital Marketing Expert at AI VERTISE. Passionate about helping businesses leverage artificial intelligence for better marketing results.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          {(previousArticle || nextArticle) && (
            <nav className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              {previousArticle && (
                <Link
                  to={`/blog/${previousArticle.slug}`}
                  className="group relative overflow-hidden rounded-xl shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
                  <img
                    src={previousArticle.image}
                    alt={previousArticle.title}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                    <span className="text-white/60 text-sm mb-2">Previous Article</span>
                    <h4 className="text-white font-bold">{previousArticle.title}</h4>
                  </div>
                </Link>
              )}
              {nextArticle && (
                <Link
                  to={`/blog/${nextArticle.slug}`}
                  className="group relative overflow-hidden rounded-xl shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/60 z-10" />
                  <img
                    src={nextArticle.image}
                    alt={nextArticle.title}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end items-end text-right">
                    <span className="text-white/60 text-sm mb-2">Next Article</span>
                    <h4 className="text-white font-bold">{nextArticle.title}</h4>
                  </div>
                </Link>
              )}
            </nav>
          )}
        </motion.div>
      </div>
    </article>
  );
}; 