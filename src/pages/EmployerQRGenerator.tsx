
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import QRJobCreation from '@/components/employer/QRJobCreation';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { 
  QrCode, 
  Timer, 
  Shield, 
  Smartphone,
  Users,
  Zap,
  CheckCircle,
  ArrowRight,
  Clock,
  Building,
  Target,
  Download,
  Share2,
  RefreshCw,
  Eye,
  Play
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EmployerQRGenerator = () => {
  const { user } = useAuth();
  const [showSampleQR, setShowSampleQR] = useState(false);

  const sampleFeatures = [
    {
      icon: Timer,
      title: "Auto-Refresh Security",
      description: "QR codes automatically refresh every 30 seconds for enhanced security",
      benefit: "Prevents unauthorized scanning and ensures secure job posting access"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Students can instantly scan and apply using their smartphones",
      benefit: "Reach students where they are - on their mobile devices"
    },
    {
      icon: Shield,
      title: "School-Verified Access",
      description: "Only verified high school students can access job postings",
      benefit: "Ensures quality candidates and maintains safety standards"
    },
    {
      icon: Download,
      title: "Downloadable QR Codes",
      description: "Download high-quality QR codes for print materials and signage",
      benefit: "Use in job fairs, bulletin boards, and recruitment materials"
    },
    {
      icon: RefreshCw,
      title: "Manual Refresh Control",
      description: "Manually refresh codes anytime with rate limiting protection",
      benefit: "Full control over your QR code security and access"
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share QR codes directly via email, text, or social media",
      benefit: "Expand your reach across multiple recruiting channels"
    }
  ];

  const quickSteps = [
    {
      step: 1,
      title: "Generate QR Code",
      description: "Create a secure QR code in seconds",
      time: "10 seconds"
    },
    {
      step: 2,
      title: "Post Job Details",
      description: "Add job title, description, and requirements",
      time: "30 seconds"
    },
    {
      step: 3,
      title: "Share with Students",
      description: "Display QR code or share digitally",
      time: "5 seconds"
    },
    {
      step: 4,
      title: "Receive Applications",
      description: "Get qualified student applications instantly",
      time: "Immediate"
    }
  ];

  const SampleQRPreview = () => (
    <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
      <CardContent className="flex flex-col items-center p-8">
        <div className="w-32 h-32 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mb-4">
          <div className="grid grid-cols-8 gap-1">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
              />
            ))}
          </div>
        </div>
        <Badge variant="secondary" className="mb-2">Sample QR Code</Badge>
        <p className="text-sm text-gray-600 text-center">
          Scan to access "Retail Associate Position"<br />
          <span className="text-xs">Auto-refreshes every 30 seconds</span>
        </p>
        <div className="flex gap-2 mt-4">
          <Button size="sm" variant="outline" className="gap-1">
            <Download className="h-3 w-3" />
            Download
          </Button>
          <Button size="sm" variant="outline" className="gap-1">
            <Share2 className="h-3 w-3" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <Helmet>
        <title>QR Code Job Generator - Post Jobs in Under 60 Seconds | JS4HS</title>
        <meta name="description" content="Generate secure QR codes for instant job posting. Students scan, apply instantly. Perfect for job fairs and quick recruitment." />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 border-blue-300">
            <QrCode className="h-3 w-3 mr-1" />
            QR Code Job Generator
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Post Jobs in <span className="text-blue-600">Under 60 Seconds</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Generate secure QR codes that students can scan to instantly access and apply for your job openings. 
            Perfect for job fairs, bulletin boards, and quick recruitment.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-full">
              <Timer className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">60 Second Setup</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-full">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">School Verified</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-full">
              <Smartphone className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Mobile First</span>
            </div>
          </div>
        </motion.div>

        {user ? (
          // Authenticated view - show actual QR generator
          <div className="space-y-8">
            <Card className="border-2 border-blue-200 bg-blue-50/50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-blue-900">Your QR Code Generator</CardTitle>
                <CardDescription className="text-blue-700">
                  Generate secure QR codes for your job postings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QRJobCreation />
              </CardContent>
            </Card>

            {/* Quick Steps for authenticated users */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Post a Job in 4 Quick Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {quickSteps.map((step, index) => (
                    <div key={step.step} className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <span className="font-bold text-blue-600">{step.step}</span>
                      </div>
                      <h4 className="font-semibold mb-2">{step.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                      <Badge variant="outline" className="text-xs">{step.time}</Badge>
                      {index < quickSteps.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-gray-400 mt-4 hidden md:block" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Unauthenticated view - show sample features and preview
          <div className="space-y-12">
            {/* Sample QR Code Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
                <p className="text-gray-600 mb-6">
                  Here's what your QR code generator will look like. Students simply scan the code 
                  to access your job posting and apply instantly from their phones.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Secure auto-refreshing codes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Mobile-optimized application flow</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Verified student access only</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button 
                    onClick={() => setShowSampleQR(!showSampleQR)}
                    variant="outline"
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    {showSampleQR ? 'Hide' : 'Show'} Sample QR Code
                  </Button>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                {showSampleQR && <SampleQRPreview />}
              </motion.div>
            </div>

            {/* Quick Steps Preview */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <Clock className="h-6 w-6 text-blue-600" />
                  Post a Job in Under 60 Seconds
                </CardTitle>
                <CardDescription className="text-lg">
                  Our streamlined process gets your job posted faster than any other platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {quickSteps.map((step, index) => (
                    <motion.div 
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <span className="font-bold text-blue-600 text-lg">{step.step}</span>
                      </div>
                      <h4 className="font-semibold mb-2">{step.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {step.time}
                      </Badge>
                      {index < quickSteps.length - 1 && (
                        <ArrowRight className="h-5 w-5 text-blue-400 mt-4 hidden md:block" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-8">Powerful Features Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-blue-600" />
                            </div>
                            <CardTitle className="text-lg">{feature.title}</CardTitle>
                          </div>
                          <CardDescription className="text-sm">
                            {feature.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-sm text-green-800 font-medium">
                              💡 {feature.benefit}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
              <CardContent className="text-center py-12">
                <h2 className="text-3xl font-bold mb-4">Ready to Start Hiring?</h2>
                <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                  Join hundreds of employers who are already using QR codes to connect with qualified high school students. 
                  Get started in under 2 minutes.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild size="lg" variant="secondary" className="gap-2">
                    <Link to="/signup?type=employer">
                      <Users className="h-4 w-4" />
                      Sign Up as Employer
                    </Link>
                  </Button>
                  
                  <Button asChild size="lg" variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Link to="/sign-in">
                      <Building className="h-4 w-4" />
                      Already Have Account?
                    </Link>
                  </Button>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-100">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>Free to get started</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>No setup fees</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>Instant access</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EmployerQRGenerator;
