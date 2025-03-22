
import React from 'react';

const AcademyDescription = () => {
  return (
    <div className="bg-white p-4 rounded-lg mb-6">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
            <circle cx="17" cy="7" r="5" />
          </svg>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-1">Advanced Academy Program</h4>
          <p className="text-muted-foreground">
            The Entrepreneurship Academy is designated as an Advanced Academy, which means it offers a rigorous curriculum with accelerated coursework, industry certifications, and college credit opportunities. Advanced Academies prepare students for both higher education and direct entry into competitive career fields with high skill and wage potential.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcademyDescription;
