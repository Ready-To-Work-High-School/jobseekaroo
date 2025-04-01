
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PartnerLogosSection from '@/components/home/PartnerLogosSection';
import FAQSection from '@/components/home/FAQSection';
import CallToActionSection from '@/components/home/CallToActionSection';
import AdminToggle from '@/components/admin/AdminToggle';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const fadeIn = useFadeIn(300);
  const { user } = useAuth();

  return (
    <Layout>
      <div className={`w-full ${fadeIn}`}>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PartnerLogosSection />
        <FAQSection />
        <CallToActionSection />
        
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
