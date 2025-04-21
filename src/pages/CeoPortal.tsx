
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

import { Shield, Users, Brain, Award, CalendarClock, BadgeCheck } from 'lucide-react';
import CeoFeatureCard from '@/components/ceo/CeoFeatureCard';

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
            Our integrated platform is uniquely customized for Jacksonville's high school students, connecting them directly with verified employers.
            Unlike typical job boards, we ensure verified student credentials, industry-recognized skill badges, and academy partnerships that empower student success.
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
              <CeoFeatureCard
                icon={<BadgeCheck className="h-5 w-5 text-blue-600" />}
                title="Verified Students"
                description=""
              >
                <p>Every student is verified through official school channels and must complete mandatory compliance training before job access.</p>
              </CeoFeatureCard>
              <CeoFeatureCard
                icon={<Award className="h-5 w-5 text-purple-600" />}
                title="Academy Integration"
                description=""
              >
                <p>
                  Seamless integration with Westside High School's Entrepreneurship and Nursing Academies, delivering certified and career-ready talent to employers.
                </p>
              </CeoFeatureCard>
              <CeoFeatureCard
                icon={<Brain className="h-5 w-5 text-emerald-600" />}
                title="Skill Verification"
                description=""
              >
                <p>
                  Digital badges verify students' academic and industry achievements, ensuring transparency and quality for employers.
                </p>
              </CeoFeatureCard>
            </div>
          </TabsContent>

          <TabsContent value="safety">
            <CeoFeatureCard
              icon={<Shield className="h-5 w-5 text-green-600" />}
              title="Enhanced Safety Measures"
              description="Industry-leading safety features for student job seekers"
            >
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-medium">School Verification</p>
                    <p className="text-muted-foreground">All student accounts verified through trusted school systems</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Employer Background Checks</p>
                    <p className="text-muted-foreground">Mandatory checks ensure trustworthy employer profiles</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-medium">Protected Communication</p>
                    <p className="text-muted-foreground">Monitored messaging system with content filtering to keep interactions safe</p>
                  </div>
                </li>
              </ul>
            </CeoFeatureCard>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid gap-6">
              <CeoFeatureCard
                icon={<CalendarClock className="h-5 w-5 text-muted-foreground" />}
                title="Platform Analytics"
                description=""
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Active Verified Students:</span>
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
              </CeoFeatureCard>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-12" />

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Join Us Now</h2>
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

