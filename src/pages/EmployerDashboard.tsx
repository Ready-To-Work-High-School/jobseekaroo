
import { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/employer/DashboardHeader';
import DashboardTabs from '@/components/employer/DashboardTabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PlusCircle, CheckCircle, Award, Building, Users, BarChart3, Briefcase, Star, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmployerBenefits from '@/components/employer/EmployerBenefits';
import LazyImage from '@/components/LazyImage';
import { getImageSizes } from '@/utils/imageUtils';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

const EmployerDashboard = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("postings");
  
  const handlePostNewJob = () => {
    setActiveTab("create");
  };
  
  // If user is not authenticated, show sign in/sign up options with enhanced features
  if (!user) {
    return (
      <Layout>
        <div className="container max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
            <p className="text-lg text-muted-foreground mb-2">Connect with qualified students and post job opportunities</p>
            <Badge variant="outline" className="bg-blue-50">Best-in-class talent matching platform</Badge>
          </div>
          
          <Card className="mb-10 border-primary/20 shadow-lg bg-gradient-to-b from-white to-blue-50">
            <CardHeader className="bg-primary/5 border-b">
              <CardTitle className="text-2xl text-center">Access Your Employer Dashboard</CardTitle>
              <CardDescription className="text-center">Sign in to access all employer features</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
                <Card className="bg-muted/50 border-blue-100 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>Existing Employers</CardTitle>
                    <CardDescription>Sign in to access your dashboard</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 pb-8">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Resume matching technology</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Student skill assessments</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Advanced analytics dashboard</span>
                      </li>
                    </ul>
                    <Button asChild size="lg" className="mt-2 w-full">
                      <Link to="/sign-in">Sign In</Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-primary/5 border-primary/30 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>New Employers</CardTitle>
                      <Badge className="bg-amber-500 hover:bg-amber-500">Recommended</Badge>
                    </div>
                    <CardDescription>Create an account to get started</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 pb-8">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>All standard features</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>First job posting free</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Premium analytics trial</span>
                      </li>
                    </ul>
                    <Button asChild size="lg" className="mt-2 w-full bg-gradient-to-r from-blue-600 to-blue-700">
                      <Link to="/sign-up">Sign Up Free</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          {/* Enhanced Key Employer Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Key Employer Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="bg-white hover:shadow-md transition-all hover:-translate-y-1 duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Premium Job Postings</h3>
                    <p className="text-sm text-center text-muted-foreground">Branded listings with priority placement in search results</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white hover:shadow-md transition-all hover:-translate-y-1 duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Smart Candidate Matching</h3>
                    <p className="text-sm text-center text-muted-foreground">AI-powered matching with skill compatibility scores</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white hover:shadow-md transition-all hover:-translate-y-1 duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                      <BarChart3 className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Advanced Analytics</h3>
                    <p className="text-sm text-center text-muted-foreground">Comprehensive dashboards with candidate metrics and trends</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white hover:shadow-md transition-all hover:-translate-y-1 duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                      <Star className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Premium Services</h3>
                    <p className="text-sm text-center text-muted-foreground">Custom training programs and exclusive partner benefits</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Separator className="my-10" />
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-2">EXCLUSIVE BENEFIT</Badge>
                <h2 className="text-2xl font-bold mb-4">Direct Access to Verified Students</h2>
                <p className="mb-4 text-muted-foreground">
                  Our platform gives you direct access to students with verified credentials and skills.
                  All students on our platform have completed industry-standard assessments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Link to="/sign-up">Create Employer Account</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/employer-badges">View Student Credentials</Link>
                  </Button>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden border-4 border-white shadow-lg hidden md:block">
                <LazyImage
                  src="/lovable-uploads/5bd40401-b911-4d3b-a1f2-3e1712199dbc.png"
                  alt="Employer Dashboard Preview"
                  className="object-cover w-full h-full"
                  sizes={getImageSizes('hero')}
                />
              </div>
            </div>
          </div>
          
          <EmployerBenefits />
        </div>
      </Layout>
    );
  }
  
  // For authenticated users, show the actual dashboard
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-6">
        <DashboardHeader />
        
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </Layout>
  );
};

export default EmployerDashboard;
