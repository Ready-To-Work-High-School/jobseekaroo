
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SkillBadge from './SkillBadge';

const TechCredentialBadges = () => {
  const ibmBadges = [
    {
      image: "/lovable-uploads/f2b5c7b2-f480-4840-b7a7-50f8a96aa12a.png",
      name: "AI Foundations",
      subtitle: "A collaboration of ISTE and IBM"
    },
    {
      image: "/lovable-uploads/6318e351-902d-409d-adeb-27e50eb6dde7.png",
      name: "Getting Started with AI",
      subtitle: "IBM SkillsBuild"
    },
    {
      image: "/lovable-uploads/98d8b01c-1065-4c4f-8c7e-55c7c1c3e878.png",
      name: "Explore Emerging Tech",
      subtitle: "IBM SkillsBuild"
    }
  ];
  
  const microsoftBadges = [
    {
      image: "/lovable-uploads/33a2a707-cb1f-45e1-9f93-bb8816d721e6.png",
      name: "Microsoft Fundamentals",
      subtitle: "Microsoft Certified"
    }
  ];

  return (
    <div className="space-y-8">
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

        <Card className="border-blue-100 shadow-sm">
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Students earn these industry-recognized digital credentials through IBM SkillsBuild, demonstrating their proficiency in emerging technologies:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {ibmBadges.map((badge, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="bg-gradient-to-b from-cyan-50 to-cyan-100 p-3 rounded-lg hover:shadow-md transition-shadow">
                    <img 
                      src={badge.image} 
                      alt={badge.name} 
                      className="w-full max-w-[200px] h-auto rounded" 
                    />
                  </div>
                  <h4 className="text-base font-semibold mt-3 text-center">{badge.name}</h4>
                  <p className="text-sm text-gray-600 text-center">{badge.subtitle}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          Microsoft Certifications
        </h3>

        <Card className="border-blue-100 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="max-w-[220px]">
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
                <Badge className="mt-3 bg-blue-600 text-white">Industry-recognized credential</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TechCredentialBadges;
