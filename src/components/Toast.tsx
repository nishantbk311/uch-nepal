
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  show: boolean;
  message: string;
}

const Toast: React.FC<ToastProps> = ({ show, message }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0, y: 40, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%', scale: 0.95 }}
          className="fixed bottom-8 md:bottom-12 left-1/2 z-[100] w-[calc(100%-48px)] md:w-auto md:min-w-[420px] max-w-lg bg-black text-white p-4 md:px-8 md:py-5 shadow-[0_30px_60px_rgba(0,0,0,0.4)] rounded-sm flex items-center space-x-5 border border-white/10 overflow-hidden"
        >
          {/* Accent border on the left for a premium touch */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] gold-gradient" />
          
          {/* Status Icon with animation */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
            className="shrink-0 w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center shadow-lg shadow-[#d4af37]/20"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="black" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </motion.div>
          
          {/* Message Content */}
          <div className="flex-grow">
            <p className="text-[10px] md:text-[11px] font-black tracking-[0.25em] uppercase leading-relaxed text-white/90">
              {message}
            </p>
          </div>

          {/* Visual Divider */}
          <div className="hidden md:block h-6 w-[1px] bg-white/10" />
          
          {/* Success Label */}
          <div className="hidden md:block">
            <span className="text-[8px] font-black tracking-[0.3em] text-[#d4af37] uppercase">Success</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
