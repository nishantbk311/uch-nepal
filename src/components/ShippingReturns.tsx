import React from 'react';
import { motion } from 'framer-motion';

const ShippingReturns: React.FC = () => {
  return (
    <div className="bg-[#faf9f6] min-h-screen py-24 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white border border-gray-100 shadow-xl p-8 md:p-16 rounded-sm"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl serif italic text-black mb-6">Return Policy</h1>
          <div className="w-24 h-[1px] bg-[#d4af37] mx-auto"></div>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-medium text-[#3182ce] mb-6 tracking-tight">
              We Strive For Quality Assurance!
            </h2>
            <div className="text-gray-600 leading-relaxed font-light text-lg space-y-6">
              <p>
                Universal Cashmere House (UCH Nepal) ensures that all the products are of the best quality and demonstrate excellence. From production to delivery, we look into the details with great scrutiny so that there won't be any complaint in terms of quality.
              </p>
              <p>
                Since all of our products are handmade from processing, coloring to finish, so please consider us three-ten percent of allowances for colors & sizes.
              </p>
              <p>
                Otherwise, if unused and pieces are received damaged, do kindly email us at <a href="mailto:info@uchnepal.com" className="text-black font-semibold hover:text-[#d4af37] transition-colors">info@uchnepal.com</a> or WhatsApp at <span className="text-black font-semibold">+977 9847694037</span> with the issue. A short description of the issue with a picture will be appreciated.
              </p>
              <p className="bg-[#fef9c3]/30 p-6 border-l-4 border-[#d4af37] text-gray-800 font-medium italic">
                And please make sure to do it within 7 days of receiving the parcel, after that we consider it as a sold and will not be entertained. We fully assure you of the soonest replacement or refund.
              </p>
            </div>
          </section>
        </div>

        
      </motion.div>
    </div>
  );
};

export default ShippingReturns;