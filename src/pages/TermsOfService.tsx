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
                Welcome to AI VERTISE. By accessing and using our website, you agree to be bound by these Terms of 
                Service, our Privacy Policy, and any other guidelines or rules applicable to specific services we offer.
                If you do not agree with any of these terms, you are prohibited from using this website.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">2. Description of Services</h2>
              <p>
                AI VERTISE provides digital marketing and advertising services using AI technology, including but not 
                limited to paid social media advertising, programmatic advertising, search engine marketing, and marketing 
                consulting services. The specifics of these services will be detailed in individual agreements with clients.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">3. Use of Website</h2>
              <p>You agree to use our website only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use of the website. Prohibited uses include:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Any fraudulent or illegal activity</li>
                <li>Unauthorized collection of user information</li>
                <li>Transmitting malicious software</li>
                <li>Interfering with the proper functioning of the website</li>
                <li>Creating multiple accounts for malicious purposes</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">4. Intellectual Property</h2>
              <p>
                The content on our website, including but not limited to text, graphics, logos, images, software, and 
                code, is the property of AI VERTISE and is protected by copyright and other intellectual property laws. 
                You may not reproduce, distribute, modify, or create derivative works from any content without our 
                express written permission.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">5. User Content</h2>
              <p>
                By submitting information through our contact form or other interactive features, you grant AI VERTISE a 
                non-exclusive, worldwide, royalty-free license to use, reproduce, and process that information for the 
                purpose of providing our services to you.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, AI VERTISE shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages arising out of or related to your use of our website or 
                services. This includes but is not limited to loss of revenue, profits, or data.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">7. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless AI VERTISE, its officers, directors, employees, and 
                agents from any claims, liabilities, damages, losses, or expenses arising out of your breach of these 
                Terms of Service or your use of our website.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">8. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of Poland, without 
                regard to its conflict of law provisions. Any legal action or proceeding related to this website shall be 
                brought exclusively in the courts of Poznań, Poland.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately 
                upon posting on our website. Your continued use of the website after any such changes constitutes your 
                acceptance of the new Terms of Service.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Information</h2>
              <p>
                If you have any questions or concerns about these Terms of Service, please contact us at:
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