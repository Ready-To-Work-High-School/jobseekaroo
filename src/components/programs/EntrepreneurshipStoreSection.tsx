import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
const EntrepreneurshipStoreSection = () => {
  return <div className="mb-16">
      <Card className="overflow-hidden border-amber-300 bg-amber-50/60">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/3 flex-shrink-0">
              <img src="/lovable-uploads/21bca716-a220-4a1d-a37a-3f6a052d0096.png" alt="Westside High School Entrepreneurship School Store" className="w-full h-auto rounded-lg shadow-md" />
            </div>
            
            <div className="w-full md:w-2/3">
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
                
                <div className="mt-6">
                  <a href="https://certiport.pearsonvue.com/Certifications/ESB/Certification/Overview.aspx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                    Learn more about the ESB certification
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default EntrepreneurshipStoreSection;