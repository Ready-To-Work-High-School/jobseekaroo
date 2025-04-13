
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import AdminToggle from '@/components/admin/AdminToggle';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Award, Compass, Heart, MapPin, Calendar, Clock, BookOpen, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MayoSummerFeature from '@/components/home/MayoSummerFeature';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import FeeTeaser from '@/components/pricing/FeeTeaser';

const Index = () => {
  const fadeIn = useFadeIn(300);
  const { user } = useAuth();

  // Add debug log to track user status
  console.log('Index page loaded, user authenticated:', !!user);

  return (
    <Layout>
      <div className={`w-full ${fadeIn}`}>
        {/* Info banner with key message */}
        <div className="bg-blue-50 py-4 px-4 text-center mb-6">
          <div className="container mx-auto">
            <p className="text-lg font-medium text-blue-800">
              Free to Westside High School participants: Employers, and Students
            </p>
          </div>
        </div>
        
        {/* Mayo Clinic Feature moved to top */}
        <div className="container mx-auto px-4 mb-8">
          <MayoSummerFeature />
        </div>
        
        {/* First Job Toolkit MOVED UP above pricing */}
        <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl mb-8">
          <h2 className="text-3xl font-bold text-center mb-6">First Job Toolkit</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-center mb-6 text-gray-700">
              Resources and tools to help you prepare for and succeed in your first job.
              Learn essential skills, prepare for interviews, and build your professional profile.
            </p>
            <div className="flex justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300" asChild>
                <Link to="/first-job-toolkit" className="flex items-center justify-center gap-2">
                  <Compass className="h-5 w-5" />
                  Explore Toolkit
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Simple pricing for employers */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-center mb-6">Simple Pricing for Employers</h2>
          <FeeTeaser />
        </div>
        
        {/* Dropdown for credentials */}
        <div className="container mx-auto px-4 py-4 mb-8 text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-amber-300">
                Industry Recognized Credentials
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white">
              <DropdownMenuItem asChild>
                <Link to="/entrepreneurship-academy" className="cursor-pointer flex items-center">
                  <Award className="mr-2 h-4 w-4 text-amber-500" />
                  Entrepreneurship & Small Business
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/nursing-academy" className="cursor-pointer flex items-center">
                  <Heart className="mr-2 h-4 w-4 text-red-500" />
                  Nursing Academy
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/credentials" className="cursor-pointer flex items-center">
                  <BookOpen className="mr-2 h-4 w-4 text-blue-500" />
                  View All Credentials
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Prominent JS4HS Logo Display - Kept */}
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/0b66caa3-2a72-475c-981f-fe66e8da8bb0.png" 
              alt="JS4HS Logo" 
              className="h-48 md:h-56 w-auto object-contain"
              width="400"
              height="400"
              loading="eager"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23dddddd' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='8' r='7'%3E%3C/circle%3E%3Cpolyline points='8.21 13.89 7 23 12 20 17 23 15.79 13.88'%3E%3C/polyline%3E%3C/svg%3E";
              }}
            />
          </div>
          <h2 className="text-3xl font-bold">Job Seekers 4 High Schools</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-2 text-lg">
            Connecting students with credential-ready opportunities at Westside High School
          </p>
        </div>
        
        {/* Featured Programs Section - UPDATED */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Featured Programs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Entrepreneurship Program */}
            <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-amber-200">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100">
                <CardTitle className="text-lg text-amber-800">Entrepreneurship Academy</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex justify-center mb-4">
                  <img 
                    src="/lovable-uploads/9babf5b8-1235-48d8-8e19-a555efbf5102.png" 
                    alt="ESB Certification" 
                    className="h-24 w-auto object-contain"
                    width="120"
                    height="120"
                  />
                </div>
                <p className="mb-4 text-sm">Prepare for business careers or start your own company with our specialized program.</p>
                <Button className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700" asChild>
                  <Link to="/entrepreneurship-academy" className="flex items-center justify-center gap-2">
                    <Award className="h-4 w-4" />
                    Explore Program
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Nursing Academy - UPDATED FROM HEALTHCARE PATHWAYS */}
            <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-blue-200 transform scale-105 z-10">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardTitle className="text-lg text-blue-800">Nursing Academy</CardTitle>
                <Badge className="bg-red-600 hover:bg-red-700">In-Demand Career</Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex justify-center mb-4">
                  <img 
                    src="/lovable-uploads/32e451a9-4fe2-40b0-bfbc-15cfceea8d71.png" 
                    alt="Nursing Academy" 
                    className="h-24 w-auto object-contain"
                    width="120"
                    height="120"
                  />
                </div>
                <p className="mb-4 text-sm">Prepare for healthcare careers with industry-recognized Certified Nursing Assistant credentials.</p>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700" asChild>
                  <Link to="/nursing-academy" className="flex items-center justify-center gap-2">
                    <Heart className="h-4 w-4" />
                    Learn More
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* First Job Toolkit */}
            <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-indigo-200">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
                <CardTitle className="text-lg text-indigo-800">IBM SkillsBuild</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex justify-center mb-4">
                  <img 
                    src="/lovable-uploads/898ea22e-1f00-4da4-92db-b78adabc702a.png" 
                    alt="IBM SkillsBuild" 
                    className="h-24 w-auto object-contain"
                    width="120"
                    height="120"
                  />
                </div>
                <p className="mb-4 text-sm">Earn digital credentials through IBM's SkillsBuild platform for in-demand technology skills.</p>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" asChild>
                  <Link to="/skills-build" className="flex items-center justify-center gap-2">
                    <Award className="h-4 w-4" />
                    Explore Credentials
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Quick access buttons - keeping these as backup navigation */}
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300" asChild>
            <Link to="/entrepreneurship-academy">
              <Award className="h-5 w-5" />
              Explore Our Program
            </Link>
          </Button>
          
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300" asChild>
            <Link to="/first-job-toolkit">
              <Compass className="h-5 w-5" />
              First Job Toolkit
            </Link>
          </Button>
        </div>
        
        {/* Admin toggle card for easy access */}
        {user && (
          <div className="container mx-auto px-4 py-8">
            <AdminToggle />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
