
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import { PRODUCTS } from '../components/ProductList';
import { Product } from '../types';

interface ProductDetailsPageProps {
  isLoggedIn: boolean;
  onAddToCart: (product: Product, quantity: number, color: string, size: string) => void;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ isLoggedIn, onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-32 text-center">
        <h2 className="text-2xl serif">Product not found</h2>
        <button onClick={() => navigate('/collections')} className="mt-4 underline">Back to collections</button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <ProductDetail 
        product={product} 
        onBack={() => navigate('/collections')} 
        onProductClick={(p) => navigate(`/product/${p.id}`)}
        isLoggedIn={isLoggedIn}
        onAuthRedirect={() => navigate('/login')}
        onAddToCart={onAddToCart}
      />
    </motion.div>
  );
};

export default ProductDetailsPage;
