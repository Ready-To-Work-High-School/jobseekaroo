
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import EnhancedSearchForm from '@/components/EnhancedSearchForm';
import { useFadeIn } from '@/utils/animations';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, ArrowUpRight } from 'lucide-react';

const SearchSection = () => {
  const searchAnimation = useFadeIn(400);
  const { user } = useAuth();

  // Function to get the redirect path based on auth status
  const getPath = (authenticatedPath: string) => {
    return user ? authenticatedPath : "/sign-in";
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Decorative background elements (Snyk-style) */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-100 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-100 rounded-full opacity-30"></div>
        <div className="absolute -bottom-10 left-1/3 w-24 h-24 bg-green-100 rounded-full opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className={cn("max-w-3xl mx-auto text-center", searchAnimation)}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex items-center justify-center mb-6"
            variants={itemVariants}
          >
            <Search className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-amber-500">
              Find Your Next Opportunity
            </h2>
          </motion.div>
          
          <motion.div 
            className="mb-8 flex justify-center relative"
            variants={itemVariants}
          >
            {/* Search form with animated highlights */}
            <div className="relative w-full max-w-2xl">
              <motion.div 
                className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-blue-500 rounded-lg opacity-50 blur-sm"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
              <div className="relative bg-white rounded-lg p-1">
                <EnhancedSearchForm />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
            variants={containerVariants}
            transition={{ delayChildren: 0.3, staggerChildren: 0.1 }}
          >
            <motion.div variants={itemVariants}>
              <Link to={getPath("/jobs?experienceLevel=entry-level")} className="group">
                <Button variant="outline" size="lg" className="w-full border-blue-200 hover:border-blue-500 transition-all relative">
                  Entry Level Jobs
                  <ArrowUpRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Link to={getPath("/jobs")} className="group">
                <Button variant="default" size="lg" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 relative">
                  Find Jobs
                  <ArrowUpRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Link to={getPath("/jobs?jobType=internship")} className="group">
                <Button variant="outline" size="lg" className="w-full border-amber-200 hover:border-amber-500 transition-all relative">
                  Internships
                  <ArrowUpRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Feature cards with Snyk-style animations */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            variants={containerVariants}
            transition={{ delayChildren: 0.5, staggerChildren: 0.1 }}
          >
            <motion.div 
              className="bg-white p-5 rounded-lg border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2 text-center">Location-Based Search</h3>
              <p className="text-sm text-gray-600 text-center">Find opportunities within an adjustable radius of your location</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-5 rounded-lg border border-gray-100 hover:border-amber-200 shadow-sm hover:shadow-md transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Filter className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="font-medium mb-2 text-center">Smart Filtering</h3>
              <p className="text-sm text-gray-600 text-center">Filter by job type, industry, salary range, and more</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-5 rounded-lg border border-gray-100 hover:border-green-200 shadow-sm hover:shadow-md transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Search className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-medium mb-2 text-center">Saved Searches</h3>
              <p className="text-sm text-gray-600 text-center">Save your searches and get notified when new jobs match</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SearchSection;
