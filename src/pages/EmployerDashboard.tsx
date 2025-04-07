
import { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/employer/DashboardHeader';
import DashboardTabs from '@/components/employer/DashboardTabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, CheckCircle, Award, Building, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmployerBenefits from '@/components/employer/EmployerBenefits';
import LazyImage from '@/components/LazyImage';
import { getImageSizes } from '@/utils/imageUtils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const EmployerDashboard = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("postings");
  
  const handlePostNewJob = () => {
    setActiveTab("create");
  };
  
  // If user is not authenticated, show sign in/sign up options
  if (!user) {
    return (
      <Layout>
        <div className="container max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Employer Dashboard</h1>
            <p className="text-lg text-muted-foreground mb-6">Connect with qualified students and post job opportunities</p>
          </div>
          
          <Card className="mb-10 border-primary/20 shadow-lg">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-2xl text-center">Access Your Employer Dashboard</CardTitle>
              <CardDescription className="text-center">Sign in to access all employer features</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle>Existing Employers</CardTitle>
                    <CardDescription>Sign in to access your dashboard</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center pb-8">
                    <Button asChild size="lg">
                      <Link to="/sign-in">Sign In</Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-primary/5 border-primary/30">
                  <CardHeader>
                    <CardTitle>New Employers</CardTitle>
                    <CardDescription>Create an account to get started</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center pb-8">
                    <Button asChild size="lg">
                      <Link to="/sign-up">Sign Up</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          {/* Key Employer Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Key Employer Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Post Jobs</h3>
                    <p className="text-sm text-center text-muted-foreground">Unlimited job listings with detailed descriptions</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Candidate Management</h3>
                    <p className="text-sm text-center text-muted-foreground">Review applicants and schedule interviews</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                      <CheckCircle className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Analytics</h3>
                    <p className="text-sm text-center text-muted-foreground">Track job posting performance and applicant metrics</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Apprenticeships</h3>
                    <p className="text-sm text-center text-muted-foreground">Create training programs and apprenticeships</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <EmployerBenefits />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Why Join Our Platform</h2>
              <p className="mb-4 text-muted-foreground">
                Our employer dashboard provides you with powerful tools to find and connect
                with qualified students ready to enter the workforce.
              </p>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                <li>Post unlimited job listings with detailed descriptions</li>
                <li>Review applicants through our streamlined candidate management system</li>
                <li>Schedule interviews directly through our integrated calendar</li>
                <li>Access analytics on job posting performance</li>
                <li>Offer apprenticeships and training programs</li>
              </ul>
            </div>
            <div className="relative rounded-lg overflow-hidden h-64 md:h-auto">
              <LazyImage
                src="/lovable-uploads/05bd40401-b911-4d3b-a1f2-3e1712199dbc.png"
                alt="Employer Dashboard Preview"
                className="object-cover w-full h-full"
                sizes={getImageSizes('hero')}
              />
            </div>
          </div>
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
