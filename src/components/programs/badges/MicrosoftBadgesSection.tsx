
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BadgeProps {
  image: string;
  name: string;
  subtitle: string;
}

const MicrosoftBadgesSection = () => {
  const microsoftBadges: BadgeProps[] = [
    {
      image: "/lovable-uploads/33a2a707-cb1f-45e1-9f93-bb8816d721e6.png",
      name: "Microsoft Fundamentals",
      subtitle: "Microsoft Certified"
    }
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-red-800 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-red-700">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        Microsoft Certifications
      </h3>

      <Card className="border-red-200 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="max-w-[220px] relative">
              <Badge className="absolute -top-2 right-0 z-20 bg-red-700" size="sm">Microsoft</Badge>
              <img 
                src={microsoftBadges[0].image} 
                alt={microsoftBadges[0].name} 
                className="w-full h-auto" 
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">{microsoftBadges[0].name}</h4>
              <p className="text-gray-700">
                Students can earn Microsoft Fundamentals certifications, validating their knowledge of cloud concepts, core Microsoft 365 services, and security, compliance, and privacy in Microsoft 365. These certifications provide a foundation for future technology education and career paths.
              </p>
              <Badge className="mt-3 bg-red-800 text-white" size="sm">Industry-recognized credential</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MicrosoftBadgesSection;
