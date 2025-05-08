
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import JobListings from '@/components/JobListings';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Briefcase, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Jobs = () => {
  // Log when the component mounts to debug
  useEffect(() => {
    console.log('Jobs page mounted');
  }, []);

  return (
    <Layout>
      <div className="bg-gradient-to-b from-blue-50/50 via-purple-50/30 to-transparent dark:from-blue-950/20 dark:via-purple-950/10">
        <div className="container mx-auto px-4 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Find Your Perfect First Job
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover amazing opportunities tailored for high school students. Start your career journey today!
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-white/50 dark:bg-white/5 px-4 py-2 rounded-full shadow-sm"
              >
                <Star className="h-5 w-5 text-amber-500" />
                <span>Entry-Level Friendly</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-white/50 dark:bg-white/5 px-4 py-2 rounded-full shadow-sm"
              >
                <Briefcase className="h-5 w-5 text-blue-500" />
                <span>Flexible Hours</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-white/50 dark:bg-white/5 px-4 py-2 rounded-full shadow-sm"
              >
                <Sparkles className="h-5 w-5 text-purple-500" />
                <span>Growth Opportunities</span>
              </motion.div>
            </div>

            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
              <Link to="/job-listings">
                <Briefcase className="mr-2 h-5 w-5" />
                Start Your Search
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Browse Jobs</h2>
        <JobListings />
      </div>
    </Layout>
  );
};

export default Jobs;
