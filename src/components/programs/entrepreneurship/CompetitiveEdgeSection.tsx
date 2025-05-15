
import React from 'react';
import { Cpu, Sparkles, BarChart3, Globe, Flame, TrendingUp, Award, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFadeIn } from '@/utils/animations';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CompetitiveEdgeSection = () => {
  const fadeIn = useFadeIn(400);
  
  const features = [
    {
      icon: <Cpu className="h-8 w-8 text-red-600" />,
      title: "Technology Skills",
      description: "Students develop technical proficiency that gives them an advantage in modern workplaces"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-amber-600" />,
      title: "Business Analytics",
      description: "Learn to analyze market trends and make data-driven business decisions"
    },
    {
      icon: <Globe className="h-8 w-8 text-[#6e1212]" />,
      title: "Global Perspective",
      description: "Understand international business practices and global market opportunities"
    },
    {
      icon: <Flame className="h-8 w-8 text-amber-500" />,
      title: "Entrepreneurial Mindset",
      description: "Develop creative problem-solving and innovative thinking skills"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-gray-700" />,
      title: "Growth Strategy",
      description: "Learn business growth tactics and strategic planning fundamentals"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-amber-600" />,
      title: "Digital Credentials",
      description: "Earn industry-recognized certifications and digital badges"
    }
  ];

  return (
    <section className={cn("w-full py-16 bg-gradient-to-br from-gray-100 to-gray-200", fadeIn)}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-red-900 mb-4">Competitive Edge in the Workforce</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Westside High School students are gaining a competitive edge in the workforce before they even graduate through an 
              advanced-level curriculum that covers Entrepreneurship which may lead to Industry Certification.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
            <Card className="md:w-1/2 border-red-200 shadow-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-6 w-6 text-red-900 mr-2" />
                  <h3 className="text-xl font-semibold text-red-900">Industry-Leading Preparation</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Our entrepreneurship program prepares students for real-world success with practical skills and industry knowledge that employers value.
                </p>
                <p className="text-gray-700">
                  Students also learn and earn digital credentials for emerging 21st century technology trends, giving them a significant advantage in today's competitive job market.
                </p>
              </CardContent>
            </Card>
            
            <Card className="md:w-1/2 border-amber-300 shadow-lg overflow-hidden bg-gradient-to-r from-red-900 to-amber-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-amber-400 mb-4">Career-Ready Advantages</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <div className="bg-black/30 p-2 rounded-full mr-3">
                      <Sparkles className="h-5 w-5 text-amber-500" />
                    </div>
                    <span className="text-gray-200">Industry-recognized certifications</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-black/30 p-2 rounded-full mr-3">
                      <Cpu className="h-5 w-5 text-amber-500" />
                    </div>
                    <span className="text-gray-200">Technical & digital literacy</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-black/30 p-2 rounded-full mr-3">
                      <Flame className="h-5 w-5 text-amber-500" />
                    </div>
                    <span className="text-gray-200">Entrepreneurial mindset development</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-black/30 p-2 rounded-full mr-3">
                      <CheckCircle className="h-5 w-5 text-amber-500" />
                    </div>
                    <span className="text-gray-200">Leadership & communication skills</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={cn(
                  "shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden", 
                  index % 2 === 0 ? "border-red-300" : "border-amber-300"
                )}
              >
                <div className={cn(
                  "h-1 w-full", 
                  index % 2 === 0 ? "bg-red-900" : "bg-amber-500"
                )} />
                <CardContent className="p-6">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Badge variant="outline" className="text-red-900 border-red-900 px-4 py-2 text-sm">
              Preparing Tomorrow's Entrepreneurs Today
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveEdgeSection;
