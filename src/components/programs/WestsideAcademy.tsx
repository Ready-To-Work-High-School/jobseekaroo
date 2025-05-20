
import React from 'react';
import AcademyHeader from './academy/AcademyHeader';
import AcademyDescription from './academy/AcademyDescription';
import ProgramBenefits from './academy/ProgramBenefits';
import CourseCurriculum from './academy/CourseCurriculum';
import EntrepreneurshipStoreSection from './EntrepreneurshipStoreSection';
import { Separator } from '@/components/ui/separator';
import LazyImage from '@/components/LazyImage';

const WestsideAcademy = () => {
  return (
    <div className="rounded-xl overflow-hidden shadow-md mb-12 bg-gradient-to-br from-gray-200 to-gray-100 relative">
      {/* Academy Banner Image - Spans full width */}
      <div className="w-full overflow-hidden">
        <img 
          src="/lovable-uploads/09aa9c55-7120-40c3-8212-c2c0ab608abc.png" 
          alt="Advanced Academy Accreditation" 
          className="w-full h-auto object-cover"
          width={1200}
          height={300}
          loading="lazy"
        />
      </div>
      
      <div className="p-6 md:p-8 bg-gradient-to-b from-gray-100 to-gray-200 relative">
        {/* Academy Logo and Info */}
        <div className="relative z-10">
          <AcademyHeader />
          <AcademyDescription />
          
          {/* ESB Badge */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-lg blur-md opacity-30 animate-pulse"></div>
              <LazyImage 
                src="/lovable-uploads/92527ccc-ba6d-4860-99fb-a70c0c3955b6.png" 
                webpSrc="/lovable-uploads/92527ccc-ba6d-4860-99fb-a70c0c3955b6.webp"
                avifSrc="/lovable-uploads/92527ccc-ba6d-4860-99fb-a70c0c3955b6.avif"
                alt="ESB Certification" 
                className="h-32 w-auto relative z-10"
                width={180}
                height={180}
              />
            </div>
          </div>
          
          {/* Entrepreneurship School Store Section */}
          <div className="mb-10">
            <EntrepreneurshipStoreSection />
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <ProgramBenefits />
            <CourseCurriculum />
          </div>
        </div>
      </div>
      
      <div className="h-1 w-full bg-gradient-to-r from-red-900 via-amber-500 to-red-900"></div>
    </div>
  );
};

export default WestsideAcademy;
