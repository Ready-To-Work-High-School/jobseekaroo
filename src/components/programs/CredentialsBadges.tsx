
import React from 'react';
import SkillBadge from './SkillBadge';
import SectionHeading from './SectionHeading';
import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink } from 'lucide-react';

const CredentialsBadges = () => {
  const badges = [
    { image: "/lovable-uploads/c67cc463-3678-4af8-864e-31d0daa26ac7.png", name: "Career Exploration" },
    { image: "/lovable-uploads/06372f1b-6e04-4b68-8afc-231f9529270e.png", name: "Communication" },
    { image: "/lovable-uploads/b96e959f-99d4-498f-ba6f-8dd2871db916.png", name: "Professionalism" },
    { image: "/lovable-uploads/c505c04a-b131-4528-b7be-676fde548fa1.png", name: "Florida Soft Skills" },
    { image: "/lovable-uploads/8c5ed117-c79a-4c36-9d1a-0879567002c1.png", name: "Team Building" },
    { image: "/lovable-uploads/46b0f373-3093-499f-97b2-25610a4344d9.png", name: "Capstone Experience" },
    { image: "/lovable-uploads/c96aadf1-ef42-4e8f-a4e3-de0e999cba2d.png", name: "Problem Solving" },
  ];

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-border">
      <SectionHeading
        eyebrow="Florida Ready To Work Credentials"
        title="Duval County School High Distinction"
        description="Students earn digital badges and credentials to showcase career-ready skills to potential employers"
        eyebrowColor="bg-primary/10 text-red-800"
      />
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
        {badges.map((badge, index) => (
          <SkillBadge key={index} image={badge.image} name={badge.name} />
        ))}
      </div>
      
      <div className="mt-12 bg-secondary/20 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">For Employers</h3>
        <div className="space-y-3 mb-6">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
            <p className="text-sm">Students with these credentials demonstrate workforce readiness</p>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
            <p className="text-sm">Each badge represents completion of industry-standard assessments</p>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
            <p className="text-sm">Badges are verified and can be validated through the Florida Ready To Work program</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="gap-2">
            Verify Student Credentials
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </Button>
          <Button variant="outline" className="gap-2" asChild>
            <a href="mailto:Colemanp3@duvalschools.org">
              Become a Partner Employer
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
        
        <div className="mt-6 text-right">
          <span className="inline-block font-medium text-primary">Created by Ms. Coleman</span>
        </div>
      </div>
    </div>
  );
};

export default CredentialsBadges;
