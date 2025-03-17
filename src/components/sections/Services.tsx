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

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-50 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-100 via-purple-100 to-indigo-50 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-4 border border-indigo-100/50 shadow-sm">
            <span className="text-indigo-600 font-medium">What We Offer</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-800 bg-clip-text text-transparent">
            Let's Grow Together
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Ready to take your digital presence to the next level? Our AI-powered solutions make it happen.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group relative flex"
            >
              <div className="relative flex flex-col w-full bg-white rounded-2xl p-4 sm:p-6 transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden group min-h-[380px] sm:min-h-[420px] border border-indigo-100/20 hover:border-indigo-200/50">
                {/* AI Score Badge */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-100/20 group-hover:from-indigo-100/50 group-hover:to-purple-100/50 transition-colors">
                  <FaStar className="w-3 h-3 text-indigo-600" />
                  <span className="text-xs font-semibold text-indigo-600">
                    {aiRecommendations[service.title].score}% Match
                  </span>
                </div>

                {/* Enhanced Background Patterns */}
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-indigo-50 to-transparent rounded-bl-[100px] opacity-30 transition-transform group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-tr from-purple-50 to-transparent rounded-tr-[80px] opacity-30 transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-indigo-50/5 via-purple-50/5 to-indigo-50/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                {/* Content Container */}
                <div className="relative flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 group-hover:scale-110 transition-transform">
                      <service.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 flex-1">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
                        <FaCheck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <button className="w-full px-4 py-2 text-sm sm:text-base bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 rounded-lg font-medium hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 flex items-center justify-center gap-2 group">
                      Learn More
                      <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
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
            <div className="relative inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-50/90 to-purple-50/90 rounded-full border border-indigo-100/20 shadow-sm hover:from-indigo-100/90 hover:to-purple-100/90 transition-colors cursor-pointer">
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