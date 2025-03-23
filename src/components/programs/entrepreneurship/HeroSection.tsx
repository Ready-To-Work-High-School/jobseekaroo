
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
                <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-4">
                  <div className="flex items-center gap-3 rounded-full bg-gray-100 px-4 py-2 border border-red-900">
                    <GraduationCap className="h-5 w-5 text-amber-500" />
                    <span className="font-medium text-gray-800">Advanced Academy</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-full bg-gray-100 px-4 py-2 border border-amber-700">
                    <Briefcase className="h-5 w-5 text-amber-500" />
                    <span className="font-medium text-gray-800">Industry Certifications</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-full bg-gray-100 px-4 py-2 border border-red-900">
                    <Award className="h-5 w-5 text-amber-500" />
                    <span className="font-medium text-gray-800">Dual Enrollment Credit</span>
                  </div>
                </div>
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
