import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, 
  FaFacebookSquare, FaInstagram, FaWhatsapp, FaClock,
  FaCheckCircle
} from 'react-icons/fa'

interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  budget: string
  message: string
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMapLoading, setIsMapLoading] = useState(true)

  const contactInfo = [
    {
      icon: FaPhoneAlt,
      title: "Call Us",
      details: ["+48 123 456 789"],
      action: "tel:+48123456789"
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: ["contact@aivertise.pl"],
      action: "mailto:contact@aivertise.pl"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      details: ["Bałtyk Tower", "Poznań, Poland"],
      action: "https://goo.gl/maps/your-location"
    },
    {
      icon: FaClock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 - 17:00", "Weekend: By appointment"],
      action: null
    }
  ]

  const socialLinks = [
    {
      icon: FaLinkedin,
      url: "https://linkedin.com/company/aivertise",
      label: "LinkedIn"
    },
    {
      icon: FaFacebookSquare,
      url: "https://facebook.com/aivertise",
      label: "Facebook"
    },
    {
      icon: FaInstagram,
      url: "https://instagram.com/aivertise",
      label: "Instagram"
    },
    {
      icon: FaWhatsapp,
      url: "https://wa.me/48123456789",
      label: "WhatsApp"
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Form submitted:', formData)
      setIsSubmitted(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          budget: '',
          message: ''
        })
      }, 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2433.8006646862307!2d16.90663857677015!3d52.40362497209754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47045b3b1e4cd855%3A0x7fb3e39084fa64e8!2sBa%C5%82tyk%20Tower!5e0!3m2!1sen!2spl!4v1710612433445!5m2!1sen!2spl"

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
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
              <span className="text-indigo-600 font-medium">Contact Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-800 bg-clip-text text-transparent">
              Let's Start Your Digital Growth
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Ready to transform your advertising strategy? We're here to help you achieve 
              exceptional results with AI-powered solutions.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600">
                    <FaPhoneAlt className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Call Us</h3>
                    <a href="tel:+48123456789" className="text-base text-indigo-600 hover:text-indigo-700 transition-colors">
                      +48 123 456 789
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600">
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Email Us</h3>
                    <a href="mailto:contact@aivertise.pl" className="text-base text-indigo-600 hover:text-indigo-700 transition-colors">
                      contact@aivertise.pl
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600">
                    <FaMapMarkerAlt className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Visit Us</h3>
                    <p className="text-base text-gray-600">Bałtyk Tower</p>
                    <p className="text-base text-gray-600">Poznań, Poland</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600">
                    <FaClock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-base text-gray-600">Mon - Fri: 9:00 - 17:00</p>
                    <p className="text-sm text-gray-500">Weekend: By appointment</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Connect With Us</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 hover:scale-110 transition-transform"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="+48 123 456 789"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Advertising Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select budget range</option>
                    <option value="1000-3000">1,000 - 3,000 PLN</option>
                    <option value="3000-5000">3,000 - 5,000 PLN</option>
                    <option value="5000-10000">5,000 - 10,000 PLN</option>
                    <option value="10000+">10,000+ PLN</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    How Can We Help?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Tell us about your goals and challenges..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 text-white font-medium bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl 
                    hover:shadow-lg transition-all focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                    disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {/* Success Message */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center space-x-2 text-green-600"
                  >
                    <FaCheckCircle className="w-5 h-5" />
                    <span>Thank you! We'll get back to you soon.</span>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-xl border border-gray-100"
        >
          {/* Loading Skeleton */}
          {isMapLoading && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center z-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading map...</p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none z-10" />
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title="Bałtyk Tower Location"
            onLoad={() => setIsMapLoading(false)}
          />
          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg z-20 max-w-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Bałtyk Tower</h3>
            <p className="text-gray-600 text-sm mb-2">
              Głogowska 40A, 60-734 Poznań, Poland
            </p>
            <a
              href="https://goo.gl/maps/your-location"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              <FaMapMarkerAlt className="w-4 h-4 mr-1" />
              Get Directions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact 