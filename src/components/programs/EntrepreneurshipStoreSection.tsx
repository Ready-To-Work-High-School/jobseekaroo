
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const EntrepreneurshipStoreSection = () => {
  return (
    <div className="mb-8">
      <Card className="overflow-hidden border-amber-300 bg-gradient-to-br from-gray-200 to-gray-100">
        {/* Store Heading - Now full width and outside the card content for maximum stretch */}
        <h3 className="bg-gradient-to-r from-red-900 to-red-800 px-6 py-3 font-bold text-gray-100 text-center text-3xl md:text-4xl w-full">Westside High School Entrepreneurship School Store</h3>
        
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EntrepreneurshipStoreSection;
