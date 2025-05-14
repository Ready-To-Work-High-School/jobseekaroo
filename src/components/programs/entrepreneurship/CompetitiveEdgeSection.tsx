
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Award, TrendingUp } from 'lucide-react';

const CompetitiveEdgeSection = () => {
  const advantages = [
    {
      icon: <Star className="h-8 w-8 text-amber-500" />,
      title: "Industry Recognized Credentials",
      description: "Earn certifications valued by employers that validate your skills and expertise."
    },
    {
      icon: <Award className="h-8 w-8 text-red-700" />,
      title: "Real-World Experience",
      description: "Gain practical experience running the school store and participating in business competitions."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-700" />,
      title: "College & Career Ready",
      description: "Graduate with the skills, knowledge, and credentials to succeed in higher education or the workplace."
    }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-red-900 mb-4">Your Competitive Edge</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our Entrepreneurship Academy gives students advantages that set them apart in today's competitive job market and college applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {advantages.map((advantage, index) => (
            <Card key={index} className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-amber-200">
              <CardContent className="p-6 bg-white flex flex-col items-center text-center">
                <div className="mb-4 bg-gray-50 p-3 rounded-full">
                  {advantage.icon}
                </div>
                <h3 className="font-bold text-lg text-red-900 mb-2">{advantage.title}</h3>
                <p className="text-gray-700">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompetitiveEdgeSection;
