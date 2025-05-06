
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { AlertCircle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  const fadeIn = useFadeIn(300);

  return (
    <Layout>
      <div className={`container max-w-md mx-auto px-4 py-16 text-center ${fadeIn}`}>
        <div className="mb-6 flex justify-center">
          <div className="p-3 rounded-full bg-red-100/50">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
        </div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center space-x-4">
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
