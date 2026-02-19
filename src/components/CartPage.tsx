
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '../types';

interface CartPageProps {
  cart: CartItem[];
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  onContinueShopping: () => void;
}

const EXCHANGE_RATE = 133.5;

const CartPage: React.FC<CartPageProps> = ({ 
  cart, 
  removeFromCart, 
  updateQuantity,
  onContinueShopping
}) => {
  const [currency, setCurrency] = useState<'USD' | 'NPR'>('USD');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal;

  const formatPrice = (price: number) => {
    if (currency === 'NPR') {
      return `रू ${(price * EXCHANGE_RATE).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    return `$${price.toFixed(0)}`;
  };

  const uniqueItemCount = cart.length;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          <div className="w-24 h-24 gold-gradient rounded-full mx-auto flex items-center justify-center text-black/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </div>
          <h2 className="text-4xl serif italic">Your Cart is Empty</h2>
          <p className="text-gray-500 font-light max-w-md mx-auto">
            It seems you haven't selected any Himalayan treasures yet. Explore our artisanal fiber collections to find your next favorite piece.
          </p>
          <button 
            onClick={onContinueShopping}
            className="px-12 py-4 bg-black text-white text-[10px] font-black tracking-[0.4em] uppercase hover:bg-[#d4af37] transition-all shadow-xl"
          >
            DISCOVER COLLECTIONS
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-20">
      <div className="mb-8">
        <h1 className="text-lg md:text-2xl serif font-bold tracking-[0.02em] uppercase text-black">
          ITEMS IN CART ( {uniqueItemCount} {uniqueItemCount === 1 ? 'ITEM' : 'ITEM(S)'} )
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left: Items List (Ultra-Compact Stripe Design) */}
        <div className="w-full lg:w-[70%] space-y-3">
          {cart.map((item) => (
            <motion.div 
              key={item.cartId}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group flex items-stretch bg-white border border-gray-100 overflow-hidden shadow-sm hover:border-gray-200 transition-all duration-300 rounded-sm"
            >
              {/* Image Container - Strictly filling from top to bottom */}
              <div className="w-20 md:w-28 shrink-0 overflow-hidden bg-gray-50 relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="absolute inset-0 w-full h-full object-cover transform-gpu"
                  style={{ backfaceVisibility: 'hidden' }}
                />
              </div>

              {/* Item Details Stripe - Forces side-by-side where possible */}
              <div className="flex-grow p-3 md:px-6 md:py-4 flex flex-row items-center justify-between gap-3 overflow-hidden">
                <div className="flex-grow space-y-1 min-w-0">
                  <h3 className="text-[13px] md:text-[15px] serif font-bold text-black group-hover:text-[#d4af37] transition-colors leading-tight truncate">
                    {item.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 opacity-60">
                    <p className="text-[8px] md:text-[9px] font-black tracking-widest text-gray-400 uppercase">
                      {item.category}
                    </p>
                    <div className="flex items-center space-x-2 text-[8px] md:text-[9px] text-gray-500 uppercase tracking-widest font-bold">
                      <span>SIZE: <span className="text-black">{item.selectedSize || 'OS'}</span></span>
                      <span className="w-[1px] h-2 bg-gray-200"></span>
                      <span className="flex items-center">
                        <span className="mr-1">COLOR:</span>
                        <span className="w-2 h-2 rounded-full border border-gray-200" style={{ backgroundColor: item.selectedColor }} />
                      </span>
                    </div>
                  </div>

                  {/* Minimal Qty Controls */}
                  <div className="flex items-center mt-2">
                    <div className="flex items-center bg-[#faf9f6] border border-gray-100 rounded-sm overflow-hidden h-7">
                      <button 
                        onClick={() => updateQuantity(item.cartId, -1)}
                        className="px-2.5 hover:bg-gray-200 transition-colors text-xs font-bold"
                      >-</button>
                      <span className="w-6 text-center text-[9px] font-black">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.cartId, 1)}
                        className="px-2.5 hover:bg-gray-200 transition-colors text-xs font-bold"
                      >+</button>
                    </div>
                  </div>
                </div>

                {/* Price and Action Area */}
                <div className="flex items-center gap-3 md:gap-6 shrink-0 pl-2">
                  <div className="flex flex-col items-end">
                    <div className="bg-[#fef9c3]/50 px-3 py-1.5 md:px-5 md:py-2 border border-[#fef9c3] text-[12px] md:text-sm font-black text-black min-w-[50px] md:min-w-[65px] text-center shadow-xs">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                    {item.quantity > 1 && (
                      <span className="text-[7px] md:text-[8px] text-gray-300 font-bold tracking-[0.2em] mt-0.5 uppercase hidden sm:block">
                        {formatPrice(item.price)} / UNIT
                      </span>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.cartId)}
                    className="p-1.5 text-gray-200 hover:text-red-500 transition-colors shrink-0"
                    title="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Summary */}
        <div className="w-full lg:w-[30%] lg:sticky lg:top-32">
          <div className="bg-white border border-gray-100 shadow-xl p-6 md:p-8 space-y-6 rounded-sm">
            <div>
              <h2 className="text-lg serif font-bold tracking-widest text-black mb-6 uppercase border-b border-gray-100 pb-3">
                SUMMARY
              </h2>
              
              <div className="flex items-center border border-[#3182ce]/10 p-0.5 w-fit mb-6 overflow-hidden bg-gray-50/50 rounded-sm">
                <button 
                  onClick={() => setCurrency('USD')}
                  className={`px-6 py-1.5 text-[9px] font-black tracking-widest transition-all ${currency === 'USD' ? 'bg-[#3182ce] text-white' : 'text-gray-400 hover:text-black'}`}
                >
                  USD
                </button>
                <button 
                  onClick={() => setCurrency('NPR')}
                  className={`px-6 py-1.5 text-[9px] font-black tracking-widest transition-all ${currency === 'NPR' ? 'bg-[#3182ce] text-white' : 'text-gray-400 hover:text-black'}`}
                >
                  NPR
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-gray-400">
                  <span className="text-[10px] font-medium tracking-wide">Sub Total ({uniqueItemCount})</span>
                  <span className="text-sm font-bold text-black">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-lg serif font-black tracking-[0.05em] text-[#3182ce] uppercase">TOTAL</span>
                  <span className="text-2xl font-black text-[#3182ce] tracking-tighter">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-[#e5e7eb] text-black text-[10px] font-black tracking-[0.5em] uppercase hover:bg-black hover:text-white transition-all">
              PROCEED TO ORDER
            </button>
            
            <button 
              onClick={onContinueShopping}
              className="w-full text-[9px] tracking-[0.3em] font-black uppercase text-gray-300 hover:text-[#d4af37] transition-colors text-center"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
