
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';

interface CollectionsPageProps {
  searchQuery: string;
}

const CollectionsPage: React.FC<CollectionsPageProps> = ({ searchQuery }) => {
  const navigate = useNavigate();

  return (
    <motion.section 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="container mx-auto px-6 py-12 md:py-20"
    >
      <ProductList onProductClick={(p) => navigate(`/product/${p.id}`)} searchQuery={searchQuery} />
    </motion.section>
  );
};

export default CollectionsPage;
