
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Helmet>
        <title>Error - Job Seekers 4 HS</title>
        <meta name="description" content="Something went wrong. Let's get you back on track." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Card>
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-2xl">Oops! Something went wrong</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We're sorry, but something unexpected happened. Don't worry, it's not your fault!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => window.location.reload()} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button onClick={() => navigate('/')}>
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ErrorPage;
