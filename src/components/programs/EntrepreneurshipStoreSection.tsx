
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import LazyImage from '@/components/LazyImage';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
const EntrepreneurshipStoreSection = () => {
  return <div className="mb-16">
      {/* Capstone Badge - Moved to top of section and increased in size */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center">
          
          
        </div>
      </div>
      
      <Card className="overflow-hidden border-amber-300 bg-amber-50/60">
        {/* Store Heading - Now full width and outside the card content for maximum stretch */}
        <h3 className="bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 px-6 py-3 font-bold text-blue-800 text-center text-3xl md:text-4xl w-full">Westside High School Entrepreneurship School Store</h3>
        
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full">
                {/* Removed the heading from here since it's now outside the CardContent */}
                
                <div className="prose text-gray-700">
                  <p className="mb-4">
                    The Westside High School Entrepreneurship School Store continues to be a remarkable success, providing students with real-world business experience through the management of daily operations, financial handling, and customer service.
                  </p>
                  
                  <p className="mb-4">
                    By running the store and working concessions at events, students are actively gaining valuable skills in sales, inventory management, and marketing. They are also enhancing their financial literacy by budgeting, tracking profits, and making informed business decisions.
                  </p>
                  
                  <p className="mb-4">
                    The revenue generated supports the entrepreneurship program and other school initiatives, fostering ongoing growth and enabling future expansion plans. This hands-on experience empowers students with practical skills and an entrepreneurial mindset, preparing them for successful future careers.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-blue-800 mb-3">Industry-Recognized Certifications</h4>
              <Card className="border-amber-200 bg-amber-50/30">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center group">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-200 rounded-lg blur-sm opacity-0 group-hover:opacity-30 transition-opacity"></div>
                        <img src="/lovable-uploads/010059ca-3c6a-4e41-bcc3-d47749b4bd09.png" alt="Getting Started with Artificial Intelligence" className="h-36 w-auto object-contain mb-2 transition-transform group-hover:scale-110 shadow-md rounded-sm" />
                        <Badge className="absolute -top-2 -right-2 bg-amber-500 text-white">IBM</Badge>
                      </div>
                      <span className="text-sm text-center font-medium">AI Fundamentals<br />IBM SkillsBuild</span>
                    </div>
                    <div className="flex flex-col items-center group">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-200 rounded-lg blur-sm opacity-0 group-hover:opacity-30 transition-opacity"></div>
                        <img src="/lovable-uploads/5d60294c-1d85-4c16-b0e2-e3060c0b36f4.png" alt="Entrepreneurship Business Essentials" className="h-36 w-auto object-contain mb-2 transition-transform group-hover:scale-110 shadow-md rounded-sm" />
                        <Badge className="absolute -top-2 -right-2 bg-amber-500 text-white">IBM</Badge>
                      </div>
                      <span className="text-sm text-center font-medium">Business Essentials<br />IBM SkillsBuild</span>
                    </div>
                    <div className="flex flex-col items-center group">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-200 rounded-lg blur-sm opacity-0 group-hover:opacity-30 transition-opacity"></div>
                        <img src="/lovable-uploads/c9f00526-d2b8-49f3-850d-81bf63640baa.png" alt="Explore Emerging Tech" className="h-36 w-auto object-contain mb-2 transition-transform group-hover:scale-110 shadow-md rounded-sm" />
                        <Badge className="absolute -top-2 -right-2 bg-amber-500 text-white">IBM</Badge>
                      </div>
                      <span className="text-sm text-center font-medium">Emerging Tech<br />IBM SkillsBuild</span>
                    </div>
                    <div className="flex flex-col items-center group">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-200 rounded-lg blur-sm opacity-0 group-hover:opacity-30 transition-opacity"></div>
                        <img src="/lovable-uploads/1fd371ba-b6b6-4c2e-942b-4489f5e883d5.png" alt="IBM AI Foundations for Educators" className="h-36 w-auto object-contain mb-2 transition-transform group-hover:scale-110 shadow-md rounded-sm" />
                        <Badge className="absolute -top-2 -right-2 bg-amber-500 text-white">IBM</Badge>
                      </div>
                      <span className="text-sm text-center font-medium">AI for Educators<br />IBM SkillsBuild</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default EntrepreneurshipStoreSection;
