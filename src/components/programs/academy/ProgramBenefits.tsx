
import React from 'react';
import { ChevronRight } from 'lucide-react';

const ProgramBenefits = () => {
  return (
    <div className="md:w-1/2">
      <div className="flex items-center gap-2 mb-4 mx-[45px]">
        <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
        </div>
        <h4 className="text-lg font-semibold text-center">Program Benefits</h4>
      </div>
      <ul className="bg-white rounded-lg p-5 shadow-sm border border-border space-y-3">
        <li className="flex items-start gap-2">
          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <span className="font-bold">Industry certifications in Entrepreneurship & Small Business</span>
        </li>
        <li className="flex items-start gap-2">
          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <span className="font-bold text-base">College credit through dual enrollment opportunities</span>
        </li>
        <li className="flex items-start gap-2">
          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <span className="font-bold">Real-world business experience through community partnerships</span>
        </li>
        <li className="flex items-start gap-2">
          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <span className="font-bold">Preferential consideration for scholarships and internships</span>
        </li>
      </ul>
    </div>
  );
};

export default ProgramBenefits;
