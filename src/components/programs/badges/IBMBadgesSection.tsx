
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BadgeProps {
  image: string;
  name: string;
  subtitle: string;
}

const IBMBadgesSection = () => {
  const ibmBadges: BadgeProps[] = [
    {
      image: "/lovable-uploads/56ca4b63-43dc-4b12-839f-533334c1e97e.png",
      name: "IBM Digital Badge",
      subtitle: "Industry Recognized"
    }
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-700">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        IBM Digital Badges
      </h3>

      <Card className="border-blue-200 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="max-w-[220px] relative">
              <Badge className="absolute -top-2 right-0 z-20 bg-blue-700">IBM</Badge>
              <img 
                src={ibmBadges[0].image} 
                alt={ibmBadges[0].name} 
                className="w-full h-auto" 
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">{ibmBadges[0].name}</h4>
              <p className="text-gray-700">
                This IBM Digital Badge is for teachers who complete specialized training. Teachers can earn these credentials in Cloud Computing, Cybersecurity, Data Science, and AI, enabling them to effectively instruct students in these high-demand technology fields. The badge represents professional development and instructional expertise recognized by employers worldwide.
              </p>
              <Badge className="mt-3 bg-blue-800 text-white">Industry-recognized credential</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IBMBadgesSection;
