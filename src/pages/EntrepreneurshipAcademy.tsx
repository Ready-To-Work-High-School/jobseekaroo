
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
      
      {/* Credentials & Certifications - Moved up near Academy section */}
      <section className={fadeIn}>
        <div className="container mx-auto px-4 py-8">
          <BusinessCredentialsSection />
        </div>
      </section>
      
      {/* New Competitive Edge Section */}
      <CompetitiveEdgeSection />
      
      {/* Student Success Stories Section - Added new section */}
      <StudentSuccessSection />
      
      <div className="container mx-auto px-4 py-8">
        {/* Program Cards */}
        <section className={fadeIn}>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Our Programs</h2>
            <ProgramCards />
          </div>
        </section>
        
        <Separator className="my-16" />
        
        <Separator className="my-16" />
        
        {/* Tech Credentials & IBM/Microsoft Badges Section */}
        <section className={fadeIn}>
          <TechCredentialsSection />
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
