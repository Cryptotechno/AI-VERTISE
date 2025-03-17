import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { 
  FaBrain, 
  FaMagic, 
  FaChartPie, 
  FaBullhorn, 
  FaVideo,
  FaPlayCircle,
  FaHeadphones,
  FaStore,
  FaNewspaper,
  FaDesktop,
  FaRegWindowRestore,
  FaTelegram,
  FaRegLightbulb,
  FaChartLine,
  FaShoppingCart,
  FaSyncAlt,
  FaStar,
  FaRocket,
  FaChartBar,
  FaArrowUp,
  FaUsers,
  FaPercentage,
  FaCheck,
  FaCog,
  FaInfoCircle,
  FaRobot,
  FaMobile,
  FaUserTag,
  FaUserCog,
  FaExchangeAlt,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaSnapchatGhost,
  FaLinkedin,
  FaTwitter,
  FaSearch,
  FaGamepad,
  FaMapMarkerAlt,
  FaPodcast,
  FaShoppingBag,
  FaFileDownload,
  FaWhatsapp,
  FaApple,
  FaGooglePlay,
  FaGlobe,
  FaMailBulk,
  FaCommentDots,
  FaNetworkWired,
  FaQrcode,
  FaHandshake,
  FaUserFriends,
  FaDownload
} from 'react-icons/fa'
import { utils as xlsxUtils, writeFile as xlsxWriteFile } from 'xlsx'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend)

interface Channel {
  id: string
  name: string
  color: string
  icon: React.ReactNode
  description: string
}

type CampaignGoal = 'awareness' | 'consideration' | 'conversion'

interface Goal {
  id: CampaignGoal
  name: string
  icon: React.ReactNode
  description: string
}

const campaignGoals: Goal[] = [
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
]

const adChannels: Channel[] = [
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
]

// Add new interfaces for AI insights
interface AIInsight {
  type: 'positive' | 'neutral' | 'negative'
  message: string
  impact: number // 0-100
  confidence: number // 0-100
}

interface ChannelPrediction {
  reach: number // Estimated reach in thousands
  engagement: number // Expected engagement rate
  conversion: number // Expected conversion rate
  roi: number // Predicted ROI multiplier
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
  duration: number // in months
  isAutomated: boolean // Keep this for internal use but remove the UI toggle
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

// Update the getChannelPredictions function
const getChannelPredictions = (
  channel: string, 
  goal: CampaignGoal, 
  budget: number,
  settings: CampaignSettings
): ChannelPrediction => {
  // Base calculations
  const baseReach = budget * (Math.random() * 0.5 + 0.5)
  const baseEngagement = Math.random() * 3 + 2
  const baseConversion = Math.random() * 1.5 + 0.5
  const baseRoi = Math.random() * 3 + 2

  // Get multipliers
  const campaignTypeMultiplier = campaignTypes.find(t => t.id === settings.type)?.multiplier || 1
  const audienceMultiplier = audienceTargets.find(t => t.id === settings.audienceTarget)?.multiplier || 1
  const automationBonus = settings.isAutomated ? 1.2 : 1
  const durationMultiplier = Math.min(1 + (settings.duration - 1) * 0.1, 1.5) // Up to 50% bonus for longer campaigns

  // Goal-specific adjustments
  const goalAdjustments = {
    awareness: { reach: 1.5, engagement: 0.8, conversion: 0.7, roi: 0.9 },
    consideration: { reach: 1.2, engagement: 1.3, conversion: 1.1, roi: 1.2 },
    conversion: { reach: 0.8, engagement: 1.1, conversion: 1.5, roi: 1.4 }
  }

  const adj = goalAdjustments[goal]

  // Channel-specific adjustments
  const channelMultipliers: Record<string, number> = {
    display: settings.type === 'web_landing' ? 1.2 : 1,
    video: settings.type === 'cross_platform' ? 1.3 : 1,
    native: settings.type === 'mobile_app' ? 1.25 : 1,
    programmatic: settings.isAutomated ? 1.4 : 1,
    telegram: settings.audienceTarget === 'specific' ? 1.3 : 1,
    retail: settings.audienceTarget === 'custom' ? 1.35 : 1
  }

  const channelMultiplier = channelMultipliers[channel] || 1

  // Apply all multipliers
  return {
    reach: baseReach * adj.reach * campaignTypeMultiplier * audienceMultiplier * channelMultiplier * durationMultiplier,
    engagement: baseEngagement * adj.engagement * campaignTypeMultiplier * audienceMultiplier * automationBonus,
    conversion: baseConversion * adj.conversion * audienceMultiplier * automationBonus * channelMultiplier,
    roi: baseRoi * adj.roi * campaignTypeMultiplier * audienceMultiplier * automationBonus * durationMultiplier
  }
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

const Calculator = () => {
  const [budget, setBudget] = useState<number>(5000)
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])
  const [selectedGoal, setSelectedGoal] = useState<CampaignGoal>('awareness')
  const [showResults, setShowResults] = useState(false)
  const [allocations, setAllocations] = useState<Record<string, number>>({})
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [predictions, setPredictions] = useState<Record<string, ChannelPrediction>>({})
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [suggestedChannels, setSuggestedChannels] = useState<string[]>([])
  const [settings, setSettings] = useState<CampaignSettings>({
    type: 'web_landing',
    audienceTarget: 'broad',
    duration: 1,
    isAutomated: true
  })
  const [showMagicAnimation, setShowMagicAnimation] = useState(false)

