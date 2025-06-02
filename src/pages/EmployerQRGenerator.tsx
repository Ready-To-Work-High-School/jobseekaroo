
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import QRJobCreation from '@/components/employer/QRJobCreation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Shield, Zap, Clock, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmployerQRGenerator = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <QrCode className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">QR Code Job Posting Generator</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create secure, time-limited QR codes that allow instant job posting from any mobile device
            </p>
          </div>

          {/* Sample QR Preview */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6">Preview: Sample QR Code</h2>
              <div className="flex justify-center mb-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <QrCode className="h-24 w-24 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Sample QR Code</p>
                </div>
              </div>
              <div className="bg-white/80 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm text-muted-foreground">
                  🔒 Auto-refreshes every 30s for security
                </p>
                <p className="text-sm text-orange-600">
                  ⏱️ Session validation: 30s window
                </p>
                <p className="text-sm text-blue-600">
                  ⚡ Instant job posting capabilities
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Generate QR Code</h3>
                <p className="text-sm text-muted-foreground">Create a secure, time-limited QR code from your dashboard</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Scan & Access</h3>
                <p className="text-sm text-muted-foreground">Scan with any mobile device to instantly access job posting form</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Post Job</h3>
                <p className="text-sm text-muted-foreground">Fill out streamlined job posting form on mobile or desktop</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h3 className="font-semibold mb-2">Go Live</h3>
                <p className="text-sm text-muted-foreground">Job posting goes live immediately and reaches qualified students</p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    Security First
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Auto-expiring QR codes (30s)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Session validation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Audit logging
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-500" />
                    Lightning Fast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Instant QR generation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Mobile-optimized forms
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      One-click job posting
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    High School Focus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Reaches verified students
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      School partnership network
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Age-appropriate matching
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gray-50 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Why Use QR Code Job Posting?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">For Busy Managers</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span>Post jobs in under 2 minutes from anywhere</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Secure, company-verified posting process</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <span>No need to remember login details</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">For HR Teams</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-purple-500 mt-0.5" />
                    <span>Enable any team member to post jobs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <QrCode className="h-5 w-5 text-indigo-500 mt-0.5" />
                    <span>Track all posting activity with audit logs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Maintain brand consistency across posts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join hundreds of employers using QR codes to hire high school talent
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/sign-up">Sign Up Free</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/sign-in">Sign In</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Free to get started • No credit card required
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  // Authenticated user sees the actual QR generator
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">QR Code Job Posting Generator</h1>
            <p className="text-muted-foreground">
              Generate secure QR codes for quick job posting from any device
            </p>
          </div>
          
          <QRJobCreation />
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              QR codes automatically refresh every 30 seconds for security. 
              All QR code activities are logged for audit purposes.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerQRGenerator;
