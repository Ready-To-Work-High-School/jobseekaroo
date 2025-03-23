import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Briefcase, Award } from 'lucide-react';
const HeroSection = () => {
  return <section className="py-12 bg-inherit md:py-0">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-amber-500 to-blue-500">
                Entrepreneurship Academy
              </span>
              <span className="block mt-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-red-700 to-red-900">at</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-900 via-gray-700 to-gray-900">Westside High <span className="text-gray-700">School</span></span>
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Developing the next generation of business leaders and innovators
            </p>
          </div>
          
          <div>
            <Card className="bg-white/80 backdrop-blur border-amber-700/50 shadow-md">
              <CardContent className="p-6">
                
                <p className="text-gray-700">
                  The Entrepreneurship Academy is a specialized program that provides students with real-world business experience,
                  industry-recognized certifications, and a pathway to college and career readiness.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;