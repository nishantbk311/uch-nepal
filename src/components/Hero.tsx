
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  onExplore?: () => void;
}

const HERO_SLIDES = [
  {
    background: "/images/home/slide1/bamboo.jpg",
    accents: [
      "/images/home/slide1/01.jpeg",
      "/images/home/slide1/02.jpeg",
      "/images/home/slide1/03.jpeg",
    ],
    title: "Bamboo",
    description: "Sustainable cellulose fibers meticulously extracted and woven with the soul of the Himalayas. Discover the softest touch of nature."
  },
  {
    background: "/images/home/slide2/hemp.jfif",
    accents: [
      "/images/home/slide2/01.jpeg",
      "/images/home/slide2/02.jpeg",
      "/images/home/slide2/03.jpeg",
    ],
    title: "Hemp",
    description: "Each thread is a testament to generations of Himalayan wisdom. Hand-crafted textiles that bridge tradition and contemporary luxury."
  },
  {
    background: "/images/home/slide3/buddha.avif",
    accents: [
      "/images/home/slide3/01.jpeg",
      "/images/home/slide3/02.jpeg",
      "/images/home/slide3/03.jpeg",
    ],
    title: "Buddha",
    description: "Handcrafted Buddha Statue – A Symbol of Peace & Mindfulness."
  }
];

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background with seamless cross-fade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.img 
            key={slide.background}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            src={slide.background} 
            alt="Artisanal Heritage" 
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] saturate-[0.8]"
          />
        </AnimatePresence>
      </div>

      {/* Aesthetic Circle Accents */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-80 scale-75 md:scale-100">
        <div className="relative w-[500px] h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={`accents-${current}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-white/20 overflow-hidden shadow-2xl">
                <img src={slide.accents[0]} alt="Yarn 1" className="w-full h-full object-cover" />
              </div>
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-56 h-56 rounded-full border-2 border-white/40 overflow-hidden shadow-2xl z-20">
                <img src={slide.accents[1]} alt="Yarn 2" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-white/20 overflow-hidden shadow-2xl">
                <img src={slide.accents[2]} alt="Yarn 3" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-20 text-center text-white px-6 w-full max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <h1 className="text-7xl md:text-9xl mb-4 italic tracking-tighter drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="max-w-xl mx-auto text-lg md:text-xl font-light opacity-90 leading-relaxed mb-10 text-white/80">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
        
        <Link 
          to="/collections"
          className="group relative inline-block px-10 py-4 overflow-hidden"
        >
          <div className="absolute inset-0 gold-gradient transition-transform group-hover:scale-105"></div>
          <span className="relative z-10 text-black font-bold tracking-widest text-sm uppercase">EXPLORE COLLECTIONS</span>
        </Link>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/30"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"></path></svg>
      </div>
    </section>
  );
};

export default Hero;
