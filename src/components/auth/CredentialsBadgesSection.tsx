
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Award, BadgeCheck, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CredentialsBadgesSection = () => {
  // Credential badge data
  const readyToWorkBadges = [
    {
      image: "/lovable-uploads/c67cc463-3678-4af8-864e-31d0daa26ac7.png",
      name: "Career Exploration",
      width: 100,
      height: 100
    },
    {
      image: "/lovable-uploads/06372f1b-6e04-4b68-8afc-231f9529270e.png",
      name: "Communication",
      width: 100,
      height: 100
    },
    {
      image: "/lovable-uploads/b96e959f-99d4-498f-ba6f-8dd2871db916.png",
      name: "Professionalism",
      width: 100,
      height: 100
    },
    {
      image: "/lovable-uploads/c505c04a-b131-4528-b7be-676fde548fa1.png",
      name: "Florida Soft Skills",
      width: 100,
      height: 100
    },
    {
      image: "/lovable-uploads/8c5ed117-c79a-4c36-9d1a-0879567002c1.png",
      name: "Team Building",
      width: 100,
      height: 100
    },
    {
      image: "/lovable-uploads/46b0f373-3093-499f-97b2-25610a4344d9.png",
      name: "Capstone Experience",
      width: 100,
      height: 100
    },
    {
      image: "/lovable-uploads/c96aadf1-ef42-4e8f-a4e3-de0e999cba2d.png",
      name: "Problem Solving",
      width: 100,
      height: 100
    }
  ];
  
  const esbBadge = "/lovable-uploads/92527ccc-ba6d-4860-99fb-a70c0c3955b6.png";
  const nursingBadge = "/lovable-uploads/e624fc50-435f-4c99-96dc-bbace0660393.png";
  
  return (
    <Card className="border-blue-200 shadow-md">
      <CardHeader className="bg-blue-50 border-b border-blue-200">
        <CardTitle className="text-xl flex items-center gap-2">
          <BadgeCheck className="h-5 w-5 text-blue-600" />
          Industry-Recognized Credentials
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-2">High School Scholars Distinction</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Students can earn these digital badges which showcase career-ready skills and enhanced knowledge
          </p>
          
          <div className="inline-flex items-center gap-2 mb-4">
            <Badge variant="brandSolid" className="text-sm py-1">
              <Award className="h-4 w-4 mr-1" />
              Florida Ready to Work
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-6">
          {readyToWorkBadges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 relative hover:scale-110 transition-transform duration-200">
                <img 
                  src={badge.image} 
                  alt={badge.name} 
                  className="w-full h-full object-contain"
                  width={badge.width} 
                  height={badge.height}
                />
              </div>
              <p className="text-xs text-center mt-1">{badge.name}</p>
            </div>
          ))}
        </div>
        
        <div className="flex flex-row justify-center gap-6 mb-6">
          {/* ESB Badge */}
          <div className="flex flex-col items-center">
            <Badge variant="new" className="text-sm py-1 mb-3">
              <Shield className="h-4 w-4 mr-1" />
              ESB Industry Certification
            </Badge>
            
            <div className="relative w-24 h-24 md:w-28 md:h-28 hover:scale-110 transition-transform duration-200">
              <div className="absolute inset-0 bg-blue-400 rounded-lg blur-sm opacity-20 animate-pulse"></div>
              <img 
                src={esbBadge} 
                alt="ESB Certification" 
                className="w-full h-full object-contain relative z-10 rounded-md" 
                width={140}
                height={140}
              />
            </div>
            <p className="text-xs text-center mt-2 text-red-800">Entrepreneurship & Small Business</p>
          </div>
          
          {/* Nursing Badge - with matching effects */}
          <div className="flex flex-col items-center">
            <Badge variant="new" className="text-sm py-1 mb-3">
              <Shield className="h-4 w-4 mr-1" />
              CNA Certification
            </Badge>
            
            <div className="relative w-24 h-24 md:w-28 md:h-28 hover:scale-110 transition-transform duration-200">
              <div className="absolute inset-0 bg-blue-400 rounded-lg blur-sm opacity-20 animate-pulse"></div>
              <img 
                src={nursingBadge} 
                alt="Nursing Certification" 
                className="w-full h-full object-contain relative z-10 rounded-md" 
                width={140}
                height={140}
              />
            </div>
            <p className="text-xs text-center mt-2 text-red-800">Certified Nursing Assistant</p>
          </div>
        </div>
        
        <p className="text-xs text-center text-muted-foreground">
          Sign in or sign up to see more details about these valuable credentials and how they can boost your career
        </p>
      </CardContent>
    </Card>
  );
};

export default CredentialsBadgesSection;
