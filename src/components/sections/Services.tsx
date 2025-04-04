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
import { Card } from '../ui/Card'

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
    <section className="section pb-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-4 shadow-lg">
            <span className="text-indigo-600 font-medium">What We Offer</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#312e81] via-[#4338ca] to-[#6366f1]">
            Let's Grow Together
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our AI-powered solutions to transform your digital presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
          {services.map((service, index) => (
            <Card
              key={service.title}
              pattern
              patternColor="from-indigo-600/10 to-purple-600/5"
              className="p-7"
            >
              {/* AI Score Badge */}
              <div className="absolute top-6 right-6 flex items-center gap-2 px-3.5 py-2 bg-white rounded-full shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-gray-100/80">
                <FaStar className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-600">
                  {aiRecommendations[service.title]?.score || 90}% Match
                </span>
              </div>

              <div className="mb-7 relative">
                <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform duration-300">
                  <service.icon className="w-8 h-8" />
                </div>
                {/* AI Trend Tag */}
                <div className="absolute left-20 top-1 inline-flex items-center">
                  <span className="text-sm font-semibold text-indigo-600 bg-white px-3.5 py-1.5 rounded-full shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-gray-100/80">
                    {aiRecommendations[service.title]?.trend || 'Trending'}
                  </span>
                </div>
              </div>

              <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-[#312e81] via-[#4338ca] to-[#6366f1] text-xl font-bold mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-7 flex-grow">{service.description}</p>

              <div className="space-y-3 mb-7">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-gray-100/80">
                      <FaCheck className="w-3 h-3 text-indigo-600" />
                    </div>
                    <span className="text-sm text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>

              <button className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-medium flex items-center justify-center gap-2 group/btn transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_12px_-2px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_16px_-2px_rgba(79,70,229,0.4)]">
                {service.cta}
                <FaArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-0"
        >
          <div className="relative inline-block mb-1">
            <div 
              onClick={scrollToContact}
              className="relative inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-indigo-50/90 to-purple-50/90 rounded-full shadow-lg hover:from-indigo-100/90 hover:to-purple-100/90 transition-colors cursor-pointer"
            >
              <div className="p-1.5 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full">
                <FaCogs className="w-4 h-4 text-white" />
              </div>
              <span className="text-base text-indigo-600 font-medium">Let's Customize Your Plan</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 max-w-xl mx-auto mb-0">
            Not sure where to start? Let's chat and find the perfect mix of services for your goals.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Services 