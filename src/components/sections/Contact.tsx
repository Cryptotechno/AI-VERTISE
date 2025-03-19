import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, 
  FaFacebookSquare, FaInstagram, FaWhatsapp, FaClock,
  FaCheckCircle, FaPaperPlane
} from 'react-icons/fa'

interface ContactFormData {
  contact: string
  message: string
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    contact: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMapLoading, setIsMapLoading] = useState(true)
  const [formProgress, setFormProgress] = useState(0)

  const contactInfo = [
    {
      icon: FaPhoneAlt,
      title: "Call Us",
      details: ["+48 503 589 781"],
      action: "tel:+48503589781"
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: ["natalymakota@gmail.com"],
      action: "mailto:natalymakota@gmail.com"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      details: ["Bałtyk Tower", "Głogowska 40A", "60-734 Poznań, Poland"],
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
      url: "https://wa.me/48503589781",
      label: "WhatsApp"
    }
  ]

  useEffect(() => {
    // Calculate form progress
    let progress = 0;
    
    if (formData.contact.trim() !== '') {
      progress += 50;
    }
    
    if (formData.message.trim() !== '') {
      progress += 50;
    }
    
    setFormProgress(progress);
  }, [formData]);

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
          contact: '',
          message: ''
        })
      }, 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const validateContact = (value: string) => {
    // Accept either email or phone format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\+?[0-9\s()-]{8,}$/
    
    return emailRegex.test(value) || phoneRegex.test(value)
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto mb-12 lg:mb-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 lg:space-y-6"
          >
            <div className="bg-white rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-md border border-gray-100">
              <div className="space-y-4 lg:space-y-6">
                {/* Phone */}
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600">
                    <FaPhoneAlt className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm lg:text-base font-semibold text-gray-900">Call Us</h3>
                    <a href="tel:+48503589781" className="text-sm lg:text-base text-indigo-600 hover:text-indigo-700 transition-colors">
                      +48 503 589 781
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600">
                    <FaEnvelope className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm lg:text-base font-semibold text-gray-900">Email Us</h3>
                    <a href="mailto:natalymakota@gmail.com" className="text-sm lg:text-base text-indigo-600 hover:text-indigo-700 transition-colors">
                      natalymakota@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600">
                    <FaMapMarkerAlt className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm lg:text-base font-semibold text-gray-900">Visit Us</h3>
                    <p className="text-sm lg:text-base text-gray-600">
                      Bałtyk Tower<br />
                      Głogowska 40A<br />
                      60-734 Poznań, Poland
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-md border border-gray-100">
              <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 hover:from-indigo-100 hover:to-purple-100 transition-all duration-300"
                  >
                    <link.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-md border border-gray-100"
          >
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Form Progress</span>
                <span>{formProgress}% Complete</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${formProgress}%` }}
                />
              </div>
              {formProgress >= 50 && (
                <div className="text-xs text-indigo-600 mt-1 text-right animate-pulse">
                  Let's proceed! Fill in the remaining details.
                </div>
              )}
            </div>
            
            <div className="relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Your email or phone number"
                    required
                  />
                </div>
                
                <div>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted || !validateContact(formData.contact)}
                  className={`w-full py-4 px-6 text-white rounded-lg font-medium flex items-center justify-center transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-lg
                    ${formProgress === 100 ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <FaCheckCircle className="mr-2" />
                      Sent Successfully!
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
                
                {isSubmitted && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                    <p className="text-green-700">
                      Thanks for your message! We'll get back to you soon.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
        
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="w-full rounded-xl lg:rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white aspect-video">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setIsMapLoading(false)}
              title="AI Vertise Office Location"
            ></iframe>
            {isMapLoading && (
              <div className="w-full h-full bg-gray-100 animate-pulse"></div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact 