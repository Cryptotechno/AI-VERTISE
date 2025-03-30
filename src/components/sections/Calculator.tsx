import { useState, useEffect, Suspense, lazy, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { utils as xlsxUtils, writeFile as xlsxWriteFile } from 'xlsx'
import { generateMediaPlan } from '../../utils/generateMediaPlan'
import { adChannels, campaignGoals } from '../../data/calculatorData.tsx'
import { 
  FaBrain,
  FaDesktop,
  FaMobile,
  FaExchangeAlt,
  FaUsers,
  FaUserTag,
  FaUserCog,
  FaCheck,
  FaCog,
  FaChartPie,
  FaInfoCircle,
  FaSyncAlt,
  FaChartLine,
  FaDownload,
  FaRegLightbulb
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend)

// Lazy load the chart component
const MediaPlanChart = lazy(() => import('../charts/MediaPlanChart'))

// Import types
import type { 
  Predictions, 
  Channel, 
  CampaignGoal, 
  Goal, 
  ChannelPrediction
} from '../../types/calculator'

// Add new interfaces for AI insights
interface AIInsight {
  type: 'positive' | 'neutral' | 'negative'
  message: string
  impact: number // 0-100
  confidence: number // 0-100
}

// Update channelSynergies to match the new channel list
const channelSynergies: Record<string, string[]> = {
  'ctv': ['video', 'youtube', 'display'],
  'display': ['video', 'native'],
  'video': ['youtube', 'instagram', 'tiktok'],
  'youtube': ['video', 'display'],
  'instagram': ['tiktok', 'native'],
  'tiktok': ['instagram', 'video'],
  'linkedin': ['native', 'display'],
  'search': ['display', 'native'],
  'native': ['display', 'ctv'],
  'dooh': ['ctv', 'display'],
  'telegram': ['native', 'display'],
  'appstore': ['native', 'display']
}

// Add new types and interfaces
type CampaignType = 'web_landing' | 'mobile_app' | 'cross_platform'
type AudienceTarget = 'broad' | 'specific' | 'custom'

interface CampaignSettings {
  type: CampaignType
  audienceTarget: AudienceTarget
  duration: number
  isAutomated: boolean
}

// Add campaign type definitions
const campaignTypes = [
  {
    id: 'web_landing' as CampaignType,
    name: 'Web Landing',
    icon: <FaDesktop className="w-5 h-5" />,
    description: 'Drive traffic to landing pages',
    multiplier: 1.0
  },
  {
    id: 'mobile_app' as CampaignType,
    name: 'Mobile App',
    icon: <FaMobile className="w-5 h-5" />,
    description: 'Promote mobile app installs',
    multiplier: 1.2
  },
  {
    id: 'cross_platform' as CampaignType,
    name: 'Cross Platform',
    icon: <FaExchangeAlt className="w-5 h-5" />,
    description: 'Unified cross-platform campaigns',
    multiplier: 1.4
  }
]

const audienceTargets = [
  {
    id: 'broad' as AudienceTarget,
    name: 'Broad Reach',
    icon: <FaUsers className="w-5 h-5" />,
    description: 'Wide audience targeting',
    multiplier: 0.8
  },
  {
    id: 'specific' as AudienceTarget,
    name: 'Specific Segments',
    icon: <FaUserTag className="w-5 h-5" />,
    description: 'Target specific demographics',
    multiplier: 1.2
  },
  {
    id: 'custom' as AudienceTarget,
    name: 'Custom Audience',
    icon: <FaUserCog className="w-5 h-5" />,
    description: 'Use your customer data',
    multiplier: 1.5
  }
]

// Channel-specific CTR ranges (realistic values)
const channelCTRRanges: Record<string, [number, number]> = {
  'search': [0.02, 0.04],     // Search Ads: 2-4%
  'display': [0.001, 0.002],  // Display Ads: 0.1-0.2%
  'native': [0.003, 0.008],   // Native Ads: 0.3-0.8%
  'video': [0.01, 0.015],     // Video Ads: 1-1.5%
  'dooh': [0.001, 0.002],     // DOOH: 0.1-0.2%
  'linkedin': [0.004, 0.006], // LinkedIn: 0.4-0.6%
  'tiktok': [0.01, 0.02],     // TikTok: 1-2%
  'instagram': [0.005, 0.01], // Instagram: 0.5-1%
  'youtube': [0.01, 0.015],   // YouTube: 1-1.5%
  'telegram': [0.003, 0.005], // Telegram: 0.3-0.5%
  'appstore': [0.015, 0.025], // App Store: 1.5-2.5%
  'ctv': [0.005, 0.01]        // CTV/OTT: 0.5-1%
};

// Remove the useCallback hook from here
const getChannelPredictions = (
  channel: string, 
  goal: CampaignGoal, 
  budget: number,
  settings: CampaignSettings
): ChannelPrediction => {
  // Base CPM ranges for different channels (realistic values)
  const channelCPMRanges: Record<string, [number, number]> = {
    'search': [1, 3],
    'display': [2, 5],
    'native': [5, 12],
    'video': [15, 25],
    'dooh': [25, 40],
    'linkedin': [8, 15],
    'tiktok': [5, 10],
    'instagram': [6, 12],
    'youtube': [10, 20],
    'telegram': [3, 8],
    'appstore': [4, 10],
    'ctv': [20, 35]
  };

  // Channel-specific conversion rate ranges (realistic values)
  const channelConvRanges: Record<string, [number, number]> = {
    'search': [0.03, 0.05],     // 3-5%
    'display': [0.01, 0.02],    // 1-2%
    'native': [0.02, 0.03],     // 2-3%
    'video': [0.01, 0.02],      // 1-2%
    'dooh': [0.005, 0.01],      // 0.5-1%
    'linkedin': [0.02, 0.04],   // 2-4%
    'tiktok': [0.015, 0.025],   // 1.5-2.5%
    'instagram': [0.02, 0.03],  // 2-3%
    'youtube': [0.01, 0.02],    // 1-2%
    'telegram': [0.015, 0.025], // 1.5-2.5%
    'appstore': [0.03, 0.05],   // 3-5%
    'ctv': [0.01, 0.02]         // 1-2%
  };

  // Get CPM range for the channel or use default
  const [minCPM, maxCPM] = channelCPMRanges[channel] || [5, 15];
  const baseCPM = Math.round(minCPM + Math.random() * (maxCPM - minCPM));
  
  // Calculate base impressions using correct CPM formula: (budget / CPM) * 1000
  const baseImpressions = Math.round((budget / baseCPM) * 1000);
  
  // Get CTR and conversion ranges for the channel
  const [minCTR, maxCTR] = channelCTRRanges[channel] || [0.001, 0.002];
  const [minConv, maxConv] = channelConvRanges[channel] || [0.01, 0.02];
  
  // Calculate base metrics with realistic ranges
  const baseCTR = minCTR + (Math.random() * (maxCTR - minCTR));
  const baseConversion = minConv + (Math.random() * (maxConv - minConv));
  const baseROI = Number((Math.random() * 3 + 1.5).toFixed(1)); // 1.5-4.5x ROI
  
  // Calculate CPC and CAC based on actual metrics
  const clicks = Math.round(baseImpressions * baseCTR);
  const conversions = Math.round(clicks * baseConversion);
  const baseCPC = Number((budget / clicks).toFixed(2));
  const baseCAC = Math.round(budget / conversions);

  // Get multipliers
  const campaignTypeMultiplier = campaignTypes.find(t => t.id === settings.type)?.multiplier || 1;
  const audienceMultiplier = audienceTargets.find(t => t.id === settings.audienceTarget)?.multiplier || 1;
  const automationBonus = settings.isAutomated ? 1.2 : 1;
  const durationMultiplier = Math.min(1 + (settings.duration - 1) * 0.1, 1.5);

  // Goal-specific adjustments
  const goalAdjustments = {
    awareness: { impressions: 1.3, conversion: 0.7, roi: 0.9, cpm: 0.9, ctr: 0.8, cpc: 1.1, cac: 1.2 },
    consideration: { impressions: 1.1, conversion: 1.1, roi: 1.2, cpm: 1.0, ctr: 1.2, cpc: 0.9, cac: 0.9 },
    conversion: { impressions: 0.8, conversion: 1.5, roi: 1.4, cpm: 1.1, ctr: 1.4, cpc: 0.8, cac: 0.7 }
  };

  const adj = goalAdjustments[goal];

  // Calculate final metrics with all multipliers
  const finalImpressions = Math.round(baseImpressions * adj.impressions * campaignTypeMultiplier * audienceMultiplier * durationMultiplier);
  const finalCPM = Math.round((budget / finalImpressions) * 1000);
  const finalCTR = Number((baseCTR * adj.ctr * audienceMultiplier * automationBonus).toFixed(4));
  const finalClicks = Math.round(finalImpressions * finalCTR);
  const finalConversion = Number((baseConversion * adj.conversion * audienceMultiplier * automationBonus).toFixed(4));
  const finalConversions = Math.round(finalClicks * finalConversion);
  const finalCPC = Number((budget / finalClicks).toFixed(2));
  const finalCAC = finalConversions > 0 ? Math.round(budget / finalConversions) : 0;
  const finalROI = Number((baseROI * adj.roi * campaignTypeMultiplier * audienceMultiplier * automationBonus * durationMultiplier).toFixed(1));

  return {
    impressions: finalImpressions,
    cpm: finalCPM,
    roi: finalROI,
    ctr: finalCTR,
    cpc: finalCPC,
    conversion: finalConversion,
    cac: finalCAC,
    engagement: 0
  };
}

// Add new sparkle effect component
const Sparkle = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        rotate: [0, 180],
      }}
      transition={{
        duration: 1.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_2px_2px_rgba(255,255,255,0.3)]"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  )
}

