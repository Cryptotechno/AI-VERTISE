import React from 'react';
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

const Hero: React.FC = () => {
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
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-50 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-100 via-purple-100 to-indigo-50 rounded-full blur-3xl"
        />
      </div>

      {/* Main hero content */}
      <div className="relative container mx-auto px-4 py-32 min-h-[calc(100vh-80px)] flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Column - Content */}
          <motion.div 
            className="max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6 hover:bg-indigo-100 transition-colors"
            >
              <span className="text-indigo-600 font-medium text-sm">AI-Powered Digital Marketing</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent"
            >
              Transform Your Business with Smart Advertising
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-gray-600 mb-8 max-w-xl"
            >
              Leverage the power of AI and data-driven strategies to boost your business growth. Experience the future of digital advertising with our innovative solutions.
            </motion.p>

            {/* Benefits Grid */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center w-10 h-10 mb-3 bg-indigo-50 rounded-lg">
                  <FaChartPie className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold text-indigo-600 mb-1">8+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
                <div className="text-xs text-gray-500 mt-1">Since 2016</div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center w-10 h-10 mb-3 bg-indigo-50 rounded-lg">
                  <FaRocket className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold text-indigo-600 mb-1">20%+</div>
                <div className="text-sm text-gray-600">Revenue Growth</div>
                <div className="text-xs text-gray-500 mt-1">Monthly Average</div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center w-10 h-10 mb-3 bg-indigo-50 rounded-lg">
                  <FaLayerGroup className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold text-indigo-600 mb-1">6+</div>
                <div className="text-sm text-gray-600">Ad Platforms</div>
                <div className="text-xs text-gray-500 mt-1">Integrated Systems</div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center w-10 h-10 mb-3 bg-indigo-50 rounded-lg">
                  <FaGlobeAmericas className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold text-indigo-600 mb-1">10+</div>
                <div className="text-sm text-gray-600">Global Markets</div>
                <div className="text-xs text-gray-500 mt-1">US & EU Focus</div>
              </motion.div>
            </motion.div>

            {/* Additional Benefits */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-3 mb-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-indigo-50 rounded-lg">
                    <benefit.icon className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-gray-700 block">{benefit.text}</span>
                    <span className="text-xs text-gray-500">{benefit.subtext}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.button
              onClick={scrollToContact}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg 
                font-medium transition-all shadow-md hover:shadow-lg active:shadow-sm
                flex items-center justify-center gap-2 group text-lg
                hover:from-indigo-500 hover:to-purple-500 transform hover:-translate-y-0.5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Free Strategy Session
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right Column - Dashboard */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 