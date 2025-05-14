
import React from 'react';
import { useFadeIn, useSlideIn } from '@/utils/animations';
import WestsideAcademy from '@/components/programs/WestsideAcademy';
import { Separator } from '@/components/ui/separator';
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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
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
      
      {/* Student Success Stories Section - MOVED UP above Tech Credentials */}
      <StudentSuccessSection />
      
      {/* Credentials & Certifications */}
      <section className={fadeIn}>
        <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-gray-50 to-gray-100">
          <BusinessCredentialsSection />
        </div>
      </section>
      
      {/* Tech Credentials & IBM/Microsoft Badges Section */}
      <section className={fadeIn}>
        <div className="container mx-auto px-4 py-8">
          <TechCredentialsSection />
        </div>
      </section>
      
      {/* New Competitive Edge Section */}
      <CompetitiveEdgeSection />
      
      <div className="container mx-auto px-4 py-8">
        <SectionSeparator className="my-8" />
        
        {/* Contact & Enrollment */}
        <section className={fadeIn}>
          <ContactEnrollmentSection />
        </section>
      </div>
    </div>
  );
};

export default EntrepreneurshipAcademy;