// Add magic portal effect component
const MagicPortal = () => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  )
}

// Add loading component for the chart
const ChartLoading = () => (
  <div className="w-full max-w-md mx-auto h-[300px] flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
  </div>
)

function generateTopThreeInsights(channels: Channel[]): string[] {
  const insights: string[] = [];
  
  // 1. Best performing channel by ROI
  const sortedByROI = [...channels].sort((a, b) => (b.predictions?.roi || 0) - (a.predictions?.roi || 0));
  if (sortedByROI.length > 0 && sortedByROI[0].predictions?.roi) {
    insights.push(`🟢 ${sortedByROI[0].name} shows the highest ROI potential at ${sortedByROI[0].predictions.roi.toFixed(1)}x`);
  }

  // 2. Budget optimization insight
  const lowROIChannels = channels.filter(ch => (ch.predictions?.roi || 0) < 2.0);
  if (lowROIChannels.length > 0) {
    insights.push(`🟡 Consider reallocating budget from ${lowROIChannels[0].name} to higher ROI channels`);
  }

  // 3. Performance optimization insight
  const highCACChannels = channels.filter(ch => (ch.predictions?.cac || 0) > 100);
  if (highCACChannels.length > 0) {
    insights.push(`🔴 Optimize ${highCACChannels[0].name} to reduce high customer acquisition cost`);
  } else {
    insights.push(`🟢 All channels show efficient customer acquisition costs`);
  }

  return insights;
}

