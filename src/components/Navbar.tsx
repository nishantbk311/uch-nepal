
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';

interface NavbarProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
  cartCount?: number;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isLoggedIn, 
  onLogout,
  cartCount = 0,
  searchQuery = '',
  onSearchChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(searchQuery !== '');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'PRODUCT', path: '/collections' },
    { name: 'COLOR CHART', path: '/color-chart' },
    { name: 'OUR STORY', path: '/story' },
    { name: 'BLOG', path: '/blog' },
  ];

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  // Ensure search stays expanded if there is an active query (especially after redirection)
  useEffect(() => {
    if (searchQuery !== '') {
      setIsSearchExpanded(true);
    }
  }, [searchQuery]);

  // Handle clicking the same link to scroll to top smoothly
  const handleNavLinkClick = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-[95rem] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={() => handleNavLinkClick('/')}
          >
               <img 
                src="logo.png" 
                alt="Logo" 
                className="w-14 h-auto object-cover"
               />
           
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => handleNavLinkClick(link.path)}
                className={({ isActive }) => 
                  `text-xs tracking-widest transition-colors ${isActive ? 'text-[#d4af37] font-bold' : 'text-gray-500 hover:text-black'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
             {isLoggedIn ? (
               <button 
                 onClick={onLogout}
                 className="text-xs tracking-widest text-gray-500 hover:text-black transition-all"
               >
                 LOG OUT
               </button>
             ) : (
               <>
                 <Link 
                   to="/login"
                   onClick={() => handleNavLinkClick('/login')}
                   className={`text-xs tracking-widest transition-all duration-300 ${location.pathname === '/login' ? 'text-[#d4af37] font-bold' : 'text-gray-500 hover:text-black'}`}
                 >
                  LOG IN
                 </Link>
                 <span className="text-gray-200">|</span>
                 <Link 
                   to="/signup"
                   onClick={() => handleNavLinkClick('/signup')}
                   className={`text-xs tracking-widest transition-all duration-300 ${location.pathname === '/signup' ? 'text-[#d4af37] font-bold' : 'text-gray-500 hover:text-black'}`}
                 >
                  SIGN UP
                 </Link>
               </>
             )}
          </div>

          {/* Search Feature */}
          <div className="flex items-center">
            <AnimatePresence>
              {isSearchExpanded && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    onBlur={() => {
                      if (searchQuery === '') setIsSearchExpanded(false);
                    }}
                    placeholder="Search products..."
                    className="bg-transparent border-b border-gray-200 text-xs tracking-widest px-2 py-1 w-full focus:outline-none focus:border-black font-bold"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className={`p-2 rounded-full transition-colors ${isSearchExpanded ? 'bg-gray-100 text-[#d4af37]' : 'hover:bg-gray-100'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>

          <Link 
            to="/cart"
            onClick={() => handleNavLinkClick('/cart')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span className="absolute top-0 right-0 bg-[#d4af37] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
              {cartCount}
            </span>
          </Link>
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-100 p-6 flex flex-col space-y-4 overflow-hidden"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => handleNavLinkClick(link.path)}
                className={({ isActive }) => `text-left text-sm tracking-widest ${isActive ? 'text-[#d4af37] font-bold' : ''}`}
              >
                {link.name}
              </NavLink>
            ))}
            <hr className="border-gray-100" />
            <div className="flex justify-between">
              {isLoggedIn ? (
                <button onClick={onLogout} className="text-xs tracking-widest text-gray-500 uppercase">Log Out</button>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    onClick={() => handleNavLinkClick('/login')} 
                    className={`text-xs tracking-widest ${location.pathname === '/login' ? 'text-[#d4af37] font-bold' : 'text-gray-500'}`}
                  >
                    LOG IN
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => handleNavLinkClick('/signup')} 
                    className={`text-xs tracking-widest ${location.pathname === '/signup' ? 'text-[#d4af37] font-bold' : 'text-gray-500'}`}
                  >
                    SIGN UP
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
