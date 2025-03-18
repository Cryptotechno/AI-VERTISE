import React from 'react';
import { Blog } from '../components/sections/Blog';
import { Navbar } from '../components/common/Navbar';

export const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <div className="pt-16">
          <Blog />
        </div>
      </main>
    </div>
  );
}; 