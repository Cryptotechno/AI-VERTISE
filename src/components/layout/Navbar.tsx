import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaArrowRight } from 'react-icons/fa'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'Success Stories', href: '#success-stories' },
    { label: 'About', href: '#about' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Control body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      const offset = window.innerWidth < 768 ? 60 : 80 // Smaller offset for mobile
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-3 bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/20' 
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="#" 
              className="text-2xl font-bold"
              aria-label="AI VERTISE Home"
            >
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent 
                hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-400 transition-all duration-300">
                AI VERTISE
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium
                    ${isScrolled 
                      ? 'text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700' 
                      : 'text-indigo-600 hover:bg-indigo-50/80 hover:text-indigo-700'
                    }`}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('#contact')}
                className={`ml-4 px-6 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm 
                  flex items-center gap-2 group
                  ${isScrolled
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500'
                  }`}
                aria-label="Navigate to Contact section"
              >
                Contact Us
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-300
                ${isScrolled 
                  ? 'text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700' 
                  : 'text-indigo-600 hover:bg-indigo-50/80 hover:text-indigo-700'
                }`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
            />
            {/* Menu */}
            <motion.div
              ref={mobileMenuRef}
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-[60px] z-40 md:hidden overflow-hidden"
            >
              <div className="bg-white/95 backdrop-blur-lg border-b border-gray-200/20 shadow-lg">
                <div className="container mx-auto px-4 py-2">
                  <div className="flex flex-col space-y-1">
                    {navItems.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className="px-4 py-3 text-indigo-600 hover:text-indigo-700 rounded-lg hover:bg-indigo-50 
                          transition-all duration-300 text-sm font-medium text-left"
                        aria-label={`Navigate to ${item.label} section`}
                      >
                        {item.label}
                      </button>
                    ))}
                    <button
                      onClick={() => handleNavClick('#contact')}
                      className="mt-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg 
                        font-medium transition-all duration-300 text-sm hover:from-indigo-500 hover:to-purple-500
                        flex items-center justify-center gap-2 group"
                      aria-label="Navigate to Contact section"
                    >
                      Contact Us
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar 