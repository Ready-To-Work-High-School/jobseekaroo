
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import EnhancedHero from '@/components/EnhancedHero';
import AdminToggle from '@/components/admin/AdminToggle';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Award, ExternalLink } from 'lucide-react';
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
        
        {/* Quick access to Student Success page */}
        <div className="container mx-auto px-4 py-8 flex justify-center">
          <Button className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300" asChild>
            <Link to="/student-success">
              <Award className="h-5 w-5" />
              Explore Student Success Stories & Pathways
            </Link>
          </Button>
        </div>
        
        {/* Admin toggle card for easy access */}
        {user && (
          <div className="container mx-auto px-4 py-8">
            <AdminToggle />
          </div>
        )}

        {/* Developer links at the bottom with enhanced styling */}
        <div className="container mx-auto px-4 py-8 mt-12 border-t border-gray-200">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Developer Resources</h3>
            <div className="flex justify-center space-x-4">
              <Link to="/server-demo" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors duration-200 hover:underline hover:scale-105 transform">
                <ExternalLink className="h-3 w-3" />
                Server Demo
              </Link>
              <Link to="/api-demo" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors duration-200 hover:underline hover:scale-105 transform">
                <ExternalLink className="h-3 w-3" />
                API Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