  const handleChannelToggle = (channelId: string) => {
    setSelectedChannels(prev =>
      prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    )
    setShowResults(false)
  }

  // Update useEffect for insights
  useEffect(() => {
    if (selectedChannels.length > 0) {
      const newInsights: AIInsight[] = []
      
      // Channel synergies
      selectedChannels.forEach(channel => {
        const synergies = channelSynergies[channel]
        const matchingSynergies = synergies?.filter(s => selectedChannels.includes(s)) || []
        
        if (matchingSynergies.length > 0) {
          newInsights.push({
            type: 'positive',
            message: `Strong synergy detected between ${channel} and ${matchingSynergies.join(', ')}`,
            impact: 85,
            confidence: 92
          })
        }
      })

      // Campaign type insights
      if (settings.type === 'cross_platform' && selectedChannels.length < 3) {
        newInsights.push({
          type: 'negative',
          message: 'Cross-platform campaigns perform better with 3+ channels',
          impact: 70,
          confidence: 88
        })
      }

      if (settings.type === 'mobile_app' && !selectedChannels.includes('native')) {
        newInsights.push({
          type: 'neutral',
          message: 'Native ads are highly effective for mobile app campaigns',
          impact: 75,
          confidence: 90
        })
      }

      // Audience targeting insights
      if (settings.audienceTarget === 'specific' && !selectedChannels.includes('programmatic')) {
        newInsights.push({
          type: 'neutral',
          message: 'Programmatic RTB enables precise audience targeting',
          impact: 80,
          confidence: 85
        })
      }

      // Duration insights
      if (settings.duration >= 3 && selectedChannels.length < 4) {
        newInsights.push({
          type: 'neutral',
          message: 'Longer campaigns benefit from broader channel mix',
          impact: 65,
          confidence: 82
        })
      }

      // Goal-specific insights
      switch (selectedGoal) {
        case 'awareness':
          if (!selectedChannels.includes('video') && !selectedChannels.includes('dooh')) {
            newInsights.push({
              type: 'neutral',
              message: 'Consider adding Video or DOOH for better brand awareness',
              impact: 75,
              confidence: 88
            })
          }
          break
        case 'consideration':
          if (!selectedChannels.includes('native')) {
            newInsights.push({
              type: 'neutral',
              message: 'Native advertising could improve consideration metrics',
              impact: 70,
              confidence: 85
            })
          }
          break
        case 'conversion':
          if (!selectedChannels.includes('retail') && budget > 10000) {
            newInsights.push({
              type: 'negative',
              message: 'High budget without retail media may limit conversion potential',
              impact: 65,
              confidence: 82
            })
          }
          break
      }

      setInsights(newInsights)
    }
  }, [selectedChannels, selectedGoal, budget, settings])

  // Generate channel suggestions
  useEffect(() => {
    if (selectedGoal && budget) {
      const suggestions = adChannels
        .filter(channel => !selectedChannels.includes(channel.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(channel => channel.id)
      
      setSuggestedChannels(suggestions)
    }
  }, [selectedGoal, budget])

  // Update calculateMediaMix function
  const calculateMediaMix = () => {
    if (selectedChannels.length === 0) return

    setIsOptimizing(true)
    setShowMagicAnimation(true)

    setTimeout(() => {
      setShowMagicAnimation(false)
      const baseAllocation = 100 / selectedChannels.length
      const newAllocations: Record<string, number> = {}
      const newPredictions: Record<string, ChannelPrediction> = {}
      
      selectedChannels.forEach(channelId => {
        newAllocations[channelId] = baseAllocation
        newPredictions[channelId] = getChannelPredictions(channelId, selectedGoal, budget, settings)
      })

      // Apply AI optimizations based on all factors
      const optimizationFactors = {
        web_landing: { display: 5, native: 3 },
        mobile_app: { native: 7, video: 4 },
        cross_platform: { video: 6, programmatic: 5 }
      }

      const goalFactors = {
        awareness: { video: 7, dooh: 5, display: 3, audio: 2 },
        consideration: { native: 6, video: 4, ctv: 3, telegram: 2 },
        conversion: { retail: 8, programmatic: 5, native: 3 }
      }

      // Apply campaign type optimizations
      const typeFactors = optimizationFactors[settings.type]
      Object.entries(typeFactors).forEach(([channel, bonus]) => {
        if (selectedChannels.includes(channel)) {
          newAllocations[channel] += bonus * (settings.isAutomated ? 1.2 : 1)
        }
      })

      // Apply goal optimizations
      const currentGoalFactors = goalFactors[selectedGoal]
      Object.entries(currentGoalFactors).forEach(([channel, bonus]) => {
        if (selectedChannels.includes(channel)) {
          newAllocations[channel] += bonus
        }
      })

      // Duration impact
      if (settings.duration > 1) {
        selectedChannels.forEach(channel => {
          if (channel === 'programmatic' || channel === 'native') {
            newAllocations[channel] *= (1 + (settings.duration - 1) * 0.1)
          }
        })
      }
      
      // Normalize allocations
      const total = Object.values(newAllocations).reduce((sum, val) => sum + val, 0)
      Object.keys(newAllocations).forEach(key => {
        newAllocations[key] = (newAllocations[key] / total) * 100
      })

      setAllocations(newAllocations)
      setPredictions(newPredictions)
      setShowResults(true)
      setIsOptimizing(false)
    }, 2000)
  }

  const reviseMediaMix = () => {
    // Slightly adjust allocations to simulate AI refinement
    const adjustedAllocations = { ...allocations }
    const adjustmentFactor = 0.15 // 15% maximum adjustment

    Object.keys(adjustedAllocations).forEach(key => {
      const randomAdjustment = (Math.random() * 2 - 1) * adjustmentFactor // Random adjustment between -15% and +15%
      adjustedAllocations[key] *= (1 + randomAdjustment)
    })

    // Normalize to ensure total is still 100%
    const total = Object.values(adjustedAllocations).reduce((sum, val) => sum + val, 0)
    Object.keys(adjustedAllocations).forEach(key => {
      adjustedAllocations[key] = (adjustedAllocations[key] / total) * 100
    })

    setAllocations(adjustedAllocations)
  }

  const chartData = {
    labels: selectedChannels.map(id => adChannels.find(ch => ch.id === id)?.name),
    datasets: [{
      data: selectedChannels.map(id => allocations[id]),
      backgroundColor: selectedChannels.map(id => adChannels.find(ch => ch.id === id)?.color),
      borderWidth: 0
    }]
  }

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const channelBudget = (value / 100) * budget;
            return `${value.toFixed(1)}% ($${channelBudget.toLocaleString()})`;
          }
        }
      }
    }
  }

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
                  {campaignGoals.map(goal => (
                    <button
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        selectedGoal === goal.id
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600'
                          : 'border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        selectedGoal === goal.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {goal.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{goal.name}</div>
                        <div className="text-xs text-gray-500">{goal.description}</div>
                      </div>
                      {selectedGoal === goal.id && (
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
                        className={`p-2 rounded-lg border transition-all ${
                          settings.type === type.id
                            ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600'
                            : 'border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg mx-auto mb-1 w-fit ${
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      selectedChannels.includes(channel.id)
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600'
                        : 'border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30'
                    }`}
                  >
                    {/* Add glowing effect for selected channels */}
                    {selectedChannels.includes(channel.id) && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-indigo-400/20"
                        animate={{
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    )}
                    <div className={`p-2 rounded-lg ${
                      selectedChannels.includes(channel.id) ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {channel.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{channel.name}</div>
                      {selectedChannels.includes(channel.id) && predictions[channel.id] && (
                        <div className="text-xs text-indigo-600 mt-1">
                          ~{predictions[channel.id].roi.toFixed(1)}x ROI
                        </div>
                      )}
                    </div>
                    {suggestedChannels.includes(channel.id) && !selectedChannels.includes(channel.id) && (
                      <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                        Recommended
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Campaign Budget */}
              <div className="mt-4 p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Budget
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-colors"
                    min="1000"
                    step="1000"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    USD / {settings.duration} month{settings.duration > 1 ? 's' : ''}
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                  <FaInfoCircle className="text-gray-400" />
                  Monthly budget: ${(budget / settings.duration).toLocaleString()}
                </div>
              </div>

              <motion.button
                onClick={calculateMediaMix}
                disabled={selectedChannels.length === 0 || isOptimizing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  selectedChannels.length > 0 && !isOptimizing
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
                {isOptimizing ? (
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

              {showResults ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="relative aspect-square max-w-[300px] mx-auto">
                    <Doughnut data={chartData} options={chartOptions} />
                    <div className="absolute inset-0 flex items-center justify-center">
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
                    {/* Simplified floating labels */}
                    {selectedChannels.map((channelId, index) => {
                      const channel = adChannels.find(ch => ch.id === channelId);
                      const allocation = allocations[channelId];
                      const angle = (index / selectedChannels.length) * Math.PI * 2 - Math.PI / 2;
                      const radius = 120; // Reduced radius for closer labels
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      
                      return (
                        <motion.div
                          key={channelId}
                          initial={{ opacity: 0, x, y }}
                          animate={{ opacity: 1, x, y }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2"
                          style={{ left: '50%', top: '50%' }}
                        >
                          <div 
                            className="px-2 py-1 rounded-full bg-white/90 shadow-sm border border-gray-100 text-xs font-semibold"
                            style={{ color: channel?.color }}
                          >
                            {allocation?.toFixed(1)}%
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Animate channel allocations */}
                  <div className="space-y-3">
                    {selectedChannels.map((channelId, index) => {
                      const channel = adChannels.find(ch => ch.id === channelId)
                      const prediction = predictions[channelId]
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
                              {allocations[channelId]?.toFixed(1)}%
                            </span>
                          </div>
                          {prediction && (
                            <div className="grid grid-cols-3 gap-2 mt-2">
                              <div className="text-center p-2 bg-indigo-50 rounded-lg">
                                <div className="text-xs text-gray-500">Reach</div>
                                <div className="text-sm font-medium text-indigo-600">
                                  {(prediction.reach / 1000).toFixed(1)}K
                                </div>
                              </div>
                              <div className="text-center p-2 bg-indigo-50 rounded-lg">
                                <div className="text-xs text-gray-500">Engagement</div>
                                <div className="text-sm font-medium text-indigo-600">
                                  {prediction.engagement.toFixed(1)}%
                                </div>
                              </div>
                              <div className="text-center p-2 bg-indigo-50 rounded-lg">
                                <div className="text-xs text-gray-500">Conv. Rate</div>
                                <div className="text-sm font-medium text-indigo-600">
                                  {prediction.conversion.toFixed(1)}%
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Animate insights */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-gray-700">AI Recommendations</h4>
                    {insights.map((insight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ scale: 1.02 }}
                        className={`p-3 rounded-lg border ${
                          insight.type === 'positive'
                            ? 'border-green-100 bg-green-50'
                            : insight.type === 'negative'
                            ? 'border-red-100 bg-red-50'
                            : 'border-yellow-100 bg-yellow-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-1.5 rounded-lg ${
                            insight.type === 'positive'
                              ? 'bg-green-100 text-green-600'
                              : insight.type === 'negative'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            {insight.type === 'positive' ? <FaArrowUp /> : insight.type === 'negative' ? <FaArrowUp className="rotate-180" /> : <FaRegLightbulb />}
                          </div>
                          <div>
                            <p className="text-sm">{insight.message}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs">
                              <span className="flex items-center gap-1">
                                <FaChartLine className="text-gray-400" />
                                Impact: {insight.impact}%
                              </span>
                              <span className="flex items-center gap-1">
                                <FaStar className="text-gray-400" />
                                Confidence: {insight.confidence}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Get Media Plan Button */}
                  <div className="border-t border-gray-100 pt-4">
                    <button
                      onClick={() => {
                        // Prepare data for Excel sheets
                        const campaignSheet = [
                          ['Campaign Overview'],
                          ['Goal', campaignGoals.find(g => g.id === selectedGoal)?.name],
                          ['Type', campaignTypes.find(t => t.id === settings.type)?.name],
                          ['Duration', `${settings.duration} months`],
                          ['Total Budget', `$${budget.toLocaleString()}`],
                          ['Monthly Budget', `$${(budget / settings.duration).toLocaleString()}`],
                          ['Audience Target', audienceTargets.find(t => t.id === settings.audienceTarget)?.name],
                          ['AI Automation', settings.isAutomated ? 'Enabled' : 'Disabled'],
                          ['Start Date', new Date().toLocaleDateString()],
                          ['End Date', new Date(Date.now() + settings.duration * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()],
                          [],
                          ['Channel Allocations']
                        ]

                        // Add channel allocations
                        selectedChannels.forEach(id => {
                          const channel = adChannels.find(ch => ch.id === id)
                          const allocation = allocations[id] || 0
                          const channelBudget = (budget * allocation) / 100
                          campaignSheet.push([
                            channel?.name,
                            `${allocation.toFixed(1)}%`,
                            `$${channelBudget.toLocaleString()}`
                          ])
                        })

                        // Create channel details sheet
                        const channelDetailsSheet = [
                          ['Channel Performance Predictions'],
                          ['Channel', 'Allocation', 'Monthly Budget', 'Total Budget', 'Reach', 'Engagement', 'Conversion Rate', 'ROI', 'Est. Clicks', 'Est. Conversions', 'CPC', 'CPM', 'CPA']
                        ]

                        selectedChannels.forEach(id => {
                          const channel = adChannels.find(ch => ch.id === id)
                          const allocation = allocations[id] || 0
                          const channelBudget = (budget * allocation) / 100
                          const prediction = predictions[id]
                          const monthlyBudget = channelBudget / settings.duration
                          const reach = prediction?.reach || 0
                          const engagement = prediction?.engagement || 0
                          const conversion = prediction?.conversion || 0
                          const clicks = Math.round((reach * engagement) / 100)
                          const conversions = Math.round((reach * conversion) / 100)

                          channelDetailsSheet.push([
                            channel?.name || 'Unknown Channel',
                            `${allocation.toFixed(1)}%`,
                            `$${monthlyBudget.toLocaleString()}`,
                            `$${channelBudget.toLocaleString()}`,
                            reach.toLocaleString(),
                            `${engagement.toFixed(2)}%`,
                            `${conversion.toFixed(2)}%`,
                            `${prediction?.roi.toFixed(2)}x`,
                            clicks.toLocaleString(),
                            conversions.toLocaleString(),
                            `$${(channelBudget / clicks).toFixed(2)}`,
                            `$${(channelBudget / reach * 1000).toFixed(2)}`,
                            `$${(channelBudget / conversions).toFixed(2)}`
                          ])
                        })

                        // Create insights sheet
                        const insightsSheet = [
                          ['AI Insights and Recommendations'],
                          ['Type', 'Message', 'Impact', 'Confidence', 'Priority', 'Action Items']
                        ]

                        insights.forEach(insight => {
                          insightsSheet.push([
                            insight.type.charAt(0).toUpperCase() + insight.type.slice(1),
                            insight.message,
                            `${insight.impact}%`,
                            `${insight.confidence}%`,
                            insight.type === 'positive' ? 'High' : insight.type === 'negative' ? 'Critical' : 'Medium',
                            'Review channel mix, Adjust budget allocation, Optimize targeting'
                          ])
                        })

                        // Create timeline sheet
                        const timelineSheet = [
                          ['Campaign Timeline'],
                          ['Phase', 'Start Date', 'Duration'],
                          ['Setup', new Date().toLocaleDateString(), '1 week'],
                          ['Testing', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(), '2 weeks'],
                          ['Scaling', new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toLocaleDateString(), `${settings.duration - 1} months`]
                        ]

                        // Create workbook
                        const wb = xlsxUtils.book_new()
                        
                        // Add sheets
                        const wsOverview = xlsxUtils.aoa_to_sheet(campaignSheet)
                        const wsChannels = xlsxUtils.aoa_to_sheet(channelDetailsSheet)
                        const wsInsights = xlsxUtils.aoa_to_sheet(insightsSheet)
                        const wsTimeline = xlsxUtils.aoa_to_sheet(timelineSheet)

                        // Set column widths
                        wsOverview['!cols'] = [{ wch: 20 }, { wch: 30 }]
                        wsChannels['!cols'] = Array(13).fill({ wch: 15 })
                        wsInsights['!cols'] = [{ wch: 15 }, { wch: 50 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 40 }]
                        wsTimeline['!cols'] = [{ wch: 20 }, { wch: 20 }, { wch: 20 }]

                        xlsxUtils.book_append_sheet(wb, wsOverview, 'Campaign Overview')
                        xlsxUtils.book_append_sheet(wb, wsChannels, 'Channel Details')
                        xlsxUtils.book_append_sheet(wb, wsInsights, 'AI Insights')
                        xlsxUtils.book_append_sheet(wb, wsTimeline, 'Timeline')

                        // Save Excel file
                        xlsxWriteFile(wb, `media-plan-${new Date().toISOString().split('T')[0]}.xlsx`)
                      }}
                      className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <FaDownload className="w-4 h-4" />
                      Download Media Plan (Excel)
                    </button>
                    <p className="text-xs text-gray-500 text-center mt-1">
                      Get a detailed Excel file with campaign strategy, predictions, and recommendations
                    </p>
                  </div>

                  <button
                    onClick={reviseMediaMix}
                    className="w-full px-3 py-1.5 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <FaSyncAlt />
                      Optimize Further
                    </span>
                  </button>
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

      {/* Keep only the AI Magic Animation */}
      <AnimatePresence>
        {showMagicAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-indigo-900/40"
          >
            {/* Add magical portal effect */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at center, ${
                      ['#818cf8', '#c084fc', '#6366f1'][i]
                    }10, transparent 60%)`
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: i * 2,
                    ease: "linear"
                  }}
                />
              ))}
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", duration: 1 }}
              className="relative"
            >
              {/* Enhanced rings */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    rotate: i % 2 === 0 ? 360 : -360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3 + i,
                    ease: "linear",
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className={`absolute rounded-full border-4 ${
                    i % 2 === 0 
                      ? 'border-t-indigo-600 border-r-purple-600 border-b-indigo-400 border-l-purple-400'
                      : 'border-t-purple-600 border-r-indigo-600 border-b-purple-400 border-l-indigo-400'
                  }`}
                  style={{
                    inset: `${-4 - i * 4}px`,
                    opacity: 1 - i * 0.15
                  }}
                />
              ))}

              {/* Enhanced inner content */}
              <div className="w-40 h-40 rounded-full bg-white shadow-lg flex items-center justify-center relative overflow-hidden">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotateY: [0, 360],
                    rotateZ: [0, 45, 0, -45, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-center relative z-10"
                >
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FaBrain className="w-12 h-12 mx-auto mb-2 text-indigo-600" />
                  </motion.div>
                  <div className="text-lg font-medium bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_100%]">
                    <motion.span
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="inline-block"
                    >
                      Optimizing
                    </motion.span>
                  </div>
                </motion.div>

                {/* Enhanced glowing effects */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-indigo-400/30 via-purple-400/30 to-indigo-400/30"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    rotate: [0, 180],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Enhanced floating particles */}
              {[...Array(36)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0 }}
                  animate={{
                    x: Math.sin(i) * (60 + Math.random() * 30),
                    y: Math.cos(i) * (60 + Math.random() * 30),
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                  className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
                  style={{
                    background: `radial-gradient(circle at center, ${
                      i % 3 === 0 ? '#818cf8' : i % 3 === 1 ? '#c084fc' : '#6366f1'
                    }, transparent)`,
                    boxShadow: `0 0 10px ${
                      i % 3 === 0 ? '#818cf8' : i % 3 === 1 ? '#c084fc' : '#6366f1'
                    }`
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Calculator 