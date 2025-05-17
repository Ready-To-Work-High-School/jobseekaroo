
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight } from 'lucide-react';

export const HeroButtons = () => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
    >
      <Link to="/signup">
        <Button size="lg" className="w-full sm:w-auto gap-2 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600">
          <GraduationCap className="h-5 w-5" />
          Sign Up Now
          <ArrowRight className="h-5 w-5" />
        </Button>
      </Link>
      <Link to="/jobs">
        <Button size="lg" variant="outline" className="w-full sm:w-auto border-purple-200 hover:border-purple-300">
          Browse Jobs
        </Button>
      </Link>
    </motion.div>
  );
};
