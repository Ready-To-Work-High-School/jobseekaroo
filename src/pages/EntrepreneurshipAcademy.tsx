
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn, useSlideIn } from '@/utils/animations';
import WestsideAcademy from '@/components/programs/WestsideAcademy';
import EntrepreneurshipStoreSection from '@/components/programs/EntrepreneurshipStoreSection';
import { Separator } from '@/components/ui/separator';
import ProgramCards from '@/components/programs/ProgramCards';
import HeroSection from '@/components/programs/entrepreneurship/HeroSection';
import CompetitiveEdgeSection from '@/components/programs/entrepreneurship/CompetitiveEdgeSection';
import TechCredentialsSection from '@/components/programs/entrepreneurship/TechCredentialsSection';
import BusinessCredentialsSection from '@/components/programs/entrepreneurship/BusinessCredentialsSection';
import ContactEnrollmentSection from '@/components/programs/entrepreneurship/ContactEnrollmentSection';

const EntrepreneurshipAcademy = () => {
  const fadeIn = useFadeIn(300);
  const slideIn = useSlideIn(400);
  
  return (
    <Layout>
      {/* Hero Section */}
      <div className={slideIn}>
        <HeroSection />
      </div>
      
      {/* New Competitive Edge Section */}
      <CompetitiveEdgeSection />
      
      <div className="container mx-auto px-4 py-8">
        {/* Program Cards */}
        <section className={fadeIn}>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Our Programs</h2>
            <ProgramCards />
          </div>
        </section>
        
        {/* Academy Program Details */}
        <section className={fadeIn}>
          <div className="mb-12">
            <WestsideAcademy />
          </div>
        </section>
        
        <Separator className="my-16" />
        
        {/* School Store Section */}
        <section className={fadeIn}>
          <div className="mb-12">
            <EntrepreneurshipStoreSection />
          </div>
        </section>
        
        <Separator className="my-16" />
        
        {/* Tech Credentials & IBM/Microsoft Badges Section */}
        <section className={fadeIn}>
          <TechCredentialsSection />
        </section>
        
        <Separator className="my-16" />
        
        {/* Credentials & Certifications */}
        <section className={fadeIn}>
          <BusinessCredentialsSection />
        </section>
        
        <Separator className="my-16" />
        
        {/* Contact & Enrollment */}
        <section className={fadeIn}>
          <ContactEnrollmentSection />
        </section>
      </div>
    </Layout>
  );
};

export default EntrepreneurshipAcademy;
