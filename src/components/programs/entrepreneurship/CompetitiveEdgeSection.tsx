
import React from 'react';
import { Cpu, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CompetitiveEdgeSection = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-sky-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Competitive Edge in the Workforce</h2>
              <Card className="border-blue-200 shadow-md mb-6">
                <CardContent className="p-5 bg-blue-50">
                  <p className="text-lg text-gray-700 font-medium">
                    Westside High School students are gaining a competitive edge in the workforce before they even graduate through an 
                    advanced-level curriculum that covers Entrepreneurship which may lead to Industry Certification curriculum.
                  </p>
                </CardContent>
              </Card>
              
              <div className="relative mb-6">
                <Card className="border-amber-300 shadow-md">
                  <CardContent className="p-5 bg-amber-50">
                    <p className="text-lg text-gray-700 font-medium">
                      Competitive salaries, health benefits, and professional development opportunities await our credentialed graduates.
                    </p>
                  </CardContent>
                </Card>
                <Badge variant="info" className="absolute -bottom-3 left-4 shadow-sm">
                  Job Search
                </Badge>
              </div>
              
              <p className="text-lg text-gray-700">
                Students also learn and earn digital credentials for emerging 21st century technology trends:
              </p>
            </div>
            
            <div className="md:w-1/2">
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveEdgeSection;
