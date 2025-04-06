
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import EnhancedHero from '@/components/EnhancedHero';
import AdminToggle from '@/components/admin/AdminToggle';
import { useAuth } from '@/contexts/auth'; // Make sure this import path is correct
import { Button } from '@/components/ui/button';
import { Award, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const fadeIn = useFadeIn(300);
  const { user } = useAuth();

  // Add debug log to track user status
  console.log('Index page loaded, user authenticated:', !!user);

  return (
    <Layout>
      <div className={`w-full ${fadeIn}`}>
        <EnhancedHero />
        
        {/* Quick access buttons */}
        <div className="container mx-auto px-4 py-8 flex flex-col sm:flex-row justify-center gap-4">
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
