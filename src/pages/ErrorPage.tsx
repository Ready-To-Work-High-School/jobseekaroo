
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
        <p className="text-muted-foreground mb-8">
          We're sorry, but there was an error processing your request.
        </p>
        <Button onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </div>
    </Layout>
  );
};

export default ErrorPage;
