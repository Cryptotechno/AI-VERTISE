import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FaArrowRight, 
  FaChartPie, 
  FaRocket, 
  FaLayerGroup, 
  FaGlobeAmericas, 
  FaLightbulb, 
  FaChartBar, 
  FaHandshake,
  FaUsersCog,
  FaShieldAlt,
  FaBrain,
  FaTools
} from 'react-icons/fa';
import DashboardMockup from '../DashboardMockup';
import { Button } from '../atoms/Button';
import OptimizedImage from '../atoms/OptimizedImage';

const Hero: React.FC = () => {
  const benefitsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  // Preload critical assets
  useEffect(() => {
    // Preload dashboard styles by applying a class early
    document.body.classList.add('preload-dashboard');
    
    // Preload any critical icons 
    const preloadIcons = ['FaArrowRight', 'FaChartPie', 'FaRocket', 'FaBrain'];
    
    return () => {
      document.body.classList.remove('preload-dashboard');
    };
  }, []);

  // Set up scroll animations
  useEffect(() => {
    const animateOnScroll = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };
    
    const observer = new IntersectionObserver(animateOnScroll, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });
    
    // Observe elements
    if (benefitsRef.current) observer.observe(benefitsRef.current);
    if (statsRef.current) observer.observe(statsRef.current);
    if (headingRef.current) observer.observe(headingRef.current);
    
    return () => {
      if (benefitsRef.current) observer.unobserve(benefitsRef.current);
      if (statsRef.current) observer.unobserve(statsRef.current);
      if (headingRef.current) observer.unobserve(headingRef.current);
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const benefits = [
    {
      icon: FaLightbulb,
      text: "AI-Powered Campaign Optimization",
      subtext: "Smart Automation"
    },
    {
      icon: FaChartBar,
      text: "Real-Time Performance Analytics",
      subtext: "Live Insights"
    },
    {
      icon: FaHandshake,
      text: "Dedicated Account Management",
      subtext: "24/7 Support"
    },
    {
      icon: FaUsersCog,
      text: "Custom Audience Targeting",
      subtext: "Precise Reach"
    },
    {
      icon: FaShieldAlt,
      text: "Brand Safety Monitoring",
      subtext: "Protected Growth"
    },
    {
      icon: FaTools,
      text: "Advanced A/B Testing",
      subtext: "Optimized Results"
    }
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Background Elements - simplified for better performance */}
      <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
        <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-50 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-100 via-purple-100 to-indigo-50 rounded-full blur-3xl" />
      </div>

      {/* Main hero content */}
      <div className="relative container mx-auto px-4 py-16 md:py-32 min-h-[80vh] flex items-center" style={{ contain: 'layout paint' }}>
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center w-full">
          {/* Left Column - Content */}
          <motion.div 
            className="max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ willChange: 'opacity, transform' }}
          >
            {/* Simplified motion divs for better performance */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6 hover:bg-indigo-100 transition-colors">
              <span className="text-indigo-600 font-medium text-sm">AI-Powered Digital Marketing</span>
            </div>
            
            <h1 
              ref={headingRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent transition-transform duration-700 ease-out opacity-0 translate-y-4"
              style={{ willChange: 'opacity, transform' }}
            >
              Transform Your Business with Smart Advertising
            </h1>

            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-xl">
              Leverage the power of AI and data-driven strategies to boost your business growth. Experience the future of digital advertising with our innovative solutions.
            </p>

            {/* Simplified Benefits Grid */}
            <div 
              ref={statsRef}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 opacity-0 translate-y-4"
              style={{ willChange: 'opacity, transform', transitionDelay: '0.2s', transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' }}
            >
              {/* Benefits grid items - simplified for performance */}
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-10 h-10 mb-3 bg-indigo-50 rounded-lg">
                  <FaChartPie className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold text-indigo-600 mb-1">8+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
                <div className="text-xs text-gray-500 mt-1">Since 2016</div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-10 h-10 mb-3 bg-indigo-50 rounded-lg">
                  <FaRocket className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold text-indigo-600 mb-1">20%+</div>
                <div className="text-sm text-gray-600">Revenue Growth</div>
                <div className="text-xs text-gray-500 mt-1">Monthly Average</div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-10 h-10 mb-3 bg-indigo-50 rounded-lg">
                  <FaLayerGroup className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold text-indigo-600 mb-1">6+</div>
                <div className="text-sm text-gray-600">Ad Platforms</div>
                <div className="text-xs text-gray-500 mt-1">Integrated Systems</div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-10 h-10 mb-3 bg-indigo-50 rounded-lg">
                  <FaGlobeAmericas className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold text-indigo-600 mb-1">10+</div>
                <div className="text-sm text-gray-600">Global Markets</div>
                <div className="text-xs text-gray-500 mt-1">US & EU Focus</div>
              </div>
            </div>

            {/* Additional Benefits */}
            <div 
              ref={benefitsRef} 
              className="grid grid-cols-2 gap-3 mb-8 opacity-0 translate-y-4"
              style={{ willChange: 'opacity, transform', transitionDelay: '0.4s', transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' }}
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all"
                  style={{ transitionDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-indigo-50 rounded-lg">
                    <benefit.icon className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-gray-700 block">{benefit.text}</span>
                    <span className="text-xs text-gray-500">{benefit.subtext}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div>
              <Button
                onClick={scrollToContact}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto flex items-center justify-center gap-2 group hover:scale-105 transition-transform"
              >
                Get Free Strategy Session
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Dashboard - prioritized for LCP */}
          <div className="relative hidden lg:block">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 