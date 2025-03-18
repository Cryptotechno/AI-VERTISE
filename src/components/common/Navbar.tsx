import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleHomeClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={handleHomeClick}
              className="flex items-center"
            >
              <span className="text-[28px] font-bold bg-gradient-to-r from-[#6C5CE7] via-[#8075FF] to-[#A091FF] bg-clip-text text-transparent">
                AI VERTISE
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#6C5CE7] focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <button
              onClick={handleHomeClick}
              className="text-gray-800 hover:text-[#6C5CE7] px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-[#6C5CE7] hover:text-[#5849c4] px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-800 hover:text-[#6C5CE7] px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              About
            </button>
            <Link
              to="/blog"
              className="text-gray-800 hover:text-[#6C5CE7] px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Blog
            </Link>
            <button
              onClick={() => scrollToSection('calculator')}
              className="text-gray-800 hover:text-[#6C5CE7] px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Calculator
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-[#6C5CE7] text-white px-6 py-2 rounded-md hover:bg-[#5849c4] transition-colors duration-200 text-sm font-medium"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <button
            onClick={handleHomeClick}
            className="block w-full text-left px-3 py-2 text-base font-medium text-gray-800 hover:text-[#6C5CE7] hover:bg-gray-50 rounded-md"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="w-full text-left px-3 py-2 text-base font-medium text-[#6C5CE7] hover:text-[#5849c4] hover:bg-gray-50 rounded-md"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="w-full text-left px-3 py-2 text-base font-medium text-gray-800 hover:text-[#6C5CE7] hover:bg-gray-50 rounded-md"
          >
            About
          </button>
          <Link
            to="/blog"
            className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-[#6C5CE7] hover:bg-gray-50 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <button
            onClick={() => scrollToSection('calculator')}
            className="w-full text-left px-3 py-2 text-base font-medium text-gray-800 hover:text-[#6C5CE7] hover:bg-gray-50 rounded-md"
          >
            Calculator
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full text-left px-3 py-2 text-base font-medium bg-[#6C5CE7] text-white hover:bg-[#5849c4] rounded-md"
          >
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
}; 