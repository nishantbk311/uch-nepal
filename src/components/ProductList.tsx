
import React, { useState, useMemo } from 'react';
import {PRODUCTS as Products} from './Products';
import { motion, AnimatePresence } from 'framer-motion';

export const PRODUCTS = Products; 

const CATEGORIES = ['Shawl', 'Stole', 'Scarf', 'Puncho', 'Printed'];
const SIZES = ['OS', 'S', 'M', 'L'];
const SIZE_NAMES: Record<string, string> = {
  'OS': 'One Size',
  'S': 'Small',
  'M': 'Medium',
  'L': 'Large'
};

const COLORS = [
  { name: 'Natural', hex: '#ffffff' },
  { name: 'Indigo', hex: '#1e3a8a' },
  { name: 'Saffron', hex: '#d97706' },
  { name: 'Forest', hex: '#064e3b' },
  { name: 'Slate', hex: '#4a5568' }
];

interface FilterContentProps {
  selectedCategories: string[];
  selectedSizes: string[];
  selectedColors: string[];
  toggleCategory: (cat: string) => void;
  toggleSize: (size: string) => void;
  toggleColor: (color: string) => void;
}

const FilterContent: React.FC<FilterContentProps> = ({
  selectedCategories,
  selectedSizes,
  selectedColors,
  toggleCategory,
  toggleSize,
  toggleColor
}) => (
  <div className="divide-y divide-gray-100 border-t border-gray-100">
    <AccordionItem title="Category" defaultOpen={true}>
      <div className="py-6 space-y-3 px-1">
        {CATEGORIES.map(cat => (
          <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
            <input 
              type="checkbox" 
              className="accent-black w-4 h-4 cursor-pointer" 
              checked={selectedCategories.includes(cat)}
              onChange={() => toggleCategory(cat)}
            />
            <span className={`text-[11px] font-medium tracking-[0.15em] transition-colors ${selectedCategories.includes(cat) ? 'text-black font-bold' : 'text-gray-500 group-hover:text-black'} uppercase`}>
              {cat}s
            </span>
          </label>
        ))}
      </div>
    </AccordionItem>
    <AccordionItem title="Size" defaultOpen={true}>
      <div className="py-6 grid grid-cols-2 gap-3 px-1">
        {SIZES.map(size => {
          const isSelected = selectedSizes.includes(size);
          return (
            <motion.button 
              key={size}
              whileHover="hover"
              initial="initial"
              animate={isSelected ? "hover" : "initial"}
              onClick={() => toggleSize(size)}
              className={`relative px-4 py-4 border text-[10px] font-bold tracking-widest transition-all duration-300 overflow-hidden flex items-center justify-center ${
                isSelected 
                  ? 'bg-black text-white border-black shadow-md scale-105 z-10' 
                  : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black hover:scale-105'
              }`}
            >
              <div className="relative h-4 w-full flex items-center justify-center">
                <motion.span 
                  variants={{
                    initial: { y: 0, opacity: 1 },
                    hover: { y: -25, opacity: 0 }
                  }}
                  className="block"
                >
                  {size}
                </motion.span>
                <motion.span 
                  variants={{
                    initial: { y: 25, opacity: 0 },
                    hover: { y: 0, opacity: 1 }
                  }}
                  className="absolute block whitespace-nowrap text-[8px] uppercase font-black"
                >
                  {SIZE_NAMES[size]}
                </motion.span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </AccordionItem>
    <AccordionItem title="Color" defaultOpen={true}>
      <div className="py-12 grid grid-cols-4 md:flex md:flex-wrap gap-4 px-1">
        {COLORS.map(color => (
          <div key={color.name} className="relative flex flex-col items-center">
            <button 
              onClick={() => toggleColor(color.name)}
              className="flex flex-col items-center group relative outline-none"
            >
              <div 
                className={`w-8 h-8 rounded-full border border-gray-100 shadow-sm transition-all duration-300 ${
                  selectedColors.includes(color.name) 
                    ? 'ring-2 ring-offset-2 ring-black scale-110' 
                    : 'group-hover:scale-110'
                }`} 
                style={{ backgroundColor: color.hex }} 
              />
              <span className="text-[8px] mt-2 font-black tracking-widest text-gray-500 uppercase">
                {color.name}
              </span>
            </button>
          </div>
        ))}
      </div>
    </AccordionItem>
  </div>
);

interface ProductListProps {
  limit?: number;
  onProductClick: (product: Product) => void;
  searchQuery?: string;
}

const ProductList: React.FC<ProductListProps> = ({ limit, onProductClick, searchQuery = '' }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isFilterOpenMobile, setIsFilterOpenMobile] = useState(false);

  const isAnyFilterActive = useMemo(() => {
    return selectedCategories.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0;
  }, [selectedCategories, selectedSizes, selectedColors]);

  const totalFiltersApplied = useMemo(() => {
    return selectedCategories.length + selectedSizes.length + selectedColors.length;
  }, [selectedCategories, selectedSizes, selectedColors]);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const searchMatch = searchQuery === '' || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!searchMatch) return false;

      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const sizeMatch = selectedSizes.length === 0 || p.sizes.some(s => selectedSizes.includes(s));
      const colorMatch = selectedColors.length === 0 || p.colors.some(c => {
        const activeColorHexes = COLORS.filter(col => selectedColors.includes(col.name)).map(col => col.hex);
        return activeColorHexes.length === 0 || p.colors.some(pc => activeColorHexes.includes(pc));
      });
      return categoryMatch && sizeMatch && colorMatch;
    });
  }, [selectedCategories, selectedSizes, selectedColors, searchQuery]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors(prev => prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]);
  };

  if (limit) {
    const limitedProducts = filteredProducts.slice(0, limit);
    return (
      <div className=" grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
        {limitedProducts.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
        ))}
        {limitedProducts.length === 0 && <div className="col-span-full py-10 text-center text-gray-400 italic font-light">No matching products found.</div>}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-16">
      {/* Mobile-Only Filter Navigation Area */}
      <div className="lg:hidden flex flex-col space-y-4 mb-4">
        {/* Search Result Indicator for Mobile */}
        <AnimatePresence>
          {searchQuery.trim().length > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 border-x border-b border-gray-100 p-4 text-center rounded-b-sm mb-2"
            >
              <p className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase">
                Showing results for <span className="text-black">"{searchQuery}"</span>
              </p>
              <p className="text-[11px] font-black text-[#d4af37] mt-1">({filteredProducts.length} Items Found)</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <button 
            onClick={() => setIsFilterOpenMobile(!isFilterOpenMobile)}
            className="px-5 py-2.5 border border-black flex items-center space-x-3 text-[10px] font-black tracking-[0.2em] uppercase bg-white text-black active:bg-black active:text-white transition-all shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
            <span>{isFilterOpenMobile ? 'HIDE FILTERS' : 'SHOW FILTERS'}</span>
            {totalFiltersApplied > 0 && (
              <span className="flex items-center justify-center bg-[#d4af37] text-white w-5 h-5 rounded-full text-[9px] font-black shadow-lg">
                {totalFiltersApplied}
              </span>
            )}
          </button>
          
          <div className="text-[11px] font-black tracking-[0.2em] uppercase text-gray-400">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'} Found
          </div>
        </div>

        {/* Mobile Persistent Clear Button */}
        <AnimatePresence>
          {isAnyFilterActive && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full"
            >
              <button
                onClick={clearAllFilters}
                className="w-full py-3.5 border border-black text-[10px] font-black tracking-[0.3em] uppercase bg-[#fdfaf2] text-black hover:bg-black hover:text-white transition-all duration-300 shadow-sm border-dashed"
              >
                Clear All Applied Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {isFilterOpenMobile && (
            <motion.div 
              key="mobile-filter-content-area"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-white px-1"
            >
              <FilterContent 
                selectedCategories={selectedCategories}
                selectedSizes={selectedSizes}
                selectedColors={selectedColors}
                toggleCategory={toggleCategory}
                toggleSize={toggleSize}
                toggleColor={toggleColor}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop-Only Persistent Sidebar */}
      <aside className="hidden lg:block lg:w-72 space-y-2 shrink-0 order-1">
        <div className="flex justify-between items-end mb-8">
          <h4 className="text-sm font-black tracking-[0.2em] uppercase text-black">Collections Filter</h4>
        </div>
        
        <FilterContent 
          selectedCategories={selectedCategories}
          selectedSizes={selectedSizes}
          selectedColors={selectedColors}
          toggleCategory={toggleCategory}
          toggleSize={toggleSize}
          toggleColor={toggleColor}
        />
        
        <AnimatePresence>
          {isAnyFilterActive && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="pt-8 px-1"
            >
              <button
                onClick={clearAllFilters}
                className="w-full py-4 border border-black text-[10px] font-black tracking-[0.3em] uppercase bg-white text-black hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>

      {/* Product Grid Area */}
      <div className="flex-grow order-2">
        {/* Top Category Shortcut Buttons (Desktop Only) - NOW ON TOP */}
        <div className="hidden lg:flex flex-wrap gap-4 items-center overflow-x-auto pb-10 scrollbar-hide">
          <button
            onClick={() => setSelectedCategories([])}
            className={`px-10 py-3 border border-black text-xs font-bold tracking-[0.2em] transition-all ${
              selectedCategories.length === 0 ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50 shadow-sm'
            }`}
          >
            ALL
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-10 py-3 border border-black text-xs font-bold tracking-[0.2em] transition-all ${
                selectedCategories.includes(cat) ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50 shadow-sm'
              }`}
            >
              {cat.toUpperCase()}S
            </button>
          ))}
        </div>

        {/* Search Result Indicator for Desktop - NOW BELOW CATEGORIES */}
        <AnimatePresence>
          {searchQuery.trim().length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-10 p-6 border border-[#d4af37]/20 bg-[#fdfaf2] flex items-center justify-between rounded-sm"
            >
              <div className="flex items-center space-x-4">
                <div className="w-1.5 h-10 gold-gradient rounded-full" />
                <h3 className="text-lg serif font-black tracking-[0.02em] text-black">
                  SHOWING RESULTS FOR <span className="italic">"{searchQuery}"</span>
                </h3>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">Items found</span>
                <span className="bg-black text-white px-4 py-2 text-xs font-black rounded-sm shadow-xl">
                  {filteredProducts.length}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-10 md:gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} onClick={() => onProductClick(product)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
             <h3 className="text-2xl md:text-3xl serif italic text-gray-300">No treasures found for this selection.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

const AccordionItem: React.FC<{ title: string, children?: React.ReactNode, defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex justify-between items-center group">
        <span className="text-[11px] font-black tracking-[0.2em] uppercase text-black group-hover:text-[#d4af37] transition-colors">{title}</span>
        <span className={`text-xl font-light transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ProductCard: React.FC<{ product: Product, onClick: () => void }> = ({ product, onClick }) => (
  <div className="group cursor-pointer" onClick={onClick}>
    <div className="relative aspect-square bg-[#f8f8f8] overflow-hidden rounded-sm mb-5 md:mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-500">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110 ease-out"/>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button className="bg-white text-black px-6 md:px-10 py-3 md:py-4 text-[9px] md:text-[11px] font-black tracking-[0.3em] uppercase shadow-2xl border border-gray-100 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          VIEW DETAILS
        </button>
      </div>
    </div>
    <div className="space-y-1.5 md:space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-[9px] font-black tracking-[0.2em] text-[#A8A8A8] uppercase">{product.category}</p>
        <p className="text-[9px] font-bold tracking-widest text-[#d4af37] uppercase">{product.sizes.join(' / ')}</p>
      </div>
      
      {/* Enhanced Name Visibility on Mobile */}
      <h3 className="text-[14px] md:text-[16px] font-bold tracking-tight text-[#111] serif leading-[1.3] group-hover:text-[#d4af37] transition-colors">
        {product.name}
      </h3>
      
      <div className="flex justify-between items-center pt-1 md:pt-2">
        <p className="text-[15px] md:text-lg font-black text-black tracking-tight">${product.price.toFixed(2)}</p>
        <div className="flex -space-x-1.5 md:-space-x-2 items-center">
          {product.colors.map((c, i) => (
            <div 
              key={i} 
              className="w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white shadow-sm ring-1 ring-black/5" 
              style={{ backgroundColor: c, zIndex: product.colors.length - i }} 
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ProductList;
