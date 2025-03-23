
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Briefcase, Award } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-blue-50 to-amber-50/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-blue-800">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-amber-400 to-blue-500">
                Entrepreneurship Academy
              </span>
              <span className="block mt-2">at <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-800 via-gray-800 to-black">Westside High <span className="text-black">School</span></span></span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Developing the next generation of business leaders and innovators
            </p>
          </div>
          
          <div>
            <Card className="bg-white/80 backdrop-blur border-amber-200 shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-4">
                  <div className="flex items-center gap-3 rounded-full bg-blue-50 px-4 py-2 border border-blue-100">
                    <GraduationCap className="h-5 w-5 text-blue-700" />
                    <span className="font-medium">Advanced Academy</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-full bg-amber-50 px-4 py-2 border border-amber-100">
                    <Briefcase className="h-5 w-5 text-amber-600" />
                    <span className="font-medium">Industry Certifications</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-full bg-green-50 px-4 py-2 border border-green-100">
                    <Award className="h-5 w-5 text-green-600" />
                    <span className="font-medium">College Credit</span>
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
    </section>
  );
};

export default HeroSection;
