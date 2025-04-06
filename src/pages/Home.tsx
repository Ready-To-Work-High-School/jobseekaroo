
import React from 'react';
import Layout from '../components/Layout';
import EnhancedHero from '../components/EnhancedHero';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <Layout>
      <Helmet>
        <title>Job Seekers 4 HS - Your First Job, Made Simple.</title>
        <meta name="description" content="A fun, safe, mobile-first app to land your first job, with badges and guidance. For high school students at Westside High School." />
      </Helmet>
      <EnhancedHero />
      
      {/* Premium Features Banner */}
      <div className="max-w-5xl mx-auto mt-12 mb-8 bg-gradient-to-r from-amber-50 to-blue-50 p-5 rounded-lg border border-amber-100 dark:from-amber-950/30 dark:to-blue-950/30 dark:border-amber-900/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-amber-500" />
            <div>
              <h3 className="font-medium">Premium Features for Employers</h3>
              <p className="text-sm text-muted-foreground">Access advanced analytics and premium company profiles</p>
            </div>
          </div>
          <Button asChild className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
            <Link to="/employer-premium">
              Explore Premium Features
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
