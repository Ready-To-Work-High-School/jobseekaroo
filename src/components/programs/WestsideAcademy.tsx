
import React from 'react';
import AcademyHeader from './academy/AcademyHeader';
import AcademyDescription from './academy/AcademyDescription';
import ProgramBenefits from './academy/ProgramBenefits';
import CourseCurriculum from './academy/CourseCurriculum';
import EntrepreneurshipStoreSection from './EntrepreneurshipStoreSection';

const WestsideAcademy = () => {
  return (
    <div className="rounded-xl overflow-hidden shadow-md mb-12 bg-gradient-to-br from-gray-200 to-gray-100 relative">
      {/* Academy Banner Image - Spans full width */}
      <div className="w-full overflow-hidden">
        <img 
          src="/lovable-uploads/09aa9c55-7120-40c3-8212-c2c0ab608abc.png" 
          alt="Advanced Academy Accreditation" 
          className="w-full h-auto object-cover"
        />
      </div>
      
      <div className="p-6 md:p-8 bg-gradient-to-b from-gray-100 to-gray-200 relative">
        {/* Academy Logo and Info */}
        <div className="relative z-10">
          <AcademyHeader />
          <AcademyDescription />
          
          {/* Added School Store Section - Moved up before the program benefits */}
          <div className="mb-10">
            <EntrepreneurshipStoreSection />
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <ProgramBenefits />
            <CourseCurriculum />
          </div>
          
          {/* Nursing Academy Section */}
          <div className="mt-10 p-6 rounded-lg bg-gradient-to-r from-blue-50 to-red-50 border border-blue-100">
            <h3 className="text-2xl font-bold mb-4 text-blue-800">Nursing Academy</h3>
            <p className="mb-4">
              Our Nursing Academy prepares students for healthcare careers through specialized training and industry-recognized credentials.
              Students learn essential healthcare skills and can earn NCLEX certification.
            </p>
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/e624fc50-435f-4c99-96dc-bbace0660393.png" 
                alt="Nursing Academy Certification" 
                className="h-32 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-red-900 via-amber-500 to-red-900"></div>
    </div>
  );
};

export default WestsideAcademy;
