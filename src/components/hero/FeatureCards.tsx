
import { motion } from 'framer-motion';
import { Search, Award, UserCheck } from 'lucide-react';

export const FeatureCards = () => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
    >
      <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100 hover:border-purple-200 transition-colors">
        <Search className="h-8 w-8 text-purple-500 mb-2 mx-auto" />
        <h3 className="font-medium">Find Jobs Fast</h3>
        <p className="text-sm text-gray-600">Local opportunities matched to your skills</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100 hover:border-amber-200 transition-colors">
        <Award className="h-8 w-8 text-amber-500 mb-2 mx-auto" />
        <h3 className="font-medium">Earn Badges</h3>
        <p className="text-sm text-gray-600">Track your achievements and grow</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100 hover:border-purple-200 transition-colors">
        <UserCheck className="h-8 w-8 text-purple-500 mb-2 mx-auto" />
        <h3 className="font-medium">Easy Sign Up</h3>
        <p className="text-sm text-gray-600">Get started in minutes</p>
      </div>
    </motion.div>
  );
};
