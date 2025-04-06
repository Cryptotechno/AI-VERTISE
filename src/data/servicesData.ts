import { FaBrain, FaChartBar, FaUsers, FaSearchDollar, FaTelegram, FaCity } from 'react-icons/fa';
import { IconType } from 'react-icons';

export interface Service {
  icon: IconType;
  title: string;
  description: string;
  benefits: string[];
  cta: string;
}

export interface AIRecommendation {
  score: number;
  trend: string;
  impact: string;
}

export const aiRecommendations: Record<string, AIRecommendation> = {
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
};

export const services: Service[] = [
  {
    icon: FaBrain,
    title: 'AI-Powered Optimization',
    description: "Maximize digital advertising ROI with advanced AI-driven campaign optimization and machine learning algorithms.",
    benefits: [
      'AI budget optimization',
      'Machine learning targeting',
      'Automated bidding system'
    ],
    cta: 'Explore AI Solutions'
  },
  {
    icon: FaChartBar,
    title: 'Programmatic Advertising',
    description: "Scale your digital advertising with data-driven programmatic media buying across premium ad networks.",
    benefits: [
      'RTB optimization',
      'Programmatic bidding',
      'Display advertising'
    ],
    cta: 'Start Programmatic'
  },
  {
    icon: FaUsers,
    title: 'Paid Social Media',
    description: "Drive social media ROI across Facebook, Instagram, LinkedIn, and TikTok advertising campaigns.",
    benefits: [
      'Facebook Ads',
      'Instagram marketing',
      'LinkedIn campaigns'
    ],
    cta: 'Boost Social Impact'
  },
  {
    icon: FaSearchDollar,
    title: 'Search Marketing',
    description: "Boost search engine visibility and conversions with expert PPC management and SEM strategies.",
    benefits: [
      'PPC management',
      'Google Ads expert',
      'Keyword optimization'
    ],
    cta: 'Rank Higher'
  },
  {
    icon: FaTelegram,
    title: 'Telegram Ads',
    description: "Expand your reach on Telegram with targeted advertising and community engagement strategies.",
    benefits: [
      'Telegram marketing',
      'Message ads',
      'Channel growth'
    ],
    cta: 'Start on Telegram'
  },
  {
    icon: FaCity,
    title: 'DOOH Advertising',
    description: "Transform outdoor advertising with Digital Out-Of-Home (DOOH) programmatic solutions.",
    benefits: [
      'DOOH advertising',
      'Digital billboards',
      'Location targeting'
    ],
    cta: 'Go Outdoor'
  }
]; 