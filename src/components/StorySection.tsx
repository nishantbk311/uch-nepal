
import React from 'react';
import { motion } from 'framer-motion';

interface StorySectionProps {
  fullView?: boolean;
}

const StorySection: React.FC<StorySectionProps> = ({ fullView }) => {
  if (!fullView) {
    // Compact version for Home Page
    return (
      <section className="bg-[#1a1a1a] text-white py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800" 
                alt="Artisan at work" 
                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700 rounded-sm"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-2/3 aspect-square gold-gradient z-0 opacity-10 blur-3xl rounded-full"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm uppercase tracking-[0.3em] text-[#d4af37] font-bold">The Heritage</span>
            <h2 className="text-4xl md:text-5xl mt-4 mb-8 serif italic leading-tight">From Gobindas Handicraft to ZNPAL</h2>
            <div className="space-y-6 text-gray-400 leading-relaxed font-light text-lg">
              <p>
                Established on January 07, 2013 (Poush 23, 2069 B.S.), Gobindas Handicraft has been a beacon of cultural heritage, showcasing the finest creations of Nepal's skilled artisans.
              </p>
              <p>
                Our journey is one of passion, dedication, and a deep-rooted love for the rich tapestry of Nepalese culture. Every piece tells a story of craftsmanship honed over generations.
              </p>
            </div>
            <button className="mt-10 group flex items-center space-x-4 text-xs tracking-[0.3em] font-black uppercase text-[#d4af37]">
              <span>Learn our Full Story</span>
              <div className="w-12 h-[1px] bg-[#d4af37] transition-all group-hover:w-20"></div>
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  // Full Page Story View
  return (
    <div className="bg-[#faf9f6]">
      {/* Hero Header */}
      <section className="bg-[#1a1a1a] relative h-[60vh] flex items-center justify-center overflow-hidden -mt-20">
        <img 
          src="https://images.unsplash.com/photo-1518005020250-6859b28c6981?q=80&w=1920" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.3]"
          alt="Himalayan Mountains"
        />
        <div className="relative z-10 text-center text-white px-6 ">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.5em] text-[#d4af37] font-bold mb-6 block"
          >
            Namaste & Welcome
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl serif italic"
          >
            Our Sacred Journey
          </motion.h1>
        </div>
      </section>

      {/* Main Narrative - Redesigned to follow 2x3 grid layout */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24 items-center">
          
          {/* Row 1 Left: Text (Title & Intro) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-bold">Est. 2013</span>
            <h2 className="text-4xl md:text-5xl serif leading-tight text-black">
              Gobindas Handicraft: <br/>
              <span className="italic text-gray-400">The Soul of the Himalayas</span>
            </h2>
            <div className="w-16 h-1 bg-[#d4af37] mb-6"></div>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              Welcome to a treasure trove of authentic Nepalese craftsmanship. Since 2013, we have embarked on a mission to preserve and promote the artistry that defines our nation's identity.
            </p>
          </motion.div>

          {/* Row 1 Right: Text (Paragraph 1) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 font-light leading-relaxed text-lg pt-2"
          >
            <p>
              At Gobindas Handicraft, every piece tells a story — a story of craftsmanship honed over generations, of intricate detailing infused with symbolism, and of the vibrant spirit that animates Nepalese art. From hand-carved wooden figurines to exquisite metalwork and our signature textiles, our collection is a testament to the enduring legacy of Nepal's artisanal heritage.
            </p>
          </motion.div>

          {/* Row 2 Left: Image (Textile weaving) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border border-gray-100"
          >
            <img 
              src="images/story/Handicraft.jpeg" 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" 
              alt="Artisanal Textile Weaving" 
            />
          </motion.div>

          {/* Row 2 Right: Text (Sustainability) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 font-light leading-relaxed text-lg"
          >
            <p>
              We take great pride in our commitment to sustainability and ethical sourcing practices. By working directly with local artisans and supporting fair trade principles, we not only ensure the highest quality standards but also contribute to the socio-economic development of communities across Nepal.
            </p>
          </motion.div>

          {/* Row 3 Left: Text (Quote) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 border-l-4 border-[#d4af37] shadow-sm italic"
          >
            <p className="text-2xl text-black font-serif font-light leading-relaxed">
              "Beyond being a marketplace, we are a platform for cultural exchange and appreciation. We invite you to immerse yourself in the sights, sounds, and textures of Nepal."
            </p>
          </motion.div>

          {/* Row 3 Right: Image (Handicraft detail) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border border-gray-100"
          >
            <img 
              src="images/story/Shawl.jpeg" 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" 
              alt="Himalayan Artisanal Detail" 
            />
          </motion.div>

        </div>
      </section>

      {/* Salient Features Section */}
      <section className="bg-white py-32 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-xs uppercase tracking-[0.4em] text-gray-400 font-bold">Distinction</span>
            <h2 className="text-4xl md:text-5xl mt-2 serif">Salient Features</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: "Authentic Items", desc: "Meticulously crafted by skilled Himalayan artisans reflecting rich cultural heritage.", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
              { title: "Premium Quality", desc: "Each item is crafted with precision and care, ensuring high-quality standards.", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
              { title: "Global Reach", desc: "Benefit from our courier facility, ensuring prompt and reliable delivery worldwide.", icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6" },
              { title: "Strategic Outlets", desc: "Find us in major hotels across Lumbini region including Gautam Buddha Int'l Airport.", icon: "M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21v-4a3 3 0 0 1 6 0v4" }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-[#faf9f6] p-10 shadow-sm border border-gray-100 group transition-all"
              >
                <div className="w-12 h-12 gold-gradient rounded-full mb-8 flex items-center justify-center text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={feature.icon}></path></svg>
                </div>
                <h3 className="text-lg font-bold tracking-widest uppercase mb-4 text-black">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sister Venture Section - Removed image, centered text */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-bold">Sister Venture</span>
          <h2 className="text-4xl md:text-5xl mt-4 mb-8 serif">Peace Lumbini Tours <br/>& Travels</h2>
          <div className="w-16 h-1 bg-[#d4af37] mb-10 mx-auto"></div>
          <p className="text-gray-600 leading-relaxed font-light text-lg mb-8">
            In addition to our passion for handicrafts, we are delighted to introduce Peace Lumbini Tours and Travels Pvt. Ltd. Company. 
          </p>
          <p className="text-gray-600 leading-relaxed font-light text-lg mb-10">
            Dedicated to showcasing the breathtaking beauty and cultural splendor of Nepal, this sister venture allows our patrons to explore the landscapes where our artisans draw their inspiration. Experience the magic where tradition meets innovation.
          </p>
          <button className="px-12 py-4 bg-black text-white text-[10px] font-black tracking-[0.3em] uppercase hover:bg-[#d4af37] transition-all shadow-xl">
            Explore Travels
          </button>
        </motion.div>
      </section>

      {/* Global Outlets List - Sit directly flush against footer */}
      <section className="bg-black text-white py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37] font-bold block mb-6"
          >
            Our Presence
          </motion.span>
          <h3 className="text-3xl md:text-4xl serif italic text-white mb-12">Physical Showrooms & Outlets</h3>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 max-w-5xl mx-auto">
            {[
              'Lumbini Souvenir Complex', 
              'Hotel Hokke, Lumbini', 
              'Gautam Buddha International Airport', 
              'Hotel Siddhartha Vilasha', 
              'Hotel Bodhi Redsun'
            ].map((outlet, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center space-x-4 group cursor-default"
              >
                <div className="w-1.5 h-1.5 rounded-full gold-gradient group-hover:scale-150 transition-transform duration-300"></div>
                <span className="text-xs tracking-[0.2em] font-medium uppercase text-gray-400 group-hover:text-white transition-colors">{outlet}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StorySection;
