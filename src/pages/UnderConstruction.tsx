
import React from 'react';
import Layout from '@/components/Layout';
import { Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const UnderConstruction = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <motion.div 
        className="container max-w-md mx-auto px-4 py-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Construction className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Under Construction</h1>
        <p className="text-muted-foreground mb-8">
          We're working hard to bring you this feature soon. Please check back later.
        </p>
        <Button onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </motion.div>
    </Layout>
  );
};

export default UnderConstruction;
