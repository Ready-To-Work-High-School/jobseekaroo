
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const EmployerLanding = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">For Employers</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Connect with high school students looking for job opportunities
          </p>
          <Button asChild size="lg">
            <Link to="/register/employer">Get Started</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerLanding;
