import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
}

const EXCHANGE_RATE = 133.5;

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  removeFromCart, 
  updateQuantity 
}) => {
  const [currency, setCurrency] = useState<'USD' | 'NPR'>('USD');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal;

  const formatPrice = (price: number) => {
    if (currency === 'NPR') {
      return `रू ${(price * EXCHANGE_RATE).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${price.toFixed(2)}`;
  };

  const uniqueItemCount = cart.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer Content */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl serif font-bold text-black uppercase tracking-widest">
                  ITEMS IN CART ({uniqueItemCount} {uniqueItemCount === 1 ? 'ITEM' : 'ITEM(S)'})
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-8 space-y-8 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-6 text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  </div>
                  <p className="text-gray-400 font-light italic tracking-wide">Your artisanal selection is empty.</p>
                  <button 
                    onClick={onClose}
                    className="px-10 py-3 bg-black text-white text-[10px] font-black tracking-[0.4em] uppercase hover:bg-[#d4af37] transition-all"
                  >
                    CONTINUE BROWSING
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.cartId} className="flex space-x-6 group animate-in slide-in-from-right duration-300">
                    <div className="w-24 h-32 bg-gray-50 rounded-sm overflow-hidden shrink-0 border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-bold text-black serif tracking-tight mb-1">{item.name}</h3>
                          <p className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.2em] mb-2">{item.category}</p>
                          <div className="text-[11px] text-gray-500 space-y-1 font-medium">
                            <p>Quantity: <span className="text-black font-bold">{item.quantity}</span></p>
                            <p>Size: <span className="text-black font-bold uppercase">{item.selectedSize}</span></p>
                            <p className="flex items-center space-x-1">
                              <span>Color:</span>
                              <div className="w-2 h-2 rounded-full border border-gray-200" style={{ backgroundColor: item.selectedColor }} />
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-4">
                          <div className="flex flex-col items-end">
                            <div className="bg-[#fdf9e7] px-4 py-2 text-sm font-bold border border-[#f0e68c]/30 shadow-sm">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            {item.quantity > 1 && (
                              <span className="text-[8px] text-gray-400 font-bold tracking-widest mt-1 uppercase">
                                {formatPrice(item.price)} ea
                              </span>
                            )}
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.cartId)}
                            className="p-1.5 text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 mt-2">
                         <div className="flex items-center bg-gray-50 border border-gray-100 rounded-sm overflow-hidden h-8">
                            <button onClick={() => updateQuantity(item.cartId, -1)} className="px-3 hover:bg-gray-100 text-sm">-</button>
                            <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.cartId, 1)} className="px-3 hover:bg-gray-100 text-sm">+</button>
                         </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order Summary Area */}
            {cart.length > 0 && (
              <div className="p-8 bg-[#faf9f6] border-t border-gray-100 space-y-8">
                <div>
                  <h4 className="text-[11px] font-black tracking-[0.3em] uppercase text-black mb-6 border-b border-gray-200 pb-2">
                    ORDER SUMMARY
                  </h4>
                  
                  {/* Currency Switcher */}
                  <div className="flex items-center space-x-1 bg-white border border-gray-100 p-1 w-fit rounded-sm mb-6 overflow-hidden">
                    <button 
                      onClick={() => setCurrency('USD')}
                      className={`px-6 py-2 text-[10px] font-bold tracking-widest transition-all ${currency === 'USD' ? 'bg-[#3182ce] text-white shadow-md' : 'text-gray-400 hover:text-black hover:bg-gray-50'}`}
                    >
                      USD
                    </button>
                    <button 
                      onClick={() => setCurrency('NPR')}
                      className={`px-6 py-2 text-[10px] font-bold tracking-widest transition-all ${currency === 'NPR' ? 'bg-[#3182ce] text-white shadow-md' : 'text-gray-400 hover:text-black hover:bg-gray-50'}`}
                    >
                      NPR
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-medium text-gray-500 italic">
                      <span>Sub Total ({uniqueItemCount} {uniqueItemCount === 1 ? 'item' : 'items'})</span>
                      <span className="text-black font-bold not-italic">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                      <span className="text-xl serif font-black text-[#3182ce] tracking-widest uppercase">TOTAL</span>
                      <span className="text-2xl font-black text-[#3182ce] tracking-tighter">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-5 bg-[#ccc] text-black text-[11px] font-black tracking-[0.5em] uppercase hover:bg-black hover:text-white transition-all shadow-xl">
                  PROCEED TO ORDER
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;