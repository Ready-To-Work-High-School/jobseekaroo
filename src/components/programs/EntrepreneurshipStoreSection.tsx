
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import LazyImage from '@/components/LazyImage';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const EntrepreneurshipStoreSection = () => {
  return (
    <div className="mb-16">
      {/* Capstone Badge - Moved to top of section and increased in size */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center">
          <img 
            src="/lovable-uploads/db3bbdbe-4e13-45f6-9d94-45a126fdc1ef.png" 
            alt="ESB Certification Badge" 
            className="h-40 w-auto object-contain mb-3" 
          />
          <span className="text-sm font-medium text-center">Entrepreneurship & Small Business</span>
        </div>
      </div>
      
      <Card className="overflow-hidden border-amber-300 bg-amber-50/60">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full">
                <h3 className="bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 px-6 py-2 rounded-full text-2xl font-bold mb-4 text-blue-800 text-center">Westside High School Entrepreneurship School Store</h3>
                
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center">
                      <img src="/lovable-uploads/8c05db9e-7d7f-4a4c-9cfc-18a0cf8ed175.png" alt="Getting Started with Artificial Intelligence" className="h-24 w-auto object-contain mb-2" />
                      <span className="text-xs text-center font-medium">AI Fundamentals<br />IBM SkillsBuild</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="/lovable-uploads/5bd40401-b911-4d3b-a1f2-3e1712199dbc.png" alt="Entrepreneurship Business Essentials" className="h-24 w-auto object-contain mb-2" />
                      <span className="text-xs text-center font-medium">Business Essentials<br />IBM SkillsBuild</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="/lovable-uploads/b6c94ff2-8f7b-47ce-8274-51bed1ec0a42.png" alt="Explore Emerging Tech" className="h-24 w-auto object-contain mb-2" />
                      <span className="text-xs text-center font-medium">Emerging Tech<br />IBM SkillsBuild</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default EntrepreneurshipStoreSection;
