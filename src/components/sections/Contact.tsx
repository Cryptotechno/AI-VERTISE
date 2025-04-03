import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, 
  FaTelegram, FaClock,
  FaCheckCircle, FaPaperPlane, FaRobot, FaBrain, FaChartLine
} from 'react-icons/fa'
import { Button } from '../atoms/Button'
import { SOCIAL_LINKEDIN_COMPANY, SOCIAL_TELEGRAM } from '../../utils/siteConfig'

interface ContactFormData {
  email: string
  message: string
}

// AI analysis messages that will display randomly
const aiAnalysisMessages = [
  "Analyzing your request patterns...",
  "Identifying key requirements...",
  "Calculating optimal approach...",
  "Processing inquiry semantics...",
  "Determining service compatibility...",
  "Evaluating marketing potential...",
  "Assessing campaign viability...",
  "Computing ROI projections...",
  "Matching to ideal service solutions...",
  "Generating personalized response plan..."
];

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMapLoading, setIsMapLoading] = useState(true)
  const [formProgress, setFormProgress] = useState(0)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [submissionDetails, setSubmissionDetails] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisMessage, setAnalysisMessage] = useState("")
  const [analysisStep, setAnalysisStep] = useState(0)
  const [specificInsight, setSpecificInsight] = useState("")

  const contactInfo = [
    {
      icon: FaPhoneAlt,
      title: "Call Us",
      details: ["Contact us via email"],
      action: null
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: ["contact@ai-vertise.com"],
      action: "mailto:contact@ai-vertise.com"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      details: ["Bałtyk Tower", "Głogowska 40A", "60-734 Poznań, Poland"],
      action: "https://maps.app.goo.gl/QNYTr7XSbkhCGYd79"
    },
    {
      icon: FaClock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 - 17:00 CET", "Weekend: By appointment"],
      action: null
    }
  ]

  const socialLinks = [
    {
      icon: FaLinkedin,
      url: SOCIAL_LINKEDIN_COMPANY,
      label: "LinkedIn"
    },
    {
      icon: FaTelegram,
      url: SOCIAL_TELEGRAM,
      label: "Telegram"
    }
  ]

  useEffect(() => {
    // Calculate form progress
    let progress = 0;
    
    if (formData.email.trim() !== '') {
      progress += 50;
    }
    
    if (formData.message.trim() !== '') {
      progress += 50;
    }
    
    setFormProgress(progress);
  }, [formData]);

  // Generate a specific insight based on the message content
  const generateSpecificInsight = (message: string) => {
    let insight = "";
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("social") || lowerMessage.includes("facebook") || lowerMessage.includes("instagram")) {
      insight = "Your focus on social media marketing could yield 40% higher engagement with our targeted AI approach.";
    } else if (lowerMessage.includes("seo") || lowerMessage.includes("search") || lowerMessage.includes("google")) {
      insight = "Our AI analysis suggests your SEO strategy could benefit from semantic content optimization.";
    } else if (lowerMessage.includes("ads") || lowerMessage.includes("advertising") || lowerMessage.includes("campaign")) {
      insight = "Based on your campaign needs, our predictive models recommend multi-channel distribution.";
    } else if (lowerMessage.includes("budget") || lowerMessage.includes("cost") || lowerMessage.includes("price")) {
      insight = "Our ROI calculator estimates a 3.2x return on your marketing investment based on industry averages.";
    } else if (lowerMessage.includes("website") || lowerMessage.includes("web") || lowerMessage.includes("site")) {
      insight = "AI analysis of your website needs indicates potential for conversion optimization.";
    } else {
      insight = "Our initial analysis shows your request aligns with our expertise in AI-driven marketing solutions.";
    }
    
    return insight;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmissionError(null)
    setIsAnalyzing(true)
    setAnalysisStep(0)
    
    // Start the AI analysis animation sequence
    let step = 0;
    const analyzeInterval = setInterval(() => {
      if (step < 3) {
        setAnalysisMessage(aiAnalysisMessages[Math.floor(Math.random() * aiAnalysisMessages.length)]);
        setAnalysisStep(step + 1);
        step++;
      } else {
        clearInterval(analyzeInterval);
        setSpecificInsight(generateSpecificInsight(formData.message));
        
        // After the analysis is complete, submit the form
        submitForm();
      }
    }, 1200);
  }
  
  const submitForm = async () => {
    try {
      // Detect environment to use correct endpoints
      const isProd = window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1');
      
      // Google Apps Script deployed web app URL
      const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyw4zdOSI2ixCmSF8yaFsXQxyQMrFvJeen9a70Kh8djC5FC73AoEw1gtTOYuG3Yvw/exec';
      
      // Add timestamp and environment info to the formData
      const payload: Record<string, string> = {
        ...formData,
        timestamp: new Date().toISOString(),
        source: isProd ? 'production' : 'development'
      };
      
      // Log submission attempt for debugging
      console.log('Attempting to submit form data:', payload);
      
      let submissionSuccess = false;
      
      // IMPORTANT: Google Apps Script always requires no-cors mode for client-side submissions
      try {
        console.log('Trying with no-cors mode first (recommended for Google Apps Script)');
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain', // Use text/plain for no-cors mode
          },
          body: JSON.stringify(payload),
          mode: 'no-cors' // Required for Google Apps Script
        });
        
        // With no-cors, we can't read the response
        console.log('Submitted with no-cors mode (response unreadable)');
        setSubmissionDetails('Submitted with no-cors mode');
        submissionSuccess = true; // Assume success since we can't verify
      } catch (noCorsError) {
        console.error('No-cors fetch failed:', noCorsError);
        
        // Try direct XMLHttpRequest with different content type
        try {
          console.log('Trying with XMLHttpRequest and text/plain content type');
          const result = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', GOOGLE_APPS_SCRIPT_URL, true);
            xhr.setRequestHeader('Content-Type', 'text/plain'); // Use text/plain instead of application/json
            xhr.timeout = 10000; // 10 second timeout
            
            xhr.onload = function() {
              if (xhr.status === 200 || xhr.status === 0) { // Status 0 can happen with CORS
                console.log('XHR submission successful');
                setSubmissionDetails('Submission processed via XMLHttpRequest');
                resolve('success');
              } else {
                console.error('XHR submission failed with status:', xhr.status);
                setSubmissionDetails(`XHR failed with status: ${xhr.status}`);
                reject(new Error(`XHR failed with status: ${xhr.status}`));
              }
            };
            
            xhr.ontimeout = function() {
              console.error('XHR timeout');
              setSubmissionDetails('Request timed out after 10 seconds');
              reject(new Error('XHR timeout'));
            };
            
            xhr.onerror = function() {
              console.error('XHR network error');
              setSubmissionDetails('Network error with XHR');
              reject(new Error('Network error with XHR'));
            };
            
            xhr.send(JSON.stringify(payload));
          });
          
          submissionSuccess = result === 'success';
        } catch (xhrError) {
          console.error('XHR attempt failed:', xhrError);
          
          // Last resort - try an alternative approach with form submission
          try {
            console.log('Trying with form data submission approach');
            
            // Create a hidden form and submit it
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = GOOGLE_APPS_SCRIPT_URL;
            form.target = '_blank'; // This will open in a new tab but that's ok for fallback
            
            // Add all data as hidden fields
            for (const key in payload) {
              if (Object.prototype.hasOwnProperty.call(payload, key)) {
                const hiddenField = document.createElement('input');
                hiddenField.type = 'hidden';
                hiddenField.name = key;
                hiddenField.value = typeof payload[key] === 'string' 
                  ? payload[key] 
                  : JSON.stringify(payload[key]);
                form.appendChild(hiddenField);
              }
            }
            
            // Add the form to the page and submit it
            document.body.appendChild(form);
            form.submit();
            
            // Remove the form after submission
            setTimeout(() => {
              document.body.removeChild(form);
            }, 100);
            
            console.log('Fallback form submission attempted');
            setSubmissionDetails('Submitted using form fallback method');
            submissionSuccess = true;
          } catch (formError) {
            console.error('Form fallback also failed:', formError);
          }
        }
      }
      
      // Only show success if we actually succeeded
      if (submissionSuccess) {
        // Complete the analysis and show success message
        setTimeout(() => {
          setIsAnalyzing(false);
          setIsSubmitted(true);
          
          // Reset form after 5 seconds
          setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
              email: '',
              message: ''
            });
          }, 5000);
        }, 1000);
      } else {
        // If we get here, all submission attempts failed
        throw new Error('All submission methods failed');
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsAnalyzing(false);
      setSubmissionError('Failed to submit form. Please try again later or contact us directly at contact@ai-vertise.com');
    } finally {
      setIsSubmitting(false);
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
                    <p className="text-sm lg:text-base text-gray-600">
                      Contact us via email
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600">
                    <FaEnvelope className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm lg:text-base font-semibold text-gray-900">Email Us</h3>
                    <a href="mailto:contact@ai-vertise.com" className="text-sm lg:text-base text-indigo-600 hover:text-indigo-700 transition-colors">
                      contact@ai-vertise.com
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
                    rel="me noopener noreferrer"
                    aria-label={`Visit our ${link.label} page`}
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
                <span id="form-progress-label">Form Progress</span>
                <span aria-live="polite" aria-atomic="true">{formProgress}% Complete</span>
              </div>
              <div 
                className="w-full h-2 bg-gray-100 rounded-full overflow-hidden" 
                role="progressbar" 
                aria-labelledby="form-progress-label"
                aria-valuenow={formProgress} 
                aria-valuemin={0} 
                aria-valuemax={100}
              >
                <div 
                  className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${formProgress}%` }}
                />
              </div>
              {formProgress >= 50 && (
                <div className="text-xs text-indigo-600 mt-1 text-right animate-pulse" aria-live="polite">
                  Let's proceed! Fill in the remaining details.
                </div>
              )}
            </div>
            
            <div className="relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email or Phone Number
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Your email or phone number"
                    required
                    disabled={isAnalyzing || isSubmitted}
                    aria-required="true"
                    aria-invalid={formData.email ? !validateContact(formData.email) : false}
                  />
                  {formData.email && !validateContact(formData.email) && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      Please enter a valid email or phone number
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="How can we help you?"
                    required
                    disabled={isAnalyzing || isSubmitted}
                    aria-required="true"
                  ></textarea>
                </div>

                <div className="flex justify-end mt-8">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={!formData.email || !formData.message || !validateContact(formData.email) || isSubmitting}
                    className={`w-full sm:w-auto ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                    aria-busy={isSubmitting}
                    aria-disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <FaPaperPlane className="mr-2" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </div>
                
                {/* AI Analysis Animation */}
                <AnimatePresence>
                  {isAnalyzing && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-lg"
                    >
                      <div className="flex items-center mb-3">
                        <div className="mr-3 p-2 bg-indigo-100 rounded-full">
                          {analysisStep <= 1 ? (
                            <FaRobot className="w-5 h-5 text-indigo-600" />
                          ) : analysisStep === 2 ? (
                            <FaBrain className="w-5 h-5 text-indigo-600" />
                          ) : (
                            <FaChartLine className="w-5 h-5 text-indigo-600" />
                          )}
                        </div>
                        <h4 className="font-medium text-indigo-800">AI Analysis</h4>
                      </div>
                      
                      <div className="space-y-2">
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="flex items-center"
                          aria-live="polite"
                        >
                          <div className="mr-2 w-2 h-2 bg-indigo-600 rounded-full"></div>
                          <p className="text-indigo-700">{analysisMessage}</p>
                        </motion.div>
                        
                        {analysisStep >= 3 && specificInsight && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 p-3 bg-white rounded-lg border border-indigo-200"
                            aria-live="polite"
                          >
                            <p className="text-gray-800 font-medium">
                              {specificInsight}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {isSubmitted && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg" role="alert" aria-live="assertive">
                    <div className="flex items-center">
                      <FaCheckCircle className="text-green-500 w-5 h-5 mr-2" />
                      <p className="text-green-700 font-medium">
                        Message sent successfully!
                      </p>
                    </div>
                    <p className="text-green-600 mt-2">
                      Thank you for reaching out. We've received your message and will get back to you shortly.
                    </p>
                  </div>
                )}
                
                {submissionError && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg" role="alert" aria-live="assertive">
                    <p className="text-red-700 font-medium">
                      {submissionError}
                    </p>
                    {submissionDetails && (
                      <p className="text-red-600 text-sm mt-2">
                        Technical details: {submissionDetails}
                      </p>
                    )}
                    <p className="text-red-600 text-sm mt-2">
                      Please try again or contact us directly at <a href="mailto:contact@ai-vertise.com" className="underline">contact@ai-vertise.com</a>
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