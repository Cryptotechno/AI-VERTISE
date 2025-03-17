import React from 'react'
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

const MiniChart: React.FC<{ data: number[], positive: boolean }> = ({ data, positive }) => (
  <div className="flex items-end h-8 gap-0.5 mt-2">
    {data.map((value, index) => (
      <div
        key={index}
        style={{ height: `${value}%` }}
        className={`w-1 rounded-sm ${
          positive ? 'bg-green-100' : 'bg-red-100'
        } relative group`}
      >
        <div
          style={{ height: `${value}%` }}
          className={`absolute bottom-0 left-0 right-0 ${
            positive ? 'bg-green-500' : 'bg-red-500'
          } rounded-sm opacity-50`}
        />
      </div>
    ))}
  </div>
)

const DashboardMockup: React.FC = () => {
  const reachData = [40, 55, 45, 60, 65, 50, 70]
  const conversionData = [30, 45, 55, 50, 60, 65, 75]
  const cpcData = [45, 40, 35, 45, 50, 55, 60]
  const roiData = [35, 45, 55, 60, 65, 70, 80]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100/50"
    >
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-lg">
            <FaBrain className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">AI Performance Overview</h2>
            <p className="text-xs text-gray-500">Real-time insights</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
            <FaRegBell className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
            <FaCog className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
            <FaEllipsisH className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Service Note */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 rounded-lg p-2.5 mb-6">
        <p className="text-[10px] text-gray-600 leading-relaxed">
          This interactive dashboard demonstrates our AI-powered approach to digital marketing. Experience how we combine data-driven insights with customer-centric strategies to maximize your campaign performance.
        </p>
      </div>

      {/* Time Period Selector */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-sm hover:from-indigo-500 hover:to-purple-500 transition-all">
            This Month
          </button>
          <button className="px-3 py-1.5 text-xs text-gray-600 hover:bg-indigo-50 rounded-lg font-medium transition-all">
            Last Month
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Total Reach</span>
            <div className="flex items-center gap-1 text-green-500 text-xs font-medium">
              <FaArrowUp className="w-2.5 h-2.5" />
              <span>12.5%</span>
            </div>
          </div>
          <div className="text-lg font-bold text-gray-900">2.4M</div>
          <MiniChart data={reachData} positive={true} />
        </div>

        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Conversions</span>
            <div className="flex items-center gap-1 text-green-500 text-xs font-medium">
              <FaArrowUp className="w-2.5 h-2.5" />
              <span>8.2%</span>
            </div>
          </div>
          <div className="text-lg font-bold text-gray-900">12.8K</div>
          <MiniChart data={conversionData} positive={true} />
        </div>

        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Avg. CPC</span>
            <div className="flex items-center gap-1 text-green-500 text-xs font-medium">
              <FaArrowUp className="w-2.5 h-2.5" />
              <span>4.2%</span>
            </div>
          </div>
          <div className="text-lg font-bold text-gray-900">$1.24</div>
          <MiniChart data={cpcData} positive={true} />
        </div>

        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">ROI</span>
            <div className="flex items-center gap-1 text-green-500 text-xs font-medium">
              <FaArrowUp className="w-2.5 h-2.5" />
              <span>15.3%</span>
            </div>
          </div>
          <div className="text-lg font-bold text-gray-900">285%</div>
          <MiniChart data={roiData} positive={true} />
        </div>
      </div>

      {/* Channel Performance */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
            <FaBrain className="w-3.5 h-3.5 text-indigo-600" />
            Channel Performance
          </h3>
          <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-medium">
            AI-Optimized
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: FaGoogle, name: 'Google Ads', type: 'Search & Display', amount: '$12.4k', growth: '+8.2%', color: '#4285F4', bg: 'bg-indigo-50' },
            { icon: FaFacebook, name: 'Facebook', type: 'Social', amount: '$8.6k', growth: '+12.5%', color: '#1877F2', bg: 'bg-indigo-50' },
            { icon: FaInstagram, name: 'Instagram', type: 'Visual', amount: '$6.2k', growth: '+15.3%', color: 'white', bg: 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600' },
            { icon: FaLinkedin, name: 'LinkedIn', type: 'B2B', amount: '$4.7k', growth: '+6.8%', color: '#0A66C2', bg: 'bg-indigo-50' },
            { icon: FaTiktok, name: 'TikTok', type: 'Video', amount: '$3.8k', growth: '+18.9%', color: 'white', bg: 'bg-gray-900' },
            { icon: FaYoutube, name: 'YouTube', type: 'Video', amount: '$5.4k', growth: '+10.2%', color: '#FF0000', bg: 'bg-red-50' }
          ].map((channel, index) => (
            <div key={index} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-gray-100 hover:border-indigo-100 transition-colors">
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
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="space-y-3 mt-6 mb-4">
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
          <div className="flex items-start gap-3 p-2.5 bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 rounded-xl border border-indigo-100/50">
            <div className="w-6 h-6 flex items-center justify-center bg-indigo-100 rounded-lg mt-0.5">
              <FaChartLine className="w-3 h-3 text-indigo-600" />
            </div>
            <div>
              <div className="font-medium text-xs text-gray-900 mb-0.5">Explore TikTok Opportunity</div>
              <div className="text-[10px] text-gray-500 leading-relaxed">TikTok shows highest growth rate (+18.9%). Consider increasing budget allocation by 25% and expanding to new audience segments.</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 rounded-xl border border-indigo-100/50">
            <div className="w-6 h-6 flex items-center justify-center bg-indigo-100 rounded-lg mt-0.5">
              <FaBullseye className="w-3 h-3 text-indigo-600" />
            </div>
            <div>
              <div className="font-medium text-xs text-gray-900 mb-0.5">Landing Page Optimization</div>
              <div className="text-[10px] text-gray-500 leading-relaxed">High reach (2.4M) but conversion rate could improve. Recommend A/B testing landing page with focus on mobile optimization.</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 rounded-xl border border-indigo-100/50">
            <div className="w-6 h-6 flex items-center justify-center bg-indigo-100 rounded-lg mt-0.5">
              <FaChartPie className="w-3 h-3 text-indigo-600" />
            </div>
            <div>
              <div className="font-medium text-xs text-gray-900 mb-0.5">Channel Mix Adjustment</div>
              <div className="text-[10px] text-gray-500 leading-relaxed">Consider reallocating 15% of Google Ads budget to Instagram and TikTok based on ROI trends and audience engagement patterns.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-4">
        <button className="px-3 py-1.5 text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1.5">
          <FaChartLine className="w-3.5 h-3.5" />
          View Details
        </button>
        <button className="px-4 py-2 text-xs bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-500 hover:to-purple-500 transition-all flex items-center gap-2 shadow-sm hover:shadow-md">
          <FaUserCircle className="w-3.5 h-3.5" />
          Try Live Demo
        </button>
      </div>
    </motion.div>
  )
}

export default DashboardMockup 