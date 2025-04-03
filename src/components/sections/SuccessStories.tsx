import { motion } from 'framer-motion'
import { 
  FaRocket, 
  FaMobile, 
  FaCheck, 
  FaChartLine, 
  FaUsers, 
  FaGlobe,
  FaShoppingBag,
  FaChartBar,
  FaRegLightbulb,
  FaArrowRight
} from 'react-icons/fa'

const SuccessStories = () => {
  return (
    <section id="success-stories" className="relative py-8" style={{ backgroundColor: '#f9f7fd' }}>
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15]">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-100 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-50/50 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#312e81] via-[#4338ca] to-[#6366f1]">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Discover how leading brands achieved exceptional growth through our AI-powered media mix optimization
          </p>
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">$500M+</div>
              <div className="text-sm text-gray-500">Ad Spend Optimized</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">185%</div>
              <div className="text-sm text-gray-500">Average ROAS Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">1000+</div>
              <div className="text-sm text-gray-500">Campaigns Optimized</div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Case Study 1: Luxury Fashion Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group bg-white rounded-2xl p-8 shadow-lg border border-indigo-100/20 relative overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/20 to-purple-100/20 rounded-bl-[100px] -z-1" />
            
            <div className="relative">
              <div className="flex items-start gap-4 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg">
                  <FaShoppingBag className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Global Luxury Fashion Brand
                    </h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-200 shadow-sm">
                      247% ROAS
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Digital Transformation Success
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
                  <div className="pl-6">
                    <p className="text-gray-600">
                      A leading luxury fashion retailer struggling with rising acquisition costs and declining ROAS 
                      partnered with us to revolutionize their digital marketing strategy. Through our AI-powered 
                      media mix optimization, we transformed their performance across all channels.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-white to-indigo-50/50 p-4 rounded-xl border border-indigo-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
                    <div className="relative">
                      <div className="flex items-baseline gap-1">
                        <div className="text-2xl font-bold text-indigo-600">+185%</div>
                        <div className="text-indigo-600/60 text-sm font-medium">↗</div>
                      </div>
                      <div className="text-sm font-medium text-gray-800">Conversion Rate</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-indigo-400" />
                        From 2.1% to 5.9%
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-white to-indigo-50/50 p-4 rounded-xl border border-indigo-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
                    <div className="relative">
                      <div className="flex items-baseline gap-1">
                        <div className="text-2xl font-bold text-indigo-600">-42%</div>
                        <div className="text-indigo-600/60 text-sm font-medium">↘</div>
                      </div>
                      <div className="text-sm font-medium text-gray-800">Cost Per Acquisition</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-indigo-400" />
                        From $89 to $52
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-800">Key Achievements</h4>
                    <div className="flex-1 h-px bg-gradient-to-r from-indigo-100 to-transparent" />
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-indigo-50/50 transition-colors">
                      <div className="p-1 rounded-lg bg-green-100">
                        <FaCheck className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Smart Channel Mix:</span>
                        <span className="text-gray-600"> Optimized budget allocation across 8 channels, focusing on high-performing combinations of programmatic display, social media, and search marketing</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-indigo-50/50 transition-colors">
                      <div className="p-1 rounded-lg bg-green-100">
                        <FaCheck className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Advanced Targeting:</span>
                        <span className="text-gray-600"> Implemented AI-driven audience segmentation, resulting in 2.8x higher engagement rates and 42% lower customer acquisition costs</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-indigo-50/50 transition-colors">
                      <div className="p-1 rounded-lg bg-green-100">
                        <FaCheck className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Creative Optimization:</span>
                        <span className="text-gray-600"> Dynamic creative testing across channels improved CTR by 75% and reduced creative production costs by 35%</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-indigo-50/50 transition-colors">
                      <div className="p-1 rounded-lg bg-green-100">
                        <FaCheck className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Performance Tracking:</span>
                        <span className="text-gray-600"> Real-time cross-channel attribution and optimization led to 185% improvement in overall campaign ROAS</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-50" />
                  <div className="relative rounded-xl p-4 border border-indigo-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-white shadow-sm">
                        <FaRegLightbulb className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 italic">
                          "The AI-powered optimization completely transformed our digital marketing performance. 
                          We're now able to scale our campaigns with confidence, knowing that every dollar is 
                          optimally allocated."
                        </p>
                        <p className="text-sm font-medium text-gray-800 mt-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          Digital Marketing Director
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Case Study 2: FinTech App */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group bg-white rounded-2xl p-8 shadow-lg border border-purple-100/20 relative overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/20 to-indigo-100/20 rounded-bl-[100px] -z-1" />
            
            <div className="relative">
              <div className="flex items-start gap-4 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 shadow-lg">
                  <FaMobile className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold bg-gradient-to-br from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Leading FinTech App
                    </h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-200 shadow-sm">
                      1M+ Downloads
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Rapid User Acquisition Case Study
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full" />
                  <div className="pl-6">
                    <p className="text-gray-600">
                      A venture-backed fintech startup needed to scale user acquisition rapidly while maintaining 
                      efficient cost metrics. Our AI media mix optimizer delivered exceptional results through 
                      intelligent budget allocation and cross-channel optimization.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-white to-purple-50/50 p-4 rounded-xl border border-purple-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5" />
                    <div className="relative">
                      <div className="flex items-baseline gap-1">
                        <div className="text-2xl font-bold text-purple-600">+312%</div>
                        <div className="text-purple-600/60 text-sm font-medium">↗</div>
                      </div>
                      <div className="text-sm font-medium text-gray-800">Install Rate</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-purple-400" />
                        From 1.8% to 7.4%
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-white to-purple-50/50 p-4 rounded-xl border border-purple-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5" />
                    <div className="relative">
                      <div className="flex items-baseline gap-1">
                        <div className="text-2xl font-bold text-purple-600">-38%</div>
                        <div className="text-purple-600/60 text-sm font-medium">↘</div>
                      </div>
                      <div className="text-sm font-medium text-gray-800">Cost Per Install</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-purple-400" />
                        From $4.80 to $2.98
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-800">Strategic Approach</h4>
                    <div className="flex-1 h-px bg-gradient-to-r from-purple-100 to-transparent" />
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-purple-50/50 transition-colors">
                      <div className="p-1 rounded-lg bg-green-100">
                        <FaCheck className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">App Store Optimization:</span>
                        <span className="text-gray-600"> Integrated ASO strategy with paid media, resulting in 245% increase in organic installs alongside paid growth</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-purple-50/50 transition-colors">
                      <div className="p-1 rounded-lg bg-green-100">
                        <FaCheck className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">User Behavior Analysis:</span>
                        <span className="text-gray-600"> AI-powered targeting based on user behavior patterns improved user quality score by 67% and reduced churn rate</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-purple-50/50 transition-colors">
                      <div className="p-1 rounded-lg bg-green-100">
                        <FaCheck className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Creative Testing:</span>
                        <span className="text-gray-600"> Automated A/B testing across channels identified winning creatives 4x faster than manual optimization</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-purple-50/50 transition-colors">
                      <div className="p-1 rounded-lg bg-green-100">
                        <FaCheck className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Real-time Optimization:</span>
                        <span className="text-gray-600"> Dynamic bid adjustments and budget reallocation drove 38% reduction in user acquisition costs</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 opacity-50" />
                  <div className="relative rounded-xl p-4 border border-purple-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-white shadow-sm">
                        <FaRegLightbulb className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 italic">
                          "The results exceeded our expectations. Not only did we hit our growth targets, 
                          but the quality of users acquired through the optimized channels showed significantly 
                          better retention and engagement metrics."
                        </p>
                        <p className="text-sm font-medium text-gray-800 mt-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                          Growth Marketing Lead
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <a 
            href="#calculator" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all group"
          >
            Try AI Media Mix Calculator
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-sm text-gray-500 mt-4">
            Join these success stories and transform your digital marketing performance
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default SuccessStories 