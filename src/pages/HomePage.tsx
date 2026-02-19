
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import FAQSection from '../components/FAQSection';

interface HomePageProps {
  searchQuery: string;
}

const HomePage: React.FC<HomePageProps> = ({ searchQuery }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <Hero onExplore={() => navigate('/collections')} />
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-widest text-[#d4af37] font-semibold">Our Collection</span>
          <h2 className="text-4xl md:text-5xl mt-2 serif">Sustainable Elegance</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto font-light">
            Hand-crafted from 100% natural bamboo cellulose, our fibers blend Himalayan heritage with modern sustainable practices.
          </p>
        </div>
        <ProductList limit={4} onProductClick={(p) => navigate(`/product/${p.id}`)} searchQuery={searchQuery} />
        <div className="mt-16 text-center">
          <button 
            onClick={() => navigate('/collections')}
            className="px-12 py-4 border border-black hover:bg-black hover:text-white transition-all duration-300 tracking-widest text-sm font-bold uppercase"
          >
            View All Products
          </button>
        </div>
      </section>
      
      {/* StorySection removed from Home Page as per user request */}
      
      <FAQSection />
    </motion.div>
  );
};

export default HomePage;
