import { motion } from 'framer-motion'
import { 
  FaChartLine, FaUsers, FaLightbulb, FaHandshake, FaGlobeEurope, FaCertificate, 
  FaAward, FaChartBar, FaBrain, FaCode, FaSearchDollar, FaUsersCog, FaRobot,
  FaMapMarkerAlt, FaLanguage, FaCalendarAlt, FaGraduationCap, FaUserTie
} from 'react-icons/fa'
import { useState } from 'react'
import { Link } from 'react-router-dom'

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-20">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative group order-2 lg:order-1"
          >
            <div className="relative aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-[1.02] transition-transform duration-300"
                style={{ 
                  backgroundImage: `url(${BALTYK_IMAGE})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 mix-blend-overlay" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-xl lg:text-2xl font-bold mb-2 text-white">Bałtyk Business Center</h3>
                  <p className="text-base lg:text-lg text-white/90">Poznań's Modern Business Hub</p>
                  <div className="mt-3 lg:mt-4 flex flex-wrap gap-2">
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
            <div className="absolute -bottom-4 -right-4 w-24 lg:w-32 h-24 lg:h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-50 blur-2xl" />
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-block px-4 py-2 bg-white rounded-full mb-6 shadow-sm border border-gray-100">
              <span className="text-indigo-600 font-medium">About Us</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 text-gray-900">
              Empowering Businesses with AI-Driven Marketing
            </h2>
            <p className="text-base lg:text-lg text-gray-600 mb-8">
              We combine cutting-edge AI technology with proven marketing strategies to help businesses achieve exceptional growth in the digital age.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 mb-8 lg:mb-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center shadow-md border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className={`text-2xl lg:text-3xl font-bold mb-1 lg:mb-2 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    {stat.number}
                  </div>
                  <div className="text-xs lg:text-sm text-gray-600">{stat.label}</div>
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
          className="mt-12 lg:mt-20"
        >
          <div className="text-center mb-8 lg:mb-12">
            <div className="inline-block px-4 py-2 bg-white rounded-full mb-4 lg:mb-6 shadow-sm border border-gray-100">
              <span className="text-indigo-600 font-medium">Our Team</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4 text-gray-900">Expert Team at Your Service</h3>
            <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
              Our dedicated specialists work directly with you to ensure your advertising success, 
              combining proven marketing expertise with smart technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {experts.map((expert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-md border border-gray-100 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center mb-4 lg:mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 group-hover:scale-110 transition-transform">
                    <expert.icon className="w-6 h-6 lg:w-7 lg:h-7" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg lg:text-xl font-bold text-gray-900">{expert.role}</h4>
                    <p className="text-sm lg:text-base text-gray-600">
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

        <div className="mt-16 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}

export default About 