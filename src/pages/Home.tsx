
import React from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet-async';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useAuth } from '@/hooks/useAuth';
import Hero from '@/components/Hero';
import JobListings from '@/components/JobListings';
import TopEmployersSection from '@/components/job/TopEmployersSection';
import TopJobsSection from '@/components/job/TopJobsSection';
import { motion } from 'framer-motion';

const Home = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Helmet>
        <title>Job Seekers 4 HS - Your First Job, Made Simple.</title>
        <meta 
          name="description" 
          content="A fun, safe, mobile-first app to land your first job, with badges and guidance. For high school students at Westside High School." 
        />
      </Helmet>

      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>

      <ErrorBoundary>
        <TopEmployersSection />
      </ErrorBoundary>

      <ErrorBoundary>
        <TopJobsSection />
      </ErrorBoundary>

      <ErrorBoundary>
        <motion.section 
          className="py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Job Opportunities</h2>
            <JobListings />
          </div>
        </motion.section>
      </ErrorBoundary>

      {user && (
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Welcome back, {user.email}!</p>
        </div>
      )}
    </Layout>
  );
};

export default Home;
