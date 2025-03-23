
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn, useSlideIn } from '@/utils/animations';
import WestsideAcademy from '@/components/programs/WestsideAcademy';
import { Separator } from '@/components/ui/separator';
import ProgramCards from '@/components/programs/ProgramCards';
import HeroSection from '@/components/programs/entrepreneurship/HeroSection';
import CompetitiveEdgeSection from '@/components/programs/entrepreneurship/CompetitiveEdgeSection';
import TechCredentialsSection from '@/components/programs/entrepreneurship/TechCredentialsSection';
import BusinessCredentialsSection from '@/components/programs/entrepreneurship/BusinessCredentialsSection';
import ContactEnrollmentSection from '@/components/programs/entrepreneurship/ContactEnrollmentSection';
import StudentSuccessSection from '@/components/programs/entrepreneurship/StudentSuccessSection';
import SectionSeparator from '@/components/home/SectionSeparator';

const EntrepreneurshipAcademy = () => {
  const fadeIn = useFadeIn(300);
  const slideIn = useSlideIn(400);
  
  return (
    <Layout>
      {/* Hero Section */}
      <div className={slideIn}>
        <HeroSection />
      </div>
      
      {/* Advanced Academy Section - Moved to top after hero */}
      <section className={fadeIn}>
        <div className="container mx-auto px-4 py-8">
          <WestsideAcademy />
        </div>
      </section>
      
      {/* Tech Credentials & IBM/Microsoft Badges Section - Moved up above Competitive Edge */}
      <section className={fadeIn}>
        <div className="container mx-auto px-4 py-8">
          <TechCredentialsSection />
        </div>
      </section>
      
      {/* Credentials & Certifications */}
      <section className={fadeIn}>
        <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-gray-50 to-gray-100">
          <BusinessCredentialsSection />
        </div>
      </section>
      
      {/* New Competitive Edge Section */}
      <CompetitiveEdgeSection />
      
      {/* Student Success Stories Section */}
      <StudentSuccessSection />
      
      <div className="container mx-auto px-4 py-8">
        {/* Program Cards */}
        <section className={fadeIn}>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-red-900 mb-8 text-center">Our Programs</h2>
            <ProgramCards />
          </div>
        </section>
        
        <SectionSeparator className="my-8" />
        
        {/* Contact & Enrollment */}
        <section className={fadeIn}>
          <ContactEnrollmentSection />
        </section>
      </div>
    </Layout>
  );
};

export default EntrepreneurshipAcademy;
