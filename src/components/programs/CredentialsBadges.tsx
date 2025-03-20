
import React from 'react';
import SkillBadge from './SkillBadge';
import SectionHeading from './SectionHeading';
import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
  return <div className="p-8 rounded-xl shadow-sm border border-border bg-sky-200">
      <SectionHeading eyebrow="Florida Ready To Work Credentials" title="School High Distinction Scholars" description="Students may earn highly skilled digital badges, certificates and credentials which showcase career-ready skills, enhanced emerging technology knowledge and industry certification to potential employers" eyebrowColor="bg-primary/10 text-red-800" />
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
        {badges.map((badge, index) => <SkillBadge key={index} image={badge.image} name={badge.name} />)}
        
        {/* ESB Badge */}
        <div className="skill-badge hover:scale-105 transition-transform flex flex-col items-center">
          <div className="relative">
            <img src="/lovable-uploads/92527ccc-ba6d-4860-99fb-a70c0c3955b6.png" alt="ESB Certification" className="rounded-lg shadow-md h-25md:h-34 w-auto mx-auto\\n" />
            <Badge className="absolute -top-2 -right-2 bg-primary text-white">Industry Certification</Badge>
          </div>
          <p className="text-center text-sm font-medium mt-2">Entrepreneurship &amp; Small Business</p>
          <span className="text-xs text-muted-foreground text-center mt-1">
            Industry-recognized credential
          </span>
        </div>
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
            <p className="text-sm">Badges are verified and can be validated through the Florida Ready To Work program, IBM and credentialing agencies</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="gap-2" asChild>
            <a href="mailto:Colemanp3@duvalschools.org">
              Verify Student Credentials
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" className="gap-2" asChild>
            <a href="mailto:Colemanp3@duvalschools.org">
              Become a Partner Employer
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
        
        <div className="mt-6 text-right">
          
        </div>
      </div>
    </div>;
};
export default CredentialsBadges;
