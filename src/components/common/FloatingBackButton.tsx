
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FloatingBackButton = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed left-4 bottom-4 z-50 md:left-8 md:top-24"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={handleGoBack}
        className="rounded-full shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white/95 border-blue-100"
      >
        <ArrowLeft className="h-5 w-5 text-blue-600" />
      </Button>
    </motion.div>
  );
};

export default FloatingBackButton;
