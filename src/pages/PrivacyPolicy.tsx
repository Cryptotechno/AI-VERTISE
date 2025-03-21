import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <PageTransition>
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-8 md:p-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700">Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
              <p>
                At AI VERTISE, we respect your privacy and are committed to protecting your personal data. 
                This Privacy Policy explains how we collect, use, and safeguard your information when you visit our 
                website or use our services.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
              <p>We collect the following types of information:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Personal Information:</strong> When you fill out our contact form, we collect your email 
                  address, phone number, and any other information you provide in your message.
                </li>
                <li>
                  <strong>Usage Data:</strong> We automatically collect information about how you interact with our 
                  website through cookies and similar technologies. This includes your IP address, browser type, pages 
                  visited, and time spent on the site.
                </li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our website and services</li>
                <li>Send you marketing communications with your consent</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">4. Cookies</h2>
              <p>
                Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on 
                your device that help us analyze website traffic and customize content to your preferences. You can 
                control cookies through your browser settings, but disabling them may affect some functionality of our site.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">5. Google Analytics</h2>
              <p>
                We use Google Analytics to analyze website performance and user behavior. Google Analytics collects 
                information using cookies, which is processed and stored on Google's servers. We've configured our 
                Google Analytics implementation to anonymize IP addresses and respect Do Not Track settings.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">6. Data Storage and Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of internet transmission 
                is 100% secure, and we cannot guarantee absolute security.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">7. Your Rights</h2>
              <p>Under applicable data protection laws, you have the right to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request restriction of processing</li>
                <li>Request transfer of your data</li>
                <li>Withdraw consent</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy 
                practices or content of these sites. We encourage you to read the privacy policies of any third-party 
                sites you visit.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page, and if 
                significant changes are made, we will notify you through a prominent notice on our website or via email.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p>
                Email: natalymakota@gmail.com<br />
                Phone: +48 503 589 781
              </p>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    </div>
  );
};

export default PrivacyPolicy; 