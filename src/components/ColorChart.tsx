import React from 'react';
import { motion } from 'framer-motion';

const chartImages = [
  'images/colorChart/Chart201.jpeg', 
  'images/colorChart/Chart202.jpeg', 
  'images/colorChart/Chart203.jpeg', 
  'images/colorChart/Chart204.jpeg', 
  'images/colorChart/Chart205.jpeg', 
  'images/colorChart/Chart206.jpeg', 
  'images/colorChart/Chart207.jpeg', 
  'images/colorChart/Chart208.jpeg', 
  'images/colorChart/Chart209.jpeg', 
  'images/colorChart/Chart2010.jpeg', 
  'images/colorChart/Chart2011.jpeg', 
  'images/colorChart/Chart2012.jpeg', 
  'images/colorChart/Chart2013.jpeg', 
  'images/colorChart/Chart2014.jpeg', 
  'images/colorChart/Chart2015.jpeg', 
  'images/colorChart/Chart2016.jpeg', 
  'images/colorChart/Chart2017.jpeg'  
];
const ColorChart: React.FC = () => {

  return (
    <div className="bg-[#faf9f6] min-h-screen">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl serif italic text-black mb-10 uppercase tracking-widest"
        >
          Color Chart
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-gray-600 leading-relaxed font-light text-base md:text-lg mb-8">
            Our handmade products are individually colored so they may look different up to ten percent. 
            We use <span className="text-black font-semibold">SWISS dye</span>, which represents a good quality 
            and is environment friendly at the same time. Besides plain coloring, we are well equipped with 
            resources and technology for print, shade, tie-dye and vegetable dye can be done upon the request. 
            You can select color from the chart provided in the first order which is free.
          </p>
        </motion.div>
      </section>

      {/* Charts Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-32 space-y-12">
        {chartImages.map((imgId, idx) => (
          <motion.div 
            key={imgId}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="group"
          >
            {/* Chart Image Container - Strictly maintaining 4:1 aspect ratio as requested */}
            <div className="relative border border-gray-200 bg-white overflow-hidden shadow-xl rounded-sm">
              <div className=" w-full relative">
                <img 
                  src={imgId} 
                  alt={`Color Chart Section ${idx + 1}`}
                  className="w-full h-full object-contain filter brightness-[1.05] contrast-[1.02]"
                />
                
                
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Custom Request CTA */}
      <section className="bg-[#1a1a1a] text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl serif italic mb-6">Need a custom shade?</h2>
          <p className="text-gray-400 font-light mb-10 tracking-wide leading-relaxed">
            We are equipped with the latest technology for custom print, shade, tie-dye, and vegetable dyeing. 
            All processes utilize eco-friendly materials and practices.
          </p>
          <button className="px-10 py-4 gold-gradient text-black text-[10px] font-black tracking-[0.4em] uppercase hover:scale-105 transition-all shadow-xl">
            Request Custom Dyeing
          </button>
        </div>
      </section>
    </div>
  );
};

export default ColorChart;