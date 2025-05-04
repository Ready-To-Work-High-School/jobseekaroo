
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
import { motion } from 'framer-motion';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import UserRecommendationsSection from '@/components/home/UserRecommendationsSection';

const Index = () => {
  const fadeIn = useFadeIn(300);
  const { user } = useAuth();

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

  return (
    <Layout>
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
