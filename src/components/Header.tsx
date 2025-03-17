import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" }
  ]

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header 
      className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg z-50 transition-all duration-300 border-b border-gray-100"
      role="banner"
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16" role="navigation">
          <div className="flex items-center">
            <a 
              href="/" 
              className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              aria-label="AIvertise home"
            >
              AIvertise
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8" role="menubar">
            {menuItems.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className="text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg px-2 py-1"
                role="menuitem"
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#contact" 
              className="px-4 py-2 text-white font-medium bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              role="button"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6 text-gray-600" />
            ) : (
              <FaBars className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-white border-t border-gray-100"
              role="menu"
            >
              <div className="py-4 space-y-4">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg"
                    role="menuitem"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="px-4 pt-2">
                  <a
                    href="#contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full py-3 px-4 text-center text-white font-medium bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    role="button"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header 