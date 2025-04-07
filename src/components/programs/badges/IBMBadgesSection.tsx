
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BadgeCheck, Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LazyImage from '@/components/LazyImage';

interface IBMBadgeProps {
  image: string;
  webpImage?: string;
  avifImage?: string;
  name: string;
  subtitle: string;
  description: string;
}

const IBMBadgesSection = () => {
  const ibmBadges: IBMBadgeProps[] = [
    {
      image: "/lovable-uploads/56ca4b63-43dc-4b12-839f-533334c1e97e.png",
      webpImage: "/lovable-uploads/56ca4b63-43dc-4b12-839f-533334c1e97e.webp",
      avifImage: "/lovable-uploads/56ca4b63-43dc-4b12-839f-533334c1e97e.avif", 
      name: "IBM SkillsBuild Educator",
      subtitle: "Teacher Credential",
      description: "This credential validates an educator's ability to effectively teach IBM SkillsBuild content, implementing industry-relevant technology curriculum in the classroom."
    },
    {
      image: "/lovable-uploads/56ca4b63-43dc-4b12-839f-533334c1e97e.png",
      webpImage: "/lovable-uploads/56ca4b63-43dc-4b12-839f-533334c1e97e.webp",
      avifImage: "/lovable-uploads/56ca4b63-43dc-4b12-839f-533334c1e97e.avif",
      name: "IBM Artificial Intelligence Foundations",
      subtitle: "Student Credential",
      description: "This badge certifies proficiency in AI fundamentals, including machine learning concepts, neural networks, and practical applications of artificial intelligence."
    },
    {
      image: "/lovable-uploads/56ca4b63-43dc-4b12-839f-533334c1e97e.png",
      webpImage: "/lovable-uploads/56ca4b63-43dc-4b12-839f-533334c1e97e.webp",
      avifImage: "/lovable-uploads/56ca4b63-43dc-4b12-839f-533334c1e97e.avif",
      name: "IBM Cloud Computing Fundamentals",
      subtitle: "Student Credential",
      description: "Students earn this badge by demonstrating knowledge of cloud infrastructure, services, and deployment models used in modern business environments."
    }
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
        <BadgeCheck className="h-5 w-5 text-blue-700" />
        IBM Digital Badges
      </h3>

      <div className="space-y-6">
        {ibmBadges.map((badge, index) => (
          <Card key={index} className="border-blue-200 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="max-w-[180px] relative">
                  <Badge className="absolute -top-2 right-0 z-20 bg-blue-700">IBM</Badge>
                  <LazyImage 
                    src={badge.image} 
                    webpSrc={badge.webpImage}
                    avifSrc={badge.avifImage}
                    alt={badge.name} 
                    className="w-full h-auto rounded-md shadow-sm" 
                    width={180}
                    height={180}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">{badge.name}</h4>
                  <p className="text-sm text-blue-700 font-medium mb-2">{badge.subtitle}</p>
                  <p className="text-gray-700 mb-3">
                    {badge.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-800">Digital Credential</Badge>
                    <Badge className="bg-blue-100 text-blue-800">Industry-recognized</Badge>
                    <Badge className="bg-blue-100 text-blue-800">Professional Development</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-700" />
            <p className="text-sm font-medium text-blue-800">
              IBM digital badges are industry-recognized credentials that showcase skills in emerging technologies
            </p>
          </div>
          <Button className="bg-blue-700 hover:bg-blue-800" size="sm" asChild>
            <a href="https://www.ibm.com/training/credentials" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <span>Learn More</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IBMBadgesSection;
