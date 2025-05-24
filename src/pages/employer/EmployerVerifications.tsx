
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, Shield, Award, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const EmployerVerifications = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FileCheck className="h-8 w-8" />
              Employer Verifications
            </h1>
            <p className="text-muted-foreground mt-2">
              Verify your business credentials and unlock premium features
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Verification Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <div className="flex-1">
                  <p className="font-medium text-yellow-800">Verification Pending</p>
                  <p className="text-sm text-yellow-700">Complete your business verification to access all features</p>
                </div>
                <Badge variant="outline" className="border-yellow-600 text-yellow-700">
                  Pending
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5" />
                  Business Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Required Documents:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Business License</li>
                    <li>• Workers' Compensation Insurance</li>
                    <li>• EIN (Employer Identification Number)</li>
                    <li>• Business Address Verification</li>
                  </ul>
                </div>
                <Button className="w-full">Start Verification Process</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Verification Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Unlock Premium Features:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Priority job listing placement</li>
                    <li>• Advanced candidate filtering</li>
                    <li>• Direct messaging with candidates</li>
                    <li>• Verified employer badge</li>
                    <li>• Enhanced company profile</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerVerifications;
