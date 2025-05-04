
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import SearchSection from '@/components/home/SearchSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import CallToActionSection from '@/components/home/CallToActionSection';
import PartnerLogosSection from '@/components/home/PartnerLogosSection';
import FeaturedProgramsSection from '@/components/home/FeaturedProgramsSection';
import GeoJsonDownload from '@/components/geo/GeoJsonDownload';

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <PartnerLogosSection />
      <FeaturesSection />
      <SearchSection />
      <FeaturedProgramsSection />
      <TestimonialsSection />
      <FAQSection />
      
      <div className="container mx-auto mb-12 px-4">
        <GeoJsonDownload />
      </div>
      
      <CallToActionSection />
    </Layout>
  );
};

export default Home;
