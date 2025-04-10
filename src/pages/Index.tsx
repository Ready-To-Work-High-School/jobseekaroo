
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import EnhancedHero from '@/components/EnhancedHero';
import AdminToggle from '@/components/admin/AdminToggle';
import { useAuth } from '@/contexts/auth'; // Make sure this import path is correct
import { Button } from '@/components/ui/button';
import { Award, Compass, Heart, MapPin, Calendar, Clock, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const fadeIn = useFadeIn(300);
  const { user } = useAuth();

  // Add debug log to track user status
  console.log('Index page loaded, user authenticated:', !!user);

  return (
    <Layout>
      <div className={`w-full ${fadeIn}`}>
        <EnhancedHero />
        
        {/* Healthcare Pathways Featured Summer Opportunity */}
        <div className="container mx-auto px-4 py-8 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute -left-24 -top-24 w-96 h-96 rounded-full bg-blue-100/30 blur-3xl"></div>
          <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl"></div>
          
          <div className="relative z-10 text-center mb-8">
            <Badge className="mb-2 bg-amber-600 hover:bg-amber-700">Featured Summer Opportunity</Badge>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
              Mayo Clinic's Pathways into Healthcare Careers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A prestigious three-day immersive program exploring allied healthcare careers
            </p>
          </div>
          
          <Card className="border-0 shadow-xl max-w-4xl mx-auto overflow-hidden bg-gradient-to-br from-white to-blue-50">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 overflow-hidden">
                    <img 
                      src="/lovable-uploads/da43ec61-9d66-4927-bf47-e3e785ac69a3.png" 
                      alt="Mayo Clinic Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Program Highlights:</h3>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Open to high school and college students in Jacksonville, FL</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Explore healthcare careers beyond becoming a doctor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Network with Mayo Clinic faculty and students</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>No cost to attend, free meals provided</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-amber-600 hover:from-blue-700 hover:to-amber-700" asChild>
                  <Link to="/healthcare-pathways">Learn More</Link>
                </Button>
              </div>
              <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-amber-600 text-white p-6">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl font-bold mb-4">Program Details</h4>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 flex-shrink-0" />
                        <span>July 10–12, 2025</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Clock className="h-5 w-5 flex-shrink-0" />
                        <span>8:00 a.m. – 3:00 p.m. daily</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 flex-shrink-0" />
                        <span>Mayo Clinic – Jacksonville, FL</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm mb-2 text-blue-100">Application Period:</p>
                    <p className="font-bold">March 1 – May 15, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Platform Guide Callout */}
        <div className="container mx-auto px-4 py-4 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center p-6">
              <div className="md:w-3/4 mb-4 md:mb-0 md:pr-4">
                <h3 className="text-xl font-bold mb-2">New! Platform Guide Available</h3>
                <p className="text-gray-600">
                  Explore our comprehensive guide with detailed information for students, employers, schools, administrators, and counselors.
                </p>
              </div>
              <div className="md:w-1/4 flex justify-center">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" asChild>
                  <Link to="/platform-guide" className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    View Platform Guide
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Featured Programs Section */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Featured Programs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Entrepreneurship Program */}
            <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-amber-200">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100">
                <CardTitle className="text-lg text-amber-800">Entrepreneurship Academy</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="mb-4 text-sm">Prepare for business careers or start your own company with our specialized program.</p>
                <Button className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700" asChild>
                  <Link to="/entrepreneurship-academy" className="flex items-center justify-center gap-2">
                    <Award className="h-4 w-4" />
                    Explore Program
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Healthcare Pathways Program */}
            <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-blue-200 transform scale-105 z-10">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-amber-50">
                <CardTitle className="text-lg text-blue-800">Healthcare Pathways</CardTitle>
                <Badge className="bg-amber-600 hover:bg-amber-700">Summer 2025</Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="mb-4 text-sm">Mayo Clinic's 3-day immersive program exploring allied healthcare careers.</p>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-amber-600 hover:from-blue-700 hover:to-amber-700" asChild>
                  <Link to="/healthcare-pathways" className="flex items-center justify-center gap-2">
                    <Heart className="h-4 w-4" />
                    Learn More
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* First Job Toolkit */}
            <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-indigo-200">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
                <CardTitle className="text-lg text-indigo-800">First Job Toolkit</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="mb-4 text-sm">Resources and tools to help you prepare for and succeed in your first job.</p>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" asChild>
                  <Link to="/first-job-toolkit" className="flex items-center justify-center gap-2">
                    <Compass className="h-4 w-4" />
                    Explore Toolkit
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
          
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300" asChild>
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
