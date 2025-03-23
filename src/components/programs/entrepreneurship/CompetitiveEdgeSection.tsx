
import React from 'react';
import { Cpu, Sparkles, Search } from 'lucide-react';

const CompetitiveEdgeSection = () => {
  return <section className="py-12 bg-gradient-to-r from-sky-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Competitive Edge in the Workforce</h2>
              <p className="text-lg text-gray-700 mb-4">
                Westside High School students are gaining a competitive edge in the workforce before they even graduate through an 
                advanced-level curriculum that covers Entrepreneurship which may lead to Industry Certification curriculum.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Students also learn and earn digital credentials for emerging 21st century technology trends:
              </p>
              
              {/* Added accent box around competitive salaries */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md shadow-sm mb-4">
                <p className="text-blue-700 font-medium">
                  Competitive salaries, health benefits, and career advancement opportunities
                </p>
              </div>
              
              {/* Added job search label */}
              <div className="flex items-center gap-2 text-blue-600">
                <Search size={18} />
                <span className="font-medium">Job Search</span>
              </div>
            </div>
            
            <div className="md:w-1/2">
              
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default CompetitiveEdgeSection;
