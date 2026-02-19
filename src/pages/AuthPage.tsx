
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LoginSection from '../components/LoginSection';

interface AuthPageProps {
  mode: 'login' | 'signup';
  onLoginSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ mode, onLoginSuccess }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <LoginSection 
        initialMode={mode} 
        onModeChange={(newMode) => navigate(`/${newMode}`)} 
        onLoginSuccess={() => {
          onLoginSuccess();
          navigate('/');
        }}
      />
    </motion.div>
  );
};

export default AuthPage;
