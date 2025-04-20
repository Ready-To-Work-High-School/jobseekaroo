
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Brain, Award, CalendarClock, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const CeoPortal = () => {
  const fadeIn = useFadeIn(300);
  const navigate = useNavigate();

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-amber-100 rounded-full mb-4">
            <Shield className="h-6 w-6 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">High School Student Career Platform</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our integrated platform bridges the gap between high school students and employers, 
            offering unique features designed specifically for the Jacksonville market.
          </p>
        </div>

        <Tabs defaultValue="features" className="space-y-8">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto">
            <TabsTrigger value="features">Unique Features</TabsTrigger>
            <TabsTrigger value="safety">Safety & Compliance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-blue-600" />
                    <CardTitle>Verified Students</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>All students are verified through their schools and must complete mandatory training before accessing the platform.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    <CardTitle>Academy Integration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Direct integration with Westside High School's Entrepreneurship and Nursing Academies, providing certified talent.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-emerald-600" />
                    <CardTitle>Skill Verification</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Students earn verified digital badges through academic achievements and industry certifications.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="safety">
            <Card>
              <CardHeader>
                <CardTitle>Enhanced Safety Measures</CardTitle>
                <CardDescription>Industry-leading safety features for student job seekers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <p className="font-medium">School Verification</p>
                      <p className="text-muted-foreground">Every student account is verified through official school channels</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Employer Background Checks</p>
                      <p className="text-muted-foreground">Mandatory verification for all employer accounts</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-purple-600 mt-1" />
                    <div>
                      <p className="font-medium">Protected Communication</p>
                      <p className="text-muted-foreground">All messaging is monitored and filtered for inappropriate content</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Platform Analytics</CardTitle>
                    <CalendarClock className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Active Students:</span>
                      <span className="font-medium">50+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Verified Employers:</span>
                      <span className="font-medium">25+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Successful Placements:</span>
                      <span className="font-medium">30+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-12" />

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to Get Started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/sign-up')}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600"
            >
              <Users className="mr-2 h-4 w-4" />
              Create Account
            </Button>
            <Button 
              onClick={() => navigate('/contact')}
              variant="outline"
              size="lg"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CeoPortal;
