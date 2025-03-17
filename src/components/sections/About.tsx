import { motion } from 'framer-motion'
import { 
  FaChartLine, FaUsers, FaLightbulb, FaHandshake, FaGlobeEurope, FaCertificate, 
  FaAward, FaChartBar, FaBrain, FaCode, FaSearchDollar, FaUsersCog, FaRobot,
  FaMapMarkerAlt, FaLanguage, FaCalendarAlt, FaGraduationCap, FaUserTie
} from 'react-icons/fa'
import { useState } from 'react'

// Default fallback image
const BALTYK_IMAGE = 'http://i.imgur.com/zpYk2iK.jpg'

const stats = [
  {
    number: "500+",
    label: "Successful Campaigns",
    color: "from-indigo-600 to-indigo-800"
  },
  {
    number: "95%",
    label: "Client Satisfaction",
    color: "from-purple-600 to-purple-800"
  },
  {
    number: "8+",
    label: "Years Experience",
    color: "from-indigo-600 to-purple-600"
  },
  {
    number: "12M+",
    label: "Ad Budget Managed",
    color: "from-purple-600 to-indigo-600"
  }
]

const features = [
  {
    icon: FaGlobeEurope,
    title: 'Local Expertise, Global Technology',
    description: 'Based in Poznań, we combine local market knowledge with cutting-edge global AI technology. Our solutions are tailored to the Polish and European markets.'
  },
  {
    icon: FaLightbulb,
    title: 'Data-Driven Innovation',
    description: 'Our strategies leverage advanced analytics, machine learning algorithms, and real-time optimization to maximize ROI.'
  },
  {
    icon: FaHandshake,
    title: 'Dedicated Partnership',
    description: 'We maintain a 95% client retention rate through transparent communication and measurable results. Your success is our success.'
  },
  {
    icon: FaAward,
    title: 'Industry Recognition',
    description: 'Recognized by Google, Meta, and LinkedIn as a premier advertising partner with multiple industry certifications.'
  }
]

const experts = [
  {
    icon: FaChartBar,
    role: "Digital Marketing Strategist",
    expertise: [
      "Multi-Channel Strategy",
      "Market Analysis",
      "Budget Optimization",
      "Brand Development"
    ],
    specialization: [
      "Small Business Growth",
      "Local Market Targeting",
      "ROI-Focused Campaigns"
    ],
    achievements: [
      "200+ successful local campaigns",
      "Average 3.5x ROAS",
      "85% client growth rate"
    ],
    certifications: [
      "Google Ads Search",
      "Meta Ads Expert",
      "Google Analytics 4"
    ],
    experience: "6+ years",
    languages: ["Polish", "English", "German"],
    location: "Poznań, Poland",
    education: "Marketing & AI, UAM Poznań",
    industries: ["E-commerce", "Local Services", "B2B"]
  },
  {
    icon: FaUsersCog,
    role: "Ad Operations Specialist",
    expertise: [
      "Campaign Management",
      "Performance Tracking",
      "A/B Testing",
      "Conversion Optimization"
    ],
    specialization: [
      "Data-Driven Optimization",
      "Creative Testing",
      "Audience Targeting"
    ],
    achievements: [
      "45% avg. CPA reduction",
      "150+ optimized campaigns",
      "92% client retention"
    ],
    certifications: [
      "Google Ads Display",
      "Meta Blueprint",
      "Google Tag Manager"
    ],
    experience: "4+ years",
    languages: ["Polish", "English"],
    location: "Poznań, Poland",
    education: "Digital Marketing, WSB Poznań",
    industries: ["Retail", "Professional Services", "SaaS"]
  }
]

const About = () => {
  const [imageError, setImageError] = useState(false)

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-50 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-100 via-purple-100 to-indigo-50 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-4 py-2 bg-white rounded-full mb-6 shadow-sm border border-gray-100">
              <span className="text-indigo-600 font-medium">About Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-800 bg-clip-text text-transparent">
              Your AI-Powered Marketing Partner
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Transforming digital advertising through AI innovation, data-driven strategies, and proven expertise in the Polish market.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative group"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-[1.02] transition-transform duration-300"
                style={{ 
                  backgroundImage: `url(${BALTYK_IMAGE})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 mix-blend-overlay" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-white text-2xl font-bold mb-2">Bałtyk Business Center</h3>
                  <p className="text-white/90 text-lg">Poznań's Modern Business Hub</p>
                  <div className="mt-4 flex gap-2">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm">
                      Innovation Hub
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm">
                      AI Technology
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-50 blur-2xl" />
            <div className="absolute -top-4 -left-4 w-40 h-40 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full opacity-50 blur-2xl" />
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="prose prose-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Story</h3>
              <p className="text-gray-600">
                Founded in Poznań, AI VERTISE emerged from a vision to democratize access to advanced advertising technology. 
                We combine years of marketing expertise with cutting-edge AI to deliver exceptional results for businesses of all sizes.
              </p>

              <h3 className="text-2xl font-bold mb-4 mt-8 text-gray-900">Our Mission</h3>
              <p className="text-gray-600">
                To empower businesses with AI-driven marketing solutions that drive measurable growth and ROI, 
                while maintaining the personal touch and understanding that comes from being your local partner.
              </p>
            </div>

            {/* Stats Grid - Updated to 4 columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className={`text-3xl font-bold mb-2 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Expert Team Section - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-white rounded-full mb-6 shadow-sm border border-gray-100">
              <span className="text-indigo-600 font-medium">Our Team</span>
            </div>
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Expert Team at Your Service</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedicated specialists work directly with you to ensure your advertising success, 
              combining proven marketing expertise with smart technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {experts.map((expert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 group-hover:scale-110 transition-transform">
                    <expert.icon className="w-7 h-7" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-gray-900">{expert.role}</h4>
                    <p className="text-gray-600 text-sm">
                      {expert.industries.join(" • ")}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Personal Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm text-gray-600">{expert.experience}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm text-gray-600">{expert.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaLanguage className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm text-gray-600">{expert.languages.join(", ")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaGraduationCap className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm text-gray-600">{expert.education}</span>
                    </div>
                  </div>

                  {/* Key Achievements */}
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <FaAward className="w-4 h-4 mr-2 text-indigo-600" />
                      Key Achievements:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {expert.achievements.map((achievement, i) => (
                        <span key={i} className="px-3 py-1.5 bg-green-50 text-green-600 rounded-full text-sm">
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specialization */}
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <FaLightbulb className="w-4 h-4 mr-2 text-indigo-600" />
                      Specialization:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {expert.specialization.map((spec, i) => (
                        <span key={i} className="px-3 py-1.5 bg-yellow-50 text-yellow-600 rounded-full text-sm">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Areas of Focus */}
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <FaUserTie className="w-4 h-4 mr-2 text-indigo-600" />
                      Areas of Focus:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {expert.expertise.map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <FaCertificate className="w-4 h-4 mr-2 text-indigo-600" />
                      Industry Certifications:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {expert.certifications.map((cert, i) => (
                        <span key={i} className="px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full text-sm">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 