import React from 'react';
import { Link } from 'react-router-dom';
import { FaTelegram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import GDPRLogo from './GDPRLogo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">AI VERTISE</h3>
            <p className="text-gray-400 mb-4">
              AI-powered digital advertising agency helping small businesses grow in Poznań and beyond.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-sm font-semibold text-gray-300 mb-4">Contact</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:natalymakota@gmail.com" className="hover:text-white transition-colors">
                  natalymakota@gmail.com
                </a>
              </li>
              <li>
                <a href="mailto:natalymakota@gmail.com" className="hover:text-white transition-colors">
                  Contact via email
                </a>
              </li>
              <li>Poznań, Poland</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://t.me/natalyineu"
                target="_blank"
                rel="me noopener noreferrer"
                aria-label="Visit our Telegram page"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTelegram className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/nataliia-r/"
                target="_blank"
                rel="me noopener noreferrer"
                aria-label="Visit our LinkedIn page"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <p className="text-gray-400 text-sm mr-4">
                © {currentYear} AI VERTISE. All rights reserved.
              </p>
              <GDPRLogo />
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 