
import React from 'react';
import AcademyHeader from './academy/AcademyHeader';
import AcademyDescription from './academy/AcademyDescription';
import ProgramBenefits from './academy/ProgramBenefits';
import CourseCurriculum from './academy/CourseCurriculum';

const WestsideAcademy = () => {
  return (
    <div className="rounded-xl overflow-hidden shadow-md mb-12 bg-secondary/10">
      {/* Academy Banner Image - Spans full width */}
      <div className="w-full overflow-hidden">
        <img 
          src="/lovable-uploads/09aa9c55-7120-40c3-8212-c2c0ab608abc.png" 
          alt="Advanced Academy Accreditation" 
          className="w-full h-auto object-cover"
        />
      </div>
      
      <div className="p-6 md:p-8 bg-sky-100">
        {/* Academy Logo and Info */}
        <AcademyHeader />
        <AcademyDescription />
        
        <div className="flex flex-col md:flex-row gap-6">
          <ProgramBenefits />
          <CourseCurriculum />
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300"></div>
    </div>
  );
};

export default WestsideAcademy;
