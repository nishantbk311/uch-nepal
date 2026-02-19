
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import {  AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import Toast from './components/Toast';

// Pages
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ColorChartPage from './pages/ColorChartPage';
import StoryPage from './pages/StoryPage';
import BlogPage from './pages/BlogPage';
import AuthPage from './pages/AuthPage';
import CartPageContainer from './pages/CartPageContainer';
import PrivacyPage from './pages/PrivacyPage';
import ShippingPage from './pages/ShippingPage';

import { Product, CartItem } from './types';


const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);
  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('uch_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('uch_cart', JSON.stringify(cart));
  }, [cart]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Redirect to collections page as soon as user starts typing, if not already there.
    // This now includes redirecting from the home page.
    if (query.trim().length > 0 && location.pathname !== '/collections') {
      navigate('/collections');
    }
  };

  const addToCart = (product: Product, quantity: number, color: string, size: string) => {
    setCart(prev => {
      const cartId = `${product.id}-${color}-${size}`;
      const existing = prev.find(item => item.cartId === cartId);
      if (existing) {
        return prev.map(item => 
          item.cartId === cartId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, cartId, quantity, selectedColor: color, selectedSize: size }];
    });
    
    setToast({ show: true, message: `${product.name} added to cart` });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-[#faf9f6]">
      <ScrollToTop />
      <Navbar 
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        cartCount={cart.length}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
            <Route path="/collections" element={<CollectionsPage searchQuery={searchQuery} />} />
            <Route path="/product/:id" element={<ProductDetailsPage isLoggedIn={isLoggedIn} onAddToCart={addToCart} />} />
            <Route path="/color-chart" element={<ColorChartPage />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/login" element={<AuthPage mode="login" onLoginSuccess={() => setIsLoggedIn(true)} />} />
            <Route path="/signup" element={<AuthPage mode="signup" onLoginSuccess={() => setIsLoggedIn(true)} />} />
            <Route path="/cart" element={<CartPageContainer cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/shipping-returns" element={<ShippingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />

      <Toast show={toast.show} message={toast.message} />
      <WhatsAppWidget />
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