const Calculator = () => {
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])
  const [budget, setBudget] = useState<number>(5000)
  const [goal, setGoal] = useState<CampaignGoal>('awareness')
  const [mediaMix, setMediaMix] = useState<Channel[]>([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [showInsights, setShowInsights] = useState(false)
  const [showMagicAnimation, setShowMagicAnimation] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [settings, setSettings] = useState<CampaignSettings>({
    type: 'web_landing',
    audienceTarget: 'broad',
    duration: 1,
    isAutomated: true
  })

  // Move the useCallback hook inside the component
  const memoizedGetChannelPredictions = useCallback(getChannelPredictions, []);

  // Chart data preparation
  const chartData = useMemo(() => {
    if (!mediaMix.length) {
      return {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
          borderWidth: 0
        }]
      }
    }
    
    return {
      labels: mediaMix.map(channel => channel.name),
      datasets: [{
        data: mediaMix.map(channel => channel.budget || 0),
        backgroundColor: mediaMix.map(channel => channel.color),
        borderWidth: 0
      }]
    }
  }, [mediaMix])

  // Handle media plan download
  const handleDownload = useCallback(async () => {
    setIsDownloading(true)
    try {
      // Convert media mix to array format for Excel
      const headers = ['Channel', 'Budget', 'Allocation', 'ROI', 'CPM', 'CTR', 'CPC', 'CAC']
      const data = [
        headers,
        ...mediaMix.map(channel => [
          channel.name,
          channel.budget?.toFixed(2) || '0',
          `${channel.allocation?.toFixed(1)}%` || '0%',
          channel.predictions?.roi?.toFixed(1) || '0',
          channel.predictions?.cpm?.toFixed(2) || '0',
          `${((channel.predictions?.ctr || 0) * 100).toFixed(2)}%`,
          channel.predictions?.cpc?.toFixed(2) || '0',
          channel.predictions?.cac?.toFixed(0) || '0'
        ])
      ]

      const workbook = xlsxUtils.book_new()
      const worksheet = xlsxUtils.aoa_to_sheet(data)
      xlsxUtils.book_append_sheet(workbook, worksheet, 'Media Plan')
      xlsxWriteFile(workbook, 'ai-vertise-media-plan.xlsx')
    } catch (error) {
      console.error('Error generating media plan:', error)
    } finally {
      setIsDownloading(false)
    }
  }, [mediaMix])

  // Memoize channel toggle handler
  const handleChannelToggle = useCallback((channelId: string) => {
    setSelectedChannels(prev => 
      prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    )
  }, [])

  // Memoize media mix calculation
  const calculateMediaMix = useCallback(() => {
    setIsCalculating(true)
    
    // Delay calculation to next tick to prevent UI freeze
    setTimeout(() => {
      try {
        const selectedChannelData = adChannels.filter(channel => 
          selectedChannels.includes(channel.id)
        )

        const totalBudget = budget
        const channelCount = selectedChannelData.length
        const baseAllocation = 100 / channelCount

        const mix = selectedChannelData.map(channel => ({
          ...channel,
          allocation: baseAllocation,
          budget: (totalBudget * baseAllocation) / 100,
          predictions: memoizedGetChannelPredictions(channel.id, goal, budget, settings)
        }))

        setMediaMix(mix)
        setShowInsights(true)
      } catch (error) {
        console.error('Error calculating media mix:', error)
      } finally {
        setIsCalculating(false)
      }
    }, 0)
  }, [selectedChannels, budget, goal, settings, memoizedGetChannelPredictions])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setMediaMix([])
      setIsCalculating(false)
      setShowInsights(false)
    }
  }, [])

  return (
    <section id="calculator" className="py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full mb-2 border border-indigo-100/20"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaBrain className="w-4 h-4 text-indigo-600" />
            </motion.div>
            <span className="text-indigo-600 font-medium text-sm">AI-Powered Calculator</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-bold mb-2 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent"
          >
            Smart Media Mix Optimizer
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm text-gray-600 max-w-2xl mx-auto"
          >
            Our AI analyzes your goals and budget to create the optimal media mix with real-time predictions and insights.
          </motion.p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Left Column: Goals & Settings */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
              className="space-y-4 relative"
            >
              {/* Add glow effect to cards */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-indigo-100/20 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
              >
                <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                  <FaRegLightbulb className="text-indigo-600" />
                  Campaign Goals
                </h3>
                <div className="space-y-2">
                  {campaignGoals.map(campaignGoal => (
                    <button
                      key={campaignGoal.id}
                      onClick={() => setGoal(campaignGoal.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        campaignGoal.id === goal
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600'
                          : 'border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        campaignGoal.id === goal ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {campaignGoal.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{campaignGoal.name}</div>
                        <div className="text-xs text-gray-500">{campaignGoal.description}</div>
                      </div>
                      {campaignGoal.id === goal && (
                        <FaCheck className="ml-auto text-indigo-600" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-indigo-100/20 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
              >
                <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                  <FaCog className="text-indigo-600" />
                  Campaign Settings
                </h3>

                {/* Campaign Type */}
                <div className="space-y-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700">Campaign Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {campaignTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setSettings(prev => ({ ...prev, type: type.id }))}
                        className={`p-2 rounded-lg border transition-all duration-300 hover:scale-105 ${
                          settings.type === type.id
                            ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600 shadow-sm'
                            : 'border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg mx-auto mb-1 w-fit transition-colors ${
                          settings.type === type.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {type.icon}
                        </div>
                        <div className="text-center text-xs font-medium">{type.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Audience Target */}
                <div className="space-y-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700">Audience Targeting</label>
                  <div className="grid grid-cols-3 gap-2">
                    {audienceTargets.map(target => (
                      <button
                        key={target.id}
                        onClick={() => setSettings(prev => ({ ...prev, audienceTarget: target.id }))}
                        className={`p-2 rounded-lg border transition-all ${
                          settings.audienceTarget === target.id
                            ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600'
                            : 'border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg mx-auto mb-1 w-fit ${
                          settings.audienceTarget === target.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {target.icon}
                        </div>
                        <div className="text-center text-xs font-medium">{target.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Campaign Duration */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Campaign Duration</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 3, 6, 12].map(months => (
                      <button
                        key={months}
                        onClick={() => setSettings(prev => ({ ...prev, duration: months }))}
                        className={`p-2 rounded-lg border transition-all ${
                          settings.duration === months
                            ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600'
                            : 'border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30'
                        }`}
                      >
                        <div className="text-center text-xs">
                          <div className="font-medium">{months}</div>
                          <div className="text-gray-500">Month{months > 1 ? 's' : ''}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Middle Column: Channel Selection */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-indigo-100/20 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
            >
              <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                <FaChartPie className="text-indigo-600" />
                Media Channels
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {adChannels.map((channel, index) => (
                  <motion.button
                    key={channel.id}
                    onClick={() => handleChannelToggle(channel.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 cursor-pointer hover:shadow-md ${
                      selectedChannels.includes(channel.id)
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600 shadow-sm'
                        : 'border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30'
                    }`}
                  >
                    {/* Glowing effect for selected channels */}
                    {selectedChannels.includes(channel.id) && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-indigo-400/20"
                        animate={{
                          opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                    <div className={`p-2 rounded-lg transition-colors ${
                      selectedChannels.includes(channel.id) 
                        ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {channel.icon}
                    </div>
                    <div className="text-left relative z-10">
                      <div className="font-medium text-sm">{channel.name}</div>
                      <div className="text-xs text-gray-500">{channel.description}</div>
                      {selectedChannels.includes(channel.id) && mediaMix.find(c => c.id === channel.id) && (
                        <div className="text-xs text-indigo-600 mt-1 font-medium">
                          ~{mediaMix.find(c => c.id === channel.id)?.predictions?.roi.toFixed(1)}x ROI
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Campaign Budget */}
              <div className="mt-4 p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
                <label htmlFor="campaign-budget" className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Budget
                </label>
                <div className="relative">
                  <input
                    id="campaign-budget"
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-colors"
                    min="1000"
                    step="1000"
                    aria-describedby="budget-description"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    USD / {settings.duration} month{settings.duration > 1 ? 's' : ''}
                  </div>
                </div>
                <div id="budget-description" className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                  <FaInfoCircle className="text-gray-400" />
                  Monthly budget: ${(budget / settings.duration).toLocaleString()}
                </div>
              </div>

              <motion.button
                onClick={calculateMediaMix}
                disabled={selectedChannels.length === 0 || isCalculating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  selectedChannels.length > 0 && !isCalculating
                    ? {
                        scale: [1, 1.02, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(79, 70, 229, 0)",
                          "0 0 0 10px rgba(79, 70, 229, 0)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className={`w-full mt-4 px-4 py-2 rounded-lg font-medium text-white transition-all ${
                  selectedChannels.length === 0
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                }`}
              >
                {isCalculating ? (
                  <span className="flex items-center justify-center gap-2">
                    <FaSyncAlt className="animate-spin" />
                    Optimizing Mix...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <FaBrain />
                    Calculate Optimal Mix
                  </span>
                )}
              </motion.button>
            </motion.div>

            {/* Right Column: Results & Insights */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-indigo-100/20 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
            >
              <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                <FaChartLine className="text-indigo-600" />
                AI Insights
              </h3>

              {showInsights ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="relative aspect-square max-w-[300px] mx-auto mb-6">
                    <Suspense fallback={<ChartLoading />}>
                      <MediaPlanChart data={chartData} />
                    </Suspense>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center"
                      >
                        <div className="text-2xl font-bold text-indigo-600">${budget.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Total Budget</div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Animate channel allocations */}
                  <div className="space-y-3">
                    {selectedChannels.map((channelId, index) => {
                      const channel = adChannels.find(ch => ch.id === channelId)
                      const prediction = mediaMix.find(c => c.id === channelId)?.predictions
                      if (!channel) return null

                      return (
                        <motion.div
                          key={channelId}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          className="relative"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }} />
                              <span className="text-sm font-medium">{channel.name}</span>
                            </div>
                            <span className="text-sm font-semibold">
                              {mediaMix.find(c => c.id === channelId)?.allocation?.toFixed(1)}%
                            </span>
                          </div>
                          {prediction && (
                            <div className="grid grid-cols-3 gap-2 mt-2">
                              <div className="text-center p-2 bg-indigo-50 rounded-lg">
                                <div className="text-xs text-gray-500">Impressions</div>
                                <div className="text-sm font-medium text-indigo-600">
                                  {(prediction.impressions / 1000).toFixed(1)}K
                                </div>
                              </div>
                              <div className="text-center p-2 bg-indigo-50 rounded-lg">
                                <div className="text-xs text-gray-500">CTR</div>
                                <div className="text-sm font-medium text-indigo-600">
                                  {(prediction.ctr * 100).toFixed(1)}%
                                </div>
                              </div>
                              <div className="text-center p-2 bg-indigo-50 rounded-lg">
                                <div className="text-xs text-gray-500">Conv. Rate</div>
                                <div className="text-sm font-medium text-indigo-600">
                                  {(prediction.conversion * 100).toFixed(1)}%
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Add AI Recommendations section after the channel cards */}
                  {selectedChannels.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Recommendations</h3>
                      <div className="space-y-2">
                        {generateTopThreeInsights(mediaMix).map((insight, index) => (
                          <div
                            key={index}
                            className="p-4 rounded-lg bg-white shadow-sm border border-gray-100"
                          >
                            <p className={`text-sm ${
                              insight.startsWith('🟢') ? 'text-green-600' :
                              insight.startsWith('🟡') ? 'text-amber-600' :
                              'text-red-600'
                            }`}>
                              {insight}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Get Media Plan Button */}
                  <div className="border-t border-gray-100 pt-4 flex flex-col items-center w-full">
                    <button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className={`w-full sm:w-auto min-w-[200px] px-6 py-3 text-white rounded-lg transition-all duration-300 ${
                        isDownloading
                          ? 'bg-indigo-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <FaDownload className={`w-5 h-5 ${isDownloading ? 'animate-bounce' : ''}`} />
                        <span>{isDownloading ? 'Preparing...' : 'Download Media Mix'}</span>
                      </div>
                    </button>
                    <p className="text-xs text-gray-500 text-center mt-2 max-w-sm">
                      Get a detailed Excel file with campaign strategy, predictions, and recommendations
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <FaChartPie className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">Select channels and calculate to see AI insights</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced AI Magic Animation */}
      <AnimatePresence>
        {showMagicAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-gradient-to-b from-indigo-900/40 to-purple-900/40"
          >
            {/* Neural network background effect */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`node-${i}`}
                  className="absolute w-2 h-2 rounded-full bg-white/30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.7, 0.3],
                    boxShadow: [
                      '0 0 20px rgba(255,255,255,0.3)',
                      '0 0 30px rgba(255,255,255,0.5)',
                      '0 0 20px rgba(255,255,255,0.3)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
              {/* Neural connections */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`connection-${i}`}
                  className="absolute h-px w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                  animate={{
                    opacity: [0, 0.5, 0],
                    width: ['0px', '200px', '0px'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="relative">
              {/* Advanced loading circle */}
              <div className="w-48 h-48 rounded-full bg-white/10 shadow-2xl flex items-center justify-center relative overflow-hidden backdrop-blur-2xl border border-white/20">
                {/* Rotating gradient rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`ring-${i}`}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(from ${i * 120}deg, transparent, ${
                        ['#818cf8', '#c084fc', '#6366f1'][i]
                      }40, transparent)`,
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 8 - i * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ))}
                
                {/* Inner circle with AI brain */}
                <div className="absolute inset-4 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotateY: [0, 360],
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-center relative z-10"
                  >
                    <motion.div
                      animate={{
                        y: [0, -3, 0],
                        filter: [
                          'drop-shadow(0 0 8px rgba(99,102,241,0.5))',
                          'drop-shadow(0 0 12px rgba(99,102,241,0.8))',
                          'drop-shadow(0 0 8px rgba(99,102,241,0.5))',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <FaBrain className="w-14 h-14 mx-auto mb-2 text-indigo-600" />
                    </motion.div>
                    <div className="text-lg font-medium bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                      AI Optimizing
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Advanced Analysis</div>
                  </motion.div>
                </div>
              </div>

              {/* Data particles */}
              {[...Array(32)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background: `radial-gradient(circle at center, ${
                      i % 4 === 0 ? '#818cf8' : 
                      i % 4 === 1 ? '#c084fc' : 
                      i % 4 === 2 ? '#6366f1' :
                      '#a855f7'
                    }, transparent)`,
                    boxShadow: `0 0 10px ${
                      i % 4 === 0 ? '#818cf8' : 
                      i % 4 === 1 ? '#c084fc' : 
                      i % 4 === 2 ? '#6366f1' :
                      '#a855f7'
                    }`,
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: Math.sin(i * (Math.PI * 2 / 16)) * 100,
                    y: Math.cos(i * (Math.PI * 2 / 16)) * 100,
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Scanning effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.2), transparent)',
                  height: '200%',
                  top: '-50%',
                }}
                animate={{
                  y: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Calculator 