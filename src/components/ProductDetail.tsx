
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { PRODUCTS, ProductCard } from './ProductList';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onProductClick?: (product: Product) => void;
  isLoggedIn?: boolean;
  onAuthRedirect?: () => void;
  onAddToCart?: (product: Product, quantity: number, color: string, size: string) => void;
}

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const SIZE_NAMES: Record<string, string> = {
  'OS': 'One Size',
  'S': 'Small',
  'M': 'Medium',
  'L': 'Large'
};

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  onBack, 
  onProductClick, 
  isLoggedIn = false, 
  onAuthRedirect,
  onAddToCart
}) => {
  const [activeImage, setActiveImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isAdded, setIsAdded] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([
    { id: '1', user: 'Elena V.', rating: 5, comment: 'Absolutely divine quality. The drape is incredible.', date: 'Jan 12, 2025' },
    { id: '2', user: 'Marcus K.', rating: 4, comment: 'Very soft. The color is slightly more muted in person, which I actually prefer.', date: 'Dec 05, 2024' }
  ]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', user: '' });

  const images = [product.image, ...(product.additionalImages || [])];

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity, product.colors[0], selectedSize);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment.trim() || !newReview.user.trim()) return;
    
    const review: Review = {
      id: Date.now().toString(),
      user: newReview.user,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '', user: '' });
  };

  const recommendedProducts = PRODUCTS
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const totalPrice = product.price * quantity;

  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <button 
        onClick={onBack}
        className="flex items-center space-x-3 text-[10px] tracking-[0.3em] font-black uppercase text-gray-400 hover:text-black mb-12 transition-colors group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        <span>Back to Collections</span>
      </button>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-16 lg:items-stretch mb-32">
        
        {/* Left: Image Gallery */}
        <div className="w-full lg:w-[48%] flex flex-col">
          <div className="flex-grow min-h-[300px] md:min-h-[400px] lg:min-h-0 bg-white overflow-hidden shadow-2xl rounded-sm relative border border-gray-100 mb-6">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                src={activeImage} 
                className="absolute inset-0 w-full h-full object-contain"
                alt={product.name}
              />
            </AnimatePresence>
          </div>

          <div className="flex flex-row gap-3 md:gap-6 shrink-0 overflow-x-auto pt-4 pb-2 px-2 md:px-4 scrollbar-hide -mx-2 md:-mx-4">
            {images.map((img, i) => (
              <button 
                key={i}
                onMouseEnter={() => setActiveImage(img)}
                onClick={() => setActiveImage(img)}
                className={`w-16 h-20 md:w-20 md:h-24 flex-shrink-0 border-[2px] md:border-[3px] transition-all duration-300 rounded-none overflow-hidden p-[1px] relative ${
                  activeImage === img 
                    ? 'border-black scale-110 shadow-2xl z-10' 
                    : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-black hover:scale-110'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${i}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="w-full lg:w-[52%] space-y-8 flex flex-col justify-between">
          <div className="space-y-8">
            <header>
              <h1 className="text-3xl md:text-5xl serif text-black mb-3 leading-tight">{product.name}</h1>
              <p className="text-2xl font-bold text-[#3182ce] tracking-tight">${product.price.toFixed(2)}</p>
            </header>

            <div className="grid grid-cols-2 gap-8">
              {/* Color Palette Display */}
              <div>
                <p className="text-[10px] font-black tracking-[0.25em] uppercase text-gray-400 mb-4">Color Choice</p>
                <div className="flex -space-x-3">
                  {product.colors.map((color, i) => (
                    <div 
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm ring-1 ring-black/5"
                      style={{ backgroundColor: color, zIndex: product.colors.length - i }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <p className="text-[10px] font-black tracking-[0.25em] uppercase text-gray-400 mb-4">Size Selection</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, i) => (
                    <button 
                      key={i}
                      onClick={() => setSelectedSize(size)}
                      className={`relative group px-4 py-1.5 text-[10px] font-bold border transition-all overflow-hidden min-w-[40px] ${
                        selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200 hover:border-black'
                      }`}
                    >
                      <span className="block group-hover:opacity-0 transition-opacity duration-300">
                        {size}
                      </span>
                      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[8px] tracking-tighter whitespace-nowrap px-1">
                        {SIZE_NAMES[size] || size}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black tracking-[0.25em] uppercase text-gray-400 mb-4">Quantity</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center border border-gray-100 bg-[#f4f4f4] rounded-sm overflow-hidden h-10">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 hover:bg-gray-200 transition-colors text-lg"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 hover:bg-gray-200 transition-colors text-lg"
                  >
                    +
                  </button>
                </div>
                <p className="text-xl text-gray-500 tracking-wide">
                  Total: <span className="font-bold text-[#d4af37] tracking-tight ml-1">${totalPrice.toFixed(2)}</span>
                </p>
              </div>
            </div>

            <div className="bg-[#e2e2e2] p-6 md:p-8 space-y-6 rounded-sm shadow-inner">
              <div className="space-y-1">
                <h3 className="text-[11px] font-black tracking-[0.2em] uppercase text-black">
                  {product.category.toUpperCase()} SPECIFICATIONS
                </h3>
                <div className="text-[13px] leading-relaxed text-gray-800 space-y-1">
                  <p>Size: <span className="font-medium">{product.dimensions || '70cm x 200cm'}</span></p>
                  <p>Weight: <span className="font-medium">{product.weight || '120gms'}</span></p>
                  <p>Materials: <span className="font-medium">100% Bamboo Cellulose</span></p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-[11px] font-black tracking-[0.2em] uppercase text-black">SOFT FEATURES:</h3>
                <ul className="text-[13px] leading-relaxed text-gray-800 space-y-1">
                  <li className="flex items-start">
                    <span className="mr-2 text-[#d4af37]">•</span>
                    <span>Hand-loom woven by Himalayan artisans</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#d4af37]">•</span>
                    <span>Warm, soft and light in texture and touch</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full py-5 bg-black text-white text-[11px] font-black tracking-[0.5em] uppercase hover:bg-[#d4af37] transition-all relative overflow-hidden group shadow-xl shrink-0"
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.span 
                  key="added"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative z-10 flex items-center justify-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>ADDED TO CART</span>
                </motion.span>
              ) : (
                <motion.span 
                  key="add"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  ADD TO CART
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Review Section */}
      <section className="mb-32">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 border-b border-gray-100 pb-6 gap-4">
          <h2 className="text-3xl md:text-4xl serif italic">Customer Reviews</h2>
          <div className="flex items-center space-x-4">
             <div className="flex text-[#d4af37]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                ))}
             </div>
             <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">{reviews.length} Reviews</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          {/* Review List */}
          <div className="lg:col-span-2 space-y-12">
            {reviews.map((rev) => (
              <motion.div 
                key={rev.id} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="pb-8 border-b border-gray-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-xs">{rev.user[0]}</div>
                    <div>
                      <p className="text-sm font-bold text-black">{rev.user}</p>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">{rev.date}</p>
                    </div>
                  </div>
                  <div className="flex text-[#d4af37]">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill={i < rev.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-base leading-relaxed font-light">{rev.comment}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-white p-6 md:p-10 shadow-xl rounded-sm border border-gray-100 h-fit lg:sticky lg:top-32">
            {isLoggedIn ? (
              <>
                <h3 className="text-xl serif mb-6">Write a Review</h3>
                <form onSubmit={handleAddReview} className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 block mb-2">Display Name</label>
                    <input 
                      type="text" 
                      value={newReview.user}
                      onChange={e => setNewReview({ ...newReview, user: e.target.value })}
                      className="w-full bg-[#faf9f6] border border-gray-100 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                      placeholder="e.g. Alex M."
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 block mb-2">Rating</label>
                    <div className="flex space-x-2 text-[#d4af37]">
                      {[...Array(5)].map((_, i) => (
                        <button 
                          type="button" 
                          key={i} 
                          onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                          className="hover:scale-110 transition-transform"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={i < newReview.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 block mb-2">Your Experience</label>
                    <textarea 
                      value={newReview.comment}
                      onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full bg-[#faf9f6] border border-gray-100 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black min-h-[120px] resize-none"
                      placeholder="Share your thoughts on the texture and quality..."
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-black text-white text-[10px] font-black tracking-[0.3em] uppercase hover:bg-[#d4af37] transition-all"
                  >
                    POST REVIEW
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <h3 className="text-xl serif mb-4">Share Your Thoughts</h3>
                <p className="text-sm text-gray-500 font-light mb-8 leading-relaxed">
                  Only verified members can share their experiences with our Himalayan fibers. Log in to join the conversation.
                </p>
                <button 
                  onClick={onAuthRedirect}
                  className="w-full py-4 bg-black text-white text-[10px] font-black tracking-[0.3em] uppercase hover:bg-[#d4af37] transition-all shadow-xl"
                >
                  LOG IN TO REVIEW
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recommended Section */}
      <section>
        <div className="flex items-center space-x-6 mb-12">
          <h2 className="text-2xl md:text-4xl serif italic whitespace-nowrap">You May Also Like</h2>
          <div className="h-[1px] bg-gray-100 flex-grow"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-12">
          {recommendedProducts.map(recProduct => (
            <ProductCard 
              key={recProduct.id} 
              product={recProduct} 
              onClick={() => onProductClick?.(recProduct)} 
            />
          ))}
          {recommendedProducts.length === 0 && (
            <p className="text-gray-400 text-sm italic col-span-full">No similar items found in our current collection.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
