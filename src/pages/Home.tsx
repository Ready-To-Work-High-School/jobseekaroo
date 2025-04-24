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
import SectionSeparator from '@/components/home/SectionSeparator';
import { EmployerSection } from '@/components/hero/EmployerSection';
import { CompanySpotlight } from '@/components/company/CompanySpotlight';
import { FloatingQuickAccess } from '@/components/navigation/FloatingQuickAccess';
import TroubleshootDialog from '@/components/troubleshooting/TroubleshootDialog';

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

      <SectionSeparator />

      <ErrorBoundary>
        <SearchSection />
      </ErrorBoundary>

      <SectionSeparator />

      <ErrorBoundary>
        <EmployerSection />
      </ErrorBoundary>

      <SectionSeparator />

      <ErrorBoundary>
        <CompanySpotlight />
      </ErrorBoundary>

      <SectionSeparator />

      <ErrorBoundary>
        <HowItWorksSection />
      </ErrorBoundary>

      <SectionSeparator />

      <ErrorBoundary>
        <SuccessStories />
      </ErrorBoundary>

      <SectionSeparator />

      <ErrorBoundary>
        <FirstJobToolkit />
      </ErrorBoundary>

      <SectionSeparator />

      <ErrorBoundary>
        <MayoSummerFeature />
      </ErrorBoundary>

      <SectionSeparator />

      <ErrorBoundary>
        <FeeTeaser />
      </ErrorBoundary>

      {user && (
        <div className="container mx-auto px-4 py-8">
          <AdminToggle />
        </div>
      )}

      <div className="container mx-auto px-4 pb-12">
        <TroubleshootDialog />
      </div>

      <FloatingQuickAccess />
    </Layout>
  );
};

export default Home;
