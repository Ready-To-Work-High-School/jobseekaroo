
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BadgeCheck } from 'lucide-react';

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
        <BadgeCheck className="h-5 w-5 text-blue-700" />
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
