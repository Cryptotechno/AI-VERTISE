import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';

const TermsOfService: React.FC = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700">Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                Welcome to AI VERTISE. By accessing and using our website, you agree to be bound by these simplified Terms of 
                Service and our Privacy Policy. If you do not agree with any of these terms, please do not use this website.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">2. Services Overview</h2>
              <p>
                AI VERTISE provides digital marketing and advertising services using AI technology. We offer our services 
                directly to clients based on individual agreements and consultations.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">3. Website Use</h2>
              <p>You agree to use our website only for lawful purposes. Prohibited uses include:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Any fraudulent or illegal activity</li>
                <li>Attempting to interfere with the website's operation</li>
                <li>Using the website in any way that could damage or impair its functionality</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">4. Contact Form Submissions</h2>
              <p>
                When you submit information through our contact form, you consent to us using that information to respond 
                to your inquiry. We do not collect any personal data beyond what you voluntarily provide in the contact form.
                We will not use your contact information for marketing purposes without your explicit consent.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
              <p>
                All content on our website, including text, graphics, logos, and images, is the property of AI VERTISE 
                and protected by intellectual property laws. You may not reproduce or distribute any content from our 
                website without our express permission.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
              <p>
                To the extent permitted by law, AI VERTISE shall not be liable for any indirect, incidental, or 
                consequential damages arising from your use of our website or services.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">7. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of Poland. 
                Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts 
                in Poznań, Poland.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">8. GDPR Compliance</h2>
              <p>
                We comply with the General Data Protection Regulation (GDPR) regarding any personal data we collect. 
                Please refer to our Privacy Policy for details on how we handle your personal information and your rights 
                under GDPR.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be effective upon posting 
                to the website. Your continued use of the website after any changes signifies your acceptance of the modified terms.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
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

export default TermsOfService; 