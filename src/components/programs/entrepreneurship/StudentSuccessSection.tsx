
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User, Award, Briefcase } from 'lucide-react';

const StudentSuccessSection = () => {
  const successStories = [
    {
      name: "Alex Johnson",
      achievement: "ESB Certified & School Store Manager",
      quote: "The entrepreneurship academy gave me real business experience. Now I'm managing the school store and planning to major in business administration.",
      icon: <User className="h-8 w-8 text-blue-600" />
    },
    {
      name: "Taylor Smith",
      achievement: "Microsoft Office Specialist & IBM Data Science Badge",
      quote: "I never thought I'd be certified in both business and technology before graduating high school. These credentials have already helped me secure a part-time job.",
      icon: <Award className="h-8 w-8 text-amber-600" />
    },
    {
      name: "Jordan Williams",
      achievement: "Small Business Startup & Tech Credentials",
      quote: "Thanks to the academy, I launched my own e-commerce business while still in high school. The skills I've gained are priceless.",
      icon: <Briefcase className="h-8 w-8 text-red-700" />
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">Student Success Stories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {successStories.map((story, index) => (
            <Card key={index} className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-100 p-3 rounded-full mr-3">
                    {story.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{story.name}</h3>
                    <p className="text-sm text-amber-700">{story.achievement}</p>
                  </div>
                </div>
                <blockquote className="italic text-gray-700 border-l-4 border-red-700 pl-4">
                  "{story.quote}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentSuccessSection;
