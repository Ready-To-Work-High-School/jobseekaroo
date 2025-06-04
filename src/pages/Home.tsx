
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Briefcase, User, Calendar, Award } from 'lucide-react';

const Home = () => {
  const { user, userProfile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Job Seekers 4 HS - Your First Job, Made Simple.</title>
        <meta 
          name="description" 
          content="A fun, safe, mobile-first app to land your first job, with badges and guidance. For high school students at Westside High School." 
        />
      </Helmet>

      {/* Welcome section for authenticated users */}
      {user && (
        <ErrorBoundary>
          <motion.section 
            className="py-8 bg-gradient-to-r from-blue-50 to-green-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Welcome Back!</CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {userProfile?.first_name ? `Hi, ${userProfile.first_name}!` : 'Hi there!'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Ready to find your next opportunity?
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Your Status</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {userProfile?.user_type === 'student' ? 'Student' : 
                       userProfile?.user_type === 'employer' ? 'Employer' : 
                       userProfile?.user_type === 'admin' ? 'Admin' : 'User'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Account type: {userProfile?.user_type || 'Not set'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {userProfile?.user_type === 'student' ? (
                      <>
                        <Button asChild size="sm" className="w-full">
                          <Link to="/jobs">Find Jobs</Link>
                        </Button>
                        <Button asChild variant="outline" size="sm" className="w-full">
                          <Link to="/profile">My Profile</Link>
                        </Button>
                      </>
                    ) : userProfile?.user_type === 'employer' ? (
                      <>
                        <Button asChild size="sm" className="w-full">
                          <Link to="/employer-dashboard">Dashboard</Link>
                        </Button>
                        <Button asChild variant="outline" size="sm" className="w-full">
                          <Link to="/post-job">Post Job</Link>
                        </Button>
                      </>
                    ) : (
                      <Button asChild size="sm" className="w-full">
                        <Link to="/dashboard">Dashboard</Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.section>
        </ErrorBoundary>
      )}

      {/* Hero section - show for non-authenticated users or as secondary content */}
      <ErrorBoundary>
        {!user && <Hero />}
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
    </Layout>
  );
};

export default Home;
