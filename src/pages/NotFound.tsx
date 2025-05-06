
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container max-w-md mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
