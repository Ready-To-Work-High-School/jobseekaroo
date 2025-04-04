
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import EnhancedHero from '@/components/EnhancedHero';
import AdminToggle from '@/components/admin/AdminToggle';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Award, BookOpen, Briefcase } from 'lucide-react';
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
        
        {/* Quick access section with multiple buttons */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Explore Our Platform</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300" asChild>
              <Link to="/student-success">
                <Award className="h-5 w-5" />
                Student Success Stories
              </Link>
            </Button>
            
            <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300" asChild>
              <Link to="/resources">
                <BookOpen className="h-5 w-5" />
                Learning Resources
              </Link>
            </Button>
            
            <Button className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300" asChild>
              <Link to="/for-employers">
                <Briefcase className="h-5 w-5" />
                For Employers
              </Link>
            </Button>
          </div>
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
