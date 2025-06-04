import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import AdminToggle from '@/components/admin/AdminToggle';
import { useAuth } from '@/contexts/AuthContext';
import MayoSummerFeature from '@/components/home/MayoSummerFeature';
import MacquarieFeature from '@/components/home/MacquarieFeature';
import MacquarieExternshipFeature from '@/components/home/MacquarieExternshipFeature';
import BaptistHealthFeature from '@/components/home/BaptistHealthFeature';
import VystarFeature from '@/components/home/VystarFeature';
import FeeTeaser from '@/components/pricing/FeeTeaser';
import InfoBanner from '@/components/home/InfoBanner';
import CredentialsDropdown from '@/components/home/CredentialsDropdown';
import BrandLogo from '@/components/home/BrandLogo';
import FeaturedProgramsSection from '@/components/home/FeaturedProgramsSection';
import QuickAccessButtons from '@/components/home/QuickAccessButtons';
import FirstJobToolkit from '@/components/home/FirstJobToolkit';
import { motion, AnimatePresence } from 'framer-motion';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import UserRecommendationsSection from '@/components/home/UserRecommendationsSection';
import { 
  Sparkles, 
  Star, 
  Trophy, 
  Target, 
  Zap, 
  Award, 
  CheckCircle, 
  TrendingUp,
  Briefcase,
  BookOpen,
  Users
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Index = () => {
  const fadeIn = useFadeIn(300);
  const { user, userProfile, isLoading } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const welcomeVariants = {
    initial: { 
      opacity: 0, 
      y: -20,
      scale: 0.95 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  const iconVariants = {
    initial: { scale: 0, rotate: 0 },
    animate: { 
      scale: 1, 
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.3
      }
    }
  };

  const sparkleVariants = {
    animate: {
      y: [0, -8, 0],
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  return (
    <Layout>
      <AnimatePresence>
        {user && !isLoading && (
          <motion.div 
            className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 shadow-lg"
            variants={welcomeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="container mx-auto px-4 py-6">
              <motion.div 
                className="flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <motion.div
                  variants={iconVariants}
                  className="p-3 bg-white/20 rounded-full mb-4"
                >
                  <Star className="h-8 w-8 text-yellow-300" />
                </motion.div>
                
                <div className="flex flex-col items-center space-y-2">
                  <motion.h2 
                    className="text-white font-bold text-3xl md:text-4xl"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Welcome back, {userProfile?.first_name || 'User'}! 
                  </motion.h2>
                  <motion.p 
                    className="text-white/80 text-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Ready to continue your journey?
                  </motion.p>
                </div>

                <div className="flex items-center justify-center space-x-4 mt-6">
                  <motion.div
                    variants={sparkleVariants}
                    animate="animate"
                  >
                    <Sparkles className="h-6 w-6 text-yellow-300" />
                  </motion.div>
                  
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                    <Trophy className="h-4 w-4 mr-2" />
                    {userProfile?.user_type === 'employer' ? 'Employer' : 'Job Seeker'}
                  </Badge>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
                    >
                      <Briefcase className="h-5 w-5 mr-2" />
                      Dashboard
                    </Button>
                  </motion.div>

                  <motion.div
                    variants={sparkleVariants}
                    animate="animate"
                  >
                    <Sparkles className="h-6 w-6 text-yellow-300" />
                  </motion.div>
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-white/40 rounded-full"
                      style={{
                        left: `${15 + i * 12}%`,
                        top: `${25 + (i % 3) * 25}%`,
                      }}
                      animate={{
                        y: [0, -25, 0],
                        opacity: [0.2, 0.9, 0.2],
                        scale: [1, 1.8, 1],
                      }}
                      transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.4,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <InfoBanner />
        </motion.div>
        
        <motion.div variants={itemVariants} className="container mx-auto px-4 mb-8">
          <MayoSummerFeature />
        </motion.div>
        
        {/* Macquarie Feature */}
        <motion.div variants={itemVariants} className="container mx-auto px-4 mb-8">
          <MacquarieFeature />
        </motion.div>
        
        {/* Baptist Health Feature */}
        <motion.div variants={itemVariants} className="container mx-auto px-4 mb-8">
          <BaptistHealthFeature />
        </motion.div>
        
        {/* Macquarie Externship Feature */}
        <motion.div variants={itemVariants} className="container mx-auto px-4 mb-8">
          <MacquarieExternshipFeature />
        </motion.div>
        
        {/* VyStar Feature */}
        <motion.div variants={itemVariants} className="container mx-auto px-4 mb-8">
          <VystarFeature />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <FirstJobToolkit />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <UserRecommendationsSection />
        </motion.div>
        
        <motion.div variants={itemVariants} className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-center mb-6 snyk-gradient-text">Simple Pricing for Employers</h2>
          <FeeTeaser />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <CredentialsDropdown />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <BrandLogo />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <FeaturedProgramsSection />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <QuickAccessButtons />
        </motion.div>
        
        {user && (
          <motion.div variants={itemVariants} className="container mx-auto px-4 py-8">
            <AdminToggle />
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};

export default Index;
