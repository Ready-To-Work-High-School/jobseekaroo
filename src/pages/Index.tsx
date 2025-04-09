import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import EnhancedHero from '@/components/EnhancedHero';
import AdminToggle from '@/components/admin/AdminToggle';
import { useAuth } from '@/contexts/auth'; // Make sure this import path is correct
import { Button } from '@/components/ui/button';
import { Award, Compass, Heart } from 'lucide-react';
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
            
            {/* Healthcare Pathways Program - NEW */}
            <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardTitle className="text-lg text-blue-800">Healthcare Pathways</CardTitle>
                <Badge className="bg-red-600 hover:bg-red-700">Summer 2025</Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="mb-4 text-sm">Mayo Clinic's 3-day immersive program exploring allied healthcare careers.</p>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700" asChild>
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
