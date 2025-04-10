
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RedemptionCodeForm from '@/components/auth/RedemptionCodeForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, GraduationCap, Key } from 'lucide-react';

const EmployerSchoolDemo = () => {
  const [activeTab, setActiveTab] = useState<string>('employer');
  const fadeIn = useFadeIn(300);

  return (
    <Layout>
      <div className={`container mx-auto py-8 px-4 ${fadeIn}`}>
        <h1 className="text-3xl font-bold text-center mb-2">Try Our Demo</h1>
        <p className="text-center text-muted-foreground mb-8">
          Experience the full potential of our platform with a demo account
        </p>

        <div className="max-w-3xl mx-auto">
          <Tabs 
            defaultValue="employer" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="mb-8"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="employer" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span>Employer Demo</span>
              </TabsTrigger>
              <TabsTrigger value="school" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>School Demo</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="employer" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Employer Demo Access</CardTitle>
                  <CardDescription>
                    Explore our employer tools, job posting system, and analytics dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">What you'll get access to:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Post and manage job listings</li>
                      <li>Review applications from qualified students</li>
                      <li>Access detailed analytics and insights</li>
                      <li>Award badges to talented applicants</li>
                      <li>Employer premium features preview</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      Enter your redemption code
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Don't have a code? Contact our team to request a demo access code.
                    </p>
                    <RedemptionCodeForm redirectTo="/employer-dashboard" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="school" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>School Administrator Demo Access</CardTitle>
                  <CardDescription>
                    Discover tools for school administrators, counselors, and educators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">What you'll get access to:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>School dashboard with student tracking</li>
                      <li>Counselor assignment and management tools</li>
                      <li>Progress reports and analytics</li>
                      <li>Curriculum integration resources</li>
                      <li>Bulk student account management</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      Enter your redemption code
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Don't have a code? Contact our education team to request school demo access.
                    </p>
                    <RedemptionCodeForm redirectTo="/school-dashboard" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerSchoolDemo;
