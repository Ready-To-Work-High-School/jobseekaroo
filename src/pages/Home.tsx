
import React from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useAuth } from '@/contexts/AuthContext';
import AdminToggle from '@/components/admin/AdminToggle';
import SearchSection from '@/components/home/SearchSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import FirstJobToolkit from '@/components/home/FirstJobToolkit';
import MayoSummerFeature from '@/components/home/MayoSummerFeature';
import FeeTeaser from '@/components/pricing/FeeTeaser';
import Hero from '@/components/Hero';
import SuccessStories from '@/components/home/SuccessStories';
import CallToActionSection from '@/components/home/CallToActionSection';
import UserRecommendationsSection from '@/components/home/UserRecommendationsSection';
import JobListings from '@/components/JobListings';
import UserProfile from '@/components/UserProfile';
import ApplicationForm from '@/components/ApplicationForm';
import SectionSeparator from '@/components/home/SectionSeparator';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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

      {/* Hero Section */}
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>

      <SectionSeparator />

      {/* Search Section */}
      <ErrorBoundary>
        <SearchSection />
      </ErrorBoundary>

      <SectionSeparator />

      {/* Missing Components: Job Listings */}
      <ErrorBoundary>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Latest Job Opportunities</h2>
            <Button asChild>
              <Link to="/jobs">View All Jobs</Link>
            </Button>
          </div>
          <JobListings />
          <div className="mt-6 text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/jobs">Browse More Jobs</Link>
            </Button>
          </div>
        </div>
      </ErrorBoundary>

      <SectionSeparator />

      {/* Missing Links Section */}
      <ErrorBoundary>
        <div className="container mx-auto px-4 py-8 bg-muted/30 rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-8">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Student Dashboard</h3>
                <p className="text-muted-foreground mb-4">Track your job applications and get personalized recommendations</p>
                <Button asChild className="w-full">
                  <Link to="/student-dashboard">Go to Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">My Profile</h3>
                <p className="text-muted-foreground mb-4">Update your personal information and resume</p>
                <Button asChild className="w-full">
                  <Link to="/profile">View Profile</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Saved Jobs</h3>
                <p className="text-muted-foreground mb-4">View and manage your saved job opportunities</p>
                <Button asChild className="w-full">
                  <Link to="/saved-jobs">View Saved Jobs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </ErrorBoundary>

      <SectionSeparator />

      {/* User Profile Section */}
      <ErrorBoundary>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <UserProfile />
            <div>
              <h3 className="text-xl font-semibold mb-4">Sample Application Form</h3>
              <ApplicationForm jobTitle="Sample Position" companyName="Demo Company" />
            </div>
          </div>
        </div>
      </ErrorBoundary>

      <SectionSeparator />

      {/* How It Works */}
      <ErrorBoundary>
        <HowItWorksSection />
      </ErrorBoundary>

      <SectionSeparator />

      {/* Success Stories */}
      <ErrorBoundary>
        <SuccessStories />
      </ErrorBoundary>

      <SectionSeparator />

      {/* Admin Toggle (if user is logged in) */}
      {user && (
        <div className="container mx-auto px-4 py-8">
          <AdminToggle />
        </div>
      )}
    </Layout>
  );
};

export default Home;
