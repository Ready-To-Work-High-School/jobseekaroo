
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import QRJobCreation from '@/components/employer/QRJobCreation';
import QRValidator from '@/components/employer/QRValidator';
import { QrCode, Briefcase, CheckCircle, Clock, Shield, Users, Star, Smartphone, Zap, Target, Globe, Award } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

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

  const features = [
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Optimized for smartphone scanning and mobile job posting"
    },
    {
      icon: Zap,
      title: "Instant Job Creation",
      description: "Companies can post jobs in under 60 seconds"
    },
    {
      icon: Shield,
      title: "Teen Safety First",
      description: "All jobs reviewed for high school student appropriateness"
    },
    {
      icon: Target,
      title: "Local Focus",
      description: "Connects students with nearby employment opportunities"
    },
    {
      icon: Globe,
      title: "No App Required",
      description: "Works with any smartphone camera - no downloads needed"
    },
    {
      icon: Award,
      title: "Verified Employers",
      description: "All companies undergo verification before posting"
    }
  ];

  const easySteps = [
    {
      step: "1",
      icon: QrCode,
      title: "Scan QR Code",
      description: "Company scans the QR code with their phone camera",
      time: "5 seconds"
    },
    {
      step: "2",
      icon: Briefcase,
      title: "Fill Simple Form",
      description: "Job title, description, pay rate, and contact info",
      time: "30 seconds"
    },
    {
      step: "3",
      icon: CheckCircle,
      title: "Auto-Verification",
      description: "Our system checks for teen safety and labor compliance",
      time: "2 minutes"
    },
    {
      step: "4",
      icon: Users,
      title: "Live for Students",
      description: "Job appears instantly in student portal after approval",
      time: "Immediate"
    }
  ];

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto py-8 px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <QrCode className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold">QR Code Job Posting</h1>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Revolutionary
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            The fastest way for companies to connect with high school students. 
            One scan, one form, thousands of qualified teen workers.
          </p>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Under 60 seconds
            </span>
            <span className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              Teen-safe verified
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              Mobile optimized
            </span>
          </div>
        </div>

        {/* QR Validation Component */}
        <QRValidator 
          maxAgeSeconds={refreshInterval} 
          onValidationChange={setIsValidQR}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Column - QR Generator */}
          <div className="space-y-6">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Generate Your QR Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="refresh-interval">Security Level</Label>
                  <Select value={refreshInterval.toString()} onValueChange={(value) => setRefreshInterval(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">Maximum Security (15s refresh)</SelectItem>
                      <SelectItem value="30">High Security (30s refresh)</SelectItem>
                      <SelectItem value="60">Standard Security (1m refresh)</SelectItem>
                      <SelectItem value="120">Basic Security (2m refresh)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <QRJobCreation size={220} refreshInterval={refreshInterval} />
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-sm text-amber-800">
                    <strong>💡 Pro Tip:</strong> Print this QR code on business cards, flyers, or display it 
                    on your website. Companies can scan it anytime to post jobs instantly!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - How It Works */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  How Easy Is It? 
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    4 Simple Steps
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {easySteps.map((step, index) => {
                    const IconComponent = step.icon;
                    return (
                      <div key={step.step} className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:border-green-200 transition-colors">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center border border-green-200">
                            <IconComponent className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-green-900">{step.title}</h4>
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                              {step.time}
                            </Badge>
                          </div>
                          <p className="text-sm text-green-700">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-900">Total Time: Under 60 Seconds!</span>
                  </div>
                  <p className="text-sm text-green-700">
                    From scan to live job posting - faster than ordering coffee ☕
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Showcase */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Star className="h-6 w-6 text-amber-500" />
              Why Employers Love Our QR System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={feature.title} className="text-center p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 border border-blue-200">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-blue-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-blue-700">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Perfect For Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-600" />
                Perfect For
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Job fairs & career events",
                  "Business cards & flyers", 
                  "Store windows & displays",
                  "Email signatures",
                  "Company websites",
                  "Social media posts",
                  "Chamber of Commerce events",
                  "Networking meetings"
                ].map((use, index) => (
                  <div key={use} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    {use}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Safety & Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Auto-refreshing codes prevent misuse",
                  "All jobs reviewed for teen appropriateness",
                  "Company verification required",
                  "Labor law compliance checking",
                  "Secure encrypted job posting",
                  "Rate limiting prevents spam"
                ].map((safety, index) => (
                  <div key={safety} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {safety}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Footer */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isValidQR ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">
                  QR System Status: {isValidQR ? 'Operational' : 'Validation Required'}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Security-first design
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  Teen-focused platform
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Instant job posting
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EmployerQRGenerator;
