
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Users, Shield } from 'lucide-react';

export const EmployerSection = () => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="bg-gradient-to-r from-purple-50 to-amber-50 p-8 rounded-lg border border-purple-100 mt-8"
    >
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">
        For Employers: Fast-Track Your Hiring
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-start gap-2">
          <Zap className="h-5 w-5 text-amber-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-gray-900">Quick Placement</h3>
            <p className="text-sm text-gray-600">Connect with ready-to-work students in days, not weeks</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <Users className="h-5 w-5 text-purple-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-gray-900">Pre-Vetted Talent</h3>
            <p className="text-sm text-gray-600">Access students with verified credentials and skills</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <Shield className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-gray-900">Risk-Free Hiring</h3>
            <p className="text-sm text-gray-600">School-supported workforce integration</p>
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-6">
        Access our talent pool of certified high school students from Westside High School's 
        Entrepreneurship and Nursing academies. Get matched with motivated candidates ready to 
        contribute to your business success.
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
