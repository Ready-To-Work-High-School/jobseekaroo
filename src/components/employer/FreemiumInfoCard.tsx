
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const FreemiumInfoCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card className="overflow-hidden border-amber-200">
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 px-4 py-2 border-b border-amber-200">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="font-medium text-amber-800">New Freemium Model Available</span>
          </div>
        </div>
        <CardContent className="pt-4 pb-2">
          <p className="text-sm">
            You can now post basic jobs completely free! Upgrade to premium features with a 30-day free trial to increase visibility and applicant engagement.
          </p>
        </CardContent>
        <CardFooter className="p-0 bg-gradient-to-r from-amber-50 to-amber-100">
          <Button 
            variant="link" 
            asChild
            className="text-amber-800 h-auto py-2 w-full flex justify-center"
          >
            <Link to="/employer-premium" className="flex items-center">
              Learn more about premium features
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default FreemiumInfoCard;
