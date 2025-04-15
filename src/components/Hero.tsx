import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Award, UserCheck, ArrowRight, GraduationCap, Heart } from 'lucide-react';
import { SparkleGroup } from './animations/Sparkle';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20">
      {/* Background pattern */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.02 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] -z-10" 
      />
      
      {/* Animated sparkles */}
      <SparkleGroup count={8} />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Free Badge */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-block"
          >
            <Badge variant="outline" className="px-4 py-1 text-lg bg-amber-50 border-amber-200 text-amber-700">
              <Award className="h-5 w-5 mr-2" />
              Free for Students
            </Badge>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 relative"
          >
            <span className="bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">
              Your First Job, Made Simple.
            </span>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute -right-12 top-0 text-red-500"
            >
              <Heart className="h-8 w-8" fill="currentColor" />
            </motion.div>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg mb-8 text-gray-600"
          >
            A safe, mobile-first platform connecting certified high school students with local businesses. Exclusive to Westside High School students in Entrepreneurship or Nursing Academy.
          </motion.p>

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

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link to="/sign-up">
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
        </div>
      </div>
    </div>
  );
};

export default Hero;
