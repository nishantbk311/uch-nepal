
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CartPage from '../components/CartPage';
import { CartItem } from '../types';

interface CartPageContainerProps {
  cart: CartItem[];
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
}

const CartPageContainer: React.FC<CartPageContainerProps> = ({ cart, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }}
    >
      <CartPage 
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        onContinueShopping={() => navigate('/collections')}
      />
    </motion.div>
  );
};

export default CartPageContainer;
