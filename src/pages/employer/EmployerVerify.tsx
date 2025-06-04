
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Shield, Upload, FileText, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmployerVerify: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmitVerification = () => {
    // Handle verification submission
    navigate('/employer/dashboard');
  };

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              Business Verification
            </h1>
            <p className="text-muted-foreground mt-2">
              Complete your business verification to access premium features
            </p>
          </div>
          <Badge variant="skyBlue" className="px-3 py-1">
            Premium Feature
          </Badge>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Business Information
              </CardTitle>
              <CardDescription>
                Provide your business registration details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ein">EIN Number</Label>
                  <Input id="ein" placeholder="XX-XXXXXXX" />
                </div>
                <div>
                  <Label htmlFor="business-name">Legal Business Name</Label>
                  <Input id="business-name" placeholder="Your Business LLC" />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Business Address</Label>
                <Input id="address" placeholder="123 Business St, City, State, ZIP" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Required Documents
              </CardTitle>
              <CardDescription>
                Upload the following documents for verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Business Registration Certificate</p>
                  <Button variant="outline" className="mt-2">Upload File</Button>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Workers Compensation Insurance</p>
                  <Button variant="outline" className="mt-2">Upload File</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/employer/onboarding')}>
              Back to Onboarding
            </Button>
            <Button onClick={handleSubmitVerification} className="bg-blue-600 hover:bg-blue-700">
              Submit for Verification
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerVerify;
