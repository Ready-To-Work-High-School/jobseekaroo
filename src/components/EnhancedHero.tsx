
import React, { lazy, Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
import { TrendingUp, Briefcase, GraduationCap, CodeXml, Shield, Sparkles } from 'lucide-react';
import { SparkleGroup } from './animations/Sparkle';
import { Divider } from './ui/divider';
import { Separator } from './ui/separator';
import { motion } from 'framer-motion';
import { topJacksonvilleCompanies } from '@/lib/mock-data/companiesData';
import FreeForStudentsBadge from './badges/FreeForStudentsBadge';

// Lazy load components that aren't immediately visible
const PartnerLogosSection = lazy(() => import('@/components/home/PartnerLogosSection'));
const CallToActionSection = lazy(() => import('@/components/home/CallToActionSection'));
const FeaturedJobsSection = lazy(() => import('@/components/home/FeaturedJobsSection'));
const JobPlacementsSection = lazy(() => import('@/components/home/JobPlacementsSection'));
const TopEmployersSection = lazy(() => import('@/components/job/TopEmployersSection'));
const SectionSeparator = lazy(() => import('@/components/home/SectionSeparator'));
const CompanyDirectory = lazy(() => import('./resources/CompanyDirectory'));

// Loading fallback component
const SectionSkeleton = () => (
  <div className="w-full py-8">
    <div className="max-w-6xl mx-auto px-4">
      <div className="h-10 w-1/3 bg-gray-200 rounded animate-pulse mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-100 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  </div>
);

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

const EnhancedHero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative background elements (like Snyk) */}
      <div className="hidden lg:block absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-100/20 blur-3xl"></div>
      <div className="hidden lg:block absolute top-1/4 -right-48 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl"></div>
      
      {/* Reduced number of sparkles */}
      <SparkleGroup count={6} />
      
      {/* JS4HS Logo at the top with glow - NEW */}
      <motion.div 
        className="bg-gradient-to-r from-blue-50 via-white to-blue-50 py-6 px-4 text-center border-b border-blue-100 relative"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto">
          <motion.div className="flex justify-center relative" variants={itemVariants}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-amber-400/30 to-blue-400/20 blur-2xl opacity-70"></div>
            <div className="relative logo-glow logo-accent">
              <img 
                src="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.png" 
                alt="Job Seekers 4 High Schools Logo" 
                className="h-24 md:h-32 w-auto object-contain logo-shadow logo-3d-effect"
                width="256"
                height="128"
              />
            </div>
          </motion.div>
          <motion.h2 
            className="text-xl md:text-2xl font-semibold mt-3 text-blue-800"
            variants={itemVariants}
          >
            Job Seekers 4 High Schools
          </motion.h2>
          <motion.p 
            className="text-sm text-blue-700 max-w-xl mx-auto mt-1"
            variants={itemVariants}
          >
            Connecting students with credential-ready opportunities at Westside High School
          </motion.p>
        </div>
      </motion.div>
      
      {/* Free for students banner with animation */}
      <motion.div 
        className="bg-amber-50 py-3 px-4 text-center border-b border-amber-100"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="container mx-auto">
          <div className="flex justify-center">
            <FreeForStudentsBadge variant="large" />
          </div>
          <p className="text-sm text-amber-800 mt-2">
            Exclusive to Westside High School students in Entrepreneurship or Nursing Academy
          </p>
        </div>
      </motion.div>
      
      {/* Info banner with Snyk-style highlighting */}
      <div className="bg-blue-50 py-4 px-4 text-center">
        <div className="container mx-auto">
          <motion.div 
            className="flex flex-wrap justify-center gap-4 md:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Shield className="text-blue-600 h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Your First Job, Made Simple.</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Briefcase className="text-amber-600 h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Fast lane to hire eager high schoolers</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <GraduationCap className="text-green-600 h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Partnering with schools to boost career readiness</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* 3-Step Job Search Process - With Snyk-inspired animations */}
      <motion.div 
        className="bg-white py-8 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="container mx-auto">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Find Your Dream Job In 
            <span className="relative inline-block ml-2">
              3 Easy Steps
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 15" preserveAspectRatio="none">
                <motion.path 
                  d="M0,5 Q50,15 100,5" 
                  stroke="#f59e0b" 
                  strokeWidth="3" 
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                />
              </svg>
            </span>
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            transition={{ staggerChildren: 0.2, delayChildren: 1.2 }}
          >
            <motion.div 
              className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">1</div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-blue-100 rounded-tl-full opacity-50"></div>
              <h3 className="text-lg font-medium mb-3 mt-2">Create Your Profile</h3>
              <p className="text-sm text-gray-700">Showcase your credentials, skills and preferences to match with the right opportunities.</p>
            </motion.div>
            
            <motion.div 
              className="bg-amber-50 p-6 rounded-lg border border-amber-100 text-center relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">2</div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-amber-100 rounded-tl-full opacity-50"></div>
              <h3 className="text-lg font-medium mb-3 mt-2">Browse Opportunities</h3>
              <p className="text-sm text-gray-700">Explore curated job listings from verified local employers seeking your specific skills.</p>
            </motion.div>
            
            <motion.div 
              className="bg-green-50 p-6 rounded-lg border border-green-100 text-center relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">3</div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-green-100 rounded-tl-full opacity-50"></div>
              <h3 className="text-lg font-medium mb-3 mt-2">Apply with Confidence</h3>
              <p className="text-sm text-gray-700">Submit applications with your verified credentials and get guidance throughout the process.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Employer Section - Snyk-inspired design */}
      <motion.div 
        className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-4 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <motion.div 
            className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-blue-700 opacity-30"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          ></motion.div>
          <motion.div 
            className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-blue-700 opacity-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
          ></motion.div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-3 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <span className="relative inline-block">
              Employers
              <Sparkles className="absolute -right-8 -top-6 h-6 w-6 text-amber-300 animate-pulse-slow" />
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            Post jobs and hire industry certified, credentialed students ready to contribute to your business.
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 1.4, staggerChildren: 0.2 }}
          >
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/15 transition-colors duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <CodeXml className="h-8 w-8 text-amber-300 mb-4" />
              <h3 className="text-xl font-medium mb-3 text-amber-300">Access Verified Talent</h3>
              <p className="text-sm text-blue-50">
                Connect with students who have earned industry-recognized credentials and are ready to apply their skills in real-world settings.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/15 transition-colors duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <Shield className="h-8 w-8 text-amber-300 mb-4" />
              <h3 className="text-xl font-medium mb-3 text-amber-300">Simple Hiring Process</h3>
              <p className="text-sm text-blue-50">
                Post opportunities, review pre-screened applications, and connect directly with qualified candidates.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Hero section is critical for initial render */}
      <HeroSection />
      
      {/* Top Jacksonville Employers with logos */}
      <Suspense fallback={<SectionSkeleton />}>
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Top Employers in Jacksonville</h2>
          <CompanyDirectory companies={topJacksonvilleCompanies.slice(0, 6)} />
        </div>
        
        <SectionSeparator />
        
        <FeaturedJobsSection />
        <TopEmployersSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <JobPlacementsSection />
        <PartnerLogosSection />
        <CallToActionSection />
      </Suspense>
    </div>
  );
};

export default EnhancedHero;
