import React from 'react';
import Blog from '../components/sections/Blog';

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <div className="pt-16">
          <Blog />
        </div>
      </main>
    </div>
  );
};

export default BlogPage; 