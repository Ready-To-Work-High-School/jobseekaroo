
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import QRJobCreation from '@/components/employer/QRJobCreation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Shield, Zap, Download, Share2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const EmployerQRGenerator = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <QrCode className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">
              QR Code Job Generator
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generate secure QR codes for instant job posting. Students can scan to quickly apply for positions.
          </p>
        </div>

        {user ? (
          /* Authenticated User - Show QR Generator */
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* QR Generator Component */}
              <div className="flex justify-center">
                <QRJobCreation />
              </div>
              
              {/* Features List */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      Security Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Auto-refresh every 30 seconds</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Rate limiting protection</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Session validation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Audit logging</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-600" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <RefreshCw className="h-4 w-4 text-gray-500" />
                      <span>Manual refresh anytime</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Download className="h-4 w-4 text-gray-500" />
                      <span>Download QR as PNG</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Share2 className="h-4 w-4 text-gray-500" />
                      <span>Share via native sharing</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          /* Unauthenticated User - Show Preview and Sign Up */
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Preview Section */}
              <div className="text-center">
                <Card className="p-8">
                  <div className="bg-gray-100 p-4 rounded-lg border-2 border-dashed border-gray-300 mb-4">
                    <QrCode className="h-32 w-32 text-gray-400 mx-auto" />
                    <p className="text-gray-500 mt-2">QR Code Preview</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Sign in to generate secure QR codes for job postings
                  </p>
                </Card>
              </div>

              {/* Sign Up Prompt */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Get Started</CardTitle>
                    <CardDescription>
                      Sign up or sign in to start generating QR codes for your job postings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button asChild className="w-full">
                      <Link to="/sign-in">Sign In</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/sign-up">Create Account</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Why Use QR Codes?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Instant Applications</p>
                        <p className="text-sm text-gray-600">Students can apply immediately by scanning</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Mobile Optimized</p>
                        <p className="text-sm text-gray-600">Perfect for career fairs and events</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Secure & Tracked</p>
                        <p className="text-sm text-gray-600">All interactions are logged and secure</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* How It Works Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Generate QR Code</h3>
              <p className="text-sm text-gray-600">Create a secure, time-limited QR code for your job posting</p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Students Scan</h3>
              <p className="text-sm text-gray-600">High school students scan the code with their phones</p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Instant Connection</h3>
              <p className="text-sm text-gray-600">Direct connection to your job posting and application process</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerQRGenerator;
