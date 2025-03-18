import React from 'react';
import { 
  FaBullhorn,
  FaRegLightbulb,
  FaShoppingCart,
  FaPlayCircle,
  FaDesktop,
  FaVideo,
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaLinkedin,
  FaSearch,
  FaNewspaper,
  FaRegWindowRestore,
  FaTelegram,
  FaApple
} from 'react-icons/fa';
import { Goal, Channel } from '../types/calculator';

export const campaignGoals: Goal[] = [
  {
    id: 'awareness',
    name: 'Brand Awareness',
    icon: <FaBullhorn className="w-5 h-5" />,
    description: 'Increase visibility and reach new audiences'
  },
  {
    id: 'consideration',
    name: 'Consideration',
    icon: <FaRegLightbulb className="w-5 h-5" />,
    description: 'Drive engagement and interest in your products'
  },
  {
    id: 'conversion',
    name: 'Conversion',
    icon: <FaShoppingCart className="w-5 h-5" />,
    description: 'Generate leads and drive sales'
  }
];

export const adChannels: Channel[] = [
  { 
    id: 'ctv', 
    name: 'CTV/OTT', 
    color: '#4f46e5',
    icon: <FaPlayCircle className="w-5 h-5" />,
    description: 'Connected TV & streaming'
  },
  { 
    id: 'display', 
    name: 'Display Ads', 
    color: '#6366f1',
    icon: <FaDesktop className="w-5 h-5" />,
    description: 'Banner ads across the web'
  },
  { 
    id: 'video', 
    name: 'Video Advertising', 
    color: '#7c3aed',
    icon: <FaVideo className="w-5 h-5" />,
    description: 'Video ad formats'
  },
  { 
    id: 'youtube', 
    name: 'YouTube Ads', 
    color: '#ef4444',
    icon: <FaYoutube className="w-5 h-5" />,
    description: 'Video & display on YouTube'
  },
  { 
    id: 'instagram', 
    name: 'Instagram Ads', 
    color: '#ec4899',
    icon: <FaInstagram className="w-5 h-5" />,
    description: 'Stories, Reels & feed ads'
  },
  { 
    id: 'tiktok', 
    name: 'TikTok Ads', 
    color: '#14b8a6',
    icon: <FaTiktok className="w-5 h-5" />,
    description: 'Short-form video ads'
  },
  { 
    id: 'linkedin', 
    name: 'LinkedIn Ads', 
    color: '#0284c7',
    icon: <FaLinkedin className="w-5 h-5" />,
    description: 'B2B & professional targeting'
  },
  { 
    id: 'search', 
    name: 'Search Ads', 
    color: '#4ade80',
    icon: <FaSearch className="w-5 h-5" />,
    description: 'PPC & keyword targeting'
  },
  { 
    id: 'native', 
    name: 'Native Ads', 
    color: '#8b5cf6',
    icon: <FaNewspaper className="w-5 h-5" />,
    description: 'In-feed advertising'
  },
  { 
    id: 'dooh', 
    name: 'DOOH', 
    color: '#4338ca',
    icon: <FaRegWindowRestore className="w-5 h-5" />,
    description: 'Digital out-of-home'
  },
  { 
    id: 'telegram', 
    name: 'Telegram Ads', 
    color: '#0088cc',
    icon: <FaTelegram className="w-5 h-5" />,
    description: 'Messaging platform ads'
  },
  { 
    id: 'appstore', 
    name: 'App Store Ads', 
    color: '#0066CC',
    icon: <FaApple className="w-5 h-5" />,
    description: 'iOS app promotion'
  }
]; 