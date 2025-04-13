
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import AdminToggle from '@/components/admin/AdminToggle';
import { useAuth } from '@/contexts/AuthContext';
import MayoSummerFeature from '@/components/home/MayoSummerFeature';
import FeeTeaser from '@/components/pricing/FeeTeaser';
import InfoBanner from '@/components/home/InfoBanner';
import CredentialsDropdown from '@/components/home/CredentialsDropdown';
import BrandLogo from '@/components/home/BrandLogo';
import FeaturedProgramsSection from '@/components/home/FeaturedProgramsSection';
import QuickAccessButtons from '@/components/home/QuickAccessButtons';
import FirstJobToolkit from '@/components/home/FirstJobToolkit';
import { motion } from 'framer-motion';

const Index = () => {
  const fadeIn = useFadeIn(300);
  const { user } = useAuth();

  // Animation variants for staggered animations
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

  // Add debug log to track user status
  console.log('Index page loaded, user authenticated:', !!user);

  return (
    <Layout>
      <motion.div 
        className="w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Info banner with key message */}
        <motion.div variants={itemVariants}>
          <InfoBanner />
        </motion.div>
        
        {/* Mayo Clinic Feature moved to top */}
        <motion.div variants={itemVariants} className="container mx-auto px-4 mb-8">
          <MayoSummerFeature />
        </motion.div>
        
        {/* First Job Toolkit MOVED UP above pricing */}
        <motion.div variants={itemVariants}>
          <FirstJobToolkit />
        </motion.div>
        
        {/* Simple pricing for employers */}
        <motion.div variants={itemVariants} className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-center mb-6 snyk-gradient-text">Simple Pricing for Employers</h2>
          <FeeTeaser />
        </motion.div>
        
        {/* Dropdown for credentials */}
        <motion.div variants={itemVariants}>
          <CredentialsDropdown />
        </motion.div>
        
        {/* Prominent JS4HS Logo Display */}
        <motion.div variants={itemVariants}>
          <BrandLogo />
        </motion.div>
        
        {/* Featured Programs Section */}
        <motion.div variants={itemVariants}>
          <FeaturedProgramsSection />
        </motion.div>
        
        {/* Quick access buttons */}
        <motion.div variants={itemVariants}>
          <QuickAccessButtons />
        </motion.div>
        
        {/* Admin toggle card for easy access */}
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
