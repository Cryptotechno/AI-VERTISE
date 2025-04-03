import React, { useMemo, memo, useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaRobot,
  FaSearch,
  FaBullseye,
  FaRegBell,
  FaCog,
  FaUserCircle,
  FaCaretUp,
  FaCaretDown,
  FaEllipsisH,
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaArrowUp,
  FaArrowDown,
  FaFilter,
  FaCalendar,
  FaBrain,
  FaTiktok,
  FaYoutube
} from 'react-icons/fa'

// Custom hook for media queries
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// Memoize the MiniChart component
const MiniChart = memo(({ data, positive }: { data: number[], positive: boolean }) => (
  <div className="flex items-end h-8 gap-0.5 mt-2">
    {data.map((value, index) => (
      <div
        key={index}
        style={{ height: `${value}%` }}
        className={`w-1 rounded-sm ${
          positive ? 'bg-green-100' : 'bg-red-100'
        } relative group`}
      >
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${value}%` }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          className={`absolute bottom-0 left-0 right-0 ${
            positive ? 'bg-green-500' : 'bg-red-500'
          } rounded-sm opacity-50`}
        />
      </div>
    ))}
  </div>
))

MiniChart.displayName = 'MiniChart';

// Memoize the StatCard component for better performance
const StatCard = memo(({ title, value, growth, data, positive }: { 
  title: string; 
  value: string;
  growth: string;
  data: number[];
  positive: boolean;
}) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  
  // Use simpler animations on mobile
  const hoverAnimation = isMobile 
    ? { scale: 1.01 } // Smaller scale on mobile with no y transform
    : { y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' };
    
  return (
    <motion.div
      whileHover={hoverAnimation}
      transition={{ duration: isMobile ? 0.1 : 0.2 }}
      className="bg-white p-3 rounded-xl shadow-sm border border-gray-100"
      style={{ 
        transform: 'translateZ(0)', // Hardware acceleration
        backfaceVisibility: 'hidden',
        willChange: 'transform' 
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500">{title}</span>
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`flex items-center gap-1 ${positive ? 'text-green-500' : 'text-red-500'} text-xs font-medium`}
        >
          {positive ? <FaArrowUp className="w-2.5 h-2.5" /> : <FaArrowDown className="w-2.5 h-2.5" />}
          <span>{growth}</span>
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-lg font-bold text-gray-900"
      >
        {value}
      </motion.div>
      <MiniChart data={data} positive={positive} />
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';

// Memoize the ChannelCard component
const ChannelCard = memo(({ channel, index }: { channel: any, index: number }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  
  // Simplified animations for mobile
  const hoverAnimation = isMobile ? { scale: 1.01 } : { scale: 1.03 };
  const initialAnimation = isMobile 
    ? { opacity: 0 } // No x animation on mobile
    : { opacity: 0, x: -10 };
    
  return (
    <motion.div 
      initial={initialAnimation}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: isMobile ? 0.2 : 0.3, 
        delay: isMobile ? index * 0.05 : index * 0.1 // Faster staggered animation on mobile
      }}
      whileHover={hoverAnimation}
      className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-gray-100 hover:border-indigo-100 transition-colors"
      style={{ 
        transform: 'translateZ(0)', // Hardware acceleration
        backfaceVisibility: 'hidden',
        willChange: 'transform' 
      }}
    >
      <div className="flex items-center gap-2">
        <div className={`w-7 h-7 flex items-center justify-center ${channel.bg} rounded-lg`}>
          <channel.icon className="w-3.5 h-3.5" style={{ color: channel.color }} />
        </div>
        <div>
          <div className="font-medium text-xs text-gray-900">{channel.name}</div>
          <div className="text-[10px] text-gray-500">{channel.type}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-medium text-xs text-gray-900">{channel.amount}</div>
        <div className="text-[10px] text-green-500 font-medium">{channel.growth}</div>
      </div>
    </motion.div>
  );
});

ChannelCard.displayName = 'ChannelCard';

// Main component
const DashboardMockup: React.FC = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 767px)');
  
  // Add scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('dashboard-animate-in');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (dashboardRef.current) {
      observer.observe(dashboardRef.current);
    }
    
    return () => {
      if (dashboardRef.current) {
        observer.unobserve(dashboardRef.current);
      }
    };
  }, []);

  // Memoize data arrays to prevent unnecessary recalculations
  const reachData = useMemo(() => [40, 55, 45, 60, 65, 50, 70], []);
  const conversionData = useMemo(() => [30, 45, 55, 50, 60, 65, 75], []);
  const cpcData = useMemo(() => [45, 40, 35, 45, 50, 55, 60], []);
  const roiData = useMemo(() => [35, 45, 55, 60, 65, 70, 80], []);

  // Memoize the channels array to prevent recreation on each render
  const channels = useMemo(() => [
    { icon: FaGoogle, name: 'Google Ads', type: 'Search & Display', amount: '$12.4k', growth: '+8.2%', color: '#4285F4', bg: 'bg-indigo-50' },
    { icon: FaFacebook, name: 'Facebook', type: 'Social', amount: '$8.6k', growth: '+12.5%', color: '#1877F2', bg: 'bg-indigo-50' },
    { icon: FaInstagram, name: 'Instagram', type: 'Visual', amount: '$6.2k', growth: '+15.3%', color: 'white', bg: 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600' },
    { icon: FaLinkedin, name: 'LinkedIn', type: 'B2B', amount: '$4.7k', growth: '+6.8%', color: '#0A66C2', bg: 'bg-indigo-50' },
    { icon: FaTiktok, name: 'TikTok', type: 'Video', amount: '$3.8k', growth: '+18.9%', color: 'white', bg: 'bg-gray-900' },
    { icon: FaYoutube, name: 'YouTube', type: 'Video', amount: '$5.4k', growth: '+10.2%', color: '#FF0000', bg: 'bg-red-50' }
  ], []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div 
      ref={dashboardRef}
      className="dashboard-mockup bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100/50 overflow-visible opacity-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      // Adding this property helps hint to the browser to load this content with high priority
      data-lcp-priority="high"
      style={{
        transform: 'translateZ(0)', // Hardware acceleration
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity'
      }}
    >
      {/* Dashboard Header */}
      <motion.div 
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center gap-4">
          <motion.div 
            className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaBrain className="w-4 h-4 text-white" />
          </motion.div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">AI Performance Overview</h2>
            <p className="text-xs text-gray-500">Real-time insights</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button 
            className="p-2 text-gray-400 hover:text-indigo-600 transition-colors" 
            onClick={scrollToContact}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaRegBell className="w-4 h-4" />
          </motion.button>
          <motion.button 
            className="p-2 text-gray-400 hover:text-indigo-600 transition-colors" 
            onClick={scrollToContact}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaCog className="w-4 h-4" />
          </motion.button>
          <motion.button 
            className="p-2 text-gray-400 hover:text-indigo-600 transition-colors" 
            onClick={scrollToContact}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaEllipsisH className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Time Period Selector */}
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <motion.button 
            className="px-3 py-1.5 text-xs bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-sm hover:from-indigo-500 hover:to-purple-500 transition-all cursor-pointer"
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            This Month
          </motion.button>
          <motion.button 
            className="px-3 py-1.5 text-xs text-gray-600 hover:bg-indigo-50 rounded-lg font-medium transition-all cursor-pointer"
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Last Month
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid - Now uses the StatCard component */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <StatCard title="Total Reach" value="2.4M" growth="12.5%" data={reachData} positive={true} />
        <StatCard title="Conversions" value="12.8K" growth="8.2%" data={conversionData} positive={true} />
        <StatCard title="Avg. CPC" value="$1.24" growth="4.2%" data={cpcData} positive={true} />
        <StatCard title="ROI" value="285%" growth="15.3%" data={roiData} positive={true} />
      </motion.div>

      {/* Channel Performance */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
            <FaBrain className="w-3.5 h-3.5 text-indigo-600" />
            Channel Performance
          </h3>
          <motion.span 
            className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-medium"
            whileHover={{ scale: 1.05, backgroundColor: "#EEF2FF" }}
          >
            AI-Optimized
          </motion.span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {channels.map((channel, index) => (
            <ChannelCard key={index} channel={channel} index={index} />
          ))}
        </div>
      </motion.div>

      {/* AI Insights */}
      <motion.div 
        className="space-y-3 mt-6 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
            <FaRobot className="w-3.5 h-3.5 text-indigo-600" />
            AI Insights
          </h3>
          <span className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-medium">
            Updated 5m ago
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <motion.div 
            className="flex items-start gap-3 p-2.5 bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 rounded-xl border border-indigo-100/50"
            whileHover={isMobile ? { scale: 1.01 } : { y: -3, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
            initial={isMobile ? { opacity: 0 } : { x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: isMobile ? 0.3 : 0.5, delay: 0.9 }}
            style={{ 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              willChange: 'transform' 
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center bg-indigo-100 rounded-lg mt-0.5">
              <FaChartLine className="w-3 h-3 text-indigo-600" />
            </div>
            <div>
              <div className="font-medium text-xs text-gray-900 mb-0.5">Explore TikTok Opportunity</div>
              <div className="text-[10px] text-gray-500 leading-relaxed">TikTok shows highest growth rate (+18.9%). Consider increasing budget allocation by 25% and expanding to new audience segments.</div>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start gap-3 p-2.5 bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 rounded-xl border border-indigo-100/50"
            whileHover={isMobile ? { scale: 1.01 } : { y: -3, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
            initial={isMobile ? { opacity: 0 } : { x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: isMobile ? 0.3 : 0.5, delay: 1.0 }}
            style={{ 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              willChange: 'transform' 
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center bg-indigo-100 rounded-lg mt-0.5">
              <FaBullseye className="w-3 h-3 text-indigo-600" />
            </div>
            <div>
              <div className="font-medium text-xs text-gray-900 mb-0.5">Landing Page Optimization</div>
              <div className="text-[10px] text-gray-500 leading-relaxed">High reach (2.4M) but conversion rate could improve. Recommend A/B testing landing page with focus on mobile optimization.</div>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-start gap-3 p-2.5 bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 rounded-xl border border-indigo-100/50"
            whileHover={isMobile ? { scale: 1.01 } : { y: -3, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
            initial={isMobile ? { opacity: 0 } : { x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: isMobile ? 0.3 : 0.5, delay: 1.1 }}
            style={{ 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              willChange: 'transform' 
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center bg-indigo-100 rounded-lg mt-0.5">
              <FaChartPie className="w-3 h-3 text-indigo-600" />
            </div>
            <div>
              <div className="font-medium text-xs text-gray-900 mb-0.5">Channel Mix Adjustment</div>
              <div className="text-[10px] text-gray-500 leading-relaxed">Consider reallocating 15% of Google Ads budget to Instagram and TikTok based on ROI trends and audience engagement patterns.</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="flex items-center justify-between mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <motion.button 
          className="px-3 py-1.5 text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1.5"
          onClick={scrollToContact}
          whileHover={isMobile ? { scale: 1.02 } : { scale: 1.05, x: 3 }}
          whileTap={{ scale: 0.95 }}
          style={{ touchAction: 'manipulation' }}
        >
          <FaChartLine className="w-3.5 h-3.5" />
          View Details
        </motion.button>
        <motion.button 
          className="px-4 py-2 text-xs bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md"
          onClick={scrollToContact}
          whileHover={isMobile ? { scale: 1.02 } : { scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ 
            touchAction: 'manipulation',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden' 
          }}
        >
          <FaUserCircle className="w-3.5 h-3.5" />
          Try Live Demo
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// Export a memoized version of the component to prevent unnecessary re-renders
export default memo(DashboardMockup) 