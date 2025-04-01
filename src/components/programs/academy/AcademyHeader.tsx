
import React from 'react';

const AcademyHeader = () => {
  return <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-shrink-0">
          <img src="/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png" alt="Westside High School Logo" className="h-20 w-auto object-fill" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-left">Entrepreneurship Academy at Westside High School</h3>
          <p className="text-base text-gray-950">Career Technical Education | Duval County School District</p>
        </div>
      </div>
    </div>;
};

export default AcademyHeader;
