
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import EnhancedHero from '@/components/EnhancedHero';
import AdminToggle from '@/components/admin/AdminToggle';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const fadeIn = useFadeIn(300);
  const { user } = useAuth();

  return (
    <Layout>
      <div className={`w-full ${fadeIn}`}>
        <EnhancedHero />
        
        {/* Quick access to Student Success page */}
        <div className="container mx-auto px-4 py-8 flex justify-center">
          <Button className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white gap-2" asChild>
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
      </div>
    </Layout>
  );
};

export default Index;
