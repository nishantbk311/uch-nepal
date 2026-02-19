import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-[#faf9f6] min-h-screen py-24 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white border border-gray-100 shadow-xl p-8 md:p-16 rounded-sm"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl serif italic text-black mb-6">Privacy Policy</h1>
          <div className="w-24 h-[1px] bg-[#d4af37] mx-auto"></div>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-medium text-[#3182ce] mb-6 tracking-tight">
              Data Protection Our First Priority!
            </h2>
            <div className="text-gray-600 leading-relaxed font-light text-lg space-y-6">
              <p>
                Universal Cashmere House (UCH Nepal) ensures that the personal data of the customers are not shared with anyone unless required for delivery of the products. UCH Nepal can, however, use the email addresses to share the customers about new arrivals, news and any other information associated with business. Our email is <a href="mailto:info@uchnepal.com" className="text-black font-semibold hover:text-[#d4af37] transition-colors">info@uchnepal.com</a>.
              </p>
              <p>
                The details of the card are encrypted and our payment gateway system is solely handled by reputed bank of Nepal i.e. <span className="text-black font-medium">NIC Asia Bank Ltd</span>, which has secured entry system recognized globally.
              </p>
              <p>
                UCH Nepal complies with any charge if found guilty of disobeying Laws and Regulations of Nepal Government, and posing threat to client physically or financially.
              </p>
            </div>
          </section>
        </div>

      
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;