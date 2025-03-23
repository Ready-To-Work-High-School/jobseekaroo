
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const IBMBadgesSection = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
          <path d="M14 2v6h6"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
          <path d="M10 9H8"></path>
        </svg>
        IBM SkillsBuild Digital Credentials
      </h3>

      <Card className="border-blue-100 shadow-sm mb-6">
        <CardContent className="p-6">
          <p className="text-gray-700 mb-4 text-lg italic">
            "Our students gain valuable digital credentials in emerging technologies, 
            preparing them for the future of work."
          </p>
          <p className="text-gray-700 mb-4">
            Students earn these industry-recognized digital credentials through IBM SkillsBuild, demonstrating their proficiency in emerging technologies and gaining a competitive edge in the workforce. These credentials validate skills in areas like artificial intelligence, entrepreneurship, and digital literacy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IBMBadgesSection;
