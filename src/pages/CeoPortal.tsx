
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Users, Shield } from "lucide-react";
import CeoAlertNotification from '@/components/ceo/CeoAlertNotification';
import UniqueFeatures from '@/components/ceo/tabs/UniqueFeatures';
import SafetyCompliance from '@/components/ceo/tabs/SafetyCompliance';
import GeographicCoverage from '@/components/ceo/tabs/GeographicCoverage';
import PlatformAnalytics from '@/components/ceo/tabs/PlatformAnalytics';
import CeoActionCards from '@/components/ceo/CeoActionCards';

const CeoPortal = () => {
  const fadeIn = useFadeIn(300);
  const navigate = useNavigate();

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        <CeoAlertNotification />

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
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
            <TabsTrigger value="features">Unique Features</TabsTrigger>
            <TabsTrigger value="safety">Safety & Compliance</TabsTrigger>
            <TabsTrigger value="coverage">Geographic Coverage</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="features">
            <UniqueFeatures />
          </TabsContent>

          <TabsContent value="safety">
            <SafetyCompliance />
          </TabsContent>

          <TabsContent value="coverage">
            <GeographicCoverage />
          </TabsContent>

          <TabsContent value="analytics">
            <PlatformAnalytics />
          </TabsContent>
        </Tabs>

        <CeoActionCards />

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
