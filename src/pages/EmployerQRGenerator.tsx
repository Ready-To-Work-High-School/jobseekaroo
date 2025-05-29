
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import QRJobCreation from '@/components/employer/QRJobCreation';
import { QrCode, Briefcase, CheckCircle, Clock, Shield, Lock, Eye, AlertTriangle } from 'lucide-react';

const EmployerQRGenerator = () => {
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Secure QR Code Job Posting</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate a secure QR code that companies can scan to quickly post jobs to JobSeekers4HS. 
            Built with enterprise-grade security for safe job posting.
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
                content sanitization, and rate limiting to prevent malicious use.
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
                <Briefcase className="h-5 w-5" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <QrCode className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-medium">1. Scan Secure QR Code</h4>
                  <p className="text-sm text-muted-foreground">
                    Companies scan the validated QR code with their phone camera
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-medium">2. Secure Form Validation</h4>
                  <p className="text-sm text-muted-foreground">
                    All input is sanitized and validated in real-time for security
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-orange-500 mt-1" />
                <div>
                  <h4 className="font-medium">3. Professional Review</h4>
                  <p className="text-sm text-muted-foreground">
                    Our team reviews jobs within 24 hours for safety and compliance
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-purple-500 mt-1" />
                <div>
                  <h4 className="font-medium">4. Job Goes Live</h4>
                  <p className="text-sm text-muted-foreground">
                    Approved jobs are published to the secure student portal
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
                  Real-time content scanning
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-green-500" />
                  XSS attack prevention
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  Rate limiting protection
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
                  Job fairs and career events
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Business cards and flyers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Store windows and bulletin boards
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
              <CardTitle>Safety Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  All jobs reviewed for teen safety
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Company verification required
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Age-appropriate work only
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Labor law compliance checked
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
                <h4 className="font-medium mb-2">Input Validation</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Real-time content sanitization</li>
                  <li>• XSS attack vector detection</li>
                  <li>• SQL injection prevention</li>
                  <li>• Maximum length restrictions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Access Control</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Rate limiting per IP address</li>
                  <li>• URL validation and verification</li>
                  <li>• Secure form submission</li>
                  <li>• Error handling without data exposure</li>
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
