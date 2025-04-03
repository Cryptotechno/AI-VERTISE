import React, { useState } from 'react'
import { motion } from 'framer-motion'
import LoadingState from '../ui/LoadingState'
import { IconType } from 'react-icons'
import { 
  FaRobot, 
  FaChartLine, 
  FaBullhorn, 
  FaSearchDollar, 
  FaTelegram, 
  FaCity,
  FaCheck,
  FaBrain,
  FaChartBar,
  FaUsers,
  FaDatabase,
  FaCogs,
  FaArrowRight,
  FaStar,
  FaAward,
  FaRocket,
  FaChartPie
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface AIRecommendation {
  score: number;
  trend: string;
  impact: string;
}

type ServiceTitle = 
  | 'AI-Powered Optimization'
  | 'Programmatic Advertising'
  | 'Paid Social Media'
  | 'Search Marketing'
  | 'Telegram Ads'
  | 'DOOH Advertising';

const aiRecommendations: Record<ServiceTitle, AIRecommendation> = {
  'AI-Powered Optimization': {
    score: 98,
    trend: 'Trending',
    impact: 'High ROI'
  },
  'Programmatic Advertising': {
    score: 95,
    trend: 'Growing',
    impact: 'Scale Fast'
  },
  'Paid Social Media': {
    score: 94,
    trend: 'Popular',
    impact: 'High Reach'
  },
  'Search Marketing': {
    score: 92,
    trend: 'Stable',
    impact: 'Converting'
  },
  'Telegram Ads': {
    score: 90,
    trend: 'Emerging',
    impact: 'Engaging'
  },
  'DOOH Advertising': {
    score: 89,
    trend: 'Innovative',
    impact: 'Brand Lift'
  }
}

interface Service {
  icon: IconType;
  title: ServiceTitle;
  description: string;
  benefits: string[];
  cta: string;
}

const services: Service[] = [
  {
    icon: FaBrain,
    title: 'AI-Powered Optimization',
    description: "Maximize digital advertising ROI with advanced AI-driven campaign optimization and machine learning algorithms. Our intelligent automation platform analyzes real-time performance metrics, audience behavior, and market trends for superior results.",
    benefits: [
      'AI budget optimization',
      'Machine learning targeting',
      'Automated bidding system',
      'Performance analytics',
      'Multi-channel optimization',
      'Smart bid strategies'
    ],
    cta: 'Explore AI Solutions',
  },
  {
    icon: FaChartBar,
    title: 'Programmatic Advertising',
    description: "Scale your digital advertising with data-driven programmatic media buying across premium ad networks. Our RTB platform delivers precision targeting and automated optimization for display, video, and native advertising campaigns.",
    benefits: [
      'RTB optimization',
      'Programmatic bidding',
      'Display advertising',
      'Video ad placement',
      'Native ad scaling',
      'Audience targeting'
    ],
    cta: 'Start Programmatic',
  },
  {
    icon: FaUsers,
    title: 'Paid Social Media',
    description: "Drive social media ROI across Facebook, Instagram, LinkedIn, and TikTok advertising campaigns. Our data-driven social media marketing strategies deliver targeted reach, engagement, and measurable conversions.",
    benefits: [
      'Facebook Ads',
      'Instagram marketing',
      'LinkedIn campaigns',
      'TikTok advertising',
      'Social conversions',
      'Audience engagement'
    ],
    cta: 'Boost Social Impact',
  },
  {
    icon: FaSearchDollar,
    title: 'Search Marketing',
    description: "Boost search engine visibility and conversions with expert PPC management and SEM strategies. Our comprehensive approach combines advanced keyword optimization, quality score improvement, and conversion rate optimization.",
    benefits: [
      'PPC management',
      'Google Ads expert',
      'Keyword optimization',
      'CRO strategies',
      'Quality score boost',
      'Conversion tracking'
    ],
    cta: 'Rank Higher',
  },
  {
    icon: FaTelegram,
    title: 'Telegram Ads',
    description: "Expand your reach on Telegram with targeted advertising and community engagement strategies. Our specialized Telegram marketing solutions drive message engagement, audience growth, and measurable campaign performance.",
    benefits: [
      'Telegram marketing',
      'Message ads',
      'Channel growth',
      'Community building',
      'Engagement metrics',
      'Campaign analytics'
    ],
    cta: 'Start on Telegram',
  },
  {
    icon: FaDatabase,
    title: 'DOOH Advertising',
    description: "Transform outdoor advertising with Digital Out-Of-Home (DOOH) programmatic solutions. Target high-traffic locations with dynamic digital displays, real-time campaign optimization, and measurable audience engagement.",
    benefits: [
      'DOOH advertising',
      'Digital billboards',
      'Location targeting',
      'Audience metrics',
      'Programmatic DOOH',
      'Campaign analytics'
    ],
    cta: 'Go Outdoor',
  },
]

const Services: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 80; // Adjust for fixed header
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 bg-[#f9f7fd]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-4 border border-indigo-100/50 shadow-sm">
            <span className="text-indigo-600 font-medium">What We Offer</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#312e81] via-[#4338ca] to-[#6366f1]">
            Let's Grow Together
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to take your digital presence to the next level? Our AI-powered solutions make it happen.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300"
            >
              {/* AI Score Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-100/20">
                <FaStar className="w-3 h-3 text-indigo-600" />
                <span className="text-xs font-semibold text-indigo-600">
                  {aiRecommendations[service.title].score}% Match
                </span>
              </div>

              {/* Pattern Background */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 transition-transform group-hover:scale-110">
                <div className="absolute transform rotate-45 translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-indigo-600 to-purple-600" />
              </div>

              <div className="p-4 sm:p-6 h-full flex flex-col">
                <div className="mb-4 relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
                    <service.icon className="w-6 h-6" />
                  </div>
                  {/* AI Trend Tag */}
                  <div className="absolute left-14 -top-1 inline-flex items-center">
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      {aiRecommendations[service.title].trend}
                    </span>
                  </div>
                </div>

                <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-[#312e81] via-[#4338ca] to-[#6366f1] text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>

                {/* AI Impact Badge */}
                <div className="mb-4 flex items-center gap-2">
                  <FaAward className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium text-indigo-600">
                    {aiRecommendations[service.title].impact}
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <FaCheck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={scrollToContact}
                  className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 group transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {service.cta}
                  <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <div className="relative inline-block">
            <div 
              onClick={scrollToContact}
              className="relative inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-50/90 to-purple-50/90 rounded-full border border-indigo-100/20 shadow-sm hover:from-indigo-100/90 hover:to-purple-100/90 transition-colors cursor-pointer"
            >
              <div className="p-1 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full">
                <FaCogs className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm text-indigo-600 font-medium">Let's Customize Your Plan</span>
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-600 max-w-xl mx-auto">
            Not sure where to start? Let's chat and find the perfect mix of services for your goals.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Services 