
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
          
          {/* ESB Badge - MOVED UP above Program Benefits */}
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
      
      {/* Divider added above Nursing Academy - Changed from blue to maroon */}
      <Separator className="my-6 bg-gradient-to-r from-red-900 via-red-800 to-red-900 h-0.5" />
      
      {/* Enhanced Nursing Academy Section with Video */}
      <div className="mt-6 p-6 md:p-8 rounded-lg bg-gradient-to-r from-blue-50 to-red-50 border border-blue-100">
        <h3 className="text-2xl font-bold mb-4 text-blue-800">Nursing Academy</h3>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Video Section */}
          <div className="lg:w-1/2">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
              <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/niuASx8o_TA" 
                title="Certified Nursing Assistant Program" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="rounded-lg"
                loading="lazy"
              ></iframe>
            </div>
          </div>
          
          {/* Description Section */}
          <div className="lg:w-1/2">
            <p className="mb-4 text-gray-700 leading-relaxed">
              Students participating in the Certified Nursing Assistant Career Pathway will be prepared with the concepts and skills needed toward becoming competent and productive health care workers. Within this pathway, students learn to translate real-life situations into a caring, confidential, and safe medical environment.
            </p>
            <p className="mb-4 text-gray-700">
              Our Nursing Academy prepares students for healthcare careers through specialized training and industry-recognized credentials.
              Students learn essential healthcare skills and can earn NCLEX certification.
            </p>
            <div className="flex justify-center lg:justify-start">
              {/* Updated nursing badge with glow effect */}
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-lg blur-lg opacity-40 animate-pulse glow-blue-gold"></div>
                <LazyImage 
                  src="/lovable-uploads/df734ca8-d7b5-424e-a7ab-b2f87085851f.png" 
                  alt="Nursing Academy Certification" 
                  className="h-32 w-auto object-contain relative z-10"
                  width={180}
                  height={180}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-1 w-full bg-gradient-to-r from-red-900 via-amber-500 to-red-900"></div>
    </div>
  );
};

export default WestsideAcademy;
