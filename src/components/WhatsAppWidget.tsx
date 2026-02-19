
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppWidget: React.FC = () => {
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [isPopupDismissed, setIsPopupDismissed] = useState(false);
  const [shouldBounce, setShouldBounce] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isPopupDismissed) {
        setShouldBounce(false);
        setShowWhatsAppPopup(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [isPopupDismissed]);

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end">
      <AnimatePresence>
        {showWhatsAppPopup && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative mb-4 mr-2 bg-white border border-[#d4af37]/30 p-5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] max-w-[240px]"
          >
            <button 
              onClick={() => { setShowWhatsAppPopup(false); setIsPopupDismissed(true); }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-black transition-colors shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <p className="text-[11px] leading-relaxed text-gray-800 font-medium">
              <span className="text-[#d4af37] font-bold block mb-1">NAMASTE!</span>
              Have a question about our Himalayan fibers? Chat with our experts.
            </p>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-[#d4af37]/30 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="relative"
        animate={shouldBounce ? { y: [0, -12, 0] } : { y: 0 }}
        transition={shouldBounce ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.5 }}
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 gold-gradient rounded-full blur-md"
        ></motion.div>

        <a 
          href="https://wa.me/9779851108418" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative w-16 h-16 gold-gradient rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-10 border-2 border-white/50 group shadow-lg"
          title="Contact us on WhatsApp"
          onClick={() => {
            setShouldBounce(false);
            setIsPopupDismissed(true);
            setShowWhatsAppPopup(false);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor" className="text-black group-hover:rotate-12 transition-transform">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </motion.div>
    </div>
  );
};

export default WhatsAppWidget;
