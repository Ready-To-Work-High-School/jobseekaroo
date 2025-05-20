
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { GraduationCap, Building, ArrowRight } from 'lucide-react';

const EmployerDirectAccessSection = () => {
  return (
    <Card className="border-blue-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b">
        <div className="flex items-center mb-2">
          <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
          <CardTitle>Direct Access to Student Talent</CardTitle>
        </div>
        <CardDescription>
          Connect with high school students actively seeking employment opportunities
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Building className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">School-Endorsed Platform</h3>
              <p className="text-sm text-muted-foreground">
                We partner directly with high schools to connect their students with quality employers.
                All students using our platform are enrolled in career-focused academic programs.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <GraduationCap className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Career-Ready Students</h3>
              <p className="text-sm text-muted-foreground">
                Students on our platform are actively participating in our Entrepreneurship academy, 
                meaning they're specifically preparing for workforce entry.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-end">
        <Button asChild>
          <Link to="/signup" className="gap-2">
            <span>Create Employer Account</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmployerDirectAccessSection;
