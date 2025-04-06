
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import ValueProposition from '@/components/employer/premium/ValueProposition';

const EmployerPremiumServices = () => {
  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-r from-amber-50 to-blue-50 p-6 rounded-lg border border-amber-100 dark:from-amber-950/30 dark:to-blue-950/30 dark:border-amber-900/50">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1], 
                rotate: [0, 15, -15, 0],
                opacity: [0.7, 1, 0.7] 
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full"
            >
              <Sparkles className="h-6 w-6 text-amber-500" />
            </motion.div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Premium Employer Services</h2>
            <p className="text-muted-foreground">
              Employers get customized job profiles (branded listings, priority placement) and data analytics 
              (applicant statistics, skill match scores) to streamline hiring and improve candidate selection.
            </p>
          </div>
        </div>
        
        <ValueProposition />
        
        <div className="flex justify-center mt-4">
          <Button asChild className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
            <Link to="/employer-premium">
              Explore Premium Features
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployerPremiumServices;
