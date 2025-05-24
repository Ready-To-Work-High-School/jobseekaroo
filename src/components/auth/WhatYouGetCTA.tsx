
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

const WhatYouGetCTA = () => {
  const { user } = useAuth();
  
  // Don't show for logged in users
  if (user) {
    return null;
  }

  const benefits = [
    "Access to exclusive job opportunities",
    "Build your professional profile",
    "Career development resources",
    "Direct connection with local employers"
  ];

  return (
    <motion.div 
      className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-6 my-8 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold mb-4">What You Get</h3>
      
      <ul className="space-y-2 mb-6">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      
      <div className="flex justify-center">
        <Button asChild className="gap-2" size="lg">
          <Link to="/signup">
            Sign Up Now <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default WhatYouGetCTA;
