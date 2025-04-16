
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const EmployerSection = () => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="bg-gradient-to-r from-purple-50 to-amber-50 p-6 rounded-lg border border-purple-100 mt-8"
    >
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">For Employers</h2>
      <p className="text-gray-700 mb-4">
        Access our talent pool of certified high school students ready to contribute to your business.
      </p>
      <Link to="/for-employers">
        <Button variant="secondary" size="lg" className="gap-2 bg-white hover:bg-gray-50">
          Hire Students
          <ArrowRight className="h-5 w-5" />
        </Button>
      </Link>
    </motion.div>
  );
};
