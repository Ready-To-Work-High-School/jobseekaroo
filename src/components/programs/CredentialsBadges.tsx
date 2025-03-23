
import React from 'react';
import SkillBadge from './SkillBadge';
import SectionHeading from './SectionHeading';
import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
const CredentialsBadges = () => {
  const badges = [{
    image: "/lovable-uploads/c67cc463-3678-4af8-864e-31d0daa26ac7.png",
    name: "Career Exploration"
  }, {
    image: "/lovable-uploads/06372f1b-6e04-4b68-8afc-231f9529270e.png",
    name: "Communication"
  }, {
    image: "/lovable-uploads/b96e959f-99d4-498f-ba6f-8dd2871db916.png",
    name: "Professionalism"
  }, {
    image: "/lovable-uploads/c505c04a-b131-4528-b7be-676fde548fa1.png",
    name: "Florida Soft Skills"
  }, {
    image: "/lovable-uploads/8c5ed117-c79a-4c36-9d1a-0879567002c1.png",
    name: "Team Building"
  }, {
    image: "/lovable-uploads/46b0f373-3093-499f-97b2-25610a4344d9.png",
    name: "Capstone Experience"
  }, {
    image: "/lovable-uploads/c96aadf1-ef42-4e8f-a4e3-de0e999cba2d.png",
    name: "Problem Solving"
  }];
  
  const additionalBadges = [
    {
      image: "/lovable-uploads/010059ca-3c6a-4e41-bcc3-d47749b4bd09.png",
      name: "Getting Started with AI",
      issuer: "IBM SkillsBuild"
    },
    {
      image: "/lovable-uploads/c9f00526-d2b8-49f3-850d-81bf63640baa.png",
      name: "Explore Emerging Tech",
      issuer: "IBM SkillsBuild"
    },
    {
      image: "/lovable-uploads/5d60294c-1d85-4c16-b0e2-e3060c0b36f4.png",
      name: "Business Essentials",
      issuer: "IBM SkillsBuild"
    },
    {
      image: "/lovable-uploads/1fd371ba-b6b6-4c2e-942b-4489f5e883d5.png",
      name: "AI Foundations for Educators",
      issuer: "IBM SkillsBuild"
    },
    {
      image: "/lovable-uploads/535a5afb-2d01-4358-a4a7-4844cd3ad3cf.png",
      name: "Microsoft Certified",
      issuer: "Microsoft"
    }
  ];
  
  return <div className="p-8 rounded-xl shadow-xl border-2 border-blue-200 bg-gradient-to-br from-sky-100 to-blue-100">
      {/* Fancy border above High School Scholars Distinction */}
      <div className="mb-8">
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-0.5 bg-amber-400"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 px-6 py-2 rounded-full text-white font-bold shadow-md">
              Scholar Achievement
            </div>
          </div>
        </div>
      </div>
      
      <SectionHeading eyebrow="" title="High School Scholars Distinction" description="Students may earn highly skilled digital badges, certificates and credentials which showcase career-ready skills, enhanced emerging technology knowledge and industry certification to potential employers" eyebrowColor="" titleClassName="text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 bg-clip-text text-transparent font-extrabold" />
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 mb-8">
        {badges.map((badge, index) => <SkillBadge key={index} image={badge.image} name={badge.name} />)}
      </div>
      
      <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">Industry-Recognized Certifications</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-8 bg-white/80 p-6 rounded-lg shadow-md border border-blue-200">
        {additionalBadges.map((badge, index) => (
          <div key={index} className="skill-badge transform hover:scale-110 transition-all duration-300 flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-lg blur-sm opacity-20 animate-pulse"></div>
              <img src={badge.image} alt={badge.name} className="rounded-lg shadow-lg h-24 md:h-32 w-auto mx-auto relative z-10 object-contain" />
              <Badge className={`absolute -top-2 -right-2 ${badge.issuer === 'Microsoft' ? 'bg-blue-700' : 'bg-amber-500'} text-white shadow-md z-20`}>
                {badge.issuer}
              </Badge>
            </div>
            <p className="text-center text-sm font-semibold mt-2">{badge.name}</p>
          </div>
        ))}
      </div>
      
      {/* ESB Badge */}
      <div className="w-full flex justify-center mb-8">
        <div className="skill-badge transform hover:scale-110 transition-all duration-300 flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400 rounded-lg blur-sm opacity-20 animate-pulse"></div>
            <img src="/lovable-uploads/92527ccc-ba6d-4860-99fb-a70c0c3955b6.png" alt="ESB Certification" className="rounded-lg shadow-lg h-32 md:h-40 w-auto mx-auto relative z-10 object-fill" />
            <Badge className="absolute -top-2 -right-2 bg-red-600 text-white shadow-md z-20">Industry Certification</Badge>
          </div>
          <p className="text-center text-sm font-semibold mt-2">Entrepreneurship &amp; Small Business</p>
          <span className="text-xs text-blue-800 text-center mt-1 font-medium">
            Industry-recognized credential
          </span>
        </div>
      </div>
      
      <div className="mt-12 bg-white/80 p-6 rounded-lg shadow-md border border-blue-200">
        <h3 className="text-xl font-bold mb-4 text-blue-900 text-center">For Employers</h3>
        <div className="space-y-3 mb-6">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0" />
            <p className="text-sm font-medium">Students with these credentials demonstrate workforce readiness</p>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0" />
            <p className="text-sm font-medium">Each badge represents completion of industry-standard assessments</p>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0" />
            <p className="text-sm font-medium">Badges are verified and can be validated through the Florida Ready To Work program, IBM and credentialing agencies</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="gap-2 bg-blue-700 hover:bg-blue-800 shadow-md" asChild>
            <a href="mailto:Colemanp3@duvalschools.org">
              Verify Student Credentials
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" className="gap-2 border-blue-700 text-blue-700 hover:bg-blue-50 shadow-sm" asChild>
            <a href="mailto:Colemanp3@duvalschools.org">
              Become a Partner Employer
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>;
};
export default CredentialsBadges;
