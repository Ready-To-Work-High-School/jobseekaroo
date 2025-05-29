
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import QRJobCreation from '@/components/employer/QRJobCreation';
import QRValidator from '@/components/employer/QRValidator';
import { QrCode, Briefcase, CheckCircle, Clock, Shield, Users, Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const EmployerQRGenerator = () => {
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [isValidQR, setIsValidQR] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto py-8 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Access Restricted</h1>
            <p className="text-muted-foreground mb-6">
              You need to be logged in as an employer to access the QR generator.
            </p>
            <Button onClick={() => navigate('/sign-in')}>
              Sign In
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Secure QR Code Job Posting</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate secure, auto-refreshing QR codes that companies can scan to quickly post jobs to JobSeekers4HS. 
            Perfect for job fairs, business cards, or sharing with potential employers.
          </p>
        </div>

        {/* QR Validation Component */}
        <QRValidator 
          maxAgeSeconds={refreshInterval} 
          onValidationChange={setIsValidQR}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="refresh-interval">Auto-Refresh Interval</Label>
                    <Select value={refreshInterval.toString()} onValueChange={(value) => setRefreshInterval(Number(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 seconds (High Security)</SelectItem>
                        <SelectItem value="30">30 seconds (Recommended)</SelectItem>
                        <SelectItem value="60">1 minute (Standard)</SelectItem>
                        <SelectItem value="120">2 minutes (Low Security)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Shorter intervals provide better security against malicious attacks but may be inconvenient for users.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <QRJobCreation size={250} refreshInterval={refreshInterval} />
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
                  <h4 className="font-medium">1. Scan QR Code</h4>
                  <p className="text-sm text-muted-foreground">
                    Companies scan the QR code with their phone camera
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-medium">2. Fill Simple Form</h4>
                  <p className="text-sm text-muted-foreground">
                    Quick job posting form with essential details only
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-orange-500 mt-1" />
                <div>
                  <h4 className="font-medium">3. Verification Process</h4>
                  <p className="text-sm text-muted-foreground">
                    Our team reviews the job within 24 hours for safety and compliance
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-purple-500 mt-1" />
                <div>
                  <h4 className="font-medium">4. Job Goes Live</h4>
                  <p className="text-sm text-muted-foreground">
                    Approved jobs are published to the student portal
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Perfect For
              </CardTitle>
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
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  Digital marketing campaigns
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Auto-refreshing QR codes prevent replay attacks
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Timestamped links ensure code freshness
                </li>
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
                  Labor law compliance checked
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Rate limiting prevents abuse
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Performance status indicator */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isValidQR ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">
                  QR System Status: {isValidQR ? 'Operational' : 'Validation Required'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Star className="h-3 w-3" />
                Security-first design
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EmployerQRGenerator;
