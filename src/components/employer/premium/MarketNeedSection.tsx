
import React from 'react';
import { Building2, Clock, Users, Award } from 'lucide-react';

const MarketNeedSection = () => {
  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-6">Market Need</h2>
      
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <p className="text-lg mb-4">
              Small businesses like retail shops, cafes, and local services need fast, reliable hiring solutions that connect them with motivated young workers.
            </p>
            <p className="mb-4">
              Our platform's focus on high school students, combined with powerful analytics and matching tools, delivers precisely what these businesses need to thrive.
            </p>
            <p className="font-medium">
              Job Seekers 4 HS premium features help you:
            </p>
            <ul className="mt-2 space-y-3">
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 mt-1" />
                <span>Reduce time-to-hire by focusing on pre-qualified candidates</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="h-5 w-5 text-blue-600 mt-1" />
                <span>Find motivated young workers for part-time, flexible positions</span>
              </li>
              <li className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-blue-600 mt-1" />
                <span>Build a pipeline of trained talent for your business</span>
              </li>
              <li className="flex items-start gap-3">
                <Award className="h-5 w-5 text-blue-600 mt-1" />
                <span>Connect with students who have verified skills and credentials</span>
              </li>
            </ul>
          </div>
          
          <div className="md:w-1/3 flex items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-300 rounded-full blur-lg opacity-30"></div>
              <img 
                src="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.png" 
                alt="Job Seekers 4 HS" 
                className="h-32 w-auto relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketNeedSection;
