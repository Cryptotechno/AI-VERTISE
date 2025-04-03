import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import Button from '../atoms/Button';
import { useAppStore } from '../../store';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMenuOpen, toggleMenu, closeMenu } = useAppStore();

  const handleHomeClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    closeMenu();
  };

  // Helper to determine if a nav item is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Control body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);
  
  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    closeMenu();
    // Ensure body scroll is enabled
    document.body.style.overflow = '';
    
    // If not on home page, navigate first
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
    
    // Find the section and scroll to it
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80; // Adjust for fixed header
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Check for scrollTo state when navigating
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        scrollToSection(sectionId);
        // Clear the state
        navigate('/', { replace: true, state: {} });
      }, 100);
    }
  }, [location.state, navigate]);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src="/logo.png"
                alt="AI Vertise"
                className="app-logo h-10 w-auto rounded-lg"
                fetchPriority="high"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button
              onClick={toggleMenu}
              variant="text"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600"
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
            </Button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Button
              onClick={handleHomeClick}
              variant="text"
              className="text-gray-800 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
              data-section="hero"
            >
              Home
            </Button>
            <Button
              onClick={() => scrollToSection('services')}
              variant="text"
              className="text-gray-800 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
              data-section="services"
            >
              Services
            </Button>
            <Button
              onClick={() => scrollToSection('about')}
              variant="text"
              className="text-gray-800 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
              data-section="about"
            >
              About
            </Button>
            <Button
              as={Link}
              to="/blog"
              variant="text"
              className={`${isActive('/blog') ? 'text-indigo-600' : 'text-gray-800'} hover:text-indigo-600 px-3 py-2 text-sm font-medium`}
            >
              Blog
            </Button>
            <Button
              onClick={() => scrollToSection('calculator')}
              variant="text"
              className="text-gray-800 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
              data-section="calculator"
            >
              Calculator
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              variant="primary"
              size="sm"
              className="px-6 py-2"
              data-section="contact"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Button
            onClick={handleHomeClick}
            variant="text"
            className="block w-full text-left px-3 py-2 text-base font-medium text-gray-800 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
          >
            Home
          </Button>
          <Button
            onClick={() => scrollToSection('services')}
            variant="text"
            className="block w-full text-left px-3 py-2 text-base font-medium text-gray-800 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
          >
            Services
          </Button>
          <Button
            onClick={() => scrollToSection('about')}
            variant="text"
            className="block w-full text-left px-3 py-2 text-base font-medium text-gray-800 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
          >
            About
          </Button>
          <Button
            as={Link}
            to="/blog"
            variant="text"
            className={`block w-full text-left px-3 py-2 text-base font-medium ${isActive('/blog') ? 'text-indigo-600' : 'text-gray-800'} hover:text-indigo-600 hover:bg-gray-50 rounded-md`}
          >
            Blog
          </Button>
          <Button
            onClick={() => scrollToSection('calculator')}
            variant="text"
            className="block w-full text-left px-3 py-2 text-base font-medium text-gray-800 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
          >
            Calculator
          </Button>
          <Button
            onClick={() => scrollToSection('contact')}
            variant="primary"
            className="block w-full text-left px-3 py-2 text-base font-medium"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 