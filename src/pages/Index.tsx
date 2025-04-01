
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import EnhancedHero from '@/components/EnhancedHero';
import AdminToggle from '@/components/admin/AdminToggle';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const fadeIn = useFadeIn(300);
  const { user } = useAuth();

  return (
    <Layout>
      <div className={`w-full ${fadeIn}`}>
        <EnhancedHero />
        
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
