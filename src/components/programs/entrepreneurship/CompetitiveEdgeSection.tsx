
import React from 'react';
import { Cpu, Sparkles, BarChart3, Globe, Flame, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const CompetitiveEdgeSection = () => {
  const features = [
    {
      icon: <Cpu className="h-8 w-8 text-blue-500" />,
      title: "Technology Skills",
      description: "Students develop technical proficiency that gives them an advantage in modern workplaces"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-emerald-500" />,
      title: "Business Analytics",
      description: "Learn to analyze market trends and make data-driven business decisions"
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-500" />,
      title: "Global Perspective",
      description: "Understand international business practices and global market opportunities"
    },
    {
      icon: <Flame className="h-8 w-8 text-amber-500" />,
      title: "Entrepreneurial Mindset",
      description: "Develop creative problem-solving and innovative thinking skills"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-pink-500" />,
      title: "Growth Strategy",
      description: "Learn business growth tactics and strategic planning fundamentals"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-cyan-500" />,
      title: "Digital Credentials",
      description: "Earn industry-recognized certifications and digital badges"
    }
  ];

  return (
    <section className="w-full py-16 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Competitive Edge in the Workforce</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Westside High School students are gaining a competitive edge in the workforce before they even graduate through an 
              advanced-level curriculum that covers Entrepreneurship which may lead to Industry Certification curriculum.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Industry-Leading Preparation</h3>
                <p className="text-gray-700 mb-4">
                  Our entrepreneurship program prepares students for real-world success with practical skills and industry knowledge that employers value.
                </p>
                <p className="text-gray-700">
                  Students also learn and earn digital credentials for emerging 21st century technology trends, giving them a significant advantage in today's competitive job market.
                </p>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-6 shadow-lg border border-blue-200 glow-primary">
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Career-Ready Advantages</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Industry-recognized certifications</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-emerald-100 p-2 rounded-full mr-3">
                      <Cpu className="h-5 w-5 text-emerald-600" />
                    </div>
                    <span className="text-gray-700">Technical & digital literacy</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-amber-100 p-2 rounded-full mr-3">
                      <Flame className="h-5 w-5 text-amber-600" />
                    </div>
                    <span className="text-gray-700">Entrepreneurial mindset development</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={cn(
                  "bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md border border-blue-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                  index % 2 === 0 ? "hover:border-blue-300" : "hover:border-indigo-300"
                )}
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveEdgeSection;
