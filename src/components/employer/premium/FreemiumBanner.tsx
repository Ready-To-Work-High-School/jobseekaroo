
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const FreemiumBanner = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-50 to-amber-50 border border-amber-200 rounded-lg p-5 mb-8 shadow-sm"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-amber-500" />
            </div>
            <h2 className="text-xl font-semibold">Free 30-Day Premium Trial</h2>
          </div>
          <p className="text-muted-foreground max-w-xl">
            Unlock all premium features for free. Get enhanced visibility with branded listings, 
            priority placement, advanced candidate matching, and detailed analytics.
          </p>
          <div className="flex items-center text-green-600 text-sm font-medium">
            <Clock className="h-4 w-4 mr-1" />
            No credit card required to start your trial
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            asChild
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md"
          >
            <Link to="/employer-premium" className="flex items-center">
              Start Free Trial
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FreemiumBanner;
