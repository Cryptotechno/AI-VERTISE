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
                This simplified Privacy Policy explains how we handle your information when you use our contact form.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
              <p>We only collect information that you voluntarily provide via our contact form:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Contact Information:</strong> Your email address, phone number, and any other details you provide in your message.
                </li>
              </ul>
              <p>
                Currently, we do not use cookies for tracking or analytics purposes. However, we plan to implement 
                Google Analytics in the future for marketing and website improvement purposes. When implemented, Google 
                Analytics will collect standard internet log information and visitor behavior information in an anonymous form.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
              <p>We use the information you provide solely to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Respond to your inquiries</li>
                <li>Provide the services you request</li>
                <li>Communicate with you about your inquiry</li>
                <li>In the future, analyze website usage to improve our services (through Google Analytics)</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">4. Legal Basis for Processing</h2>
              <p>
                Under the General Data Protection Regulation (GDPR), the legal basis for processing your personal data is:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Legitimate Interest:</strong> To respond to your inquiries and provide requested information</li>
                <li><strong>Consent:</strong> When you voluntarily submit your information through our contact form</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Retention</h2>
              <p>
                We retain your contact information only for as long as necessary to respond to your inquiry and 
                any follow-up questions. We do not store your data for marketing purposes.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Rights Under GDPR</h2>
              <p>As a data subject in the European Union, you have the following rights:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>The right to access your personal data</li>
                <li>The right to rectification of inaccurate data</li>
                <li>The right to erasure of your data ("right to be forgotten")</li>
                <li>The right to restrict processing of your data</li>
                <li>The right to data portability</li>
                <li>The right to object to processing</li>
                <li>Rights related to automated decision making and profiling</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the information below.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">7. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information. 
                Your contact form submissions are securely stored and accessible only to authorized personnel who need 
                the information to respond to your inquiry.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">8. International Transfers</h2>
              <p>
                We do not transfer your personal data outside the European Economic Area (EEA) unless necessary 
                to respond to your specific inquiry, and only with appropriate safeguards in place.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy occasionally. Any changes will be posted on this page.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or wish to exercise your GDPR rights, please contact us at:
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