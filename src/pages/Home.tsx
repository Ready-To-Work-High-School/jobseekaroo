
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedJobsSection from '@/components/home/FeaturedJobsSection';
import TopJobsSection from '@/components/job/TopJobsSection';
import TopEmployersSection from '@/components/job/TopEmployersSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import UserRecommendationsSection from '@/components/home/UserRecommendationsSection';
import FirstJobToolkit from '@/components/home/FirstJobToolkit';
import { motion } from 'framer-motion';

const Home = () => {
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
        {/* Hero Section */}
        <motion.div variants={itemVariants}>
          <HeroSection />
        </motion.div>

        {/* Featured Jobs Section */}
        <motion.div variants={itemVariants}>
          <FeaturedJobsSection />
        </motion.div>

        {/* Top Jobs for Teenagers in Jacksonville */}
        <motion.div variants={itemVariants}>
          <TopJobsSection />
        </motion.div>

        {/* Top Employers Section */}
        <motion.div variants={itemVariants}>
          <TopEmployersSection />
        </motion.div>

        {/* How It Works Section */}
        <motion.div variants={itemVariants}>
          <HowItWorksSection />
        </motion.div>

        {/* First Job Toolkit */}
        <motion.div variants={itemVariants}>
          <FirstJobToolkit />
        </motion.div>

        {/* User Recommendations */}
        <motion.div variants={itemVariants}>
          <UserRecommendationsSection />
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Home;
