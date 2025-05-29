
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import QRJobCreation from '@/components/employer/QRJobCreation';
import { QrCode, Briefcase, CheckCircle, Clock, Shield, Lock, Eye, AlertTriangle, Users } from 'lucide-react';

const EmployerQRGenerator = () => {
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">JobSeekers4HS Access QR Code</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate a secure QR code that provides instant access to the JobSeekers4HS platform. 
            Perfect for sharing with students, posting in schools, or adding to business materials.
          </p>
        </div>

        {/* Security Notice Banner */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-900">Secure & Protected</h3>
              <p className="text-sm text-green-700 mt-1">
                Our QR codes are generated with multiple security layers including URL validation, 
                content sanitization, and secure linking to prevent malicious use.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <QRJobCreation size={250} />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                How Students Use This
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <QrCode className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-medium">1. Scan QR Code</h4>
                  <p className="text-sm text-muted-foreground">
                    Students scan the QR code with their phone camera
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-medium">2. Access Secure Platform</h4>
                  <p className="text-sm text-muted-foreground">
                    Instantly connects to the JobSeekers4HS website
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-orange-500 mt-1" />
                <div>
                  <h4 className="font-medium">3. Browse Opportunities</h4>
                  <p className="text-sm text-muted-foreground">
                    Students can explore jobs, internships, and career resources
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-purple-500 mt-1" />
                <div>
                  <h4 className="font-medium">4. Apply & Connect</h4>
                  <p className="text-sm text-muted-foreground">
                    Easy application process with employer connections
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Security Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-green-500" />
                  URL validation & sanitization
                </li>
                <li className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-green-500" />
                  Direct link to official platform
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-green-500" />
                  Anti-phishing protection
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  Secure HTTPS connection
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Perfect For</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  School bulletin boards
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Career fair materials
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Business cards and flyers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Email signatures and websites
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Platform Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Free for all students
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Age-appropriate opportunities
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Career guidance and resources
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Direct employer connections
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Technical Security Details */}
        <Card className="bg-slate-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Technical Security Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-medium mb-2">URL Security</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Direct link to official platform</li>
                  <li>• HTTPS encryption required</li>
                  <li>• Anti-phishing protection</li>
                  <li>• Regular security monitoring</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Access Control</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Secure platform authentication</li>
                  <li>• Student data protection</li>
                  <li>• Privacy-compliant design</li>
                  <li>• Safe browsing environment</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EmployerQRGenerator;
