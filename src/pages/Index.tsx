
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

const Index = () => {
  const fadeIn = useFadeIn(300);
  const { user } = useAuth();

  // Add debug log to track user status
  console.log('Index page loaded, user authenticated:', !!user);

  return (
    <Layout>
      <div className={`w-full ${fadeIn}`}>
        {/* Info banner with key message */}
        <InfoBanner />
        
        {/* Mayo Clinic Feature moved to top */}
        <div className="container mx-auto px-4 mb-8">
          <MayoSummerFeature />
        </div>
        
        {/* First Job Toolkit MOVED UP above pricing */}
        <FirstJobToolkit />
        
        {/* Simple pricing for employers */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-center mb-6">Simple Pricing for Employers</h2>
          <FeeTeaser />
        </div>
        
        {/* Dropdown for credentials */}
        <CredentialsDropdown />
        
        {/* Prominent JS4HS Logo Display */}
        <BrandLogo />
        
        {/* Featured Programs Section */}
        <FeaturedProgramsSection />
        
        {/* Quick access buttons */}
        <QuickAccessButtons />
        
        {/* Admin toggle card for easy access */}
        {user && (
          <div className="container mx-auto px-4 py-8">
            <AdminToggle />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
